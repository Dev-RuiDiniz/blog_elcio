"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { SearchButton } from "./SearchModal";

const defaultNavLinks = [
  { href: "/", label: "Home" },
  { href: "/produtos", label: "Produtos" },
  { href: "/marcas", label: "Nossas Marcas" },
  { href: "/blog", label: "Blog" },
  { href: "/sobre", label: "Sobre" },
  { href: "/manutencao", label: "Manutenção" },
  { href: "/contato", label: "Contato" },
];

const defaultCtaButtons = [
  { label: "Solicitar Catálogo", href: "/contato?assunto=catalogo", variant: "outline" as const },
  { label: "Falar com Consultor", href: "https://wa.me/5511981982279?text=Olá! Gostaria de falar com um consultor.", variant: "solid" as const },
];

interface HeaderConfigData {
  logoUrl?: string;
  logoWhiteUrl?: string;
  subtitle?: string;
  subtitleLine2?: string;
  navLinks?: Array<{ label: string; href: string }>;
  ctaButtons?: Array<{ label: string; href: string; variant: "outline" | "solid" }>;
  contactEmail?: string;
  contactPhone?: string;
  contactCity?: string;
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<HeaderConfigData | null>(null);
  const pathname = usePathname();
  
  // Na home, header começa transparente. Em outras páginas, começa com fundo
  const isHome = pathname === "/";
  const showDarkElements = isScrolled || !isHome;

  const navLinks = config?.navLinks || defaultNavLinks;
  const ctaButtons = config?.ctaButtons || defaultCtaButtons;
  const subtitle = config?.subtitle || "Distribuidor Exclusivo";
  const subtitleLine2 = config?.subtitleLine2 || "Maletti e Nilo";
  const logoUrl = config?.logoUrl || "/logoshr-dark.png";
  const logoWhiteUrl = config?.logoWhiteUrl || "/logoshr-white.png";
  const contactEmail = config?.contactEmail || "marketing@shrhair.com.br";
  const contactPhone = config?.contactPhone || "(11) 98198-2279";
  const contactCity = config?.contactCity || "São Paulo, SP";

  useEffect(() => {
    fetch("/api/layout?type=header&variant=shr")
      .then((r) => r.json())
      .then((data) => {
        if (data.config?.content) setConfig(data.config.content);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        showDarkElements
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.02 }} className="relative h-16 w-[180px]">
              {/* Logo White - quando header transparente */}
              <Image
                src={logoWhiteUrl}
                alt="SHR - Distribuidor Exclusivo Maletti"
                fill
                className={`object-contain object-left transition-opacity duration-300 ${showDarkElements ? "opacity-0" : "opacity-100"}`}
                priority
              />
              {/* Logo Dark - quando header com fundo */}
              <Image
                src={logoUrl}
                alt="SHR - Distribuidor Exclusivo Maletti"
                fill
                className={`object-contain object-left transition-opacity duration-300 ${showDarkElements ? "opacity-100" : "opacity-0"}`}
                priority
              />
            </motion.div>
            <div className={`hidden sm:block text-[10px] leading-tight uppercase tracking-wider transition-colors duration-300 ${showDarkElements ? "text-gray-500" : "text-white/70"}`}>
              <span className="block">{subtitle}</span>
              <span className="block font-medium">{subtitleLine2}</span>
            </div>
          </Link>

          {/* Right Side - CTAs + Menu */}
          <div className="flex items-center gap-6">
            {/* Search Button */}
            <SearchButton showDarkElements={showDarkElements} />

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-4">
              {ctaButtons.map((btn, i) => (
                btn.variant === "outline" ? (
                  <Button
                    key={i}
                    variant="outline"
                    className={`font-medium tracking-wide transition-all duration-300 ${showDarkElements ? "border-black text-black hover:bg-black hover:text-white" : "border-white/80 text-white bg-transparent hover:bg-white hover:text-black"}`}
                    asChild
                  >
                    {btn.href.startsWith("http") ? (
                      <a href={btn.href} target="_blank" rel="noopener noreferrer">{btn.label}</a>
                    ) : (
                      <Link href={btn.href}>{btn.label}</Link>
                    )}
                  </Button>
                ) : (
                  <Button key={i} className={`font-medium tracking-wide transition-all duration-300 ${showDarkElements ? "bg-black text-white hover:bg-gray-800" : "bg-white text-black hover:bg-gray-100"}`} asChild>
                    {btn.href.startsWith("http") ? (
                      <a href={btn.href} target="_blank" rel="noopener noreferrer">{btn.label}</a>
                    ) : (
                      <Link href={btn.href}>{btn.label}</Link>
                    )}
                  </Button>
                )
              ))}
            </div>

            {/* Hamburger Menu - Always visible */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button 
                  className={`flex flex-col items-center justify-center gap-1.5 p-2 transition-colors duration-300 ${showDarkElements ? "text-black" : "text-white"}`}
                  aria-label="Menu"
                >
                  <span className={`block w-6 h-[2px] transition-all duration-300 ${showDarkElements ? "bg-black" : "bg-white"}`} />
                  <span className={`block w-6 h-[2px] transition-all duration-300 ${showDarkElements ? "bg-black" : "bg-white"}`} />
                  <span className={`block w-4 h-[2px] transition-all duration-300 ${showDarkElements ? "bg-black" : "bg-white"}`} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[450px] bg-black text-white border-none p-8 pt-12">
                <div className="flex flex-col h-full pt-16">
                  {/* Menu Links */}
                  <nav className="flex flex-col gap-1">
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
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

                  {/* Contact Info */}
                  <div className="mt-auto pb-12">
                    <div className="mb-8 space-y-3 text-white/60 text-sm">
                      <p>{contactEmail}</p>
                      <p>{contactPhone}</p>
                      <p>{contactCity}</p>
                    </div>
                    
                    <div className="flex flex-col gap-3">
                      {ctaButtons.map((btn, i) => (
                        btn.variant === "outline" ? (
                          <Button
                            key={i}
                            variant="outline"
                            className="w-full border-white text-white bg-transparent hover:bg-white hover:text-black"
                            asChild
                          >
                            {btn.href.startsWith("http") ? (
                              <a href={btn.href} target="_blank" rel="noopener noreferrer">{btn.label}</a>
                            ) : (
                              <Link href={btn.href}>{btn.label}</Link>
                            )}
                          </Button>
                        ) : (
                          <Button key={i} className="w-full bg-white text-black hover:bg-gray-100" asChild>
                            {btn.href.startsWith("http") ? (
                              <a href={btn.href} target="_blank" rel="noopener noreferrer">{btn.label}</a>
                            ) : (
                              <Link href={btn.href}>{btn.label}</Link>
                            )}
                          </Button>
                        )
                      ))}
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
