-- Create companies and jobs tables
-- Reference: /Users/maximeboiraud/CascadeProjects/windsurf-project/app_documentation/database_tables.md

-- Ensure trigger function exists (created in migration 1, but we re-define with OR REPLACE for safety)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- companies table
-- ============================================
CREATE TABLE IF NOT EXISTS public.companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    name_variations TEXT[],
    logo_url TEXT,
    website TEXT,
    description TEXT,
    industry TEXT,
    company_size TEXT,
    headquarters_location TEXT,
    founded_year INTEGER,
    is_enriched BOOLEAN DEFAULT false,
    enriched_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on name for faster lookups
CREATE INDEX idx_companies_name ON public.companies(name);

-- Enable Row Level Security (public read access)
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

-- Public read access for companies
CREATE POLICY "Anyone can view companies"
    ON public.companies
    FOR SELECT
    USING (true);

-- Create trigger for updated_at
CREATE TRIGGER update_companies_updated_at
    BEFORE UPDATE ON public.companies
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- jobs table
-- ============================================
CREATE TABLE IF NOT EXISTS public.jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_job_id UUID REFERENCES public.jobs(id) ON DELETE SET NULL,
    is_canonical BOOLEAN DEFAULT false,
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    company_name_raw TEXT,
    source_board TEXT NOT NULL,
    source_url TEXT UNIQUE NOT NULL,
    source_job_id TEXT,
    title TEXT NOT NULL,
    description_short TEXT,
    description TEXT,
    responsibilities TEXT[],
    requirements TEXT[],
    salary_min INTEGER,
    salary_max INTEGER,
    salary_currency TEXT,
    salary_period TEXT,
    location TEXT,
    work_model TEXT,
    contract_type TEXT,
    employment_status TEXT,
    experience_level TEXT,
    posted_date DATE,
    scraped_at TIMESTAMPTZ,
    last_seen_at TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT true,
    is_enriched BOOLEAN DEFAULT false,
    is_company_normalized BOOLEAN DEFAULT false,
    is_duplicate_checked BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for faster lookups
CREATE INDEX idx_jobs_company_id ON public.jobs(company_id);
CREATE INDEX idx_jobs_parent_job_id ON public.jobs(parent_job_id);
CREATE INDEX idx_jobs_source_url ON public.jobs(source_url);
CREATE INDEX idx_jobs_is_canonical ON public.jobs(is_canonical);
CREATE INDEX idx_jobs_is_active ON public.jobs(is_active);

-- Enable Row Level Security (public read access)
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Public read access for jobs
CREATE POLICY "Anyone can view jobs"
    ON public.jobs
    FOR SELECT
    USING (true);

-- Create trigger for updated_at
CREATE TRIGGER update_jobs_updated_at
    BEFORE UPDATE ON public.jobs
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();
