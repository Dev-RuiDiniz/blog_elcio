import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = prisma as any;

// GET - Buscar configurações do Kommo
export async function GET() {
  try {
    const session = await getSession();
    if (!session.isLoggedIn || (session.role !== "ADMIN" && session.role !== "SUPER_ADMIN")) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    let settings = await db.kommoSettings.findFirst();
    
    if (!settings) {
      // Criar registro padrão se não existir
      settings = await db.kommoSettings.create({
        data: {
          enabled: false,
        },
      });
    }

    // Não retornar tokens sensíveis completos
    return NextResponse.json({
      id: settings.id,
      enabled: settings.enabled,
      subdomain: settings.subdomain,
      clientId: settings.clientId,
      clientSecret: settings.clientSecret ? "••••••••" : null,
      hasAccessToken: !!settings.accessToken,
      tokenExpiresAt: settings.tokenExpiresAt,
      pipelineId: settings.pipelineId,
      pipelineName: settings.pipelineName,
      statusId: settings.statusId,
      statusName: settings.statusName,
    });
  } catch (error) {
    console.error("Error fetching Kommo settings:", error);
    return NextResponse.json({ error: "Erro ao buscar configurações" }, { status: 500 });
  }
}

// PUT - Atualizar configurações do Kommo
export async function PUT(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session.isLoggedIn || (session.role !== "ADMIN" && session.role !== "SUPER_ADMIN")) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const data = await request.json();
    const { enabled, subdomain, clientId, clientSecret, pipelineId, pipelineName, statusId, statusName } = data;

    let settings = await db.kommoSettings.findFirst();

    if (!settings) {
      settings = await db.kommoSettings.create({
        data: {
          enabled: enabled ?? false,
          subdomain,
          clientId,
          clientSecret,
          pipelineId,
          pipelineName,
          statusId,
          statusName,
        },
      });
    } else {
      const updateData: Record<string, unknown> = {
        enabled: enabled ?? settings.enabled,
        subdomain: subdomain ?? settings.subdomain,
        clientId: clientId ?? settings.clientId,
        pipelineId: pipelineId !== undefined ? pipelineId : settings.pipelineId,
        pipelineName: pipelineName !== undefined ? pipelineName : settings.pipelineName,
        statusId: statusId !== undefined ? statusId : settings.statusId,
        statusName: statusName !== undefined ? statusName : settings.statusName,
      };

      // Só atualiza clientSecret se foi enviado um novo valor (não o mascarado)
      if (clientSecret && clientSecret !== "••••••••") {
        updateData.clientSecret = clientSecret;
      }

      settings = await db.kommoSettings.update({
        where: { id: settings.id },
        data: updateData,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Configurações atualizadas",
    });
  } catch (error) {
    console.error("Error updating Kommo settings:", error);
    return NextResponse.json({ error: "Erro ao atualizar configurações" }, { status: 500 });
  }
}
