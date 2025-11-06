import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const token = searchParams.get("token"); // PKCE token from email links
  const token_hash = searchParams.get("token_hash");
  const error = searchParams.get("error");
  const error_description = searchParams.get("error_description");
  const type = searchParams.get("type"); // "signup", "recovery", "invite", etc from Supabase

  // Handle errors from OAuth provider
  if (error) {
    return NextResponse.redirect(
      new URL(
        `/auth/verify-email/error?error=${encodeURIComponent(error_description || error)}`,
        request.url
      )
    );
  }

  // Exchange code or verify token for session
  if (code || token || token_hash) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) => {
                cookieStore.set(name, value, options);
              });
            } catch (error) {
              console.error("Error setting cookie:", error);
            }
          },
        },
      }
    );

    // Exchange code for session (OAuth/PKCE flow)
    if (code) {
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

      if (exchangeError) {
        console.error("Exchange error:", exchangeError);
        return NextResponse.redirect(
          new URL(
            `/auth/verify-email/error?error=${encodeURIComponent(exchangeError.message)}`,
            request.url
          )
        );
      }
    }
    
    // Verify token_hash for email links (password reset, email confirmation)
    if (token_hash && type) {
      const { error: verifyError } = await supabase.auth.verifyOtp({
        token_hash,
        type: type as any, // 'recovery' | 'signup' | 'invite' | 'magiclink'
      });

      if (verifyError) {
        console.error("Token verification error:", verifyError);
        return NextResponse.redirect(
          new URL(
            `/auth/verify-email/error?error=${encodeURIComponent(verifyError.message)}`,
            request.url
          )
        );
      }
    }

    // Get user info to determine the flow
    const { data: { user } } = await supabase.auth.getUser();

    // Route based on the type parameter from Supabase
    if (type === "signup") {
      // Email verification flow (new signup)
      return NextResponse.redirect(new URL("/auth/verify-email/success", request.url));
    }

    if (type === "recovery") {
      // Password reset flow
      return NextResponse.redirect(new URL("/auth/reset-password", request.url));
    }

    // Check if this is a password recovery flow even without type parameter
    // Supabase recovery sessions have specific characteristics
    const { data: { session: fullSession } } = await supabase.auth.getSession();
    
    // If user just authenticated but has no confirmed_at or was recently created,
    // and there's no type parameter, check if this might be a recovery flow
    // Recovery flows create a session but the user needs to reset their password
    if (fullSession && !type) {
      // Check if this is OAuth by looking for identity providers
      if (user?.identities && user.identities.length > 0) {
        // OAuth flow - user has an identity provider
        return NextResponse.redirect(new URL("/app/dashboard", request.url));
      }
      
      // If no OAuth identity and no type, this might be a recovery flow
      // that's missing the type parameter. To be safe, check if the user
      // has a recovery token or if this is a new session
      // For now, default to dashboard for email/password users
      return NextResponse.redirect(new URL("/app/dashboard", request.url));
    }

    // Fallback: redirect to dashboard
    return NextResponse.redirect(new URL("/app/dashboard", request.url));
  }

  // Default: redirect to home if no code/error
  return NextResponse.redirect(new URL("/", request.url));
}
