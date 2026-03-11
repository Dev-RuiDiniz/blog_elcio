"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface MalettiHeaderProps {
  onNavigate?: (id: string) => void;
}

interface HeaderConfigData {
  logoUrl?: string;
  navLinks?: Array<{ label: string; href: string }>;
}

const defaultNavLinks = [
  { label: "A Essência", href: "essencia" },
  { label: "Head SPA", href: "head-spa" },
  { label: "Design & Experiências", href: "design" },
  { label: "Catálogo", href: "catalogo" },
  { label: "Blog", href: "https://shrhair.com.br/blog" },
];

const scrollToSection = (id: string) => {
  if (id.startsWith("http")) {
    window.location.href = id;
    return;
  }
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export function MalettiHeader({ onNavigate }: MalettiHeaderProps) {
  const [config, setConfig] = useState<HeaderConfigData | null>(null);
  const handleNavigate = onNavigate || scrollToSection;

  useEffect(() => {
    fetch("/api/layout?type=header&variant=maletti")
      .then((r) => r.json())
      .then((data) => {
        if (data.config?.content) setConfig(data.config.content);
      })
      .catch(() => {});
  }, []);

  const logoUrl = config?.logoUrl || "/images/site/malliti-preto.png";
  const navLinks = config?.navLinks || defaultNavLinks;

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 hidden lg:block"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-14">
          <Image
            src={logoUrl}
            alt="Maletti"
            width={100}
            height={40}
            className="object-contain"
          />
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavigate(link.href)}
                className="text-sm text-gray-600 hover:text-black transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
