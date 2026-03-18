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
  idealFor: string[];
  seoDescription: string;
}

export const COMPANY_PAGE_DETAILS: Record<string, CompanyPageDetail> = {
  ardiri: {
    heroDescription:
      "Soluções para qualidade de energia e proteção elétrica com filtros capacitivos certificados, voltadas a reduzir perdas, proteger ativos e elevar a eficiência industrial.",
    overviewTitle: "Qualidade de energia como alavanca de proteção e produtividade",
    overviewParagraphs: [
      "A Ardiri Soluções Empresariais atua com foco em eficiência energética, qualidade de energia e proteção de sistemas elétricos, apoiando operações que sofrem com distorções, perdas e sensibilidade de equipamentos.",
      "Seu portfólio se destaca pelos filtros capacitivos certificados e pela proposta de unir proteção elétrica, economia de energia e maior estabilidade operacional em plantas industriais e estruturas empresariais.",
    ],
    products: [
      {
        title: "Filtros capacitivos certificados",
        description:
          "Soluções voltadas à correção e ao condicionamento da energia para proteger máquinas, eletrônicos e infraestrutura crítica.",
      },
      {
        title: "Proteção e estabilidade elétrica",
        description:
          "Aplicações pensadas para reduzir impactos de distorções harmônicas, proteger a operação e ampliar a confiabilidade do sistema elétrico.",
      },
      {
        title: "Eficiência energética",
        description:
          "Projetos orientados à redução de desperdícios energéticos e ao ganho econômico sem perder robustez operacional.",
      },
      {
        title: "Soluções empresariais integradas",
        description:
          "Combinação entre leitura técnica do cenário elétrico, proposta de proteção e direcionamento para aumento de produtividade.",
      },
    ],
    services: [
      {
        title: "Diagnóstico consultivo",
        description:
          "Leitura do contexto energético e operacional para entender onde a instabilidade elétrica impacta disponibilidade, consumo e risco.",
      },
      {
        title: "Aplicação orientada a resultado",
        description:
          "Recomendação de soluções para reduzir perdas, proteger ativos e apoiar metas de produtividade com mais previsibilidade elétrica.",
      },
      {
        title: "Apoio comercial técnico",
        description:
          "Encaminhamento com contexto para operações que precisam justificar investimento por desempenho, proteção e economia.",
      },
    ],
    sectors: [
      "Indústrias com sensibilidade a distorções e falhas elétricas",
      "Operações com máquinas, automação e eletrônicos críticos",
      "Empresas com meta de economia de energia e confiabilidade",
      "Plantas industriais e estruturas empresariais de alta demanda elétrica",
    ],
    differentiators: [
      "Posicionamento centrado em eficiência energética e qualidade de energia",
      "Portfólio com filtros capacitivos certificados",
      "Proposta comercial conectada a proteção elétrica, economia e produtividade",
      "Atuação em cenários em que falha elétrica compromete máquinas e eletrônicos críticos",
    ],
    idealFor: [
      "Operações com quebras, instabilidades ou sensibilidade elétrica recorrente",
      "Projetos que precisam justificar eficiência energética com ganho operacional",
      "Compradores técnicos que buscam proteção elétrica e estabilidade da planta",
    ],
    seoDescription:
      "Conheça a Ardiri: filtros capacitivos, qualidade de energia, proteção elétrica e soluções para eficiência e produtividade industrial.",
  },
  autoplast: {
    heroDescription:
      "Fabricante de lubrificantes especiais e aditivos industriais de alta performance com PTFE e MoS2, voltados à redução de atrito, desgaste e falhas mecânicas.",
    overviewTitle: "Lubrificação especial quando o desgaste mecânico vira custo de operação",
    overviewParagraphs: [
      "A Autoplast atua com aditivos e lubrificantes especiais para aplicações industriais e automotivas, com forte presença em soluções de alto desempenho para redução de atrito e proteção de componentes.",
      "Seu portfólio combina compostos com PTFE, MoS2 e formulações específicas para redutores, sistemas hidráulicos, compressores, motores, graxas e sprays, sempre com a proposta de aumentar vida útil e confiabilidade mecânica.",
    ],
    products: [
      {
        title: "Lubrificantes especiais",
        description:
          "Linhas para aplicações que exigem proteção superior contra atrito, desgaste, aquecimento e perda de eficiência mecânica.",
      },
      {
        title: "Aditivos com PTFE e MoS2",
        description:
          "Formulações voltadas a formar película protetiva, reduzir contato metal-metal e ampliar a durabilidade dos sistemas.",
      },
      {
        title: "Soluções para redutores, hidráulicos e compressores",
        description:
          "Produtos específicos para conjuntos mecânicos sujeitos a carga, calor, contaminação e necessidade de lubrificação mais confiável.",
      },
      {
        title: "Sprays, graxas e óleos de aplicação",
        description:
          "Portfólio complementar para manutenção, proteção e aumento da vida útil em diferentes contextos industriais.",
      },
    ],
    services: [
      {
        title: "Leitura da aplicação mecânica",
        description:
          "Apoio para identificar pontos de atrito, desgaste, ruído, vibração ou falha prematura no conjunto mecânico.",
      },
      {
        title: "Recomendação por condição operacional",
        description:
          "Direcionamento do produto conforme tipo de equipamento, regime de carga, temperatura e objetivo de proteção.",
      },
      {
        title: "Apoio comercial orientado a confiabilidade",
        description:
          "Encaminhamento para aplicações que precisam reduzir parada, manutenção corretiva e substituição recorrente de componentes.",
      },
    ],
    sectors: [
      "Indústrias com redutores, bombas, compressores e sistemas hidráulicos",
      "Manutenção industrial e confiabilidade mecânica",
      "Operações com motores, engrenagens e componentes sujeitos a desgaste",
      "Aplicações que exigem lubrificação especial e proteção prolongada",
    ],
    differentiators: [
      "Foco em lubrificantes e aditivos especiais de alta performance",
      "Aplicações com PTFE e MoS2 para redução de atrito e desgaste",
      "Portfólio voltado à proteção mecânica e aumento de vida útil",
      "Posicionamento claro para reduzir falhas, ruído, vibração e custo de manutenção",
    ],
    idealFor: [
      "Equipamentos com desgaste mecânico recorrente e alto custo de parada",
      "Times de manutenção que precisam elevar vida útil de conjuntos críticos",
      "Cenários em que lubrificação especial reduz atrito, ruído e vibração",
    ],
    seoDescription:
      "Conheça a Autoplast: lubrificantes especiais, aditivos industriais, PTFE, MoS2 e soluções para reduzir atrito e desgaste mecânico.",
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
    idealFor: [
      "Operações com controle de emissões e partículas",
      "Ambientes críticos, salas limpas e HVAC",
      "Demandas com necessidade de adequação regulatória",
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
    idealFor: [
      "Projetos que buscam eficiência energética",
      "Aplicações com necessidade de retrofit em ventilação",
      "Operações que exigem análise de performance do sistema",
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
    idealFor: [
      "Projetos de acionamentos completos",
      "Aplicações que exigem robustez e flexibilidade",
      "Integração entre redutores, motores e inversores",
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
    idealFor: [
      "Aplicações com motores em baixa tensão",
      "Demandas por automação, motores e redutores em conjunto",
      "Compradores que valorizam capilaridade técnica nacional",
    ],
    seoDescription:
      "Conheça a Mercosul Motores: motores elétricos monofásicos e trifásicos, automação, redutores e suporte técnico com cobertura nacional.",
  },
  "wmg-assistencia-tecnica": {
    heroDescription:
      "Assistência técnica industrial especializada em manutenção elétrica e eletrônica para máquinas, acionamentos, CNCs, IHMs, robôs e equipamentos multimarcas.",
    overviewTitle: "Manutenção industrial para recuperar desempenho e reduzir custo de parada",
    overviewParagraphs: [
      "A WMG Assistência Técnica atua em manutenção elétrica e eletrônica industrial, com foco em diagnóstico, reparo e recuperação de equipamentos críticos para produção.",
      "Com base em Taubaté/SP e atendimento nacional, a empresa trabalha com soluções preventivas e corretivas para inversores, soft-starters, servo-drives, PLCs, IHMs, CNCs, placas eletrônicas, fontes e outros sistemas industriais multimarcas.",
    ],
    products: [
      {
        title: "Manutenção de acionamentos industriais",
        description:
          "Reparo e recuperação de inversores de frequência, soft-starters, servo-drives e servo-motores de diversas marcas.",
      },
      {
        title: "CNCs, PLCs e IHMs",
        description:
          "Suporte para comandos numéricos, controladores lógicos programáveis, interfaces homem-máquina e touch pendants.",
      },
      {
        title: "Placas, fontes e eletrônica industrial",
        description:
          "Manutenção de placas eletrônicas, fontes, módulos e componentes elétricos e eletrônicos aplicados a máquinas e processos.",
      },
      {
        title: "Retrofitting e adequações",
        description:
          "Atualização, adaptação, nacionalização de componentes e melhorias em máquinas e equipamentos industriais.",
      },
    ],
    services: [
      {
        title: "Preventiva e corretiva",
        description:
          "Atendimento em laboratório e em campo para reduzir falhas, recuperar desempenho e ampliar a disponibilidade operacional.",
      },
      {
        title: "Paradas programadas",
        description:
          "Apoio em manutenção preventiva de máquinas e equipamentos para diminuir risco de quebra e estabilizar a produção.",
      },
      {
        title: "Diagnóstico técnico e recuperação",
        description:
          "Levantamento de falhas, análise técnica e substituição de componentes com foco em reduzir custo de manutenção e troca de equipamentos.",
      },
    ],
    sectors: [
      "Máquinas e equipamentos industriais",
      "Automação e controle industrial",
      "Linhas produtivas com acionamentos e CNCs",
      "Operações que exigem manutenção elétrica e eletrônica multimarcas",
    ],
    differentiators: [
      "Foco em manutenção elétrica e eletrônica industrial preventiva e corretiva",
      "Atendimento nacional com base em Taubaté, São Paulo",
      "Capacidade de atuar em campo e em laboratório",
      "Portfólio multimarcas para acionamentos, CNCs, IHMs, PLCs e placas eletrônicas",
    ],
    idealFor: [
      "Paradas programadas e corretivas de alta criticidade",
      "Recuperação de eletrônica industrial multimarcas",
      "Demandas por diagnóstico técnico em campo e laboratório",
    ],
    seoDescription:
      "Conheça a WMG Assistência Técnica: manutenção elétrica e eletrônica industrial para inversores, servo drives, CNCs, IHMs, PLCs, placas e fontes.",
  },
};

export function getCompanyPageDetail(slug?: string | null): CompanyPageDetail | null {
  if (!slug) return null;
  return COMPANY_PAGE_DETAILS[slug] || null;
}
