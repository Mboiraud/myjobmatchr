# Row Level Security (RLS) Policies Summary

## Overview
This document outlines all RLS policies implemented across the MyJobMatchr database schema.

---

## RLS Policies by Table

### 1. user_profiles
**Access Model**: User-specific (each user can only access their own profile)

Policies:
- ✅ SELECT: Users can view own profile
- ✅ INSERT: Users can insert own profile
- ✅ UPDATE: Users can update own profile
- ✅ DELETE: Users can delete own profile

---

### 2. user_experiences
**Access Model**: User-specific (linked via user_id)

Policies:
- ✅ SELECT: Users can view own experiences
- ✅ INSERT: Users can insert own experiences
- ✅ UPDATE: Users can update own experiences
- ✅ DELETE: Users can delete own experiences

---

### 3. user_skills
**Access Model**: User-specific (linked via user_id)

Policies:
- ✅ SELECT: Users can view own skills
- ✅ INSERT: Users can insert own skills
- ✅ UPDATE: Users can update own skills
- ✅ DELETE: Users can delete own skills

---

### 4. search_criteria
**Access Model**: User-specific (one-to-one relationship)

Policies:
- ✅ SELECT: Users can view own search criteria
- ✅ INSERT: Users can insert own search criteria
- ✅ UPDATE: Users can update own search criteria
- ✅ DELETE: Users can delete own search criteria

---

### 5. companies
**Access Model**: Public read (anyone can view, no write access via RLS)

Policies:
- ✅ SELECT: Anyone can view companies
- ❌ INSERT: Not allowed via RLS (system only)
- ❌ UPDATE: Not allowed via RLS (system only)
- ❌ DELETE: Not allowed via RLS (system only)

---

### 6. jobs
**Access Model**: Public read (anyone can view, no write access via RLS)

Policies:
- ✅ SELECT: Anyone can view jobs
- ❌ INSERT: Not allowed via RLS (system only)
- ❌ UPDATE: Not allowed via RLS (system only)
- ❌ DELETE: Not allowed via RLS (system only)

---

### 7. job_board_searches
**Access Model**: User-specific (linked via user_id)

Policies:
- ✅ SELECT: Users can view own job board searches
- ✅ INSERT: Users can insert own job board searches
- ✅ UPDATE: Users can update own job board searches
- ✅ DELETE: Users can delete own job board searches

---

### 8. job_matches
**Access Model**: User-specific (linked via user_id)

Policies:
- ✅ SELECT: Users can view own job matches
- ✅ INSERT: Users can insert own job matches
- ✅ UPDATE: Users can update own job matches
- ✅ DELETE: Users can delete own job matches

---

### 9. job_applications
**Access Model**: User-specific (linked via user_id)

Policies:
- ✅ SELECT: Users can view own job applications
- ✅ INSERT: Users can insert own job applications
- ✅ UPDATE: Users can update own job applications
- ✅ DELETE: Users can delete own job applications

---

### 10. application_notes
**Access Model**: User-specific (linked through job_applications → user_id)

Policies:
- ✅ SELECT: Users can view own application notes (via EXISTS subquery)
- ✅ INSERT: Users can insert own application notes (via EXISTS subquery)
- ✅ UPDATE: Users can update own application notes (via EXISTS subquery)
- ✅ DELETE: Users can delete own application notes (via EXISTS subquery)

---

### 11. subscriptions
**Access Model**: User-specific (one-to-one relationship)

Policies:
- ✅ SELECT: Users can view own subscription
- ✅ UPDATE: Users can update own subscription
- ❌ INSERT: Not allowed via RLS (created via trigger)
- ❌ DELETE: Not allowed via RLS (cascade only)

---

### 12. subscription_transactions
**Access Model**: User-specific (linked through subscriptions → user_id)

Policies:
- ✅ SELECT: Users can view own subscription transactions (via EXISTS subquery)
- ❌ INSERT: Not allowed via RLS (created via webhook)
- ❌ UPDATE: Not allowed via RLS (audit trail)
- ❌ DELETE: Not allowed via RLS (audit trail)

---

### 13. notification_preferences
**Access Model**: User-specific (one-to-one relationship)

Policies:
- ✅ SELECT: Users can view own notification preferences
- ✅ UPDATE: Users can update own notification preferences
- ❌ INSERT: Not allowed via RLS (created via trigger)
- ❌ DELETE: Not allowed via RLS (cascade only)

---

## Summary Statistics

| Category | Count |
|----------|-------|
| User-Specific Tables | 9 |
| Public Read Tables | 2 |
| System-Managed Tables | 2 |
| **Total Tables** | **13** |
| **Total Policies** | **45+** |

---

## Security Notes

1. **User-Specific Access**: All user-owned data is protected by RLS policies that check `auth.uid() = user_id`
2. **Public Read-Only**: Companies and jobs tables are publicly readable for discovering job opportunities
3. **System-Managed**: Companies, jobs, and subscription_transactions are managed by the system (Inngest, webhooks) and not directly writable by users
4. **Audit Trail**: subscription_transactions are append-only for billing history
5. **Cascade Deletes**: Deleting a user_profiles entry cascades to all related tables

---

## Testing RLS Policies

To test RLS policies, use:

```sql
-- Test as current user
SELECT * FROM public.user_profiles;

-- Test as another user (requires test user setup)
-- This will show no results if RLS is working correctly
```

---

## Phase 1.10 Completion Checklist

- [x] RLS enabled on all tables
- [x] User-specific policies implemented
- [x] Public read access configured for companies and jobs
- [x] System-managed tables protected from direct writes
- [x] RLS policies documented
- [ ] RLS policies tested with queries
- [ ] Integration tests created (Phase 14)
