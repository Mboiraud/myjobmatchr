"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { updateProfileCompleteness } from "@/lib/utils/updateProfileCompleteness";
import { CreateExperienceInput } from "@/lib/validations/profile";

export async function addExperience(data: CreateExperienceInput) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  try {
    // Create experience
    const { data: experience, error: createError } = await supabase
      .from("user_experiences")
      .insert({
        user_id: user.id,
        ...data,
      })
      .select()
      .single();

    if (createError) {
      throw new Error("Failed to create experience");
    }

    // Update profile completeness
    await updateProfileCompleteness(user.id);

    // Revalidate just the profile page
    revalidatePath("/app/profile");
  } catch (error) {
    throw error;
  }
}

export async function updateExperience(
  experienceId: string,
  data: CreateExperienceInput
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  try {
    // Update experience
    const { data: experience, error: updateError } = await supabase
      .from("user_experiences")
      .update(data)
      .eq("id", experienceId)
      .eq("user_id", user.id)
      .select()
      .single();

    if (updateError) {
      throw new Error("Failed to update experience");
    }

    // Update profile completeness
    await updateProfileCompleteness(user.id);

    // Revalidate just the profile page
    revalidatePath("/app/profile");
  } catch (error) {
    throw error;
  }
}

export async function deleteExperience(experienceId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  try {
    // Delete experience
    const { error: deleteError } = await supabase
      .from("user_experiences")
      .delete()
      .eq("id", experienceId)
      .eq("user_id", user.id);

    if (deleteError) {
      throw new Error("Failed to delete experience");
    }

    // Update profile completeness
    await updateProfileCompleteness(user.id);

    // Revalidate just the profile page
    revalidatePath("/app/profile");
  } catch (error) {
    throw error;
  }
}
