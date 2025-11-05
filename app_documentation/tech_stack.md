# MyJobMatchr Technical Stack

## 💻 Framework & Frontend

- **Next.js:** The core framework, providing the UI (React), Routing, and secure Server-Side Logic (for API calls).
- **Tailwind CSS:** Used for rapid, utility-first styling of the user interface.

---

## 🧠 AI & Logic

- **Google Gemini API:** The Generative AI layer, powering features like content generation (e.g., personalized cover letters), data analysis, and intelligent chat.
- **Vercel AI SDK:** A library that simplifies integrating and streaming responses from Gemini into the Next.js UI.

---

## 💾 Backend & Data

- **Supabase:** The all-in-one Backend-as-a-Service (BaaS), featuring a **PostgreSQL Database**, built-in **Authentication**, Storage, and Vector Database features for RAG (Retrieval-Augmented Generation).
- **Supabase Edge Functions:** Globally distributed, Deno-based serverless functions for handling asynchronous tasks and complex pre-processing.
- **TypeScript:** The unified language used across the entire stack for type safety.

---

## 💰 Payment & Billing

- **Stripe:** The dedicated payment processor for handling secure checkout, recurring subscriptions, and billing management.

---

## 📧 Email & Notifications

- **Resend:** Modern email delivery API for sending transactional and notification emails.
- **React Email:** Component library for building email templates using React/JSX.
- **Supabase Auth:** Built-in authentication emails (verification, password reset, magic links) configured to use Resend SMTP.

---

## 🧪 Testing & Quality Assurance

- **Vitest:** Unit test runner for business logic (matching algorithms, CV parsing, etc.).
- **Playwright:** End-to-end testing for critical user flows (signup → matching → applications).

---

## 🌐 Deployment

- **Vercel:** The hosting platform with first-class support for Next.js, deploying all logic as highly scalable Serverless Functions on a global CDN.
