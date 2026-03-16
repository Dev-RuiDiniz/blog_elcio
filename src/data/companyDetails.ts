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
  "dormer-pramet": {
    heroDescription:
      "Fornecedor global de ferramentas de corte e serviços relacionados, com portfólio integrado para furação, fresamento, torneamento, rosqueamento e sistemas de fixação para usinagem.",
    overviewTitle: "Ferramentas de corte para produtividade e previsibilidade",
    overviewParagraphs: [
      "A Dormer Pramet atua globalmente no fornecimento de ferramentas de corte para a indústria metalmecânica, unificando as marcas Dormer e Pramet em uma oferta completa para usinagem.",
      "No Brasil, a marca combina ferramentas rotativas e indexáveis para operações de furação, fresamento, torneamento e rosqueamento, incluindo linhas para manutenção industrial, engenharia geral, moldes e matrizes e aplicações mais exigentes.",
    ],
    products: [
      {
        title: "Furação e holemaking",
        description:
          "Brocas em HSS e metal duro, linhas de alto desempenho, furação profunda, brocas intercambiáveis, escareadores, alargadores e brocas de centro.",
      },
      {
        title: "Fresamento sólido e indexável",
        description:
          "Fresas de topo, faceamento, esquadrejamento, alto avanço, cópia, interpolação de rosca e usinagem para moldes e matrizes.",
      },
      {
        title: "Torneamento e canal",
        description:
          "Ferramentas e insertos ISO para torneamento externo e interno, corte, canal, rosqueamento e abertura de rasgo de chaveta.",
      },
      {
        title: "Rosqueamento e sistemas",
        description:
          "Machos, fresas de rosca, sistemas de mandrilamento e acessórios para atender desde manutenção até produção seriada.",
      },
    ],
    services: [
      {
        title: "Suporte técnico de aplicação",
        description:
          "Apoio para seleção de ferramenta, definição de geometria e recomendação de processo conforme material, operação e meta de produtividade.",
      },
      {
        title: "Portfólio MRO e engenharia geral",
        description:
          "Oferta ampla para manutenção, reparo e operação, com ferramentas para holemaking, threading, milling, reaming, countersinking e deburring.",
      },
      {
        title: "Soluções especiais",
        description:
          "Capacidade de apoiar demandas específicas com ferramentas e configurações adaptadas ao cenário de usinagem do cliente.",
      },
    ],
    sectors: [
      "Engenharia geral e manutenção industrial",
      "Moldes e matrizes",
      "Ferroviário, energia e aeroespacial",
      "Produção seriada e usinagem pesada",
    ],
    differentiators: [
      "Mais de 100 anos de experiência acumulada em ferramentas de corte",
      "Presença global em mais de 100 mercados",
      "Portfólio unificado que combina ferramentas rotativas e indexáveis",
      "Suporte para diferentes materiais, operações e níveis de criticidade",
    ],
    seoDescription:
      "Conheça a Dormer Pramet: ferramentas de corte para furação, fresamento, torneamento e rosqueamento com suporte técnico e foco em produtividade.",
  },
  fecial: {
    heroDescription:
      "Especialista em ferramentas especiais para usinagem, com forte atuação em insertos, lâminas, fresamento, rosqueamento, mandrilamento e projetos sob medida.",
    overviewTitle: "Usinagem especial quando o processo precisa sair do convencional",
    overviewParagraphs: [
      "A Fecial é uma fabricante brasileira de ferramentas especiais para usinagem, com histórico consolidado em soluções personalizadas para ganho de produtividade, repetibilidade e acabamento.",
      "A empresa atua em projetos que exigem geometrias específicas, tolerâncias estreitas e integração entre engenharia, fabricação e controle de qualidade, apoiando clientes em demandas que vão além das ferramentas padrão.",
    ],
    products: [
      {
        title: "Insertos especiais",
        description:
          "Insertos complexos, com tolerâncias estreitas, geometria, perfil e fixação definidos de acordo com a necessidade do projeto.",
      },
      {
        title: "Lâminas e acabamento de furos",
        description:
          "Lâminas para alargadores em metal duro, com foco em estabilidade dimensional, concentricidade e rugosidade controlada.",
      },
      {
        title: "Fresamento, torneamento e rosqueamento",
        description:
          "Fresas intercambiáveis, soluções para torneamento CNC e multitarefa, rosqueamento especial, fresamento de módulo e canal para chaveta.",
      },
      {
        title: "Mandrilamento, furação e projetos especiais",
        description:
          "Barras de mandrilar, suportes, cápsulas, brocas sob aplicação e ferramentas desenvolvidas para operações específicas.",
      },
    ],
    services: [
      {
        title: "Engenharia de aplicação",
        description:
          "Equipe técnica e de engenharia dedicada ao desenvolvimento de processos de usinagem personalizados para cada necessidade.",
      },
      {
        title: "Acompanhamento de desempenho",
        description:
          "Suporte para validar funcionamento, estabilidade, repetibilidade e durabilidade das ferramentas no processo produtivo.",
      },
      {
        title: "Otimização de produtividade",
        description:
          "Projetos voltados a reduzir tempo de máquina, melhorar acabamento e aumentar a eficiência da operação.",
      },
    ],
    sectors: [
      "Usinagem seriada e produção industrial",
      "Aplicações de rosqueamento especial e petróleo",
      "Acabamento de furos, engrenagens e mandrilamento",
      "Operações que exigem ferramenta fora do padrão",
    ],
    differentiators: [
      "Maior fabricante de inserto especial do Brasil, segundo a própria empresa",
      "Mais de 30 anos de atuação em ferramentas especiais",
      "Mais de 1.250.000 ferramentas especiais entregues",
      "Processos apoiados por ISO 9001, laboratório e parque fabril com retíficas CNC e células robotizadas",
    ],
    seoDescription:
      "Conheça a Fecial: ferramentas especiais para usinagem, insertos, lâminas, fresamento, rosqueamento e projetos personalizados.",
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
