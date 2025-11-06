import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createSkillSchema } from "@/lib/validations/profile";
import { ZodError } from "zod";

/**
 * GET /api/skills
 * Fetch all user skills ordered alphabetically
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

    // Fetch user skills
    const { data: skills, error: fetchError } = await supabase
      .from("user_skills")
      .select("*")
      .eq("user_id", user.id)
      .order("skill_name", { ascending: true });

    if (fetchError) {
      console.error("Error fetching skills:", fetchError);
      return NextResponse.json(
        { error: "Failed to fetch skills" },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: skills }, { status: 200 });
  } catch (error) {
    console.error("Unexpected error in GET /api/skills:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/skills
 * Create a new skill
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
    const validatedData = createSkillSchema.parse(body);

    // Check for duplicate skill (case-insensitive)
    const { data: existingSkills, error: checkError } = await supabase
      .from("user_skills")
      .select("skill_name")
      .eq("user_id", user.id)
      .ilike("skill_name", validatedData.skill_name);

    if (checkError) {
      console.error("Error checking for duplicate skills:", checkError);
      return NextResponse.json(
        { error: "Failed to check for duplicate skills" },
        { status: 500 }
      );
    }

    if (existingSkills && existingSkills.length > 0) {
      return NextResponse.json(
        { error: "Skill already exists" },
        { status: 409 }
      );
    }

    // Create skill
    const { data: skill, error: createError } = await supabase
      .from("user_skills")
      .insert({
        user_id: user.id,
        ...validatedData,
      })
      .select()
      .single();

    if (createError) {
      console.error("Error creating skill:", createError);
      return NextResponse.json(
        { error: "Failed to create skill" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { data: skill, message: "Skill created successfully" },
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

    console.error("Unexpected error in POST /api/skills:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
