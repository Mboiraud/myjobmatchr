import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { updateExperienceSchema } from "@/lib/validations/profile";
import { ZodError } from "zod";

/**
 * PUT /api/experiences/[id]
 * Update an existing work experience
 */
export async function PUT(
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
    const { data: existingExperience, error: fetchError } = await supabase
      .from("user_experiences")
      .select("user_id")
      .eq("id", id)
      .single();

    if (fetchError || !existingExperience) {
      return NextResponse.json(
        { error: "Experience not found" },
        { status: 404 }
      );
    }

    if (existingExperience.user_id !== user.id) {
      return NextResponse.json(
        { error: "Forbidden: You don't own this experience" },
        { status: 403 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = updateExperienceSchema.parse(body);

    // Update experience
    const { data: experience, error: updateError } = await supabase
      .from("user_experiences")
      .update(validatedData)
      .eq("id", id)
      .select()
      .single();

    if (updateError) {
      console.error("Error updating experience:", updateError);
      return NextResponse.json(
        { error: "Failed to update experience" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { data: experience, message: "Experience updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: error.issues.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    console.error("Unexpected error in PUT /api/experiences/[id]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/experiences/[id]
 * Delete a work experience
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
    const { data: existingExperience, error: fetchError } = await supabase
      .from("user_experiences")
      .select("user_id")
      .eq("id", id)
      .single();

    if (fetchError || !existingExperience) {
      return NextResponse.json(
        { error: "Experience not found" },
        { status: 404 }
      );
    }

    if (existingExperience.user_id !== user.id) {
      return NextResponse.json(
        { error: "Forbidden: You don't own this experience" },
        { status: 403 }
      );
    }

    // Delete experience
    const { error: deleteError } = await supabase
      .from("user_experiences")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error("Error deleting experience:", deleteError);
      return NextResponse.json(
        { error: "Failed to delete experience" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Experience deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected error in DELETE /api/experiences/[id]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
