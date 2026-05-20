-- ────────────────────────────────────────────────────────────
-- 5. ANALYTICS & TRAFFIC TABLES
-- ────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.traffic_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE UNIQUE DEFAULT CURRENT_DATE,
  visitors INTEGER DEFAULT 0,
  page_views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.traffic_stats ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Admins can view traffic stats"
  ON public.traffic_stats FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Admins can update traffic stats"
  ON public.traffic_stats FOR ALL
  USING (public.is_admin());

-- Function to increment daily traffic (could be called from middleware)
CREATE OR REPLACE FUNCTION public.increment_daily_traffic()
RETURNS VOID AS $$
BEGIN
  INSERT INTO public.traffic_stats (date, visitors, page_views)
  VALUES (CURRENT_DATE, 1, 1)
  ON CONFLICT (date)
  DO UPDATE SET 
    visitors = public.traffic_stats.visitors + 1,
    page_views = public.traffic_stats.page_views + 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ────────────────────────────────────────────────────────────
-- 6. SEED SOME INITIAL ANALYTICS DATA (Optional but helpful for visual)
-- ────────────────────────────────────────────────────────────

INSERT INTO public.traffic_stats (date, visitors, page_views)
VALUES 
  (CURRENT_DATE - INTERVAL '6 days', 120, 450),
  (CURRENT_DATE - INTERVAL '5 days', 150, 520),
  (CURRENT_DATE - INTERVAL '4 days', 180, 610),
  (CURRENT_DATE - INTERVAL '3 days', 140, 480),
  (CURRENT_DATE - INTERVAL '2 days', 210, 720),
  (CURRENT_DATE - INTERVAL '1 day', 250, 850),
  (CURRENT_DATE, 45, 120)
ON CONFLICT (date) DO NOTHING;
