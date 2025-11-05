-- Create user_experiences and user_skills tables
-- Reference: /Users/maximeboiraud/CascadeProjects/windsurf-project/app_documentation/database_tables.md

-- ============================================
-- user_experiences table
-- ============================================
CREATE TABLE IF NOT EXISTS public.user_experiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    company_name TEXT NOT NULL,
    job_title TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    is_current BOOLEAN DEFAULT false,
    description TEXT,
    location TEXT,
    employment_type TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on user_id for faster lookups
CREATE INDEX idx_user_experiences_user_id ON public.user_experiences(user_id);

-- Enable Row Level Security
ALTER TABLE public.user_experiences ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user_experiences
CREATE POLICY "Users can view own experiences"
    ON public.user_experiences
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own experiences"
    ON public.user_experiences
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own experiences"
    ON public.user_experiences
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own experiences"
    ON public.user_experiences
    FOR DELETE
    USING (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_user_experiences_updated_at
    BEFORE UPDATE ON public.user_experiences
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- user_skills table
-- ============================================
CREATE TABLE IF NOT EXISTS public.user_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    skill_name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, skill_name)
);

-- Create index on user_id for faster lookups
CREATE INDEX idx_user_skills_user_id ON public.user_skills(user_id);

-- Enable Row Level Security
ALTER TABLE public.user_skills ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user_skills
CREATE POLICY "Users can view own skills"
    ON public.user_skills
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own skills"
    ON public.user_skills
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own skills"
    ON public.user_skills
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own skills"
    ON public.user_skills
    FOR DELETE
    USING (auth.uid() = user_id);
