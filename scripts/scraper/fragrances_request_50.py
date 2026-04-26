"""User-requested batch of 50 fragrances.
Format matches fragrances_seed.SEED tuples; merge.py dedups by (name, house)."""

# (name, house, year, gender, family, fid, top, heart, base, longev, sillage, conc, price)
SEED = [
    # ─── Parfums de Marly (most exist already; dedup will handle) ──
    ("Herod",                     "Parfums de Marly", 2012, "Masculine", "Amber Spicy",       21290, ["Cinnamon","Black Pepper"], ["Tobacco Leaf","Osmanthus","Incense","Labdanum"], ["Vanilla","Cedar"], 9, 8, "EDP", 1100),
    ("Carlisle",                  "Parfums de Marly", 2017, "Unisex",    "Amber Spicy",       44614, ["Bergamot","Pink Pepper","Saffron","Nutmeg"], ["Rose","Jasmine","Tuberose","Ylang-Ylang"], ["Patchouli","Sandalwood","Vanilla","Amber"], 9, 9, "EDP", 1100),
    ("Sedley",                    "Parfums de Marly", 2018, "Unisex",    "Aromatic",          50496, ["Bergamot","Mint","Lemon"], ["Lily of the Valley","Pink Pepper"], ["Musk","Cedar","Cypress"], 7, 6, "EDP", 1100),
    ("Percival",                  "Parfums de Marly", 2019, "Masculine", "Aromatic Fougere",  56550, ["Lavender","Bergamot","Pink Pepper"], ["Geranium","Rose","Apple"], ["Cedar","Musk","Vetiver","Cashmere"], 8, 7, "EDP", 1100),
    ("Delina",                    "Parfums de Marly", 2017, "Feminine",  "Floral",            42013, ["Lychee","Rhubarb","Bergamot","Nutmeg"], ["Turkish Rose","Peony","Lily of the Valley"], ["Vanilla","Incense","Cashmere Wood","Musk"], 8, 8, "EDP", 1100),

    # ─── Xerjoff ─────────────────────────────────────────────────
    ("Lira",                      "Xerjoff",          2009, "Unisex",    "Amber Vanilla",     6862,  ["Bergamot","Lavender"], ["Caramel","Almond"], ["Vanilla","Tonka","Benzoin"], 8, 7, "EDP", 1700),
    ("Irisss",                    "Xerjoff",          2010, "Feminine",  "Floral",            8915,  ["Bergamot","Mandarin"], ["Iris","Jasmine","Tuberose"], ["Sandalwood","Patchouli","Musk"], 8, 7, "EDP", 1700),
    ("Alexandria II",             "Xerjoff",          2013, "Unisex",    "Amber Spicy",       17807, ["Cinnamon"], ["Honey","Yellow Mandarin","Vanilla"], ["Sandalwood","Vanilla","Musk"], 9, 8, "EDP", 2400),
    ("Nio",                       "Xerjoff",          2015, "Unisex",    "Citrus Aromatic",   31548, ["Bergamot","Petitgrain","Lemon"], ["Jasmine","Cedar"], ["Musk","Cedar","Patchouli"], 7, 6, "EDP", 1700),

    # ─── Amouage ────────────────────────────────────────────────
    ("Jubilation XXV",            "Amouage",          2007, "Masculine", "Woody Chypre",      1572,  ["Black Berries","Bergamot","Coriander"], ["Frankincense","Rose","Cinnamon","Honey"], ["Patchouli","Amber","Myrrh","Vetiver"], 9, 8, "EDP", 1400),
    ("Epic Man",                  "Amouage",          2009, "Masculine", "Woody Spicy",       6863,  ["Cinnamon","Pink Pepper","Cardamom","Pepper"], ["Rose","Geranium","Jasmine","Frankincense"], ["Sandalwood","Oud","Patchouli","Vetiver","Cedar"], 9, 8, "EDP", 1400),
    ("Honour Man",                "Amouage",          2011, "Masculine", "Woody",             11162, ["Pepper","Coriander"], ["Iris","Frankincense","Leather"], ["Cedar","Vetiver","Tonka","Vanilla","Musk"], 8, 7, "EDP", 1400),
    ("Enclave",                   "Amouage",          2019, "Unisex",    "Floral Woody",      56554, ["Bergamot","Pink Pepper","Saffron"], ["Tuberose","Jasmine","Geranium"], ["Vetiver","Patchouli","Sandalwood","Frankincense"], 9, 8, "EDP", 1400),

    # ─── Creed ──────────────────────────────────────────────────
    ("Silver Mountain Water",     "Creed",            1995, "Unisex",    "Citrus",            478,   ["Bergamot","Mandarin Orange"], ["Green Tea","Black Currant"], ["Galbanum","Sandalwood","Musk"], 6, 5, "EDP", 1700),
    ("Millesime Imperial",        "Creed",            1995, "Unisex",    "Citrus Aromatic",   479,   ["Sea Notes","Sicilian Lemon","Bergamot"], ["Iris","Mandarin Orange"], ["Musk","Sea Salt","Sandalwood"], 7, 6, "EDP", 1700),
    ("Viking",                    "Creed",            2017, "Masculine", "Aromatic Spicy",    43156, ["Bergamot","Lemon","Pink Pepper","Mint"], ["Rose","Spices","Lavender"], ["Vetiver","Sandalwood","Patchouli"], 7, 6, "EDP", 1500),
    ("Himalaya",                  "Creed",            2002, "Masculine", "Woody Aromatic",    687,   ["Bergamot","Lemon","Grapefruit"], ["Sandalwood","Cedar"], ["Musk","Ambergris","Vetiver"], 7, 6, "EDT", 1700),

    # ─── Tom Ford ───────────────────────────────────────────────
    ("Black Orchid",              "Tom Ford",         2006, "Unisex",    "Oriental Floral",   1018,  ["Truffle","Gardenia","Black Currant","Ylang-Ylang"], ["Orchid","Spices","Lotus","Fruity Notes"], ["Patchouli","Vanilla","Incense","Sandalwood"], 9, 8, "EDP", 850),
    ("Noir de Noir",              "Tom Ford",         2007, "Unisex",    "Floral Woody",      1019,  ["Saffron","Black Truffle"], ["Black Rose"], ["Patchouli","Vanilla","Agarwood","Tree Moss"], 8, 7, "EDP", 1450),
    ("Rose Prick",                "Tom Ford",         2020, "Unisex",    "Floral",            65825, ["Sichuan Pepper","Turkish Rose","Bulgarian Rose","May Rose"], ["Patchouli"], ["Tonka Bean","Sandalwood","Amber"], 8, 7, "EDP", 1500),
    ("Soleil Blanc",              "Tom Ford",         2016, "Unisex",    "Amber Floral",      34032, ["Bergamot","Pistachio","Cardamom","Pink Pepper"], ["Tuberose","Ylang-Ylang","Jasmine Sambac"], ["Coconut","Amber","Tonka","Benzoin"], 7, 7, "EDP", 1300),

    # ─── Maison Margiela Replica ────────────────────────────────
    ("Replica Jazz Club",         "Maison Margiela",  2013, "Masculine", "Aromatic Spicy",    21420, ["Pink Pepper","Neroli","Lemon"], ["Rum","Tobacco Leaf","Java Vetiver"], ["Vanilla","Tonka","Styrax","Benzoin"], 8, 7, "EDT", 750),
    ("Replica Beach Walk",        "Maison Margiela",  2012, "Unisex",    "Aromatic",          14081, ["Bergamot","Pink Pepper","Lemon"], ["Coconut Milk","Ylang-Ylang","Heliotrope"], ["Musk","Cedar","Benzoin"], 6, 6, "EDT", 750),
    ("Replica By the Fireplace",  "Maison Margiela",  2015, "Unisex",    "Amber",             31541, ["Pink Pepper","Orange Blossom","Clove"], ["Chestnut","Guaiac Wood","Juniper Berries"], ["Vanilla","Peru Balsam","Cashmeran"], 8, 7, "EDT", 750),
    ("Replica Flower Market",     "Maison Margiela",  2018, "Feminine",  "Floral",            50500, ["Tuberose","Cassia"], ["Rose","Jasmine","Freesia"], ["Musk","Sweet Notes"], 6, 5, "EDT", 750),

    # ─── Diptyque ───────────────────────────────────────────────
    ("Philosykos",                "Diptyque",         1996, "Unisex",    "Woody Floral",      635,   ["Fig Leaf"], ["Coconut","Fig","Green Notes"], ["Cedar","Woody Notes"], 6, 5, "EDT", 850),
    ("Tam Dao",                   "Diptyque",         2003, "Unisex",    "Woody",             641,   ["Italian Cypress","Rosewood","Pink Pepper"], ["Sandalwood","Myrtle","Rose"], ["Spices","Amber","White Musk"], 7, 6, "EDT", 850),
    ("Eau Duelle",                "Diptyque",         2010, "Unisex",    "Woody Spicy",       8929,  ["Cardamom","Pink Pepper","Saffron","Bergamot"], ["Black Tea","Vanilla","Elemi"], ["Vanilla","Musk"], 7, 6, "EDT", 850),
    ("Do Son",                    "Diptyque",         2005, "Feminine",  "Floral",            640,   ["Tuberose","Orange Blossom","Iris","African Orange Flower","Rose","Pink Pepper"], [], ["Musk","Benzoin"], 7, 7, "EDT", 850),

    # ─── Penhaligon's ───────────────────────────────────────────
    ("Halfeti",                   "Penhaligon's",     2015, "Unisex",    "Amber Floral",      32195, ["Cypress","Bergamot","Bigarade","Cardamom","Saffron"], ["Rose","Jasmine","Lavender","Tulip"], ["Oud","Sandal","Leather","Tonka","Cedar"], 9, 8, "EDP", 1300),
    ("Lothair",                   "Penhaligon's",     2016, "Masculine", "Floral Woody",      37548, ["Fig","Bergamot","Spices"], ["Iris","Jasmine"], ["Sandalwood","Musk","Cedar"], 8, 7, "EDP", 1300),
    ("Empressa",                  "Penhaligon's",     2018, "Feminine",  "Amber Vanilla",     50501, ["Mandarin","Davana","Saffron"], ["Tuberose","Rose","Cinnamon"], ["Vanilla","Sandalwood","Patchouli","Tonka"], 8, 7, "EDP", 1300),

    # ─── Serge Lutens ───────────────────────────────────────────
    ("Ambre Sultan",              "Serge Lutens",     2000, "Unisex",    "Amber Spicy",       546,   ["Coriander","Bay Leaf","Myrtle"], ["Amber","Benzoin","Vanilla","Sandalwood","Patchouli"], ["Tonka","Musk"], 9, 8, "EDP", 1300),
    ("Borneo 1834",               "Serge Lutens",     2005, "Unisex",    "Woody",             1200,  ["Patchouli","Galbanum","Cardamom"], ["Cocoa","French Labdanum"], ["Musk","Vanilla"], 9, 8, "EDP", 1300),
    ("Chergui",                   "Serge Lutens",     2005, "Unisex",    "Amber",             1199,  ["Honey","Iris","Hay"], ["Tobacco Leaf","Sugar"], ["Amber","Musk","Sandalwood","Incense","Rose"], 9, 8, "EDP", 1300),

    # ─── Ex Nihilo ──────────────────────────────────────────────
    ("Fleur Narcotique",          "Ex Nihilo",        2014, "Unisex",    "Floral",            25087, ["Lychee","White Peach","Bergamot"], ["Peony","Lily of the Valley","Jasmine","Orange Blossom"], ["Musk","Oakmoss","Cedar"], 7, 7, "EDP", 1700),
    ("Outcast Silver",            "Ex Nihilo",        2018, "Unisex",    "Aromatic",          50502, ["Bergamot","Pepper"], ["Iris","Vetiver"], ["Musk","Cedar","Amber"], 8, 7, "EDP", 1700),

    # ─── Memo Paris ─────────────────────────────────────────────
    ("Irish Leather",             "Memo Paris",       2014, "Masculine", "Leather",           28021, ["Mate","Juniper Berries"], ["Hawthorn","Bourbon Geranium","Leather"], ["Tonka","Sandalwood"], 8, 7, "EDP", 1500),
    ("Inlé",                      "Memo Paris",       2014, "Unisex",    "Aromatic",          28022, ["Bergamot","Aldehydes","Cardamom","Mate"], ["Rose","Magnolia","Jasmine","Iris"], ["Sandalwood","Musk","Cedar"], 8, 7, "EDP", 1500),

    # ─── Orto Parisi ────────────────────────────────────────────
    ("Megamare",                  "Orto Parisi",      2015, "Unisex",    "Aromatic Aquatic",  31542, ["Marine Notes","Algae","Salt"], ["Ambergris","Driftwood"], ["Musk","Cedar"], 9, 9, "Parfum", 1700),
    ("Viride",                    "Orto Parisi",      2017, "Unisex",    "Aromatic Green",    42803, ["Mint","Galbanum","Pepper"], ["Vetiver","Patchouli"], ["Cedar","Musk"], 8, 7, "Parfum", 1700),

    # ─── Tauer ──────────────────────────────────────────────────
    ("Lonestar Memories",         "Tauer Perfumes",   2007, "Masculine", "Leather",           1573,  ["Birch Tar","Geranium","Carrot Seed"], ["Jasmine","Tobacco Leaf"], ["Leather","Sandalwood","Vetiver","Cedar"], 9, 8, "EDP", 1100),
    ("L'Air du Désert Marocain",  "Tauer Perfumes",   2005, "Unisex",    "Amber Spicy",       1198,  ["Coriander","Petitgrain","Bergamot","Lemon"], ["Cumin","Cistus","Jasmine","Rose","Cedar"], ["Amber","Vetiver","Frankincense","Patchouli","Vanilla","Tonka","Sandalwood","Labdanum","Myrrh"], 9, 9, "EDP", 1100),
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
    kept, dropped = [], []
    for r in recs:
        s = head_status(r["image"])
        if s == 200:
            kept.append(r)
        else:
            dropped.append((r["name"], r["house"], s))
            print(f"  ! drop {r['house']} — {r['name']}: HTTP {s}")
    print(f"\nkept {len(kept)} / dropped {len(dropped)}")

    out = "scripts/scraper/fragrances_new.json"
    with open(out, "w", encoding="utf-8") as f:
        json.dump(kept, f, indent=2, ensure_ascii=False)
    print(f"wrote {out}")
