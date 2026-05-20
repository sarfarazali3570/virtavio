-- ────────────────────────────────────────────────────────────
-- 7. MULTI-VENDOR SUPPORT & UPDATED RLS
-- ────────────────────────────────────────────────────────────

-- Update user_role enum if it doesn't have 'vendor'
DO $$ BEGIN
    ALTER TYPE user_role ADD VALUE 'vendor';
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ── BLOGS RLS (Multi-Vendor) ─────────────────────────────────

DROP POLICY IF EXISTS "Admins can do everything on blogs" ON public.blogs;
DROP POLICY IF EXISTS "Anyone can view published blogs" ON public.blogs;

-- Anyone can view published
CREATE POLICY "Anyone can view published blogs"
  ON public.blogs FOR SELECT
  USING (published = true);

-- Admins can do everything
CREATE POLICY "Admins can manage all blogs"
  ON public.blogs FOR ALL
  USING (public.is_admin());

-- Vendors can manage THEIR OWN blogs
CREATE POLICY "Vendors can manage own blogs"
  ON public.blogs FOR ALL
  USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'vendor' 
    AND 
    author_id = auth.uid()
  );

-- ── LEADS RLS (Multi-Vendor) ─────────────────────────────────

DROP POLICY IF EXISTS "Admins can view leads" ON public.leads;

CREATE POLICY "Admins can view all leads"
  ON public.leads FOR SELECT
  USING (public.is_admin());

-- If a lead is associated with a service provided by a vendor, they should see it.
-- For now, let's assume vendors can see leads if we add a 'vendor_id' to leads.
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS vendor_id UUID REFERENCES auth.users(id);

CREATE POLICY "Vendors can view own leads"
  ON public.leads FOR SELECT
  USING (vendor_id = auth.uid());

-- ────────────────────────────────────────────────────────────
-- 8. VENDOR AUTHORIZATION HELPER
-- ────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.is_vendor()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    SELECT role = 'vendor'
    FROM public.profiles
    WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
