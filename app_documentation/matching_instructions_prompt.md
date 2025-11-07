# Matching Instructions Generator Prompt

This document contains the prompt template used by the AI Matching Instructions Generator (Phase 4.6) to convert user search criteria into structured matching guidelines that will guide the job matching algorithm.

## Overview

The matching instructions prompt takes the user's search preferences (job titles, industries, locations, salary expectations, work model preferences, etc.) and their professional profile and generates a detailed set of scoring rules and evaluation criteria. This output becomes the `matching_instructions` field stored in the database.

## Prompt Template

The prompt is generated dynamically by the system, inserting user-specific data into this template:

```
MATCHING INSTRUCTIONS FOR THIS CANDIDATE
=========================================

CANDIDATE PROFILE
=================
Name: [USER_FULL_NAME]
Current/Most Recent Role: [MOST_RECENT_JOB_TITLE]
Years of Experience: [YEARS_TOTAL_EXPERIENCE]
Key Skills: [TOP_5_SKILLS_FROM_PROFILE]
Background Summary: [USER_PROFESSIONAL_SUMMARY]

TARGET ROLE CRITERIA
====================
Ideal Job Titles: [TARGET_JOB_TITLES - comma separated list]
Preferred Industries: [INDUSTRIES - comma separated list]
Desired Seniority Levels: [SENIORITY_LEVELS - comma separated list]
Target Locations: [PREFERRED_LOCATIONS - comma separated list]
Work Model Preferences: [WORK_MODELS - comma separated list with preference order]
Salary Range: [SALARY_MIN] - [SALARY_MAX] [CURRENCY] per year
Contract Types Accepted: [CONTRACT_TYPES - comma separated list]

ROLE DEFINITION & CONTEXT
=========================
Ideal Role Description:
[IDEAL_ROLE_DESCRIPTION_TEXT]

Must-Have Requirements (Non-Negotiable):
[MUST_HAVES_TEXT]

Deal-Breakers (What to Avoid):
[DEAL_BREAKERS_TEXT]

SCORING FRAMEWORK
=================

SCORE 9-10: Exceptional Match
----------------------------
All of the following must be true:
- Job title is in or closely aligns with: [TARGET_JOB_TITLES]
- Industry is in preferred list: [INDUSTRIES]
- Located in: [PREFERRED_LOCATIONS] OR matches work model preference [WORK_MODELS]
- Salary range [SALARY_MIN-MAX CURRENCY] compatible with job posting
- Contract type matches: [CONTRACT_TYPES]
- Seniority level matches: [SENIORITY_LEVELS]
- Job responsibilities align with ideal role description
- All must-have requirements are present
- None of the deal-breakers are present
- Company/role demonstrates strategic value to candidate

Hard Requirements for 9-10:
[GENERATED_MUST_HAVES_CONTEXT]

SCORE 7-8: Good Match
---------------------
Most of the following are true:
- Job title is related to target roles (minor variation acceptable)
- Industry is in preferred list OR closely related industry
- Location/work model acceptable (minor mismatch on one dimension acceptable)
- Salary range overlaps with expectations (within 15% variance)
- Contract type matches primary preference
- Seniority level matches or is one level above
- Job responsibilities overlap significantly with ideal role
- Most must-have requirements are present
- At most one deal-breaker present if non-critical
- Role offers some strategic value or growth opportunity

SCORE 5-6: Partial Match
------------------------
Significant misalignment but some relevant elements:
- Job title has relevant keywords but different scope
- Industry matches but company context differs (e.g., size, stage)
- Location/work model has single significant mismatch
- Salary range has notable gap (15-30% variance)
- Contract type is acceptable but not preferred
- Seniority level is below ideal (1-2 levels junior) OR overly senior
- Job responsibilities partially overlap with ideal role
- Some must-have requirements present, but key ones missing
- One or more deal-breakers present but not critical
- Role lacks strategic component but has learning value

SCORE 3-4: Weak Match
---------------------
Mostly misaligned but with some relevance:
- Job title uses similar language but different function/context
- Industry different from preferences
- Location/work model has multiple mismatches
- Salary range significantly below expectations (>30% gap)
- Contract type not preferred
- Seniority level substantially mismatched (3+ levels different)
- Job responsibilities marginally related to ideal role
- Few must-have requirements present
- Multiple deal-breakers present
- Role requires significant pivoting from candidate's background

SCORE 1-2: No Match
-------------------
Fundamentally misaligned:
- Job title completely unrelated to target roles
- Industry completely different from preferences
- Work model/location incompatible with requirements
- Salary vastly below acceptable range
- Contract type unacceptable
- Seniority level inappropriate (e.g., role too junior for experience level)
- Job responsibilities unrelated to ideal role
- Missing most/all must-have requirements
- Multiple critical deal-breakers present
- Role is outside candidate's professional area

EVALUATION GUIDELINES
====================

Priority Dimensions (In Order of Importance):
1. Must-Have Requirements: Non-negotiable elements that must align
2. Job Title & Function: Role must match or closely relate to target titles
3. Industry Context: Preferred industries strongly weighted
4. Seniority & Experience Level: Must be appropriate for candidate's background
5. Location & Work Model: Important but can have flexibility depending on role appeal
6. Salary Range: Important constraint but secondary to role fit
7. Company Context: Growth stage, size, mission alignment provide bonus/penalty

Green Flags (Positive Indicators):
- [GENERATED_FROM_IDEAL_ROLE_DESCRIPTION]
- [GENERATED_FROM_MUST_HAVES]
- Company in growth phase (Series B+, or scaling profitable startup)
- Mentions cross-functional collaboration
- Shows clear learning/growth opportunities
- Strategic scope (not purely execution-focused)
- Team leadership or mentor opportunities
- Impact/outcome-focused role

Red Flags (Negative Indicators):
- [GENERATED_FROM_DEAL_BREAKERS]
- Highly reactive/operational without strategic component
- Role appears to be a significant step backward in seniority
- Work model incompatible with no flexibility mentioned
- Heavy emphasis on sales targets or commercial metrics (unless aligned with candidate role)
- Significant location requirement incompatible with preferences
- Company in financial distress or uncertain stage
- Role appears siloed without collaboration

Context-Dependent Scoring Rules
================================
- If candidate prioritizes work-life balance (indicated in deal-breakers), high travel requirements or on-site mandate reduce score by 1-2 points
- If candidate has startup experience and now seeks corporate structure, apply +1 bonus for established companies with clear processes
- If candidate has corporate background and seeks startup energy, apply +1 bonus for early-stage/Series A-B companies with dynamic environment language
- Geographic preference: Score reduction of 1-2 points if location mismatch, unless fully remote or candidate indicated flexibility
- Salary variance: For each 10% salary gap below minimum, reduce score by 0.5 points; above maximum is acceptable unless deal-breaker mentions ceiling

APPLYING THESE INSTRUCTIONS
============================
When evaluating a job posting against this candidate:
1. First, check if any HARD DEAL-BREAKERS are present → if yes, automatic score 1-3
2. Then, verify the job title and primary function align with target roles
3. Assess how many must-have requirements are met
4. Evaluate location, work model, and salary compatibility
5. Consider company context and green flags/red flags
6. Assign score within appropriate range (9-10, 7-8, 5-6, 3-4, or 1-2)
7. Provide reasoning explaining which factors influenced the score
8. List 2-3 matching points (why this is a good fit)
9. List 1-3 potential concerns (if any)
10. Include brief AI reasoning explaining the decision

SPECIAL CASES
=============
- If job description is vague or minimal, score conservatively (tendency toward lower range)
- If multiple requirements are missing but all soft requirements met, cap score at 7
- If candidate is overqualified (5+ levels above role), score can still be 8-9 if other factors align (strategic value, company appeal)
- If role is significantly junior but in perfect industry/company, score range 6-7 (learning opportunity)
- If role perfectly matches but has one critical deal-breaker, score 4-5 range (not recommended)
```

## Implementation Notes

### Dynamic Template Insertion
The function generates this prompt by:
1. Extracting user profile data (name, experience, skills, summary)
2. Extracting search criteria fields (job titles, industries, locations, salary, work models, contract types, seniority levels)
3. Inserting the ideal role description, must-haves, and deal-breakers from search criteria text areas
4. Auto-generating additional context based on the inserted data

### Variable Interpolation
Variables marked with `[BRACKETS]` are automatically populated:
- `[USER_FULL_NAME]` → from user_profiles.full_name
- `[MOST_RECENT_JOB_TITLE]` → from user_experiences (ordered by end_date DESC LIMIT 1)
- `[YEARS_TOTAL_EXPERIENCE]` → calculated from user_experiences
- `[TOP_5_SKILLS_FROM_PROFILE]` → from user_skills (ordered by proficiency_level DESC LIMIT 5)
- `[TARGET_JOB_TITLES]` → from search_criteria.target_job_titles (array)
- `[INDUSTRIES]` → from search_criteria.industries (array)
- `[SENIORITY_LEVELS]` → from search_criteria.seniority_levels (array)
- `[PREFERRED_LOCATIONS]` → from search_criteria.preferred_locations (array)
- `[WORK_MODELS]` → from search_criteria.work_models (array, ordered by preference)
- `[SALARY_MIN-MAX CURRENCY]` → from search_criteria (salary_min, salary_max, salary_currency)
- `[CONTRACT_TYPES]` → from search_criteria.contract_types (array)
- `[IDEAL_ROLE_DESCRIPTION_TEXT]` → from search_criteria.ideal_role_description (text area)
- `[MUST_HAVES_TEXT]` → from search_criteria.must_haves (text area)
- `[DEAL_BREAKERS_TEXT]` → from search_criteria.deal_breakers (text area)

### Enhanced Context Generation
For sections marked with `[GENERATED_...]`, the system should intelligently synthesize content:
- `[GENERATED_MUST_HAVES_CONTEXT]` → Extract and expand on specific must-haves (e.g., if must-haves mention "cross-functional collaboration", add "Looking for: active collaboration across Product, Sales, Marketing, or Engineering")
- `[GENERATED_FROM_IDEAL_ROLE_DESCRIPTION]` → Extract key themes from ideal role description and convert to bullet points
- `[GENERATED_FROM_DEAL_BREAKERS]` → Convert deal-breaker text into specific red flags to watch for

## Example Usage

See `/app_documentation/matching_instructions_examples.md` for real-world examples of generated matching instructions.

## Refinement and Iteration

This prompt template is designed to be:
- **Flexible**: Works for candidates across different backgrounds, industries, and role types
- **Contextual**: Automatically adapts based on candidate profile and search criteria
- **Comprehensive**: Covers scoring, guidelines, special cases, and evaluation methodology
- **Maintainable**: Clear structure allows for future updates to scoring rules or priority dimensions

If you notice the generated instructions are:
- Too restrictive or too lenient
- Missing important evaluation factors for your industry
- Using inconsistent scoring across similar roles

Update the relevant section of this template and regenerate matching instructions for all users.
