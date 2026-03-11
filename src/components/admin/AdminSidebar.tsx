"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  HiOutlineViewGrid,
  HiOutlineCube,
  HiOutlineTag,
  HiOutlineUserGroup,
  HiOutlineNewspaper,
  HiOutlineChartBar,
  HiOutlineCog,
  HiOutlineDocumentText,
  HiOutlineExternalLink,
  HiOutlinePhotograph,
  HiOutlineTemplate,
  HiOutlineLightningBolt,
  HiOutlineCode,
  HiOutlineMenuAlt2,
  HiOutlineViewBoards,
} from "react-icons/hi";

const menuItems = [
  {
    section: "Principal",
    items: [
      { title: "Visão Geral", href: "/admin", icon: HiOutlineViewGrid },
    ],
  },
  {
    section: "Conteúdo",
    items: [
      { title: "Páginas", href: "/admin/paginas", icon: HiOutlineTemplate },
      { title: "Banners", href: "/admin/banners", icon: HiOutlinePhotograph },
      { title: "Produtos", href: "/admin/produtos", icon: HiOutlineCube },
      { title: "Marcas", href: "/admin/marcas", icon: HiOutlineTag },
      { title: "Catálogo", href: "/admin/catalogo", icon: HiOutlineDocumentText },
      { title: "Parceiros", href: "/admin/parceiros", icon: HiOutlineUserGroup },
      { title: "Blog", href: "/admin/blog", icon: HiOutlineNewspaper },
      { title: "Cabeçalho", href: "/admin/cabecalho", icon: HiOutlineMenuAlt2 },
      { title: "Rodapé", href: "/admin/rodape", icon: HiOutlineViewBoards },
    ],
  },
  {
    section: "Analytics",
    items: [
      { title: "Relatórios", href: "/admin/relatorios", icon: HiOutlineChartBar },
    ],
  },
  {
    section: "Integrações",
    items: [
      { title: "Kommo CRM", href: "/admin/kommo", icon: HiOutlineLightningBolt },
    ],
  },
  {
    section: "Sistema",
    items: [
      { title: "Scripts", href: "/admin/scripts", icon: HiOutlineCode },
      { title: "Configurações", href: "/admin/configuracoes", icon: HiOutlineCog },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-72 bg-black text-white hidden lg:block border-none outline-none">
      <div className="flex h-full flex-col border-none outline-none">
        {/* Logo */}
        <div className="flex h-20 items-center px-8 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-3">
            <Image
              src="/logoshr-white.png"
              alt="SHR"
              width={80}
              height={32}
              className="object-contain"
            />
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-medium">
              Admin
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 border-0 outline-none [&::-webkit-scrollbar]:w-0 [scrollbar-width:none]">
          {menuItems.map((section) => (
            <div key={section.section} className="mb-6">
              <h3 className="px-4 text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium mb-3">
                {section.section}
              </h3>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href || 
                    (item.href !== "/admin" && pathname.startsWith(item.href));
                  
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-200 ${
                          isActive
                            ? "bg-white text-black font-medium"
                            : "text-white/60 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-white/10 p-6">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between text-xs text-white/40 hover:text-white transition-colors group"
          >
            <span>Ver site</span>
            <HiOutlineExternalLink className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
