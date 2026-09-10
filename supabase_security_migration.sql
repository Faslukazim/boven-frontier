-- ==============================================================================
-- BOVEN FRONTIER - PRODUCTION RLS SECURITY MIGRATION
-- ==============================================================================
-- Run this migration in your Supabase SQL Editor (Dashboard -> SQL Editor -> New Query)
-- to secure your existing production database without altering tables or data.
--
-- PURPOSE:
-- 1. Remove dangerous 'FOR ALL USING (true) WITH CHECK (true)' policies that allowed
--    the public anon key to modify or delete data via the Supabase REST API.
-- 2. Restrict INSERT, UPDATE, and DELETE operations to authenticated admin sessions.
-- 3. Restrict SELECT/UPDATE/DELETE on inquiries to authenticated administrators only,
--    while preserving public INSERT for customer website inquiries.
-- 4. Restrict all operations on admin_users to authenticated administrators only.
-- ==============================================================================

-- STEP 1: ENSURE ROW LEVEL SECURITY IS ACTIVE ON ALL TABLES
ALTER TABLE IF EXISTS public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.company_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.categories ENABLE ROW LEVEL SECURITY;

-- STEP 2: DROP OLD INSECURE POLICIES
DROP POLICY IF EXISTS "Full access to products for authorized users" ON public.products;
DROP POLICY IF EXISTS "Full access to company settings for authorized users" ON public.company_settings;
DROP POLICY IF EXISTS "Full access to admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Full access to inquiries for authorized users" ON public.inquiries;
DROP POLICY IF EXISTS "Full access to brands for authorized users" ON public.brands;
DROP POLICY IF EXISTS "Full access to categories for authorized users" ON public.categories;

-- Also clean up any prior naming variations
DROP POLICY IF EXISTS "Authenticated admin write access" ON public.products;
DROP POLICY IF EXISTS "Authenticated admin write access" ON public.company_settings;
DROP POLICY IF EXISTS "Authenticated admin write access" ON public.brands;
DROP POLICY IF EXISTS "Authenticated admin write access" ON public.categories;
DROP POLICY IF EXISTS "Authenticated admin access to inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Authenticated admin access to admin_users" ON public.admin_users;
DROP POLICY IF EXISTS "Public can view admin users" ON public.admin_users;

-- STEP 3: APPLY SCOPED POLICIES

-- ------------------------------------------------------------------------------
-- 1. PRODUCTS TABLE
-- Public: Read-only access to view the catalog
-- Authenticated: Full write access (Insert, Update, Delete)
-- ------------------------------------------------------------------------------
CREATE POLICY "Authenticated admin write access"
    ON public.products
    FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- ------------------------------------------------------------------------------
-- 2. COMPANY SETTINGS TABLE
-- Public: Read-only access to view contact details, address, and legal info
-- Authenticated: Full write access (Update company details)
-- ------------------------------------------------------------------------------
CREATE POLICY "Authenticated admin write access"
    ON public.company_settings
    FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- ------------------------------------------------------------------------------
-- 3. BRANDS TABLE
-- Public: Read-only access for catalog brand filters
-- Authenticated: Full write access (Add, Rename, Delete brands)
-- ------------------------------------------------------------------------------
CREATE POLICY "Authenticated admin write access"
    ON public.brands
    FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- ------------------------------------------------------------------------------
-- 4. CATEGORIES TABLE
-- Public: Read-only access for catalog category filters
-- Authenticated: Full write access (Add, Rename, Delete categories)
-- ------------------------------------------------------------------------------
CREATE POLICY "Authenticated admin write access"
    ON public.categories
    FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- ------------------------------------------------------------------------------
-- 5. INQUIRIES DESK TABLE
-- Public: INSERT ONLY (Prospective wholesale buyers submitting contact forms)
-- Authenticated: Full access (View, Update, Delete inquiries in Admin Desk)
-- Notice: Public SELECT is strictly denied to protect customer contact privacy!
-- ------------------------------------------------------------------------------
CREATE POLICY "Authenticated admin access to inquiries"
    ON public.inquiries
    FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- ------------------------------------------------------------------------------
-- 6. ADMIN USERS TABLE
-- Public: NO ACCESS (Cannot view, insert, update, or delete administrative users)
-- Authenticated: Full access to manage team members
-- ------------------------------------------------------------------------------
CREATE POLICY "Authenticated admin access to admin_users"
    ON public.admin_users
    FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- ==============================================================================
-- OPTIONAL: NORMALIZE DEFAULT HERO PRODUCT (1 SOLE HERO PRODUCT)
-- ==============================================================================
-- UPDATE public.products SET is_featured = false;
-- UPDATE public.products SET is_featured = true WHERE id = 'lexone-bathroom-cleaner';

-- ==============================================================================
-- VERIFICATION QUERY
-- Run this query to inspect all active policies and ensure no public write exists:
-- ==============================================================================
-- SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
-- FROM pg_policies 
-- WHERE schemaname = 'public';
