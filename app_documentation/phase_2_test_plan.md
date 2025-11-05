# Phase 2.8: Authentication System - Comprehensive Test Plan

## Overview
This document outlines all test cases for the MyJobMatchr authentication system. Tests are organized by feature and include both positive (happy path) and negative (error handling) scenarios.

---

## Test Environment Setup

### Prerequisites:
- [ ] Development server running (`npm run dev`)
- [ ] Supabase project configured and running
- [ ] Email configured in Supabase (for signup confirmation)
- [ ] Google OAuth credentials configured (for OAuth testing)
- [ ] Test email address(es) available for signup tests
- [ ] Browser DevTools open for network inspection

### Test URLs:
- **Homepage:** http://localhost:3000
- **Signup:** http://localhost:3000/signup
- **Signin:** http://localhost:3000/signin
- **Password Reset:** http://localhost:3000/reset-password
- **Dashboard:** http://localhost:3000/app/dashboard

---

## 1. CLIENT-SIDE FORM VALIDATION TESTS

### 1.1 Signup Form Validation

#### Test 1.1.1: Empty Form Submission
- **Steps:**
  1. Navigate to /signup
  2. Leave all fields empty
  3. Click "Sign Up" button
- **Expected Result:** Error message: "Please fill in all fields"
- **Status:** [ ] Pass [ ] Fail [ ] Pending
- **Notes:** _________________

#### Test 1.1.2: Missing Email
- **Steps:**
  1. Navigate to /signup
  2. Leave email field empty
  3. Fill password: `TestPass123`
  4. Fill confirm password: `TestPass123`
  5. Click "Sign Up"
- **Expected Result:** Error message: "Please fill in all fields"
- **Status:** [ ] Pass [ ] Fail [ ] Pending
- **Notes:** _________________

#### Test 1.1.3: Missing Password
- **Steps:**
  1. Navigate to /signup
  2. Fill email: `test@example.com`
  3. Leave password empty
  4. Fill confirm password: `TestPass123`
  5. Click "Sign Up"
- **Expected Result:** Error message: "Please fill in all fields"
- **Status:** [ ] Pass [ ] Fail [ ] Pending
- **Notes:** _________________

#### Test 1.1.4: Passwords Don't Match
- **Steps:**
  1. Navigate to /signup
  2. Fill email: `test@example.com`
  3. Fill password: `TestPass123`
  4. Fill confirm password: `DifferentPass456`
  5. Click "Sign Up"
- **Expected Result:** Error message: "Passwords do not match"
- **Status:** [ ] Pass [ ] Fail [ ] Pending
- **Notes:** _________________

#### Test 1.1.5: Password Too Short (< 8 chars)
- **Steps:**
  1. Navigate to /signup
  2. Fill email: `test@example.com`
  3. Fill password: `short1`
  4. Fill confirm password: `short1`
  5. Click "Sign Up"
- **Expected Result:** Error message: "Password must be at least 8 characters"
- **Status:** [ ] Pass [ ] Fail [ ] Pending
- **Notes:** _________________

#### Test 1.1.6: Valid Input - All Fields Correct
- **Steps:**
  1. Navigate to /signup
  2. Fill email: `newuser_[timestamp]@example.com`
  3. Fill password: `ValidPassword123`
  4. Fill confirm password: `ValidPassword123`
  5. Click "Sign Up"
- **Expected Result:**
  - No validation errors
  - Button shows "Creating account..." (loading state)
  - Form submits to server
- **Status:** [ ] Pass [ ] Fail [ ] Pending
- **Notes:** _________________

---

### 1.2 Signin Form Validation

#### Test 1.2.1: Empty Form Submission
- **Steps:**
  1. Navigate to /signin
  2. Leave all fields empty
  3. Click "Sign In" button
- **Expected Result:** Error message: "Please fill in all fields"
- **Status:** [ ] Pass [ ] Fail [ ] Pending
- **Notes:** _________________

#### Test 1.2.2: Missing Email
- **Steps:**
  1. Navigate to /signin
  2. Leave email field empty
  3. Fill password: `ValidPassword123`
  4. Click "Sign In"
- **Expected Result:** Error message: "Please fill in all fields"
- **Status:** [ ] Pass [ ] Fail [ ] Pending
- **Notes:** _________________

#### Test 1.2.3: Missing Password
- **Steps:**
  1. Navigate to /signin
  2. Fill email: `test@example.com`
  3. Leave password empty
  4. Click "Sign In"
- **Expected Result:** Error message: "Please fill in all fields"
- **Status:** [ ] Pass [ ] Fail [ ] Pending
- **Notes:** _________________

#### Test 1.2.4: Valid Input - Correct Credentials
- **Steps:**
  1. Navigate to /signin
  2. Fill email: `[previously created test account]`
  3. Fill password: `[correct password]`
  4. Click "Sign In"
- **Expected Result:**
  - No validation errors
  - Button shows "Signing in..." (loading state)
  - Form submits to server
- **Status:** [ ] Pass [ ] Fail [ ] Pending
- **Notes:** _________________

---

### 1.3 Password Reset Form Validation

#### Test 1.3.1: Empty Email Field
- **Steps:**
  1. Navigate to /reset-password
  2. Leave email field empty
  3. Click "Send Reset Link"
- **Expected Result:** Error message: "Please enter your email address"
- **Status:** [ ] Pass [ ] Fail [ ] Pending
- **Notes:** _________________

#### Test 1.3.2: Valid Email Input
- **Steps:**
  1. Navigate to /reset-password
  2. Fill email: `test@example.com`
  3. Click "Send Reset Link"
- **Expected Result:**
  - No validation errors
  - Button shows "Sending..." (loading state)
  - Form submits to server
- **Status:** [ ] Pass [ ] Fail [ ] Pending
- **Notes:** _________________

---

## 2. SERVER-SIDE AUTHENTICATION TESTS

### 2.1 Signup Server Flow

#### Test 2.1.1: Successful Signup - New User
- **Steps:**
  1. Complete Test 1.1.6 (valid signup form)
  2. Wait for server response
- **Expected Result:**
  - Form shows success message: "Check your email"
  - Message says: "We've sent a confirmation link..."
  - Can click "Back to sign up" to reset form
  - Confirmation email sent to test inbox
- **Status:** [ ] Pass [ ] Fail [ ] Pending
- **Notes:** _________________

#### Test 2.1.2: Signup with Existing Email
- **Steps:**
  1. Navigate to /signup
  2. Use email from Test 2.1.1 (already registered)
  3. Fill password: `ValidPassword123`
  4. Fill confirm password: `ValidPassword123`
  5. Click "Sign Up"
- **Expected Result:**
  - Server returns error: "Email already registered" or similar
  - Error displayed in form
  - No confirmation email sent
- **Status:** [ ] Pass [ ] Fail [ ] Pending
- **Notes:** _________________

#### Test 2.1.3: Database - User Record Created
- **Steps:**
  1. Complete Test 2.1.1
  2. Check Supabase Auth dashboard for user
  3. Check `user_profiles` table for profile record
- **Expected Result:**
  - User appears in Supabase Auth
  - User marked as `email_confirmed: false` (until they confirm email)
  - User profile created in `user_profiles` table
- **Status:** [ ] Pass [ ] Fail [ ] Pending
- **Notes:** _________________

---

### 2.2 Email Verification Flow

#### Test 2.2.1: Email Confirmation Link Received
- **Steps:**
  1. Complete Test 2.1.1 (signup with confirmation email sent)
  2. Check test email inbox
  3. Look for email from MyJobMatchr
- **Expected Result:**
  - Email received with subject containing "confirm" or "verify"
  - Email contains clickable confirmation link
  - Link format: `http://localhost:3000/auth/callback?code=...`
- **Status:** [ ] Pass [ ] Fail [ ] Pending
- **Notes:** _________________

#### Test 2.2.2: Click Confirmation Link - Success
- **Steps:**
  1. Complete Test 2.2.1
  2. Click confirmation link in email
  3. Wait for redirect
- **Expected Result:**
  - Redirected to /auth/verify-email/success
  - Page shows: "Email Verified" with checkmark icon
  - Message: "Your email address has been successfully verified"
  - Button: "Go to Dashboard" (links to /app/dashboard)
  - User is now signed in
- **Status:** [ ] Pass [ ] Fail [ ] Pending
- **Notes:** _________________

#### Test 2.2.3: Expired Confirmation Link
- **Steps:**
  1. Wait 24+ hours after signup (or manually expire link in Supabase)
  2. Try to click the confirmation link
- **Expected Result:**
  - Redirected to /auth/verify-email/error
  - Page shows: "Verification Failed" with error icon
  - Error message: "This link may have expired or be invalid"
  - Options to: "Sign Up Again" or "Request New Verification Email"
- **Status:** [ ] Pass [ ] Fail [ ] Pending
- **Notes:** _________________

#### Test 2.2.4: Invalid Confirmation Code
- **Steps:**
  1. Navigate to: `http://localhost:3000/auth/callback?code=invalid_code_123`
  2. Wait for response
- **Expected Result:**
  - Redirected to /auth/verify-email/error
  - Error message displayed
  - No email confirmation occurs
- **Status:** [ ] Pass [ ] Fail [ ] Pending
- **Notes:** _________________

#### Test 2.2.5: Database - email_confirmed_at Updated
- **Steps:**
  1. Complete Test 2.2.2 (successful email confirmation)
  2. Check Supabase Auth for user record
- **Expected Result:**
  - User in Auth dashboard shows `email_confirmed: true`
  - `email_confirmed_at` timestamp is populated
- **Status:** [ ] Pass [ ] Fail [ ] Pending
- **Notes:** _________________

---

### 2.3 Signin Server Flow

#### Test 2.3.1: Signin with Correct Credentials
- **Steps:**
  1. Complete Test 2.2.2 (email verified account)
  2. Navigate to /signin
  3. Enter email and password from signup
  4. Click "Sign In"
- **Expected Result:**
  - Server validates credentials
  - Session created
  - Redirected to /app/dashboard
  - User is now authenticated
  - Dashboard shows user's email
- **Status:** [ ] Pass [ ] Fail [ ] Pending
- **Notes:** _________________

#### Test 2.3.2: Signin with Wrong Password
- **Steps:**
  1. Navigate to /signin
  2. Enter correct email, wrong password
  3. Click "Sign In"
- **Expected Result:**
  - Server rejects credentials
  - Error displayed: "Invalid credentials" or "Email or password is incorrect"
  - User remains on signin page
  - No session created
- **Status:** [ ] Pass [ ] Fail [ ] Pending
- **Notes:** _________________

#### Test 2.3.3: Signin with Non-Existent Email
- **Steps:**
  1. Navigate to /signin
  2. Enter non-existent email (e.g., `nonexistent@example.com`)
  3. Enter any password
  4. Click "Sign In"
- **Expected Result:**
  - Server rejects credentials
  - Error displayed: "Invalid credentials" or similar generic message
  - User remains on signin page
- **Status:** [ ] Pass [ ] Fail [ ] Pending
- **Notes:** _________________

#### Test 2.3.4: Signin with Unverified Email
- **Steps:**
  1. Create account (Test 2.1.1) but DON'T click confirmation link
  2. Navigate to /signin
  3. Enter email and password
  4. Click "Sign In"
- **Expected Result:**
  - Server allows signin (Supabase allows this)
  - User is signed in despite unverified email
  - Redirected to dashboard
- **Status:** [ ] Pass [ ] Fail [ ] Pending
- **Notes:** _________________

---

## 3. PASSWORD RESET FLOW TESTS

#### Test 3.1: Request Password Reset - Valid Email
- **Steps:**
  1. Navigate to /reset-password
  2. Enter email of existing account
  3. Click "Send Reset Link"
- **Expected Result:**
  - Form shows success: "Check your email"
  - Message: "We've sent a password reset link..."
  - Reset email sent to inbox
- **Status:** [ ] Pass [ ] Fail [ ] Pending
- **Notes:** _________________

#### Test 3.2: Request Password Reset - Non-Existent Email
- **Steps:**
  1. Navigate to /reset-password
  2. Enter non-existent email
  3. Click "Send Reset Link"
- **Expected Result:**
  - Form shows success message (don't reveal if email exists)
  - No email sent to non-existent address
- **Status:** [ ] Pass [ ] Fail [ ] Pending
- **Notes:** _________________

#### Test 3.3: Click Password Reset Link
- **Steps:**
  1. Complete Test 3.1
  2. Check email for reset link
  3. Click the link
- **Expected Result:**
  - Redirected to /auth/reset-password
  - Page shows: "Set Your New Password"
  - Two password fields: "New Password" and "Confirm Password"
  - User has valid reset token in session
- **Status:** [ ] Pass [ ] Fail [ ] Pending
- **Notes:** _________________

#### Test 3.4: Set New Password - Valid Input
- **Steps:**
  1. Complete Test 3.3
  2. Fill new password: `NewPassword456`
  3. Fill confirm password: `NewPassword456`
  4. Click "Reset Password"
- **Expected Result:**
  - Password updated in Supabase
  - Success message displayed
  - Link to "Back to sign in"
  - Can signin with new password
  - Old password no longer works
- **Status:** [ ] Pass [ ] Fail [ ] Pending
- **Notes:** _________________

#### Test 3.5: Set Password - Passwords Don't Match
- **Steps:**
  1. Complete Test 3.3
  2. Fill new password: `NewPassword456`
  3. Fill confirm password: `DifferentPassword789`
  4. Click "Reset Password"
- **Expected Result:**
  - Client-side validation error: "Passwords do not match"
  - No server call made
  - Password not updated
- **Status:** [ ] Pass [ ] Fail [ ] Pending
- **Notes:** _________________

#### Test 3.6: Set Password - Too Short
- **Steps:**
  1. Complete Test 3.3
  2. Fill new password: `short1`
  3. Fill confirm password: `short1`
  4. Click "Reset Password"
- **Expected Result:**
  - Client-side validation error: "Password must be at least 8 characters"
  - No server call made
  - Password not updated
- **Status:** [ ] Pass [ ] Fail [ ] Pending
- **Notes:** _________________

#### Test 3.7: Expired Password Reset Token
- **Steps:**
  1. Request password reset (Test 3.1)
  2. Wait 24+ hours before clicking link
  3. Click the reset link
- **Expected Result:**
  - Redirected to /auth/verify-email/error
  - Error message: "Invalid or Expired Link"
  - Options to request new reset link
- **Status:** [ ] Pass [ ] Fail [ ] Pending
- **Notes:** _________________

---

## 4. MIDDLEWARE & ROUTE PROTECTION TESTS

#### Test 4.1: Unauthenticated Access to /app/dashboard
- **Steps:**
  1. Close browser/clear cookies (logout)
  2. Navigate directly to http://localhost:3000/app/dashboard
- **Expected Result:**
  - Middleware detects no session
  - Automatically redirected to /signin
  - Cannot access dashboard without authentication
- **Status:** [ ] Pass [ ] Fail [ ] Pending
- **Notes:** _________________

#### Test 4.2: Authenticated Access to /app/dashboard
- **Steps:**
  1. Complete Test 2.3.1 (signed in)
  2. You should already be on dashboard
  3. Refresh the page
  4. Navigate away and back to /app/dashboard
- **Expected Result:**
  - Dashboard loads successfully
  - User email displayed
  - All dashboard content visible
  - Session persists across navigation
- **Status:** [ ] Pass [ ] Fail [ ] Pending
- **Notes:** _________________

#### Test 4.3: Authenticated User Access to /signin
- **Steps:**
  1. Complete Test 2.3.1 (signed in)
  2. Navigate to http://localhost:3000/signin
- **Expected Result:**
  - Middleware detects authenticated session
  - Automatically redirected to /app/dashboard
  - Cannot view signin page when already signed in
- **Status:** [ ] Pass [ ] Fail [ ] Pending
- **Notes:** _________________

#### Test 4.4: Authenticated User Access to /signup
- **Steps:**
  1. Complete Test 2.3.1 (signed in)
  2. Navigate to http://localhost:3000/signup
- **Expected Result:**
  - Middleware detects authenticated session
  - Automatically redirected to /app/dashboard
  - Cannot view signup page when already signed in
- **Status:** [ ] Pass [ ] Fail [ ] Pending
- **Notes:** _________________

#### Test 4.5: Sign Out Functionality
- **Steps:**
  1. Complete Test 2.3.1 (signed in on dashboard)
  2. Click "Sign Out" button
  3. Wait for redirect
- **Expected Result:**
  - Session destroyed
  - Redirected to home page (/)
  - Attempting to access /app/dashboard redirects to /signin
  - User is fully logged out
- **Status:** [ ] Pass [ ] Fail [ ] Pending
- **Notes:** _________________

---

## 5. OAUTH SIGNIN TESTS (Google)

#### Test 5.1: Google Signin Button Display
- **Steps:**
  1. Navigate to /signin
  2. Look for "Sign in with Google" button
- **Expected Result:**
  - "Sign in with Google" button visible
  - Button styled with primary variant
  - Button is clickable
- **Status:** [ ] Pass [ ] Fail [ ] Pending
- **Notes:** _________________

#### Test 5.2: Google Signin Flow - Success
- **Steps:**
  1. Navigate to /signin
  2. Click "Sign in with Google"
  3. Redirect to Google login (should pop up or redirect)
  4. Enter Google credentials
  5. Authorize application
- **Expected Result:**
  - Redirected back to /auth/callback
  - Session created with Google account
  - User signed in
  - Redirected to /app/dashboard
  - Google email shown on dashboard
- **Status:** [ ] Pass [ ] Fail [ ] Pending
- **Notes:** _________________

#### Test 5.3: Google Signin - Deny Permission
- **Steps:**
  1. Navigate to /signin
  2. Click "Sign in with Google"
  3. Click "Deny" or cancel Google login
- **Expected Result:**
  - Redirected to /signin with error parameter
  - Error message displayed: "Sign in cancelled" or similar
  - User not signed in
  - Remains on signin page
- **Status:** [ ] Pass [ ] Fail [ ] Pending
- **Notes:** _________________

#### Test 5.4: Google Signin - New Account
- **Steps:**
  1. Use new Google account (not previously used)
  2. Complete Test 5.2
- **Expected Result:**
  - New user created in Supabase Auth
  - User automatically signed in
  - No email verification required for OAuth
  - User profile created in `user_profiles` table
- **Status:** [ ] Pass [ ] Fail [ ] Pending
- **Notes:** _________________

#### Test 5.5: Google Signin - Existing Account
- **Steps:**
  1. Sign out from Test 5.2 (if still signed in)
  2. Use same Google account again
  3. Sign in with Google
- **Expected Result:**
  - Existing user recognized
  - Session created for same account
  - No duplicate user created
  - Signed into /app/dashboard
- **Status:** [ ] Pass [ ] Fail [ ] Pending
- **Notes:** _________________

---

## 6. BROWSER & SESSION PERSISTENCE TESTS

#### Test 6.1: Session Persists on Page Refresh
- **Steps:**
  1. Complete Test 2.3.1 (signed in)
  2. Refresh browser (F5 or Ctrl+R)
  3. Wait for page to load
- **Expected Result:**
  - Still on dashboard
  - User email still displayed
  - Session cookie/token persists
  - No need to sign in again
- **Status:** [ ] Pass [ ] Fail [ ] Pending
- **Notes:** _________________

#### Test 6.2: Session Persists on Tab Switch
- **Steps:**
  1. Complete Test 2.3.1 (signed in)
  2. Open new tab
  3. Navigate to http://localhost:3000/app/dashboard in new tab
- **Expected Result:**
  - Dashboard loads immediately
  - User already authenticated
  - Same session across tabs
  - Email displayed correctly
- **Status:** [ ] Pass [ ] Fail [ ] Pending
- **Notes:** _________________

#### Test 6.3: Session Lost After Browser Close (Cookies)
- **Steps:**
  1. Complete Test 2.3.1 (signed in)
  2. Close browser completely
  3. Reopen browser
  4. Navigate to /app/dashboard
- **Expected Result:**
  - Redirected to /signin (session lost)
  - Must sign in again
  - Cookies cleared
- **Status:** [ ] Pass [ ] Fail [ ] Pending
- **Notes:** _________________

---

## 7. ERROR HANDLING & EDGE CASES

#### Test 7.1: Network Error During Signup
- **Steps:**
  1. Open DevTools (F12)
  2. Go to Network tab
  3. Check "Offline" option in DevTools
  4. Navigate to /signup
  5. Fill valid form
  6. Click "Sign Up"
- **Expected Result:**
  - Network request fails
  - Loading state eventually times out or shows error
  - User sees error message: "Network error" or similar
  - Form remains on page for retry
- **Status:** [ ] Pass [ ] Fail [ ] Pending
- **Notes:** _________________

#### Test 7.2: Server Error Response (500)
- **Steps:**
  1. (Requires manual server error injection or using mock)
  2. Simulate server returning 500 error
  3. Submit signup form
- **Expected Result:**
  - Error message displayed
  - User informed of server issue
  - Form can be retried
- **Status:** [ ] Pass [ ] Fail [ ] Pending
- **Notes:** _________________

#### Test 7.3: XSS Prevention in Error Messages
- **Steps:**
  1. In signup form, try to enter HTML/script in email field
  2. Example: `test@example.com<script>alert('xss')</script>`
  3. Submit form
- **Expected Result:**
  - Script does not execute
  - Error message displayed safely (not as HTML)
  - Text is properly escaped
- **Status:** [ ] Pass [ ] Fail [ ] Pending
- **Notes:** _________________

---

## 8. PERFORMANCE & LOAD TESTS

#### Test 8.1: Form Response Time
- **Steps:**
  1. Open DevTools Network tab
  2. Navigate to /signup
  3. Fill valid form
  4. Submit and measure response time
- **Expected Result:**
  - Server responds within 3 seconds
  - Success message displayed quickly
  - No loading delays after success
- **Status:** [ ] Pass [ ] Fail [ ] Pending
- **Notes:** _________________

#### Test 8.2: Dashboard Load Time
- **Steps:**
  1. Sign in to dashboard
  2. Open DevTools Performance tab
  3. Measure page load time
- **Expected Result:**
  - Page loads in under 2 seconds
  - All elements render properly
  - No layout shift or flashing
- **Status:** [ ] Pass [ ] Fail [ ] Pending
- **Notes:** _________________

---

## Test Results Summary

### Total Tests: 62
- [ ] **Passed:** ___
- [ ] **Failed:** ___
- [ ] **Pending:** ___
- [ ] **Skipped:** ___

### Critical Issues Found:
1. _________________
2. _________________
3. _________________

### Non-Critical Issues:
1. _________________
2. _________________

### Recommendations:
- _________________
- _________________
- _________________

### Sign-Off:
- **Tested By:** _________________
- **Date:** _________________
- **Status:** [ ] Ready for Production [ ] Needs Fixes [ ] Under Review

---

## Notes & Observations

_____________________________________________________________________________

_____________________________________________________________________________

_____________________________________________________________________________
