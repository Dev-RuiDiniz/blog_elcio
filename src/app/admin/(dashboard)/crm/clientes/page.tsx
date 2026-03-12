"use client";

import { useEffect, useState } from "react";
import { HiOutlinePlus, HiOutlineRefresh } from "react-icons/hi";

type ClientStage = "LEAD" | "QUALIFIED" | "PROPOSAL" | "NEGOTIATION" | "ACTIVE" | "INACTIVE" | "LOST";
type ClientStatus = "ACTIVE" | "INACTIVE" | "PAUSED" | "LOST";

interface ClientItem {
  id: string;
  name: string;
  segment: string | null;
  stage: ClientStage;
  status: ClientStatus;
  updatedAt: string;
  _count?: { calls: number; agendaEvents: number };
}

const STAGE_LABELS: Record<ClientStage, string> = {
  LEAD: "Lead",
  QUALIFIED: "Qualificado",
  PROPOSAL: "Proposta",
  NEGOTIATION: "Negociação",
  ACTIVE: "Ativo",
  INACTIVE: "Inativo",
  LOST: "Perdido",
};

const STATUS_LABELS: Record<ClientStatus, string> = {
  ACTIVE: "Ativo",
  INACTIVE: "Inativo",
  PAUSED: "Pausado",
  LOST: "Perdido",
};

export default function AdminCrmClientesPage() {
  const [clients, setClients] = useState<ClientItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [newClientName, setNewClientName] = useState("");
  const [newClientStage, setNewClientStage] = useState<ClientStage>("LEAD");
  const [newClientStatus, setNewClientStatus] = useState<ClientStatus>("ACTIVE");
  const [creating, setCreating] = useState(false);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("limit", "50");
      params.set("onlyActive", "false");
      if (search.trim()) params.set("search", search.trim());
      if (stageFilter) params.set("stage", stageFilter);
      if (statusFilter) params.set("status", statusFilter);
      const res = await fetch(`/api/admin/crm/clients?${params.toString()}`);
      const data = await res.json();
      setClients(data.clients || []);
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, [search, stageFilter, statusFilter]);

  const handleCreate = async () => {
    if (!newClientName.trim()) return;
    setCreating(true);
    try {
      const res = await fetch("/api/admin/crm/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newClientName.trim(),
          stage: newClientStage,
          status: newClientStatus,
        }),
      });
      if (res.ok) {
        setNewClientName("");
        setNewClientStage("LEAD");
        setNewClientStatus("ACTIVE");
        fetchClients();
      }
    } catch (error) {
      console.error("Error creating client:", error);
    } finally {
      setCreating(false);
    }
  };

  const handleQuickUpdate = async (
    clientId: string,
    payload: { stage?: ClientStage; status?: ClientStatus }
  ) => {
    setSaving(clientId);
    try {
      const res = await fetch(`/api/admin/crm/clients/${clientId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        fetchClients();
      }
    } catch (error) {
      console.error("Error updating client:", error);
    } finally {
      setSaving(null);
    }
  };

  const handleInactivate = async (clientId: string) => {
    setSaving(clientId);
    try {
      const res = await fetch(`/api/admin/crm/clients/${clientId}`, {
        method: "DELETE",
      });
      if (res.ok) fetchClients();
    } catch (error) {
      console.error("Error inactivating client:", error);
    } finally {
      setSaving(null);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-semibold text-black dark:text-white">
          CRM - Clientes Ativos
        </h1>
        <p className="text-gray-400 mt-1 text-sm">
          Gestão de funil comercial com atualização rápida de etapa e status.
        </p>
      </div>

      <section className="border border-gray-200 dark:border-zinc-800 p-6 space-y-4">
        <h2 className="text-sm uppercase tracking-[0.15em] text-gray-400 font-medium">Novo Cliente</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            placeholder="Nome do cliente *"
            value={newClientName}
            onChange={(e) => setNewClientName(e.target.value)}
            className="px-3 py-2 border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm md:col-span-2"
          />
          <select
            value={newClientStage}
            onChange={(e) => setNewClientStage(e.target.value as ClientStage)}
            className="px-3 py-2 border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm"
          >
            {Object.keys(STAGE_LABELS).map((key) => (
              <option key={key} value={key}>
                {STAGE_LABELS[key as ClientStage]}
              </option>
            ))}
          </select>
          <select
            value={newClientStatus}
            onChange={(e) => setNewClientStatus(e.target.value as ClientStatus)}
            className="px-3 py-2 border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm"
          >
            {Object.keys(STATUS_LABELS).map((key) => (
              <option key={key} value={key}>
                {STATUS_LABELS[key as ClientStatus]}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleCreate}
          disabled={creating || !newClientName.trim()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white text-sm hover:bg-zinc-800 disabled:opacity-50"
        >
          <HiOutlinePlus className="h-4 w-4" />
          {creating ? "Salvando..." : "Adicionar Cliente"}
        </button>
      </section>

      <section className="border border-gray-200 dark:border-zinc-800">
        <div className="p-4 border-b border-gray-200 dark:border-zinc-800 flex flex-wrap items-center gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por cliente, segmento ou contato"
            className="px-3 py-2 border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm min-w-[280px]"
          />
          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm"
          >
            <option value="">Todas as etapas</option>
            {Object.keys(STAGE_LABELS).map((key) => (
              <option key={key} value={key}>
                {STAGE_LABELS[key as ClientStage]}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm"
          >
            <option value="">Todos os status</option>
            {Object.keys(STATUS_LABELS).map((key) => (
              <option key={key} value={key}>
                {STATUS_LABELS[key as ClientStatus]}
              </option>
            ))}
          </select>
          <button
            onClick={fetchClients}
            className="inline-flex items-center gap-1 px-3 py-2 text-xs border border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800"
          >
            <HiOutlineRefresh className="h-4 w-4" />
            Atualizar
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-zinc-800">
                <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-gray-500">Cliente</th>
                <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-gray-500">Etapa</th>
                <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-gray-500">Status</th>
                <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-gray-500">Atividade</th>
                <th className="px-4 py-3 text-right text-xs uppercase tracking-wide text-gray-500">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-gray-400 text-sm">
                    Carregando clientes...
                  </td>
                </tr>
              ) : clients.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-gray-400 text-sm">
                    Nenhum cliente encontrado
                  </td>
                </tr>
              ) : (
                clients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50 dark:hover:bg-zinc-900/40">
                    <td className="px-4 py-3 text-sm">
                      <p className="text-black dark:text-white font-medium">{client.name}</p>
                      <p className="text-gray-500">{client.segment || "-"}</p>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={client.stage}
                        onChange={(e) =>
                          handleQuickUpdate(client.id, { stage: e.target.value as ClientStage })
                        }
                        className="px-2 py-1 border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs"
                      >
                        {Object.keys(STAGE_LABELS).map((key) => (
                          <option key={key} value={key}>
                            {STAGE_LABELS[key as ClientStage]}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={client.status}
                        onChange={(e) =>
                          handleQuickUpdate(client.id, { status: e.target.value as ClientStatus })
                        }
                        className="px-2 py-1 border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs"
                      >
                        {Object.keys(STATUS_LABELS).map((key) => (
                          <option key={key} value={key}>
                            {STATUS_LABELS[key as ClientStatus]}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-300">
                      <div>Chamadas: {client._count?.calls || 0}</div>
                      <div>Agenda: {client._count?.agendaEvents || 0}</div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleInactivate(client.id)}
                        disabled={saving === client.id}
                        className="px-3 py-1 text-xs border border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-50"
                      >
                        {saving === client.id ? "Salvando..." : "Inativar"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
