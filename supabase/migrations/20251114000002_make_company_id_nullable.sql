-- Make company_id nullable in jobs table
-- Reference: /Users/maximeboiraud/CascadeProjects/windsurf-project/app_documentation/database_tables.md
-- Reason: Jobs are created first, then normalized to companies later

-- Remove NOT NULL constraint from company_id
ALTER TABLE public.jobs
ALTER COLUMN company_id DROP NOT NULL;

-- Add comment to document the workflow
COMMENT ON COLUMN public.jobs.company_id IS 'Links to company (NULL when job is first created, populated during company normalization)';
