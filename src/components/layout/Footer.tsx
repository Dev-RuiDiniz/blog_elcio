"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { HiOutlineLocationMarker, HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { buildContactHref, buildWhatsappHref } from "@/lib/lead-context";

const linkGroups = [
  {
    title: "Navegação",
    links: [
      { href: "/", label: "Home" },
      { href: "/marcas", label: "Empresas" },
      { href: "/blog", label: "Blog" },
      { href: "/contato", label: "Contato" },
    ],
  },
  {
    title: "Empresas",
    links: [
      { href: "/p/dest-dormer-pramet", label: "DEST DORMER PRAMET" },
      { href: "/p/fecial", label: "Fecial" },
      { href: "/p/solufil", label: "Solufil" },
      { href: "/p/deltajet", label: "Deltajet" },
      { href: "/p/f1300", label: "F1300" },
      { href: "/p/apresenta", label: "Apresenta (provisório)" },
    ],
  },
  {
    title: "Conversão",
    links: [
      {
        href: buildContactHref({ assunto: "consultoria-catalogo", origem: "footer" }),
        label: "Consultoria + Catálogo",
      },
      {
        href: buildWhatsappHref({ origem: "footer" }),
        label: "Falar no WhatsApp",
      },
    ],
  },
];

const socialLinks = [
  { href: "https://example.com", icon: FaInstagram, label: "Instagram" },
  { href: "https://example.com", icon: FaLinkedinIn, label: "LinkedIn" },
  { href: buildWhatsappHref({ origem: "footer-social" }), icon: FaWhatsapp, label: "WhatsApp" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-zinc-900 text-white">
      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
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
              <h3 className="text-xl font-serif font-semibold mb-3">Elcio Representação Comercial</h3>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-sm mb-8">
                Representação comercial B2B com atendimento consultivo para direcionar sua demanda à empresa mais aderente.
              </p>

              <div className="space-y-3">
                <a
                  href="mailto:contato@elcio-representacao.com.br"
                  className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors text-sm"
                >
                  <HiOutlineMail className="w-5 h-5" />
                  contato@elcio-representacao.com.br
                </a>
                <a
                  href="tel:+550000000000"
                  className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors text-sm"
                >
                  <HiOutlinePhone className="w-5 h-5" />
                  (00) 00000-0000
                </a>
                <div className="flex items-center gap-3 text-zinc-400 text-sm">
                  <HiOutlineLocationMarker className="w-5 h-5" />
                  Brasil
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
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-6">{group.title}</h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.href + link.label}>
                    {link.href.startsWith("http") ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-white transition-colors text-sm"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className="text-zinc-400 hover:text-white transition-colors text-sm">
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

      <div className="border-t border-zinc-800">
        <div className="container mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-sm">© {year} Elcio Representação Comercial. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white transition-colors"
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
