# Page: 💳 Plan & Billing

## Page Title

Plan & Billing

## Page Subtitle

Manage your subscription and billing information

---

## Section 1: Current Plan

**Your Plan:**

- Display: [subscriptions.plan] - "Free" or "Premium"
- Status badge: [subscriptions.status]
  - Free (gray badge)
  - Active (green badge)
  - Canceled (yellow badge - if cancel_at_period_end = true)
  - Past Due (red badge)
  - Trialing (blue badge)
  - Incomplete (orange badge)

**If Free Plan:**

- **Upgrade to Premium** button (Primary)
  - Price: €15/month
  - Redirects to Stripe Checkout

**If Premium Plan (Active):**

- Price: €15/month
- **Billing Period:**
  - Start: [subscriptions.current_period_start]
  - End: [subscriptions.current_period_end]
  - Next billing date: [subscriptions.current_period_end]

**If Premium Plan (Canceled - cancel_at_period_end = true):**

- Warning badge: "Canceled - Access until [current_period_end]"
- Message: "Your subscription will end on [current_period_end]. You'll automatically be moved to the Free plan."
- **Reactivate Subscription** button (Primary)
- Canceled on: [subscriptions.canceled_at]

---

## Section 2: Plan Features Comparison

**Free Plan:**

- Manual application tracking
- Kanban board for organization
- Personal notes and reminders
- Unlimited job entries
- Application timeline tracking

**Premium Plan (€15/month):**

- Everything in Free, plus:
- AI-powered job matching
- Automatic job aggregation from multiple sources
- Personalized match scores with explanations
- Cover letter generation
- Interview preparation AI coach
- Potential blocker analysis
- Enhanced match breakdown
- Priority support

---

## Section 3: Billing Information

**Payment Method:**

- Display card info from Stripe (if available)
- Last 4 digits, brand, expiry
- **Update Payment Method** button
  - Opens Stripe Customer Portal

**Billing History:**

- Table showing transactions from subscription_transactions:
  - Date: [transaction_date]
  - Description: [description]
  - Amount: [amount/100] [currency]
  - Status: [status] - Succeeded/Failed/Pending/Refunded
  - Invoice: [invoice_url] - Download link

---

## Section 4: Manage Subscription

**If Premium Plan (Active - cancel_at_period_end = false):**

- **Cancel Subscription** button (Destructive, secondary)
  - Opens confirmation modal:
    - Warning: "Are you sure you want to cancel?"
    - Info: "You'll keep Premium access until [current_period_end], then automatically switch to Free plan"
    - **Keep Premium** button (Primary)
    - **Cancel Subscription** button (Destructive)
  - Action: Sets cancel_at_period_end = true via Stripe API
  - Success message: "Subscription canceled. You have access until [current_period_end]"

**If Premium Plan (Canceled - cancel_at_period_end = true):**

- **Reactivate Subscription** button (Primary)
  - Action: Removes cancellation via Stripe API (sets cancel_at_period_end = false)
  - Success message: "Subscription reactivated. Your next billing date is [current_period_end]"

---

## Stripe Integration Notes

**All actions redirect to or use:**

- Upgrade: Stripe Checkout Session
- Update payment: Stripe Customer Portal
- Cancel/Reactivate: Stripe API calls
- Webhooks update subscriptions table automatically
