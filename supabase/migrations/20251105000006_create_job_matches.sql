-- Create job_matches table
-- Reference: /Users/maximeboiraud/CascadeProjects/windsurf-project/app_documentation/database_tables.md

-- ============================================
-- job_matches table
-- ============================================
CREATE TABLE IF NOT EXISTS public.job_matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    score INTEGER,
    reasoning TEXT,
    matching_points TEXT[],
    concerns TEXT[],
    status TEXT DEFAULT 'fresh',
    evaluated_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    is_discarded BOOLEAN DEFAULT false,
    is_matched BOOLEAN DEFAULT false,
    UNIQUE(job_id, user_id)
);

-- Create indexes for faster lookups
CREATE INDEX idx_job_matches_job_id ON public.job_matches(job_id);
CREATE INDEX idx_job_matches_user_id ON public.job_matches(user_id);
CREATE INDEX idx_job_matches_status ON public.job_matches(status);
CREATE INDEX idx_job_matches_is_matched ON public.job_matches(is_matched);
CREATE INDEX idx_job_matches_is_discarded ON public.job_matches(is_discarded);
CREATE INDEX idx_job_matches_evaluated_at ON public.job_matches(evaluated_at);

-- Enable Row Level Security
ALTER TABLE public.job_matches ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own job matches"
    ON public.job_matches
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own job matches"
    ON public.job_matches
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own job matches"
    ON public.job_matches
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own job matches"
    ON public.job_matches
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
CREATE TRIGGER update_job_matches_updated_at
    BEFORE UPDATE ON public.job_matches
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();
