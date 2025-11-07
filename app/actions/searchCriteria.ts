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
          ...validatedData,
          user_id: user.id,
          matching_instructions: "", // Will be updated by regenerateMatchingInstructions
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

    revalidatePath("/app/app/search-criteria");

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected error occurred");
  }
}
