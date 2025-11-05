# Page: ⚙️ Settings

## Page Title

Settings

## Page Subtitle

Manage your account settings and preferences

---

## Section 1: Account Information

**Email Address:**

- Display current email (from auth.users.email)
- Read-only / managed through Supabase Auth
- Helper text: "Contact support to change your email address"

---

## Section 2: Security

**Password:**

- **Change Password** button
  - Triggers Supabase Auth password change flow

---

## Section 3: Notification Preferences

**Email Notifications:**

**New Job Matches:**

- Toggle: On / Off (from notification_preferences.email_new_matches)
- Helper text: "Get notified when we find new jobs that match your criteria"

**Application Updates:**

- Toggle: On / Off (from notification_preferences.email_application_updates)
- Helper text: "Reminders about applications you haven't followed up on"

---

## Section 4: Danger Zone

**Delete Account:**

- **Delete My Account** button (destructive styling)
- Opens confirmation modal with password confirmation
- Permanently deletes all user data

---

## Bottom Actions

**Save Changes Button** (Primary)

- "Save Settings"
- Updates notification_preferences table
