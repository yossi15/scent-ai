"""Third large expansion batch toward 1000.
Focus: Chanel Les Exclusifs, Tom Ford Private Blend, Estée Lauder, Aerin,
more Donna Karan / Vera Wang / Givenchy, Aesop, Annick Goutal, Atkinsons,
Comme des Garçons, more Mancera/Montale, Aramis classics, Hugo Boss back."""

# (name, house, year, gender, family, fid, top, heart, base, longev, sillage, conc, price)
SEED = [
    # ─── CHANEL LES EXCLUSIFS DEEP CUTS ───────────────────────────
    ("Chanel 1932",                   "Chanel",                2013, "Feminine",  "Floral",             19154, ["Bergamot","Aldehydes"], ["Iris","Rose","Jasmine"], ["Sandalwood","Vetiver","Vanilla"], 7, 6, "EDP", 1500),
    ("Chanel Misia",                  "Chanel",                2015, "Feminine",  "Floral Powdery",     31563, ["Pink Pepper","Bulgarian Rose"], ["Tonka","Iris","Violet"], ["Leather","Tonka","Benzoin"], 8, 7, "EDP", 1500),
    ("Chanel Jersey",                 "Chanel",                2011, "Feminine",  "Aromatic",           11739, ["Lavender","Bergamot"], ["Rose","Jasmine","Neroli"], ["Vanilla","Tonka","Sandalwood","Musk"], 7, 6, "EDP", 1500),
    ("Chanel Coromandel EDT",         "Chanel",                2007, "Unisex",    "Amber",              1608,  ["Bergamot","Bitter Orange","Aldehydes"], ["Patchouli","Iris","Jasmine","Rose"], ["Amber","Benzoin","Labdanum","Tonka","White Chocolate"], 8, 7, "EDT", 1500),
    ("Chanel Egoiste",                "Chanel",                1990, "Masculine", "Amber Spicy",        454,   ["Mandarin Orange","Coriander","Tarragon","Bergamot","Damask Rose"], ["Sandalwood","Rosewood","Carnation","Coriander"], ["Vanilla","Tonka","Ambrette","Amber"], 8, 7, "EDT", 750),
    ("Chanel Antaeus",                "Chanel",                1981, "Masculine", "Aromatic",           455,   ["Sage","Lemon","Lavender","Lime","Coriander","Bergamot","Myrtle","Thyme"], ["Patchouli","Geranium","Cistus","Rose","Jasmine","Castoreum"], ["Cedar","Vetiver","Sandalwood","Olibanum","Oakmoss","Labdanum"], 8, 8, "EDT", 750),

    # ─── TOM FORD PRIVATE BLEND DEEP CUTS ─────────────────────────
    ("Tom Ford Italian Cypress",      "Tom Ford",              2008, "Unisex",    "Woody Aromatic",     2014,  ["Pine Needle","Lemon","Bergamot","Italian Mandarin","Lavender"], ["Cypress","Basil","Mint","Pimento Berries"], ["Vetiver","Cardamom","Anise"], 7, 7, "EDP", 1500),
    ("Tom Ford Beau de Jour",         "Tom Ford",              2019, "Masculine", "Aromatic Fougere",   56573, ["Lavender","Geranium","Rosemary"], ["Basil","Mint"], ["Oakmoss","Patchouli","Amber"], 8, 7, "EDP", 1500),
    ("Tom Ford Tobacco Vanille EDP",  "Tom Ford",              2007, "Unisex",    "Amber Spicy",        1825,  ["Tobacco Leaf","Spices"], ["Tonka Bean","Tobacco Blossom","Vanilla","Cocoa"], ["Dried Fruits","Woody Notes"], 9, 8, "EDP", 1500),
    ("Tom Ford Lavender Extreme",     "Tom Ford",              2017, "Unisex",    "Aromatic",           42838, ["Lavender","Geranium","Bergamot"], ["Rose","Carnation"], ["Cedar","Vanilla","Patchouli"], 8, 7, "EDP", 1500),
    ("Tom Ford Beau de Soie",         "Tom Ford",              2019, "Unisex",    "Floral Woody",       56574, ["Bergamot","Geranium"], ["Iris","Patchouli"], ["Sandalwood","Cedar","Musk"], 8, 7, "EDP", 1500),
    ("Tom Ford Vanilla Sex",          "Tom Ford",              2024, "Unisex",    "Amber Vanilla",      87422, ["Pink Pepper","Bourbon"], ["Vanilla Bean","Iris"], ["Sandalwood","Cashmeran"], 9, 8, "EDP", 1500),
    ("Tom Ford Black Lacquer",        "Tom Ford",              2024, "Unisex",    "Floral Woody",       87423, ["Mandarin","Pink Pepper","Saffron"], ["Black Cherry","Iris","Cocoa"], ["Sandalwood","Patchouli","Vanilla"], 9, 8, "EDP", 1500),
    ("Tom Ford White Suede",          "Tom Ford",              2009, "Unisex",    "Leather",            6871,  ["Saffron","Rose"], ["Suede","Iris"], ["Sandalwood","Musk","Amber"], 8, 7, "EDP", 1500),
    ("Tom Ford Velvet Tuberose",      "Tom Ford",              2010, "Feminine",  "Floral",             8932,  ["Bergamot","Mandarin","Pink Pepper"], ["Tuberose","Bitter Almond","Honey","Banana Tree","Narcissus"], ["Suede","Sandalwood","Resins"], 8, 7, "EDP", 1500),
    ("Tom Ford Sahara Noir",          "Tom Ford",              2013, "Unisex",    "Amber",              17810, ["Bergamot","Rose"], ["Frankincense","Olibanum","Honey","Labdanum"], ["Cedar","Sandalwood","Benzoin","Amber","Labdanum"], 9, 8, "EDP", 1500),

    # ─── ESTÉE LAUDER + AERIN ────────────────────────────────────
    ("Estée Lauder Beautiful",        "Estée Lauder",          1985, "Feminine",  "Floral",             441,   ["Galbanum","Mandarin Orange","Black Currant","Bergamot","Sage","Aldehydes","Rosewood","Pepper","Lavender"], ["Tuberose","Carnation","Lily of the Valley","Rose","Lily","Marigold","Jasmine"], ["Sandalwood","Vetiver","Amber","Vanilla","Musk","Cedar"], 8, 7, "EDP", 600),
    ("Estée Lauder Pleasures",        "Estée Lauder",          1995, "Feminine",  "Floral",             442,   ["Lily","Violet Leaf","Green Notes"], ["Lily of the Valley","Rose","White Peony"], ["Sandalwood","Patchouli","Karo Karounde"], 7, 6, "EDP", 550),
    ("Estée Lauder Sensuous",         "Estée Lauder",          2008, "Feminine",  "Amber Floral",       2015,  ["Mandarin","Lily of the Valley","Pink Pepper"], ["Magnolia","Jasmine","Honey"], ["Sandalwood","Amber","Patchouli"], 8, 7, "EDP", 600),
    ("Aerin Amber Musk",              "Aerin",                 2012, "Unisex",    "Amber Vanilla",      14096, ["Bergamot"], ["Frankincense","Pink Pepper"], ["Amber","Musk","Vanilla"], 8, 7, "EDP", 1100),
    ("Aerin Mediterranean Honeysuckle","Aerin",                2013, "Feminine",  "Floral",             19155, ["Mandarin","Italian Bergamot","Grapefruit"], ["Honeysuckle","Jasmine","Gardenia"], ["Sambac Jasmine"], 7, 6, "EDP", 1100),
    ("Aerin Tangier Vanille",         "Aerin",                 2016, "Unisex",    "Amber Vanilla",      37561, ["Saffron","Bergamot"], ["Bourbon Vanilla","Carnation"], ["Sandalwood","Tonka","Frankincense"], 9, 8, "EDP", 1100),
    ("Aerin Iris Meadow",             "Aerin",                 2014, "Feminine",  "Floral Green",       25126, ["Iris","Hyacinth","Galbanum"], ["Iris Pallida","Tuberose"], ["Vetiver","Sandalwood","Musk"], 7, 6, "EDP", 1100),

    # ─── DONNA KARAN + VERA WANG + VINTAGE FEMININE ──────────────
    ("Donna Karan Cashmere Mist",     "Donna Karan",           1994, "Feminine",  "Amber Floral",       458,   ["Bergamot","Cashmere"], ["Jasmine","Lily of the Valley","Suede","Bulgarian Rose"], ["Sandalwood","Musk","Amber","Vetiver","Patchouli"], 7, 6, "EDP", 550),
    ("Donna Karan Be Delicious",      "DKNY",                  2004, "Feminine",  "Floral Fruity",      843,   ["Cucumber","Magnolia","Grapefruit","Apple"], ["Apple","Tuberose","Violet","Rose","Lily of the Valley"], ["White Amber","Sandalwood","Blonde Wood"], 6, 5, "EDP", 450),
    ("Vera Wang Princess",            "Vera Wang",             2006, "Feminine",  "Floral Fruity",      1024,  ["Apricot","Mandarin","Apple","Guava","Apricot"], ["Tuberose","Tiare Flower","Water Lily","Dark Chocolate"], ["Vanilla","Amber","Musk"], 7, 7, "EDT", 380),
    ("Vera Wang Bouquet",             "Vera Wang",             2009, "Feminine",  "Floral",             6872,  ["Apricot","Tangerine","Lemon"], ["Magnolia","Honeysuckle","Peach","Jasmine"], ["Sandalwood","Musk","Apricot Skin"], 6, 5, "EDP", 380),
    ("Calvin Klein Euphoria",         "Calvin Klein",          2005, "Feminine",  "Amber Floral",       870,   ["Pomegranate","Persimmon","Green Notes","Lotus"], ["Champaca","Black Orchid","Mahogany"], ["Mascarpone","Amber","Black Violet"], 8, 7, "EDP", 480),

    # ─── GIVENCHY EXTRAS ─────────────────────────────────────────
    ("Givenchy Pi",                   "Givenchy",              1998, "Masculine", "Amber Vanilla",      464,   ["Mandarin Orange","Tarragon","Bergamot","Rosemary"], ["Geranium","Almond Tree","Cedar"], ["Vanilla","Benzoin","Tonka","Musk"], 8, 7, "EDT", 500),
    ("Givenchy Gentleman EDT",        "Givenchy",              2017, "Masculine", "Aromatic Fougere",   42839, ["Pear","Lavender"], ["Iris","Geranium"], ["Patchouli","Vanilla","Black Vanilla Husk"], 7, 6, "EDT", 480),
    ("Givenchy Dahlia Divin",         "Givenchy",              2014, "Feminine",  "Floral",             25127, ["Mirabelle Plum","Mandarin"], ["Jasmine Sambac","Rose"], ["Sandalwood","Tonka","Patchouli"], 8, 7, "EDP", 550),
    ("Givenchy Very Irresistible",    "Givenchy",              2003, "Feminine",  "Floral",             648,   ["Anise","Star Anise","Mandarin","Verbena","Peach"], ["Centifolia Rose","Damask Rose","Bulgarian Rose"], ["White Cedar","Iris","Musk"], 7, 6, "EDT", 500),

    # ─── ANNICK GOUTAL / GOUTAL PARIS ────────────────────────────
    ("Goutal Eau d'Hadrien",          "Goutal Paris",          1981, "Unisex",    "Citrus",             436,   ["Sicilian Lemon","Sicilian Mandarin","Citron","Grapefruit"], ["Cypress"], ["Aldehydes"], 5, 5, "EDT", 850),
    ("Goutal Petite Chérie",          "Goutal Paris",          1998, "Feminine",  "Floral Fruity",      465,   ["Pear","Peach"], ["Rose"], ["Vanilla","Musk"], 7, 6, "EDT", 850),
    ("Goutal Encens Flamboyant",      "Goutal Paris",          2007, "Unisex",    "Amber Spicy",        2016,  ["Pink Pepper","Black Pepper","Cardamom"], ["Olibanum","Frankincense"], ["Pine Tree Resin","Fir","Cedar"], 9, 8, "EDP", 1100),
    ("Goutal Une Rose",               "Goutal Paris",          2003, "Feminine",  "Floral",             649,   ["Bulgarian Rose","Damask Rose"], ["Wine","Earth"], ["Patchouli","Honey"], 8, 7, "EDP", 1100),

    # ─── ATKINSONS LONDON CLASSICS ───────────────────────────────
    ("Atkinsons 24 Old Bond Street",  "Atkinsons",             2013, "Unisex",    "Citrus Aromatic",    19156, ["Mandarin","Bergamot","Bitter Orange"], ["Black Tea","Cinnamon","Geranium"], ["Cedar","Patchouli","Vetiver","Cloves"], 7, 6, "EDC", 1100),
    ("Atkinsons The Other Side of Oud","Atkinsons",            2014, "Unisex",    "Amber Woody",        25128, ["Saffron","Iris","Cardamom"], ["Tobacco Leaves","Rose","Cinnamon"], ["Oud","Patchouli","Sandalwood","Honey","Tolu Balsam","Vetiver"], 9, 8, "EDP", 1500),
    ("Atkinsons Lavender on the Rocks","Atkinsons",            2018, "Unisex",    "Aromatic",           50539, ["Rose","Lavender","Vodka"], ["Geranium","Rosemary","Sage"], ["Vanilla","Olibanum","Cedar"], 7, 6, "EDP", 1500),

    # ─── AESOP + COMME DES GARÇONS + INDIE ───────────────────────
    ("Aesop Hwyl",                    "Aesop",                 2017, "Unisex",    "Woody",              42840, ["Cypress","Vetiver","Black Pepper"], ["Frankincense","Hinoki","Bergamot"], ["Cedar","Sandalwood","Vetiver"], 8, 7, "EDP", 1100),
    ("Aesop Marrakech Intense",       "Aesop",                 2014, "Unisex",    "Aromatic Spicy",     25129, ["Cardamom","Bergamot","Clove"], ["Jasmine","Neroli","Rose"], ["Sandalwood","Cedar","Musk"], 7, 6, "EDT", 1100),
    ("Aesop Tacit",                   "Aesop",                 2015, "Unisex",    "Citrus Green",       31564, ["Yuzu","Bergamot","Basil"], ["Vetiver","Hyacinth"], ["Cedar","Musk"], 6, 5, "EDP", 1100),
    ("Comme des Garçons 2 Man",       "Comme des Garcons",     2004, "Masculine", "Woody Spicy",        844,   ["Saffron","Mahogany","White Smoke","Mate"], ["Cumin","Iris","Nutmeg"], ["Vetiver","White Musk","Patchouli"], 8, 7, "EDP", 850),
    ("Comme des Garçons Wonderwood",  "Comme des Garcons",     2010, "Masculine", "Woody",              8933,  ["Bergamot","Pink Pepper","Cumin","Pepper"], ["Nutmeg","Cashmeran","Cypress"], ["Sandalwood","Oud","Vetiver","Cedar","Guaiac Wood","Musk","Patchouli"], 9, 8, "EDP", 850),
    ("Comme des Garçons Daphne",      "Comme des Garcons",     2009, "Unisex",    "Floral",             6873,  ["Rose","Pepper","Saffron","Bergamot"], ["Patchouli","Cardamom","Daphne","Iris"], ["Cedar","Cashmere Wood","Musk"], 7, 6, "EDP", 850),

    # ─── ARAMIS + CALANDRE / PACO RABANNE CLASSICS ───────────────
    ("Aramis Classic",                "Aramis",                1965, "Masculine", "Chypre Leather",     402,   ["Sage","Cumin","Bergamot","Gardenia","Cinnamon","Artemisia","Myrrh","Cardamom"], ["Patchouli","Sandalwood","Vetiver","Jasmine","Rose","Carnation"], ["Leather","Cedar","Castoreum","Amber","Tonka","Musk","Vanilla"], 9, 9, "EDT", 480),
    ("Aramis Tuscany Per Uomo",       "Aramis",                1984, "Masculine", "Aromatic Fougere",   479,   ["Lemon","Mandarin Orange","Lavender","Anise","Bergamot","Bitter Orange"], ["Carnation","Sage","Geranium","Jasmine","Patchouli","Cinnamon"], ["Leather","Vanilla","Tonka","Amber","Sandalwood","Musk","Vetiver"], 8, 7, "EDT", 450),
    ("Paco Rabanne Pour Homme",       "Paco Rabanne",          1973, "Masculine", "Aromatic Fougere",   411,   ["Rosemary","Lemon","Bergamot","Lavender","Clary Sage","Capsicum"], ["Honey","Carnation","Brazilian Rosewood","Cedar","Geranium"], ["Sandalwood","Tonka","Oakmoss","Musk","Tobacco"], 7, 6, "EDT", 320),

    # ─── MORE MANCERA / MONTALE ──────────────────────────────────
    ("Mancera Aoud Lemon Mint",       "Mancera",               2014, "Unisex",    "Citrus Aromatic",    25130, ["Lemon","Mint","Bergamot"], ["Cardamom","Iris"], ["Oud","Sandalwood","Musk"], 8, 7, "EDP", 950),
    ("Mancera Black Prestigium",      "Mancera",               2019, "Masculine", "Amber Spicy",        56575, ["Bergamot","Saffron"], ["Tobacco","Iris"], ["Sandalwood","Patchouli","Amber"], 9, 8, "EDP", 1100),
    ("Mancera Red Tobacco",           "Mancera",               2017, "Unisex",    "Amber Spicy",        42841, ["Bergamot","Cinnamon"], ["Tobacco","Whisky"], ["Vanilla","Sandalwood","Patchouli"], 9, 8, "EDP", 1100),
    ("Mancera Aoud Orchid",           "Mancera",               2014, "Unisex",    "Amber Floral",       25131, ["Bergamot","Saffron"], ["Orchid","Rose"], ["Oud","Sandalwood","Amber"], 9, 8, "EDP", 950),
    ("Montale Crystal Aoud",          "Montale",               2014, "Unisex",    "Amber Woody",        25132, ["Pineapple","Bergamot"], ["Birch","Patchouli","Rose","Jasmine"], ["Oud","Musk","Amber"], 9, 9, "EDP", 950),
    ("Montale Sweet Vanilla",         "Montale",               2008, "Feminine",  "Amber Vanilla",      2017,  ["Bergamot","Heliotrope"], ["Vanilla","Almond"], ["Tonka","Musk","Sandalwood"], 8, 7, "EDP", 850),
    ("Montale Chocolate Greedy",      "Montale",               2007, "Unisex",    "Amber Vanilla",      1579,  ["Cocoa","Coffee"], ["Vanilla","Tonka","Dried Fruits"], ["Patchouli","Sandalwood","Musk"], 8, 7, "EDP", 850),

    # ─── NICHE PREMIUM ADDITIONS ─────────────────────────────────
    ("Frederic Malle Dans Tes Bras",  "Frederic Malle",        2008, "Unisex",    "Floral Powdery",     2018,  ["Cashmeran","Heliotrope","Violet"], ["Heliotrope","Jasmine"], ["Patchouli","Sandalwood","Musk","Salicylates"], 8, 7, "EDP", 1700),
    ("Frederic Malle Geranium Pour Monsieur","Frederic Malle", 2009, "Masculine", "Aromatic",           6874,  ["Mint","Anise","Pink Pepper"], ["Geranium","Rose","Cinnamon"], ["Frankincense","Sandalwood","Musk"], 7, 6, "EDP", 1700),
    ("Frederic Malle Bigarade Concentrée","Frederic Malle",    2001, "Unisex",    "Citrus",             534,   ["Bigarade","Bitter Orange"], ["Cedar","Hay"], ["Musk","Cedar"], 6, 5, "EDP", 1500),
    ("Frederic Malle French Lover",   "Frederic Malle",        2007, "Masculine", "Woody Aromatic",     1581,  ["Pepper","Angelica","Juniper Berries","Coriander","Cardamom"], ["Iris","Vetiver","Cedar","Pine Tree","Mate"], ["Incense","Atlas Cedar","Tonka","Musk","Olibanum"], 8, 7, "EDP", 1700),
    ("Frederic Malle Synthetic Jungle","Frederic Malle",       2021, "Unisex",    "Floral Green",       70562, ["Galbanum","Black Currant"], ["Lily of the Valley","Honeysuckle"], ["Vetiver","Musk"], 8, 7, "EDP", 1900),
    ("Le Galion Sortilège",           "Le Galion",             1937, "Feminine",  "Floral",             1780,  ["Aldehydes","Bergamot","Mandarin"], ["Rose","Jasmine","Iris","Lily of the Valley"], ["Sandalwood","Vetiver","Musk","Civet"], 7, 6, "EDP", 1100),
    ("Le Galion Snob",                "Le Galion",             1952, "Feminine",  "Floral",             1781,  ["Bergamot","Lemon"], ["Rose","Jasmine","Lily of the Valley"], ["Iris","Sandalwood","Musk"], 7, 6, "EDP", 1100),

    # ─── HUGO BOSS BACK CATALOG ─────────────────────────────────
    ("Hugo Boss Boss Number One",     "Hugo Boss",             1985, "Masculine", "Aromatic Fougere",   413,   ["Bergamot","Coriander","Lemon","Bitter Orange","Lavender","Honey","Apricot","Tarragon"], ["Cinnamon","Patchouli","Geranium","Carnation","Pine","Sandalwood","Jasmine"], ["Tonka","Musk","Oakmoss","Olibanum","Cedar","Honey","Sandalwood","Vetiver","Vanilla"], 7, 7, "EDT", 320),
    ("Boss in Motion",                "Hugo Boss",             2002, "Masculine", "Citrus Aromatic",    687,   ["Pomelo","Vine Leaves","Lemon"], ["Spices","Pomelo Flower","Black Pepper"], ["Sandalwood","Cedar"], 6, 6, "EDT", 320),
    ("Boss The Scent Pure Accord",    "Hugo Boss",             2020, "Masculine", "Amber Spicy",        65837, ["Mandarin"], ["Lavender","Maninka"], ["Patchouli","Cedar"], 7, 6, "EDT", 380),
    ("Boss Bottled Marine",           "Hugo Boss",             2021, "Masculine", "Aromatic Aquatic",   70563, ["Bergamot","Pomelo"], ["Algae","Patchouli"], ["Cedar","Musk","Ambroxan"], 7, 6, "EDT", 350),

    # ─── MORE PRADA + GUCCI + DOLCE & GABBANA ───────────────────
    ("Prada Amber Pour Homme",        "Prada",                 2006, "Masculine", "Aromatic",           785,   ["Bergamot","Mandarin","Cardamom","Neroli"], ["Patchouli","Saffron","Tonka","Vanilla"], ["Sandalwood","Vanilla","Labdanum","Musk"], 8, 7, "EDT", 500),
    ("Prada Candy Kiss",              "Prada",                 2016, "Feminine",  "Amber Vanilla",      37562, ["Orange Blossom"], ["Heliotrope","Mimosa"], ["Musk","Vanilla","Cashmeran"], 7, 6, "EDP", 550),
    ("Gucci Guilty Pour Homme",       "Gucci",                 2010, "Masculine", "Aromatic Fougere",   8934,  ["Lavender","Pink Pepper","Lemon"], ["Cedar","Orange Blossom"], ["Patchouli","Cedar","Amber"], 7, 6, "EDT", 500),
    ("Gucci Guilty Black",            "Gucci",                 2015, "Feminine",  "Aromatic",           31565, ["Pink Pepper","Raspberry","Lilac"], ["Violet","Patchouli","Lilac"], ["Patchouli","Amber"], 7, 6, "EDT", 500),
    ("Dolce & Gabbana Light Blue Eau","Dolce & Gabbana",       2017, "Feminine",  "Aromatic Floral",    42842, ["Sicilian Mandarin","Lemon","Apple"], ["Mediterranean Jasmine","Rose","Bamboo"], ["Cedar","Amber","Musk"], 6, 5, "EDP", 500),
    ("Dolce & Gabbana The One Gentleman","Dolce & Gabbana",    2010, "Masculine", "Aromatic Spicy",     8935,  ["Lavender","Pepper"], ["Cardamom","Tobacco"], ["Patchouli","Cedar","Amber"], 7, 6, "EDT", 500),
    ("Dolce & Gabbana The One Royal Night","Dolce & Gabbana",  2022, "Masculine", "Amber",              78436, ["Cardamom","Pink Pepper"], ["Tobacco","Lavender"], ["Sandalwood","Patchouli","Amber"], 8, 7, "EDP", 600),

    # ─── AMOUAGE ADDITIONS ──────────────────────────────────────
    ("Amouage Bracken Man",           "Amouage",               2015, "Masculine", "Aromatic Fougere",   31566, ["Wormwood","Pink Pepper","Pine"], ["Lavender","Geranium","Rose"], ["Cedar","Vetiver","Cypress","Patchouli","Musk"], 9, 8, "EDP", 1400),
    ("Amouage Reflection 45 Femme",   "Amouage",               2019, "Feminine",  "Floral",             56576, ["Pink Pepper","Neroli"], ["Iris","Jasmine"], ["Sandalwood","Vetiver"], 8, 7, "Extrait", 1900),
    ("Amouage Imitation Man",         "Amouage",               2021, "Masculine", "Aromatic",           70564, ["Sage","Bergamot","Pink Pepper"], ["Rose","Cardamom","Tobacco"], ["Patchouli","Sandalwood","Musk"], 9, 8, "EDP", 1400),
    ("Amouage Search Man",            "Amouage",               2021, "Masculine", "Woody",              70565, ["Bergamot","Pink Pepper","Saffron"], ["Cedar","Patchouli"], ["Vetiver","Sandalwood","Musk"], 8, 7, "EDP", 1400),

    # ─── INITIO + PARFUMS DE MARLY ADDS ─────────────────────────
    ("Initio Side Effect Eau",        "Initio Parfums Privés", 2021, "Unisex",    "Amber Vanilla",      70566, ["Saffron","Vanilla"], ["Rum","Tobacco"], ["Vetiver","Honey"], 9, 8, "EDP", 1700),
    ("Parfums de Marly Galloway",     "Parfums de Marly",      2014, "Masculine", "Aromatic Citrus",    25133, ["Bergamot","Lemon","Mandarin"], ["Cinnamon","Cardamom","Lavender"], ["Vetiver","Musk","Sandalwood"], 7, 6, "EDP", 1100),
    ("Parfums de Marly Shagya",       "Parfums de Marly",      2014, "Masculine", "Aromatic",           25134, ["Cardamom","Saffron"], ["Lavender","Iris"], ["Sandalwood","Cedar","Musk"], 8, 7, "EDP", 1100),

    # ─── BYREDO ADDITIONS ───────────────────────────────────────
    ("Byredo Black Saffron",          "Byredo",                2012, "Unisex",    "Amber Spicy",        14097, ["Saffron","Black Berries"], ["Pomegranate","Blueberry","Rose","Juniper"], ["Vetiver","Leather","Black Wood"], 9, 8, "EDP", 1100),
    ("Byredo Bibliothèque",           "Byredo",                2017, "Unisex",    "Floral Fruity",      42843, ["Peach","Plum","Peony"], ["Violet","Leather"], ["Patchouli","Vanilla"], 8, 7, "EDP", 1300),
    ("Byredo Animalique",             "Byredo",                2024, "Unisex",    "Animalic",           87424, ["Pink Pepper","Saffron"], ["Castoreum","Civet"], ["Patchouli","Musk","Amber"], 9, 8, "EDP", 1500),
    ("Byredo Slow Dance",             "Byredo",                2019, "Unisex",    "Amber Spicy",        56577, ["Pink Pepper","Rose"], ["Geranium","Cinnamon"], ["Vanilla","Patchouli","Amber"], 8, 7, "EDP", 1100),
    ("Byredo Inflorescence",          "Byredo",                2014, "Feminine",  "Floral",             25135, ["Magnolia","Pink Freesia"], ["Jasmine Petals","Lily of the Valley","Rose"], ["Cedar","Suede"], 7, 6, "EDP", 1100),

    # ─── KILIAN ADDITIONS ───────────────────────────────────────
    ("Kilian Smoking Hot",            "Kilian",                2017, "Unisex",    "Amber Spicy",        42844, ["Pink Pepper","Pimento"], ["Tobacco","Saffron","Patchouli"], ["Vanilla","Tonka","Sandalwood"], 9, 8, "EDP", 1500),
    ("Kilian Apple Brandy",           "Kilian",                2021, "Unisex",    "Amber Vanilla",      70567, ["Apple","Bergamot"], ["Cinnamon","Tonka"], ["Vanilla","Patchouli","Sandalwood"], 9, 8, "EDP", 1500),
    ("Kilian Gold Knight",            "Kilian",                2024, "Masculine", "Amber Vanilla",      87425, ["Lavender","Almond"], ["Tonka","Cinnamon"], ["Sandalwood","Vanilla","Tobacco"], 9, 8, "EDP", 1500),
    ("Kilian Black Phantom Memento Mori","Kilian",             2017, "Unisex",    "Amber Vanilla",      42795, ["Caraway","Bitter Almond"], ["Coffee","Sugar Cane"], ["Vanilla","Patchouli"], 8, 7, "EDP", 1500),
    ("Kilian A Kiss From a Rose",     "Kilian",                2009, "Feminine",  "Floral",             6875,  ["Bergamot","Coriander"], ["Rose","Cardamom"], ["Vanilla","Sandalwood","Patchouli"], 8, 7, "EDP", 1500),

    # ─── ROJA + CLIVE CHRISTIAN MORE ────────────────────────────
    ("Roja Apex",                     "Roja Parfums",          2022, "Masculine", "Amber Woody",        78437, ["Bergamot","Pink Pepper"], ["Iris","Tobacco","Rose"], ["Oud","Sandalwood","Patchouli"], 9, 9, "Parfum", 4500),
    ("Roja Innuendo",                 "Roja Parfums",          2018, "Masculine", "Amber Spicy",        50540, ["Bergamot","Saffron"], ["Tobacco","Olibanum"], ["Patchouli","Sandalwood","Cedar"], 9, 8, "Parfum", 2400),
    ("Clive Christian Original 1872", "Clive Christian",       2003, "Masculine", "Citrus Aromatic",    1266,  ["Bergamot","Mandarin","Lemon"], ["Carnation","Heliotrope","Rose","Geranium"], ["Sandalwood","Musk","Amber","Vetiver"], 8, 7, "Parfum", 3500),
    ("Clive Christian L for Women",   "Clive Christian",       2009, "Feminine",  "Amber Floral",       6876,  ["Bergamot","Mandarin"], ["Rose","Jasmine","Tuberose"], ["Sandalwood","Vanilla","Musk"], 9, 8, "Parfum", 4500),

    # ─── MORE LATTAFA / RASASI ──────────────────────────────────
    ("Lattafa Ameer Al Oudh",         "Lattafa",               2018, "Unisex",    "Amber Woody",        50541, ["Saffron","Cardamom"], ["Oud","Rose"], ["Patchouli","Sandalwood","Amber"], 9, 8, "EDP", 280),
    ("Lattafa Oud Mood",              "Lattafa",               2019, "Unisex",    "Amber Woody",        56578, ["Bergamot","Saffron"], ["Rose","Patchouli"], ["Oud","Sandalwood","Amber"], 9, 8, "EDP", 280),
    ("Lattafa Eclaire EDP",           "Lattafa",               2024, "Feminine",  "Floral",             87426, ["Bergamot","Pink Pepper"], ["Rose","Jasmine"], ["Vanilla","Musk"], 8, 7, "EDP", 280),
    ("Rasasi Al Wisam Day",           "Rasasi",                2014, "Masculine", "Citrus Aromatic",    25136, ["Bergamot","Lemon","Mint"], ["Lavender","Geranium"], ["Cedar","Vetiver","Musk"], 7, 6, "EDP", 350),
    ("Rasasi Daarej",                 "Rasasi",                2016, "Unisex",    "Amber Vanilla",      37563, ["Cardamom","Saffron"], ["Vanilla","Tonka"], ["Sandalwood","Musk","Amber"], 8, 7, "EDP", 320),

    # ─── PENHALIGON'S + JO MALONE ───────────────────────────────
    ("Penhaligon's Sartorial",        "Penhaligon's",          2010, "Masculine", "Aromatic Fougere",   8936,  ["Aldehydes","Ozonic Notes","Metallic Notes","Violet Leaf"], ["Beeswax","Cardamom","Cyclamen","Black Pepper","Honey"], ["Patchouli","Cedar","Leather","Oakmoss","Musk","Vetiver","Lavender"], 8, 7, "EDP", 1100),
    ("Penhaligon's The Inimitable Wm Penhaligon","Penhaligon's",2018, "Unisex",  "Aromatic Spicy",      50542, ["Bergamot","Lavender"], ["Cardamom","Iris","Saffron"], ["Tobacco","Cedar","Patchouli"], 9, 8, "EDP", 1300),
    ("Jo Malone Pomegranate Noir",    "Jo Malone London",      2005, "Unisex",    "Amber Floral",       1583,  ["Pomegranate","Plum","Raspberry"], ["Lily","Casablanca Lily","Pink Pepper"], ["Patchouli","Frankincense","Guaiac Wood"], 7, 6, "Cologne", 850),
    ("Jo Malone Wild Bluebell",       "Jo Malone London",      2011, "Feminine",  "Floral",             11740, ["Bluebell"], ["Lily of the Valley","Jasmine"], ["White Musk","Persimmon"], 5, 5, "Cologne", 750),
    ("Jo Malone Peony & Blush Suede", "Jo Malone London",      2013, "Feminine",  "Floral",             19157, ["Red Apple"], ["Peony","Carnation","Rose","Jasmine","Gillyflower"], ["Suede"], 7, 6, "Cologne", 750),
    ("Jo Malone Blackberry & Bay",    "Jo Malone London",      2012, "Unisex",    "Floral Fruity",      14098, ["Blackberry"], ["Bay","Cedar"], ["Patchouli"], 6, 5, "Cologne", 750),

    # ─── DIPTYQUE + LE LABO MORE ────────────────────────────────
    ("Diptyque Eau Rose",             "Diptyque",              2012, "Feminine",  "Floral",             14099, ["Bergamot","Lemon","Pepper"], ["Damask Rose","Centifolia Rose","Honey"], ["Cedar","Musk","Patchouli"], 7, 6, "EDT", 850),
    ("Diptyque Eau Lente",            "Diptyque",              1986, "Unisex",    "Amber Spicy",        637,   ["Cardamom","Bay Leaf"], ["Cinnamon","Cloves","Pepper"], ["Frankincense","Myrrh","Opoponax"], 8, 7, "EDT", 850),
    ("Le Labo Thé Noir 29 EDT",       "Le Labo",               2017, "Unisex",    "Aromatic",           42845, ["Bergamot","Bay Leaves"], ["Black Tea","Fig"], ["Tobacco","Vetiver","Musk","Hay"], 7, 6, "EDP", 1100),
    ("Le Labo Cedrat 37",             "Le Labo",               2024, "Unisex",    "Citrus Aromatic",    87427, ["Citron","Coriander","Bergamot"], ["Cedar","Vetiver"], ["Musk","Sandalwood"], 6, 5, "EDP", 1100),

    # ─── CREED MORE + MIZENSIR + FUEGUIA ────────────────────────
    ("Mizensir Bois Mystique",        "Mizensir",              2018, "Unisex",    "Woody",              50543, ["Bergamot","Pink Pepper"], ["Cedar","Cypress"], ["Sandalwood","Musk","Amber"], 8, 7, "EDP", 1100),
    ("Mizensir Vanille Givrée",       "Mizensir",              2017, "Unisex",    "Amber Vanilla",      42846, ["Bergamot","Mandarin"], ["Vanilla","Heliotrope"], ["Sandalwood","Musk","Tonka"], 8, 7, "EDP", 1100),
    ("Fueguia 1833 Adelfas",          "Fueguia 1833",          2010, "Unisex",    "Floral",             8937,  ["Bergamot","Pink Pepper"], ["Iris","Magnolia"], ["Sandalwood","Musk","Vetiver"], 7, 6, "EDP", 1500),
    ("Fueguia 1833 Tango",            "Fueguia 1833",          2011, "Unisex",    "Amber Spicy",        11741, ["Bergamot","Cardamom"], ["Tobacco","Tonka"], ["Vanilla","Sandalwood","Cedar"], 8, 7, "EDP", 1500),

    # ─── HERMÈS MORE ────────────────────────────────────────────
    ("Hermès Eau de Mandarine Ambrée","Hermès",                2013, "Unisex",    "Citrus",             19158, ["Mandarin Orange","Tangerine","Bitter Orange"], ["Amber"], ["Amber","Sandalwood"], 5, 4, "EDC", 600),
    ("Hermès Le Jardin de Monsieur Li","Hermès",               2015, "Unisex",    "Citrus",             31567, ["Kumquat","Mandarin","Lemon","Mint"], ["Bamboo","Jasmine","Plum"], ["Sandalwood","Musk"], 5, 4, "EDT", 550),
    ("Hermès Un Jardin sur le Toit",  "Hermès",                2011, "Unisex",    "Floral Green",       11742, ["Apple","Pear"], ["Magnolia","Rose","Basil"], ["Pear","Grass"], 5, 4, "EDT", 550),
    ("Hermès Galop Eau de Toilette",  "Hermès",                2024, "Feminine",  "Leather",            87428, ["Saffron","Bergamot"], ["Rose","Leather"], ["Sandalwood","Musk"], 8, 7, "EDT", 1500),

    # ─── XERJOFF / CASAMORATI MORE ──────────────────────────────
    ("Xerjoff La Tosca",              "Xerjoff",               2018, "Feminine",  "Floral",             50544, ["Bergamot","Pink Pepper"], ["Tuberose","Jasmine","Iris"], ["Sandalwood","Musk","Amber"], 8, 7, "EDP", 1700),
    ("Xerjoff Pikovaya Dama",         "Xerjoff",               2017, "Unisex",    "Amber Floral",       42847, ["Saffron","Cardamom"], ["Tuberose","Jasmine","Iris"], ["Sandalwood","Vanilla","Musk"], 9, 8, "Parfum", 2400),
    ("Casamorati La Tosca",           "Xerjoff",               2018, "Feminine",  "Floral",             50545, ["Bergamot","Pink Pepper"], ["Rose","Jasmine"], ["Sandalwood","Musk"], 8, 7, "EDP", 1500),
    ("Casamorati Italica",            "Xerjoff",               2010, "Feminine",  "Floral Fruity",      8938,  ["Bergamot","Pink Pepper"], ["Peach","Rose","Iris"], ["Vanilla","Patchouli","Musk"], 8, 7, "EDP", 1700),

    # ─── PROFUMUM ROMA MORE ─────────────────────────────────────
    ("Profumum Roma Acqua di Sale",   "Profumum Roma",         2003, "Unisex",    "Aromatic",           650,   ["Sea Notes","Mediterranean Algae","Citrus"], ["Myrtle","Rosemary"], ["Musk","Amber"], 7, 6, "EDP", 1500),
    ("Profumum Roma Arso",            "Profumum Roma",         2003, "Unisex",    "Woody",              651,   ["Birch","Smoke"], ["Cedar","Frankincense"], ["Vanilla","Sandalwood"], 9, 8, "EDP", 1500),
    ("Profumum Roma Audace",          "Profumum Roma",         2014, "Masculine", "Amber Spicy",        25137, ["Bergamot","Saffron"], ["Tobacco","Iris"], ["Sandalwood","Vetiver","Musk"], 9, 8, "EDP", 1500),

    # ─── NICHE FEMININE ─────────────────────────────────────────
    ("Mancera Pink Sugar",            "Mancera",               2019, "Feminine",  "Amber Vanilla",      56579, ["Bergamot","Strawberry"], ["Vanilla","Caramel"], ["Sandalwood","Musk","Amber"], 8, 7, "EDP", 850),
    ("Montale Aoud Roses Petals",     "Montale",               2007, "Unisex",    "Amber Floral",       1580,  ["Saffron","Rose"], ["Geranium","Patchouli"], ["Oud","Sandalwood","Musk"], 9, 8, "EDP", 950),
    ("Montale Vetiver Patchouli",     "Montale",               2009, "Unisex",    "Woody",              6877,  ["Bergamot","Black Pepper"], ["Vetiver","Patchouli"], ["Sandalwood","Cedar","Musk"], 8, 7, "EDP", 850),

    # ─── EXTRA POPULAR DESIGNER 2023-2024 ───────────────────────
    ("Versace Eros Parfum",           "Versace",               2024, "Masculine", "Amber Spicy",        87429, ["Mandarin","Mint"], ["Tonka","Geranium"], ["Vanilla","Cedar","Vetiver"], 9, 8, "Parfum", 600),
    ("Carolina Herrera Bad Boy Cobalt","Carolina Herrera",     2022, "Masculine", "Aromatic Spicy",     78438, ["Bergamot","Cardamom"], ["Lavender","Sage"], ["Vetiver","Patchouli","Tonka"], 9, 8, "EDP Parfum", 550),
    ("Mont Blanc Explorer Ultra Blue","Mont Blanc",            2022, "Masculine", "Aromatic Aquatic",   78439, ["Marine Notes","Bergamot"], ["Sage","Cedar"], ["Patchouli","Vetiver","Akigalawood"], 8, 7, "EDP", 480),
    ("Mont Blanc Explorer Platinum",  "Mont Blanc",            2023, "Masculine", "Woody",              82427, ["Bergamot","Pink Pepper"], ["Lavender","Iris"], ["Cedar","Sandalwood","Vetiver"], 8, 7, "EDP", 480),
    ("Yves Saint Laurent MYSLF",      "YSL",                   2023, "Masculine", "Aromatic",           82428, ["Mandarin","Bergamot"], ["Orange Blossom","Coumarin"], ["Cedar","Cashmere Wood","Patchouli"], 8, 7, "EDP", 700),
    ("Yves Saint Laurent Y Le Parfum","YSL",                   2021, "Masculine", "Aromatic Fougere",   70568, ["Apple","Bergamot","Ginger"], ["Sage","Geranium","Lavender"], ["Cedar","Tonka","Amberwood"], 9, 8, "Parfum", 750),
    ("Carolina Herrera Bad Boy Le Parfum","Carolina Herrera",  2022, "Masculine", "Amber",              78440, ["Cinnamon","Cardamom"], ["Lavender","Iris"], ["Vanilla","Tonka","Cocoa","Cedar"], 9, 8, "Parfum", 600),
    ("Carolina Herrera Good Girl Glorious Gold","Carolina Herrera",2022, "Feminine", "Amber Vanilla",   78441, ["Almond","Coffee"], ["Tuberose","Jasmine"], ["Vanilla","Cocoa","Tonka"], 9, 8, "EDP", 700),
    ("Jean Paul Gaultier Scandal Le Parfum","Jean Paul Gaultier",2021, "Feminine", "Amber Vanilla",     70569, ["Honey","Bergamot"], ["Gardenia","Orange Blossom"], ["Patchouli","Caramel","Beeswax"], 9, 8, "Parfum", 700),
    ("Tom Ford Lost Cherry Perfume",  "Tom Ford",              2024, "Unisex",    "Amber Vanilla",      87430, ["Black Cherry","Bitter Almond"], ["Cherry Liqueur","Turkish Rose","Jasmine"], ["Roasted Tonka","Peru Balsam","Sandalwood","Cedar"], 9, 8, "Parfum", 2400),
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
