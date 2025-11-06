import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { updateProfileCompleteness } from "@/lib/utils/updateProfileCompleteness";

/**
 * DELETE /api/skills/[id]
 * Delete a skill
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;

    // Verify ownership
    const { data: existingSkill, error: fetchError } = await supabase
      .from("user_skills")
      .select("user_id")
      .eq("id", id)
      .single();

    if (fetchError || !existingSkill) {
      return NextResponse.json(
        { error: "Skill not found" },
        { status: 404 }
      );
    }

    if (existingSkill.user_id !== user.id) {
      return NextResponse.json(
        { error: "Forbidden: You don't own this skill" },
        { status: 403 }
      );
    }

    // Delete skill
    const { error: deleteError } = await supabase
      .from("user_skills")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error("Error deleting skill:", deleteError);
      return NextResponse.json(
        { error: "Failed to delete skill" },
        { status: 500 }
      );
    }

    // Update profile completeness
    await updateProfileCompleteness(user.id);

    return NextResponse.json(
      { message: "Skill deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected error in DELETE /api/skills/[id]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
