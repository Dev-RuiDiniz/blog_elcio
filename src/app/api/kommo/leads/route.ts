import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = prisma as any;

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, email, phone, message, source } = data;

    // Buscar configurações do banco de dados
    const settings = await db.kommoSettings.findFirst();

    if (!settings || !settings.enabled || !settings.accessToken || !settings.subdomain) {
      console.error("Kommo integration not configured or disabled");
      return NextResponse.json(
        { error: "Integração não configurada" },
        { status: 500 }
      );
    }

    const baseUrl = `https://${settings.subdomain}.kommo.com`;
    const accessToken = settings.accessToken;

    // 1. Criar contato primeiro
    const contactResponse = await fetch(`${baseUrl}/api/v4/contacts`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        {
          name: name,
          custom_fields_values: [
            ...(email ? [{
              field_code: "EMAIL",
              values: [{ value: email, enum_code: "WORK" }]
            }] : []),
            ...(phone ? [{
              field_code: "PHONE",
              values: [{ value: phone, enum_code: "WORK" }]
            }] : [])
          ]
        }
      ]),
    });

    let contactId = null;
    if (contactResponse.ok) {
      const contactData = await contactResponse.json();
      contactId = contactData._embedded?.contacts?.[0]?.id;
    }

    // 2. Criar o lead
    // Nota: Não enviar status_id para usar o status padrão do pipeline
    const leadPayload: Record<string, unknown>[] = [
      {
        name: `${source || "Site SHR"} - ${name}`,
        // Usar apenas pipeline_id - o Kommo vai usar o primeiro status automaticamente
        ...(settings.pipelineId && { pipeline_id: settings.pipelineId }),
        ...(contactId && {
          _embedded: {
            contacts: [{ id: contactId }]
          }
        })
      }
    ];

    const leadResponse = await fetch(`${baseUrl}/api/v4/leads`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(leadPayload),
    });

    if (!leadResponse.ok) {
      const errorText = await leadResponse.text();
      console.error("Kommo API Error:", errorText);
      return NextResponse.json(
        { error: "Erro ao criar lead no CRM", details: errorText },
        { status: 500 }
      );
    }

    const leadData = await leadResponse.json();
    const leadId = leadData._embedded?.leads?.[0]?.id;

    // 3. Adicionar nota com a mensagem
    if (message && leadId) {
      const noteText = `📧 Email: ${email || "Não informado"}\n📱 Telefone: ${phone || "Não informado"}\n📍 Origem: ${source || "Site SHR"}\n\n💬 Mensagem:\n${message}`;
      
      await fetch(`${baseUrl}/api/v4/leads/${leadId}/notes`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          {
            note_type: "common",
            params: {
              text: noteText
            }
          }
        ]),
      });
    }

    return NextResponse.json({
      success: true,
      message: "Lead criado com sucesso",
      leadId: leadId,
      contactId: contactId
    });

  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      { error: "Erro interno ao processar lead" },
      { status: 500 }
    );
  }
}
