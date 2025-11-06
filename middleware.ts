import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Create Supabase client for middleware
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  try {
    // Check if user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Protect /app/* routes - require authentication
    if (pathname.startsWith("/app")) {
      if (!user) {
        // User not authenticated, redirect to signin
        return NextResponse.redirect(new URL("/signin", request.url));
      }
    }

    // Redirect authenticated users away from auth pages (except password reset)
    // Allow authenticated users to access /auth/reset-password since they need to set their new password
    const authPages = ["/signin", "/signup"];
    if (authPages.includes(pathname) && user) {
      // User is authenticated, redirect to dashboard
      return NextResponse.redirect(new URL("/app/dashboard", request.url));
    }
    
    // Note: /auth/reset-password is intentionally NOT in the authPages array
    // because users need to be authenticated to reset their password via updateUser()
  } catch (error) {
    // If there's an error checking auth, allow the request through
    // (this prevents middleware from blocking on auth service issues)
    console.error("Middleware auth check error:", error);
  }

  return response;
}

// Configure which routes the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg).*)",
  ],
};
