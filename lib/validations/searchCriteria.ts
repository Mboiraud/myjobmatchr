import { z } from "zod";

/**
 * Schema for search criteria input
 */
export const searchCriteriaSchema = z.object({
  target_job_titles: z
    .array(z.string().min(1, "Job title cannot be empty"))
    .min(1, "At least one job title is required"),
  industries: z.array(z.string()).optional().default([]),
  seniority_levels: z.array(z.string()).optional().default([]),
  years_of_experience: z
    .number()
    .int()
    .min(0, "Years of experience cannot be negative")
    .max(60, "Years of experience cannot exceed 60")
    .optional()
    .nullable(),
  country: z.string().min(2, "Country is required").max(2).optional().nullable(),
  preferred_city: z.string().optional().nullable(),
  work_models: z
    .array(z.enum(["remote", "hybrid", "onsite"]))
    .min(1, "At least one work model must be selected"),
  willing_to_relocate: z.boolean().optional().default(false),
  salary_min: z.number().int().min(0).optional().nullable(),
  salary_max: z.number().int().min(0).optional().nullable(),
  salary_currency: z.string().optional().default("EUR"),
  contract_types: z.array(z.string()).optional().default([]),
  ideal_role_description: z
    .string()
    .max(500, "Ideal role description cannot exceed 500 characters")
    .optional()
    .nullable(),
  must_have_requirements: z
    .string()
    .max(500, "Must have requirements cannot exceed 500 characters")
    .optional()
    .nullable(),
  must_not_have_requirements: z
    .string()
    .max(500, "Deal breakers cannot exceed 500 characters")
    .optional()
    .nullable(),
  work_environment_preferences: z
    .string()
    .max(500, "Work environment preferences cannot exceed 500 characters")
    .optional()
    .nullable(),
  important_keywords: z.array(z.string()).optional().default([]),
});

// Refinement: validate salary_min < salary_max
export const searchCriteriaInputSchema = searchCriteriaSchema.refine(
  (data) => {
    if (data.salary_min && data.salary_max) {
      return data.salary_min < data.salary_max;
    }
    return true;
  },
  {
    message: "Minimum salary must be less than maximum salary",
    path: ["salary_min"],
  }
);

export type SearchCriteriaInput = z.infer<typeof searchCriteriaInputSchema>;
