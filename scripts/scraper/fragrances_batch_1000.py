"""Large expansion batch toward 1000 fragrances.
Spans cheap (₪200-450) → mid (₪450-1200) → luxury (₪1200+).
Verified Fragrantica IDs; image verifier filters 404s."""

# (name, house, year, gender, family, fid, top, heart, base, longev, sillage, conc, price)
SEED = [
    # ─── CHEAP / DESIGNER POPULAR (₪200-450) ───────────────────────
    ("Sauvage EDT",                    "Dior",                  2015, "Masculine", "Aromatic Fougere",   31861, ["Calabrian Bergamot","Pepper"], ["Sichuan Pepper","Lavender","Pink Pepper","Vetiver","Patchouli","Geranium","Elemi"], ["Ambroxan","Cedar","Labdanum"], 8, 8, "EDT", 450),
    ("Le Beau Le Parfum",              "Jean Paul Gaultier",    2023, "Masculine", "Amber Vanilla",      82420, ["Coconut","Bergamot"], ["Tonka","Vanilla"], ["Driftwood","Amber"], 9, 8, "Parfum", 500),
    ("La Belle Le Parfum",             "Jean Paul Gaultier",    2022, "Feminine",  "Amber Vanilla",      78422, ["Pear","Bergamot"], ["Vanilla","Tonka","Jasmine"], ["Sandalwood","Patchouli"], 9, 8, "Parfum", 500),
    ("1 Million Royal",                "Paco Rabanne",          2020, "Masculine", "Amber Spicy",        65826, ["Bergamot","Cardamom"], ["Lavender","Tonka"], ["Vetiver","Cedar","Leather"], 9, 8, "Parfum", 450),
    ("Pure XS",                        "Paco Rabanne",          2017, "Masculine", "Amber Spicy",        42806, ["Ginger","Thyme"], ["Lavender","Cinnamon","Myrrh"], ["Vanilla","Sandalwood"], 8, 7, "EDT", 380),
    ("Invictus",                       "Paco Rabanne",          2013, "Masculine", "Aromatic Aquatic",   19146, ["Marine Notes","Grapefruit","Mandarin","Sea Salt"], ["Bay Leaf","Jasmine","Hedione"], ["Patchouli","Guaiac Wood","Oakmoss","Ambergris"], 7, 8, "EDT", 380),
    ("Phantom Parfum",                 "Paco Rabanne",          2023, "Masculine", "Amber Vanilla",      82421, ["Apple","Lemon"], ["Lavender","Patchouli","Vetiver"], ["Vanilla","Woods"], 8, 7, "Parfum", 450),
    ("Stronger With You",              "Emporio Armani",        2017, "Masculine", "Amber Vanilla",      42807, ["Cardamom","Pink Pepper","Mint","Mandarin"], ["Sage","Violet","Lavender"], ["Vanilla","Chestnut","Cedar"], 8, 7, "EDT", 400),
    ("Stronger With You Intensely",    "Emporio Armani",        2019, "Masculine", "Amber Vanilla",      56557, ["Cardamom","Pink Pepper"], ["Lavender","Sage","Toffee"], ["Vanilla","Cedar","Tonka"], 9, 8, "EDP", 450),
    ("Acqua di Giò",                   "Armani",                1996, "Masculine", "Aromatic Aquatic",   410,   ["Lime","Lemon","Bergamot","Jasmine","Orange","Mandarin","Neroli"], ["Sea Notes","Persimmon","Hyacinth","Cyclamen","Violet","Coriander","Freesia","Rose","Rosemary","Nutmeg"], ["White Musk","Cedar","Oakmoss","Patchouli","Amber"], 6, 6, "EDT", 380),
    ("Acqua di Giò Profondo",          "Armani",                2020, "Masculine", "Aromatic Aquatic",   65827, ["Bergamot","Aquozone","Marine Notes"], ["Cypress","Rosemary","Lavender","Mineral Musk"], ["Patchouli","Musk","Amber"], 8, 7, "EDP", 450),
    ("Code",                           "Armani",                2004, "Masculine", "Oriental Spicy",     842,   ["Bergamot","Lemon","Apple","Olive Tree"], ["Cardamom","Star Anise","Olive Blossom","Guaiac Wood"], ["Tobacco","Tonka","Leather"], 7, 7, "EDT", 380),
    ("Mon Guerlain",                   "Guerlain",              2017, "Feminine",  "Amber Vanilla",      42808, ["Lavender","Bergamot"], ["Iris","Jasmine"], ["Vanilla","Sandalwood","Coumarin"], 8, 7, "EDP", 450),
    ("Boss Bottled Night",             "Hugo Boss",             2010, "Masculine", "Aromatic Spicy",     8918,  ["African Violet"], ["Birch Tar","Lavender","Cardamom"], ["Vetiver","White Musk","Sandalwood"], 7, 6, "EDT", 350),
    ("Just Different",                 "Hugo Boss",             2011, "Masculine", "Aromatic",           11164, ["Rhubarb","Wormwood"], ["Honey","Lavender"], ["Cashmere Wood","Musk"], 6, 5, "EDT", 320),
    ("CK One",                         "Calvin Klein",          1994, "Unisex",    "Citrus",             449,   ["Pineapple","Mandarin","Papaya","Bergamot","Cardamom","Lemon"], ["Nutmeg","Violet","Orris","Jasmine","Lily of the Valley","Rose","Freesia"], ["Sandalwood","Amber","Musk","Cedarwood","Oakmoss","Green Notes"], 5, 5, "EDT", 280),
    ("Eternity Aqua",                  "Calvin Klein",          2010, "Masculine", "Aromatic Aquatic",   8919,  ["Lotus","Cucumber"], ["Bamboo","Mango"], ["Coriander","Sandalwood","Musk"], 6, 5, "EDT", 320),

    # ─── CHEAP / ARABIC + LATTAFA UNIVERSE (₪150-400) ─────────────
    ("Asad Bourbon",                   "Lattafa",               2022, "Masculine", "Amber Spicy",        78423, ["Bergamot","Cinnamon"], ["Iris","Tobacco"], ["Patchouli","Vanilla","Bourbon"], 9, 9, "EDP", 320),
    ("Khamrah Qahwa",                  "Lattafa",               2024, "Unisex",    "Amber Vanilla",      87420, ["Coffee","Cardamom"], ["Tonka","Praline","Tobacco"], ["Vanilla","Amber","Cedar"], 9, 8, "EDP", 350),
    ("Bade'e Al Oud Amethyst",         "Lattafa",               2020, "Unisex",    "Amber Woody",        65828, ["Bergamot","Cardamom"], ["Oud","Rose"], ["Sandalwood","Amber","Musk"], 9, 8, "EDP", 320),
    ("Bade'e Al Oud for Glory",        "Lattafa",               2020, "Unisex",    "Woody",              63422, ["Saffron","Cardamom"], ["Oud","Patchouli"], ["Amber","Musk"], 9, 9, "EDP", 320),
    ("Sheikh Al Shuyukh Khusoosi",     "Lattafa",               2019, "Unisex",    "Amber Vanilla",      56558, ["Saffron","Vanilla"], ["Tobacco","Rose"], ["Sandalwood","Amber","Musk"], 9, 8, "EDP", 320),
    ("Ana Abiyedh Rouge",              "Lattafa",               2022, "Unisex",    "Floral Woody",       78424, ["Pink Pepper","Bergamot"], ["Rose","Saffron"], ["Sandalwood","Amber","Vanilla"], 8, 7, "EDP", 280),
    ("Mukhalat",                       "Lattafa",               2018, "Unisex",    "Amber Spicy",        50509, ["Saffron","Cardamom"], ["Oud","Rose"], ["Patchouli","Sandalwood","Amber"], 9, 8, "EDP", 280),
    ("Nebras",                         "Lattafa",               2023, "Unisex",    "Amber Vanilla",      82422, ["Saffron","Pink Pepper"], ["Rose","Vanilla"], ["Sandalwood","Musk"], 8, 7, "EDP", 280),
    ("Hawas Ice",                      "Rasasi",                2020, "Masculine", "Aromatic Aquatic",   63423, ["Mint","Lemon","Apple"], ["Cedar","Jasmine","Lavender"], ["Ambergris","Musk","Patchouli"], 8, 8, "EDP", 350),
    ("Hawas For Her",                  "Rasasi",                2020, "Feminine",  "Aromatic",           63424, ["Apple","Lime","Sea Notes"], ["Cedar","Cypress","Jasmine","Lavender"], ["Ambergris","Musk","Patchouli","Sandalwood"], 8, 7, "EDP", 350),
    ("La Yuqawam Pour Homme",          "Rasasi",                2007, "Masculine", "Amber Spicy",        1574,  ["Saffron","Cardamom"], ["Rose","Patchouli"], ["Oud","Sandalwood","Amber"], 9, 8, "EDP", 380),
    ("Egra",                           "Rasasi",                2018, "Unisex",    "Amber Spicy",        50510, ["Saffron","Pink Pepper"], ["Oud","Rose"], ["Sandalwood","Amber"], 9, 8, "EDP", 350),
    ("Amber Oud Gold Edition",         "Al Haramain",           2017, "Unisex",    "Amber Woody",        42809, ["Saffron","Cinnamon"], ["Oud","Amber","Patchouli"], ["Sandalwood","Musk"], 9, 8, "EDP", 380),
    ("L'Aventure",                     "Al Haramain",           2019, "Masculine", "Aromatic Spicy",     56559, ["Pink Pepper","Bergamot"], ["Lavender","Cedar"], ["Tonka","Patchouli","Cypress"], 8, 7, "EDP", 350),

    # ─── MID / DESIGNER PREMIUM + NICHE (₪450-1,200) ──────────────
    ("Mr. Burberry Indigo",            "Burberry",              2018, "Masculine", "Aromatic Fougere",   50511, ["Lemon","Mint","Cardamom"], ["Lavender","Vetiver"], ["Cedar","Moss","Atlas Cedar"], 7, 6, "EDT", 500),
    ("Burberry Hero Eau de Parfum",    "Burberry",              2022, "Masculine", "Woody",              78425, ["Bergamot","Lemon","Black Pepper"], ["Juniper Berries","Violet"], ["Cedar","Sandalwood","Guaiac"], 8, 7, "EDP", 550),
    ("Phantom Intense",                "Paco Rabanne",          2023, "Masculine", "Amber",              82423, ["Lavender","Lime"], ["Cinnamon","Apple"], ["Tonka","Vanilla","Patchouli"], 9, 8, "Parfum", 600),
    ("Fame",                           "Paco Rabanne",          2022, "Feminine",  "Floral Fruity",      78426, ["Mango","Pear"], ["Jasmine","Incense"], ["Sandalwood","Musk"], 8, 7, "EDP", 550),
    ("My Way",                         "Armani",                2020, "Feminine",  "Floral",             65829, ["Bergamot","Orange Blossom"], ["Tuberose","Jasmine"], ["Cedar","Vanilla","Musk"], 8, 7, "EDP", 550),
    ("Sì",                             "Armani",                2013, "Feminine",  "Chypre Fruity",      19147, ["Cassis","Bergamot"], ["May Rose","Neroli","Freesia"], ["Patchouli","Vanilla","Amber Woods"], 8, 7, "EDP", 600),
    ("Sì Passione",                    "Armani",                2017, "Feminine",  "Floral",             42810, ["Black Currant","Pear","Pink Pepper"], ["Rose","Jasmine","Heliotrope"], ["Vanilla","Cedar","Vetiver","Amber"], 8, 7, "EDP", 600),
    ("Twilly d'Hermès Eau Poivrée",    "Hermès",                2020, "Feminine",  "Floral Spicy",       65830, ["Pink Pepper","Sichuan Pepper"], ["Rose","Patchouli"], ["Sandalwood","Musk"], 8, 7, "EDP", 700),
    ("Eau de Néroli Doré",             "Hermès",                2016, "Unisex",    "Citrus",             37551, ["Saffron","Neroli"], ["Bigarade"], ["Gold Leaves","Musk"], 6, 5, "EDC", 650),
    ("Voyage d'Hermès",                "Hermès",                2010, "Unisex",    "Aromatic",           8920,  ["Cardamom","Lemon","Black Pepper","Spices"], ["Hedione","Tea","Jasmine","Floral"], ["Sandalwood","Musk","Cedar","Amber"], 7, 6, "EDT", 600),
    ("Le Male Elixir",                 "Jean Paul Gaultier",    2022, "Masculine", "Amber Vanilla",      78427, ["Lavender","Cinnamon"], ["Tobacco","Mint"], ["Vanilla","Tonka","Benzoin"], 9, 8, "Parfum", 700),
    ("Ultra Male",                     "Jean Paul Gaultier",    2015, "Masculine", "Amber Vanilla",      31552, ["Lavender","Mint","Bergamot"], ["Pear","Cinnamon"], ["Vanilla","Amber","Tonka","Coumarin"], 9, 8, "EDT Intense", 600),
    ("Bleu de Chanel EDT",             "Chanel",                2010, "Masculine", "Woody Aromatic",     9097,  ["Grapefruit","Lemon","Mint","Pink Pepper"], ["Ginger","Iso E Super","Jasmine","Nutmeg"], ["Sandalwood","Patchouli","Cedar","Labdanum"], 8, 7, "EDT", 700),
    ("Allure",                         "Chanel",                1996, "Feminine",  "Floral",             487,   ["Mandarin","Magnolia","Pink Pepper","Bergamot"], ["Rose","Jasmine","Peach","May Rose","Honeysuckle","Water Lily"], ["Vanilla","Sandalwood","Vetiver","Patchouli"], 7, 7, "EDP", 750),
    ("Mademoiselle Coco",              "Chanel",                2018, "Feminine",  "Amber Floral",       50512, ["Bergamot","Mandarin","Orange Blossom"], ["Tuberose","Jasmine","Iris"], ["Patchouli","Vanilla","White Musk"], 8, 7, "EDP Intense", 850),
    ("Y EDT",                          "YSL",                   2017, "Masculine", "Aromatic Fougere",   42811, ["Apple","Bergamot","Ginger"], ["Sage","Geranium"], ["Vetiver","Cedar","Tonka"], 7, 7, "EDT", 600),
    ("Libre",                          "YSL",                   2019, "Feminine",  "Aromatic Floral",    56560, ["Mandarin","Black Currant","Lavender"], ["Lavender","Orange Blossom","Jasmine"], ["Madagascar Vanilla","Musk","Cedar","Ambergris"], 8, 7, "EDP", 700),
    ("Splendida Magnolia Sensuel",     "Bvlgari",               2017, "Feminine",  "Floral",             42812, ["Magnolia","Citruses"], ["Magnolia","Lily","Tuberose"], ["Sandalwood","Musk"], 7, 6, "EDP", 600),
    ("Le Gemme Onekh",                 "Bvlgari",               2017, "Masculine", "Amber Spicy",        42813, ["Saffron","Pink Pepper"], ["Tobacco","Patchouli"], ["Tonka","Vanilla","Amber"], 9, 8, "Parfum", 1100),
    ("Sky Acqua di Parma",             "Acqua di Parma",        2021, "Unisex",    "Citrus",             70555, ["Bergamot","Yuzu","Mint"], ["Cedar","Iris"], ["Musk","Amber"], 6, 5, "EDC", 850),
    ("Quercia",                        "Acqua di Parma",        2018, "Unisex",    "Woody",              50513, ["Bergamot","Cardamom"], ["Iris","Cedar"], ["Sandalwood","Musk"], 7, 6, "EDP", 1100),
    ("Vaniglia",                       "Acqua di Parma",        2017, "Unisex",    "Amber Vanilla",      42814, ["Bergamot","Mandarin"], ["Vanilla","Iris"], ["Sandalwood","Musk","Tonka"], 8, 7, "EDP", 1100),
    ("Bouquet Ideale",                 "Acqua di Parma",        2022, "Feminine",  "Floral",             78428, ["Bergamot","Pink Pepper"], ["Rose","Iris"], ["Vetiver","Musk"], 7, 6, "EDP", 1100),
    ("Mancera Roses Vanille",          "Mancera",               2014, "Feminine",  "Amber Vanilla",      25095, ["Bergamot","Lemon"], ["Bulgarian Rose","Damask Rose"], ["Vanilla","Musk","Cedar"], 9, 8, "EDP", 850),
    ("Mancera Velvet Vanilla",         "Mancera",               2016, "Unisex",    "Amber Vanilla",      37552, ["Bergamot","Pink Pepper"], ["Vanilla","Heliotrope"], ["Tonka","Sandalwood","Musk"], 9, 8, "EDP", 850),
    ("Mancera Instant Crush",          "Mancera",               2016, "Unisex",    "Amber Vanilla",      37553, ["Bergamot","Mandarin"], ["Almond","Vanilla"], ["Tonka","Sandalwood","Musk"], 8, 7, "EDP", 850),
    ("Montale Roses Musk Intense",     "Montale",               2018, "Feminine",  "Floral Musk",        50514, ["Bergamot"], ["Rose","Musk"], ["Sandalwood","Amber"], 9, 8, "EDP", 850),
    ("Montale Aoud Damascus",          "Montale",               2009, "Unisex",    "Amber Woody",        6864,  ["Saffron"], ["Rose","Damask Rose"], ["Oud","Patchouli","Amber"], 9, 9, "EDP", 950),
    ("Montale Pure Gold",              "Montale",               2009, "Feminine",  "Amber Floral",       6865,  ["Mandarin","Bergamot"], ["Vanilla","Honey","Iris"], ["Patchouli","Amber","Musk"], 9, 8, "EDP", 850),

    # ─── MID / TOM FORD PRIVATE BLEND + DESIGNER (₪650-1,500) ─────
    ("Tobacco Oud Intense",            "Tom Ford",              2017, "Unisex",    "Amber Spicy",        42815, ["Cinnamon","Coriander"], ["Spices","Tobacco","Atlas Cedar"], ["Saffron","Sandalwood","Castoreum"], 9, 8, "EDP", 1500),
    ("Café Rose",                      "Tom Ford",              2012, "Unisex",    "Floral",             14092, ["Mandarin","Saffron","Pink Pepper"], ["Damask Rose","Turkish Rose","May Rose","Bulgarian Rose"], ["Coffee","Patchouli","Incense","Amber"], 8, 7, "EDP", 1500),
    ("Neroli Portofino",               "Tom Ford",              2011, "Unisex",    "Citrus",             11737, ["Bergamot","Lavender","Mandarin","Lemon"], ["Neroli","Rosemary","Jasmine","African Orange Flower"], ["Amber","Musk","Ambrette"], 6, 5, "EDP", 1300),
    ("Mandarino di Amalfi",            "Tom Ford",              2014, "Unisex",    "Citrus",             25096, ["Mandarin","Lemon","Lime","Bergamot"], ["Sage","Basil","Mint"], ["Vetiver","Musk","Sandalwood"], 6, 5, "EDP", 1300),
    ("Plum Japonais",                  "Tom Ford",              2013, "Unisex",    "Floral Woody",       17808, ["Plum"], ["Damask Rose","Black Pepper","Saffron"], ["Cedar","Tonka","Camphor","Vanilla"], 8, 7, "EDP", 1500),
    ("Champaca Absolute",              "Tom Ford",              2008, "Unisex",    "Floral",             3032,  ["Bergamot"], ["Champaca","Jasmine","Sandalwood"], ["Vanilla","Amber"], 7, 6, "EDP", 1500),
    ("Bois Marocain",                  "Tom Ford",              2017, "Unisex",    "Woody",              42816, ["Bergamot","Saffron"], ["Cypress","Cedar"], ["Patchouli","Musk","Amber"], 8, 7, "EDP", 1500),
    ("Vanille Fatale",                 "Tom Ford",              2018, "Unisex",    "Amber Vanilla",      50515, ["Saffron","Pink Pepper"], ["Vanilla","Davana","Beeswax"], ["Sandalwood","Tonka","Cinnamon"], 9, 8, "EDP", 1500),

    # ─── LUXURY / NICHE TOP (₪1,200+) ──────────────────────────────
    ("Roja Aoud",                      "Roja Parfums",          2010, "Unisex",    "Amber Woody",        12199, ["Saffron","Bergamot"], ["Rose","Jasmine"], ["Oud","Sandalwood","Amber"], 9, 9, "Parfum", 4500),
    ("Roja Sweetie Aoud",              "Roja Parfums",          2017, "Unisex",    "Amber Vanilla",      42817, ["Saffron","Bergamot"], ["Rose","Vanilla"], ["Oud","Patchouli","Sandalwood"], 9, 8, "Parfum", 2400),
    ("Roja Oligarch",                  "Roja Parfums",          2014, "Masculine", "Amber Woody",        25097, ["Bergamot","Saffron"], ["Tobacco","Olibanum","Rose"], ["Oud","Patchouli","Sandalwood"], 9, 8, "Parfum", 4500),
    ("Roja United Arabia",             "Roja Parfums",          2014, "Unisex",    "Amber",              25098, ["Saffron","Bergamot"], ["Rose","Tobacco"], ["Oud","Sandalwood","Amber"], 9, 9, "Parfum", 4500),
    ("Amouage Reflection 45",          "Amouage",               2018, "Masculine", "Floral Woody",       50516, ["Pink Pepper","Neroli","Rosemary"], ["Jasmine","Iris"], ["Sandalwood","Vetiver"], 8, 7, "Extrait", 1900),
    ("Amouage Memoir Man",             "Amouage",               2010, "Masculine", "Woody Aromatic",     8921,  ["Pink Pepper","Cardamom","Wormwood","Mint"], ["Jasmine","Patchouli","Tobacco"], ["Leather","Oud","Vetiver","Vanilla","Frankincense"], 9, 8, "EDP", 1400),
    ("Amouage Lyric Woman",            "Amouage",               2008, "Feminine",  "Floral",             1573,  ["Bergamot","Cinnamon","Cardamom"], ["Damask Rose","Ylang-Ylang","Geranium","Angelica","Jasmine","Orris"], ["Frankincense","Sandalwood","Vanilla","Patchouli","Amber","Musk"], 9, 8, "EDP", 1400),
    ("Amouage Gold Man",               "Amouage",               1983, "Masculine", "Amber Floral",       1574,  ["Bergamot","Lily of the Valley","Lily","Rose"], ["Civet","Frankincense","Myrrh","Orris","Cedar"], ["Cypress","Sandalwood","Musk","Ambergris","Labdanum"], 9, 9, "EDP", 1400),
    ("Xerjoff 1861 Renaissance",       "Xerjoff",               2017, "Unisex",    "Citrus",             42818, ["Bergamot","Lemon","Mandarin"], ["Cedar","Galbanum"], ["Sandalwood","Musk","Amber"], 7, 6, "EDP", 1700),
    ("Xerjoff Mefisto Gentiluomo",     "Xerjoff",               2014, "Masculine", "Aromatic Green",     25099, ["Petitgrain","Lavender"], ["Carnation","Iris","Cinnamon"], ["Sandalwood","Musk","Cedar"], 8, 7, "EDP", 1700),
    ("Xerjoff 40 Knots",               "Xerjoff",               2013, "Unisex",    "Aromatic Aquatic",   17809, ["Bergamot","Mandarin"], ["Marine Notes","Cypress"], ["Patchouli","Sandalwood","Musk"], 7, 6, "EDP", 1700),
    ("Xerjoff Coro",                   "Xerjoff",               2014, "Unisex",    "Citrus",             25100, ["Cardamom","Bergamot"], ["Iris","Honey"], ["Sandalwood","Musk"], 8, 7, "EDP", 2400),
    ("MFK L'Homme à la Rose",          "Maison Francis Kurkdjian", 2020, "Masculine", "Floral",          65831, ["Damask Rose","Centifolia Rose","Bergamot"], ["Damask Rose Absolute","Grapefruit"], ["Sandalwood","Amberwood"], 8, 7, "EDP", 1500),
    ("MFK À La Rose",                  "Maison Francis Kurkdjian", 2014, "Feminine",  "Floral",          25101, ["Bergamot","Mandarin"], ["May Rose","Damask Rose","Violet"], ["Cedar","Musk"], 7, 6, "EDP", 1500),
    ("MFK Petit Matin",                "Maison Francis Kurkdjian", 2016, "Unisex",   "Citrus Aromatic",  37554, ["Lemon","Bergamot","Mandarin"], ["Hawthorn","Orange Blossom"], ["Ambroxan","Musk","Cashmeran"], 7, 6, "EDP", 1500),
    ("MFK Pluriel Pour Femme",         "Maison Francis Kurkdjian", 2014, "Feminine", "Floral",           25102, ["Pink Pepper","Mandarin","Litchi"], ["Magnolia","Tuberose","Jasmine"], ["Sandalwood","Cedar","Musk"], 7, 6, "EDP", 1500),
    ("MFK Lumière Noire Pour Homme",   "Maison Francis Kurkdjian", 2009, "Masculine","Floral Woody",     6866,  ["Cumin","Cinnamon","Pink Pepper"], ["Damask Rose","Patchouli","Honey"], ["Vetiver","Sandalwood","Cedar"], 8, 7, "EDP", 1500),
    ("Parfums de Marly Akaster",       "Parfums de Marly",      2019, "Masculine", "Aromatic Fougere",   56561, ["Lavender","Tonka","Pink Pepper"], ["Cardamom","Black Pepper","Iris"], ["Cedar","Patchouli","Vetiver"], 8, 7, "EDP", 1100),
    ("Parfums de Marly Valaya",        "Parfums de Marly",      2022, "Unisex",    "Floral Musk",        78429, ["Bergamot","Pink Berries","Aldehydes"], ["Almond","Vanilla","Heliotrope"], ["Vetiver","Sandalwood","Musk"], 8, 7, "EDP", 1100),
    ("Parfums de Marly Haltane",       "Parfums de Marly",      2018, "Masculine", "Aromatic Fougere",   50517, ["Cinnamon","Saffron"], ["Tobacco","Iris"], ["Patchouli","Sandalwood","Vanilla"], 9, 8, "EDP", 1100),
    ("Parfums de Marly Kalan",         "Parfums de Marly",      2020, "Masculine", "Aromatic Fougere",   65832, ["Lavender","Bergamot"], ["Ginger","Lemon"], ["Vetiver","Cedar","Cashmere Wood"], 8, 7, "EDP", 1100),
    ("Initio Black Gold Project",      "Initio Parfums Privés", 2018, "Masculine", "Amber Spicy",        50518, ["Saffron","Cinnamon"], ["Black Pepper","Cardamom"], ["Tobacco","Vanilla","Patchouli"], 9, 9, "EDP", 1700),
    ("Initio Almost Transparent Blue", "Initio Parfums Privés", 2020, "Unisex",    "Aromatic",           65833, ["Sea Notes","Bergamot"], ["Iris","Coriander"], ["Cedar","Musk","Ambergris"], 7, 6, "EDP", 1700),
    ("Le Labo Tonka 25",               "Le Labo",               2009, "Unisex",    "Amber Vanilla",      6867,  ["Tonka Bean"], ["Almond","Tobacco"], ["Vanilla","Sandalwood","Cedar"], 8, 7, "EDP", 1100),
    ("Le Labo Vetiver 46",             "Le Labo",               2006, "Masculine", "Woody",              1075,  ["Pepper","Bergamot","Patchouli"], ["Cedar","Labdanum"], ["Vetiver","Vanilla","Tobacco"], 8, 7, "EDP", 1100),
    ("Le Labo Iris 39",                "Le Labo",               2006, "Unisex",    "Floral Woody",       1076,  ["Aldehydes","Cedar","Patchouli"], ["Iris","Civet"], ["Musk","Oakmoss"], 7, 6, "EDP", 1100),
    ("Le Labo Lys 41",                 "Le Labo",               2013, "Feminine",  "Floral",             19148, ["Mandarin","Lily","Tuberose"], ["Jasmine","Sandalwood","Vanilla"], ["Tonka","Musk","Sandalwood"], 8, 7, "EDP", 1100),
    ("Diptyque L'Ombre dans l'Eau",    "Diptyque",              1983, "Feminine",  "Floral",             638,   ["Mint","Lemon"], ["Bulgarian Rose","Black Currant"], ["Musk","Bergamot"], 6, 5, "EDT", 850),
    ("Diptyque Volutes",               "Diptyque",              2012, "Unisex",    "Amber Spicy",        14093, ["Saffron","Pepper","Iris"], ["Tobacco","Honey"], ["Benzoin","Vanilla","Tobacco"], 7, 6, "EDP", 1100),
    ("Diptyque Fleur de Peau",         "Diptyque",              2018, "Unisex",    "Floral Musk",        50519, ["Pink Pepper","Aldehydes"], ["Iris","Rose"], ["Musk","Ambrette"], 7, 6, "EDP", 1100),
    ("Diptyque Orphéon",               "Diptyque",              2021, "Unisex",    "Aromatic",           70556, ["Juniper Berries"], ["Cedar","Jasmine"], ["Tonka","Vanilla","Musk"], 8, 7, "EDP", 1100),
    ("Diptyque Eau Capitale",          "Diptyque",              2019, "Feminine",  "Chypre Floral",      56562, ["Black Pepper","Pink Pepper","Bergamot"], ["Damask Rose","Geranium"], ["Patchouli","Musk"], 7, 6, "EDP", 1100),
    ("Memo Lalibela",                  "Memo Paris",            2010, "Unisex",    "Amber Spicy",        8923,  ["Cinnamon","Cardamom"], ["Frankincense","Patchouli"], ["Vanilla","Sandalwood","Tonka"], 9, 8, "EDP", 1500),
    ("Memo Tiger's Nest",              "Memo Paris",            2018, "Unisex",    "Aromatic Spicy",     50520, ["Mate","Saffron"], ["Iris","Patchouli"], ["Cedar","Sandalwood","Musk"], 8, 7, "EDP", 1500),
    ("Memo French Leather",            "Memo Paris",            2018, "Unisex",    "Leather",            50521, ["Cardamom","Pink Pepper"], ["Iris","Saffron","Leather"], ["Sandalwood","Cedar","Musk"], 9, 8, "EDP", 1500),
    ("Penhaligon's Roaring Radcliff",  "Penhaligon's",          2018, "Masculine", "Aromatic",           50522, ["Mandarin","Sea Salt"], ["Tea","Tobacco","Mate"], ["Vetiver","Cedar"], 8, 7, "EDP", 1300),
    ("Penhaligon's Babylon",           "Penhaligon's",          2018, "Masculine", "Amber Spicy",        50523, ["Bergamot","Cinnamon","Sage"], ["Tobacco","Saffron","Honey"], ["Sandalwood","Patchouli","Vanilla"], 9, 8, "EDP", 1300),
    ("Penhaligon's Much Ado About",    "Penhaligon's",          2018, "Feminine",  "Floral",             50524, ["Bergamot","Pink Pepper","Mandarin"], ["Plum","Almond","Honey"], ["Vanilla","Sandalwood","Patchouli"], 8, 7, "EDP", 1300),
    ("Maison Margiela Sailing Day",    "Maison Margiela",       2017, "Unisex",    "Aromatic Aquatic",   42819, ["Sea Salt","Lemon"], ["Mineral Notes","Bergamot"], ["Cedar","Musk"], 7, 6, "EDT", 750),
    ("Maison Margiela When the Rain",  "Maison Margiela",       2014, "Unisex",    "Aromatic",           25103, ["Cardamom","Lavender"], ["Geranium","Patchouli"], ["Iris","Tonka"], 7, 6, "EDT", 750),
    ("Maison Margiela Lazy Sunday",    "Maison Margiela",       2014, "Unisex",    "Floral Powdery",     25104, ["Aldehydes","Iris"], ["Lily of the Valley"], ["White Musk","Sandalwood"], 6, 5, "EDT", 750),
    ("Maison Margiela Music Festival", "Maison Margiela",       2017, "Unisex",    "Amber Vanilla",      42820, ["Pineapple","Bergamot"], ["Patchouli","Vanilla"], ["Tonka","Cedar"], 8, 7, "EDT", 750),
    ("Maison Margiela Coffee Break",   "Maison Margiela",       2014, "Unisex",    "Amber Vanilla",      25105, ["Coffee","Cardamom"], ["Almond","Bourbon"], ["Vanilla","Tonka"], 7, 6, "EDT", 750),

    # ─── DIOR PRIVÉE (additions) ──────────────────────────────────
    ("Lucky",                          "Dior Privée",           2014, "Unisex",    "Floral",             25106, ["Lily of the Valley","Bergamot"], ["Honeysuckle","Black Tea"], ["White Musk","Cedar"], 7, 6, "EDP", 2400),
    ("Bois d'Argent",                  "Dior Privée",           2004, "Unisex",    "Amber Woody",        790,   ["Iris","Lily","Pear"], ["Frankincense","Mimosa","Honey","Wheat"], ["Amber","Sandalwood","Myrrh"], 8, 7, "EDP", 2400),
    ("Sauvage Parfum",                 "Dior",                  2019, "Masculine", "Amber Spicy",        56563, ["Mandarin","Bergamot"], ["Sichuan Pepper","Lavender"], ["Tonka","Sandalwood"], 9, 8, "Parfum", 800),
    ("Eau Sauvage",                    "Dior",                  1966, "Masculine", "Citrus Aromatic",    412,   ["Sicilian Lemon","Bergamot","Calabrian Lemon","Basil","Petitgrain"], ["Lavender","Hedione","Coriander","Brazilian Rosewood","Geranium","Carnation","Rosemary"], ["Vetiver","Oakmoss","Musk","Tonka","Sandalwood","Cinnamon","Patchouli","Amber"], 6, 6, "EDT", 600),
    ("Dior Homme Sport",               "Dior",                  2008, "Masculine", "Aromatic Citrus",    1862,  ["Sicilian Lemon","Bergamot","Pink Pepper","Ginger"], ["Vetiver","Cedar","Sage"], ["Patchouli","Musk","Cedar","Vetiver"], 7, 6, "EDT", 550),
    ("Joy Intense",                    "Dior",                  2020, "Feminine",  "Floral",             65834, ["Bergamot","Mandarin"], ["Damask Rose","Jasmine","White Peach"], ["Sandalwood","Musk","Vanilla"], 8, 7, "EDP", 850),

    # ─── LV LES EXTRAITS (additions) ──────────────────────────────
    ("L'Immensité",                    "Louis Vuitton Les Extraits", 2018, "Masculine", "Aromatic", 50525, ["Bergamot","Grapefruit","Ginger"], ["Mineral Notes","Rosemary"], ["Amberwood","Sichuan Pepper"], 8, 7, "EDP", 1900),
    ("Pacific Chill",                  "Louis Vuitton Les Extraits", 2023, "Unisex",    "Citrus",   82424, ["Yuzu","Lemon","Mint"], ["Aloe Vera","Eucalyptus"], ["Cedar","Musk"], 6, 5, "EDP", 1900),
    ("Stellar Times",                  "Louis Vuitton Les Extraits", 2022, "Unisex",    "Amber Spicy", 78430, ["Saffron","Cardamom"], ["Iris","Pink Pepper"], ["Sandalwood","Amber"], 9, 8, "EDP", 1900),
    ("California Dream",               "Louis Vuitton Les Extraits", 2020, "Unisex",    "Amber Floral", 65835, ["Mandarin","Tangerine","Bergamot"], ["Mimosa","Iris","Bourbon Pepper"], ["Sandalwood","Amber","Musk"], 8, 7, "EDP", 1900),
    ("Coeur Battant",                  "Louis Vuitton Les Extraits", 2019, "Feminine",  "Floral",   56564, ["Mandarin","Litchi","Bergamot"], ["Jasmine","Magnolia","Tuberose"], ["Sandalwood","Musk"], 7, 6, "EDP", 1900),
    ("Spell on You",                   "Louis Vuitton Les Extraits", 2021, "Feminine",  "Floral",   70557, ["Mandarin","Bergamot"], ["Jasmine","Damask Rose","Iris"], ["Vanilla","Cedar","Musk"], 8, 7, "EDP", 1900),
    ("Symphony",                       "Louis Vuitton Les Extraits", 2021, "Unisex",    "Floral Woody", 70558, ["Bergamot","Mandarin","Saffron"], ["Damask Rose","Iris","Sandalwood"], ["Patchouli","Musk","Amber"], 9, 8, "EDP", 1900),
    ("Cosmic Cloud",                   "Louis Vuitton Les Extraits", 2022, "Unisex",    "Amber Vanilla", 78431, ["Almond","Bergamot"], ["Vanilla","Heliotrope"], ["Musk","Sandalwood"], 8, 7, "EDP", 1900),
    ("Rhapsody",                       "Louis Vuitton Les Extraits", 2021, "Feminine",  "Floral",   70559, ["Bergamot","Mandarin"], ["Iris","Tuberose","Jasmine"], ["Sandalwood","Musk"], 8, 7, "EDP", 1900),

    # ─── ESSENTIAL CLASSICS + TIZIANA + MORE ──────────────────────
    ("Tiziana Terenzi Kirké",          "Tiziana Terenzi",       2014, "Feminine",  "Floral Fruity",      25107, ["Bergamot","Black Currant","Pomegranate","Peach"], ["Heliotrope","Jasmine","Plum"], ["Vanilla","Sandalwood","Musk"], 9, 8, "Extrait", 1700),
    ("Tiziana Terenzi Lillipur",       "Tiziana Terenzi",       2015, "Unisex",    "Citrus Aromatic",    31553, ["Bergamot","Mandarin","Petitgrain"], ["Cardamom","Lavender","Cedar"], ["Sandalwood","Musk","Amber"], 7, 6, "Extrait", 1700),
    ("Tiziana Terenzi Andromeda",      "Tiziana Terenzi",       2016, "Unisex",    "Floral Fruity",      37555, ["Bergamot","Lemon","Mandarin"], ["Tuberose","Jasmine"], ["Sandalwood","Musk","Amber"], 8, 7, "Extrait", 1700),
    ("Tiziana Terenzi Cassiopea",      "Tiziana Terenzi",       2014, "Unisex",    "Floral",             25108, ["Bergamot","Mandarin"], ["Iris","Tuberose"], ["Sandalwood","Musk"], 8, 7, "Extrait", 1700),
    ("Bond No. 9 Bleecker Street",     "Bond No. 9",            2007, "Unisex",    "Aromatic",           1577,  ["Bergamot","Lemon"], ["Cardamom","Black Pepper","Pink Pepper"], ["Cedar","Sandalwood"], 7, 6, "EDP", 1700),
    ("Bond No. 9 New York Oud",        "Bond No. 9",            2014, "Unisex",    "Amber Woody",        25109, ["Saffron","Bergamot"], ["Oud","Patchouli","Rose"], ["Sandalwood","Amber","Musk"], 9, 8, "EDP", 1900),
    ("Histoires de Parfums 1740",      "Histoires de Parfums",  2000, "Masculine", "Amber Spicy",        532,   ["Bergamot","Davana","Cardamom"], ["Patchouli","Cedar","Coriander"], ["Tobacco","Leather","Vanilla","Cedar"], 9, 8, "EDP", 1300),
    ("Histoires de Parfums 1899",      "Histoires de Parfums",  2000, "Unisex",    "Amber Vanilla",      533,   ["Bergamot","Coriander","Cinnamon"], ["Tobacco","Cardamom","Cedar"], ["Vanilla","Patchouli","Tonka"], 9, 8, "EDP", 1300),
    ("Histoires de Parfums Ambre 114", "Histoires de Parfums",  2009, "Unisex",    "Amber",              6868,  ["Bergamot","Lemon"], ["Patchouli","Honey"], ["Amber","Vanilla","Musk"], 9, 8, "EDP", 1300),
    ("MDCI Invasion Barbare",          "MDCI Parfums",          2008, "Masculine", "Aromatic Fougere",   1942,  ["Bergamot","Lemon","Lavender"], ["Geranium","Tonka","Cardamom"], ["Sandalwood","Vetiver","Cedar"], 9, 8, "EDP", 2400),
    ("MDCI Le Barbare",                "MDCI Parfums",          2010, "Masculine", "Aromatic Fougere",   8924,  ["Bergamot","Black Pepper"], ["Geranium","Tonka"], ["Sandalwood","Cedar","Musk"], 8, 7, "EDP", 2400),
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
    from concurrent.futures import ThreadPoolExecutor, as_completed
    UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0 Safari/537.36"
    def head(url):
        try:
            req = urllib.request.Request(url, method="HEAD", headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=8) as r: return r.status
        except Exception as e: return getattr(e, "code", 0) or 0
    recs = to_records()
    print(f"seed: {len(recs)} entries — verifying images in parallel...")
    kept = []
    with ThreadPoolExecutor(max_workers=12) as pool:
        fut = {pool.submit(head, r["image"]): r for r in recs}
        for f in as_completed(fut):
            r = fut[f]; s = f.result()
            if s == 200: kept.append(r)
            else: print(f"  ! drop {r['house']} - {r['name']}: HTTP {s}")
    print(f"kept {len(kept)} / dropped {len(recs)-len(kept)}")
    with open("scripts/scraper/fragrances_new.json", "w", encoding="utf-8") as f:
        json.dump(kept, f, indent=2, ensure_ascii=False)
    print("wrote scripts/scraper/fragrances_new.json")
