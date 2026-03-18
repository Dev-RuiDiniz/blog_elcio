"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  HiOutlineViewBoards,
  HiOutlinePlus,
  HiOutlineTrash,
  HiOutlineSave,
  HiOutlineCheck,
} from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/admin/ImageUpload";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  platform: string;
  href: string;
}

interface FooterConfig {
  logoUrl?: string;
  subtitle?: string;
  description?: string;
  contactEmail?: string;
  contactPhone?: string;
  contactCity?: string;
  linkGroups: FooterLinkGroup[];
  socialLinks: SocialLink[];
  copyrightText?: string;
}

const DEFAULT_FOOTER: FooterConfig = {
  logoUrl: "/logo-white.png",
  subtitle: "Representação Comercial B2B",
  description: "Atendimento consultivo para conectar sua demanda técnica e comercial à empresa mais aderente.",
  contactEmail: "vendas@raemtools.com.br",
  contactPhone: "+55 12 98873-7347",
  contactCity: "Taubaté - SP",
  linkGroups: [
    {
      title: "Empresas",
      links: [
        { label: "Ardiri", href: "/p/ardiri" },
        { label: "Autoplast", href: "/p/autoplast" },
        { label: "Solofil", href: "/p/solofil" },
        { label: "Deltajet", href: "/p/deltajet" },
        { label: "NORD DRIVESYSTEMS", href: "/p/nord-drivesystems" },
        { label: "Mercosul Motores", href: "/p/mercosul-motores" },
        { label: "WMG Assistência Técnica", href: "/p/wmg-assistencia-tecnica" },
      ],
    },
    {
      title: "Navegação",
      links: [
        { label: "Home", href: "/" },
        { label: "Marcas", href: "/marcas" },
        { label: "Sobre", href: "/sobre" },
        { label: "Contato", href: "/contato" },
      ],
    },
    {
      title: "Atendimento",
      links: [
        { label: "Comparar e qualificar", href: "/contato?assunto=consultoria-catalogo&origem=footer" },
        { label: "Falar no WhatsApp", href: "https://wa.me/5512988737347?text=Olá! Quero consultoria e catálogo." },
      ],
    },
  ],
  socialLinks: [
    { platform: "whatsapp", href: "https://wa.me/5512988737347" },
  ],
  copyrightText: "© {year} Elcio Representação Comercial. Todos os direitos reservados.",
};

export default function RodapePage() {
  const [config, setConfig] = useState<FooterConfig>(DEFAULT_FOOTER);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      const res = await fetch("/api/admin/layout?type=footer&variant=elcio");
      const data = await res.json();
      setConfig(data.config?.content || DEFAULT_FOOTER);
    } catch (error) {
      console.error("Error loading footer config:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch("/api/admin/layout", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "footer",
          variant: "elcio",
          content: config,
        }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error("Error saving footer config:", error);
      alert("Erro ao salvar");
    } finally {
      setSaving(false);
    }
  };

  const updateConfig = (updates: Partial<FooterConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  // Link Groups helpers
  const updateLinkGroup = (groupIdx: number, field: string, value: string) => {
    const newGroups = [...config.linkGroups];
    newGroups[groupIdx] = { ...newGroups[groupIdx], [field]: value };
    updateConfig({ linkGroups: newGroups });
  };

  const addLinkGroup = () => {
    updateConfig({ linkGroups: [...config.linkGroups, { title: "", links: [] }] });
  };

  const removeLinkGroup = (groupIdx: number) => {
    updateConfig({ linkGroups: config.linkGroups.filter((_, i) => i !== groupIdx) });
  };

  const updateLink = (groupIdx: number, linkIdx: number, field: keyof FooterLink, value: string) => {
    const newGroups = [...config.linkGroups];
    const newLinks = [...newGroups[groupIdx].links];
    newLinks[linkIdx] = { ...newLinks[linkIdx], [field]: value };
    newGroups[groupIdx] = { ...newGroups[groupIdx], links: newLinks };
    updateConfig({ linkGroups: newGroups });
  };

  const addLink = (groupIdx: number) => {
    const newGroups = [...config.linkGroups];
    newGroups[groupIdx] = {
      ...newGroups[groupIdx],
      links: [...newGroups[groupIdx].links, { label: "", href: "" }],
    };
    updateConfig({ linkGroups: newGroups });
  };

  const removeLink = (groupIdx: number, linkIdx: number) => {
    const newGroups = [...config.linkGroups];
    newGroups[groupIdx] = {
      ...newGroups[groupIdx],
      links: newGroups[groupIdx].links.filter((_, i) => i !== linkIdx),
    };
    updateConfig({ linkGroups: newGroups });
  };

  // Social helpers
  const updateSocial = (idx: number, field: keyof SocialLink, value: string) => {
    const newSocials = [...config.socialLinks];
    newSocials[idx] = { ...newSocials[idx], [field]: value };
    updateConfig({ socialLinks: newSocials });
  };

  const addSocial = () => {
    updateConfig({ socialLinks: [...config.socialLinks, { platform: "instagram", href: "" }] });
  };

  const removeSocial = (idx: number) => {
    updateConfig({ socialLinks: config.socialLinks.filter((_, i) => i !== idx) });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Rodapé</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Edite o rodapé do site Elcio Representação Comercial
          </p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saved ? (
            <>
              <HiOutlineCheck className="w-4 h-4 mr-2" />
              Salvo!
            </>
          ) : (
            <>
              <HiOutlineSave className="w-4 h-4 mr-2" />
              {saving ? "Salvando..." : "Salvar"}
            </>
          )}
        </Button>
      </div>

      {/* Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Info Geral */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 space-y-4">
          <h3 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
            <HiOutlineViewBoards className="w-5 h-5" />
            Informações Gerais
          </h3>

          <ImageUpload
            value={config.logoUrl || ""}
            onChange={(url) => updateConfig({ logoUrl: url })}
            label="Logo"
            folder="layout"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Subtítulo
            </label>
            <input
              type="text"
              value={config.subtitle || ""}
              onChange={(e) => updateConfig({ subtitle: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Descrição
            </label>
            <textarea
              value={config.description || ""}
              onChange={(e) => updateConfig({ description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                E-mail
              </label>
              <input
                type="text"
                value={config.contactEmail || ""}
                onChange={(e) => updateConfig({ contactEmail: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Telefone
              </label>
              <input
                type="text"
                value={config.contactPhone || ""}
                onChange={(e) => updateConfig({ contactPhone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Cidade
            </label>
            <input
              type="text"
              value={config.contactCity || ""}
              onChange={(e) => updateConfig({ contactCity: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Texto de Copyright
            </label>
            <input
              type="text"
              value={config.copyrightText || ""}
              onChange={(e) => updateConfig({ copyrightText: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              placeholder="Use {year} para o ano atual"
            />
          </div>
        </div>

        {/* Redes Sociais */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900 dark:text-white">Redes Sociais</h3>
              <button
                onClick={addSocial}
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <HiOutlinePlus className="w-4 h-4" />
                Adicionar
              </button>
            </div>

            <div className="space-y-3">
              {config.socialLinks.map((social, i) => (
                <div key={i} className="flex items-center gap-2">
                  <select
                    value={social.platform}
                    onChange={(e) => updateSocial(i, "platform", e.target.value)}
                    className="w-36 px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  >
                    <option value="instagram">Instagram</option>
                    <option value="facebook">Facebook</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="youtube">YouTube</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="twitter">Twitter/X</option>
                    <option value="tiktok">TikTok</option>
                  </select>
                  <input
                    type="text"
                    value={social.href}
                    onChange={(e) => updateSocial(i, "href", e.target.value)}
                    placeholder="https://..."
                    className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  />
                  <button
                    onClick={() => removeSocial(i)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                  >
                    <HiOutlineTrash className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Grupos de Links */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900 dark:text-white">Grupos de Links</h3>
            <button
              onClick={addLinkGroup}
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <HiOutlinePlus className="w-4 h-4" />
              Adicionar Grupo
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-hidden">
            {config.linkGroups.map((group, gi) => (
              <div
                key={gi}
                className="p-4 border border-gray-100 dark:border-gray-600 rounded-lg space-y-3 bg-gray-50 dark:bg-gray-700 min-w-0 overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    value={group.title}
                    onChange={(e) => updateLinkGroup(gi, "title", e.target.value)}
                    placeholder="Título do grupo"
                    className="text-sm font-medium bg-transparent border-none p-0 text-gray-900 dark:text-white focus:outline-none focus:ring-0 flex-1 min-w-0"
                  />
                  <button
                    onClick={() => removeLinkGroup(gi)}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    <HiOutlineTrash className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-2">
                  {group.links.map((link, li) => (
                    <div key={li} className="flex items-start gap-1">
                      <div className="flex-1 min-w-0 space-y-1">
                        <input
                          type="text"
                          value={link.label}
                          onChange={(e) => updateLink(gi, li, "label", e.target.value)}
                          placeholder="Label"
                          className="w-full px-2 py-1.5 border border-gray-200 dark:border-gray-500 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs"
                        />
                        <input
                          type="text"
                          value={link.href}
                          onChange={(e) => updateLink(gi, li, "href", e.target.value)}
                          placeholder="/caminho"
                          className="w-full px-2 py-1.5 border border-gray-200 dark:border-gray-500 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs"
                        />
                      </div>
                      <button
                        onClick={() => removeLink(gi, li)}
                        className="p-1 text-red-500 hover:text-red-700 mt-1 flex-shrink-0"
                      >
                        <HiOutlineTrash className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => addLink(gi)}
                  className="w-full py-1.5 border border-dashed border-gray-300 dark:border-gray-500 rounded text-xs text-gray-500 hover:text-gray-700 hover:border-gray-400"
                >
                  + Adicionar Link
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
