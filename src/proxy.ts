import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSafeRedirectPath } from "@/lib/auth";
import { getSupabaseConfig } from "@/lib/supabase/config";

const authPages = new Set(["/login", "/signup"]);

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const isApiRequest = pathname.startsWith("/api/");
  const isAuthPage = authPages.has(pathname);
  const config = getSupabaseConfig();

  if (!config) {
    if (isApiRequest) {
      return Response.json(
        { error: "Supabase authentication is not configured." },
        { status: 503 },
      );
    }
    if (isAuthPage) {
      return NextResponse.next();
    }

    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("error", "auth_unconfigured");
    loginUrl.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  let response = NextResponse.next({ request });
  const supabase = createServerClient(config.url, config.key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value);
        }
        response = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
      },
    },
  });
  // Page checks are optimistic; the dashboard layout performs the authoritative check.
  const user = isApiRequest
    ? (await supabase.auth.getUser()).data.user
    : (await supabase.auth.getSession()).data.session?.user ?? null;

  if (!user && !isAuthPage) {
    if (isApiRequest) {
      return Response.json({ error: "Authentication required." }, { status: 401 });
    }

    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  if (user && isAuthPage) {
    const destination = getSafeRedirectPath(
      request.nextUrl.searchParams.get("next"),
    );
    return NextResponse.redirect(new URL(destination, request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/",
    "/customers/:path*",
    "/orders/:path*",
    "/analytics/:path*",
    "/settings/:path*",
    "/login",
    "/signup",
    "/api/:path*",
  ],
};
