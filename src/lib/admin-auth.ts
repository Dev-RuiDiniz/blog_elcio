import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function requireAdminAuth(): Promise<NextResponse | null> {
  const session = await getSession();

  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  if (session.role !== "ADMIN" && session.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
  }

  return null;
}
