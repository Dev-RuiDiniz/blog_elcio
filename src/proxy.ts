import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COMPANY_SLUG_REDIRECTS: Record<string, string> = {
  "/p/solufil": "/p/solofil",
  "/p/f1300": "/p/nord-drivesystems",
  "/p/apresenta": "/p/mercosul-motores",
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const frontendOnly = process.env.FRONTEND_ONLY_DEPLOY === "1";

  if (frontendOnly) {
    if (pathname.startsWith("/admin") || pathname.startsWith("/login")) {
      return NextResponse.redirect(new URL("/", request.url), 307);
    }

    if (
      pathname.startsWith("/api/admin") ||
      pathname.startsWith("/api/auth") ||
      pathname.startsWith("/api/upload")
    ) {
      return new NextResponse("Not Found", { status: 404 });
    }
  }

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
    const sessionCookie = request.cookies.get("elcio-admin-session");
    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
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
