# Phase 4: Search Criteria & Preferences - Implementation Plan

**Goal**: Build the search criteria feature enabling users to define job search parameters without full-page reloads, using the Server Actions pattern from Phase 3.

**Database Table**: `search_criteria` (detailed in database_tables.md lines 49-75)

---

## Phase 4.1: Search Criteria Server Actions

**Goal**: Create Server Actions for search criteria management following the Phase 3 pattern (skills/experiences).

### Subtasks

#### 4.1.1 Create Search Criteria Validation Schema
- [ ] Create `/lib/validations/searchCriteria.ts`
- [ ] Define Zod schema `SearchCriteriaInput` with all search_criteria fields:
  - `target_job_titles: string[]` - required, non-empty
  - `industries: string[]` - optional
  - `seniority_levels: string[]` - optional
  - `years_of_experience: number` - optional
  - `preferred_locations: string[]` - optional
  - `work_models: string[]` - required, at least one selected (remote/hybrid/onsite)
  - `willing_to_relocate: boolean` - optional, default false
  - `salary_min: number` - optional, must be < salary_max if both set
  - `salary_max: number` - optional
  - `salary_currency: string` - default 'EUR'
  - `contract_types: string[]` - optional
  - `ideal_role_description: string` - optional
  - `must_have_requirements: string` - optional
  - `must_not_have_requirements: string` - optional
  - `work_environment_preferences: string` - optional
  - `important_keywords: string[]` - optional
- [ ] Add validation logic (salary_min < salary_max, at least one work_model, etc.)
- [ ] Export TypeScript type `SearchCriteriaInput`

#### 4.1.2 Create Search Criteria Server Actions
- [ ] Create `/app/actions/searchCriteria.ts`
- [ ] Implement `updateSearchCriteria(data: SearchCriteriaInput)` Server Action:
  1. Authenticate user (throw if not authenticated)
  2. Validate data with Zod schema
  3. Upsert into search_criteria table (one row per user)
  4. Call `regenerateMatchingInstructions(user.id)` to update matching_instructions field
  5. Call `revalidatePath("/app/search-criteria")` for targeted cache refresh
  6. Return updated search criteria
- [ ] Implement `toggleSearchActive(isActive: boolean)` Server Action:
  1. Authenticate user
  2. Update search_criteria.is_active to isActive
  3. Call `revalidatePath("/app/search-criteria")`
  4. Return updated search criteria
- [ ] Add error handling with specific error messages
- [ ] Follow Phase 3 pattern: direct Supabase client, no API routes

#### 4.1.3 Create Matching Instructions Generator
- [ ] Create `/lib/utils/generateMatchingInstructions.ts`
- [ ] Implement `regenerateMatchingInstructions(userId: string)` function:
  1. Fetch user's search_criteria from DB
  2. Convert criteria fields into clear, structured matching instructions
  3. Format: "Looking for: [job titles]. Industries: [industries]. Level: [seniority]. Locations: [locations]. Remote: [work models]. Salary: [min-max]. Must have: [requirements]. Dealbreakers: [dealbreakers]."
  4. Update search_criteria.matching_instructions
  5. Handle missing fields gracefully
- [ ] This text will guide AI matching in Phase 8
- [ ] Keep it concise and structured (max 500 chars)

### Technical Notes
- No API routes needed (Server Actions only, like Phase 3)
- Upsert logic: `insert(...).on_conflict("user_id").do_update(set: {...})`
- Use same error handling pattern as skills/experiences
- `revalidatePath` replaces full page reload

---

## Phase 4.2: Search Criteria UI Components

**Goal**: Create reusable form input components for all search criteria fields.

### Component Structure
Create `/components/features/search/` directory with individual input components:

#### 4.2.1 Multi-Select Inputs
- [ ] Create `JobTitlesInput.tsx`
  - Tag-based multi-select (can add custom values)
  - Allow comma-separated input
  - Show suggestions from common job titles
  - Min 1, max 5 titles recommended

- [ ] Create `IndustriesInput.tsx`
  - Dropdown multi-select with predefined options
  - Options: Tech, Finance, Healthcare, Manufacturing, Retail, Education, Legal, Other
  - Optional field

- [ ] Create `SeniorityInput.tsx`
  - Checkbox multi-select with predefined levels
  - Options: Entry, Mid-level, Senior, Lead, Director, Executive
  - Optional field

- [ ] Create `LocationsInput.tsx`
  - Tag-based multi-select for cities/regions
  - Allow custom entries
  - Show suggestions
  - Optional field

- [ ] Create `ContractTypesInput.tsx`
  - Checkbox multi-select
  - Options: Full-time, Part-time, Contract, Freelance, Internship
  - Optional field

- [ ] Create `KeywordsInput.tsx`
  - Comma-separated or tag input
  - Max 10 keywords
  - Optional field

#### 4.2.2 Radio/Select Inputs
- [ ] Create `WorkModelInput.tsx`
  - Checkbox group (required, at least one)
  - Options: Remote, Hybrid, Onsite
  - Show visual indicators (icons)

- [ ] Create `SalaryRangeInput.tsx`
  - Two number inputs (min/max) in a row
  - Optional field
  - Validate: min < max
  - Add currency selector (EUR, USD, GBP)
  - Format: "€50,000 - €80,000 EUR"

- [ ] Create `YearsOfExperienceInput.tsx`
  - Single number input
  - Optional field
  - Range: 0-60 years

- [ ] Create `WillingToRelocateInput.tsx`
  - Toggle/checkbox
  - Optional field

#### 4.2.3 Textarea Inputs
- [ ] Create `IdealRoleInput.tsx`
  - Textarea for role description
  - Placeholder: "Describe your ideal role..."
  - Optional field
  - Max 500 chars

- [ ] Create `MustHavesInput.tsx`
  - Textarea for must-have requirements
  - Placeholder: "What are non-negotiables for you?"
  - Optional field
  - Max 500 chars

- [ ] Create `DealBreakersInput.tsx`
  - Textarea for dealbreakers
  - Placeholder: "What would make you reject a role?"
  - Optional field
  - Max 500 chars

- [ ] Create `WorkEnvironmentInput.tsx`
  - Textarea for company culture preferences
  - Placeholder: "What company culture do you thrive in?"
  - Optional field
  - Max 500 chars

### Component Features
- All components use design system (Button, Input, Card)
- Accept `value` and `onChange` props
- Show error prop for validation feedback
- Clear labels and help text
- Consistent spacing (Tailwind classes)
- Responsive design (mobile-friendly)
- Client-side validation feedback (red error text)

---

## Phase 4.3: Search Criteria Page

**Goal**: Create main search criteria page with organized sections and save button.

### Subtasks

#### 4.3.1 Create Search Criteria Form Component
- [ ] Create `/components/features/search/SearchCriteriaForm.tsx`
- [ ] This is the main form wrapper that manages all field states
- [ ] State management:
  - Local state for all search criteria fields
  - Validation errors state
  - Loading state during submission
  - Message state for success/error feedback
- [ ] Form structure with sections:
  - **Section 1: Job Information**
    - JobTitlesInput
    - IndustriesInput
    - SeniorityInput
  - **Section 2: Location & Work**
    - LocationsInput
    - WorkModelInput
    - WillingToRelocateInput
  - **Section 3: Compensation**
    - SalaryRangeInput
    - YearsOfExperienceInput
  - **Section 4: Position Details**
    - ContractTypesInput
    - KeywordsInput
  - **Section 5: Role Description**
    - IdealRoleInput
    - MustHavesInput
    - DealBreakersInput
    - WorkEnvironmentInput
  - **Section 6: Search Control** (Premium features)
    - Toggle "Activate Daily Search" (shows status badge: ACTIVE/INACTIVE)
    - "Run Search Now" button with eligibility checks
    - Status text "Last manual search: X ago" or free trial message
- [ ] Handle form submission:
  1. Validate all fields client-side
  2. If invalid: show inline errors, don't submit
  3. If valid: call `updateSearchCriteria()` Server Action
  4. Show loading state during submission
  5. On success: clear errors, show success message, auto-dismiss after 3 seconds
  6. On error: show error message inline
- [ ] Add "Save Changes" button (disabled while loading or if invalid)
- [ ] Use design system Card component for each section
- [ ] Consistent spacing between sections

#### 4.3.2 Create Search Criteria Page
- [ ] Create `/app/dashboard/search-criteria/page.tsx`
- [ ] Fetch current search criteria for user on page load
- [ ] Handle loading state (skeleton or spinner)
- [ ] Render SearchCriteriaForm with current data
- [ ] Add page header: "Search Criteria" title + subtitle
- [ ] Add helpful text: "Define your ideal job to find the best matches"
- [ ] Use proper spacing and layout
- [ ] Responsive design

#### 4.3.3 Update Navigation
- [ ] Add "Search Criteria" link in sidebar navigation
- [ ] Point to `/app/dashboard/search-criteria`
- [ ] Ensure it appears in correct order (after Profile)

### Layout Example
```
┌─────────────────────────────────────┐
│ Search Criteria                     │
│ Define your ideal job to find...    │
├─────────────────────────────────────┤
│                                     │
│ JOB INFORMATION                     │
│ ┌─────────────────────────────────┐ │
│ │ Job Titles: [React, Vue.js, ...]│ │
│ │ Industries: [Tech, Finance]      │ │
│ │ Seniority: [Mid, Senior]         │ │
│ └─────────────────────────────────┘ │
│                                     │
│ LOCATION & WORK                     │
│ ┌─────────────────────────────────┐ │
│ │ Locations: [Paris, Lyon, Remote]│ │
│ │ Work Model: ☑ Remote ☐ Hybrid  │ │
│ │ Relocate: ☐ Open to relocation  │ │
│ └─────────────────────────────────┘ │
│                                     │
│ COMPENSATION                        │
│ ┌─────────────────────────────────┐ │
│ │ Salary: €50,000 - €80,000 EUR   │ │
│ │ Experience: 5 years             │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ... (more sections)                 │
│                                     │
│ SEARCH CONTROL                      │
│ ┌─────────────────────────────────┐ │
│ │ Activate Daily Search: ☑ ACTIVE │ │
│ │ [Run Search Now]                │ │
│ │ Last search: 2 hours ago        │ │
│ └─────────────────────────────────┘ │
│                                     │
│ [Save Changes]                      │
└─────────────────────────────────────┘
```

---

## Phase 4.4: Search Criteria Validation

**Goal**: Implement client-side and server-side validation with clear error messages.

### Subtasks

#### 4.4.1 Client-Side Validation
- [ ] Add real-time validation as user types in each component:
  - **Required fields**:
    - At least one job title
    - At least one work model selected
  - **Conditional validation**:
    - If salary_min is set AND salary_max is set: salary_min < salary_max
    - If salary is set: must be positive numbers
  - **Field-specific validation**:
    - Job titles: max 5 titles recommended, each max 50 chars
    - Keywords: max 10 keywords
    - Years of experience: 0-60 range
    - Salary: positive integers only

- [ ] Visual feedback on validation:
  - Red error text below invalid fields (like Phase 3)
  - Disabled save button if any required field is invalid
  - Green checkmark (optional) for required fields when valid
  - Show specific error messages: "At least one job title required", "Salary must be valid range", etc.

- [ ] Before "Run Search Now" button:
  - Validate: user's profile_completeness = 100%
  - Validate: all required search criteria fields filled
  - Show inline error message if not eligible
  - Example: "Complete your profile (50% done) before searching"

#### 4.4.2 Server-Side Validation
- [ ] In `updateSearchCriteria()` Server Action:
  1. Validate all required fields present
  2. Validate salary_min < salary_max
  3. Validate at least one work_model selected
  4. Sanitize text inputs (trim, remove excess whitespace)
  5. Validate array lengths (job_titles max 5, keywords max 10)
  6. Return specific error messages for each validation failure
  7. Type-check all fields match expected types

- [ ] Error messages format:
  - "Job titles: At least one required"
  - "Work models: Select at least one (Remote, Hybrid, or Onsite)"
  - "Salary: Minimum must be less than maximum"
  - "Keywords: Maximum 10 keywords allowed"
  - Generic: "Invalid search criteria. Please check your inputs."

#### 4.4.3 Integrate Validation in Components
- [ ] Update SearchCriteriaForm to:
  1. Run validation on every field change
  2. Update errors state
  3. Disable save button if `hasErrors` is true
  4. Show error text under each invalid field
  5. Pass validation state to individual components

- [ ] Update individual input components to:
  1. Accept `error` prop (optional error message)
  2. Display error text in red if error exists
  3. Add error styling to input (red border)
  4. Show helpful text (not just error)

#### 4.4.4 Profile Completeness Check
- [ ] Before allowing "Run Search Now":
  1. Check if `user_profiles.profile_completeness = 100`
  2. If not 100%: show error message and link to profile
  3. If 100%: enable button and allow search trigger
  4. Store this check result in component state

- [ ] Add helper function: `/lib/utils/isProfileComplete.ts`
  - Fetch user's current profile_completeness
  - Return boolean
  - Use in SearchCriteriaForm for eligibility check

### Validation Summary Pattern
```
Client validates → Show errors → Disable save
                      ↓
    User fixes errors → Errors clear → Save enabled
                      ↓
    User clicks save → Call Server Action
                      ↓
    Server validates again → Return errors or success
                      ↓
                Show result
```

---

## Technical Implementation Notes

### Pattern from Phase 3 (Skills/Experiences)
All Phase 4 components follow the same proven pattern:
1. **Server Actions** handle all mutations (no API routes)
2. **`revalidatePath`** refreshes only `/app/search-criteria` (no full page reload)
3. **Local state** in form components for field values
4. **Message state** for error/success feedback (no banners)
5. **Loading state** during submission
6. **Client validates first**, server validates again (defense in depth)

### Form Component Structure (like ExperienceForm)
```typescript
export function SearchCriteriaForm({ initialData, onSuccess, onCancel }) {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    // 1. Validate client-side
    // 2. Show errors if invalid
    // 3. Call updateSearchCriteria() Server Action
    // 4. Handle success/error
    // 5. onSuccess callback to close/refresh
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Sections with input components */}
      {message && <div>{message}</div>}
      <button disabled={hasErrors || isLoading}>Save</button>
    </form>
  );
}
```

### Database Upsert Pattern
```typescript
const { data, error } = await supabase
  .from('search_criteria')
  .insert({
    user_id: user.id,
    ...data
  })
  .on_conflict('user_id')  // Natural key is user_id (one per user)
  .do_update({
    set: { ...data, updated_at: new Date() }
  })
  .select()
  .single();
```

### Revalidation Pattern
```typescript
// Targeted refresh of only search-criteria page
revalidatePath('/app/search-criteria');
// NOT router.refresh() (which reloads whole page)
```

---

## Files to Create/Modify

### Create
- `/lib/validations/searchCriteria.ts` - Zod schemas
- `/app/actions/searchCriteria.ts` - Server Actions
- `/lib/utils/generateMatchingInstructions.ts` - Matching instructions generator
- `/lib/utils/isProfileComplete.ts` - Profile completeness checker
- `/components/features/search/SearchCriteriaForm.tsx` - Main form wrapper
- `/components/features/search/JobTitlesInput.tsx`
- `/components/features/search/IndustriesInput.tsx`
- `/components/features/search/SeniorityInput.tsx`
- `/components/features/search/LocationsInput.tsx`
- `/components/features/search/WorkModelInput.tsx`
- `/components/features/search/SalaryRangeInput.tsx`
- `/components/features/search/ContractTypesInput.tsx`
- `/components/features/search/KeywordsInput.tsx`
- `/components/features/search/IdealRoleInput.tsx`
- `/components/features/search/MustHavesInput.tsx`
- `/components/features/search/DealBreakersInput.tsx`
- `/components/features/search/WorkEnvironmentInput.tsx`
- `/components/features/search/YearsOfExperienceInput.tsx`
- `/components/features/search/WillingToRelocateInput.tsx`
- `/app/dashboard/search-criteria/page.tsx` - Main page

### Modify
- `/components/layout/Sidebar.tsx` - Add "Search Criteria" link
- Navigation paths if needed

---

## Testing Plan (Not in this phase, but for reference)

- [ ] Test form loads with empty state
- [ ] Test form loads with existing criteria
- [ ] Test each input component with valid/invalid data
- [ ] Test validation messages appear correctly
- [ ] Test save button disabled when invalid
- [ ] Test saving criteria calls Server Action
- [ ] Test page refreshes without full reload after save
- [ ] Test error messages on server validation failure
- [ ] Test matching instructions are generated
- [ ] Test "Run Search Now" button eligibility checks
- [ ] Test responsive design on mobile
- [ ] Test profile completeness requirement for search

---

## Success Criteria

✅ Phase 4.1 Complete when:
- Server Actions created and tested
- Upsert logic working (one row per user)
- Matching instructions generated on save
- `revalidatePath` refreshing data correctly

✅ Phase 4.2 Complete when:
- All input components created
- Components accept value/onChange/error props
- Consistent styling with design system
- Responsive on mobile and desktop

✅ Phase 4.3 Complete when:
- SearchCriteriaForm managing all field states
- All sections properly organized and spaced
- Page loads existing criteria
- Save button calls Server Action
- No full-page reload on save

✅ Phase 4.4 Complete when:
- Client-side validation shows errors
- Save button disabled when invalid
- Server validates and returns errors
- Profile completeness check working
- Error messages clear and helpful

---

## Next Phase

Once Phase 4 is complete, Phase 4.5-4.8 will handle:
- 4.5: Search criteria modal (confirmation before running search)
- 4.6: AI matching instructions (already handled in 4.1)
- 4.7: Search query builder (generate job_board_searches)
- 4.8: Manual search trigger API

Phase 5+ will handle actual job discovery, enrichment, and AI matching.
