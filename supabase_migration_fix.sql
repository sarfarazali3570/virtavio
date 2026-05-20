
-- ────────────────────────────────────────────────────────────
-- 1. FIX THE RECURSIVE RLS PROBLEM
--    Create a SECURITY DEFINER function that bypasses RLS
--    when checking admin status (breaks the infinite loop).
-- ────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- ────────────────────────────────────────────────────────────
-- 2. DROP ALL OLD RECURSIVE POLICIES & RECREATE THEM
-- ────────────────────────────────────────────────────────────

-- Profiles
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can update all profiles"
  ON public.profiles FOR UPDATE
  USING (public.is_admin());

-- Leads
DROP POLICY IF EXISTS "Public can insert leads" ON public.leads;
DROP POLICY IF EXISTS "Admins can view all leads" ON public.leads;
DROP POLICY IF EXISTS "Admins can update leads" ON public.leads;

CREATE POLICY "Public can insert leads"
  ON public.leads FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view all leads"
  ON public.leads FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Admins can update leads"
  ON public.leads FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "Admins can delete leads"
  ON public.leads FOR DELETE
  USING (public.is_admin());

-- Blogs
DROP POLICY IF EXISTS "Public can view published blogs" ON public.blogs;
DROP POLICY IF EXISTS "Admins have full access to blogs" ON public.blogs;

CREATE POLICY "Public can view published blogs"
  ON public.blogs FOR SELECT
  USING (published = true);

CREATE POLICY "Admins can view all blogs"
  ON public.blogs FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Admins can insert blogs"
  ON public.blogs FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update blogs"
  ON public.blogs FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "Admins can delete blogs"
  ON public.blogs FOR DELETE
  USING (public.is_admin());

-- Testimonials
DROP POLICY IF EXISTS "Public can view testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Admins can manage testimonials" ON public.testimonials;

CREATE POLICY "Public can view testimonials"
  ON public.testimonials FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert testimonials"
  ON public.testimonials FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update testimonials"
  ON public.testimonials FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "Admins can delete testimonials"
  ON public.testimonials FOR DELETE
  USING (public.is_admin());

-- ────────────────────────────────────────────────────────────
-- 3. ADD MISSING COLUMNS TO blogs TABLE
-- ────────────────────────────────────────────────────────────

ALTER TABLE public.blogs ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE public.blogs ADD COLUMN IF NOT EXISTS meta_title TEXT;
ALTER TABLE public.blogs ADD COLUMN IF NOT EXISTS meta_description TEXT;

-- ────────────────────────────────────────────────────────────
-- 4. CREATE STORAGE BUCKET FOR BLOG IMAGES
-- ────────────────────────────────────────────────────────────

INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow admins to upload to blog-images bucket
CREATE POLICY "Admins can upload blog images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'blog-images'
    AND public.is_admin()
  );

-- Allow admins to update/delete blog images
CREATE POLICY "Admins can manage blog images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'blog-images'
    AND public.is_admin()
  );

CREATE POLICY "Admins can delete blog images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'blog-images'
    AND public.is_admin()
  );

-- Allow public to view blog images (since the bucket is public)
CREATE POLICY "Public can view blog images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'blog-images');
