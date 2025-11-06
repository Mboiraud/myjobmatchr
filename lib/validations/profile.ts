import { z } from "zod";

/**
 * Schema for updating user profile
 */
export const updateProfileSchema = z.object({
  first_name: z
    .string()
    .min(1, "First name is required")
    .max(100, "First name must be less than 100 characters")
    .optional()
    .nullable(),
  last_name: z
    .string()
    .min(1, "Last name is required")
    .max(100, "Last name must be less than 100 characters")
    .optional()
    .nullable(),
  phone_number: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format")
    .optional()
    .nullable(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

/**
 * Schema for creating a new work experience
 */
export const createExperienceSchema = z
  .object({
    company_name: z
      .string()
      .min(1, "Company name is required")
      .max(200, "Company name must be less than 200 characters"),
    job_title: z
      .string()
      .min(1, "Job title is required")
      .max(200, "Job title must be less than 200 characters"),
    start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
    end_date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)")
      .optional()
      .nullable(),
    is_current: z.boolean().default(false),
    description: z
      .string()
      .max(2000, "Description must be less than 2000 characters")
      .optional()
      .nullable(),
  })
  .refine(
    (data) => {
      // If is_current is true, end_date should be null
      if (data.is_current && data.end_date) {
        return false;
      }
      // If end_date is provided, it should be after start_date
      if (data.end_date && data.start_date) {
        return new Date(data.end_date) >= new Date(data.start_date);
      }
      return true;
    },
    {
      message: "End date must be after start date, or null if currently working",
      path: ["end_date"],
    }
  );

export type CreateExperienceInput = z.infer<typeof createExperienceSchema>;

/**
 * Schema for updating an existing work experience
 */
export const updateExperienceSchema = createExperienceSchema.partial();

export type UpdateExperienceInput = z.infer<typeof updateExperienceSchema>;

/**
 * Schema for creating a new skill
 */
export const createSkillSchema = z.object({
  skill_name: z
    .string()
    .min(1, "Skill name is required")
    .max(100, "Skill name must be less than 100 characters")
    .regex(/^[a-zA-Z0-9\s\+\#\.\-\/]+$/, "Skill name contains invalid characters"),
});

export type CreateSkillInput = z.infer<typeof createSkillSchema>;
