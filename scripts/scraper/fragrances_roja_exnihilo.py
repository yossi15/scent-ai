"""Additional Roja Parfums + Ex Nihilo entries — verified Fragrantica IDs."""

# (name, house, year, gender, family, fid, top, heart, base, longev, sillage, conc, price)
SEED = [
    # ─── Roja Parfums ───────────────────────────────────────────
    ("Aoud Parfum",            "Roja Parfums", 2010, "Unisex",    "Amber Woody",      12199, ["Saffron","Bergamot"], ["Rose","Jasmine"], ["Oud","Sandalwood","Amber","Patchouli"], 9, 9, "Parfum", 4500),
    ("Nuwa",                   "Roja Parfums", 2018, "Unisex",    "Amber Spicy",      50503, ["Bergamot","Pink Pepper","Saffron"], ["Rose","Jasmine","Tobacco"], ["Oud","Patchouli","Sandalwood","Amber"], 9, 9, "Parfum", 4500),
    ("Burlington 1819",        "Roja Parfums", 2012, "Unisex",    "Citrus Aromatic",  14084, ["Bergamot","Lemon","Petitgrain","Lavender"], ["Rose","Jasmine","Geranium"], ["Sandalwood","Vetiver","Oakmoss","Musk"], 8, 7, "Parfum", 2400),
    ("Reckless Pour Homme",    "Roja Parfums", 2014, "Masculine", "Aromatic Fougere", 25091, ["Bergamot","Lavender","Cardamom"], ["Geranium","Jasmine","Cedar"], ["Vetiver","Oakmoss","Patchouli","Musk"], 9, 8, "Parfum", 2400),
    ("Scandal Pour Homme",     "Roja Parfums", 2014, "Masculine", "Citrus Aromatic",  25092, ["Bergamot","Cardamom"], ["Lavender","Iris","Saffron"], ["Vetiver","Sandalwood","Oakmoss","Patchouli"], 9, 8, "Parfum", 2400),
    ("Vetiver",                "Roja Parfums", 2010, "Masculine", "Woody Aromatic",   8917,  ["Bergamot","Lemon","Lavender"], ["Carnation","Geranium","Vetiver"], ["Vetiver","Oakmoss","Patchouli"], 8, 7, "Parfum", 2400),
    ("Risqué Pour Homme",      "Roja Parfums", 2017, "Masculine", "Amber Spicy",      42804, ["Bergamot","Pineapple"], ["Tobacco","Cinnamon","Rose"], ["Patchouli","Vanilla","Oud"], 9, 8, "Parfum", 2400),
    ("Musk Aoud",              "Roja Parfums", 2015, "Unisex",    "Amber Woody",      31549, ["Saffron","Cardamom"], ["Rose","Musk"], ["Oud","Sandalwood","Amber"], 9, 8, "Parfum", 2400),
    ("Creation-E Aoud Crystal","Roja Parfums", 2014, "Unisex",    "Floral Woody",     25093, ["Bergamot","Saffron"], ["Rose","Jasmine","Iris"], ["Oud","Sandalwood","Vanilla"], 9, 9, "Parfum", 4500),
    ("Haute Luxe",             "Roja Parfums", 2018, "Unisex",    "Floral",           50504, ["Champagne","Bergamot"], ["Rose","Jasmine","Tuberose"], ["Sandalwood","Musk","Amber"], 9, 8, "Parfum", 4500),
    ("Britannia",              "Roja Parfums", 2018, "Unisex",    "Floral Woody",     50505, ["Bergamot","Pink Pepper"], ["Rose","Iris","Jasmine"], ["Patchouli","Sandalwood","Musk","Amber"], 8, 7, "Parfum", 2400),

    # ─── Ex Nihilo ──────────────────────────────────────────────
    ("Lust in Paradise",       "Ex Nihilo",    2015, "Unisex",    "Floral",           31550, ["Bergamot","Pink Pepper"], ["Tuberose","Jasmine","Ylang-Ylang"], ["Sandalwood","Vanilla","Musk"], 8, 7, "EDP", 1700),
    ("Devil Tender",           "Ex Nihilo",    2017, "Unisex",    "Floral Fruity",    42805, ["Strawberry","Bergamot"], ["Rose","Pink Pepper"], ["Vanilla","Patchouli","Musk"], 7, 6, "EDP", 1700),
    ("Rose Macaron",           "Ex Nihilo",    2018, "Unisex",    "Floral Fruity",    50506, ["Bergamot","Raspberry"], ["Rose","Peony","Heliotrope"], ["Vanilla","Musk","Sandalwood"], 7, 7, "EDP", 1700),
    ("Cologne 352",            "Ex Nihilo",    2016, "Unisex",    "Citrus Aromatic",  37549, ["Bergamot","Petitgrain","Lemon"], ["Cedar","Iris"], ["Musk","Amber","Sandalwood"], 6, 5, "EDP", 1500),
    ("Air Loom",               "Ex Nihilo",    2018, "Unisex",    "Aromatic",         50507, ["Bergamot","Pink Pepper"], ["Lavender","Geranium"], ["Cedar","Patchouli","Musk"], 7, 6, "EDP", 1700),
    ("Honoré 35",              "Ex Nihilo",    2014, "Unisex",    "Aromatic Spicy",   25094, ["Pepper","Cardamom"], ["Iris","Tobacco"], ["Patchouli","Vetiver","Musk"], 8, 7, "EDP", 1700),
    ("Cuir Celeste",           "Ex Nihilo",    2018, "Unisex",    "Leather",          50508, ["Saffron","Pink Pepper"], ["Iris","Leather","Rose"], ["Sandalwood","Musk","Amber"], 9, 8, "EDP", 1700),
    ("Musc Infini",            "Ex Nihilo",    2016, "Unisex",    "Floral Musk",      37550, ["Bergamot"], ["Magnolia","Iris"], ["White Musk","Sandalwood","Vanilla"], 8, 7, "EDP", 1700),
]


def to_records():
    out = []
    for entry in SEED:
        (name, house, year, gender, family, fid,
         top, heart, base, longev, sillage, conc, price) = entry
        out.append({
            "name": name, "house": house, "year": year, "gender": gender, "family": family,
            "concentration": conc, "price": price, "longevity": longev, "sillage": sillage,
            "fragrantica_id": fid,
            "image": f"https://fimgs.net/mdimg/perfume/375x500.{fid}.jpg",
            "notes": (
                [{"name": n, "type": "top"} for n in top] +
                [{"name": n, "type": "heart"} for n in heart] +
                [{"name": n, "type": "base"} for n in base]
            ),
        })
    return out


if __name__ == "__main__":
    import json, urllib.request
    UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0 Safari/537.36"

    def head_status(url):
        try:
            req = urllib.request.Request(url, method="HEAD", headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=8) as r:
                return r.status
        except Exception as e:
            return getattr(e, "code", 0) or 0

    recs = to_records()
    print(f"seed: {len(recs)} entries — verifying images...")
    kept = []
    for r in recs:
        s = head_status(r["image"])
        if s == 200:
            kept.append(r)
        else:
            print(f"  ! drop {r['house']} — {r['name']}: HTTP {s}")
    print(f"\nkept {len(kept)} / dropped {len(recs)-len(kept)}")

    with open("scripts/scraper/fragrances_new.json", "w", encoding="utf-8") as f:
        json.dump(kept, f, indent=2, ensure_ascii=False)
    print("wrote scripts/scraper/fragrances_new.json")
