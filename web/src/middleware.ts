import { NextResponse, type NextRequest } from "next/server";

const COUNTRY_HEADER = "x-ugc-country";
const COUNTRY_COOKIE = "ugc_country";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

export function middleware(req: NextRequest) {
  const country = req.headers.get("x-vercel-ip-country");

  const requestHeaders = new Headers(req.headers);
  if (country) requestHeaders.set(COUNTRY_HEADER, country);

  const res = NextResponse.next({ request: { headers: requestHeaders } });

  if (country && req.cookies.get(COUNTRY_COOKIE)?.value !== country) {
    res.cookies.set(COUNTRY_COOKIE, country, {
      path: "/",
      maxAge: COOKIE_MAX_AGE,
      sameSite: "lax",
    });
  }

  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/|assets/|brand/|.*\\.(?:png|jpg|jpeg|gif|svg|webp|avif|ico|txt|xml|json|woff2?|ttf|eot)).*)",
  ],
};
