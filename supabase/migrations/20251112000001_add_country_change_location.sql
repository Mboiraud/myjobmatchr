-- Add country field and change preferred_locations to preferred_city
-- Reference: /Users/maximeboiraud/CascadeProjects/windsurf-project/app_documentation/database_tables.md

-- Add country field (stores ISO 3166-1 alpha-2 codes like 'FR', 'US', 'DE')
ALTER TABLE public.search_criteria
ADD COLUMN country TEXT;

-- Add comment to document the expected format
COMMENT ON COLUMN public.search_criteria.country IS 'ISO 3166-1 alpha-2 country code (e.g., FR, US, DE)';

-- Rename and convert preferred_locations array to preferred_city single text field
-- First, add the new column
ALTER TABLE public.search_criteria
ADD COLUMN preferred_city TEXT;

-- Set preferred_city to NULL for all existing records (as requested)
-- This is the default behavior, so no UPDATE needed

-- Drop the old preferred_locations column
ALTER TABLE public.search_criteria
DROP COLUMN preferred_locations;

-- Add comment to document the field
COMMENT ON COLUMN public.search_criteria.preferred_city IS 'Single city name for preferred job location';
