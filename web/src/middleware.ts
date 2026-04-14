import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { CookieOptions } from "@supabase/ssr";

const COUNTRY_HEADER = "x-ugc-country";
const COUNTRY_COOKIE = "ugc_country";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

const PUBLIC_ADMIN_ROUTES = ["/admin/login", "/admin/invitacion"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Detect country (mantenemos lógica existente)
  const country = req.headers.get("x-vercel-ip-country");
  const requestHeaders = new Headers(req.headers);
  if (country) requestHeaders.set(COUNTRY_HEADER, country);

  let response = NextResponse.next({ request: { headers: requestHeaders } });

  // Persistir cookie de país
  if (country && req.cookies.get(COUNTRY_COOKIE)?.value !== country) {
    response.cookies.set(COUNTRY_COOKIE, country, {
      path: "/",
      maxAge: COOKIE_MAX_AGE,
      sameSite: "lax",
    });
  }

  // Solo proteger rutas /admin
  if (!pathname.startsWith("/admin")) {
    return response;
  }

  // Rutas públicas del admin (login, invitación)
  const isPublicAdmin = PUBLIC_ADMIN_ROUTES.some((r) =>
    pathname.startsWith(r)
  );

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
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
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // No logueado intentando entrar a admin protegido
  if (!user && !isPublicAdmin) {
    const redirectUrl = new URL("/admin/login", req.url);
    redirectUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Logueado yendo al login → redirigir al admin
  if (user && pathname === "/admin/login") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|svg|gif|webp|avif|ico|mp4|webm|pdf|woff2?)).*)",
  ],
};
