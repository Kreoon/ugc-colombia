import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { CookieOptions } from "@supabase/ssr";

const COUNTRY_HEADER = "x-ugc-country";
const COUNTRY_COOKIE = "ugc_country";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

const PUBLIC_ADMIN_ROUTES = ["/admin/login", "/admin/invitacion"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Si no es admin, pass-through rápido. Solo detectar país para SEO.
  if (!pathname.startsWith("/admin")) {
    const country = req.headers.get("x-vercel-ip-country");
    if (!country) return NextResponse.next();

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set(COUNTRY_HEADER, country);
    const response = NextResponse.next({ request: { headers: requestHeaders } });
    if (req.cookies.get(COUNTRY_COOKIE)?.value !== country) {
      response.cookies.set(COUNTRY_COOKIE, country, {
        path: "/",
        maxAge: COOKIE_MAX_AGE,
        sameSite: "lax",
      });
    }
    return response;
  }

  // Rutas admin públicas (login, invitación) pasan sin chequeo
  const isPublicAdmin = PUBLIC_ADMIN_ROUTES.some((r) =>
    pathname.startsWith(r)
  );
  if (isPublicAdmin) {
    return NextResponse.next();
  }

  // Validar env vars antes de crear el cliente — fallar rápido si faltan
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.redirect(new URL("/admin/login?error=config", req.url));
  }

  let response = NextResponse.next();

  try {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll(
          cookiesToSet: { name: string; value: string; options: CookieOptions }[]
        ) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    });

    // Timeout defensivo: 3s es suficiente, si supabase no responde, tratarlo como no-logueado
    const userPromise = supabase.auth.getUser();
    const timeoutPromise = new Promise<{ data: { user: null } }>((resolve) =>
      setTimeout(() => resolve({ data: { user: null } }), 3000)
    );
    const {
      data: { user },
    } = await Promise.race([userPromise, timeoutPromise]);

    if (!user) {
      const redirectUrl = new URL("/admin/login", req.url);
      redirectUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(redirectUrl);
    }

    return response;
  } catch (err) {
    console.error("[middleware] Supabase auth error:", err);
    return NextResponse.redirect(new URL("/admin/login?error=auth", req.url));
  }
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/((?!admin|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|svg|gif|webp|avif|ico|mp4|webm|pdf|woff2?)).*)",
  ],
};
