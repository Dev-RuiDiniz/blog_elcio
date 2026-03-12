"use client";

import { useEffect, useState } from "react";
import { HiOutlinePlus, HiOutlineRefresh } from "react-icons/hi";

type CallDirection = "INBOUND" | "OUTBOUND";
type CallOutcome =
  | "NO_ANSWER"
  | "CONNECTED"
  | "FOLLOW_UP_SCHEDULED"
  | "PROPOSAL_SENT"
  | "WON"
  | "LOST"
  | "OTHER";

interface CallItem {
  id: string;
  direction: CallDirection;
  outcome: CallOutcome;
  subject: string | null;
  summary: string | null;
  startedAt: string;
  nextActionAt: string | null;
  client: { id: string; name: string } | null;
  contact: { id: string; fullName: string } | null;
}

const DIRECTION_LABELS: Record<CallDirection, string> = {
  INBOUND: "Entrada",
  OUTBOUND: "Saída",
};

const OUTCOME_LABELS: Record<CallOutcome, string> = {
  NO_ANSWER: "Sem resposta",
  CONNECTED: "Conectado",
  FOLLOW_UP_SCHEDULED: "Follow-up agendado",
  PROPOSAL_SENT: "Proposta enviada",
  WON: "Ganho",
  LOST: "Perdido",
  OTHER: "Outro",
};

export default function AdminCrmChamadasPage() {
  const [calls, setCalls] = useState<CallItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [directionFilter, setDirectionFilter] = useState("");
  const [outcomeFilter, setOutcomeFilter] = useState("");
  const [form, setForm] = useState({
    direction: "OUTBOUND" as CallDirection,
    outcome: "OTHER" as CallOutcome,
    subject: "",
    summary: "",
    nextActionAt: "",
  });

  const fetchCalls = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("limit", "50");
      if (directionFilter) params.set("direction", directionFilter);
      if (outcomeFilter) params.set("outcome", outcomeFilter);

      const res = await fetch(`/api/admin/crm/calls?${params.toString()}`);
      const data = await res.json();
      setCalls(data.calls || []);
    } catch (error) {
      console.error("Error fetching calls:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCalls();
  }, [directionFilter, outcomeFilter]);

  const handleCreate = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/crm/calls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          direction: form.direction,
          outcome: form.outcome,
          subject: form.subject.trim() || null,
          summary: form.summary.trim() || null,
          nextActionAt: form.nextActionAt || null,
        }),
      });

      if (res.ok) {
        setForm({
          direction: "OUTBOUND",
          outcome: "OTHER",
          subject: "",
          summary: "",
          nextActionAt: "",
        });
        fetchCalls();
      }
    } catch (error) {
      console.error("Error creating call:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (callId: string) => {
    try {
      const res = await fetch(`/api/admin/crm/calls/${callId}`, { method: "DELETE" });
      if (res.ok) fetchCalls();
    } catch (error) {
      console.error("Error deleting call:", error);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-semibold text-black dark:text-white">CRM - Chamadas</h1>
        <p className="text-gray-400 mt-1 text-sm">
          Registro completo de chamadas com resultado e próximos passos.
        </p>
      </div>

      <section className="border border-gray-200 dark:border-zinc-800 p-6 space-y-4">
        <h2 className="text-sm uppercase tracking-[0.15em] text-gray-400 font-medium">Registrar Chamada</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          <select
            value={form.direction}
            onChange={(e) => setForm((prev) => ({ ...prev, direction: e.target.value as CallDirection }))}
            className="px-3 py-2 border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm"
          >
            {Object.keys(DIRECTION_LABELS).map((key) => (
              <option key={key} value={key}>
                {DIRECTION_LABELS[key as CallDirection]}
              </option>
            ))}
          </select>
          <select
            value={form.outcome}
            onChange={(e) => setForm((prev) => ({ ...prev, outcome: e.target.value as CallOutcome }))}
            className="px-3 py-2 border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm"
          >
            {Object.keys(OUTCOME_LABELS).map((key) => (
              <option key={key} value={key}>
                {OUTCOME_LABELS[key as CallOutcome]}
              </option>
            ))}
          </select>
          <input
            placeholder="Assunto"
            value={form.subject}
            onChange={(e) => setForm((prev) => ({ ...prev, subject: e.target.value }))}
            className="px-3 py-2 border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm"
          />
          <input
            placeholder="Resumo"
            value={form.summary}
            onChange={(e) => setForm((prev) => ({ ...prev, summary: e.target.value }))}
            className="px-3 py-2 border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm"
          />
          <input
            type="datetime-local"
            value={form.nextActionAt}
            onChange={(e) => setForm((prev) => ({ ...prev, nextActionAt: e.target.value }))}
            className="px-3 py-2 border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm"
          />
        </div>
        <button
          onClick={handleCreate}
          disabled={saving}
          className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white text-sm hover:bg-zinc-800 disabled:opacity-50"
        >
          <HiOutlinePlus className="h-4 w-4" />
          {saving ? "Salvando..." : "Adicionar Chamada"}
        </button>
      </section>

      <section className="border border-gray-200 dark:border-zinc-800">
        <div className="p-4 border-b border-gray-200 dark:border-zinc-800 flex flex-wrap items-center gap-3">
          <select
            value={directionFilter}
            onChange={(e) => setDirectionFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm"
          >
            <option value="">Todas as direções</option>
            {Object.keys(DIRECTION_LABELS).map((key) => (
              <option key={key} value={key}>
                {DIRECTION_LABELS[key as CallDirection]}
              </option>
            ))}
          </select>
          <select
            value={outcomeFilter}
            onChange={(e) => setOutcomeFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm"
          >
            <option value="">Todos os resultados</option>
            {Object.keys(OUTCOME_LABELS).map((key) => (
              <option key={key} value={key}>
                {OUTCOME_LABELS[key as CallOutcome]}
              </option>
            ))}
          </select>
          <button
            onClick={fetchCalls}
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
                <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-gray-500">Chamada</th>
                <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-gray-500">Vínculo</th>
                <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-gray-500">Resultado</th>
                <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-gray-500">Próxima ação</th>
                <th className="px-4 py-3 text-right text-xs uppercase tracking-wide text-gray-500">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-gray-400 text-sm">
                    Carregando chamadas...
                  </td>
                </tr>
              ) : calls.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-gray-400 text-sm">
                    Nenhuma chamada registrada
                  </td>
                </tr>
              ) : (
                calls.map((call) => (
                  <tr key={call.id} className="hover:bg-gray-50 dark:hover:bg-zinc-900/40">
                    <td className="px-4 py-3 text-sm">
                      <p className="text-black dark:text-white font-medium">{call.subject || "Sem assunto"}</p>
                      <p className="text-gray-500">
                        {DIRECTION_LABELS[call.direction]} •{" "}
                        {new Date(call.startedAt).toLocaleString("pt-BR")}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      <div>Cliente: {call.client?.name || "-"}</div>
                      <div>Contato: {call.contact?.fullName || "-"}</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {OUTCOME_LABELS[call.outcome]}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {call.nextActionAt ? new Date(call.nextActionAt).toLocaleString("pt-BR") : "-"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleDelete(call.id)}
                        className="px-3 py-1 text-xs border border-red-200 text-red-600 hover:bg-red-50"
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
