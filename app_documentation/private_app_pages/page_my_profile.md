# Page: 👤 My Profile

## Page Title

My Profile

## Page Subtitle

Manage your professional information to help us find the best job matches for you

---

## Section 1: CV & Documents

**Your CV:**

- Upload CV button (if no CV uploaded)
- Current CV display (if uploaded):
  - File name
  - Upload date
  - File size
  - Preview button
  - Replace/Update CV button
  - Download CV button
  - Re-parse CV button (to update extracted text)
- Supported formats: PDF, DOC, DOCX (max 5MB)
- Helper text: "Upload your most recent CV. We'll automatically extract your experience and skills."

**Profile Completeness:**

- Progress bar showing completion percentage (0-100%)
- Status indicator: "Your profile is 85% complete"
- Missing items checklist:
  - ✓ CV uploaded
  - ✓ Experience added
  - ✓ Skills added
  - ☐ Search criteria defined
  - ✓ Contact information added

---

## Section 2: Work Experience

**Your Experience:**

Helper text:
"Review and edit the experience we've extracted from your CV. This helps us understand your background and match you with relevant opportunities."

**Each Experience Entry Shows:**

- Job title (from job_title)
- Company name (from company_name)
- Employment type (from employment_type: 'full-time', 'part-time', 'contract', 'internship')
- Start date - End date (from start_date, end_date)
  - Display "Present" if is_current = true
- Location (from location)
- Description/Responsibilities (from description)
- Edit button
- Delete button

**Add Experience Button** (Secondary)

- Opens modal/form to manually add experience
- Form fields:
  - Job title (required)
  - Company name (required)
  - Employment type (dropdown: full-time, part-time, contract, internship)
  - Start date (required)
  - End date (optional if "Currently working here" is checked)
  - Currently working here (checkbox, sets is_current)
  - Location (optional)
  - Description (optional, textarea)

**Last Updated:** [Date when CV was last uploaded/parsed]

---

## Section 3: Skills

**Your Skills:**

Helper text:
"These skills were extracted from your CV. Add or remove skills to ensure your profile accurately represents your expertise."

**Skills Display:**

- Tag/chip format for each skill (from skill_name)
- Remove (X) button on each skill tag
- Skills organized alphabetically or by frequency

**Add Skill:**

- Text input with autocomplete suggestions
- Add button [+]
- Helper text: "Add skills that are relevant to your target roles"
- Validation: Prevents duplicate skills (enforced by unique constraint on user_id + skill_name)

---

## Section 4: Contact Information

**Personal Information:**

**First Name:** (from first_name)

- Text input field
- Required field indicator

**Last Name:** (from last_name)

- Text input field
- Required field indicator

**Email:**

- Text input field (pre-filled from auth.users.email)
- Disabled/read-only (managed through Supabase Auth)
- Helper text: "To change your email, go to Settings"

**Phone Number:** (from phone_number)

- Text input field with country code selector
- Optional field
- Format helper: "+33 6 12 34 56 78"

---

## Bottom Actions

**Save Changes Button** (Primary, prominent)

- "Save Profile"
- Shows loading state when processing
- Updates updated_at timestamp
- Success message after save: "Profile updated successfully"

**Cancel Button** (Secondary)

- Discards unsaved changes
- Shows confirmation modal if changes exist: "You have unsaved changes. Are you sure you want to leave?"
