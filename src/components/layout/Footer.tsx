"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaYoutube, FaWhatsapp, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi";
import { IconType } from "react-icons";

const socialIconMap: Record<string, IconType> = {
  instagram: FaInstagram,
  facebook: FaFacebookF,
  linkedin: FaLinkedinIn,
  youtube: FaYoutube,
  whatsapp: FaWhatsapp,
  twitter: FaXTwitter,
  tiktok: FaTiktok,
};

interface FooterConfigData {
  logoUrl?: string;
  subtitle?: string;
  description?: string;
  contactEmail?: string;
  contactPhone?: string;
  contactCity?: string;
  linkGroups?: Array<{ title: string; links: Array<{ label: string; href: string }> }>;
  socialLinks?: Array<{ platform: string; href: string }>;
  copyrightText?: string;
}

const defaultLinkGroups = [
  {
    title: "Produtos",
    links: [
      { href: "/produtos/heaven", label: "Heaven" },
      { href: "/produtos/shirobody", label: "Shirobody" },
      { href: "/produtos/total-body", label: "Total Body" },
      { href: "/produtos/spa-garcon", label: "Spa Garçon" },
      { href: "/produtos/vapomist", label: "Vapomist" },
    ],
  },
  {
    title: "Institucional",
    links: [
      { href: "/sobre", label: "Sobre a SHR" },
      { href: "/marcas", label: "Nossas Marcas" },
      { href: "/blog", label: "Blog" },
      { href: "/manutencao", label: "Manutenção" },
      { href: "/contato", label: "Contato" },
    ],
  },
  {
    title: "Suporte",
    links: [
      { href: "/contato?assunto=catalogo", label: "Solicitar Catálogo" },
      { href: "/contato", label: "Falar com Consultor" },
      { href: "/garantia", label: "Garantia" },
      { href: "/faq", label: "FAQ" },
    ],
  },
];

const defaultSocialLinks = [
  { platform: "instagram", href: "https://instagram.com/shrhair" },
  { platform: "facebook", href: "https://facebook.com/shrhair" },
  { platform: "linkedin", href: "https://linkedin.com/company/shrhair" },
  { platform: "youtube", href: "https://youtube.com/@shrhair" },
];

export function Footer() {
  const [config, setConfig] = useState<FooterConfigData | null>(null);

  useEffect(() => {
    fetch("/api/layout?type=footer&variant=shr")
      .then((r) => r.json())
      .then((data) => {
        if (data.config?.content) setConfig(data.config.content);
      })
      .catch(() => {});
  }, []);

  const logoUrl = config?.logoUrl || "/logoshr-white.png";
  const subtitleText = config?.subtitle || "Distribuidor Exclusivo Maletti";
  const description = config?.description || "Somos representantes exclusivos da Maletti no Brasil, trazendo o que há de mais sofisticado em mobiliário para salões de beleza e spas.";
  const contactEmail = config?.contactEmail || "marketing@shrhair.com.br";
  const contactPhone = config?.contactPhone || "(11) 98198-2279";
  const contactCity = config?.contactCity || "São Paulo, SP";
  const linkGroups = config?.linkGroups || defaultLinkGroups;
  const socials = config?.socialLinks || defaultSocialLinks;
  const copyrightText = (config?.copyrightText || "© {year} SHR. Todos os direitos reservados.").replace("{year}", new Date().getFullYear().toString());

  return (
    <footer className="bg-black text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-8 ${
          linkGroups.length === 1 ? "lg:grid-cols-3" :
          linkGroups.length === 2 ? "lg:grid-cols-4" :
          linkGroups.length === 3 ? "lg:grid-cols-5" :
          linkGroups.length === 4 ? "lg:grid-cols-6" :
          "lg:grid-cols-5"
        }`}>
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/" className="inline-block mb-6">
                <Image
                  src={logoUrl}
                  alt="SHR - Distribuidor Exclusivo Maletti"
                  width={120}
                  height={48}
                  className="mb-2"
                />
                <span className="block text-xs tracking-[0.2em] text-gray-400 uppercase">
                  {subtitleText}
                </span>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-8">
                {description}
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <a
                  href={`mailto:${contactEmail}`}
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm"
                >
                  <HiOutlineMail className="w-5 h-5" />
                  {contactEmail}
                </a>
                <a
                  href={`tel:${contactPhone.replace(/\D/g, "")}`}
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm"
                >
                  <HiOutlinePhone className="w-5 h-5" />
                  {contactPhone}
                </a>
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <HiOutlineLocationMarker className="w-5 h-5 flex-shrink-0" />
                  {contactCity}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Dynamic Link Columns */}
          {linkGroups.map((group, idx) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (idx + 1) }}
            >
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-6">
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    {link.href.startsWith("http") ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              {copyrightText}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socials.map((social) => {
                const Icon = socialIconMap[social.platform] || FaInstagram;
                return (
                  <motion.a
                    key={social.platform + social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors"
                    aria-label={social.platform}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
