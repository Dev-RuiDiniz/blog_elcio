import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get("host") || "";

  // Skip static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Multi-domain routing
  const isMaletti = hostname.includes("maletti.com.br") || hostname.includes("localhost:3001") || hostname.includes("maletti.local");
  const isSHR = hostname.includes("shrhair.com.br") || hostname.includes("localhost:3000") || hostname.includes("localhost:3002") || hostname.includes("localhost:3003");

  // Maletti domain routing
  if (isMaletti) {
    // Landing pages permanecem no path original
    if (pathname === "/tricologia" || pathname === "/salao-de-beleza" || pathname === "/spa") {
      return NextResponse.next();
    }
    
    // Redireciona raiz e outras rotas para /maletti
    if (!pathname.startsWith("/maletti") && !pathname.startsWith("/login") && !pathname.startsWith("/admin")) {
      const url = request.nextUrl.clone();
      url.pathname = `/maletti${pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  // SHR domain - serve (site) routes normally
  if (isSHR) {
    // Block /maletti routes on shrhair domain (except for admin preview)
    const isPreview = request.nextUrl.searchParams.get("preview") === "true";
    if (pathname.startsWith("/maletti") && !isPreview) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Skip login routes
  if (pathname.startsWith("/login")) {
    return NextResponse.next();
  }

  // Protect admin routes - check session cookie exists
  if (pathname.startsWith("/admin")) {
    const sessionCookie = request.cookies.get("shr-admin-session");
    
    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
