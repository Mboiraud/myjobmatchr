import { createServerClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const error_description = searchParams.get("error_description");

  // Handle errors from OAuth provider
  if (error) {
    return NextResponse.redirect(
      new URL(
        `/signin?error=${encodeURIComponent(error_description || error)}`,
        request.url
      )
    );
  }

  // Exchange code for session
  if (code) {
    const supabase = await createServerClient();

    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(
      code
    );

    if (exchangeError) {
      return NextResponse.redirect(
        new URL(
          `/signin?error=${encodeURIComponent(exchangeError.message)}`,
          request.url
        )
      );
    }
  }

  // Redirect to dashboard on success
  return NextResponse.redirect(new URL("/app/dashboard", request.url));
}
