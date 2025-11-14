-- Make score and evaluated_at nullable in job_matches table
-- Reference: /Users/maximeboiraud/CascadeProjects/windsurf-project/app_documentation/database_tables.md
-- Reason: Job matches are created first as placeholders, then populated with score/evaluation later

-- Remove NOT NULL constraint from score
ALTER TABLE public.job_matches
ALTER COLUMN score DROP NOT NULL;

-- Remove NOT NULL constraint from evaluated_at
ALTER TABLE public.job_matches
ALTER COLUMN evaluated_at DROP NOT NULL;

-- Add comments to document the workflow
COMMENT ON COLUMN public.job_matches.score IS 'Match score 1-10 (NULL when match is created as placeholder, populated after AI evaluation)';
COMMENT ON COLUMN public.job_matches.evaluated_at IS 'When AI evaluated this match (NULL when match is created as placeholder, populated after AI evaluation)';
