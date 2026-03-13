import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildContactHref, buildWhatsappHref } from "@/lib/lead-context";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageType = searchParams.get("page") || "home";

  if (pageType === "contato") {
    return seedContato();
  }
  
  if (pageType === "manutencao") {
    return seedManutencao();
  }
  
  if (pageType === "produtos") {
    return seedProdutos();
  }
  
  if (pageType === "marcas") {
    return seedMarcas();
  }
  
  if (pageType === "sobre") {
    return seedSobre();
  }

  return seedHome();
}

async function seedSobre() {
  try {
    const page = await prisma.page.findFirst({ where: { slug: "sobre" } });
    if (!page) return NextResponse.json({ error: "Sobre page not found" }, { status: 404 });

    await prisma.pageBlock.deleteMany({ where: { pageId: page.id } });

    const blocks = [
      {
        type: "about-hero",
        order: 0,
        active: true,
        content: {
          badge: "Sobre Nós",
          title: "A arte de|transformar|salões",
          description: "Há mais de uma década, a SHR é referência no mercado brasileiro de mobiliário para salões de beleza e spas. Como distribuidor exclusivo da Maletti, trazemos o melhor do design italiano para transformar espaços em experiências únicas.",
          buttonText: "Conhecer Produtos",
          buttonLink: "/marcas",
          secondaryButtonText: "Falar Conosco",
          secondaryLink: buildContactHref({ assunto: "consultoria-catalogo", origem: "sobre-cta" }),
          stat1Value: "10+",
          stat1Label: "Anos de mercado",
          stat2Value: "500+",
          stat2Label: "Clientes",
        },
      },
      {
        type: "about-mission",
        order: 1,
        active: true,
        content: {
          badge: "Nossa Missão",
          quote: "Transformar salões de beleza em espaços de excelência, proporcionando aos profissionais as melhores ferramentas para encantar seus clientes.",
          author: "— Equipe SHR",
        },
      },
      {
        type: "about-values",
        order: 2,
        active: true,
        content: {
          badge: "Nossos Valores",
          title: "O que nos guia",
          values: [
            { title: "Excelência", description: "Buscamos a perfeição em cada detalhe, desde o atendimento até a entrega final." },
            { title: "Confiança", description: "Construímos relacionamentos duradouros baseados em transparência e honestidade." },
            { title: "Inovação", description: "Trazemos as últimas tendências e tecnologias do mercado internacional." },
            { title: "Parceria", description: "Trabalhamos lado a lado com nossos clientes para alcançar seus objetivos." },
          ],
        },
      },
      {
        type: "about-partnership",
        order: 3,
        active: true,
        content: {
          badge: "Parceria Exclusiva",
          title: "Maletti: Tradição italiana desde 1965",
          description1: "A Maletti é uma das mais prestigiadas fabricantes de mobiliário para salões de beleza do mundo. Com mais de 55 anos de história, a marca italiana é sinônimo de inovação, qualidade e design sofisticado.",
          description2: "Como distribuidor exclusivo no Brasil, a SHR oferece toda a linha de produtos Maletti com garantia de originalidade, suporte técnico especializado e peças de reposição originais.",
          buttonText: "Ver Produtos Maletti",
          buttonLink: "/marcas",
          yearsBadge: "55+",
          yearsBadgeLabel: "Anos de história",
        },
      },
      {
        type: "about-cta",
        order: 4,
        active: true,
        content: {
          title: "Pronto para transformar seu salão?",
          description: "Entre em contato conosco e descubra como os produtos Maletti podem elevar o padrão do seu negócio.",
          buttonText: "Entrar em Contato",
          buttonLink: buildContactHref({ assunto: "consultoria-catalogo", origem: "sobre-cta" }),
          secondaryButtonText: "WhatsApp",
          secondaryLink: buildWhatsappHref({ assunto: "consultoria-catalogo", origem: "sobre-cta" }),
        },
      },
    ];

    for (const block of blocks) {
      await prisma.pageBlock.create({
        data: { pageId: page.id, type: block.type, content: block.content, order: block.order, active: block.active },
      });
    }

    return NextResponse.json({ success: true, message: "Sobre page now has 5 blocks!", pageId: page.id, blocksCreated: blocks.length });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

async function seedMarcas() {
  try {
    const page = await prisma.page.findFirst({ where: { slug: "marcas" } });
    if (!page) return NextResponse.json({ error: "Marcas page not found" }, { status: 404 });

    await prisma.pageBlock.deleteMany({ where: { pageId: page.id } });

    const blocks = [
      {
        type: "brands-hero",
        order: 0,
        active: true,
        content: {
          badge: "Nossas Marcas",
          title: "Excelência|em cada|detalhe",
          description: "Trabalhamos com as marcas mais prestigiadas do mercado mundial de mobiliário para salões de beleza e spas. Cada marca em nosso portfólio representa o compromisso com qualidade, inovação e design.",
          buttonText: "Ver Produtos",
          buttonLink: "/marcas",
        },
      },
      {
        type: "brands-section",
        order: 1,
        active: true,
        content: {
          badge: "Portfólio",
          title: "Marcas que representamos",
        },
      },
      {
        type: "brands-partnership",
        order: 2,
        active: true,
        content: {
          badge: "Nossas Parcerias",
          title: "Marcas que confiam na SHR",
          description: "A SHR é o elo entre as maiores marcas internacionais e o mercado brasileiro. Nossas parcerias exclusivas garantem que você tenha acesso ao que há de melhor em mobiliário e equipamentos para salões.",
        },
      },
      {
        type: "brands-cta",
        order: 3,
        active: true,
        content: {
          title: "Quer conhecer nossos produtos?",
          description: "Explore nosso catálogo completo e descubra como as marcas que representamos podem transformar seu salão.",
          buttonText: "Ver Produtos",
          buttonLink: "/marcas",
          secondaryButtonText: "Consultoria + Catálogo",
          secondaryLink: buildContactHref({ assunto: "consultoria-catalogo", origem: "marcas-cta" }),
        },
      },
    ];

    for (const block of blocks) {
      await prisma.pageBlock.create({
        data: { pageId: page.id, type: block.type, content: block.content, order: block.order, active: block.active },
      });
    }

    return NextResponse.json({ success: true, message: "Marcas page now has 4 blocks!", pageId: page.id, blocksCreated: blocks.length });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

async function seedProdutos() {
  try {
    const page = await prisma.page.findFirst({
      where: { slug: "produtos" },
    });

    if (!page) {
      return NextResponse.json({ error: "Produtos page not found" }, { status: 404 });
    }

    await prisma.pageBlock.deleteMany({ where: { pageId: page.id } });

    const blocks = [
      {
        type: "products-hero",
        order: 0,
        active: true,
        content: {
          badge: "Catálogo",
          title: "Nossos Produtos",
          description: "Conheça a linha completa de produtos Maletti disponível exclusivamente através da SHR no Brasil. Design italiano, qualidade premium e tecnologia de ponta para transformar seu salão.",
        },
      },
      {
        type: "products-grid",
        order: 1,
        active: true,
        content: {
          mode: "all",
          selectedCategories: [],
          selectedProducts: [],
          limit: null,
        },
      },
      {
        type: "products-cta",
        order: 2,
        active: true,
        content: {
          title: "Precisa de ajuda para escolher?",
          description: "Nossa equipe de consultores está pronta para ajudar você a encontrar os produtos ideais para o seu salão.",
          buttonText: "Falar no WhatsApp",
          whatsappLink: "https://wa.me/5511981982279?text=Olá! Preciso de ajuda para escolher produtos Maletti.",
          secondaryButtonText: "Consultoria + Catálogo",
          secondaryLink: buildContactHref({ assunto: "consultoria-catalogo", origem: "produtos-cta" }),
        },
      },
    ];

    for (const block of blocks) {
      await prisma.pageBlock.create({
        data: { pageId: page.id, type: block.type, content: block.content, order: block.order, active: block.active },
      });
    }

    return NextResponse.json({ success: true, message: "Produtos page now has 3 blocks!", pageId: page.id, blocksCreated: blocks.length });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

async function seedManutencao() {
  try {
    const page = await prisma.page.findFirst({
      where: { slug: "manutencao" },
    });

    if (!page) {
      return NextResponse.json({ error: "Manutencao page not found" }, { status: 404 });
    }

    await prisma.pageBlock.deleteMany({ where: { pageId: page.id } });

    const blocks = [
      {
        type: "maintenance-hero",
        order: 0,
        active: true,
        content: {
          badge: "Suporte Técnico",
          title: "Manutenção",
          description: "Nossa equipe técnica especializada está preparada para manter seus equipamentos Maletti sempre em perfeito funcionamento. Oferecemos suporte completo com peças originais e garantia de serviço.",
          image: "/manutencao.webp",
          buttonText: "Solicitar Manutenção",
          whatsappLink: "https://wa.me/5511945370735?text=Olá! Preciso de suporte técnico para meu equipamento Maletti.",
        },
      },
      {
        type: "maintenance-services",
        order: 1,
        active: true,
        content: {
          badge: "Nossos Serviços",
          title: "Como podemos ajudar",
          services: [
            { icon: "wrench", title: "Manutenção Preventiva", description: "Revisões periódicas para garantir o funcionamento perfeito dos seus equipamentos e prolongar sua vida útil.", features: ["Inspeção completa", "Lubrificação", "Ajustes técnicos", "Relatório detalhado"] },
            { icon: "clock", title: "Manutenção Corretiva", description: "Atendimento rápido para resolver problemas e minimizar o tempo de inatividade do seu equipamento.", features: ["Diagnóstico preciso", "Reparo especializado", "Peças originais", "Garantia do serviço"] },
            { icon: "check", title: "Instalação Profissional", description: "Instalação técnica realizada por profissionais treinados, garantindo o funcionamento ideal desde o primeiro dia.", features: ["Montagem completa", "Configuração", "Teste de funcionamento", "Treinamento de uso"] },
          ],
        },
      },
      {
        type: "maintenance-benefits",
        order: 2,
        active: true,
        content: {
          badge: "Por que escolher a SHR",
          title: "Suporte que você pode confiar",
          description: "Como distribuidor exclusivo da Maletti no Brasil, oferecemos suporte técnico especializado com conhecimento profundo dos produtos e acesso direto a peças originais.",
          benefits: [
            { icon: "shield", title: "Peças Originais", description: "Utilizamos exclusivamente peças originais Maletti em todos os reparos." },
            { icon: "truck", title: "Atendimento Nacional", description: "Equipe técnica disponível para atendimento em todo o território brasileiro." },
            { icon: "clock", title: "Resposta Rápida", description: "Agilidade no atendimento para minimizar o impacto no seu negócio." },
            { icon: "check", title: "Garantia de Serviço", description: "Todos os serviços realizados possuem garantia de qualidade." },
          ],
        },
      },
      {
        type: "maintenance-cta",
        order: 3,
        active: true,
        content: {
          title: "Precisa de suporte técnico?",
          description: "Entre em contato conosco para agendar uma visita técnica ou solicitar orçamento de manutenção.",
          buttonText: "Solicitar via WhatsApp",
          whatsappLink: "https://wa.me/5511945370735?text=Olá! Gostaria de solicitar manutenção para meu equipamento Maletti.",
        },
      },
      {
        type: "maintenance-faq",
        order: 4,
        active: true,
        content: {
          badge: "Dúvidas Frequentes",
          title: "Perguntas e Respostas",
          faqs: [
            { question: "Qual o prazo para atendimento de manutenção?", answer: "O prazo varia de acordo com a região e disponibilidade da equipe técnica. Em São Paulo capital, o atendimento pode ser realizado em até 48 horas." },
            { question: "Vocês atendem equipamentos fora da garantia?", answer: "Sim, realizamos manutenção em todos os equipamentos Maletti, independente do período de garantia." },
            { question: "Como solicitar uma manutenção?", answer: "Você pode solicitar manutenção através do formulário nesta página, pelo WhatsApp ou ligando para nossa central de atendimento." },
            { question: "Vocês oferecem contrato de manutenção?", answer: "Sim, oferecemos contratos de manutenção preventiva com visitas periódicas programadas." },
          ],
        },
      },
    ];

    for (const block of blocks) {
      await prisma.pageBlock.create({
        data: { pageId: page.id, type: block.type, content: block.content, order: block.order, active: block.active },
      });
    }

    return NextResponse.json({ success: true, message: "Manutencao page now has 5 blocks!", pageId: page.id, blocksCreated: blocks.length });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

async function seedContato() {
  try {
    const contatoPage = await prisma.page.findFirst({
      where: {
        OR: [
          { id: "page-contato" },
          { slug: "contato" },
        ],
      },
    });

    if (!contatoPage) {
      return NextResponse.json({ error: "Contato page not found" }, { status: 404 });
    }

    await prisma.pageBlock.deleteMany({
      where: { pageId: contatoPage.id },
    });

    const blocks = [
      {
        type: "contact-hero",
        order: 0,
        active: true,
        content: {
          badge: "Contato",
          title: "Fale Conosco",
          description: "Estamos prontos para ajudar você a transformar seu salão. Entre em contato para solicitar catálogo, tirar dúvidas ou agendar uma visita ao nosso showroom.",
        },
      },
      {
        type: "contact-options",
        order: 1,
        active: true,
        content: {
          options: [
            { icon: "download", title: "Consultoria + Catálogo", description: "Receba orientação comercial e acesso ao material técnico.", action: "catalog" },
            { icon: "chat", title: "Falar no WhatsApp", description: "Inicie seu primeiro atendimento com contexto da demanda.", action: "contact" },
            { icon: "calendar", title: "Agendar Visita", description: "Visite nosso showroom e conheça os produtos pessoalmente.", action: "contact" },
          ],
        },
      },
      {
        type: "contact-info",
        order: 2,
        active: true,
        content: {
          title: "Informações de Contato",
          phone: "(11) 98198-2279",
          phoneRaw: "+5511981982279",
          email: "contato@elcio.com.br",
          address1: "São Paulo, SP",
          address2: "Brasil",
          hours: "Segunda a Sexta: 9h às 18h\nSábado: 9h às 13h",
          whatsappButtonText: "Chamar no WhatsApp",
          whatsappMessage: "Olá! Gostaria de mais informações sobre os produtos Maletti.",
        },
      },
    ];

    for (const block of blocks) {
      await prisma.pageBlock.create({
        data: {
          pageId: contatoPage.id,
          type: block.type,
          content: block.content,
          order: block.order,
          active: block.active,
        },
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Contato page now has 3 blocks!",
      pageId: contatoPage.id,
      blocksCreated: blocks.length 
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

async function seedHome() {
  try {
    // Buscar a página Home
    const homePage = await prisma.page.findFirst({
      where: {
        OR: [
          { id: "page-home" },
          { slug: "home" },
          { name: { contains: "Inicial" } },
        ],
      },
    });

    if (!homePage) {
      return NextResponse.json({ error: "Home page not found" }, { status: 404 });
    }

    // Deletar blocos existentes
    await prisma.pageBlock.deleteMany({
      where: { pageId: homePage.id },
    });

    // Criar os 6 blocos corretos da Home
    const blocks = [
      {
        type: "hero-slider",
        order: 0,
        active: true,
        content: {
          slides: [
            {
              badge: "",
              title: "Maletti",
              subtitle: "A referência mundial em design e inovação",
              description: "Como distribuidor exclusivo no Brasil, a SHR traz a excelência da Maletti Group, unindo tradição artesanal e tecnologia avançada.",
              image: "/images/hero/1.jpg",
              button1Text: "Conhecer Produtos",
              button1Link: "/marcas",
              button2Text: "Fale Conosco",
              button2Link: buildContactHref({ assunto: "consultoria-catalogo", origem: "home-hero" }),
            },
            {
              title: "Nilo",
              subtitle: "O design a serviço do bem-estar",
              description: "Referência global em mobiliário de luxo para SPAs, hotéis e clínicas de estética.",
              image: "/images/hero/2.jpg",
              button1Text: "Ver Coleção",
              button1Link: "/marcas",
            },
            {
              title: "UKI",
              subtitle: "Inovação e estilo com a autêntica assinatura italiana",
              description: "A UKI International une moda e tecnologia para traduzir o \"Italian Sense of Beauty\" em equipamentos de alta performance.",
              image: "/images/hero/3.jpg",
              button1Text: "Conhecer Produtos",
              button1Link: "/marcas",
            },
          ],
          autoplaySpeed: 6000,
        },
      },
      {
        type: "featured-products",
        order: 1,
        active: true,
        content: {
          title: "Produtos em Destaque",
          subtitle: "Coleção",
          showNavigation: true,
          limit: 10,
        },
      },
      {
        type: "why-choose-us",
        order: 2,
        active: true,
        content: {
          title: "Excelência em cada detalhe",
          subtitle: "Por que nos escolher",
          description: "Há mais de uma década, a SHR é referência no mercado brasileiro de mobiliário para salões de beleza e spas. Nossa parceria exclusiva com a Maletti nos permite oferecer o que há de mais sofisticado em design e tecnologia italiana.",
          features: [
            { icon: "shield", title: "Distribuidor Exclusivo", description: "Somos o único representante oficial da Maletti no Brasil, garantindo produtos originais e suporte direto da fábrica." },
            { icon: "cube", title: "Design Italiano", description: "Cada peça é projetada na Itália com os mais altos padrões de design, ergonomia e qualidade de materiais." },
            { icon: "support", title: "Suporte Especializado", description: "Equipe técnica treinada para instalação, manutenção e suporte completo durante toda a vida útil do produto." },
            { icon: "sparkles", title: "Experiência Premium", description: "Transforme seu salão em um ambiente de luxo e proporcione aos seus clientes uma experiência inesquecível." },
          ],
          stats: [
            { value: "10+", label: "Anos de mercado" },
            { value: "500+", label: "Clientes atendidos" },
            { value: "100%", label: "Original Maletti" },
          ],
        },
      },
      {
        type: "maletti-partnership",
        order: 3,
        active: true,
        content: {
          title: "A tradição italiana no seu salão",
          subtitle: "Parceria Exclusiva",
          image: "/images/site/Shirobody_showroom.jpg",
          paragraphs: [
            "A Maletti é uma das mais prestigiadas fabricantes de mobiliário para salões de beleza do mundo. Fundada em 1965 na Itália, a marca é sinônimo de inovação, qualidade e design sofisticado.",
            "Como distribuidor exclusivo no Brasil, a SHR traz toda a excelência Maletti para o mercado nacional, com garantia de originalidade, suporte técnico especializado e peças de reposição originais.",
          ],
          features: [
            "Produtos 100% originais importados da Itália",
            "Garantia estendida e suporte técnico nacional",
            "Showroom exclusivo para visitação",
            "Consultoria personalizada para seu projeto",
          ],
          foundationYear: "1965",
          button1Text: "Conhecer a Maletti",
          button1Link: "/marcas",
          button2Text: "Agendar Visita",
          button2Link: buildContactHref({ assunto: "consultoria-catalogo", origem: "home-partnership" }),
        },
      },
      {
        type: "maintenance-preview",
        order: 4,
        active: true,
        content: {
          title: "Manutenção",
          subtitle: "Suporte Técnico",
          description: "Nossa equipe técnica especializada está preparada para manter seus equipamentos Maletti sempre em perfeito funcionamento. Oferecemos suporte completo, desde a instalação até a manutenção preventiva e corretiva.",
          services: [
            { icon: "wrench", title: "Manutenção Preventiva", description: "Prolongue a vida útil dos seus equipamentos com revisões periódicas." },
            { icon: "clock", title: "Atendimento Rápido", description: "Equipe técnica disponível para atendimento em todo o Brasil." },
            { icon: "check", title: "Peças Originais", description: "Utilizamos apenas peças originais Maletti em todos os reparos." },
          ],
          buttonText: "Solicitar Manutenção",
          buttonLink: "/contato",
        },
      },
      {
        type: "catalog-cta",
        order: 5,
        active: true,
        content: {
          title: "Consultoria + Catálogo",
          subtitle: "Primeiro Contato",
          description: "Fale com o Elcio, receba apoio comercial e avance com o catálogo mais aderente ao seu cenário.",
          phone: "(11) 98198-2279",
          phoneRaw: "+5511981982279",
          whatsappMessage: "Olá! Quero consultoria e catálogo.",
          buttonText: "Solicitar Consultoria + Catálogo",
          consultorButtonText: "Falar no WhatsApp",
        },
      },
    ];

    for (const block of blocks) {
      await prisma.pageBlock.create({
        data: {
          pageId: homePage.id,
          type: block.type,
          content: block.content,
          order: block.order,
          active: block.active,
        },
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Home page now has 6 blocks!",
      pageId: homePage.id,
      blocksCreated: blocks.length 
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
