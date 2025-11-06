# Supabase Password Reset Fix

## Problem
Password reset was logging users in directly to the dashboard instead of showing the reset password form.

## Root Cause
The callback route (`/app/auth/callback/route.ts`) was not properly handling password reset flows when the `type=recovery` parameter was missing from the callback URL.

## Fixes Applied

### 1. Fixed Callback Route
Updated `/app/auth/callback/route.ts` to better handle password reset flows.

### 2. Fixed Reset Password Page
Updated `/app/auth/reset-password/page.tsx` to check for authenticated session instead of URL hash parameters.

### 3. Middleware Already Correct
The middleware already allows authenticated users to access `/auth/reset-password` (it only redirects from `/signin` and `/signup`).

## Required Supabase Configuration

### Check Your Email Template
1. Go to Supabase Dashboard → Authentication → Email Templates
2. Find the "Reset Password" template
3. Ensure the reset link includes `{{ .SiteURL }}/auth/callback?type=recovery` or similar

The default Supabase template should look like:
```html
<a href="{{ .SiteURL }}/auth/callback?type=recovery&token_hash={{ .TokenHash }}&next={{ .RedirectTo }}">Reset Password</a>
```

### Add Redirect URL to Allowed List
1. Go to Supabase Dashboard → Authentication → URL Configuration
2. Add `${YOUR_SITE_URL}/auth/callback` to the "Redirect URLs" list
3. Add `${YOUR_SITE_URL}/auth/reset-password` to the "Redirect URLs" list

## Testing the Flow

1. **Request Reset**: Go to `/reset-password` and enter your email
2. **Check Email**: You should receive an email with a reset link
3. **Click Link**: The link should redirect to `/auth/callback?type=recovery&code=...`
4. **Callback**: The callback route exchanges the code for a session and redirects to `/auth/reset-password`
5. **Reset Form**: You should see the reset password form (not the dashboard)
6. **Submit**: After submitting the new password, you'll be redirected to the dashboard

## If Still Not Working

If the `type=recovery` parameter is still missing from the callback URL, you have two options:

### Option A: Fix Your Email Template (Recommended)
Update your Supabase email template to include `type=recovery` in the callback URL.

### Option B: Use a Different Callback URL
Change the `resetPasswordForEmail` call to use a dedicated callback:

```typescript
const { error } = await supabase.auth.resetPasswordForEmail(email, {
  redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?type=recovery`,
});
```

Note: This explicitly adds `type=recovery` to the redirect URL, ensuring it's present even if the email template doesn't add it.
