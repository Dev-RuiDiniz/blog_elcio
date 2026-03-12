"use client";

import { useEffect, useState } from "react";
import { HiOutlinePlus, HiOutlineRefresh } from "react-icons/hi";

type AgendaEventType = "TASK" | "CALL" | "MEETING" | "FOLLOW_UP" | "VISIT";

interface AgendaItem {
  id: string;
  type: AgendaEventType;
  title: string;
  status: string;
  startsAt: string;
  endsAt: string | null;
  client: { id: string; name: string } | null;
  contact: { id: string; fullName: string } | null;
}

const TYPE_LABELS: Record<AgendaEventType, string> = {
  TASK: "Tarefa",
  CALL: "Ligação",
  MEETING: "Reunião",
  FOLLOW_UP: "Follow-up",
  VISIT: "Visita",
};

const STATUS_OPTIONS = ["OPEN", "DONE", "CANCELLED"];

export default function AdminCrmAgendaPage() {
  const [events, setEvents] = useState<AgendaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [form, setForm] = useState({
    type: "TASK" as AgendaEventType,
    title: "",
    startsAt: "",
    endsAt: "",
    status: "OPEN",
  });

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("limit", "50");
      if (statusFilter) params.set("status", statusFilter);
      if (typeFilter) params.set("type", typeFilter);

      const res = await fetch(`/api/admin/crm/agenda?${params.toString()}`);
      const data = await res.json();
      setEvents(data.events || []);
    } catch (error) {
      console.error("Error fetching agenda:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [statusFilter, typeFilter]);

  const handleCreate = async () => {
    if (!form.title.trim() || !form.startsAt) return;
    setSaving("new");
    try {
      const res = await fetch("/api/admin/crm/agenda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: form.type,
          title: form.title.trim(),
          startsAt: form.startsAt,
          endsAt: form.endsAt || null,
          status: form.status,
        }),
      });
      if (res.ok) {
        setForm({
          type: "TASK",
          title: "",
          startsAt: "",
          endsAt: "",
          status: "OPEN",
        });
        fetchEvents();
      }
    } catch (error) {
      console.error("Error creating agenda event:", error);
    } finally {
      setSaving(null);
    }
  };

  const handleStatusUpdate = async (eventId: string, status: string) => {
    setSaving(eventId);
    try {
      const res = await fetch(`/api/admin/crm/agenda/${eventId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) fetchEvents();
    } catch (error) {
      console.error("Error updating agenda event:", error);
    } finally {
      setSaving(null);
    }
  };

  const handleDelete = async (eventId: string) => {
    setSaving(eventId);
    try {
      const res = await fetch(`/api/admin/crm/agenda/${eventId}`, { method: "DELETE" });
      if (res.ok) fetchEvents();
    } catch (error) {
      console.error("Error deleting agenda event:", error);
    } finally {
      setSaving(null);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-semibold text-black dark:text-white">CRM - Agenda</h1>
        <p className="text-gray-400 mt-1 text-sm">
          Agenda interna de compromissos e follow-ups do funil comercial.
        </p>
      </div>

      <section className="border border-gray-200 dark:border-zinc-800 p-6 space-y-4">
        <h2 className="text-sm uppercase tracking-[0.15em] text-gray-400 font-medium">Novo Compromisso</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <select
            value={form.type}
            onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value as AgendaEventType }))}
            className="px-3 py-2 border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm"
          >
            {Object.keys(TYPE_LABELS).map((key) => (
              <option key={key} value={key}>
                {TYPE_LABELS[key as AgendaEventType]}
              </option>
            ))}
          </select>
          <input
            placeholder="Título *"
            value={form.title}
            onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
            className="px-3 py-2 border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm md:col-span-2"
          />
          <input
            type="datetime-local"
            value={form.startsAt}
            onChange={(e) => setForm((prev) => ({ ...prev, startsAt: e.target.value }))}
            className="px-3 py-2 border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm"
          />
          <select
            value={form.status}
            onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
            className="px-3 py-2 border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm"
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleCreate}
          disabled={saving === "new"}
          className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white text-sm hover:bg-zinc-800 disabled:opacity-50"
        >
          <HiOutlinePlus className="h-4 w-4" />
          {saving === "new" ? "Salvando..." : "Adicionar Evento"}
        </button>
      </section>

      <section className="border border-gray-200 dark:border-zinc-800">
        <div className="p-4 border-b border-gray-200 dark:border-zinc-800 flex flex-wrap items-center gap-3">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm"
          >
            <option value="">Todos os tipos</option>
            {Object.keys(TYPE_LABELS).map((key) => (
              <option key={key} value={key}>
                {TYPE_LABELS[key as AgendaEventType]}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm"
          >
            <option value="">Todos os status</option>
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <button
            onClick={fetchEvents}
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
                <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-gray-500">Evento</th>
                <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-gray-500">Data</th>
                <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-gray-500">Vínculo</th>
                <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-gray-500">Status</th>
                <th className="px-4 py-3 text-right text-xs uppercase tracking-wide text-gray-500">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-gray-400 text-sm">
                    Carregando agenda...
                  </td>
                </tr>
              ) : events.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-gray-400 text-sm">
                    Nenhum evento encontrado
                  </td>
                </tr>
              ) : (
                events.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50 dark:hover:bg-zinc-900/40">
                    <td className="px-4 py-3 text-sm">
                      <p className="text-black dark:text-white font-medium">{event.title}</p>
                      <p className="text-gray-500">{TYPE_LABELS[event.type]}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {new Date(event.startsAt).toLocaleString("pt-BR")}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      <div>Cliente: {event.client?.name || "-"}</div>
                      <div>Contato: {event.contact?.fullName || "-"}</div>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={event.status}
                        onChange={(e) => handleStatusUpdate(event.id, e.target.value)}
                        className="px-2 py-1 border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs"
                        disabled={saving === event.id}
                      >
                        {STATUS_OPTIONS.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleDelete(event.id)}
                        disabled={saving === event.id}
                        className="px-3 py-1 text-xs border border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-50"
                      >
                        Excluir
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
