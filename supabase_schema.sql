-- ==============================================================================
-- BOVEN FRONTIER INTERNATIONAL LLP - SUPABASE DATABASE INITIALIZATION SCHEMA
-- ==============================================================================
-- Run this script in your Supabase SQL Editor (Dashboard -> SQL Editor -> New Query)
-- to create the tables, security policies, and initial product catalog data.

-- 1. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    brand TEXT NOT NULL,
    category TEXT NOT NULL,
    tagline TEXT,
    description TEXT,
    variants JSONB DEFAULT '[]'::jsonb,
    image TEXT,
    scale NUMERIC DEFAULT 0.82,
    is_featured BOOLEAN DEFAULT false,
    in_stock BOOLEAN DEFAULT true,
    sort_order INT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. COMPANY SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.company_settings (
    id TEXT PRIMARY KEY DEFAULT 'default',
    data JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. ADMIN USERS TABLE
CREATE TABLE IF NOT EXISTS public.admin_users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    role TEXT DEFAULT 'Administrator',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. INQUIRIES DESK TABLE
CREATE TABLE IF NOT EXISTS public.inquiries (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    company TEXT,
    email TEXT,
    phone TEXT,
    region TEXT,
    buyer_type TEXT,
    product TEXT,
    message TEXT,
    submitted_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. BRANDS TABLE
CREATE TABLE IF NOT EXISTS public.brands (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- POLICIES: PUBLIC READ ACCESS FOR WEBSITE VISITORS
CREATE POLICY "Public can view active products" 
    ON public.products FOR SELECT USING (true);

CREATE POLICY "Public can view company settings" 
    ON public.company_settings FOR SELECT USING (true);

CREATE POLICY "Public can submit contact inquiries" 
    ON public.inquiries FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can view brands" 
    ON public.brands FOR SELECT USING (true);

CREATE POLICY "Public can view categories" 
    ON public.categories FOR SELECT USING (true);

-- POLICIES: AUTHENTICATED ADMINISTRATOR WRITE & MANAGEMENT ACCESS
CREATE POLICY "Authenticated admin write access to products" 
    ON public.products FOR ALL 
    USING (auth.role() = 'authenticated') 
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated admin write access to company settings" 
    ON public.company_settings FOR ALL 
    USING (auth.role() = 'authenticated') 
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated admin access to admin users" 
    ON public.admin_users FOR ALL 
    USING (auth.role() = 'authenticated') 
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated admin access to inquiries" 
    ON public.inquiries FOR ALL 
    USING (auth.role() = 'authenticated') 
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated admin write access to brands" 
    ON public.brands FOR ALL 
    USING (auth.role() = 'authenticated') 
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated admin write access to categories" 
    ON public.categories FOR ALL 
    USING (auth.role() = 'authenticated') 
    WITH CHECK (auth.role() = 'authenticated');

-- SEED INITIAL BRANDS
INSERT INTO public.brands (name) VALUES 
    ('LEXONE'), ('FABIE PLUS'), ('KARE')
ON CONFLICT (name) DO NOTHING;

-- SEED INITIAL CATEGORIES
INSERT INTO public.categories (name) VALUES 
    ('LAUNDRY CARE'), ('FLOOR CARE'), ('SURFACE CARE'), 
    ('DISINFECTION'), ('PERSONAL CARE'), ('FABRIC CARE')
ON CONFLICT (name) DO NOTHING;

-- SEED PRIMARY ADMIN
INSERT INTO public.admin_users (id, name, email, role)
VALUES ('usr_aswin_primary', 'Aswin', 'aswin@bovenfrontier.co.in', 'Super Admin')
ON CONFLICT (email) DO NOTHING;

-- SEED DEFAULT COMPANY SETTINGS
INSERT INTO public.company_settings (id, data)
VALUES (
    'default',
    '{
        "name": "BOVEN FRONTIER INTERNATIONAL LLP",
        "shortName": "Boven Frontier",
        "tagline": "Connecting Quality. Creating Markets. Growing Together.",
        "llpId": "ACE-5349",
        "gstin": "32ABCFR2913N1ZR",
        "address": "Room No. OP 7/452, Manakkadavu, Kozhikode 673019, India",
        "phone1": "+91 96338 90447",
        "phone2": "+91 70127 77495",
        "whatsappUAE": "+971 50 735 5418",
        "email1": "info@bovenfrontier.co.in",
        "email2": "aswin@bovenfrontier.co.in",
        "emailSales": "sales@bovenfrontier.co.in",
        "operatingHours": "Mon - Sat: 9:00 AM - 6:30 PM (IST)",
        "origin": "Manufactured in India",
        "markets": "India · Middle East · GCC"
    }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data;


-- SEED INITIAL PRODUCTS
INSERT INTO public.products (id, name, brand, category, tagline, description, variants, image, scale, is_featured, in_stock, sort_order)
VALUES (
    'lexone-liquid-detergent',
    'Liquid Detergent',
    'LEXONE',
    'LAUNDRY CARE',
    'High-efficiency liquid wash for all fabric types',
    'Advanced low-suds formulation engineered for front load, top load, and manual bucket wash. Leaves clothes impeccably clean with a fresh lasting aroma.',
    '["1 L","2 L","5 L"]'::jsonb,
    '/assets/products/lexoneliquiddetergent.png',
    0.82,
    true,
    true,
    1
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.products (id, name, brand, category, tagline, description, variants, image, scale, is_featured, in_stock, sort_order)
VALUES (
    'lexone-dishwash-liquid',
    'Yellow Dish Wash Liquid',
    'LEXONE',
    'SURFACE CARE',
    'Grease-cutting concentrated dishwashing formula',
    'Fast-action lime formula removes tough grease, burnt oil stains, and food odours without leaving any white residue on utensils.',
    '["250 ml","500 ml","1 L"]'::jsonb,
    '/assets/products/LexOneDishwash250ml5001lt.png',
    0.82,
    true,
    true,
    2
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.products (id, name, brand, category, tagline, description, variants, image, scale, is_featured, in_stock, sort_order)
VALUES (
    'lexone-floor-cleaner',
    'Floor Cleaner',
    'LEXONE',
    'FLOOR CARE',
    'Gleaming surface finish with lasting floral fragrance',
    'All-surface antibacterial floor cleaner suitable for tiles, marble, granite, and mosaic surfaces. Available in Rose and Lavender fragrances.',
    '["500 ml","1 L","5 L"]'::jsonb,
    '/assets/products/LexoneFloorcleaner500ml.png',
    0.82,
    true,
    true,
    3
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.products (id, name, brand, category, tagline, description, variants, image, scale, is_featured, in_stock, sort_order)
VALUES (
    'lexone-bathroom-cleaner',
    'Bathroom Cleaner',
    'LEXONE',
    'SURFACE CARE',
    'Powerful limescale and soap scum remover',
    'Deep penetrating formula cuts through tough water marks, soap scum, and grime on bathroom tiles, sinks, and chrome fittings.',
    '["250 ml","500 ml"]'::jsonb,
    '/assets/products/LexoneBathroomcleaner.png',
    0.82,
    true,
    true,
    4
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.products (id, name, brand, category, tagline, description, variants, image, scale, is_featured, in_stock, sort_order)
VALUES (
    'lexone-disinfectant-cleaner',
    'Disinfectant Cleaner',
    'LEXONE',
    'DISINFECTION',
    'Hospital-grade sanitization for high-touch areas',
    'Broad-spectrum disinfectant formulated to neutralize germs, pathogens, and bacteria. Infused with natural lemongrass and lavender oils.',
    '["500 ml","1 L"]'::jsonb,
    '/assets/products/LexoneDisinfectantCleaner.png',
    0.82,
    true,
    true,
    5
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.products (id, name, brand, category, tagline, description, variants, image, scale, is_featured, in_stock, sort_order)
VALUES (
    'lexone-fabric-conditioner',
    'Fabric Conditioner',
    'LEXONE',
    'FABRIC CARE',
    'Plush fiber softness with microscopic fragrance pearls',
    'Conditions garment fibers, prevents static cling, and locks in a luxurious fresh scent that reactivates throughout the day.',
    '["250 ml","500 ml"]'::jsonb,
    '/assets/products/LexoneFabricconditioner.png',
    0.82,
    true,
    true,
    6
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.products (id, name, brand, category, tagline, description, variants, image, scale, is_featured, in_stock, sort_order)
VALUES (
    'lexone-handwash-5l',
    'Handwash Economy',
    'LEXONE',
    'PERSONAL CARE',
    'Gentle on skin, tough on microbes',
    'pH-balanced institutional and bulk packaging handwash with soothing moisturizers for frequent hand hygiene.',
    '["5 L"]'::jsonb,
    '/assets/products/Lexonehandwash5ltr.png',
    0.82,
    true,
    true,
    7
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.products (id, name, brand, category, tagline, description, variants, image, scale, is_featured, in_stock, sort_order)
VALUES (
    'fabie-plus-detergent-powder',
    'Detergent Powder',
    'FABIE PLUS',
    'LAUNDRY CARE',
    'Heavy-duty stain release detergent powder',
    'Active enzyme granules dissolve instantly even in hard or cold water, removing deep-seated soil without degrading fabrics.',
    '["500 g","1 kg"]'::jsonb,
    '/assets/products/FabiePlusDetergentpowder.png',
    0.82,
    true,
    true,
    8
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.products (id, name, brand, category, tagline, description, variants, image, scale, is_featured, in_stock, sort_order)
VALUES (
    'fabie-plus-liquid-detergent',
    'Liquid Detergent',
    'FABIE PLUS',
    'LAUNDRY CARE',
    'Everyday high-efficiency laundry liquid',
    'Engineered for optimal wash economy in commercial laundries and large households. Concentrated cleaning power.',
    '["1 L","2 L","5 L"]'::jsonb,
    '/assets/products/Fabieplusliquid125.png',
    0.82,
    true,
    true,
    9
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.products (id, name, brand, category, tagline, description, variants, image, scale, is_featured, in_stock, sort_order)
VALUES (
    'fabie-plus-liquid-pouch',
    'Liquid Detergent Pouch',
    'FABIE PLUS',
    'LAUNDRY CARE',
    'Eco-conscious bulk refill pouch packaging',
    'Reduced-plastic spouted pouch offering high value and convenience for retail refill and export distribution.',
    '["2 L","5 L"]'::jsonb,
    '/assets/products/fABIEpLUSlIQUIDDETERGENTPOUCH.png',
    0.82,
    true,
    true,
    10
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.products (id, name, brand, category, tagline, description, variants, image, scale, is_featured, in_stock, sort_order)
VALUES (
    'fabie-plus-glass-cleaner',
    'Glass Cleaner',
    'FABIE PLUS',
    'SURFACE CARE',
    'Streak-free crystal clear shine',
    'Instant evaporation formula removes finger smudges, dust, and oily grime from mirrors, glass facades, and windshields.',
    '["750 ml"]'::jsonb,
    '/assets/products/FabieplusGlasscleaner.png',
    0.82,
    true,
    true,
    11
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.products (id, name, brand, category, tagline, description, variants, image, scale, is_featured, in_stock, sort_order)
VALUES (
    'fabie-plus-handwash',
    'Handwash Soft Clean',
    'FABIE PLUS',
    'PERSONAL CARE',
    'Silky foam with floral and antibacterial defense',
    'Lathers smoothly to flush away grease and contaminants while keeping palms hydrated. Available in Lavender and Floral scents.',
    '["250 ml","500 ml"]'::jsonb,
    '/assets/products/FabiePlusHandwash.png',
    0.82,
    true,
    true,
    12
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.products (id, name, brand, category, tagline, description, variants, image, scale, is_featured, in_stock, sort_order)
VALUES (
    'kare-phenyl-perfumed',
    'Perfumed Phenyl Disinfectant',
    'KARE',
    'DISINFECTION',
    'Long-lasting fragrance & hygienic floor protection',
    'Formulated with pine and fragrant aromatics (Misty Bliss, Chembabam, Lemongrass, Lavender) for superior floor hygiene in homes and clinics.',
    '["1 L","5 L"]'::jsonb,
    '/assets/products/LexoneFloorcleaner500ml.png',
    0.82,
    false,
    true,
    13
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.products (id, name, brand, category, tagline, description, variants, image, scale, is_featured, in_stock, sort_order)
VALUES (
    'kare-floor-cleaner-5l',
    'Heavy Duty Floor Cleaner Can',
    'KARE',
    'FLOOR CARE',
    'Institutional size for hotels, schools, and offices',
    'Concentrated industrial floor sanitizer capable of handling massive square footage and high foot-traffic corridors.',
    '["5 L"]'::jsonb,
    '/assets/products/Lexonehandwash5ltr.png',
    0.82,
    false,
    true,
    14
) ON CONFLICT (id) DO NOTHING;
