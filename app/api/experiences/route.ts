import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createExperienceSchema } from "@/lib/validations/profile";
import { ZodError } from "zod";

/**
 * GET /api/experiences
 * Fetch all user experiences ordered by start_date desc
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

    // Fetch user experiences
    const { data: experiences, error: fetchError } = await supabase
      .from("user_experiences")
      .select("*")
      .eq("user_id", user.id)
      .order("start_date", { ascending: false });

    if (fetchError) {
      console.error("Error fetching experiences:", fetchError);
      return NextResponse.json(
        { error: "Failed to fetch experiences" },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: experiences }, { status: 200 });
  } catch (error) {
    console.error("Unexpected error in GET /api/experiences:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/experiences
 * Create a new work experience
 */
export async function POST(request: NextRequest) {
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

    // Parse and validate request body
    const body = await request.json();
    const validatedData = createExperienceSchema.parse(body);

    // Create experience
    const { data: experience, error: createError } = await supabase
      .from("user_experiences")
      .insert({
        user_id: user.id,
        ...validatedData,
      })
      .select()
      .single();

    if (createError) {
      console.error("Error creating experience:", createError);
      return NextResponse.json(
        { error: "Failed to create experience" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { data: experience, message: "Experience created successfully" },
      { status: 201 }
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

    console.error("Unexpected error in POST /api/experiences:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
