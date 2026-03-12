import { CallDirection, CallOutcome, Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { buildPagination, createCallWithFollowUp, parseLimit, parsePage } from "@/lib/crm/domain";

function parseCallDirection(value: string | null): CallDirection | null {
  if (!value) return null;
  return Object.values(CallDirection).includes(value as CallDirection)
    ? (value as CallDirection)
    : null;
}

function parseCallOutcome(value: string | null): CallOutcome | null {
  if (!value) return null;
  return Object.values(CallOutcome).includes(value as CallOutcome) ? (value as CallOutcome) : null;
}

function parseDate(value: string | null): Date | null {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export async function GET(request: NextRequest) {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const page = parsePage(searchParams.get("page"));
    const limit = parseLimit(searchParams.get("limit"));
    const clientId = (searchParams.get("clientId") || "").trim();
    const contactId = (searchParams.get("contactId") || "").trim();
    const ownerUserId = (searchParams.get("ownerUserId") || "").trim();
    const direction = parseCallDirection(searchParams.get("direction"));
    const outcome = parseCallOutcome(searchParams.get("outcome"));
    const from = parseDate(searchParams.get("from"));
    const to = parseDate(searchParams.get("to"));

    const where: Prisma.CallLogWhereInput = {};
    if (clientId) where.clientId = clientId;
    if (contactId) where.contactId = contactId;
    if (ownerUserId) where.ownerUserId = ownerUserId;
    if (direction) where.direction = direction;
    if (outcome) where.outcome = outcome;
    if (from || to) {
      where.startedAt = {
        ...(from ? { gte: from } : {}),
        ...(to ? { lte: to } : {}),
      };
    }

    const [calls, total] = await Promise.all([
      prisma.callLog.findMany({
        where,
        orderBy: { startedAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          client: { select: { id: true, name: true, stage: true, status: true } },
          contact: { select: { id: true, fullName: true, email: true, phone: true, whatsapp: true } },
          ownerUser: { select: { id: true, name: true, email: true } },
        },
      }),
      prisma.callLog.count({ where }),
    ]);

    return NextResponse.json({
      calls,
      pagination: buildPagination(total, page, limit),
    });
  } catch (error) {
    console.error("Error fetching calls:", error);
    return NextResponse.json({ error: "Erro ao buscar chamadas" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  try {
    const body = (await request.json()) as {
      clientId?: string | null;
      contactId?: string | null;
      ownerUserId?: string | null;
      direction?: CallDirection;
      outcome?: CallOutcome;
      subject?: string | null;
      summary?: string | null;
      durationSeconds?: number | null;
      startedAt?: string | null;
      nextActionAt?: string | null;
    };

    const direction = parseCallDirection(body.direction || null);
    if (!direction) {
      return NextResponse.json({ error: "Direção da chamada é obrigatória" }, { status: 400 });
    }

    const outcome = parseCallOutcome(body.outcome || null);
    const startedAt = parseDate(body.startedAt || null) || new Date();
    const nextActionAt = parseDate(body.nextActionAt || null);

    const { call, followUpEventId } = await createCallWithFollowUp({
      clientId: body.clientId,
      contactId: body.contactId,
      ownerUserId: body.ownerUserId,
      direction,
      outcome: outcome || CallOutcome.OTHER,
      subject: body.subject,
      summary: body.summary,
      durationSeconds: body.durationSeconds ?? null,
      startedAt,
      nextActionAt,
    });

    return NextResponse.json({
      success: true,
      call,
      followUpEventId,
    });
  } catch (error) {
    console.error("Error creating call:", error);
    return NextResponse.json({ error: "Erro ao registrar chamada" }, { status: 500 });
  }
}
