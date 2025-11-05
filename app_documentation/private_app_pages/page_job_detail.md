# Page: 💼 Job Detail

## Header Section
* Job Title (large, prominent)
* Company Name (with logo if available)
* Status Badge (To Apply | Applied | Interview | Offer | Closed)
* Match Score (visual indicator - e.g., 85% with color coding)
* Primary Action Button (context-aware based on status)

---

## 📄 Job Overview

**Short Job Description**

**Key Responsibilities** (if available from job posting)
* List of main responsibilities

**Requirements** (extracted/structured)
* List of job requirements

**Job Details:**
* **Salary Range:** [salary_min - salary_max salary_currency / salary_period]
* **Location:** [location]
* **Work Model:** [work_model: Remote/Hybrid/On-site]
* **Contract Type:** [contract_type: Full-time/Part-time/Contract/Freelance/Internship]
* **Employment Status:** [employment_status: Permanent/Fixed-term]
* **Experience Level:** [experience_level: Entry/Mid/Senior/Lead/Director/Executive]
* **Posted Date:** [posted_date]
* **Source:** [source_board] (Indeed/LinkedIn/Glassdoor/Company Website)

**Qualification Tags:**
* Chips/badges: "Senior Level", "Remote OK", "Startup", etc.

**Apply Link:**
* [Visit Application Page] button → opens [source_url] in new tab

---

## 🏢 About the Company

**Company Description:**
* [company.description] - what they do

**Company Details:**
* **Industry:** [company.industry]
* **Company Size:** [company.company_size: Startup/Small/Medium/Large/Enterprise]
* **Founded:** [company.founded_year]
* **Headquarters:** [company.headquarters_location]
* **Website:** [company.website] (link)

---

## 🎯 Match Analysis

**Overall Match Score:** [job_matches.score]/10

**Enhanced Match Breakdown:**

* ✅ **Skills Match** (8/10 required skills you have)
  * List of matching skills from user_skills vs job requirements
  
* ✅ **Salary** (within your range: $120-150k matches your $110-160k)
  * Comparison: job.salary_min-salary_max vs search_criteria.salary_min-salary_max
  
* ✅ **Location** (Remote - matches your preferences)
  * Comparison: job.location + job.work_model vs search_criteria.preferred_locations + work_models
  
* ⚠️ **Experience** (Asks for 7 years, you have 5)
  * Comparison: job.experience_level vs search_criteria.years_of_experience
  
* ✅ **Industry** (SaaS - your preferred industry)
  * Comparison: company.industry vs search_criteria.industries
  
* ✅ **Role Type** (Product Manager - matches your target roles)
  * Comparison: job.title vs search_criteria.target_job_titles

**Why It's a Match:**
* [job_matches.matching_points] - narrative bullets explaining the strong fit
* "Your 5 years of product management experience aligns with their focus on user-centric development"
* "Your background in B2B SaaS matches their product domain"

**⚠️ Potential Blockers:**
* [job_matches.concerns] - List of potential issues:
  * Skills gaps or missing requirements
  * Experience level mismatches
  * Location concerns
  * Any red flags from job description
* **Suggestions:** How to address these in your application

**AI Reasoning:**
* [job_matches.reasoning] - Full explanation of match evaluation

---

## 📝 Application Materials

**Date Applied:** [job_applications.date_applied] (if applicable, otherwise "Not yet applied")

**Cover Letter Section:**

If no cover letter exists:
* **"Generate Cover Letter"** button (Primary)
  * Uses AI to create personalized cover letter based on:
    * Job description
    * User profile (CV, experience, skills)
    * Match analysis
    * Search criteria preferences

If cover letter exists:
* Display: [job_applications.cover_letter]
* **Actions:**
  * **Edit** button (inline editing)
  * **Regenerate** button (create new version with AI)
  * **Download** button (as PDF or DOCX)
  * **Copy** button (copy to clipboard)
* **Version History:** (optional future feature)
  * Track multiple generated versions
  * Compare versions
  * Restore previous versions

---

## 🎤 Interview Preparation

**AI Interview Coach:**

* Chat interface with AI assistant
* Pre-loaded context:
  * Job details (title, description, requirements, company)
  * User profile (experience, skills, background)
  * Match analysis insights

**What the AI helps with:**
* Questions to anticipate (based on role and company)
* How to introduce yourself effectively
* Questions you should ask the interviewer
* How to address potential weaknesses or gaps
* Company research insights
* Role-specific scenarios to prepare for

**Quick Prompt Buttons:**
* "What questions might they ask me?"
* "How should I introduce myself?"
* "What should I ask them about the role?"
* "Help me prepare for technical questions"
* "What should I know about this company?"
* "How do I address [specific concern from blockers]?"

---

## 📝 Personal Notes

**Your Notes:**
* Free-text area for thoughts, reminders, impressions
* Rich text editing (bold, italic, lists, links)
* Auto-save functionality
* Multiple note entries with timestamps
* Each note from [application_notes.note_text]
* Display format:
  * [Date/Time] - [Note content]
  * Edit/Delete buttons per note

**Add Note Button:**
* Opens text editor
* "Add notes about this role, follow-ups, contacts, impressions, etc."
* Save creates new entry in application_notes table

---

## 📊 Application Tracking

**Current Status:** 
* Dropdown selector: [job_applications.status]
  * To Apply
  * Applied
  * Interview
  * Offer
  * Closed

**Key Dates:**
* **Added to tracker:** [job_applications.date_added]
* **Date applied:** [job_applications.date_applied] (editable date picker)

**Status History:**
* Timeline view showing status changes over time
* Automatic tracking when status is updated

---

## Quick Actions Bar

**Action Buttons:**
* **Move Status:** Dropdown to change application status
* **Archive Job:** Move to archived section (soft delete)
* **Flag for Review:** Move back to New Matches → Reviewing tab
* **Share Job:** Copy link to this job detail page
* **Delete:** Remove completely (confirmation modal)

