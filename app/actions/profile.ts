"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { updateProfileCompleteness } from "@/lib/utils/updateProfileCompleteness";
import { updateProfileSchema, UpdateProfileInput } from "@/lib/validations/profile";

export async function updateProfile(data: UpdateProfileInput) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  try {
    // Validate input
    const validatedData = updateProfileSchema.parse(data);

    // Update profile
    const { data: updatedProfile, error: updateError } = await supabase
      .from("user_profiles")
      .update({
        first_name: validatedData.first_name,
        last_name: validatedData.last_name,
        phone_number: validatedData.phone_number,
      })
      .eq("id", user.id)
      .select()
      .single();

    if (updateError) {
      throw new Error("Failed to update profile");
    }

    // Update profile completeness
    await updateProfileCompleteness(user.id);

    // Revalidate just the profile page
    revalidatePath("/app/profile");

    return updatedProfile;
  } catch (error) {
    if (error instanceof Error && error.message.includes("validation")) {
      throw error;
    }
    throw error;
  }
}
