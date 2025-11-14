-- Add country field to jobs table
-- Reference: /Users/maximeboiraud/CascadeProjects/windsurf-project/app_documentation/database_tables.md

-- Add country field (stores ISO 3166-1 alpha-2 codes like 'FR', 'US', 'DE')
ALTER TABLE public.jobs
ADD COLUMN country TEXT;

-- Add comment to document the expected format
COMMENT ON COLUMN public.jobs.country IS 'ISO 3166-1 alpha-2 country code (e.g., FR, US, DE)';
