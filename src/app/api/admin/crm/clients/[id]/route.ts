import { ClientStage, ClientStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { requireAdminAuth } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { updateClientWithHistory } from "@/lib/crm/domain";

function parseClientStage(value: string | undefined): ClientStage | undefined {
  if (!value) return undefined;
  return Object.values(ClientStage).includes(value as ClientStage)
    ? (value as ClientStage)
    : undefined;
}

function parseClientStatus(value: string | undefined): ClientStatus | undefined {
  if (!value) return undefined;
  return Object.values(ClientStatus).includes(value as ClientStatus)
    ? (value as ClientStatus)
    : undefined;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  try {
    const { id } = await params;
    const client = await prisma.client.findUnique({
      where: { id },
      include: {
        ownerUser: { select: { id: true, name: true, email: true } },
        contactLinks: {
          include: {
            contact: {
              select: {
                id: true,
                fullName: true,
                email: true,
                phone: true,
                whatsapp: true,
                companyName: true,
              },
            },
          },
        },
        statusHistory: {
          orderBy: { createdAt: "desc" },
          include: {
            changedByUser: {
              select: { id: true, name: true, email: true },
            },
          },
          take: 50,
        },
        calls: {
          orderBy: { startedAt: "desc" },
          take: 50,
        },
        agendaEvents: {
          orderBy: { startsAt: "asc" },
          take: 50,
        },
      },
    });

    if (!client) {
      return NextResponse.json({ error: "Cliente não encontrado" }, { status: 404 });
    }

    return NextResponse.json({ client });
  } catch (error) {
    console.error("Error fetching client:", error);
    return NextResponse.json({ error: "Erro ao buscar cliente" }, { status: 500 });
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
    const session = await getSession();
    const body = (await request.json()) as {
      name?: string;
      segment?: string | null;
      stage?: ClientStage;
      status?: ClientStatus;
      notes?: string | null;
      ownerUserId?: string | null;
      contactIds?: string[];
      valueEstimate?: number | string | null;
      kommoContactId?: number | null;
      kommoLeadId?: number | null;
      historyNote?: string | null;
    };

    const client = await updateClientWithHistory({
      clientId: id,
      name: body.name,
      segment: body.segment,
      stage: parseClientStage(body.stage),
      status: parseClientStatus(body.status),
      notes: body.notes,
      ownerUserId: body.ownerUserId,
      contactIds: Array.isArray(body.contactIds) ? body.contactIds : undefined,
      valueEstimate: body.valueEstimate,
      kommoContactId: body.kommoContactId,
      kommoLeadId: body.kommoLeadId,
      changedByUserId: session.userId,
      historyNote: body.historyNote,
    });

    return NextResponse.json({ success: true, client });
  } catch (error) {
    console.error("Error updating client:", error);
    return NextResponse.json({ error: "Erro ao atualizar cliente" }, { status: 500 });
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
    const session = await getSession();

    const existing = await prisma.client.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Cliente não encontrado" }, { status: 404 });
    }

    await updateClientWithHistory({
      clientId: id,
      stage: ClientStage.INACTIVE,
      status: ClientStatus.INACTIVE,
      changedByUserId: session.userId,
      historyNote: "Cliente inativado",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting client:", error);
    return NextResponse.json({ error: "Erro ao inativar cliente" }, { status: 500 });
  }
}
