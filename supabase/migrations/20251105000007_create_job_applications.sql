-- Create job_applications and application_notes tables
-- Reference: /Users/maximeboiraud/CascadeProjects/windsurf-project/app_documentation/database_tables.md

-- ============================================
-- job_applications table
-- ============================================
CREATE TABLE IF NOT EXISTS public.job_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
    match_id UUID REFERENCES public.job_matches(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'to_apply',
    date_applied DATE,
    date_added TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, job_id)
);

-- Create indexes for faster lookups
CREATE INDEX idx_job_applications_user_id ON public.job_applications(user_id);
CREATE INDEX idx_job_applications_job_id ON public.job_applications(job_id);
CREATE INDEX idx_job_applications_match_id ON public.job_applications(match_id);
CREATE INDEX idx_job_applications_status ON public.job_applications(status);

-- Enable Row Level Security
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own job applications"
    ON public.job_applications
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own job applications"
    ON public.job_applications
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own job applications"
    ON public.job_applications
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own job applications"
    ON public.job_applications
    FOR DELETE
    USING (auth.uid() = user_id);

-- ============================================
-- application_notes table
-- ============================================
CREATE TABLE IF NOT EXISTS public.application_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID NOT NULL REFERENCES public.job_applications(id) ON DELETE CASCADE,
    note_text TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for faster lookups
CREATE INDEX idx_application_notes_application_id ON public.application_notes(application_id);

-- Enable Row Level Security
ALTER TABLE public.application_notes ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (through application -> user_id relationship)
CREATE POLICY "Users can view own application notes"
    ON public.application_notes
    FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM public.job_applications
        WHERE id = application_id AND user_id = auth.uid()
    ));

CREATE POLICY "Users can insert own application notes"
    ON public.application_notes
    FOR INSERT
    WITH CHECK (EXISTS (
        SELECT 1 FROM public.job_applications
        WHERE id = application_id AND user_id = auth.uid()
    ));

CREATE POLICY "Users can update own application notes"
    ON public.application_notes
    FOR UPDATE
    USING (EXISTS (
        SELECT 1 FROM public.job_applications
        WHERE id = application_id AND user_id = auth.uid()
    ))
    WITH CHECK (EXISTS (
        SELECT 1 FROM public.job_applications
        WHERE id = application_id AND user_id = auth.uid()
    ));

CREATE POLICY "Users can delete own application notes"
    ON public.application_notes
    FOR DELETE
    USING (EXISTS (
        SELECT 1 FROM public.job_applications
        WHERE id = application_id AND user_id = auth.uid()
    ));

-- Ensure trigger function exists
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_job_applications_updated_at
    BEFORE UPDATE ON public.job_applications
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_application_notes_updated_at
    BEFORE UPDATE ON public.application_notes
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();
