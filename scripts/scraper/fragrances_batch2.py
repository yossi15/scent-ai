"""Second large expansion batch toward 1000.
Focus: drugstore-cheap, vintage classics, indie niche, more designer feminine,
Hermessence + Chanel Les Exclusifs, more Sospiro / Stephane Humbert Lucas."""

# (name, house, year, gender, family, fid, top, heart, base, longev, sillage, conc, price)
SEED = [
    # ─── DRUGSTORE / CHEAP DESIGNER (₪150-400) ────────────────────
    ("Cool Water",                    "Davidoff",              1988, "Masculine", "Aromatic Aquatic",   404,   ["Sea Notes","Mint","Lavender","Coriander","Rosemary","Calone","Green Notes"], ["Geranium","Neroli","Jasmine","Sandalwood"], ["Musk","Cedar","Tobacco","Amber","Oakmoss"], 6, 6, "EDT", 250),
    ("Davidoff Adventure",            "Davidoff",              2008, "Masculine", "Aromatic Aquatic",   2011,  ["Mandarin Orange","Italian Lemon","Tangerine"], ["Pepper","Cardamom","Cypress"], ["Vetiver","Tobacco","Cedar","Patchouli"], 7, 6, "EDT", 280),
    ("Polo Blue",                     "Ralph Lauren",          2002, "Masculine", "Aromatic Fougere",   686,   ["Cucumber","Tangerine Leaves","Melon"], ["Geranium","Sage","Basil"], ["Suede","Musk","Woody Notes"], 6, 6, "EDT", 350),
    ("Polo Black",                    "Ralph Lauren",          2005, "Masculine", "Woody Aromatic",     879,   ["Lemon","Mango"], ["Sage","Patchouli","Tonka"], ["Coffee","Saffron","Mandarin"], 7, 7, "EDT", 350),
    ("Polo Red",                      "Ralph Lauren",          2013, "Masculine", "Aromatic Spicy",     19149, ["Italian Lemon","Cranberry","Grapefruit"], ["Saffron","Sage","Lavender"], ["Coffee","Redwood","Amber"], 8, 7, "EDT", 380),
    ("Allure Homme Sport Cologne",    "Chanel",                2016, "Masculine", "Aromatic Citrus",    37556, ["Mandarin Orange","Sicilian Lemon","Bergamot"], ["Sea Notes","Pepper","Neroli"], ["Cedar","White Musk","Tonka"], 6, 5, "EDC", 600),
    ("Bvlgari Aqva Amara",            "Bvlgari",               2014, "Masculine", "Citrus Aromatic",    25110, ["Mandarin Orange","Bergamot","Neroli"], ["Bitter Orange","Marine Notes"], ["Atlas Cedar","Mate","Myrrh"], 6, 6, "EDT", 380),
    ("Bvlgari BLV Pour Homme",        "Bvlgari",               2001, "Masculine", "Aromatic",           608,   ["Cardamom","Bitter Orange","Coriander"], ["Lavender","Cedar","Spices","Pink Pepper"], ["Sandalwood","Patchouli","Tobacco","Iris"], 7, 6, "EDT", 380),
    ("Bvlgari Le Gemme Garanat",      "Bvlgari",               2014, "Masculine", "Amber Spicy",        25111, ["Saffron","Davana","Pink Pepper"], ["Tobacco","Olibanum","Cypriol"], ["Tonka","Vanilla","Patchouli"], 9, 8, "Parfum", 1900),
    ("Joop! Homme",                   "Joop!",                 1989, "Masculine", "Amber Vanilla",      461,   ["Cinnamon","Heliotrope","Lemon","Bergamot","Mandarin Orange","Orange Blossom"], ["Honey","Lily","Jasmine","Carnation","Rose","Patchouli"], ["Vanilla","Tonka","Sandalwood","Cedar","Amber","Musk"], 8, 8, "EDT", 280),
    ("Joop! Wow!",                    "Joop!",                 2018, "Masculine", "Aromatic Spicy",     50526, ["Pepper","Apple"], ["Lavender","Cardamom"], ["Patchouli","Vetiver","Tonka"], 7, 6, "EDT", 250),
    ("Lacoste L.12.12 Noir",          "Lacoste",               2013, "Masculine", "Aromatic",           19150, ["Cardamom","Black Pepper"], ["Liquorice","Tuberose"], ["Black Suede","Vetiver"], 7, 6, "EDT", 320),
    ("Lacoste Eau de Lacoste Yellow", "Lacoste",               2010, "Masculine", "Aromatic",           8925,  ["Mandarin Orange","Bergamot","Bitter Orange"], ["Tarragon","Geranium"], ["Vetiver","White Musk","Sandalwood"], 6, 6, "EDT", 320),
    ("Diesel Bad",                    "Diesel",                2016, "Masculine", "Amber Vanilla",      37557, ["Caraway","Lavender"], ["Tobacco","Cedar"], ["Tonka","Amber","Patchouli"], 8, 7, "EDT", 350),
    ("Diesel Spirit of the Brave",    "Diesel",                2019, "Masculine", "Amber",              56565, ["Black Pepper"], ["Lavender","Sage"], ["Cedar","Amber","Patchouli"], 7, 6, "EDT", 320),
    ("Adidas Dynamic Pulse",          "Adidas",                1999, "Masculine", "Aromatic",           462,   ["Mint","Bergamot","Lavender"], ["Pepper","Geranium"], ["Cedar","Musk","Amber"], 5, 5, "EDT", 100),
    ("Brut Original",                 "Faberge",               1964, "Masculine", "Aromatic Fougere",   413,   ["Bergamot","Anise","Lavender"], ["Geranium","Jasmine","Vetiver"], ["Sandalwood","Tonka","Musk","Oakmoss"], 6, 6, "EDT", 80),
    ("Old Spice Original",            "Old Spice",             1937, "Masculine", "Aromatic Fougere",   780,   ["Star Anise","Orange","Lemon","Spices"], ["Carnation","Cinnamon","Jasmine","Geranium"], ["Tonka","Sandalwood","Musk","Cedar","Vanilla"], 5, 5, "EDC", 80),
    ("Aqua Velva Ice Blue",           "Aqua Velva",            1929, "Masculine", "Aromatic Fougere",   1601,  ["Bergamot","Lemon","Lavender"], ["Geranium","Hedione"], ["Musk","Tonka"], 4, 4, "EDC", 70),
    ("Pino Silvestre Original",       "Pino Silvestre",        1955, "Masculine", "Aromatic",           1602,  ["Pine","Bergamot","Lavender"], ["Pine","Cardamom"], ["Sandalwood","Musk","Amber"], 6, 6, "EDT", 200),

    # ─── VINTAGE CLASSICS / GUERLAIN (₪400-1100) ──────────────────
    ("Guerlain L'Homme Idéal",        "Guerlain",              2014, "Masculine", "Amber",              25112, ["Bergamot","Lemon","Bitter Almond"], ["Rose","Cedar"], ["Tonka","Vanilla","Leather"], 8, 7, "EDT", 550),
    ("Guerlain Habit Rouge L'Eau",    "Guerlain",              2017, "Masculine", "Aromatic Citrus",    42821, ["Bergamot","Lemon","Mint"], ["Lavender","Carnation"], ["Vanilla","Tonka","Musk"], 6, 5, "EDT", 600),
    ("Guerlain Vetiver",              "Guerlain",              1959, "Masculine", "Woody Aromatic",     416,   ["Lemon","Bergamot","Coriander","Neroli","Mandarin Orange"], ["Vetiver","Cedar","Tobacco","Pepper","Nutmeg"], ["Musk","Capsicum","Pepper"], 6, 6, "EDT", 550),
    ("Guerlain Samsara",              "Guerlain",              1989, "Feminine",  "Amber Floral",       415,   ["Lemon","Bergamot","Peach"], ["Jasmine","Ylang-Ylang","Iris","Narcissus"], ["Sandalwood","Vanilla","Amber","Musk","Tonka"], 9, 8, "EDP", 700),
    ("Guerlain Aqua Allegoria Mandarine", "Guerlain",          2017, "Unisex",    "Citrus Aromatic",    42822, ["Mandarin","Basil"], ["Cardamom","Jasmine"], ["Cedar","Musk"], 5, 4, "EDT", 500),
    ("Caron L'Anarchiste",            "Caron",                 2000, "Masculine", "Aromatic",           600,   ["Bergamot","Mint","Lavender"], ["Geranium","Cardamom","Coriander"], ["Vetiver","Cedar","Patchouli","Musk"], 7, 6, "EDT", 850),
    ("Caron Pour Un Homme Sport",     "Caron",                 2014, "Masculine", "Aromatic Fougere",   25113, ["Lavender","Bergamot"], ["Vetiver","Geranium"], ["Tonka","Cedar"], 6, 5, "EDT", 600),
    ("Patou Joy",                     "Patou",                 1930, "Feminine",  "Floral",             430,   ["Aldehydes","Rose","Bulgarian Rose","Tuberose","Ylang-Ylang"], ["Jasmine","Iris","Lily of the Valley","Orchid"], ["Sandalwood","Musk","Civet"], 8, 7, "EDP", 850),
    ("Patou Sublime",                 "Patou",                 1992, "Feminine",  "Amber Floral",       2012,  ["Coriander","Bergamot","Mandarin Orange","Peach"], ["Tuberose","Jasmine","Rose","Ylang-Ylang"], ["Sandalwood","Vetiver","Vanilla","Musk","Civet"], 8, 7, "EDP", 850),

    # ─── CHANEL LES EXCLUSIFS + HERMESSENCE (₪1500-1800) ──────────
    ("Chanel No 19",                  "Chanel",                1971, "Feminine",  "Floral Green",       422,   ["Galbanum","Neroli","Bergamot","Hyacinth"], ["Iris","Rose","Narcissus","Lily of the Valley","Ylang-Ylang"], ["Vetiver","Sandalwood","Musk","Oakmoss","Cedar","Leather"], 8, 7, "EDP", 850),
    ("Chanel No 22",                  "Chanel",                1922, "Feminine",  "Floral",             1604,  ["Aldehydes","Neroli"], ["Tuberose","Lily","Lily of the Valley","Rose","Jasmine","Ylang-Ylang"], ["Incense","Vanilla","Sandalwood","Vetiver","Opopanax"], 7, 6, "EDT", 1500),
    ("Chanel Cuir de Russie",         "Chanel",                1924, "Unisex",    "Leather",            1605,  ["Mandarin Orange","Orange Blossom","Bergamot","Clary Sage"], ["Iris","Jasmine","Rose","Ylang-Ylang","Cedar"], ["Leather","Tobacco","Vetiver","Amber","Styrax","Vanilla","Musk"], 8, 7, "EDP", 1500),
    ("Chanel Bois des Iles",          "Chanel",                1926, "Feminine",  "Woody Floral",       1606,  ["Aldehydes","Bergamot","Neroli","Coriander","Peach"], ["Sandalwood","Iris","Jasmine","Rose","Ylang-Ylang"], ["Tonka","Vetiver","Musk","Vanilla","Benzoin"], 8, 7, "EDP", 1500),
    ("Chanel Gardenia",               "Chanel",                1925, "Feminine",  "Floral",             1607,  ["Tuberose","Orange Blossom","Aldehydes","Peach"], ["Gardenia","Tuberose","Jasmine","Ylang-Ylang"], ["Sandalwood","Vanilla","Iris","Musk"], 7, 6, "EDP", 1500),
    ("Hermès Vetiver Tonka",          "Hermès",                2004, "Unisex",    "Woody Aromatic",     1102,  ["Tobacco","Hazelnut"], ["Vetiver","Tonka Bean"], ["Caramel","Vetiver"], 7, 6, "EDT Hermessence", 1700),
    ("Hermès Ambre Narguilé",         "Hermès",                2004, "Unisex",    "Amber Vanilla",      1103,  ["Cinnamon","Apple"], ["Honey","Vanilla","Tobacco"], ["Hookah","Date"], 9, 8, "EDT Hermessence", 1700),
    ("Hermès Iris Ukiyoé",            "Hermès",                2010, "Unisex",    "Floral",             8926,  ["Iris","Rose","Aldehydes"], ["Iris Pallida","Cherry Blossom"], ["Rose","Sandalwood"], 7, 6, "EDT Hermessence", 1700),
    ("Hermès Brin de Réglisse",       "Hermès",                2007, "Unisex",    "Aromatic",           2013,  ["Lavender","Mint"], ["Liquorice","Saffron"], ["Hay","Tonka","Musk"], 7, 6, "EDT Hermessence", 1700),
    ("Hermès Poivre Samarcande",      "Hermès",                2004, "Unisex",    "Woody Spicy",        1104,  ["Pepper","Coriander"], ["Cumin","Patchouli","Oak"], ["Cedar","Sandalwood"], 8, 7, "EDT Hermessence", 1700),

    # ─── INDIE / NICHE MICRO HOUSES (₪1500-3500) ──────────────────
    ("Slumberhouse Jeke",             "Slumberhouse",          2010, "Unisex",    "Amber Spicy",        8927,  ["Tobacco","Whiskey","Coffee"], ["Hay","Honey"], ["Patchouli","Cedar","Vetiver"], 9, 8, "Extrait", 1700),
    ("Slumberhouse Pear Chocolate",   "Slumberhouse",          2014, "Unisex",    "Amber Vanilla",      25114, ["Pear"], ["Cocoa","Honey"], ["Vanilla","Patchouli","Cedar"], 9, 8, "Extrait", 1700),
    ("Slumberhouse Vikt",             "Slumberhouse",          2014, "Unisex",    "Amber Vanilla",      25115, ["Black Currant","Pomegranate","Plum"], ["Heliotrope","Vanilla"], ["Sandalwood","Musk","Cedar"], 9, 8, "Extrait", 1700),
    ("Imaginary Authors O Unknown!",  "Imaginary Authors",     2014, "Unisex",    "Aromatic",           25116, ["Tomato Leaf","Hay","Black Pepper"], ["Geranium","Wormwood"], ["Cedar","Vetiver","Musk"], 8, 7, "EDP", 1500),
    ("Imaginary Authors Memoirs of",  "Imaginary Authors",     2013, "Unisex",    "Floral",             19151, ["Plum","Black Currant"], ["Tuberose","Jasmine","Rose"], ["Sandalwood","Musk","Vanilla"], 8, 7, "EDP", 1500),
    ("Phaedon Tabac Rouge",           "Phaedon",               2013, "Unisex",    "Amber Spicy",        19152, ["Spices","Pink Pepper","Saffron"], ["Tobacco","Honey","Cinnamon"], ["Sandalwood","Patchouli","Vanilla"], 9, 8, "EDP", 1500),
    ("Beaufort London Tonnerre",      "Beaufort London",       2015, "Unisex",    "Aromatic",           31554, ["Black Pepper","Bergamot"], ["Cardamom","Tobacco","Black Tea"], ["Vetiver","Patchouli","Smoke"], 9, 9, "EDP", 1700),
    ("Beaufort London Coeur de Noir", "Beaufort London",       2015, "Unisex",    "Leather",            31555, ["Birch","Saffron"], ["Leather","Iris"], ["Patchouli","Cedar","Smoke"], 9, 9, "EDP", 1700),
    ("Stephane Humbert Lucas Khol",   "Stephane Humbert Lucas",2015, "Unisex",    "Amber Spicy",        31556, ["Saffron","Bergamot","Cardamom"], ["Patchouli","Tobacco","Frankincense"], ["Oud","Sandalwood","Amber"], 9, 8, "Parfum", 2400),
    ("Stephane Humbert Lucas Mortal", "Stephane Humbert Lucas",2014, "Masculine", "Amber Vanilla",      25117, ["Bergamot","Saffron"], ["Tobacco","Iris"], ["Vanilla","Cedar","Sandalwood"], 9, 8, "Parfum", 2400),
    ("Stephane Humbert Lucas Soleil",  "Stephane Humbert Lucas",2017, "Unisex",   "Amber Floral",       42823, ["Bergamot","Honey"], ["Tuberose","Jasmine"], ["Vanilla","Sandalwood","Musk"], 9, 8, "Parfum", 2400),
    ("Areej Le Doré Siberian Musk",   "Areej Le Doré",         2017, "Unisex",    "Animalic",           42824, ["Saffron","Bergamot"], ["Musk","Civet","Castoreum"], ["Sandalwood","Oud","Amber"], 9, 9, "Parfum", 4500),
    ("Bortnikoff Black Iris",         "Bortnikoff",            2018, "Unisex",    "Floral",             50527, ["Bergamot","Black Pepper"], ["Iris","Black Iris"], ["Sandalwood","Musk","Amber"], 9, 8, "Extrait", 2400),
    ("Sospiro Erba Pura",             "Sospiro",               2010, "Unisex",    "Amber Vanilla",      8928,  ["Sicilian Citrus","Bergamot"], ["Aquatic Notes","Fruity Notes","Fig"], ["Vanilla","Amber","Patchouli","Musk"], 9, 9, "EDP", 1500),
    ("Sospiro Accento",               "Sospiro",               2017, "Unisex",    "Aromatic Spicy",     42825, ["Pineapple","Bergamot","Mandarin"], ["Cardamom","Lavender","Cedar"], ["Patchouli","Vetiver","Vanilla"], 9, 8, "EDP", 1500),
    ("Sospiro Wardasina Rouge Maï",   "Sospiro",               2014, "Feminine",  "Floral",             25118, ["Bergamot","Pink Pepper"], ["Rose","Iris"], ["Patchouli","Sandalwood","Musk"], 8, 7, "EDP", 1500),
    ("Fragrance Du Bois Oud Jaune",   "Fragrance Du Bois",     2015, "Unisex",    "Amber Woody",        31557, ["Saffron","Bergamot"], ["Rose","Patchouli","Iris"], ["Oud","Sandalwood","Musk"], 9, 9, "Extrait", 4500),
    ("Mona di Orio Vanille",          "Mona di Orio",          2010, "Unisex",    "Amber Vanilla",      8930,  ["Vanilla Pod","Tolu Balsam"], ["Vanilla Absolute","Cananga","Heliotrope"], ["Sandalwood","Amber","Vanilla"], 9, 8, "EDP", 1700),
    ("Mona di Orio Cuir",             "Mona di Orio",          2014, "Unisex",    "Leather",            25119, ["Bergamot","Saffron"], ["Leather","Cinnamon"], ["Sandalwood","Patchouli","Amber"], 9, 8, "EDP", 1700),

    # ─── MORE DESIGNER FEMININE (₪400-900) ────────────────────────
    ("Chloé Eau de Parfum",           "Chloé",                 2008, "Feminine",  "Floral",             1944,  ["Pink Peony","Freesia","Lychee"], ["Rose","Magnolia","Lily of the Valley"], ["Cedar","Amber","Honey"], 7, 6, "EDP", 550),
    ("Chloé Nomade",                  "Chloé",                 2018, "Feminine",  "Chypre Floral",      50528, ["Mirabelle Plum","Bergamot"], ["Freesia","Jasmine","Peach"], ["Oakmoss","Sandalwood","White Musk"], 7, 6, "EDP", 550),
    ("Chloé Love Story",              "Chloé",                 2014, "Feminine",  "Floral",             25120, ["Neroli","Pear"], ["Orange Blossom","Jasmine"], ["Cedar","Musk"], 6, 5, "EDP", 500),
    ("Viktor & Rolf Flowerbomb",      "Viktor&Rolf",           2005, "Feminine",  "Floral",             879,   ["Tea","Bergamot","Osmanthus"], ["Sambac Jasmine","Centifolia Rose","Cattleya Orchid","Freesia"], ["Patchouli","Musk"], 8, 7, "EDP", 600),
    ("Viktor & Rolf Spicebomb",       "Viktor&Rolf",           2012, "Masculine", "Amber Spicy",        14094, ["Bergamot","Grapefruit","Pink Pepper","Elemi"], ["Cinnamon","Saffron","Paprika"], ["Tobacco","Leather","Vetiver"], 8, 8, "EDT", 600),
    ("Viktor & Rolf Spicebomb Extreme","Viktor&Rolf",          2015, "Masculine", "Amber Vanilla",      31558, ["Black Pepper","Cinnamon"], ["Lavender","Geranium"], ["Vanilla","Tobacco","Tonka"], 9, 8, "EDP", 700),
    ("Marc Jacobs Decadence",         "Marc Jacobs",           2015, "Feminine",  "Chypre Floral",      31559, ["Italian Plum","Iris","Saffron"], ["Bulgarian Rose","Jasmine Sambac","Orris"], ["Liquid Amber","Vetiver","Papyrus Wood"], 8, 7, "EDP", 550),
    ("Marc Jacobs Daisy Love",        "Marc Jacobs",           2018, "Feminine",  "Floral Fruity",      50529, ["Cloudberries"], ["Daisy Tree Petals"], ["Cashmere Wood","White Woods"], 6, 5, "EDT", 500),
    ("Issey Miyake L'Eau d'Issey",    "Issey Miyake",          1992, "Feminine",  "Floral Aquatic",     434,   ["Lotus","Cyclamen","Freesia","Rose Water","Melon","Calone"], ["Carnation","Peony","White Lily"], ["Tuberose","Sandalwood","Cedar","Musk","Amber Notes","Osmanthus"], 6, 6, "EDT", 350),
    ("Issey Miyake Nuit d'Issey",     "Issey Miyake",          2014, "Masculine", "Woody",              25121, ["Bergamot","Grapefruit"], ["Black Pepper","Frankincense","Patchouli","Leather"], ["Vetiver","Cedar","Tonka"], 8, 7, "EDT", 450),
    ("Lancôme La Vie Est Belle",      "Lancôme",               2012, "Feminine",  "Amber Vanilla",      14095, ["Black Currant","Pear"], ["Iris","Jasmine","Orange Blossom"], ["Praline","Vanilla","Patchouli","Tonka"], 9, 8, "EDP", 600),
    ("Lancôme Idôle",                 "Lancôme",               2019, "Feminine",  "Floral Musk",        56566, ["Pink Pepper","Pear","Bergamot"], ["Rose Petals","Jasmine"], ["White Musks","Vanilla","Cedar"], 7, 6, "EDP", 550),
    ("Lancôme Trésor",                "Lancôme",               1990, "Feminine",  "Floral",             444,   ["Apricot Blossom","Pineapple","Peach","Lily of the Valley","Bergamot","Rose"], ["Iris","Lilac","Heliotrope","Jasmine","Orchid","Rose"], ["Sandalwood","Vanilla","Musk","Amber","Apricot","Peach"], 8, 7, "EDP", 600),
    ("Carolina Herrera 212 Sexy",     "Carolina Herrera",      2004, "Masculine", "Aromatic",           834,   ["Mandarin Orange","Bitter Orange","Spices"], ["Tonka","Sage"], ["Sandalwood","Amber","Patchouli"], 7, 6, "EDT", 450),
    ("Gucci Bloom",                   "Gucci",                 2017, "Feminine",  "Floral",             42826, ["Jasmine Bud"], ["Tuberose","Rangoon Creeper"], ["Orris","Musk"], 7, 6, "EDP", 550),
    ("Gucci Guilty Absolute",         "Gucci",                 2017, "Masculine", "Woody Spicy",        42827, ["Leather","Vetiver"], ["Patchouli","Cypress"], ["Goldenwood","Cedar"], 8, 7, "EDP", 550),
    ("Gucci Mémoire d'une Odeur",     "Gucci",                 2019, "Unisex",    "Aromatic",           56567, ["Roman Chamomile","Indian Coral Jasmine"], ["Roman Chamomile","Almond","Vanilla"], ["Cedar","Sandalwood","Musk"], 7, 6, "EDP", 600),
    ("Prada Paradoxe",                "Prada",                 2022, "Feminine",  "Floral",             78432, ["Bergamot","Mandarin"], ["Jasmine","Magnolia","Frangipani"], ["Vanilla","Amber","Musk"], 8, 7, "EDP", 600),
    ("Prada L'Homme",                 "Prada",                 2016, "Masculine", "Aromatic",           37558, ["Neroli","Cardamom","Geranium"], ["Iris","Patchouli","Mate"], ["Amber","Cedar","Sandalwood"], 7, 6, "EDT", 500),
    ("Prada Luna Rossa Carbon",       "Prada",                 2017, "Masculine", "Aromatic",           42828, ["Bergamot","Lavender"], ["Iso E Super","Coumarin"], ["Patchouli","Ambroxan","Vetiver"], 8, 7, "EDT", 480),

    # ─── MORE NICHE PREMIUM (₪900-1700) ───────────────────────────
    ("Tom Ford Rose Prick Eau Soleil","Tom Ford",              2022, "Unisex",    "Floral Woody",       78433, ["Sichuan Pepper","Bulgarian Rose","Turkish Rose"], ["May Rose","Jasmine"], ["Sandalwood","Patchouli","Tonka"], 8, 7, "EDP", 1500),
    ("Tom Ford Tuscan Leather Intense","Tom Ford",             2022, "Unisex",    "Leather",            78434, ["Raspberry","Saffron","Thyme"], ["Leather","Olibanum"], ["Suede","Amber","Wood"], 9, 9, "Parfum", 2400),
    ("Tom Ford Bois Pacifique",       "Tom Ford",              2019, "Unisex",    "Woody",              56568, ["Bergamot","Pepper"], ["Cedar","Cypress"], ["Patchouli","Sandalwood","Musk"], 8, 7, "EDP", 1500),
    ("Tom Ford Vert Boheme",          "Tom Ford",              2015, "Unisex",    "Floral Green",       31560, ["Galbanum","Bergamot"], ["Black Currant","Magnolia"], ["Sandalwood","Cedar","Musk"], 7, 6, "EDP", 1500),
    ("Tom Ford Sole di Positano",     "Tom Ford",              2017, "Unisex",    "Citrus",             42829, ["Bergamot","Mandarin","Lemon"], ["Petitgrain","Jasmine"], ["Vetiver","Musk"], 6, 5, "EDP", 1300),
    ("MFK Aqua Celestia",             "Maison Francis Kurkdjian", 2017, "Unisex", "Floral",             42830, ["Mint","Bergamot","Lime"], ["Mimosa","Jasmine"], ["Black Currant","Musk"], 6, 5, "EDP", 1300),
    ("MFK OUD Silk Mood",             "Maison Francis Kurkdjian", 2018, "Unisex", "Amber Woody",        50530, ["Violet","Magnolia"], ["Bulgarian Rose","Benzoin","Papyrus"], ["Oud","Mahogany","Iris"], 9, 8, "EDP", 1700),
    ("MFK OUD Cashmere Mood",         "Maison Francis Kurkdjian", 2015, "Unisex", "Amber Woody",        31561, ["Cinnamon","Vanilla"], ["Benzoin"], ["Oud","Sandalwood","Cashmere Wood"], 9, 8, "EDP", 1700),
    ("MFK Lumière Noire Pour Femme",  "Maison Francis Kurkdjian", 2009, "Feminine", "Floral",           6869,  ["Cumin","Pink Pepper"], ["Bulgarian Rose","Honey"], ["Cedar","Sandalwood","Patchouli"], 8, 7, "EDP", 1500),
    ("Parfums de Marly Kuhuyan",      "Parfums de Marly",      2018, "Masculine", "Aromatic Spicy",     50531, ["Lavender","Cardamom"], ["Tobacco","Patchouli"], ["Sandalwood","Vetiver","Cedar"], 9, 8, "EDP", 1100),
    ("Parfums de Marly Cassili",      "Parfums de Marly",      2017, "Feminine",  "Floral Fruity",      42831, ["Mango","Lychee","Mandarin"], ["Damask Rose","Jasmine"], ["Sandalwood","Vanilla","Musk"], 7, 6, "EDP", 1100),
    ("Parfums de Marly Athalia",      "Parfums de Marly",      2017, "Feminine",  "Floral",             42832, ["Bergamot","Pear"], ["Iris","Tuberose"], ["Sandalwood","Vanilla","Musk"], 7, 6, "EDP", 1100),
    ("Parfums de Marly Meliora",      "Parfums de Marly",      2018, "Feminine",  "Amber Floral",       50532, ["Saffron","Pink Pepper"], ["Rose","Iris","Olibanum"], ["Patchouli","Vanilla","Musk"], 9, 8, "EDP", 1100),
    ("Initio Mystic Experience",      "Initio Parfums Privés", 2019, "Unisex",    "Amber Spicy",        56569, ["Cinnamon","Pink Pepper"], ["Tobacco","Iris"], ["Cedar","Sandalwood","Musk"], 9, 8, "EDP", 1700),
    ("Initio Blessed Baraka",         "Initio Parfums Privés", 2017, "Unisex",    "Amber Floral",       42833, ["Saffron","Honey"], ["Rose","Cardamom"], ["Sandalwood","Amber","Musk"], 9, 8, "EDP", 1700),
    ("Initio Divine Attraction",      "Initio Parfums Privés", 2017, "Unisex",    "Amber Spicy",        42834, ["Saffron","Cardamom"], ["Iris","Tobacco"], ["Patchouli","Sandalwood","Musk"], 8, 7, "EDP", 1700),
    ("Le Labo Bergamote 22 Eau",      "Le Labo",               2014, "Unisex",    "Citrus",             25122, ["Bergamot","Petitgrain","Grapefruit"], ["Orange Blossom","Vetiver"], ["Musk","Amber","Cedar"], 7, 6, "EDP", 1100),
    ("Le Labo Patchouli 24",          "Le Labo",               2006, "Unisex",    "Woody",              1077,  ["Birch","Olibanum","Bergamot"], ["Patchouli","Vanilla"], ["Patchouli","Styrax"], 9, 8, "EDP", 1100),
    ("Le Labo Oud 27",                "Le Labo",               2009, "Unisex",    "Amber Woody",        6870,  ["Pepper","Saffron"], ["Oud","Cedar"], ["Sandalwood","Patchouli","Musk"], 9, 8, "EDP", 1100),
    ("Diptyque Tempo",                "Diptyque",              2018, "Unisex",    "Woody",              50533, ["Bergamot","Mate"], ["Patchouli","Violet","Clary Sage"], ["Musk","Amber"], 8, 7, "EDP", 1100),
    ("Diptyque 34 Boulevard",         "Diptyque",              2011, "Unisex",    "Aromatic Citrus",    11738, ["Cassis","Bergamot","Black Pepper"], ["Cedar","Geranium","Vetiver"], ["Sandalwood","Amber","Musk"], 7, 6, "EDT", 1100),
    ("Memo African Leather",          "Memo Paris",            2014, "Unisex",    "Leather",            25123, ["Cardamom","Saffron"], ["Geranium","Cumin","Vetiver"], ["Leather","Patchouli","Musk"], 9, 8, "EDP", 1500),
    ("Memo Quartier Latin",           "Memo Paris",            2016, "Unisex",    "Aromatic",           37559, ["Cedar","Saffron"], ["Patchouli","Cumin"], ["Vetiver","Cedar","Musk"], 8, 7, "EDP", 1500),
    ("Memo Granada",                  "Memo Paris",            2014, "Feminine",  "Amber Floral",       25124, ["Mandarin","Pink Pepper"], ["Rose","Iris"], ["Patchouli","Cedar","Vanilla"], 8, 7, "EDP", 1500),
    ("Penhaligon's Halfeti Cedar",    "Penhaligon's",          2020, "Unisex",    "Woody",              65836, ["Bergamot","Cardamom"], ["Cedar","Saffron","Olibanum"], ["Oud","Sandalwood","Musk"], 9, 8, "EDP", 1300),
    ("Penhaligon's The Tragedy of",   "Penhaligon's",          2018, "Masculine", "Leather",            50534, ["Bergamot","Pepper"], ["Iris","Leather"], ["Vetiver","Tobacco","Patchouli"], 9, 8, "EDP", 1300),
    ("Penhaligon's Heartless Helen",  "Penhaligon's",          2018, "Feminine",  "Floral",             50535, ["Rose","Pink Pepper"], ["Saffron","Geranium"], ["Sandalwood","Patchouli","Musk"], 8, 7, "EDP", 1300),
    ("Bond No. 9 Signature Scent",    "Bond No. 9",            2003, "Unisex",    "Floral Woody",       1578,  ["Bergamot","Lemon"], ["Rose","Iris","Pink Pepper"], ["Sandalwood","Musk","Amber"], 8, 7, "EDP", 1900),
    ("Maison Crivelli Citrus Batikanga","Maison Crivelli",     2018, "Unisex",    "Citrus Aromatic",    50536, ["Mandarin","Bergamot"], ["Cardamom","Cumin"], ["Vetiver","Musk"], 7, 6, "EDP", 1700),
    ("Maison Crivelli Iris Malikhân", "Maison Crivelli",       2019, "Unisex",    "Floral",             56570, ["Iris","Saffron"], ["Tobacco","Patchouli"], ["Sandalwood","Cedar","Musk"], 8, 7, "EDP", 1700),

    # ─── ROJA + CLIVE CHRISTIAN ADDS ─────────────────────────────
    ("Roja Danger Pour Homme",        "Roja Parfums",          2017, "Masculine", "Woody Spicy",        42835, ["Bergamot","Saffron"], ["Tobacco","Olibanum"], ["Patchouli","Sandalwood","Cedar"], 9, 8, "Parfum", 2400),
    ("Roja Fetish Pour Homme",        "Roja Parfums",          2017, "Masculine", "Aromatic Fougere",   42836, ["Bergamot","Lavender"], ["Geranium","Jasmine"], ["Vetiver","Sandalwood","Patchouli"], 9, 8, "Parfum", 2400),
    ("Clive Christian E Cashmere",    "Clive Christian",       2019, "Unisex",    "Woody",              56571, ["Bergamot","Saffron"], ["Iris","Cedar"], ["Cashmere Wood","Sandalwood","Musk"], 8, 7, "Parfum", 4500),
    ("Clive Christian C Woody Leather","Clive Christian",      2019, "Masculine", "Leather",            56572, ["Bergamot","Pepper"], ["Iris","Leather"], ["Sandalwood","Cedar","Patchouli"], 9, 8, "Parfum", 4500),
    ("Clive Christian X for Women",   "Clive Christian",       2007, "Feminine",  "Floral",             1268,  ["Cassis","Mandarin","Lemon"], ["Iris","Rose","Jasmine"], ["Vetiver","Sandalwood","Musk"], 8, 7, "Parfum", 3500),

    # ─── DIOR PRIVÉE EXTRAS ──────────────────────────────────────
    ("Cuir Cannage",                  "Dior Privée",           2014, "Unisex",    "Leather",            25125, ["Saffron","Pink Pepper"], ["Iris","Leather"], ["Vanilla","Sandalwood","Patchouli"], 9, 8, "EDP", 2400),
    ("New Look 1947",                 "Dior Privée",           2013, "Feminine",  "Floral Aldehyde",    19153, ["Aldehydes","Bergamot"], ["Iris","Jasmine","Rose"], ["Sandalwood","Musk","Vetiver"], 8, 7, "EDP", 2400),
    ("Mitzah",                        "Dior Privée",           2010, "Unisex",    "Amber Spicy",        8931,  ["Cinnamon","Saffron","Coriander"], ["Patchouli","Honey","Rose"], ["Labdanum","Tonka","Sandalwood"], 9, 8, "EDP", 2400),
    ("Spice Blend",                   "Dior Privée",           2018, "Unisex",    "Amber Spicy",        50537, ["Cumin","Cardamom","Pepper"], ["Saffron","Cinnamon"], ["Patchouli","Vanilla","Sandalwood"], 9, 8, "EDP", 2400),

    # ─── MORE LATTAFA + BACK CATALOG ─────────────────────────────
    ("Lattafa Velvet Oud",            "Lattafa",               2021, "Unisex",    "Amber Woody",        70560, ["Saffron","Bergamot"], ["Oud","Patchouli"], ["Sandalwood","Amber","Musk"], 9, 8, "EDP", 320),
    ("Lattafa Liquid Brun",           "Lattafa",               2023, "Masculine", "Amber Vanilla",      82425, ["Bergamot","Apple"], ["Tobacco","Cinnamon"], ["Vanilla","Tonka","Patchouli"], 9, 8, "EDP", 320),
    ("Lattafa Eclaire",               "Lattafa",               2023, "Feminine",  "Floral",             82426, ["Bergamot","Pink Pepper"], ["Rose","Jasmine"], ["Vanilla","Sandalwood","Musk"], 8, 7, "EDP", 280),
    ("Lattafa Yara Tous",             "Lattafa",               2022, "Feminine",  "Amber Vanilla",      78435, ["Orchid","Pear"], ["Vanilla","Heliotrope"], ["Sandalwood","Musk"], 8, 7, "EDP", 280),
    ("Lattafa Khamrah Gourmand",      "Lattafa",               2024, "Unisex",    "Amber Vanilla",      87421, ["Cinnamon","Bergamot"], ["Praline","Caramel"], ["Vanilla","Tonka","Sandalwood"], 9, 8, "EDP", 350),
    ("Armaf Club de Nuit Intense",    "Armaf",                 2015, "Masculine", "Fruity Chypre",      31562, ["Lemon","Black Currant","Apple","Bergamot","Pineapple"], ["Birch","Jasmine","Rose"], ["Musk","Ambergris","Vanilla"], 9, 9, "EDP", 280),
    ("Armaf Club de Nuit Sillage",    "Armaf",                 2017, "Unisex",    "Amber Spicy",        42837, ["Bergamot","Lavender","Apple"], ["Birch","Jasmine"], ["Musk","Patchouli","Amber"], 8, 8, "EDP", 280),
    ("Armaf Ventana",                 "Armaf",                 2021, "Masculine", "Aromatic Citrus",    70561, ["Bergamot","Mandarin"], ["Lavender","Geranium"], ["Vetiver","Cedar","Musk"], 7, 6, "EDP", 250),
    ("Armaf Odyssey Homme",           "Armaf",                 2018, "Masculine", "Amber Spicy",        50538, ["Cardamom","Pepper"], ["Tobacco","Iris"], ["Sandalwood","Amber","Musk"], 8, 7, "EDP", 280),

    # ─── EXTRA POPULAR (UNIQUE GAPS) ─────────────────────────────
    ("Aventus for Her",               "Creed",                 2016, "Feminine",  "Chypre Fruity",      37560, ["Egyptian Musk","Pink Pepper","Italian Bergamot"], ["Sicilian Lemon","Indian Sandalwood","Patchouli"], ["Royal Lily","Vanilla","Cassis","Pink Sicilian Mandarin","Indian Sandalwood","Lily","Peach"], 8, 7, "EDP", 1700),
    ("Erolfa",                        "Creed",                 1992, "Masculine", "Aromatic Aquatic",   480,   ["Bergamot","Lemon","Mandarin"], ["Marine Notes","Galbanum","Jasmine"], ["Cedar","Vetiver","Musk"], 7, 6, "EDP", 1700),
    ("Original Vetiver",              "Creed",                 2004, "Masculine", "Woody Aromatic",     788,   ["Bergamot","Mandarin","Ginger"], ["Vetiver","Cedar"], ["Musk","Tonka","Vetiver"], 7, 6, "EDP", 1700),
    ("Original Santal",               "Creed",                 2005, "Masculine", "Woody Spicy",        1265,  ["Cinnamon","Bergamot","Coriander"], ["Sandalwood","Cedar"], ["Sandalwood","Vetiver","Musk"], 8, 7, "EDP", 1700),
    ("Bois du Portugal",              "Creed",                 1987, "Masculine", "Woody Aromatic",     477,   ["Lavender","Bergamot"], ["Cedar","Geranium"], ["Tonka","Sandalwood","Musk","Ambergris"], 8, 7, "EDP", 1700),
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
