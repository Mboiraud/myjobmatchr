-- Create search_criteria table
-- Reference: /Users/maximeboiraud/CascadeProjects/windsurf-project/app_documentation/database_tables.md

CREATE TABLE IF NOT EXISTS public.search_criteria (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    target_job_titles TEXT[],
    industries TEXT[],
    seniority_levels TEXT[],
    years_of_experience INTEGER,
    preferred_locations TEXT[],
    work_models TEXT[],
    willing_to_relocate BOOLEAN DEFAULT false,
    salary_min INTEGER,
    salary_max INTEGER,
    salary_currency TEXT DEFAULT 'EUR',
    contract_types TEXT[],
    ideal_role_description TEXT,
    must_have_requirements TEXT,
    must_not_have_requirements TEXT,
    work_environment_preferences TEXT,
    important_keywords TEXT[],
    matching_instructions TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on user_id for faster lookups
CREATE INDEX idx_search_criteria_user_id ON public.search_criteria(user_id);

-- Enable Row Level Security
ALTER TABLE public.search_criteria ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own search criteria"
    ON public.search_criteria
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own search criteria"
    ON public.search_criteria
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own search criteria"
    ON public.search_criteria
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own search criteria"
    ON public.search_criteria
    FOR DELETE
    USING (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_search_criteria_updated_at
    BEFORE UPDATE ON public.search_criteria
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();
