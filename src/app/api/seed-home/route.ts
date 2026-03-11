import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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
  
  if (pageType === "maletti") {
    return seedMaletti();
  }

  return seedHome();
}

async function seedMaletti() {
  try {
    const page = await prisma.page.findFirst({ where: { slug: "maletti" } });
    if (!page) return NextResponse.json({ error: "Maletti page not found" }, { status: 404 });

    await prisma.pageBlock.deleteMany({ where: { pageId: page.id } });

    const blocks = [
      {
        type: "maletti-hero",
        order: 0,
        active: true,
        content: {
          title: "Transforme Espaços.",
          titleHighlight: "Eleve Experiências.",
          description: "Apresentamos a revolução do bem-estar capilar no Brasil. As estações Maletti Head SPA unem o design italiano a uma tecnologia inovadora para criar uma experiência sensorial que redefine o luxo em seu salão, spa ou clínica.",
          videoUrl: "/Vídeo Home.mp4",
          buttonText: "Solicitar Catálogo",
        },
      },
      {
        type: "maletti-essencia",
        order: 1,
        active: true,
        content: {
          badge: "Nossa História",
          title: "A Essência Maletti",
          description: "Nossa essência vai além da criação de móveis para salão de beleza de luxo. É uma tradição que une a arte do design italiano à inovação tecnológica em cada detalhe. O resultado são peças que encantam pelo estilo, entregam performance, conforto absoluto e a experiência de bem-estar que define a sua marca.",
          showroomImage: "/images/site/Shirobody_showroom.jpg",
          stats: [
            { number: "60+", label: "Anos de história" },
            { number: "90+", label: "Países atendidos" },
            { number: "15", label: "Showrooms no mundo" },
            { number: "500+", label: "Parceiros globais" },
          ],
        },
      },
      {
        type: "maletti-brasil",
        order: 2,
        active: true,
        content: {
          badge: "Distribuidor Exclusivo",
          title: "Maletti no Brasil",
          description: "Como parceira exclusiva da Maletti no Brasil, a SHR HAIR garante o sucesso do seu negócio, transformando seu investimento em alta rentabilidade e experiências inesquecíveis.",
          description2: "Nosso suporte completo assegura essa excelência com instalação, treinamento e manutenção preventiva.",
          buttonText: "Falar com Especialista",
          whatsappLink: "https://wa.me/5511981982279?text=Olá! Gostaria de falar com um especialista sobre produtos Maletti.",
          secondaryButtonText: "Suporte Técnico",
          secondaryLink: "https://shrhair.com.br/manutencao",
          carouselImages: [
            { src: "/images/site/Shirobody_showroom.jpg", alt: "Shirobody Showroom" },
            { src: "/images/site/heaven2.jpg", alt: "Heaven" },
            { src: "/images/site/Total-Body-356.jpg", alt: "Total Body" },
            { src: "/images/site/DK3E3179-MOD.jpg", alt: "Maletti Design" },
            { src: "/images/site/Head-spa-1.jpg", alt: "Head Spa" },
          ],
        },
      },
      {
        type: "maletti-headspa",
        order: 3,
        active: true,
        content: {
          badge: "Tendência Mundial",
          title: "Maletti Head SPA",
          description: "As Estações Maletti Head SPA transformam o cuidado capilar em um ritual de bem-estar e resultados, promovendo a saúde do couro cabeludo através de uma experiência holística.",
          buttonText: "Conhecer Estações Head SPA",
          buttonLink: "https://www.shrhair.com.br/produtos?categoria=head-spa",
          images: [
            "/images/site/Head-spa-1.jpg",
            "/images/site/Head-spa-2.jpg",
            "/images/site/Head-spa-3.jpg",
            "/images/site/Head-spa-4.jpg",
            "/images/site/Head-spa-5.jpg",
            "/images/site/Head-spa-6.jpg",
          ],
          benefits: [
            { title: "Diferenciação", description: "Destaque-se no mercado oferecendo uma experiência única e exclusiva aos seus clientes." },
            { title: "Ticket Médio", description: "Aumente a rentabilidade do seu negócio com serviços premium de alto valor agregado." },
            { title: "Fidelização", description: "Conquiste e fidelize um público de alto padrão que busca experiências exclusivas." },
          ],
        },
      },
      {
        type: "maletti-design",
        order: 4,
        active: true,
        content: {
          badge: "Excelência em Mobiliário",
          title: "Design e Experiências",
          description: "A excelência em móveis para salão de beleza de luxo: Veja o autêntico design italiano em sua máxima performance. Assista e sinta por que o mobiliário de alto padrão Maletti é a escolha perfeita para transformar seu espaço.",
          videoThumbnail: "/images/site/DK3E3179-MOD.jpg",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          products: [
            { name: "Shirobody", image: "/images/site/Shirobody_showroom.jpg", description: "Lavatório com tecnologia shiatsu integrada" },
            { name: "Heaven", image: "/images/site/heaven2.jpg", description: "Design e conforto para lavagem de cabelos" },
            { name: "Total Body", image: "/images/site/Total-Body-356.jpg", description: "Maca de luxo para tratamentos corporais" },
            { name: "SPA Garçon", image: "/images/site/SPA_GARCON_nuovo_03.png", description: "Tratamento capilar com tecnologia de vapor" },
          ],
        },
      },
      {
        type: "maletti-catalogo",
        order: 5,
        active: true,
        content: {
          badge: "Material Exclusivo",
          title: "Catálogo Maletti",
          description: "Acesse o Catálogo Maletti e tenha em mãos a ferramenta completa para o seu projeto. Conheça todas as linhas de produtos, especificações técnicas e opções de personalização.",
          catalogImage: "/images/site/PLANIMETRIA-La-Beautique---Mongolia-Multifunzione.jpg",
          formTitle: "Solicite seu Catálogo",
          formDescription: "Preencha seus dados e receba o catálogo Maletti.",
          buttonText: "Receber Catálogo",
        },
      },
    ];

    for (const block of blocks) {
      await prisma.pageBlock.create({
        data: { pageId: page.id, type: block.type, content: block.content, order: block.order, active: block.active },
      });
    }

    return NextResponse.json({ success: true, message: "Maletti page now has 6 blocks!", pageId: page.id, blocksCreated: blocks.length });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
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
          buttonLink: "/produtos",
          secondaryButtonText: "Falar Conosco",
          secondaryLink: "/contato",
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
          buttonLink: "/produtos",
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
          buttonLink: "/contato",
          secondaryButtonText: "WhatsApp",
          secondaryLink: "https://wa.me/5511981982279",
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
          buttonLink: "/produtos",
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
          buttonLink: "/produtos",
          secondaryButtonText: "Falar com Consultor",
          secondaryLink: "/contato",
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
          buttonText: "Falar com Consultor",
          whatsappLink: "https://wa.me/5511981982279?text=Olá! Preciso de ajuda para escolher produtos Maletti.",
          secondaryButtonText: "Solicitar Catálogo",
          secondaryLink: "/contato",
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
            { icon: "download", title: "Receber Catálogo", description: "Baixe nosso catálogo digital completo com todos os produtos.", action: "catalog" },
            { icon: "chat", title: "Falar com Consultor", description: "Tire suas dúvidas e receba orientação personalizada.", action: "contact" },
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
          email: "marketing@shrhair.com.br",
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
              button1Link: "/produtos",
              button2Text: "Fale Conosco",
              button2Link: "/contato",
            },
            {
              title: "Nilo",
              subtitle: "O design a serviço do bem-estar",
              description: "Referência global em mobiliário de luxo para SPAs, hotéis e clínicas de estética.",
              image: "/images/hero/2.jpg",
              button1Text: "Ver Coleção",
              button1Link: "/produtos",
            },
            {
              title: "UKI",
              subtitle: "Inovação e estilo com a autêntica assinatura italiana",
              description: "A UKI International une moda e tecnologia para traduzir o \"Italian Sense of Beauty\" em equipamentos de alta performance.",
              image: "/images/hero/3.jpg",
              button1Text: "Conhecer Produtos",
              button1Link: "/produtos",
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
          button1Link: "/maletti",
          button2Text: "Agendar Visita",
          button2Link: "/contato",
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
          buttonLink: "/manutencao",
        },
      },
      {
        type: "catalog-cta",
        order: 5,
        active: true,
        content: {
          title: "Receba nosso catálogo completo",
          subtitle: "Catálogo Digital",
          description: "Conheça toda a linha de produtos Maletti disponível no Brasil. Deixe seu e-mail e receba o catálogo digital com especificações técnicas e fotos em alta resolução.",
          phone: "(11) 98198-2279",
          phoneRaw: "+5511981982279",
          whatsappMessage: "Olá! Gostaria de falar com um consultor sobre os produtos Maletti.",
          buttonText: "Receber Catálogo",
          consultorButtonText: "Falar com Consultor",
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
