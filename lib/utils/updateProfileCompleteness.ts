import { createClient } from "@/lib/supabase/server";
import { calculateProfileCompleteness } from "./profileCompleteness";

/**
 * Helper function to recalculate and update profile completeness
 * Call this after any profile, experience, or skill change
 */
export async function updateProfileCompleteness(userId: string): Promise<void> {
  try {
    const supabase = await createClient();

    // Fetch profile data
    const { data: profile } = await supabase
      .from("user_profiles")
      .select("first_name, last_name")
      .eq("id", userId)
      .single();

    if (!profile) return;

    // Count experiences
    const { count: experiencesCount } = await supabase
      .from("user_experiences")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    // Count skills
    const { count: skillsCount } = await supabase
      .from("user_skills")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    // Calculate completeness
    const result = calculateProfileCompleteness({
      first_name: profile.first_name,
      last_name: profile.last_name,
      experiencesCount: experiencesCount || 0,
      skillsCount: skillsCount || 0,
    });

    // Update profile_completeness in database
    await supabase
      .from("user_profiles")
      .update({ profile_completeness: result.score })
      .eq("id", userId);
  } catch (error) {
    console.error("Error updating profile completeness:", error);
    // Don't throw - this is a background operation
  }
}
