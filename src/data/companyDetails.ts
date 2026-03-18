export interface CompanyDetailItem {
  title: string;
  description: string;
}

export interface CompanyPageDetail {
  heroDescription: string;
  overviewTitle: string;
  overviewParagraphs: string[];
  products: CompanyDetailItem[];
  services: CompanyDetailItem[];
  sectors: string[];
  differentiators: string[];
  seoDescription: string;
}

export const COMPANY_PAGE_DETAILS: Record<string, CompanyPageDetail> = {
  autoplast: {
    heroDescription:
      "Fabricante brasileira de aditivos e lubrificantes especiais de alta performance com PTFE e MoS2, com mais de 30 anos no mercado, atuando na redução de atrito e proteção de equipamentos mecânicos em operações industriais.",
    overviewTitle: "Lubrificação de alta performance que vai além do óleo convencional",
    overviewParagraphs: [
      "A Autoplast Motores está no mercado desde 1992, desenvolvendo aditivos e lubrificantes especiais com base em PTFE (Teflon®) e MoS2 para reduzir desgastes, ruído, vibração e prolongar a vida útil de equipamentos mecânicos.",
      "Seus produtos tratam a superfície da zona de atrito, revestindo com lubrificante sólido que permanece no local como lubrificação de emergência, eliminando a partida a seco e protegendo contra oxidação mesmo em paradas prolongadas como entressafra.",
    ],
    products: [
      {
        title: "Graxas de alta performance",
        description:
          "Graxas com PTFE e/ou MoS2 para mancais, rolamentos, engrenagens e guias — incluindo MPF, GATFB, NZG-1004T e MPFBI — para operar em ambientes com alta carga, umidade, temperatura ou contaminantes.",
      },
      {
        title: "Óleos e aditivos especiais",
        description:
          "Aditivos concentrados LCC-90, HD-68, ANTIGOTA-V400 e ANTIGOTA-V100 para redutores, sistemas hidráulicos, bombas e pneumática. Formam filme de PTFE que reduz desgaste e protege em paradas prolongadas.",
      },
      {
        title: "Sprays com PTFE e MoS2",
        description:
          "AGBA, NZO SA, PTFE Powder Spray e PTFE+MoS2 Powder Spray para montagem mecânica, correntes, nórias e lubrificação seca — formando filme antiaderente e autolubrificante.",
      },
      {
        title: "AutoCleaning — preparação de superfície",
        description:
          "Produto para dissolver vernizes, borras e carbonizados de óleo sem agredir pintura ou borrachas nitrílicas, preparando a superfície para fixação do PTFE.",
      },
    ],
    services: [
      {
        title: "Diagnóstico e preparação de superfície",
        description:
          "Orientação sobre limpeza e preparo do circuito de lubrificação para garantir a adesão e eficácia do tratamento com PTFE.",
      },
      {
        title: "Tratamento com PTFE e MoS2",
        description:
          "Aplicação dos produtos conforme a necessidade: graxas, óleos, aditivos ou sprays específicos para cada tipo de equipamento e condição operacional.",
      },
      {
        title: "Suporte técnico de aplicação",
        description:
          "Orientação sobre taxas de aplicação, escolha do produto ideal e resultados esperados, com histórico de casos em usinas, colhedoras e equipamentos industriais.",
      },
    ],
    sectors: [
      "Siderurgia e metalurgia",
      "Agronegócio — usinas de açúcar e álcool, colhedoras e implementos",
      "Cerâmica, têxtil e indústrias alimentícias",
      "Frigoríficos, transporte e armazéns",
    ],
    differentiators: [
      "No mercado desde 1992, com clientes em múltiplos segmentos industriais",
      "PTFE com coeficiente de atrito entre 0,02 e 0,1 — equivalente a gelo/gelo",
      "Redução comprovada de 57% em ruído e vibração em redutores de usina de açúcar",
      "AutoCleaning dissolve verniz de óleo sem agredir pintura ou borrachas nitrílicas",
    ],
    seoDescription:
      "Conheça a Autoplast Motores: aditivos e lubrificantes especiais com PTFE e MoS2 para redução de atrito, proteção e aumento da vida útil de equipamentos industriais.",
  },
  ardiri: {
    heroDescription:
      "Soluções empresariais em qualidade de energia com Filtros Capacitivos certificados pelos principais institutos nacionais e internacionais, gerando proteção de equipamentos, aumento de produtividade e economia de energia elétrica com payback em 10 meses.",
    overviewTitle: "Energia mais limpa que protege equipamentos e reduz custos",
    overviewParagraphs: [
      "A Ardiri comercializa Filtros Capacitivos Lumilight que identificam distúrbios elétricos — distorções harmônicas, transitórios impulsivos, variações de tensão e espúrios — e os desviam para o aterramento, entregando energia mais limpa à rede interna.",
      "Distribuidora oficial Lumilight do Brasil, a Ardiri instala os equipamentos em paralelo à rede por profissionais homologados pelo fabricante, garantindo proteção sem interrupção da operação e 10 anos de garantia.",
    ],
    products: [
      {
        title: "Filtros Capacitivos Lumilight",
        description:
          "Equipamento eletrônico em alto padrão tecnológico que identifica e desvia para o aterramento os transientes elétricos que causam distúrbios, queimas e perdas de produtividade.",
      },
      {
        title: "Instalação trifásica em paralelo",
        description:
          "Instalação segura em paralelo à rede sem necessidade de interrupção da operação, seguindo todas as normas e procedimentos técnicos.",
      },
    ],
    services: [
      {
        title: "Instalação por profissionais homologados",
        description:
          "Instalação realizada por equipe certificada pelo fabricante, com aterramento adequado (ideal ≤ 5 Ω, aceitável ≤ 10 Ω) e conformidade técnica.",
      },
      {
        title: "Monitoramento de resultados e ROI",
        description:
          "Acompanhamento dos ganhos após instalação: perspectiva de payback em 10 meses e ROI médio mensal de 10% do valor investido.",
      },
      {
        title: "Garantia de 10 anos",
        description:
          "Suporte de longo prazo com garantia estendida, refletindo a confiabilidade e durabilidade dos equipamentos Lumilight.",
      },
    ],
    sectors: [
      "Indústria — maquinários, motores e equipamentos eletrônicos",
      "Comércio e serviços com alta demanda elétrica",
      "Agronegócio e armazéns",
      "Saúde, hospitais e ambientes críticos",
    ],
    differentiators: [
      "Certificado por INMETRO, INPI, WIPO, ABNT, ISO 9001, UL Certified, BNDES e Eletrobras",
      "Perspectiva de payback em 10 meses com ROI médio de 10% ao mês",
      "10 anos de garantia nos equipamentos instalados",
      "Distribuidora oficial Lumilight do Brasil com equipe homologada pelo fabricante",
    ],
    seoDescription:
      "Conheça a Ardiri: Filtros Capacitivos Lumilight certificados para proteção de equipamentos, economia de energia e aumento de produtividade com payback em 10 meses.",
  },
  solofil: {
    heroDescription:
      "Empresa brasileira de filtragem industrial e qualidade do ar, com soluções para controle da contaminação e da poluição do ar em aplicações comerciais e industriais.",
    overviewTitle: "Filtragem do ar com foco em segurança operacional e conformidade",
    overviewParagraphs: [
      "A Solufil atua no controle da contaminação e da poluição do ar, fabricando e comercializando produtos e serviços técnicos para filtragem industrial e qualidade do ar interior.",
      "Com matriz fabril em Valinhos/SP, equipe experiente e parceiros tecnológicos internacionais, a empresa atende operações que exigem retenção de partículas, controle de emissões atmosféricas e adequação às normas regulatórias vigentes.",
    ],
    products: [
      {
        title: "Mangas filtrantes",
        description:
          "Elementos filtrantes para controle da poluição, com diferentes materiais e tratamentos para retenção eficiente de partículas.",
      },
      {
        title: "Filtros para qualidade do ar",
        description:
          "Soluções para HVAC, salas limpas, cabines de pintura e controle do ar interior em ambientes críticos.",
      },
      {
        title: "Gaiolas, acessórios e elementos especiais",
        description:
          "Componentes e acessórios para sistemas de filtragem, incluindo estruturas metálicas e soluções específicas por aplicação.",
      },
      {
        title: "Sistemas de controle de contaminação",
        description:
          "Linha voltada ao tratamento do ar em operações industriais e comerciais com foco em performance e confiabilidade.",
      },
    ],
    services: [
      {
        title: "Avaliação e diagnóstico técnico",
        description:
          "Diagnóstico de problemas em filtros de manga, análise laboratorial de elementos filtrantes e leitura das necessidades do sistema.",
      },
      {
        title: "Trocas, testes e certificações",
        description:
          "Troca de mangas, testes de vazamento, pre-coating e serviços de certificação para fluxo unidirecional, áreas limpas e segurança biológica.",
      },
      {
        title: "Adequações e melhorias em sistemas",
        description:
          "Serviços técnicos para otimizar processos de filtragem, melhorar eficiência operacional e apoiar conformidade regulatória.",
      },
    ],
    sectors: [
      "Mineração, cimento e indústria de base",
      "Bebidas, alimentos e máquinas de envase",
      "Farmacêutica, química fina, hospitais e laboratórios",
      "Ambientes comerciais e industriais com controle do ar interior",
    ],
    differentiators: [
      "Quase três décadas de experiência em filtragem industrial",
      "Atuação em controle do ar interior e emissões atmosféricas",
      "Parcerias tecnológicas internacionais e forte base técnica",
      "Portfólio que combina produto, serviço e diagnóstico especializado",
    ],
    seoDescription:
      "Conheça a Solufil: mangas filtrantes, filtros de ar, serviços técnicos e soluções para controle da contaminação e da poluição do ar.",
  },
  deltajet: {
    heroDescription:
      "Tecnologia em ventilação industrial com foco em eficiência energética, ventiladores axiais projetados, equipamentos completos e consultoria técnica.",
    overviewTitle: "Ventilação industrial pensada para performance e consumo",
    overviewParagraphs: [
      "A Delta Jet nasceu em um contexto de forte demanda por conservação energética aplicada à ventilação e à climatização industrial, tornando-se referência em soluções para reduzir consumo e elevar a performance dos sistemas.",
      "A empresa fabrica ventiladores e componentes com foco em projetos específicos, oferecendo desde a adaptação de hélices até equipamentos completos, sempre com leitura técnica da aplicação e do potencial de ganho energético.",
    ],
    products: [
      {
        title: "Ventiladores axiais projetados",
        description:
          "Equipamentos desenhados conforme a necessidade do cliente, buscando melhor relação entre performance e consumo de energia.",
      },
      {
        title: "Hélices em fibra de carbono",
        description:
          "Hélices produzidas em 100% fibra de carbono, indicadas para projetos que exigem baixo peso e alta resistência mecânica.",
      },
      {
        title: "Equipamentos completos e retrofits",
        description:
          "Fornecimento do ventilador completo ou adaptação de componentes em sistemas existentes, conforme a necessidade operacional.",
      },
      {
        title: "Soluções com atenuação de ruído",
        description:
          "Ventiladores com sistema integrado de atenuação de ruído para aplicações que demandam controle acústico.",
      },
    ],
    services: [
      {
        title: "Consultoria técnica",
        description:
          "Levantamento de performance, consumo de energia, rendimento real do sistema e análise de potencial para conservação energética.",
      },
      {
        title: "Sistemas completos de ventilação",
        description:
          "Concepção e instalação de sistemas completos de ventilação em conjunto com empresas parceiras.",
      },
      {
        title: "Adequação à aplicação",
        description:
          "Ajuste do equipamento conforme setor, exigência de ruído, resistência mecânica e meta de eficiência do cliente.",
      },
    ],
    sectors: [
      "Indústria têxtil",
      "Petroquímico e mineração",
      "Papel e celulose",
      "Hotéis, shopping centers e aplicações de climatização",
    ],
    differentiators: [
      "Atuação pioneira no Brasil em conservação energética aplicada à ventilação industrial",
      "Projetos com ganhos energéticos reportados na ordem de 30%",
      "Produção própria de hélices em fibra de carbono",
      "Combinação de fabricação, adaptação e consultoria técnica de performance",
    ],
    seoDescription:
      "Conheça a Delta Jet: ventiladores industriais, hélices em fibra de carbono, sistemas completos de ventilação e consultoria técnica.",
  },
  "nord-drivesystems": {
    heroDescription:
      "Soluções completas em acionamentos com motorredutores, motores elétricos, redutores industriais, inversores de frequência e suporte técnico para mais de 100 segmentos industriais.",
    overviewTitle: "Acionamentos completos de um só fornecedor",
    overviewParagraphs: [
      "A NORD DRIVESYSTEMS é uma das líderes globais em tecnologia de acionamentos, desenvolvendo e fabricando soluções completas que combinam redutores, motores elétricos e acionamentos eletrônicos.",
      "Sua proposta é entregar sistemas flexíveis para diferentes indústrias, com fabricação própria, controle de qualidade, suporte técnico e ampla rede de montagem, serviços e distribuição.",
    ],
    products: [
      {
        title: "Motorredutores",
        description:
          "Linhas de motorredutores com alta eficiência, carcaça UNICASE e diferentes configurações para aplicações industriais variadas.",
      },
      {
        title: "Motores elétricos",
        description:
          "Motores robustos, combináveis com os redutores da marca, incluindo opções de alta eficiência para diferentes níveis de exigência.",
      },
      {
        title: "Redutores industriais",
        description:
          "Soluções como MAXXDRIVE para aplicações de alto torque, baixo ruído e longa vida útil.",
      },
      {
        title: "Acionamentos eletrônicos",
        description:
          "Inversores de frequência, soft starters e motor starters para instalação descentralizada ou em painel.",
      },
    ],
    services: [
      {
        title: "Engenharia de aplicação",
        description:
          "Suporte para seleção, dimensionamento e integração do sistema de acionamento mais adequado à operação.",
      },
      {
        title: "Assistência técnica e rede global",
        description:
          "Presença internacional com centros de montagem, serviços e distribuição para reduzir prazo e ampliar suporte pós-venda.",
      },
      {
        title: "Soluções para ambientes severos",
        description:
          "Proteção contra corrosão, eficiência energética, aplicações ATEX e configurações especiais para condições extremas.",
      },
    ],
    sectors: [
      "Alimentos e bebidas",
      "Água e esgoto",
      "Química, automotivo e energias renováveis",
      "Aplicações industriais em mais de 100 segmentos",
    ],
    differentiators: [
      "Mais de 50 anos de atuação em acionamentos",
      "Fabricação própria de redutores, motores e inversores",
      "Presença em dezenas de países com serviços e distribuição",
      "Foco em eficiência, robustez, qualidade e flexibilidade de configuração",
    ],
    seoDescription:
      "Conheça a NORD DRIVESYSTEMS: motorredutores, motores elétricos, redutores industriais e inversores com suporte técnico especializado.",
  },
  "mercosul-motores": {
    heroDescription:
      "Indústria brasileira de motores elétricos e soluções industriais que combina inovação tecnológica, sustentabilidade e forte capilaridade comercial e técnica.",
    overviewTitle: "Motores elétricos e soluções industriais com base fabril robusta",
    overviewParagraphs: [
      "A Mercosul Motores iniciou sua trajetória em 2018, a partir da aquisição do parque fabril onde operou a primeira fabricante de motores elétricos do Brasil, preservando a referência do mercado e ampliando o portfólio com novas tecnologias.",
      "Hoje a empresa atua com motores de indução monofásicos e trifásicos em baixa tensão, além de automação industrial, redutores de velocidade e soluções ligadas à mobilidade elétrica, combinando estrutura industrial, testes laboratoriais e rede de assistência técnica.",
    ],
    products: [
      {
        title: "Motores elétricos monofásicos",
        description:
          "Linha voltada a aplicações comerciais e industriais em baixa tensão, com foco em desempenho e confiabilidade.",
      },
      {
        title: "Motores elétricos trifásicos",
        description:
          "Portfólio para aplicações industriais com potências de até 1000 cv, testado em laboratório e alinhado a normas exigentes.",
      },
      {
        title: "Automação e eletromobilidade",
        description:
          "Dispositivos para automação industrial e soluções voltadas à mobilidade elétrica automotiva.",
      },
      {
        title: "Redutores de velocidade",
        description:
          "Itens complementares para compor soluções de movimento e transmissão em diferentes tipos de operação.",
      },
    ],
    services: [
      {
        title: "Rede autorizada e assistência técnica",
        description:
          "Estrutura de suporte com centenas de parceiros e cobertura nacional para manutenção e atendimento pós-venda.",
      },
      {
        title: "Força comercial especializada",
        description:
          "Rede de representantes qualificados distribuídos pelo Brasil e América do Sul para apoiar especificação e atendimento.",
      },
      {
        title: "Controle de qualidade laboratorial",
        description:
          "Motores 100% testados em laboratório para atender critérios rigorosos de qualidade e performance.",
      },
    ],
    sectors: [
      "Aplicações comerciais e industriais em baixa tensão",
      "Automação industrial",
      "Transmissão e redução de velocidade",
      "Mobilidade elétrica automotiva",
    ],
    differentiators: [
      "Parque fabril de 32.000 m² e equipe com mais de 400 colaboradores",
      "Portfólio com motores até 1000 cv",
      "Rede de assistência técnica com mais de 300 parceiros",
      "Combinação entre inovação tecnológica, sustentabilidade e presença comercial nacional",
    ],
    seoDescription:
      "Conheça a Mercosul Motores: motores elétricos monofásicos e trifásicos, automação, redutores e suporte técnico com cobertura nacional.",
  },
};

export function getCompanyPageDetail(slug?: string | null): CompanyPageDetail | null {
  if (!slug) return null;
  return COMPANY_PAGE_DETAILS[slug] || null;
}
