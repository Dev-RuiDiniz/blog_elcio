"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { buildContactHref, buildWhatsappHref } from "@/lib/lead-context";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/marcas", label: "Empresas" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

const ctaButtons = [
  {
    label: "Comparar empresas",
    href: "/marcas",
    variant: "outline" as const,
  },
  {
    label: "WhatsApp",
    href: buildWhatsappHref({ origem: "header" }),
    variant: "solid" as const,
  },
];

function normalizeCtaHref(href: string, origem: string) {
  if (!href.startsWith("/contato")) return href;

  const queryIndex = href.indexOf("?");
  if (queryIndex < 0) {
    return buildContactHref({ assunto: "consultoria-catalogo", origem });
  }

  const params = new URLSearchParams(href.slice(queryIndex + 1));
  const assunto = params.get("assunto");
  const empresa = params.get("empresa");
  const origemParam = params.get("origem") || origem;

  return buildContactHref({
    assunto: !assunto || assunto === "catalogo" ? "consultoria-catalogo" : assunto,
    empresa,
    origem: origemParam,
  });
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const hasDarkHeroAtTop =
    pathname === "/marcas" || pathname.startsWith("/p/") || pathname.startsWith("/solucoes/");
  const showDarkElements = isScrolled || !hasDarkHeroAtTop;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Topbar — visível em desktop, some ao rolar */}
      <div
        className={`hidden md:flex transition-all duration-300 overflow-hidden bg-[#0a1d37] text-white px-4 md:px-12 justify-between items-center text-xs border-b border-white/10 ${
          isScrolled ? "max-h-0 py-0 opacity-0" : "max-h-12 py-2 opacity-100"
        }`}
      >
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <HiOutlineMail className="text-amber-400 w-4 h-4" />
            <span>vendas@raemtools.com.br</span>
          </div>
          <div className="flex items-center gap-2">
            <HiOutlinePhone className="text-amber-400 w-4 h-4" />
            <span>+55 12 98873-7347</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <HiOutlineLocationMarker className="text-amber-400 w-4 h-4" />
          <span>Taubaté – SP</span>
        </div>
      </div>

      {/* Nav principal */}
      <div className={`transition-all duration-300 ${
        showDarkElements ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-[4.5rem] sm:h-20">
          <Link href="/" className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full border flex items-center justify-center text-xs font-semibold tracking-wider transition-colors ${
                showDarkElements ? "border-zinc-700 text-zinc-900" : "border-white text-white"
              }`}
            >
              ER
            </div>
            <div className="hidden sm:block">
              <p
                className={`text-sm font-semibold leading-tight transition-colors ${
                  showDarkElements ? "text-zinc-900" : "text-white"
                }`}
              >
                Elcio Representação
              </p>
              <p
                className={`text-[11px] uppercase tracking-[0.2em] transition-colors ${
                  showDarkElements ? "text-zinc-500" : "text-white/70"
                }`}
              >
                Comercial B2B
              </p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors ${
                    showDarkElements
                      ? active
                        ? "text-zinc-900"
                        : "text-zinc-600 hover:text-zinc-900"
                      : active
                        ? "text-white"
                        : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {ctaButtons.map((button) => {
              const href = normalizeCtaHref(button.href, "header");
              return button.variant === "outline" ? (
                <Button
                  key={button.label}
                  variant="outline"
                  className={`font-medium tracking-wide transition-all duration-300 ${
                    showDarkElements
                      ? "border-zinc-700 text-zinc-900 hover:bg-zinc-900 hover:text-white"
                      : "border-white/80 text-white bg-transparent hover:bg-white hover:text-zinc-900"
                  }`}
                  asChild
                >
                  {href.startsWith("http") ? (
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      {button.label}
                    </a>
                  ) : (
                    <Link href={href}>{button.label}</Link>
                  )}
                </Button>
              ) : (
                <Button
                  key={button.label}
                  className="font-medium tracking-wide bg-amber-500 hover:bg-amber-600 text-white transition-all duration-300"
                  asChild
                >
                  {href.startsWith("http") ? (
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      {button.label}
                    </a>
                  ) : (
                    <Link href={href}>{button.label}</Link>
                  )}
                </Button>
              );
            })}
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button
                className={`flex flex-col items-center justify-center gap-1.5 p-2 transition-colors duration-300 lg:hidden ${
                  showDarkElements ? "text-zinc-900" : "text-white"
                }`}
                aria-label="Menu"
              >
                <span className={`block w-6 h-[2px] ${showDarkElements ? "bg-zinc-900" : "bg-white"}`} />
                <span className={`block w-6 h-[2px] ${showDarkElements ? "bg-zinc-900" : "bg-white"}`} />
                <span className={`block w-4 h-[2px] ${showDarkElements ? "bg-zinc-900" : "bg-white"}`} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[450px] bg-zinc-900 text-white border-none p-8 pt-12">
              <div className="flex flex-col h-full pt-16">
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08 }}
                    >
                      <SheetClose asChild>
                        <Link
                          href={link.href}
                          className="block py-4 text-4xl font-serif font-light text-white/80 hover:text-white transition-colors border-b border-white/10"
                        >
                          {link.label}
                        </Link>
                      </SheetClose>
                    </motion.div>
                  ))}
                </nav>

                <div className="mt-auto pb-12">
                  <div className="mb-8 space-y-2 text-white/60 text-sm">
                    <p>vendas@raemtools.com.br</p>
                    <p>+55 12 98873-7347</p>
                    <p>Taubaté - SP</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    {ctaButtons.map((button) => {
                      const href = normalizeCtaHref(button.href, "header-menu");
                      const content = href.startsWith("http") ? (
                        <a href={href} target="_blank" rel="noopener noreferrer">
                          {button.label}
                        </a>
                      ) : (
                        <Link href={href}>{button.label}</Link>
                      );

                      return button.variant === "outline" ? (
                        <Button
                          key={button.label}
                          variant="outline"
                          className="w-full border-white text-white bg-transparent hover:bg-white hover:text-zinc-900"
                          asChild
                        >
                          {content}
                        </Button>
                      ) : (
                        <Button key={button.label} className="w-full bg-white text-zinc-900 hover:bg-zinc-100" asChild>
                          {content}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      </div>
    </motion.header>
  );
}
