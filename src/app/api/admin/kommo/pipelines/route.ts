import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = prisma as any;

// GET - Buscar pipelines do Kommo
export async function GET() {
  try {
    const session = await getSession();
    if (!session.isLoggedIn || (session.role !== "ADMIN" && session.role !== "SUPER_ADMIN")) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const settings = await db.kommoSettings.findFirst();

    if (!settings || !settings.accessToken || !settings.subdomain) {
      return NextResponse.json({ 
        error: "Configure e autorize a integração primeiro" 
      }, { status: 400 });
    }

    // Buscar pipelines do Kommo
    const response = await fetch(`https://${settings.subdomain}.kommo.com/api/v4/leads/pipelines`, {
      headers: {
        "Authorization": `Bearer ${settings.accessToken}`,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Kommo pipelines error:", error);
      
      if (response.status === 401) {
        return NextResponse.json({ 
          error: "Token expirado. Por favor, autorize novamente." 
        }, { status: 401 });
      }
      
      return NextResponse.json({ error: "Erro ao buscar pipelines" }, { status: 500 });
    }

    const data = await response.json();
    
    // Formatar pipelines para o frontend
    const pipelines = data._embedded?.pipelines?.map((pipeline: any) => ({
      id: pipeline.id,
      name: pipeline.name,
      statuses: pipeline._embedded?.statuses?.map((status: any) => ({
        id: status.id,
        name: status.name,
        color: status.color,
      })) || [],
    })) || [];

    return NextResponse.json({ pipelines });
  } catch (error) {
    console.error("Error fetching pipelines:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
