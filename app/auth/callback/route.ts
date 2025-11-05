import { createClient } from "@/lib/supabase/server";
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
    const supabase = await createClient();

    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(
      code
    );

    if (exchangeError) {
      return NextResponse.redirect(
        new URL(
          `/auth/verify-email/error?error=${encodeURIComponent(exchangeError.message)}`,
          request.url
        )
      );
    }

    // Check if this is an email confirmation or OAuth
    // The type is determined by looking at the session
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user?.email_confirmed_at) {
      // Email has been verified, redirect to verification success page
      return NextResponse.redirect(new URL("/auth/verify-email/success", request.url));
    }
  }

  // Default: redirect to dashboard (OAuth flow)
  return NextResponse.redirect(new URL("/app/dashboard", request.url));
}
