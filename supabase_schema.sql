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

-- ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- POLICIES: PUBLIC READ ACCESS FOR WEBSITE VISITORS
CREATE POLICY "Public can view active products" 
    ON public.products FOR SELECT USING (true);

CREATE POLICY "Public can view company settings" 
    ON public.company_settings FOR SELECT USING (true);

CREATE POLICY "Public can submit contact inquiries" 
    ON public.inquiries FOR INSERT WITH CHECK (true);

-- POLICIES: AUTHENTICATED / SERVICE MANAGERS FULL ACCESS
CREATE POLICY "Full access to products for authorized users" 
    ON public.products FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Full access to company settings for authorized users" 
    ON public.company_settings FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Full access to admin users" 
    ON public.admin_users FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Full access to inquiries for authorized users" 
    ON public.inquiries FOR ALL USING (true) WITH CHECK (true);

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
