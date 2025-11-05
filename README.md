# MyJobMatchr

Your essential job search companion - an AI-powered platform for intelligent job aggregation, smart matching, and application tracking.

## Tech Stack

- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Database:** Supabase (PostgreSQL + Auth + Storage + Vector DB)
- **AI:** Google Gemini API (via Vercel AI SDK)
- **Payments:** Stripe
- **Email:** Resend + React Email
- **Testing:** Vitest + React Testing Library
- **Orchestration:** Inngest

## Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- Supabase CLI installed (`brew install supabase/tap/supabase`)

## Getting Started

### 1. Clone and Install

```bash
git clone <repository-url>
cd windsurf-project
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Required variables:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon/public key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key

### 3. Link Supabase Project

```bash
supabase login
supabase link --project-ref <your-project-ref>
```

### 4. Generate Database Types

```bash
npm run types:generate
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Available Commands

### Development
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

### Code Quality
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

### Testing
- `npm test` - Run tests in watch mode
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage report

### Database
- `npm run types:generate` - Generate TypeScript types from Supabase schema

## Project Structure

```
windsurf-project/
├── app/                    # Next.js App Router pages
├── components/             # React components
│   ├── ui/                # Reusable UI components (Button, Input, Card, etc.)
│   └── features/          # Feature-specific components
├── lib/                   # Utility functions and helpers
│   ├── supabase/         # Supabase client utilities
│   ├── utils/            # General utilities
│   └── types/            # TypeScript type definitions
├── tests/                 # Test files
│   ├── unit/             # Unit tests
│   └── e2e/              # End-to-end tests
├── app_documentation/     # Project documentation
└── public/               # Static assets
```

## Design System

The project uses a custom design system with:
- **Primary Color:** #7766C6 (purple)
- **Typography:** System fonts with customizable heading and text components
- **Components:** Button, Input, Card, Badge, Typography (Heading, Text)
- **Spacing, shadows, and border radius tokens** defined in Tailwind config

## Development Workflow

1. Create a new branch for your feature
2. Make changes and write tests
3. Run `npm run format` to format code
4. Run `npm test` to ensure tests pass
5. Commit changes and push
6. Create a pull request

## Documentation

Detailed documentation is available in the `app_documentation/` directory:
- `app_summary.md` - Project overview
- `tech_stack.md` - Technology stack details
- `database_tables.md` - Database schema
- `roadmap.md` - Development roadmap
- Page specifications in `public_app_pages/` and `private_app_pages/`
