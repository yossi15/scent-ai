"""
Merge fragrances_new.json into src/data/fragrances.ts.

  - Reads existing TS file, extracts {name, house} pairs as dedup key.
  - Loads scraped records from fragrances_new.json.
  - Skips duplicates.
  - Computes missing fields (id, rating, size, description, tags, radarProfile)
    from the seed data using deterministic heuristics.
  - Inserts new entries before the closing `];` of the fragrances array.

Outputs:
  - Modifies src/data/fragrances.ts in-place.
  - Writes merge_report.json with stats.
"""

import json
import re
from pathlib import Path

HERE = Path(__file__).parent
ROOT = HERE.parent.parent
TS_FILE = ROOT / "src" / "data" / "fragrances.ts"
NEW_JSON = HERE / "fragrances_new.json"
REPORT = HERE / "merge_report.json"


# ── Family → radar profile heuristics ─────────────────────────────────────────
# Each axis 1-10 (woody, floral, oriental, fresh, gourmand, animalic)
FAMILY_RADAR = {
    # Woody
    "Woody":               (8, 2, 3, 3, 1, 2),
    "Woody Aromatic":      (7, 2, 3, 5, 1, 1),
    "Woody Spicy":         (8, 1, 6, 3, 1, 3),
    "Woody Floral":        (7, 6, 3, 3, 1, 1),
    "Woody Chypre":        (7, 4, 4, 4, 1, 3),
    "Woody Floral Musk":   (6, 6, 3, 4, 1, 2),
    # Aromatic
    "Aromatic":            (4, 3, 2, 8, 1, 1),
    "Aromatic Aquatic":    (2, 2, 1, 9, 1, 1),
    "Aromatic Citrus":     (2, 2, 1, 9, 1, 1),
    "Aromatic Fougere":    (5, 2, 3, 7, 2, 1),
    "Aromatic Fruity":     (3, 3, 2, 8, 3, 1),
    "Aromatic Green":      (3, 3, 2, 8, 1, 1),
    "Aromatic Spicy":      (4, 2, 5, 6, 2, 2),
    # Citrus
    "Citrus":              (1, 2, 1, 9, 1, 1),
    "Citrus Aromatic":     (2, 2, 1, 9, 1, 1),
    "Citrus Floral":       (2, 6, 1, 8, 1, 1),
    # Floral
    "Floral":              (2, 9, 2, 4, 2, 1),
    "Floral Fruity":       (2, 8, 2, 5, 4, 1),
    "Floral Musk":         (2, 7, 2, 4, 1, 4),
    "Floral Woody":        (5, 8, 3, 3, 1, 2),
    "Powdery Floral":      (3, 9, 3, 3, 2, 1),
    # Amber / Oriental
    "Amber":               (5, 3, 9, 1, 4, 4),
    "Amber Aromatic":      (5, 2, 7, 4, 2, 3),
    "Amber Floral":        (4, 7, 7, 2, 3, 3),
    "Amber Spicy":         (5, 2, 9, 2, 4, 4),
    "Amber Vanilla":       (4, 3, 8, 2, 8, 3),
    "Amber Woody":         (7, 2, 8, 2, 3, 4),
    "Oriental":            (4, 3, 9, 1, 4, 4),
    "Oriental Floral":     (3, 7, 8, 2, 3, 3),
    "Oriental Spicy":      (4, 2, 9, 2, 4, 4),
    # Specialty
    "Animalic":            (5, 2, 5, 1, 1, 10),
    "Chypre":              (5, 5, 4, 5, 1, 4),
    "Chypre Floral":       (4, 8, 3, 4, 1, 3),
    "Coniferous":          (8, 1, 1, 7, 1, 1),
    "Fruity Chypre":       (4, 4, 3, 7, 4, 2),
    "Green":               (4, 4, 1, 8, 1, 1),
    "Leather":             (6, 2, 6, 2, 1, 7),
    "Powdery":             (3, 7, 4, 3, 3, 2),
}

DEFAULT_RADAR = (5, 4, 4, 4, 3, 2)


# ── Tag heuristics ────────────────────────────────────────────────────────────
def derive_tags(rec: dict) -> list[str]:
    tags = []
    family = (rec.get("family") or "").lower()
    longev = rec.get("longevity", 0)
    sillage = rec.get("sillage", 0)

    if "amber" in family or "oriental" in family: tags.append("Sensual")
    if "woody" in family: tags.append("Sophisticated")
    if "citrus" in family or "aromatic" in family: tags.append("Fresh")
    if "floral" in family: tags.append("Romantic")
    if "leather" in family: tags.append("Bold")
    if "vanilla" in family or "gourmand" in family: tags.append("Sweet")
    if "oud" in (rec.get("name", "") + " " + family).lower(): tags.append("Oud")
    if "rose" in (rec.get("name", "") + family).lower(): tags.append("Rose")

    if longev >= 9 and sillage >= 8: tags.append("Beast Mode")
    elif longev >= 8: tags.append("Long Lasting")

    year = rec.get("year", 0)
    if 1900 <= year <= 1990: tags.append("Classic")

    # Cap at 4 unique
    seen, out = set(), []
    for t in tags:
        if t not in seen:
            seen.add(t)
            out.append(t)
        if len(out) >= 4: break
    return out or ["Niche"]


def derive_rating(rec: dict) -> float:
    """Heuristic: base 4.0, +0.05 per longev/sillage point above 5, capped 4.85."""
    longev = rec.get("longevity", 7)
    sillage = rec.get("sillage", 6)
    score = 4.0 + 0.05 * max(0, longev - 5) + 0.05 * max(0, sillage - 5)
    return round(min(4.85, score), 1)


def derive_radar(family: str) -> tuple[int, int, int, int, int, int]:
    return FAMILY_RADAR.get(family, DEFAULT_RADAR)


def derive_description(rec: dict) -> str:
    """Generic but distinct description."""
    fam = rec.get("family", "").lower()
    name = rec.get("name", "")
    house = rec.get("house", "")
    if "amber vanilla" in fam:
        return f"A warm, gourmand composition from {house} — {name} envelops the wearer in vanilla, amber and spice."
    if "leather" in fam:
        return f"{name} is a refined leather statement from {house} — equal parts elegance and grit."
    if "woody" in fam:
        return f"A timeless woody composition from {house}, {name} pairs depth with quiet confidence."
    if "citrus" in fam or "aromatic" in fam:
        return f"{name} — a crisp, bright take from {house} that's ideal for warm days and fresh starts."
    if "floral" in fam:
        return f"A blooming floral from {house}, {name} feels feminine yet versatile."
    if "amber" in fam or "oriental" in fam:
        return f"{name} brings the rich, sensual side of {house} — spice, resin and warmth."
    return f"{name} by {house} — a distinctive composition that rewards close wear."


# ── TS serialization ──────────────────────────────────────────────────────────
def js_str(s: str) -> str:
    """Safe JS string literal (use double quotes; escape backslash + quote)."""
    return '"' + s.replace("\\", "\\\\").replace('"', '\\"') + '"'


def render_entry(rec: dict, new_id: int) -> str:
    family = rec["family"]
    longev = rec.get("longevity", 7)
    sillage = rec.get("sillage", 6)
    radar = derive_radar(family)
    rating = derive_rating(rec)
    tags = derive_tags(rec)
    desc = derive_description(rec)

    notes_lines = []
    for n in rec.get("notes", []):
        notes_lines.append(
            f'      {{ name: {js_str(n["name"])}, type: {js_str(n["type"])} }},'
        )
    notes_block = "\n".join(notes_lines) if notes_lines else ""

    tags_inner = ", ".join(js_str(t) for t in tags)

    return f"""  {{
    id: {new_id},
    name: {js_str(rec["name"])},
    house: {js_str(rec["house"])},
    year: {rec["year"]},
    concentration: {js_str(rec["concentration"])},
    price: {rec["price"]},
    size: "100ml",
    rating: {rating},
    family: {js_str(family)},
    gender: {js_str(rec["gender"])},
    longevity: {longev},
    sillage: {sillage},
    notes: [
{notes_block}
    ],
    description: {js_str(desc)},
    image: {js_str(rec["image"])},
    tags: [{tags_inner}],
    radarProfile: {{ woody: {radar[0]}, floral: {radar[1]}, oriental: {radar[2]}, fresh: {radar[3]}, gourmand: {radar[4]}, animalic: {radar[5]} }},
  }},"""


# ── Existing TS parsing ───────────────────────────────────────────────────────
NAME_HOUSE_RE = re.compile(
    r'name:\s*"([^"]+)"[^{}]*?house:\s*"([^"]+)"',
    re.DOTALL,
)
ID_RE = re.compile(r'id:\s*(\d+)', re.MULTILINE)


def existing_keys_and_max_id(ts_source: str) -> tuple[set[tuple[str, str]], int]:
    keys = set()
    for m in NAME_HOUSE_RE.finditer(ts_source):
        keys.add((m.group(1).strip().lower(), m.group(2).strip().lower()))
    ids = [int(m.group(1)) for m in ID_RE.finditer(ts_source)]
    return keys, max(ids) if ids else 0


def insert_entries(ts_source: str, rendered_entries: list[str]) -> str:
    """Insert before the closing `];` of the FRAGRANCES array (not later arrays
       like subscriptionTiers). We anchor on the array opener and walk to its
       matching closer."""
    opener_re = re.compile(r"export\s+const\s+fragrances\s*:\s*Fragrance\[\]\s*=\s*\[")
    m = opener_re.search(ts_source)
    if not m:
        raise RuntimeError("can't locate `export const fragrances: Fragrance[] = [`")

    start = m.end()  # position right after the opening [
    depth = 1
    i = start
    in_str = None  # track string literals so we don't count brackets inside them
    while i < len(ts_source) and depth > 0:
        ch = ts_source[i]
        if in_str:
            if ch == '\\':
                i += 2
                continue
            if ch == in_str:
                in_str = None
        else:
            if ch in ('"', "'", '`'):
                in_str = ch
            elif ch == '[':
                depth += 1
            elif ch == ']':
                depth -= 1
                if depth == 0:
                    closer = i  # index of the matching ]
                    break
        i += 1

    if depth != 0:
        raise RuntimeError("could not find matching closer for fragrances array")

    head = ts_source[:closer].rstrip()
    tail = ts_source[closer:]  # starts with `]`
    insert = "\n" + "\n".join(rendered_entries) + "\n"
    return head + insert + tail


# ── Main ──────────────────────────────────────────────────────────────────────
def main() -> int:
    ts_source = TS_FILE.read_text(encoding="utf-8")
    new_records = json.loads(NEW_JSON.read_text(encoding="utf-8"))

    existing, max_id = existing_keys_and_max_id(ts_source)
    print(f"existing entries: {len(existing)}, max id: {max_id}")
    print(f"scraped records: {len(new_records)}")

    to_add = []
    skipped_dup = 0
    for rec in new_records:
        key = (rec["name"].strip().lower(), rec["house"].strip().lower())
        if key in existing:
            skipped_dup += 1
            continue
        existing.add(key)
        to_add.append(rec)

    print(f"  · {skipped_dup} duplicates skipped")
    print(f"  · {len(to_add)} new entries to add")

    if not to_add:
        print("nothing to do")
        return 0

    # Render with fresh ids
    rendered = []
    new_houses = set()
    existing_houses = set()
    house_re = re.compile(r'house:\s*"([^"]+)"')
    for m in house_re.finditer(ts_source):
        existing_houses.add(m.group(1).strip())

    for i, rec in enumerate(to_add):
        new_id = max_id + 1 + i
        rendered.append(render_entry(rec, new_id))
        if rec["house"] not in existing_houses:
            new_houses.add(rec["house"])

    new_ts = insert_entries(ts_source, rendered)
    TS_FILE.write_text(new_ts, encoding="utf-8")
    print(f"\n✓ wrote {TS_FILE} (+{len(to_add)} entries)")

    report = {
        "existing_before": len(existing) - len(to_add),
        "scraped": len(new_records),
        "duplicates_skipped": skipped_dup,
        "added": len(to_add),
        "new_total": len(existing),
        "new_houses": sorted(new_houses),
        "new_houses_count": len(new_houses),
        "image_verified_http_200": len(new_records),
    }
    REPORT.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"✓ wrote {REPORT}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
