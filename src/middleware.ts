import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LEGACY_PREFIXES = [
  "/maletti",
  "/spa",
  "/tricologia",
  "/salao-de-beleza",
  "/sobre",
  "/produtos",
  "/faq",
  "/garantia",
  "/manutencao",
  "/categorias",
  "/blog/categorias",
];

const COMPANY_SLUG_REDIRECTS: Record<string, string> = {
  "/p/dest-dormer-pramet": "/p/dormer-pramet",
  "/p/solufil": "/p/solofil",
  "/p/f1300": "/p/nord-drivesystems",
  "/p/apresenta": "/p/mercosul-motores",
};

function isLegacyRoute(pathname: string) {
  return LEGACY_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/login")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    const sessionCookie = request.cookies.get("shr-admin-session");
    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  if (isLegacyRoute(pathname)) {
    return NextResponse.redirect(new URL("/", request.url), 308);
  }

  const companyRedirect = COMPANY_SLUG_REDIRECTS[pathname];
  if (companyRedirect) {
    return NextResponse.redirect(new URL(companyRedirect, request.url), 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
