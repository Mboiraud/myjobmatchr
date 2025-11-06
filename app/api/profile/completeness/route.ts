import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { calculateProfileCompleteness } from "@/lib/utils/profileCompleteness";

/**
 * GET /api/profile/completeness
 * Calculate and return current profile completeness score
 */
export async function GET() {
  try {
    const supabase = await createClient();

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch profile data
    const { data: profile, error: profileError } = await supabase
      .from("user_profiles")
      .select("first_name, last_name")
      .eq("id", user.id)
      .single();

    if (profileError) {
      console.error("Error fetching profile:", profileError);
      return NextResponse.json(
        { error: "Failed to fetch profile" },
        { status: 500 }
      );
    }

    // Count experiences
    const { count: experiencesCount } = await supabase
      .from("user_experiences")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id);

    // Count skills
    const { count: skillsCount } = await supabase
      .from("user_skills")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id);

    // Calculate completeness
    const result = calculateProfileCompleteness({
      first_name: profile.first_name,
      last_name: profile.last_name,
      experiencesCount: experiencesCount || 0,
      skillsCount: skillsCount || 0,
    });

    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error) {
    console.error("Unexpected error in GET /api/profile/completeness:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/profile/completeness
 * Recalculate completeness and update in database
 */
export async function POST() {
  try {
    const supabase = await createClient();

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch profile data
    const { data: profile, error: profileError } = await supabase
      .from("user_profiles")
      .select("first_name, last_name")
      .eq("id", user.id)
      .single();

    if (profileError) {
      console.error("Error fetching profile:", profileError);
      return NextResponse.json(
        { error: "Failed to fetch profile" },
        { status: 500 }
      );
    }

    // Count experiences
    const { count: experiencesCount } = await supabase
      .from("user_experiences")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id);

    // Count skills
    const { count: skillsCount } = await supabase
      .from("user_skills")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id);

    // Calculate completeness
    const result = calculateProfileCompleteness({
      first_name: profile.first_name,
      last_name: profile.last_name,
      experiencesCount: experiencesCount || 0,
      skillsCount: skillsCount || 0,
    });

    // Update profile_completeness in database
    const { error: updateError } = await supabase
      .from("user_profiles")
      .update({ profile_completeness: result.score })
      .eq("id", user.id);

    if (updateError) {
      console.error("Error updating profile completeness:", updateError);
      return NextResponse.json(
        { error: "Failed to update profile completeness" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { data: result, message: "Profile completeness updated" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected error in POST /api/profile/completeness:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
