import { NextResponse, type NextRequest } from "next/server";

const COUNTRY_HEADER = "x-ugc-country";
const COUNTRY_COOKIE = "ugc_country";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

// Middleware minimalista: solo detectar país.
// La autenticación admin se valida en cada Server Component vía requireAuth(),
// que llama a Supabase directamente (evita cargar @supabase/ssr en Edge Runtime).
export function middleware(req: NextRequest) {
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

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|svg|gif|webp|avif|ico|mp4|webm|pdf|woff2?)).*)",
  ],
};
