import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

const EMPTY_SUMMARY = {
  processed: 0,
  synced: 0,
  errored: 0,
  skipped: 0,
};

export async function POST(request: NextRequest) {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const mode = searchParams.get("mode") || "incremental";

    const settings = await prisma.kommoSettings.findFirst();
    if (!settings?.enabled || !settings.accessToken || !settings.subdomain) {
      return NextResponse.json(
        { error: "Integração Kommo não está configurada e ativa" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error:
          "A sincronizacao CRM + Kommo esta desativada nesta versao. O schema atual nao possui os campos de rastreamento necessarios para sincronizacao incremental.",
        mode,
        contacts: EMPTY_SUMMARY,
        clients: EMPTY_SUMMARY,
      },
      { status: 501 }
    );
  } catch (error) {
    console.error("CRM sync error:", error);
    return NextResponse.json({ error: "Erro ao sincronizar CRM com Kommo" }, { status: 500 });
  }
}
