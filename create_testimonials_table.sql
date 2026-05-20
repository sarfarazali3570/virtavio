-- Run this in your Supabase SQL Editor to create the testimonials table

CREATE TABLE public.testimonials (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  role text,
  company text,
  content text NOT NULL,
  rating integer DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  status text DEFAULT 'published' CHECK (status IN ('draft', 'published')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Allow public read access (only for published)
CREATE POLICY "Allow public read access" ON public.testimonials FOR SELECT USING (status = 'published');

-- Allow authenticated users (admins) to select all, insert, update, delete
CREATE POLICY "Allow authenticated select all" ON public.testimonials FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated insert" ON public.testimonials FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON public.testimonials FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON public.testimonials FOR DELETE USING (auth.role() = 'authenticated');

-- Insert initial dummy data
INSERT INTO public.testimonials (name, role, company, content, rating, status) VALUES
('Sarah Chen', 'CTO', 'Novalink AI', '"Virtavio didn''t just build a tool; they redefined our entire data strategy. Their AI expertise is leagues ahead of the industry average. Highly recommended!"', 5, 'published'),
('David Miller', 'Founder', 'ScaleFlow', '"The ROI was immediate. We saw a 40% reduction in customer support load within two months of deploying their Agentic Chat solution."', 5, 'published'),
('Emma Rodriguez', 'VP Engineering', 'DataHive Corp', '"Their ability to translate complex AI models into tangible business outcomes is what makes them a true powerhouse partner."', 5, 'published');
