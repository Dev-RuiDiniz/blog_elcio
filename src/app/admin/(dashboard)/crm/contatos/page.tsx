"use client";

import { useEffect, useMemo, useState } from "react";
import { HiOutlinePlus, HiOutlineRefresh } from "react-icons/hi";

type ContactSource = "MANUAL" | "SITE_FORM" | "WHATSAPP" | "BLOG" | "INDICACAO" | "IMPORT_KOMMO";

interface ContactItem {
  id: string;
  fullName: string;
  companyName: string | null;
  email: string | null;
  phone: string | null;
  whatsapp: string | null;
  source: ContactSource;
  isActive: boolean;
  createdAt: string;
}

const CONTACT_SOURCE_LABELS: Record<ContactSource, string> = {
  MANUAL: "Manual",
  SITE_FORM: "Formulário",
  WHATSAPP: "WhatsApp",
  BLOG: "Blog",
  INDICACAO: "Indicação",
  IMPORT_KOMMO: "Importação",
};

export default function AdminCrmContatosPage() {
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState<string>("");
  const [form, setForm] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    whatsapp: "",
    source: "MANUAL" as ContactSource,
  });

  const filteredContacts = useMemo(() => contacts, [contacts]);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("limit", "50");
      params.set("onlyActive", "true");
      if (search.trim()) params.set("search", search.trim());
      if (sourceFilter) params.set("source", sourceFilter);

      const res = await fetch(`/api/admin/crm/contacts?${params.toString()}`);
      const data = await res.json();
      setContacts(data.contacts || []);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [search, sourceFilter]);

  const handleCreate = async () => {
    if (!form.fullName.trim()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/crm/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          companyName: form.companyName.trim() || null,
          email: form.email.trim() || null,
          phone: form.phone.trim() || null,
          whatsapp: form.whatsapp.trim() || null,
          source: form.source,
        }),
      });

      if (res.ok) {
        setForm({
          fullName: "",
          companyName: "",
          email: "",
          phone: "",
          whatsapp: "",
          source: "MANUAL",
        });
        fetchContacts();
      }
    } catch (error) {
      console.error("Error creating contact:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDeactivate = async (contactId: string) => {
    try {
      const res = await fetch(`/api/admin/crm/contacts/${contactId}`, {
        method: "DELETE",
      });
      if (res.ok) fetchContacts();
    } catch (error) {
      console.error("Error deactivating contact:", error);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-semibold text-black dark:text-white">CRM - Contatos</h1>
        <p className="text-gray-400 mt-1 text-sm">
          Cadastro e consulta de contatos comerciais para triagem e atendimento.
        </p>
      </div>

      <section className="border border-gray-200 dark:border-zinc-800 p-6 space-y-4">
        <h2 className="text-sm uppercase tracking-[0.15em] text-gray-400 font-medium">Novo Contato</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <input
            placeholder="Nome completo *"
            value={form.fullName}
            onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
            className="px-3 py-2 border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm"
          />
          <input
            placeholder="Empresa"
            value={form.companyName}
            onChange={(e) => setForm((prev) => ({ ...prev, companyName: e.target.value }))}
            className="px-3 py-2 border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm"
          />
          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            className="px-3 py-2 border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm"
          />
          <input
            placeholder="Telefone"
            value={form.phone}
            onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
            className="px-3 py-2 border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm"
          />
          <input
            placeholder="WhatsApp"
            value={form.whatsapp}
            onChange={(e) => setForm((prev) => ({ ...prev, whatsapp: e.target.value }))}
            className="px-3 py-2 border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm"
          />
          <select
            value={form.source}
            onChange={(e) => setForm((prev) => ({ ...prev, source: e.target.value as ContactSource }))}
            className="px-3 py-2 border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm"
          >
            {Object.keys(CONTACT_SOURCE_LABELS).map((key) => (
              <option key={key} value={key}>
                {CONTACT_SOURCE_LABELS[key as ContactSource]}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleCreate}
          disabled={saving || !form.fullName.trim()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white text-sm hover:bg-zinc-800 disabled:opacity-50"
        >
          <HiOutlinePlus className="h-4 w-4" />
          {saving ? "Salvando..." : "Adicionar Contato"}
        </button>
      </section>

      <section className="border border-gray-200 dark:border-zinc-800">
        <div className="p-4 border-b border-gray-200 dark:border-zinc-800 flex flex-wrap items-center gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome, empresa, email ou telefone"
            className="px-3 py-2 border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm min-w-[280px]"
          />
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm"
          >
            <option value="">Todas as origens</option>
            {Object.keys(CONTACT_SOURCE_LABELS).map((key) => (
              <option key={key} value={key}>
                {CONTACT_SOURCE_LABELS[key as ContactSource]}
              </option>
            ))}
          </select>
          <button
            onClick={fetchContacts}
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
                <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-gray-500">Contato</th>
                <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-gray-500">Empresa</th>
                <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-gray-500">Origem</th>
                <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-gray-500">Canais</th>
                <th className="px-4 py-3 text-right text-xs uppercase tracking-wide text-gray-500">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-gray-400 text-sm">
                    Carregando contatos...
                  </td>
                </tr>
              ) : filteredContacts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-gray-400 text-sm">
                    Nenhum contato encontrado
                  </td>
                </tr>
              ) : (
                filteredContacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50 dark:hover:bg-zinc-900/40">
                    <td className="px-4 py-3 text-sm">
                      <p className="text-black dark:text-white font-medium">{contact.fullName}</p>
                      <p className="text-gray-500">{new Date(contact.createdAt).toLocaleDateString("pt-BR")}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {contact.companyName || "-"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {CONTACT_SOURCE_LABELS[contact.source]}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      <div>{contact.email || "-"}</div>
                      <div>{contact.whatsapp || contact.phone || "-"}</div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleDeactivate(contact.id)}
                        className="px-3 py-1 text-xs border border-red-200 text-red-600 hover:bg-red-50"
                      >
                        Inativar
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
