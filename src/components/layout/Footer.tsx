"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { HiOutlineLocationMarker, HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { buildContactHref, buildWhatsappHref } from "@/lib/lead-context";

const linkGroups = [
  {
    title: "Navegação",
    links: [
      { href: "/", label: "Home" },
      { href: "/marcas", label: "Empresas" },
      { href: "/sobre", label: "Sobre" },
      { href: "/contato", label: "Contato" },
    ],
  },
  {
    title: "Conversão",
    links: [
      {
        href: buildContactHref({ assunto: "consultoria-catalogo", origem: "footer" }),
        label: "Comparar e qualificar",
      },
      {
        href: buildWhatsappHref({ origem: "footer" }),
        label: "Falar no WhatsApp",
      },
    ],
  },
];

const socialLinks = [{ href: buildWhatsappHref({ origem: "footer-social" }), icon: FaWhatsapp, label: "WhatsApp" }];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0a1d37] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-14 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-12 h-12 rounded-full border border-white flex items-center justify-center mb-5 text-xs font-semibold tracking-wider">
                ER
              </div>
              <h3 className="text-xl font-black mb-3">Elcio Representação Comercial</h3>
              <p className="text-slate-300 text-sm leading-relaxed max-w-sm mb-8">
                Hub B2B com entrada única para comparar empresas, soluções industriais e próximos passos comerciais.
              </p>

              <div className="space-y-3">
                <a
                  href="mailto:vendas@raemtools.com.br"
                  className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors text-sm"
                >
                  <HiOutlineMail className="w-5 h-5 text-amber-400" />
                  vendas@raemtools.com.br
                </a>
                <a
                  href="tel:+5512988737347"
                  className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors text-sm"
                >
                  <HiOutlinePhone className="w-5 h-5 text-amber-400" />
                  +55 12 98873-7347
                </a>
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <HiOutlineLocationMarker className="w-5 h-5 text-amber-400" />
                  Taubaté - SP
                </div>
              </div>
            </motion.div>
          </div>

          {linkGroups.map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 * (index + 1) }}
            >
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-6">{group.title}</h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.href + link.label}>
                    {link.href.startsWith("http") ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-300 hover:text-white transition-colors text-sm"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className="text-slate-300 hover:text-white transition-colors text-sm">
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

      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-sm">© {year} Elcio Representação Comercial. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-slate-300 hover:text-white hover:border-amber-400 transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
