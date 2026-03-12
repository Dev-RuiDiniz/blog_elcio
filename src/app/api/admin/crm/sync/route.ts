import { KommoSyncStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

interface SyncSummary {
  processed: number;
  synced: number;
  errored: number;
  skipped: number;
}

type KommoEntity = "contacts" | "leads";

async function probeKommoEntity(
  subdomain: string,
  accessToken: string,
  entity: KommoEntity,
  id: number
) {
  const response = await fetch(`https://${subdomain}.kommo.com/api/v4/${entity}/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.ok) {
    return { ok: true, status: response.status };
  }

  return { ok: false, status: response.status };
}

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

    const contactWhere =
      mode === "full"
        ? {
            OR: [{ kommoContactId: { not: null } }, { kommoLeadId: { not: null } }],
          }
        : {
            OR: [{ kommoSyncStatus: KommoSyncStatus.PENDING }, { lastSyncedAt: null }],
            AND: [{ OR: [{ kommoContactId: { not: null } }, { kommoLeadId: { not: null } }] }],
          };

    const clientWhere =
      mode === "full"
        ? {
            OR: [{ kommoContactId: { not: null } }, { kommoLeadId: { not: null } }],
          }
        : {
            OR: [{ kommoSyncStatus: KommoSyncStatus.PENDING }, { lastSyncedAt: null }],
            AND: [{ OR: [{ kommoContactId: { not: null } }, { kommoLeadId: { not: null } }] }],
          };

    const [contacts, clients] = await Promise.all([
      prisma.contact.findMany({
        where: contactWhere,
        take: 200,
      }),
      prisma.client.findMany({
        where: clientWhere,
        take: 200,
      }),
    ]);

    const contactSummary: SyncSummary = { processed: 0, synced: 0, errored: 0, skipped: 0 };
    const clientSummary: SyncSummary = { processed: 0, synced: 0, errored: 0, skipped: 0 };

    for (const contact of contacts) {
      contactSummary.processed += 1;

      const contactChecks = [];
      if (contact.kommoContactId) {
        contactChecks.push(
          probeKommoEntity(settings.subdomain, settings.accessToken, "contacts", contact.kommoContactId)
        );
      }
      if (contact.kommoLeadId) {
        contactChecks.push(
          probeKommoEntity(settings.subdomain, settings.accessToken, "leads", contact.kommoLeadId)
        );
      }

      if (contactChecks.length === 0) {
        contactSummary.skipped += 1;
        continue;
      }

      const results = await Promise.all(contactChecks);
      const failed = results.find((result) => !result.ok);

      await prisma.contact.update({
        where: { id: contact.id },
        data: {
          kommoSyncStatus: failed ? KommoSyncStatus.ERROR : KommoSyncStatus.SYNCED,
          lastSyncedAt: new Date(),
        },
      });

      if (failed) contactSummary.errored += 1;
      else contactSummary.synced += 1;
    }

    for (const client of clients) {
      clientSummary.processed += 1;

      const clientChecks = [];
      if (client.kommoContactId) {
        clientChecks.push(
          probeKommoEntity(settings.subdomain, settings.accessToken, "contacts", client.kommoContactId)
        );
      }
      if (client.kommoLeadId) {
        clientChecks.push(
          probeKommoEntity(settings.subdomain, settings.accessToken, "leads", client.kommoLeadId)
        );
      }

      if (clientChecks.length === 0) {
        clientSummary.skipped += 1;
        continue;
      }

      const results = await Promise.all(clientChecks);
      const failed = results.find((result) => !result.ok);

      await prisma.client.update({
        where: { id: client.id },
        data: {
          kommoSyncStatus: failed ? KommoSyncStatus.ERROR : KommoSyncStatus.SYNCED,
          lastSyncedAt: new Date(),
        },
      });

      if (failed) clientSummary.errored += 1;
      else clientSummary.synced += 1;
    }

    await prisma.kommoSettings.update({
      where: { id: settings.id },
      data: { lastSyncAt: new Date() },
    });

    return NextResponse.json({
      success: true,
      mode,
      contacts: contactSummary,
      clients: clientSummary,
    });
  } catch (error) {
    console.error("CRM sync error:", error);
    return NextResponse.json({ error: "Erro ao sincronizar CRM com Kommo" }, { status: 500 });
  }
}
