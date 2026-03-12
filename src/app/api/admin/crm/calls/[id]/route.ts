import { CallDirection, CallOutcome, Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

function parseCallDirection(value: string | undefined): CallDirection | undefined {
  if (!value) return undefined;
  return Object.values(CallDirection).includes(value as CallDirection)
    ? (value as CallDirection)
    : undefined;
}

function parseCallOutcome(value: string | undefined): CallOutcome | undefined {
  if (!value) return undefined;
  return Object.values(CallOutcome).includes(value as CallOutcome)
    ? (value as CallOutcome)
    : undefined;
}

function parseDate(value: string | null | undefined): Date | null {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function cleanString(value: string | null | undefined): string | null {
  const normalized = (value || "").trim();
  return normalized.length > 0 ? normalized : null;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  try {
    const { id } = await params;
    const call = await prisma.callLog.findUnique({
      where: { id },
      include: {
        client: { select: { id: true, name: true, stage: true, status: true } },
        contact: { select: { id: true, fullName: true, email: true, phone: true, whatsapp: true } },
        ownerUser: { select: { id: true, name: true, email: true } },
      },
    });

    if (!call) {
      return NextResponse.json({ error: "Chamada não encontrada" }, { status: 404 });
    }

    return NextResponse.json({ call });
  } catch (error) {
    console.error("Error fetching call:", error);
    return NextResponse.json({ error: "Erro ao buscar chamada" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  try {
    const { id } = await params;
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

    const existing = await prisma.callLog.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Chamada não encontrada" }, { status: 404 });
    }

    const data: Prisma.CallLogUncheckedUpdateInput = {
      clientId: body.clientId !== undefined ? cleanString(body.clientId) : existing.clientId,
      contactId: body.contactId !== undefined ? cleanString(body.contactId) : existing.contactId,
      ownerUserId: body.ownerUserId !== undefined ? cleanString(body.ownerUserId) : existing.ownerUserId,
      direction: parseCallDirection(body.direction) || existing.direction,
      outcome: parseCallOutcome(body.outcome) || existing.outcome,
      subject: body.subject !== undefined ? cleanString(body.subject) : existing.subject,
      summary: body.summary !== undefined ? cleanString(body.summary) : existing.summary,
      durationSeconds:
        body.durationSeconds !== undefined ? body.durationSeconds : existing.durationSeconds,
      startedAt: body.startedAt !== undefined ? parseDate(body.startedAt) || existing.startedAt : existing.startedAt,
      nextActionAt:
        body.nextActionAt !== undefined ? parseDate(body.nextActionAt) : existing.nextActionAt,
    };

    const call = await prisma.callLog.update({
      where: { id },
      data,
    });

    return NextResponse.json({ success: true, call });
  } catch (error) {
    console.error("Error updating call:", error);
    return NextResponse.json({ error: "Erro ao atualizar chamada" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  try {
    const { id } = await params;
    await prisma.callLog.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting call:", error);
    return NextResponse.json({ error: "Erro ao remover chamada" }, { status: 500 });
  }
}
