-- Create job_board_searches table
-- Reference: /Users/maximeboiraud/CascadeProjects/windsurf-project/app_documentation/database_tables.md

-- ============================================
-- job_board_searches table
-- ============================================
CREATE TABLE IF NOT EXISTS public.job_board_searches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    search_criteria_id UUID NOT NULL REFERENCES public.search_criteria(id) ON DELETE CASCADE,
    job_board TEXT NOT NULL,
    search_url TEXT,
    search_params JSONB,
    last_scraped_at TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for faster lookups
CREATE INDEX idx_job_board_searches_user_id ON public.job_board_searches(user_id);
CREATE INDEX idx_job_board_searches_search_criteria_id ON public.job_board_searches(search_criteria_id);
CREATE INDEX idx_job_board_searches_is_active ON public.job_board_searches(is_active);

-- Enable Row Level Security
ALTER TABLE public.job_board_searches ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own job board searches"
    ON public.job_board_searches
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own job board searches"
    ON public.job_board_searches
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own job board searches"
    ON public.job_board_searches
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own job board searches"
    ON public.job_board_searches
    FOR DELETE
    USING (auth.uid() = user_id);

-- Ensure trigger function exists
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER update_job_board_searches_updated_at
    BEFORE UPDATE ON public.job_board_searches
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();
