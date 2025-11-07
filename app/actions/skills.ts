"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { updateProfileCompleteness } from "@/lib/utils/updateProfileCompleteness";

export async function addSkill(skillName: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  try {
    // Check for duplicate skill (case-insensitive)
    const { data: existingSkills, error: checkError } = await supabase
      .from("user_skills")
      .select("skill_name")
      .eq("user_id", user.id)
      .ilike("skill_name", skillName);

    if (checkError) {
      throw new Error("Failed to check for duplicate skills");
    }

    if (existingSkills && existingSkills.length > 0) {
      throw new Error("Skill already exists");
    }

    // Create skill
    const { data: skill, error: createError } = await supabase
      .from("user_skills")
      .insert({
        user_id: user.id,
        skill_name: skillName,
      })
      .select()
      .single();

    if (createError) {
      throw new Error("Failed to create skill");
    }

    // Update profile completeness
    await updateProfileCompleteness(user.id);

    // Revalidate just the profile page
    revalidatePath("/app/profile");
  } catch (error) {
    throw error;
  }
}

export async function deleteSkill(skillId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  try {
    // Delete skill
    const { error: deleteError } = await supabase
      .from("user_skills")
      .delete()
      .eq("id", skillId)
      .eq("user_id", user.id);

    if (deleteError) {
      throw new Error("Failed to delete skill");
    }

    // Update profile completeness
    await updateProfileCompleteness(user.id);

    // Revalidate just the profile page
    revalidatePath("/app/profile");
  } catch (error) {
    throw error;
  }
}
