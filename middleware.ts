import { type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Create Supabase client for middleware
  let response = request.nextResponse.clone();
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

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Protect /app/* routes - require authentication
  if (pathname.startsWith("/app")) {
    if (!user) {
      // User not authenticated, redirect to signin
      return Response.redirect(new URL("/signin", request.url));
    }
  }

  // Redirect authenticated users away from auth pages
  const authPages = ["/signin", "/signup", "/reset-password"];
  if (authPages.includes(pathname) && user) {
    // User is authenticated, redirect to dashboard
    return Response.redirect(new URL("/app/dashboard", request.url));
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
