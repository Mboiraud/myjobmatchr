Roadmap

# Phase 0: Project Setup & Foundation

## [x] 0.1 Initial Setup

Set up Next.js project with TypeScript and Tailwind CSS. Create basic folder structure and initialize Git.

## [ ] 0.2 Development Tools & Code Quality

Install and configure ESLint and Prettier for consistent code formatting.

## [ ] 0.3 Environment Configuration

Create `.env.local` and `.env.example` files for environment variables.

## [ ] 0.4 Supabase Setup

Create Supabase project, install client libraries, and set up local connection. Create client utilities for browser and server-side usage.

## [ ] 0.5 Database Types Infrastructure

Generate TypeScript types from Supabase schema and set up automatic regeneration after schema changes.

## [ ] 0.6 Design System Setup

Define core design tokens (colors, typography, spacing, shadows, borders) in Tailwind config.

## [ ] 0.7 Base Component Library

Create reusable UI components (Button, Input, Card, Badge, Typography) following the design system.

## [ ] 0.8 Testing Infrastructure Setup

Install and configure Vitest and React Testing Library for unit and component testing.

## [ ] 0.9 Development Workflow Documentation

Document how to run the project locally and the development workflow in README.

—

# Phase 1: Database Schema Implementation

## [ ] 1.1 Core User Tables

Create `user_profiles` table with user information (name, phone, CV, profile completeness). Link to Supabase auth.users.

## [ ] 1.2 User Experience & Skills

Create `user_experiences` table for work history and `user_skills` table for skills. Both linked to user_profiles with proper foreign keys.

## [ ] 1.3 Search Preferences

Create `search_criteria` table to store user's job search preferences (titles, locations, salary, work model, role descriptions, must-haves, deal-breakers).

## [ ] 1.4 Companies & Jobs

Create `companies` table for normalized company data. Create `jobs` table for job postings with fields for basic info (title, description, salary, location) and relationship to companies. Include self-referencing foreign key for duplicate detection.

## [ ] 1.5 Job Board Searches

Create `job_board_searches` table to store pre-built search queries for each user. Each row represents one API call to execute. Includes search_params (JSONB) and last_scraped_at tracking.

## [ ] 1.6 Matching System

Create `job_matches` table to store AI evaluations of job-user fit. Includes score (1-10), reasoning, matching_points, concerns, and status tracking (fresh/reviewing/accepted/discarded).

## [ ] 1.7 Application Management

Create `job_applications` table for tracking application status (to_apply, applied, interview, offer, closed). Create `application_notes` table for user notes on each application.

## [ ] 1.8 Subscription & Billing

Create `subscriptions` table for Stripe integration (status, plan, billing period). Create `subscription_transactions` table for payment history.

## [ ] 1.9 Notifications

Create `notification_preferences` table for user email notification settings (new matches, application reminders).

## [ ] 1.10 Row Level Security (RLS)

Enable RLS on all tables and create policies ensuring users can only access their own data. Public read access for companies and jobs tables.

## [ ] 1.11 Database Triggers & Functions

Create `update_updated_at_column()` function and triggers. Create triggers to auto-create related rows on user signup (user_profiles → subscriptions → notification_preferences).

## [ ] 1.12 Database Migrations Setup

Create migrations folder structure and initial migration file with all schema. Document migration workflow for future changes.

—

# Phase 2: Authentication System

## [ ] 2.1 Public App Structure & Landing Page

Create basic landing page with header (logo, "Sign In" / "Get Started" buttons) and footer. Simple hero section explaining the app. This serves as the entry point to authentication.

## [ ] 2.2 Supabase Auth Setup

Enable email/password and Google OAuth authentication in Supabase dashboard. Configure email templates and redirect URLs.

## [ ] 2.3 Auth Helper Functions

Create server-side auth utilities for getting user session, signing up, signing in, signing out, and resetting password.

## [ ] 2.4 Auth UI Components

Create SignUpForm, SignInForm, and ResetPasswordForm components using design system. Include email/password fields and Google OAuth buttons.

## [ ] 2.5 Auth Pages

Create signup, signin, reset-password, and OAuth callback pages.

## [ ] 2.6 Email Verification Enforcement

Create email verification check page `/verify-email`. After signup or login, check if user's email is verified. If not verified: redirect to verification page showing "Please verify your email. Check your inbox for the verification link. Didn't receive it? Resend verification email." Include resend button. If verified: allow access to dashboard.

## [ ] 2.7 Auth Middleware

Create middleware to protect routes. Define public routes (signin, signup, landing, verify-email) and protected routes (dashboard, profile). Check email verification status - redirect unverified users to `/verify-email`. Redirect unauthenticated users to signin.

## [ ] 2.8 Test Signup Flow

Test complete signup flow end-to-end: form submission, email verification enforcement, email verification, automatic creation of user_profiles, subscriptions, and notification_preferences rows, access to dashboard.

—

# Phase 3: User Profile & Onboarding

## [ ] 3.1 Private App Layout & Navigation

Create private app layout with left sidebar navigation (logo, menu items: Job Matches, Applications, Profile, Search Criteria). Add user profile section at bottom with avatar, name, and dropdown menu (Settings, Plan, Logout). Apply to all `/app/dashboard/*` routes. Use design system components.

## [ ] 3.2 Profile API Routes

Create API routes for GET/PUT profile data, GET/POST/PUT/DELETE experiences, and GET/POST/DELETE skills. Add validation using Zod schemas.

## [ ] 3.3 Profile UI Components

Create ProfileForm for basic info, ExperienceList and ExperienceForm for work history, SkillsList and SkillsInput for skills management. All using design system components.

## [ ] 3.4 Profile Completeness Calculator

Calculate profile completeness score (0-100) based on filled fields. Update `user_profiles.profile_completeness` on every profile change.

## [ ] 3.5 Profile Page

Create profile page that displays completeness progress bar and renders all profile components (info, experiences, skills) with save functionality.

—

# Phase 4: Search Criteria & Preferences

## [ ] 4.1 Search Criteria API

Create API routes for GET/PUT search criteria with validation using Zod schemas. Ensure one row per user (upsert logic).

## [ ] 4.2 Search Criteria UI Components

Create input components for all search fields: job titles, industries, seniority, locations, work model, salary range, contract types, keywords, and text areas for ideal role description, must-haves, and deal-breakers.

## [ ] 4.3 Search Criteria Page

Create search criteria page that organizes all inputs into logical sections with proper spacing and design system consistency. Add save button that triggers API to update criteria. For Premium users: add big prominent toggle "Activate Daily Search" (controls search_criteria.is_active) showing status "Daily search is ACTIVE/INACTIVE". For all users: add "Run Search Now" button. For Premium: show "Last manual search: X ago" if exists. For Free: show "Free trial: Run your first search" or if last_manual_search_at exists, disable button with "You've used your free search. Upgrade to Premium."

## [ ] 4.4 Search Criteria Validation

Add client-side validation: ensure required fields are filled, salary_min < salary_max, at least one work_model selected. Show inline validation errors and disable save button if invalid. Before allowing "Run Search Now": validate profile completeness = 100% and all search criteria fields complete.

## [ ] 4.5 Search Criteria Modal

Create modal that opens when "Run Search Now" clicked: "Your search is running! We're finding jobs for you now. Results will appear in your Matches page in a few minutes." Auto-close after 3 seconds or allow user to close manually.

## [ ] 4.6 AI Matching Instructions Generator

Create function that uses Gemini to convert search_criteria fields into clear, structured matching instructions. This generates the text that will guide job matching later. Integrate into the save flow. Handle API errors gracefully.

## [ ] 4.7 Search Query Builder

Create function that converts search_criteria into multiple job_board_searches rows. Each row represents one JSearch API call with specific parameters (job title, location, remote, etc.). When user saves criteria, delete old job_board_searches and generate new ones.

## [ ] 4.8 Manual Search Trigger API

Create `/app/api/search/trigger-manual/route.ts` POST endpoint. Validate user is authenticated, profile completeness = 100%, all search criteria required fields filled, matching_instructions generated. Check eligibility: Premium users - last_manual_search_at is null OR > 24 hours ago. Free users - last_manual_search_at must be null. If eligible: update last_manual_search_at = NOW(), trigger Phase 6.4 (on-demand discovery), return success. If not eligible: return error with specific reason (profile incomplete, searched too recently, upgrade required).

—

# Phase 5: Job Aggregation System

## [ ] 5.1 JSearch API Setup

Create RapidAPI account, subscribe to JSearch API, and add API key to environment variables. Create API client wrapper for making JSearch calls.

## [ ] 5.2 `discoverJobsForSearch(searchId)` Function

Create function that takes a job_board_search ID, reads the search_params, calls JSearch API, and returns list of job URLs with basic data (title, company_name_raw, location, salary, etc.). Handles pagination to get multiple pages of results.

## [ ] 5.3 `checkUrlAndCreateMatch(url, userId, jobData)` Function

Create function that checks if a job URL already exists in database. If exists: update last_seen_at and is_active=true, then create job_match for the user (if doesn't exist) with score=NULL to mark it needs AI scoring later. If doesn't exist: insert minimal job row with is_enriched=false using jobData, then create job_match with score=NULL. Returns job_id.

## [ ] 5.4 `enrichJob(jobId)` Function

Create function that takes a job with is_enriched=false, calls Gemini to extract structured data (responsibilities, requirements, experience_level, work_model, contract_type, description_short), updates the job with enriched fields, and sets is_enriched=true. Handles API errors gracefully.

## [ ] 5.5 `normalizeCompany(jobId)` Function

Create function that takes a job with is_enriched=true but no company_id. Normalizes company_name_raw, checks if company exists in companies table (by name or name_variations), creates relationship via company_id. If company doesn't exist, creates new company row first.

## [ ] 5.6 `detectDuplicates(jobId)` Function

Create function that takes a job with company_id and is_enriched=true. Searches for similar jobs (same company, similar title, recent). If similar canonical job found: set parent_job_id and is_canonical=false. If no similar job found: set is_canonical=true and parent_job_id=NULL.

## [ ] 5.7 Manual Execution API Endpoints

Create API endpoints for manually triggering each function: `/api/admin/discover-jobs` (calls discoverJobsForSearch), `/api/admin/enrich-job` (calls enrichJob), `/api/admin/normalize-company` (calls normalizeCompany), `/api/admin/detect-duplicates` (calls detectDuplicates). These accept parameters (searchId, jobId, etc.) and return results. Useful for testing and manual processing.

—

# Phase 6: Job Discovery Orchestration

## [ ] 6.1 Inngest Setup

Install Inngest SDK, create Inngest account, add API key to environment variables. Set up Inngest client and configure Next.js API route for Inngest to communicate with the app.

## [ ] 6.2 Daily Discovery Inngest Function

Create Inngest function that runs daily (scheduled trigger). Query all users WHERE search_criteria.is_active = true AND subscriptions.plan = 'premium' AND subscriptions.status = 'active'. Fan out by triggering individual "process user discovery" jobs for each user (using `inngest.send()` in a loop). Inngest handles parallelization and rate limiting automatically.

## [ ] 6.3 Process User Discovery Function

Create Inngest function that processes one user's job discovery. Query that user's job_board_searches rows. For each search, call `discoverJobsForSearch(searchId)` which internally calls `checkUrlAndCreateMatch(url, userId, jobData)` for each URL found. Return summary of jobs discovered for this user.

## [ ] 6.4 On-Demand Discovery Trigger

Create ability to trigger discovery for a single user when they click "Run Search Now". Check user has premium subscription OR last_manual_search_at is null (free trial). Directly call the "process user discovery" function with specific user_id parameter.

—

# Phase 7: Job Enrichment Pipeline

## [ ] 7.1 Job Enrichment Inngest Function

Create Inngest function that runs every 10 minutes. Query jobs WHERE is_enriched = false LIMIT 50. For each job, call `enrichJob(jobId)` to extract structured data with Gemini and set is_enriched = true. Track and return summary of jobs enriched.

## [ ] 7.2 Company Normalization Inngest Function

Create Inngest function that runs every 10 minutes (offset by 5 minutes from enrichment). Query jobs WHERE is_enriched = true AND is_company_normalized = false LIMIT 50. For each job, call `normalizeCompany(jobId)` to find/create company and set company_id. Set is_company_normalized = true. Track and return summary.

## [ ] 7.3 Duplicate Detection Inngest Function

Create Inngest function that runs every 10 minutes. Query jobs WHERE is_company_normalized = true AND is_duplicate_checked = false LIMIT 50. For each job, call `detectDuplicates(jobId)` to determine if canonical or duplicate. Set is_duplicate_checked = true. Track and return summary.

—

# Phase 8: AI Matching System

## [ ] 8.1 Matching Prompt Engineering

Create Gemini prompt structure that takes user's matching_instructions (from search_criteria), user's CV summary and experiences, job details (title, description, responsibilities, requirements), and company info. Ask Gemini to output JSON with: score (1-10), reasoning, matching_points (array), and concerns (array).

## [ ] 8.2 `preFilterAndMatch(jobMatchId)` Function

Create function that takes a job_match ID. First runs pre-filter checks (salary range, location, work model, contract type). If fails any hard filter: set is_discarded=true and return. If passes: fetch user profile and job details, call Gemini with matching prompt, parse JSON response, update job_match with score, reasoning, matching_points, concerns. Set is_matched=true. Handles API errors gracefully.

## [ ] 8.3 Manual Execution API Endpoint

Create API endpoint `/api/admin/match-job` that calls `preFilterAndMatch(jobMatchId)`. Accepts job_match ID and returns match result. Useful for testing and manual processing.

## [ ] 8.4 Continuous Matching Inngest Function

Create Inngest function that runs every 15-30 minutes throughout the day. Query job_matches for users with premium subscription WHERE is_discarded = false AND is_matched = false LIMIT 100. For each match, call `preFilterAndMatch(jobMatchId)`. Add delay between AI calls for rate limiting. Return summary of matches processed. This ensures new jobs get matched as they become ready throughout the day.

## [ ] 8.5 On-Demand Matching Trigger

Create ability to trigger matching for a single user after their jobs are discovered and enriched. Check user has premium subscription first. Query that user's unmatched job_matches and process them immediately by calling `preFilterAndMatch(jobMatchId)` for each.

—

# Phase 9: Job Detail Page

## [ ] 9.1 Job API Routes

Create `/app/api/jobs/[id]/route.ts` for GET single job. Query job by ID with joins to companies table, job_matches (for current user), and job_applications (for current user). Validate user has access to this job (has match OR has application). Return 404 if job doesn't exist, 403 if user has no relationship with this job.

## [ ] 9.2 Job Header Component

Create JobHeader component displaying job title, company name with logo, location badge, work model badge, posted date, and salary range. Use design system components.

## [ ] 9.3 Job Overview Component

Create JobOverview component displaying short description and job details grid (salary, location, work model, contract type, employment status, experience level, posted date, source). Include "Apply" button linking to source_url. Use design system components.

## [ ] 9.4 Job Description Component

Create JobDescription component displaying full job description, key responsibilities list (if available), and requirements list (if available). Use design system components.

## [ ] 9.5 Company Info Component

Create CompanyInfo component displaying company description and details (industry, company size, founded year, headquarters, website link). Use design system components.

## [ ] 9.6 Match Analysis Component

Create MatchAnalysis component displaying overall match score, "Why It's a Match" section with matching_points, "Potential Concerns" section with concerns, AI reasoning (expandable), and enhanced match breakdown (skills, salary, location, experience, industry, role type comparisons). Include quick action buttons (Accept, Review Later, Discard). Use design system components.

## [ ] 9.7 Job Detail Page Layout

Create `/app/dashboard/jobs/[id]/page.tsx` that fetches job data with all joins, handles loading and error states, and renders all components (JobHeader, JobOverview, JobDescription, CompanyInfo, MatchAnalysis if match exists). Add proper spacing between sections. Add "Back" button to return to previous page.

## [ ] 9.8 Job Access Control

Create access control function that checks if user has job_match OR job_application for this job. Use in API route and page to prevent unauthorized access.

## [ ] 9.9 Navigation from Match Cards

Update MatchCard component to navigate to `/dashboard/jobs/[jobId]` when clicked. Ensure navigation works properly with quick action buttons (use stopPropagation).

—

# Phase 10: Job Matches Dashboard

## [ ] 10.1 Matches API Routes

Create `/app/api/matches/route.ts` for GET matches. Only return matches WHERE is_matched=true. Join with jobs table and filter WHERE jobs.is_canonical=true (exclude duplicate jobs). Support filtering by status (fresh, reviewing, accepted, discarded). Support sorting by score (desc) and evaluated_at (desc). Implement pagination (20 matches per page, cursor-based). Return total count for pagination controls. Join with jobs and companies tables for full data.

## [ ] 10.2 Match Card Component

Create MatchCard component displaying company logo, job title, company name, location badge, work model badge, match score with color coding, posted date, salary range, and top 2-3 matching_points as preview. Add quick action buttons: Accept (moves to applications), Review Later (changes status to 'reviewing'), Discard (changes status to 'discarded'). Add "View Details" button that navigates to `/dashboard/jobs/[jobId]`. Use design system components.

## [ ] 10.3 Matches Filter Component

Create MatchesFilter component with filter by status (tabs: All, Fresh, Reviewing, Discarded), filter by score range (slider: 1-10), filter by location (multi-select), and filter by work model (checkboxes: Remote, Hybrid, Onsite). Include Apply and Reset filters buttons. Use design system components.

## [ ] 10.4 Matches Page

Create `/app/dashboard/matches/page.tsx` with page title and subtitle. Display MatchesFilter component at top. Display grid of MatchCard components (responsive). Implement pagination controls (Previous/Next buttons, page numbers). Show match count per status in tabs. Show empty state if no matches with CTA to "Update Search Criteria". Add loading state. Ensure consistent spacing and handle errors gracefully.

## [ ] 10.5 Match Status Management API

Create `/app/api/matches/[id]/status/route.ts` for PATCH. Update match status (fresh → reviewing, accepted, discarded). When status → accepted: automatically create job_applications row with status='to_apply', set match_id to link back, set date_added to now. Return updated match.

## [ ] 10.6 Match Actions Implementation

In MatchCard component: add onClick handlers for Accept (call API, show success toast, remove from view or navigate to applications), Review Later (call API, show toast, update card), and Discard (show confirmation modal, call API, remove from view). In MatchAnalysis component on job detail page: same handlers for quick action buttons with appropriate UI feedback.

—

# Phase 11: Application Tracking System

## [ ] 11.1 Applications API Routes

Create `/app/api/applications/route.ts` for GET/POST applications. Support filtering by status (to_apply, applied, interview, offer, closed). Support sorting by date_added (desc). Support search by company name or job title. Support pagination (limit 30 per status/column). Join with jobs and companies for full data. POST endpoint to manually add job to applications. Validate user can't add same job twice (unique constraint on user_id + job_id).

## [ ] 11.2 Application Card Component

Create ApplicationCard component displaying company logo, job title, company name, location badge, work model badge, current status badge with color coding, match score (if available), salary range, date_applied (if applied), and date_added. Add drag-and-drop handle icon for kanban. Add "View Details" button that navigates to `/dashboard/jobs/[jobId]`. Use design system components.

## [ ] 11.3 Kanban Board Component

Create KanbanBoard component with 5 columns (To Apply, Applied, Interview, Offer, Closed). Display application count in each column header. Render ApplicationCard components in each column (initial load: 30 per column). Add "See More" button at bottom of each column to load next 30. Implement drag-and-drop between columns using react-beautiful-dnd. Add onDragEnd handler to update application status via API. Show loading state while updating. Show error toast if update fails and revert card position. Add empty state for empty columns. Make responsive (stack columns vertically on mobile). Use design system components.

## [ ] 11.4 Application Status Update API

Create `/app/api/applications/[id]/status/route.ts` for PATCH. Accept new status in request body. Validate status is one of allowed values. Update application status in database. If status changes to "applied", automatically set date_applied to today (if not already set). Return updated application.

## [ ] 11.5 Application Notes Components

Create NotesList component displaying all notes for an application with note text, timestamp, and edit/delete buttons. Show empty state if no notes. Create AddNoteForm component with textarea input, character counter, and "Add Note" button. Clear textarea after successful submission. Use design system components.

## [ ] 11.6 Application Notes API

Create `/app/api/applications/[id]/notes/route.ts` for GET/POST. GET returns all notes sorted by created_at DESC. POST creates new note, validates note_text is not empty and application belongs to current user. Create `/app/api/applications/[id]/notes/[noteId]/route.ts` for PATCH/DELETE to update or delete notes. Validate user owns the note.

## [ ] 11.7 Update Job Detail Page with Application Features

In `/app/dashboard/jobs/[id]/page.tsx`, add conditional rendering if job has an application. Display "Application Status" section with current status badge, dates (added, applied), and status dropdown to manually change status. Display "Application Notes" section with NotesList and AddNoteForm components. If job has no application and no match, show "Add to Applications" button.

## [ ] 11.8 Manual Job Addition Modal

Create AddJobModal component with form fields for job URL (required), job title (required), company name (required), location, salary, and work model. Show loading state while creating job. On success: close modal, show success toast, navigate to applications page. On error: show error message, allow user to retry. Use design system components.

## [ ] 11.9 Manual Job Addition API

Create `/app/api/applications/add-manual/route.ts` for POST. Accept job details in request body. Validate required fields (url, title, company_name). Check if job exists by source_url. If exists, get job_id. If doesn't exist, create new job entry with normalized company, set is_canonical=true, source_board='manual', is_active=true. Create job_application entry with status='to_apply', match_id=NULL (manually added), date_added=NOW(). Return created application with job details.

## [ ] 11.10 Applications Page

Create `/app/dashboard/applications/page.tsx` with page title and subtitle. Add search bar at top with debounced search (300ms delay). Add filters section (collapsible) with filter by company, date range, and match score range. Add "Add Job Manually" button in header that opens AddJobModal. Render KanbanBoard component with filtered applications. Show total count of applications. Show empty state if no applications with CTA buttons to "View Matches" and "Add Job Manually". Add loading state. Ensure consistent spacing and handle errors gracefully.

## [ ] 11.11 Application Delete API

Create `/app/api/applications/[id]/route.ts` for DELETE. Validate application belongs to current user. Delete all associated notes first (cascade). Delete application record. Return success response.

—

# Phase 12: Stripe Integration

## [ ] 12.1 Stripe Setup

Create Stripe account. Install Stripe library. Add Stripe secret key to `.env.local`. Create product in Stripe dashboard: "MyJobMatchr Premium". Create price: €15/month. Copy price ID to environment variables.

## [ ] 12.2 Checkout Session API

Create `/app/api/stripe/create-checkout-session/route.ts`. Create Stripe checkout session for current user. Set success_url to `/dashboard/plan?success=true`. Set cancel_url to `/dashboard/plan?canceled=true`. Include user_id in metadata. Return session ID and URL.

## [ ] 12.3 Pricing Page UI

Create `/app/pricing/page.tsx` using design system. Display free tier features: manual application tracking, kanban board, personal notes, unlimited job entries, application timeline tracking, 1 manual search (trial). Display premium tier features (€15/month): everything in Free + AI-powered job matching, automatic job aggregation, daily automatic searches + unlimited manual searches (1 per day), personalized match scores, priority support. Add "Upgrade to Premium" button. Use design system components.

## [ ] 12.4 Webhook Handler

Create `/app/api/stripe/webhook/route.ts`. Verify Stripe webhook signature. Handle `checkout.session.completed` event (create or update subscription). Handle `customer.subscription.updated` event (update subscription status). Handle `customer.subscription.deleted` event (set subscription to canceled). Handle `invoice.payment_succeeded` event (create transaction record). Handle `invoice.payment_failed` event (update status).

## [ ] 12.5 Webhook Configuration

Install Stripe CLI for local testing. Add webhook endpoint in Stripe dashboard. Set webhook URL: `https://yourdomain.com/api/stripe/webhook`. Add webhook signing secret to `.env.local`. Test webhooks locally using Stripe CLI.

## [ ] 12.6 Plan & Billing Page

Create `/app/dashboard/plan/page.tsx` using design system. Display current plan (Free/Premium) with status badge. Show billing period and next billing date for premium users. Display plan feature comparison (Free vs Premium). If free: show "Upgrade to Premium" button. If premium: show "Manage Subscription" button (Stripe portal) and "Cancel Subscription" button. Display billing history table from `subscription_transactions` (date, description, amount, status, invoice download link). Use Card and Badge components. Ensure consistent spacing.

## [ ] 12.7 Customer Portal

Create `/app/api/stripe/create-portal-session/route.ts`. Create Stripe billing portal session. Redirect user to Stripe portal. User can update payment method, view invoices, cancel subscription.

## [ ] 12.8 Feature Gating

Create `/lib/subscription/features.ts`. Function to check if user has premium subscription (status='active' AND plan='premium'). Free users can only access manual application tracking features. Free users can trigger manual search only if last_manual_search_at IS NULL. Premium users can trigger manual search if last_manual_search_at IS NULL OR > 24 hours ago. Show upgrade prompts in UI when free users try to access premium features (matches page after using free trial, search criteria activation toggle).

—

# Phase 13: Email Notifications

## [ ] 13.1 Resend Setup

Create Resend account. Install Resend library. Add Resend API key to `.env.local`. Verify domain in Resend dashboard. Create `/lib/email/client.ts` for Resend client.

## [ ] 13.2 Email Templates with React Email

Install React Email and components library. Create `/emails/WelcomeEmail.tsx` using design system colors. Design welcome email with branding. Create `/emails/NewMatchesEmail.tsx` using design system. Display top 3 new matches with scores. Use consistent design system throughout emails.

## [ ] 13.3 Email Sending Functions

Create `/lib/email/send-welcome.ts` function to send welcome email on signup. Create `/lib/email/send-matches-notification.ts` function to send new matches email. Check user's notification preferences first before sending.

## [ ] 13.4 Notification Preferences API

Create `/app/api/notifications/preferences/route.ts` for GET/PUT. Allow user to toggle email notifications on/off for new matches and application reminders.

## [ ] 13.5 Notification Preferences UI

Create `/app/dashboard/notifications/page.tsx` using design system. Toggle for "Email me about new matches". Toggle for "Email me about application reminders". Save button to update preferences. Use Card component for layout.

## [ ] 13.6 Supabase Auth Emails via Resend

Configure Supabase to use Resend SMTP. Go to Supabase → Auth → Email Templates. Set SMTP settings (Resend host, port, credentials). Test email verification flow and password reset flow.

## [ ] 13.7 Daily Email Notifications Function

Create Supabase Edge Function `/supabase/functions/send-daily-match-emails/index.ts`. Query users who have email_new_matches=true AND have new matches since yesterday (check job_matches.evaluated_at). For each user, get their top 5 matches (highest scores). Send email with NewMatchesEmail template. Track emails sent. Deploy function: `supabase functions deploy send-daily-match-emails`.

## [ ] 13.8 Schedule Daily Emails

Set up Supabase cron job to send daily match emails. Schedule: 9:00 AM daily. SQL cron configuration to call send-daily-match-emails function.

—

# Phase 14: End-to-End Testing

## [ ] 14.1 Playwright Setup

Install Playwright and configure playwright.config.ts. Create `/tests/e2e` directory structure. Set up test database for E2E tests. Create test data fixtures.

## [ ] 14.2 Authentication Flow Tests

Test complete signup flow (form → email verification → profile creation). Test signin flow (form → redirect to dashboard). Test password reset flow. Test protected route access (redirect when not authenticated). Test logout flow.

## [ ] 14.3 Onboarding Flow Tests

Test complete onboarding: signup → profile → CV upload → search criteria. Test that profile completeness updates correctly. Test that search criteria saves and generates job_board_searches rows.

## [ ] 14.4 Job Matching Flow Tests

Test that matches appear after jobs are discovered and matched. Test filtering matches by score and status. Test accepting a match (moves to applications). Test discarding a match. Test viewing match details.

## [ ] 14.5 Application Management Flow Tests

Test adding manual job to applications. Test moving application through kanban board (drag and drop). Test adding notes to application. Test application status updates. Test deleting application.

## [ ] 14.6 Subscription Flow Tests

Test upgrade flow: click upgrade → Stripe checkout → webhook → subscription updated. Test feature gating (free users blocked from premium features like matches page). Test customer portal access.

—

# Phase 15: Settings Page

## [ ] 15.1 Settings API Routes

Create `/app/api/settings/route.ts` for GET/PUT account settings. Create `/app/api/settings/password/route.ts` for password change (triggers Supabase Auth password change flow). Create `/app/api/settings/delete-account/route.ts` for account deletion (requires password confirmation).

## [ ] 15.2 Settings Page UI

Create `/app/dashboard/settings/page.tsx` using design system. Display account information section (email - read only). Display security section with "Change Password" button. Display notification preferences section (moved from Phase 13.5). Display danger zone section with "Delete My Account" button (destructive styling). Use Card components for each section. Add confirmation modals for destructive actions.

## [ ] 15.3 Account Deletion Flow

Create confirmation modal requiring password re-entry. On confirmation, delete user data in order: application_notes → job_applications → job_matches → job_board_searches → search_criteria → user_skills → user_experiences → subscription_transactions → subscriptions → notification_preferences → user_profiles. Finally delete auth.users entry. Show success message and redirect to landing page.
