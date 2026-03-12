"use client";

import { useEffect, useState } from "react";
import { HiOutlineKey, HiOutlinePlus, HiOutlineRefresh } from "react-icons/hi";

type UserRole = "ADMIN" | "SUPER_ADMIN";

interface AdminUser {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
  isActive: boolean;
  mustChangePassword: boolean;
  lastLoginAt: string | null;
}

export default function AdminAcessoPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "ADMIN" as UserRole,
    mustChangePassword: true,
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async () => {
    if (!form.email.trim() || !form.password.trim()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim() || null,
          email: form.email.trim(),
          password: form.password,
          role: form.role,
          mustChangePassword: form.mustChangePassword,
        }),
      });
      if (res.ok) {
        setForm({
          name: "",
          email: "",
          password: "",
          role: "ADMIN",
          mustChangePassword: true,
        });
        fetchUsers();
      }
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setSaving(false);
    }
  };

  const updateUser = async (id: string, payload: Record<string, unknown>) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleProvisionElcio = async () => {
    const password = window.prompt("Informe uma senha inicial para o usuário do Elcio:");
    if (!password) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/users/elcio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) fetchUsers();
    } catch (error) {
      console.error("Error provisioning Elcio:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleSetPassword = async (userId: string) => {
    const password = window.prompt("Nova senha (mínimo 8 caracteres):");
    if (!password) return;
    await updateUser(userId, { password, mustChangePassword: false });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-semibold text-black dark:text-white">Acesso Administrativo</h1>
        <p className="text-gray-400 mt-1 text-sm">
          Gerencie credenciais da operação (SuperAdmin + Elcio + equipe).
        </p>
      </div>

      <section className="border border-gray-200 dark:border-zinc-800 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm uppercase tracking-[0.15em] text-gray-400 font-medium">Criar Usuário Admin</h2>
          <button
            onClick={handleProvisionElcio}
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-zinc-700 text-sm hover:bg-gray-50 dark:hover:bg-zinc-800 disabled:opacity-50"
          >
            <HiOutlineKey className="h-4 w-4" />
            Provisionar Elcio
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <input
            placeholder="Nome"
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            className="px-3 py-2 border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm"
          />
          <input
            placeholder="Email *"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            className="px-3 py-2 border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm"
          />
          <input
            type="password"
            placeholder="Senha *"
            value={form.password}
            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
            className="px-3 py-2 border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm"
          />
          <select
            value={form.role}
            onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value as UserRole }))}
            className="px-3 py-2 border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm"
          >
            <option value="ADMIN">ADMIN</option>
            <option value="SUPER_ADMIN">SUPER_ADMIN</option>
          </select>
          <button
            onClick={handleCreateUser}
            disabled={saving || !form.email.trim() || !form.password.trim()}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-black text-white text-sm hover:bg-zinc-800 disabled:opacity-50"
          >
            <HiOutlinePlus className="h-4 w-4" />
            Criar
          </button>
        </div>
      </section>

      <section className="border border-gray-200 dark:border-zinc-800">
        <div className="p-4 border-b border-gray-200 dark:border-zinc-800 flex justify-between items-center">
          <h2 className="text-sm uppercase tracking-[0.15em] text-gray-400 font-medium">Usuários Admin</h2>
          <button
            onClick={fetchUsers}
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
                <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-gray-500">Usuário</th>
                <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-gray-500">Role</th>
                <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-gray-500">Status</th>
                <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-gray-500">Último login</th>
                <th className="px-4 py-3 text-right text-xs uppercase tracking-wide text-gray-500">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-gray-400 text-sm">
                    Carregando usuários...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-gray-400 text-sm">
                    Nenhum usuário encontrado
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-zinc-900/40">
                    <td className="px-4 py-3 text-sm">
                      <p className="text-black dark:text-white font-medium">{user.name || "-"}</p>
                      <p className="text-gray-500">{user.email}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{user.role}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      <div>{user.isActive ? "Ativo" : "Inativo"}</div>
                      <div className="text-xs text-gray-500">
                        {user.mustChangePassword ? "Troca pendente" : "Senha ok"}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString("pt-BR") : "-"}
                    </td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <button
                        onClick={() => updateUser(user.id, { isActive: !user.isActive })}
                        disabled={saving}
                        className="px-3 py-1 text-xs border border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800 disabled:opacity-50"
                      >
                        {user.isActive ? "Desativar" : "Ativar"}
                      </button>
                      <button
                        onClick={() => handleSetPassword(user.id)}
                        disabled={saving}
                        className="px-3 py-1 text-xs border border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800 disabled:opacity-50"
                      >
                        Senha
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
