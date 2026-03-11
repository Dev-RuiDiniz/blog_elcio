"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { HiOutlinePhone, HiOutlineMail, HiOutlineLocationMarker } from "react-icons/hi";
import { FaInstagram, FaLinkedin, FaWhatsapp, FaFacebookF, FaYoutube, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IconType } from "react-icons";

const socialIconMap: Record<string, IconType> = {
  instagram: FaInstagram,
  facebook: FaFacebookF,
  linkedin: FaLinkedin,
  youtube: FaYoutube,
  whatsapp: FaWhatsapp,
  twitter: FaXTwitter,
  tiktok: FaTiktok,
};

interface FooterConfigData {
  logoUrl?: string;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
  ctaButtonLink?: string;
  companyName?: string;
  description?: string;
  contactPhone?: string;
  contactEmail?: string;
  contactAddress?: string;
  linkGroups?: Array<{ title: string; links: Array<{ label: string; href: string }> }>;
  socialLinks?: Array<{ platform: string; href: string }>;
  copyrightText?: string;
  copyrightSubtext?: string;
}

const defaultConfig: FooterConfigData = {
  logoUrl: "/images/site/Maletti - Logo bianco.png",
  ctaTitle: "Sinta a excelência de perto.",
  ctaDescription: "Visite nosso Showroom e conheça todo o universo Maletti.",
  ctaButtonText: "Agendar Visita",
  ctaButtonLink: "https://shrhair.com.br/contato",
  companyName: "SHR Comércio e Manutenção de Móveis LTDA",
  description: "Distribuidor exclusivo Maletti no Brasil",
  contactPhone: "(11) 4040-1437",
  contactEmail: "sac@shrhair.com.br",
  contactAddress: "Av. Jônia, 439 – Vila Alexandria\n04634-011 São Paulo – SP",
  linkGroups: [
    {
      title: "Links",
      links: [
        { label: "SHR Hair", href: "https://shrhair.com.br" },
        { label: "Produtos", href: "https://shrhair.com.br/produtos" },
        { label: "Marcas", href: "https://shrhair.com.br/marcas" },
        { label: "Manutenção", href: "https://shrhair.com.br/manutencao" },
        { label: "Maletti Global", href: "https://www.maletti.it/pt/pt" },
      ],
    },
  ],
  socialLinks: [
    { platform: "instagram", href: "https://instagram.com" },
    { platform: "linkedin", href: "https://linkedin.com" },
    { platform: "whatsapp", href: "https://wa.me/5511981982279" },
  ],
  copyrightText: "© {year} Maletti. Todos os direitos reservados.",
  copyrightSubtext: "Distribuído exclusivamente por SHR Hair no Brasil",
};

export function MalettiFooter() {
  const [config, setConfig] = useState<FooterConfigData>(defaultConfig);

  useEffect(() => {
    fetch("/api/layout?type=footer&variant=maletti")
      .then((r) => r.json())
      .then((data) => {
        if (data.config?.content) setConfig({ ...defaultConfig, ...data.config.content });
      })
      .catch(() => {});
  }, []);

  const copyrightText = (config.copyrightText || "").replace("{year}", new Date().getFullYear().toString());

  return (
    <footer className="bg-black text-white">
      {/* CTA Section */}
      <section className="py-20 border-b border-white/10">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold mb-6">
              {config.ctaTitle}
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              {config.ctaDescription}
            </p>
            <Link
              href={config.ctaButtonLink || "#"}
              className="inline-flex items-center px-8 py-4 bg-white text-black font-medium hover:bg-gray-100 transition-colors"
            >
              {config.ctaButtonText}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer Info */}
      <div className="py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Logo & Description */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <Image
                  src={config.logoUrl || "/images/site/Maletti - Logo bianco.png"}
                  alt="Maletti"
                  width={120}
                  height={48}
                />
                <span className="text-gray-500">×</span>
                <Image
                  src="/logoshr-white.png"
                  alt="SHR Hair"
                  width={80}
                  height={32}
                />
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                {config.companyName}<br />
                {config.description}
              </p>
              <div className="flex items-center gap-4">
                {(config.socialLinks || []).map((social) => {
                  const Icon = socialIconMap[social.platform] || FaInstagram;
                  return (
                    <a
                      key={social.platform + social.href}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm uppercase tracking-wider mb-6">Contato</h4>
              <ul className="space-y-4 text-gray-400">
                {config.contactAddress && (
                  <li className="flex items-start gap-3">
                    <HiOutlineLocationMarker className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span style={{ whiteSpace: "pre-line" }}>{config.contactAddress}</span>
                  </li>
                )}
                {config.contactPhone && (
                  <li className="flex items-center gap-3">
                    <HiOutlinePhone className="w-5 h-5 flex-shrink-0" />
                    <span>{config.contactPhone}</span>
                  </li>
                )}
                {config.contactEmail && (
                  <li className="flex items-center gap-3">
                    <HiOutlineMail className="w-5 h-5 flex-shrink-0" />
                    <span>{config.contactEmail}</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Dynamic Link Groups */}
            {(config.linkGroups || []).map((group) => (
              <div key={group.title}>
                <h4 className="text-sm uppercase tracking-wider mb-6">{group.title}</h4>
                <ul className="space-y-3 text-gray-400">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 py-6">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>{copyrightText}</p>
            {config.copyrightSubtext && <p>{config.copyrightSubtext}</p>}
          </div>
        </div>
      </div>
    </footer>
  );
}
