"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { searchCriteriaInputSchema, SearchCriteriaInput } from "@/lib/validations/searchCriteria";
import { regenerateMatchingInstructions } from "@/lib/utils/generateMatchingInstructions";

export async function updateSearchCriteria(data: SearchCriteriaInput) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  try {
    // Validate input
    const validatedData = searchCriteriaInputSchema.parse(data);

    // Upsert search criteria
    const { error: upsertError } = await supabase
      .from("search_criteria")
      .upsert(
        {
          user_id: user.id,
          target_job_titles: validatedData.target_job_titles,
          industries: validatedData.industries,
          seniority_levels: validatedData.seniority_levels,
          years_of_experience: validatedData.years_of_experience,
          preferred_locations: validatedData.preferred_locations,
          work_models: validatedData.work_models,
          willing_to_relocate: validatedData.willing_to_relocate,
          salary_min: validatedData.salary_min,
          salary_max: validatedData.salary_max,
          salary_currency: validatedData.salary_currency,
          contract_types: validatedData.contract_types,
          ideal_role_description: validatedData.ideal_role_description,
          must_have_requirements: validatedData.must_have_requirements,
          must_not_have_requirements: validatedData.must_not_have_requirements,
          work_environment_preferences:
            validatedData.work_environment_preferences,
          important_keywords: validatedData.important_keywords,
          matching_instructions: "", // Will be updated below
        },
        {
          onConflict: "user_id",
        }
      );

    if (upsertError) {
      throw new Error("Failed to update search criteria");
    }

    // Generate matching instructions
    await regenerateMatchingInstructions(user.id);

    // Revalidate search criteria page
    revalidatePath("/app/app/search-criteria");

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected error occurred");
  }
}

export async function toggleSearchActive(isActive: boolean) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  try {
    const { error } = await supabase
      .from("search_criteria")
      .update({ is_active: isActive })
      .eq("user_id", user.id);

    if (error) {
      throw new Error("Failed to update search status");
    }

    revalidatePath("/app/dashboard/search-criteria");

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected error occurred");
  }
}
