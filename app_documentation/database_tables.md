# MyJobMatchr Database Schema (Exact Text Format)

## 👤 User & Profile Tables

1.  `user_profiles`
    - `id (UUID, PK, FK → auth.users.id)` - Links to Supabase auth user
    - `first_name (TEXT)` - User's first name
    - `last_name (TEXT)` - User's last name
    - `phone_number (TEXT)` - Optional phone
    - `cv_file_url (TEXT)` - URL to CV in Supabase Storage
    - `cv_parsed_text (TEXT)` - Full parsed CV text for AI matching
    - `profile_completeness (INTEGER, 0-100)` - Progress indicator
    - `created_at (TIMESTAMP)` - Creation timestamp
    - `updated_at (TIMESTAMP)` - Last update timestamp
    - `last_manual_search_at (TIMESTAMP)` - Last manual update of search timestamp
    - Relations:
      - `id → auth.users.id (one-to-one)`

2.  `user_experiences`
    - `id (UUID, PK)` - Unique identifier
    - `user_id (UUID, FK → user_profiles.id, NOT NULL)` - Links to user_profiles
    - `company_name (TEXT, NOT NULL)` - Company name
    - `job_title (TEXT, NOT NULL)` - Job title/position
    - `start_date (DATE, NOT NULL)` - Start date
    - `end_date (DATE)` - End date (NULL if current job)
    - `is_current (BOOLEAN, DEFAULT false)` - Currently working here
    - `description (TEXT)` - Job description/responsibilities
    - `location (TEXT)` - Job location
    - `employment_type (TEXT)` - 'full-time', 'part-time', 'contract', 'internship'
    - `created_at (TIMESTAMP)` - Creation timestamp
    - `updated_at (TIMESTAMP)` - Last update timestamp
    - Relations:
      - `user_id → user_profiles.id (many-to-one)`

3.  `user_skills`
    - `id (UUID, PK)` - Unique identifier
    - `user_id (UUID, FK → user_profiles.id, NOT NULL)` - Links to user_profiles
    - `skill_name (TEXT, NOT NULL)` - Skill name (e.g., "Python", "Leadership")
    - `created_at (TIMESTAMP)` - Creation timestamp
    - Relations:
      - `user_id → user_profiles.id (many-to-one)`
    - Unique Constraint:
      - `(user_id, skill_name)` - Prevent duplicate skills for same user

---

## 🎯 Search & Preferences

4.  `search_criteria`
    - `id (UUID, PK)` - Unique identifier
    - `user_id (UUID, FK → user_profiles.id, NOT NULL, UNIQUE)` - Links to user_profiles (one-to-one)
    - `target_job_titles (TEXT[])` - Array of job titles
    - `industries (TEXT[])` - Preferred industries
    - `seniority_levels (TEXT[])` - Desired seniority
    - `years_of_experience (INTEGER)` - Total years of experience
    - `preferred_locations (TEXT[])` - Cities/regions
    - `work_models (TEXT[])` - 'remote', 'hybrid', 'onsite'
    - `willing_to_relocate (BOOLEAN, DEFAULT false)` - Open to relocation
    - `salary_min (INTEGER)` - Minimum acceptable salary per year
    - `salary_max (INTEGER)` - Maximum expected salary per year
    - `salary_currency (TEXT, DEFAULT 'EUR')` - Currency
    - `contract_types (TEXT[])` - Contract types
    - `ideal_role_description (TEXT)` - Perfect role description
    - `must_have_requirements (TEXT)` - Non-negotiables
    - `must_not_have_requirements (TEXT)` - Deal-breakers
    - `work_environment_preferences (TEXT)` - Company culture preferences
    - `important_keywords (TEXT[])` - Match signal keywords
    - `matching_instructions (TEXT, NOT NULL)` - AI-generated matching specification
    - `is_active (BOOLEAN, DEFAULT true)` - Active job search
    - `created_at (TIMESTAMP)` - Creation timestamp
    - `updated_at (TIMESTAMP)` - Last update timestamp
    - Relations:
      - `user_id → user_profiles.id (one-to-one)`
    - Unique Constraint:
      - `user_id` - One search criteria per user

---

## 💼 Jobs & Companies

5.  `companies`
    - `id (UUID, PK)` - Unique identifier
    - `name (TEXT, NOT NULL, UNIQUE)` - Normalized company name
    - `name_variations (TEXT[])` - Known variations (e.g., ['Google', 'Google Inc', 'Google LLC'])
    - `logo_url (TEXT)` - Company logo URL
    - `website (TEXT)` - Company website
    - `description (TEXT)` - Company description/pitch
    - `industry (TEXT)` - Industry/sector
    - `company_size (TEXT)` - 'startup', 'small', 'medium', 'large', 'enterprise'
    - `headquarters_location (TEXT)` - Main headquarters location
    - `founded_year (INTEGER)` - Year company was founded
    - `is_enriched (BOOLEAN, DEFAULT false)` - Whether we've enriched company data
    - `enriched_at (TIMESTAMP)` - When company data was last enriched
    - `created_at (TIMESTAMP)` - Creation timestamp
    - `updated_at (TIMESTAMP)` - Last update timestamp
    - Relations:
      - One company has many jobs (one-to-many)
    - Unique Constraint:
      - `name` - Prevent duplicate companies

6.  `jobs`
    - `id (UUID, PK)` - Unique identifier
    - `parent_job_id (UUID, FK → jobs.id, NULLABLE)` - Links to parent job (NULL = canonical job)
    - `is_canonical (BOOLEAN, DEFAULT false)` - True if this is the main job (not a duplicate)
    - `company_id (UUID, FK → companies.id, NOT NULL)` - Links to company
    - `company_name_raw (TEXT)` - Original company name from job board (for reconciliation)
    - `source_board (TEXT, NOT NULL)` - 'indeed', 'linkedin', 'glassdoor', 'company_website'
    - `source_url (TEXT, UNIQUE, NOT NULL)` - Job posting URL
    - `source_job_id (TEXT)` - Job board's internal ID
    - `title (TEXT, NOT NULL)` - Job title
    - `description_short (TEXT)` - Short summary of the job (2-3 sentences)
    - `description (TEXT)` - Full job description
    - `responsibilities (TEXT[])` - Key responsibilities (extracted/structured)
    - `requirements (TEXT[])` - Job requirements (extracted/structured)
    - `salary_min (INTEGER)` - Minimum salary
    - `salary_max (INTEGER)` - Maximum salary
    - `salary_currency (TEXT)` - 'EUR', 'USD', 'GBP', etc.
    - `salary_period (TEXT)` - 'year', 'month', 'hour'
    - `location (TEXT)` - Job location
    - `work_model (TEXT)` - 'remote', 'hybrid', 'onsite'
    - `contract_type (TEXT)` - 'full-time', 'part-time', 'contract', 'freelance', 'internship'
    - `employment_status (TEXT)` - 'permanent', 'fixed-term'
    - `experience_level (TEXT)` - 'entry', 'mid', 'senior', 'lead', 'director', 'executive'
    - `posted_date (DATE)` - When job was posted on job board
    - `scraped_at (TIMESTAMP)` - When we first found this job
    - `last_seen_at (TIMESTAMP)` - Last time we saw this job active on board
    - `is_active (BOOLEAN, DEFAULT true)` - Still available on job board
    - `created_at (TIMESTAMP)` - Creation timestamp
    - `updated_at (TIMESTAMP)` - Last update timestamp
    - `is_enriched (BOOLEAN, DEFAULT false)` - was the job enriched
    - `is_company_normalized (BOOLEAN, DEFAULT false)` - was the company normalized
    - `is_duplicate_checked (BOOLEAN, DEFAULT false)` - was the duplicate checked
    - Relations:
      - `parent_job_id → jobs.id` (self-reference, many-to-one)
      - `company_id → companies.id` (many-to-one)
    - Unique Constraint:
      - `source_url` - Each job board URL is unique

7.  `job_board_searches`
    - `id (UUID, PK)` - Unique identifier
    - `user_id (UUID, FK → user_profiles.id, NOT NULL)` - Links to user
    - `search_criteria_id (UUID, FK → search_criteria.id, NOT NULL)` - Links to search criteria
    - `job_board (TEXT, NOT NULL)` - 'indeed', 'linkedin', 'glassdoor', 'adzuna', etc.
    - `search_url (TEXT)` - Full URL to scrape
    - `search_params (JSONB)` - Job board specific parameters
    - `last_scraped_at (TIMESTAMP)` - Last time we scraped this search
    - `is_active (BOOLEAN, DEFAULT true)` - Enable/disable this board for this user
    - `created_at (TIMESTAMP)` - Creation timestamp
    - `updated_at (TIMESTAMP)` - Last update timestamp
    - Relations:
      - `user_id → user_profiles.id` (many-to-one)
      - `search_criteria_id → search_criteria.id` (many-to-one)
    - Notes:
      - When user updates search_criteria, regenerate all job_board_searches for that user
      - `search_params` example: `{"query": "Product Manager", "location": "Lyon", "salary_min": 50000, "remote": true}`

---

## 🤖 AI Matching

8.  `job_matches`
    - `id (UUID, PK)` - Unique identifier
    - `job_id (UUID, FK → jobs.id, NOT NULL)` - Links to job (canonical job)
    - `user_id (UUID, FK → user_profiles.id, NOT NULL)` - Links to user
    - `score (INTEGER, NOT NULL)` - Match score (1-10)
    - `reasoning (TEXT)` - Why this job matches/doesn't match
    - `matching_points (TEXT[])` - Positive matching points
    - `concerns (TEXT[])` - Potential concerns or blockers
    - `status (TEXT, DEFAULT 'fresh')` - 'fresh', 'reviewing', 'accepted', 'discarded'
    - `evaluated_at (TIMESTAMP, NOT NULL)` - When AI evaluated this match
    - `created_at (TIMESTAMP)` - Creation timestamp
    - `updated_at (TIMESTAMP)` - Last update timestamp
    - `is_discarded (BOOLEAN, DEFAULT false)` - was the match discarded by pre-filter
    - `is_matched (BOOLEAN, DEFAULT false)` - was the match score calculated by AI
    - Relations:
      - `job_id → jobs.id` (many-to-one) - Always links to canonical job
      - `user_id → user_profiles.id` (many-to-one)
    - Unique Constraint:
      - `(job_id, user_id)` - One evaluation per job per user
    - Notes:
      - `Status` tracks user's review: fresh (unreviewed) → reviewing (flagged) → accepted (moved to applications) or discarded
      - `job_id` always references canonical job, never duplicates

---

## 📋 Application Management

9.  `job_applications`
    - `id (UUID, PK)` - Unique identifier
    - `user_id (UUID, FK → user_profiles.id, NOT NULL)` - Links to user
    - `job_id (UUID, FK → jobs.id, NOT NULL)` - Links to job (canonical job)
    - `match_id (UUID, FK → job_matches.id, NULLABLE)` - Optional link to original match
    - `status (TEXT, NOT NULL, DEFAULT 'to_apply')` - 'to_apply', 'applied', 'interview', 'offer', 'closed'
    - `date_applied (DATE)` - When user applied
    - `date_added (TIMESTAMP, NOT NULL)` - When added to applications
    - `created_at (TIMESTAMP)` - Creation timestamp
    - `updated_at (TIMESTAMP)` - Last update timestamp
    - Relations:
      - `user_id → user_profiles.id` (many-to-one)
      - `job_id → jobs.id` (many-to-one) - Always canonical job
      - `match_id → job_matches.id` (many-to-one, optional) - NULL if manually added
    - Unique Constraint:
      - `(user_id, job_id)` - User can only track each job once
    - Notes:
      - `Status` represents kanban columns: To Apply → Applied → Interview → Offer → Closed
      - `match_id` is NULL when user manually adds a job (didn't come from AI matching)

10. `application_notes`
    - `id (UUID, PK)` - Unique identifier
    - `application_id (UUID, FK → job_applications.id, NOT NULL)` - Links to application
    - `note_text (TEXT, NOT NULL)` - Note content
    - `created_at (TIMESTAMP)` - Creation timestamp
    - `updated_at (TIMESTAMP)` - Last update timestamp
    - Relations:
      - `application_id → job_applications.id` (many-to-one)
    - Notes:
      - Users can add multiple notes over time for each application
      - Timestamps allow tracking progression of thoughts (e.g., "Added note after phone screen on Jan 5")

---

## 💰 Subscription & Billing

11. `subscriptions`
    - `id (UUID, PK)` - Unique identifier
    - `user_id (UUID, FK → user_profiles.id, NOT NULL, UNIQUE)` - Links to user (one-to-one)
    - `stripe_customer_id (TEXT, UNIQUE)` - Stripe customer ID
    - `stripe_subscription_id (TEXT, UNIQUE)` - Stripe subscription ID
    - `status (TEXT, NOT NULL, DEFAULT 'free')` - 'free', 'active', 'canceled', 'past_due', 'trialing', 'incomplete'
    - `plan (TEXT, DEFAULT 'free')` - 'free', 'premium'
    - `current_period_start (TIMESTAMP)` - Billing period start
    - `current_period_end (TIMESTAMP)` - Billing period end
    - `cancel_at_period_end (BOOLEAN, DEFAULT false)` - User cancelled but still has access until period ends
    - `canceled_at (TIMESTAMP)` - When subscription was cancelled
    - `created_at (TIMESTAMP)` - Creation timestamp
    - `updated_at (TIMESTAMP)` - Last update timestamp
    - Relations:
      - `user_id → user_profiles.id` (one-to-one)
    - Unique Constraints:
      - `user_id` - One subscription per user
      - `stripe_customer_id` - Unique Stripe customer
      - `stripe_subscription_id` - Unique Stripe subscription
    - Notes:
      - All users have a row (default status='free', plan='free')
      - Updated via Stripe webhooks
      - `cancel_at_period_end=true` means user cancelled but subscription is still active until `current_period_end`

12. `subscription_transactions`
    - `id (UUID, PK)` - Unique identifier
    - `subscription_id (UUID, FK → subscriptions.id, NOT NULL)` - Links to subscription
    - `stripe_invoice_id (TEXT, UNIQUE)` - Stripe invoice ID
    - `stripe_payment_intent_id (TEXT)` - Stripe payment intent ID
    - `amount (INTEGER, NOT NULL)` - Amount in cents
    - `currency (TEXT, NOT NULL)` - 'EUR', 'USD', etc.
    - `status (TEXT, NOT NULL)` - 'succeeded', 'failed', 'pending', 'refunded'
    - `description (TEXT)` - Transaction description
    - `invoice_url (TEXT)` - Link to Stripe invoice
    - `transaction_date (TIMESTAMP, NOT NULL)` - When transaction occurred
    - `created_at (TIMESTAMP)` - Creation timestamp
    - Relations:
      - `subscription_id → subscriptions.id` (many-to-one)
    - Unique Constraint:
      - `stripe_invoice_id` - Each Stripe invoice is unique
    - Notes:
      - Created via Stripe webhooks (`invoice.payment_succeeded`, `invoice.payment_failed`)
      - Used for payment history, receipt generation, and revenue analytics
      - `amount` stored in cents (e.g., €15.00 = 1500)

---

## 🔔 Notifications

13. `notification_preferences`
    - `id (UUID, PK)` - Unique identifier
    - `user_id (UUID, FK → user_profiles.id, NOT NULL, UNIQUE)` - Links to user (one-to-one)
    - `email_new_matches (BOOLEAN, DEFAULT true)` - Email for new job matches
    - `email_application_updates (BOOLEAN, DEFAULT true)` - Email for application reminders
    - `created_at (TIMESTAMP)` - Creation timestamp
    - `updated_at (TIMESTAMP)` - Last update timestamp
    - Relations:
      - `user_id → user_profiles.id` (one-to-one)
    - Unique Constraint:
      - `user_id` - One preference record per user
