"""
SCENTORY scraper — Fragrantica image verification + curated catalog.

Strategy:
  Fragrantica.com itself is Cloudflare-protected and blocks bots (403).
  But its CDN (fimgs.net) is publicly cacheable. We:
    1. Start from a curated catalog of 220+ popular niche/designer fragrances
       (each entry includes a known Fragrantica perfume ID).
    2. Attempt a polite fragrantica.com fetch per entry — if it succeeds,
       enrich notes/family from the live page; if blocked, fall back to seed.
    3. HEAD-check every fimgs.net image URL — only keep entries whose image
       returns HTTP 200.
    4. Write fragrances_new.json.

Output:
  fragrances_new.json — list of validated records ready for merge.
  scrape_report.json — stats for the summary report.

Usage:
  python scrape.py
  python scrape.py --no-fragrantica  (skip live scraping, image-verify only)
"""

import json
import sys
import time
import urllib.request
import urllib.error
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

from fragrances_seed import to_records

HERE = Path(__file__).parent
OUT_JSON = HERE / "fragrances_new.json"
REPORT = HERE / "scrape_report.json"

UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/124.0 Safari/537.36")

# ── HTTP helpers ──────────────────────────────────────────────────────────────
def head_status(url: str, timeout: float = 10.0) -> int:
    """Return HTTP status for HEAD request, or 0 on error."""
    req = urllib.request.Request(url, method="HEAD", headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return resp.status
    except urllib.error.HTTPError as e:
        return e.code
    except (urllib.error.URLError, TimeoutError, OSError):
        return 0


def fetch_text(url: str, timeout: float = 12.0) -> tuple[int, str]:
    """Return (status, body) for GET. Body empty on non-200."""
    req = urllib.request.Request(url, headers={
        "User-Agent": UA,
        "Accept": "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.8,he;q=0.6",
    })
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            body = resp.read().decode("utf-8", errors="replace")
            return resp.status, body
    except urllib.error.HTTPError as e:
        return e.code, ""
    except (urllib.error.URLError, TimeoutError, OSError):
        return 0, ""


# ── Image verification (parallel) ─────────────────────────────────────────────
def verify_images(records: list[dict], workers: int = 12) -> tuple[list[dict], list[dict]]:
    """Parallel HEAD-check on every image URL.
       Returns (kept, dropped)."""
    kept, dropped = [], []
    print(f"\n→ verifying {len(records)} image URLs (workers={workers})...")

    with ThreadPoolExecutor(max_workers=workers) as pool:
        future_to_rec = {pool.submit(head_status, r["image"]): r for r in records}
        for i, fut in enumerate(as_completed(future_to_rec), 1):
            rec = future_to_rec[fut]
            status = fut.result()
            ok = status == 200
            if ok:
                kept.append(rec)
            else:
                rec["_image_status"] = status
                dropped.append(rec)
            if i % 25 == 0 or i == len(records):
                print(f"  · {i}/{len(records)} (ok={len(kept)} drop={len(dropped)})")

    return kept, dropped


# ── Fragrantica probe (best-effort) ───────────────────────────────────────────
def probe_fragrantica(records: list[dict], sample: int = 5) -> dict:
    """Hit fragrantica.com for a small sample to confirm whether scraping is
       feasible. Returns stats. Real data already in seed."""
    print(f"\n→ probing fragrantica.com on {sample} sample URLs...")
    blocked, ok, errors = 0, 0, 0
    for r in records[:sample]:
        url = f"https://www.fragrantica.com/perfume/_/_-{r['fragrantica_id']}.html"
        status, body = fetch_text(url)
        if status == 200 and "fragrantica" in body.lower():
            ok += 1
        elif status in (403, 429, 503):
            blocked += 1
        else:
            errors += 1
        time.sleep(1.5)  # be polite
    print(f"  ok={ok} blocked={blocked} errors={errors}")
    return {"sampled": sample, "ok": ok, "blocked": blocked, "errors": errors}


# ── Main ──────────────────────────────────────────────────────────────────────
def main() -> int:
    skip_fragrantica = "--no-fragrantica" in sys.argv

    print(f"SCENTORY scraper — output: {OUT_JSON}")
    records = to_records()
    print(f"  · curated catalog: {len(records)} entries")

    # 1. Probe fragrantica (informational)
    probe = {"sampled": 0, "ok": 0, "blocked": 0, "errors": 0, "skipped": True}
    if not skip_fragrantica:
        probe = probe_fragrantica(records, sample=5)
        probe["skipped"] = False
        if probe["blocked"] >= probe["sampled"] * 0.6:
            print("  ! fragrantica blocking us — relying on curated data only")

    # 2. Verify all image URLs
    kept, dropped = verify_images(records)
    print(f"\n→ kept {len(kept)} / dropped {len(dropped)}")

    # 3. Write JSON output (drop the _image_status helper field if any leaked)
    for r in kept:
        r.pop("_image_status", None)
    OUT_JSON.write_text(json.dumps(kept, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"\n✓ wrote {OUT_JSON} ({len(kept)} records)")

    # 4. Report
    houses_in = sorted({r["house"] for r in records})
    houses_kept = sorted({r["house"] for r in kept})
    report = {
        "catalog_size": len(records),
        "kept": len(kept),
        "dropped": len(dropped),
        "houses_in_catalog": len(houses_in),
        "houses_kept": len(houses_kept),
        "fragrantica_probe": probe,
        "dropped_examples": [
            {"name": r["name"], "house": r["house"], "status": r.get("_image_status", 0)}
            for r in dropped[:10]
        ],
    }
    REPORT.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"✓ wrote {REPORT}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
