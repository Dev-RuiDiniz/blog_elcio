"use client";

import { useState, useEffect } from "react";
import { HiOutlineRefresh, HiOutlineCheck, HiOutlineExclamation, HiOutlineLink } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface Pipeline {
  id: number;
  name: string;
  statuses: { id: number; name: string; color: string }[];
}

interface KommoSettings {
  id: string;
  enabled: boolean;
  subdomain: string | null;
  clientId: string | null;
  clientSecret: string | null;
  hasAccessToken: boolean;
  tokenExpiresAt: string | null;
  pipelineId: number | null;
  pipelineName: string | null;
  statusId: number | null;
  statusName: string | null;
}

export default function KommoPage() {
  const [settings, setSettings] = useState<KommoSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [authorizing, setAuthorizing] = useState(false);
  const [loadingPipelines, setLoadingPipelines] = useState(false);
  const [pipelines, setPipelines] = useState<Pipeline[]>([]);
  const [authCode, setAuthCode] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    enabled: false,
    subdomain: "",
    clientId: "",
    clientSecret: "",
    pipelineId: 0,
    pipelineName: "",
    statusId: 0,
    statusName: "",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/admin/kommo");
      const data = await res.json();
      setSettings(data);
      setFormData({
        enabled: data.enabled || false,
        subdomain: data.subdomain || "",
        clientId: data.clientId || "",
        clientSecret: data.clientSecret || "",
        pipelineId: data.pipelineId || 0,
        pipelineName: data.pipelineName || "",
        statusId: data.statusId || 0,
        statusName: data.statusName || "",
      });
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/kommo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        setMessage({ type: "success", text: "Configurações salvas com sucesso!" });
        fetchSettings();
      } else {
        const error = await res.json();
        setMessage({ type: "error", text: error.error || "Erro ao salvar" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Erro ao salvar configurações" });
    } finally {
      setSaving(false);
    }
  };

  const handleAuthorize = async () => {
    if (!authCode.trim()) {
      setMessage({ type: "error", text: "Cole o token de acesso" });
      return;
    }

    setAuthorizing(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/kommo/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken: authCode }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setMessage({ type: "success", text: "Token salvo com sucesso!" });
        setAuthCode("");
        fetchSettings();
      } else {
        setMessage({ type: "error", text: data.error || "Erro ao salvar token" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Erro ao salvar token" });
    } finally {
      setAuthorizing(false);
    }
  };

  const fetchPipelines = async () => {
    setLoadingPipelines(true);
    try {
      const res = await fetch("/api/admin/kommo/pipelines");
      const data = await res.json();
      
      if (res.ok) {
        setPipelines(data.pipelines);
      } else {
        setMessage({ type: "error", text: data.error || "Erro ao buscar pipelines" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Erro ao buscar pipelines" });
    } finally {
      setLoadingPipelines(false);
    }
  };

  const selectPipeline = (pipeline: Pipeline) => {
    const firstStatus = pipeline.statuses[0];
    setFormData({
      ...formData,
      pipelineId: pipeline.id,
      pipelineName: pipeline.name,
      statusId: firstStatus?.id || 0,
      statusName: firstStatus?.name || "",
    });
  };

  const selectStatus = (status: { id: number; name: string }) => {
    setFormData({
      ...formData,
      statusId: status.id,
      statusName: status.name,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white">Kommo CRM</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1">
          Configure a integração com o Kommo para receber leads do site
        </p>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
          message.type === "success" 
            ? "bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400" 
            : "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400"
        }`}>
          {message.type === "success" ? <HiOutlineCheck className="w-5 h-5" /> : <HiOutlineExclamation className="w-5 h-5" />}
          {message.text}
        </div>
      )}

      {/* Status da integração */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-medium text-zinc-900 dark:text-white">Status da Integração</h2>
            <p className="text-sm text-zinc-500 mt-1">
              {settings?.hasAccessToken 
                ? `Conectado • Token expira em ${settings.tokenExpiresAt ? new Date(settings.tokenExpiresAt).toLocaleDateString("pt-BR") : "N/A"}`
                : "Não conectado"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`w-3 h-3 rounded-full ${settings?.hasAccessToken ? "bg-green-500" : "bg-zinc-300"}`}></span>
            <Switch
              checked={formData.enabled}
              onCheckedChange={(checked: boolean) => setFormData({ ...formData, enabled: checked })}
            />
          </div>
        </div>
      </div>

      {/* Credenciais */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 mb-6">
        <h2 className="font-medium text-zinc-900 dark:text-white mb-4">Credenciais da API</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="subdomain">Subdomínio</Label>
            <div className="flex items-center gap-2 mt-1">
              <Input
                id="subdomain"
                value={formData.subdomain}
                onChange={(e) => setFormData({ ...formData, subdomain: e.target.value })}
                placeholder="shrhair"
              />
              <span className="text-sm text-zinc-500">.kommo.com</span>
            </div>
          </div>
          
          <div>
            <Label htmlFor="clientId">ID da Integração (Client ID)</Label>
            <Input
              id="clientId"
              value={formData.clientId}
              onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
              placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
              className="mt-1"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="clientSecret">Chave Secreta (Client Secret)</Label>
          <Input
            id="clientSecret"
            type="password"
            value={formData.clientSecret}
            onChange={(e) => setFormData({ ...formData, clientSecret: e.target.value })}
            placeholder="••••••••••••••••"
            className="mt-1"
          />
        </div>

        <Button onClick={handleSave} disabled={saving} className="mt-4">
          {saving ? "Salvando..." : "Salvar Credenciais"}
        </Button>
      </div>

      {/* Autorização */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 mb-6">
        <h2 className="font-medium text-zinc-900 dark:text-white mb-2">Token de Acesso</h2>
        <p className="text-sm text-zinc-500 mb-4">
          Cole o <strong>Long-lived access token</strong> da sua integração no Kommo.
          Acesse: Configurações → Integrações → Sua integração → Copie o token.
        </p>

        <div className="flex gap-3">
          <Input
            value={authCode}
            onChange={(e) => setAuthCode(e.target.value)}
            placeholder="Cole o token de acesso aqui (eyJ0eXAi...)"
            className="flex-1"
          />
          <Button onClick={handleAuthorize} disabled={authorizing || !authCode}>
            {authorizing ? "Salvando..." : "Salvar Token"}
          </Button>
        </div>
      </div>

      {/* Pipeline / Funil */}
      {settings?.hasAccessToken && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-medium text-zinc-900 dark:text-white">Pipeline / Funil</h2>
              <p className="text-sm text-zinc-500">
                Selecione o funil onde os leads serão criados
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={fetchPipelines} disabled={loadingPipelines}>
              <HiOutlineRefresh className={`w-4 h-4 mr-2 ${loadingPipelines ? "animate-spin" : ""}`} />
              Carregar Funis
            </Button>
          </div>

          {formData.pipelineName && (
            <div className="mb-4 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
              <p className="text-sm">
                <span className="text-zinc-500">Funil selecionado:</span>{" "}
                <span className="font-medium text-zinc-900 dark:text-white">{formData.pipelineName}</span>
              </p>
              <p className="text-sm">
                <span className="text-zinc-500">Etapa inicial:</span>{" "}
                <span className="font-medium text-zinc-900 dark:text-white">{formData.statusName || "Primeira etapa"}</span>
              </p>
            </div>
          )}

          {pipelines.length > 0 && (
            <div className="space-y-3">
              {pipelines.map((pipeline) => (
                <div 
                  key={pipeline.id} 
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    formData.pipelineId === pipeline.id 
                      ? "border-black dark:border-white bg-zinc-50 dark:bg-zinc-800" 
                      : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-400"
                  }`}
                  onClick={() => selectPipeline(pipeline)}
                >
                  <p className="font-medium text-zinc-900 dark:text-white">{pipeline.name}</p>
                  {formData.pipelineId === pipeline.id && pipeline.statuses.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {pipeline.statuses.map((status) => (
                        <button
                          key={status.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            selectStatus(status);
                          }}
                          className={`px-3 py-1 text-sm rounded-full transition-all ${
                            formData.statusId === status.id
                              ? "bg-black text-white dark:bg-white dark:text-black"
                              : "bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200"
                          }`}
                        >
                          {status.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <Button onClick={handleSave} disabled={saving} className="mt-4">
                {saving ? "Salvando..." : "Salvar Pipeline"}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
