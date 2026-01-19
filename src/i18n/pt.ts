import { Translation } from './types';

/**
 * Portuguese (Português) translations
 */
export const pt: Translation = {
  nav: {
    home: 'Início',
    about: 'Sobre',
    courses: 'Cursos',
    universities: 'Universidades Parceiras',
    companies: 'Empresas Parceiras',
    medical: 'Turismo Médico',
    login: 'Entrar',
    signup: 'Cadastrar',
    dashboard: 'Painel',
    logout: 'Sair'
  },
  home: {
    hero: {
      title: 'Aprenda coreano com TOPIK Pro',
      subtitle: 'Plataforma multilíngue gratuita para preparação TOPIK e oportunidades de carreira na Coreia',
      cta: 'Comece a aprender agora'
    },
    features: {
      title: 'Por que escolher TOPIK Pro?',
      feature1: {
        title: 'Aprendizado com IA',
        desc: 'Planos de estudo personalizados com base no seu nível e objetivos'
      },
      feature2: {
        title: 'Correspondência universitária e de empregos',
        desc: 'Conecte-se com universidades e empresas na região de Gyeongsan'
      },
      feature3: {
        title: 'Grátis para sempre',
        desc: 'Preparação completa para TOPIK sem custos'
      }
    }
  },
  medical: {
    hero: {
      title: 'Tour de Saúde K-Medical',
      subtitle: 'Experimente cuidados de saúde de classe mundial em Gyeongsan com medicina tradicional coreana',
      cta: 'Reserve um check-up'
    },
    packages: {
      title: 'Pacotes de check-up',
      basic: {
        title: 'Check-up Básico',
        desc: 'Exame de sangue, urina, raio-X do tórax, ECG - cerca de 2 horas'
      },
      comprehensive: {
        title: 'Check-up Completo',
        desc: 'Exame completo do corpo + CT/MRI + endoscopia - cerca de 4 horas'
      },
      cancer: {
        title: 'Rastreamento de 5 Cânceres Principais',
        desc: 'Rastreamento especializado de câncer de estômago, cólon, fígado, pulmão e mama - cerca de 5 horas'
      },
      vip: {
        title: 'Check-up Premium VIP',
        desc: 'Check-up premium + coordenador dedicado + serviço de limusine - cerca de 6 horas'
      }
    },
    hanyang: {
      title: 'Cura com Medicina Coreana',
      subtitle: 'Cure corpo e mente com medicina tradicional coreana personalizada após o check-up',
      digestive: {
        title: 'Acupuntura e Moxabustão Digestiva',
        desc: 'Tratamento de problemas digestivos e doenças estomacais - cerca de 60 minutos'
      },
      musculoskeletal: {
        title: 'Terapia Chuna Musculoesquelética',
        desc: 'Alívio de dor no pescoço, ombro e costas - cerca de 45 minutos'
      },
      stress: {
        title: 'Acupuntura Herbal para Alívio do Estresse',
        desc: 'Alívio do estresse e estabilidade mental - cerca de 50 minutos'
      },
      constitutional: {
        title: 'Medicina Herbal Constitucional',
        desc: 'Prescrição herbal personalizada baseada na constituição - cerca de 30 minutos'
      }
    },
    benefits: {
      title: 'Por que turismo médico em Gyeongsan?',
      benefit1: {
        title: 'Custo acessível',
        desc: '30-50% mais barato que grandes cidades'
      },
      benefit2: {
        title: 'Sem tempo de espera',
        desc: 'Agendamento imediato, resultados no mesmo dia'
      },
      benefit3: {
        title: 'Cuidado integrado',
        desc: 'Sinergia entre medicina ocidental + medicina tradicional coreana'
      },
      benefit4: {
        title: 'Interpretação médica',
        desc: 'Suporte em 11 idiomas com serviço de acompanhamento'
      }
    },
    booking: {
      title: 'Reserve um check-up',
      name: 'Nome completo',
      email: 'E-mail',
      phone: 'Número de telefone',
      nationality: 'Nacionalidade',
      checkupDate: 'Data preferida',
      package: 'Pacote de check-up',
      hanyang: 'Programa de Medicina Coreana (opcional)',
      interpreter: 'Precisa de intérprete',
      submit: 'Reserve agora'
    }
  },
  auth: {
    login: {
      title: 'Entre na sua conta',
      email: 'E-mail',
      password: 'Senha',
      submit: 'Entrar',
      noAccount: 'Não tem uma conta?',
      signupLink: 'Cadastre-se aqui'
    },
    signup: {
      title: 'Crie sua conta',
      name: 'Nome completo',
      email: 'E-mail',
      password: 'Senha',
      confirmPassword: 'Confirme a senha',
      nativeLanguage: 'Idioma nativo',
      targetLevel: 'Nível TOPIK alvo',
      purpose: 'Propósito de aprendizado',
      submit: 'Cadastrar',
      hasAccount: 'Já tem uma conta?',
      loginLink: 'Entre aqui'
    }
  },
  dashboard: {
    title: 'Meu Painel',
    currentLevel: 'Nível atual',
    targetLevel: 'Nível alvo',
    progress: 'Progresso',
    todayTasks: 'Tarefas de hoje',
    startLearning: 'Comece a aprender',
    takeMockExam: 'Faça um teste simulado',
    viewResults: 'Ver resultados'
  },
  diagnostic: {
    title: 'Teste de Nivelamento',
    clickToStart: 'Verifique seu nível – clique agora!',
    subtitle: 'Meça seu nível atual e receba um plano de aprendizado personalizado',
    testInfo: {
      title: 'Informações do teste',
      duration: 'Duração: cerca de 20 minutos',
      questions: 'Número de perguntas: 30',
      areas: 'Áreas de avaliação: audição, leitura, escrita',
      results: 'Resultados: disponíveis imediatamente'
    },
    startButton: 'Iniciar teste'
  },
  common: {
    save: 'Salvar',
    cancel: 'Cancelar',
    delete: 'Excluir',
    edit: 'Editar',
    view: 'Ver',
    loading: 'Carregando...',
    error: 'Erro',
    success: 'Sucesso',
    bookNow: 'Reserve agora',
    learnMore: 'Saiba mais'
  }
};
