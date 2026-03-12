import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";
import { getCompanyNameFromSlug, normalizeCompanySlug } from "@/lib/lead-context";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = prisma as any;

interface LeadPayload {
  name: string;
  email?: string;
  phone?: string;
  message?: string;
  source?: string;
  companySlug?: string;
  companyName?: string;
  interestType?: string;
  originPage?: string;
}

function buildLeadContext(payload: LeadPayload) {
  const companySlug = normalizeCompanySlug(payload.companySlug);
  const companyName =
    (payload.companyName || "").trim() || getCompanyNameFromSlug(companySlug) || "Não informada";
  const originPage = (payload.originPage || "").trim() || "site";
  const interestType = (payload.interestType || "").trim() || "consultoria-catalogo";
  const source = (payload.source || "").trim() || `Site - ${originPage} - ${interestType}`;

  return {
    companySlug,
    companyName,
    originPage,
    interestType,
    source,
  };
}

function buildLeadNote(payload: LeadPayload, context: ReturnType<typeof buildLeadContext>) {
  const lines = [
    `📧 Email: ${payload.email || "Não informado"}`,
    `📱 Telefone: ${payload.phone || "Não informado"}`,
    `📍 Origem: ${context.source}`,
    `🏢 Empresa: ${context.companyName}`,
    `🔖 Slug Empresa: ${context.companySlug || "Não informado"}`,
    `🎯 Interesse: ${context.interestType}`,
    `🌐 Página: ${context.originPage}`,
    "",
    "💬 Mensagem:",
    payload.message || "Sem mensagem adicional",
  ];
  return lines.join("\n");
}

async function sendFallbackEmail(payload: LeadPayload, context: ReturnType<typeof buildLeadContext>) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || "0");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.LEAD_FALLBACK_TO;

  if (!host || !port || !user || !pass || !to) {
    return { sent: false, reason: "Configuração SMTP ausente" };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const subject = `[Lead Fallback] ${context.companyName} | ${context.interestType}`;
  const note = buildLeadNote(payload, context);

  await transporter.sendMail({
    from: user,
    to,
    replyTo: payload.email || undefined,
    subject,
    text: note,
    html: note.replace(/\n/g, "<br />"),
  });

  return { sent: true };
}

function invalidPayload(payload: LeadPayload) {
  if (!payload?.name || payload.name.trim().length < 2) return "Nome é obrigatório";
  if (!payload?.email && !payload?.phone) return "Informe e-mail ou telefone";
  return "";
}

async function createContactInKommo(baseUrl: string, accessToken: string, payload: LeadPayload) {
  const contactResponse = await fetch(`${baseUrl}/api/v4/contacts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      {
        name: payload.name,
        custom_fields_values: [
          ...(payload.email
            ? [
                {
                  field_code: "EMAIL",
                  values: [{ value: payload.email, enum_code: "WORK" }],
                },
              ]
            : []),
          ...(payload.phone
            ? [
                {
                  field_code: "PHONE",
                  values: [{ value: payload.phone, enum_code: "WORK" }],
                },
              ]
            : []),
        ],
      },
    ]),
  });

  if (!contactResponse.ok) return null;

  const contactData = await contactResponse.json();
  return contactData?._embedded?.contacts?.[0]?.id || null;
}

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as LeadPayload;
    const validationError = invalidPayload(payload);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const context = buildLeadContext(payload);
    const noteText = buildLeadNote(payload, context);

    const settings = await db.kommoSettings.findFirst();
    const kommoReady =
      settings && settings.enabled && settings.accessToken && settings.subdomain;

    if (!kommoReady) {
      const fallbackResult = await sendFallbackEmail(payload, context).catch((error) => ({
        sent: false,
        reason: error instanceof Error ? error.message : String(error),
      }));

      if (fallbackResult.sent) {
        return NextResponse.json({
          success: true,
          message: "Lead recebido via fallback de e-mail",
          fallback: "email",
        });
      }

      return NextResponse.json(
        { error: "Integração não configurada", details: fallbackResult.reason },
        { status: 500 }
      );
    }

    const baseUrl = `https://${settings.subdomain}.kommo.com`;
    const accessToken = settings.accessToken;

    const contactId = await createContactInKommo(baseUrl, accessToken, payload);

    const leadPayload: Record<string, unknown>[] = [
      {
        name: `${context.source} - ${payload.name}`,
        ...(settings.pipelineId && { pipeline_id: settings.pipelineId }),
        ...(contactId && {
          _embedded: {
            contacts: [{ id: contactId }],
          },
        }),
      },
    ];

    const leadResponse = await fetch(`${baseUrl}/api/v4/leads`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(leadPayload),
    });

    if (!leadResponse.ok) {
      const errorText = await leadResponse.text();
      const fallbackResult = await sendFallbackEmail(payload, context).catch((error) => ({
        sent: false,
        reason: error instanceof Error ? error.message : String(error),
      }));

      if (fallbackResult.sent) {
        return NextResponse.json({
          success: true,
          message: "Lead recebido via fallback de e-mail",
          fallback: "email",
          kommoError: errorText,
        });
      }

      return NextResponse.json(
        { error: "Erro ao criar lead no CRM", details: errorText },
        { status: 500 }
      );
    }

    const leadData = await leadResponse.json();
    const leadId = leadData._embedded?.leads?.[0]?.id;

    if (leadId) {
      await fetch(`${baseUrl}/api/v4/leads/${leadId}/notes`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          {
            note_type: "common",
            params: {
              text: noteText,
            },
          },
        ]),
      }).catch(() => {
        // não bloqueia sucesso do lead se nota falhar
      });
    }

    return NextResponse.json({
      success: true,
      message: "Lead criado com sucesso",
      leadId,
      contactId,
      source: context.source,
    });
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      { error: "Erro interno ao processar lead" },
      { status: 500 }
    );
  }
}
