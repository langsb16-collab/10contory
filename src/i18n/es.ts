import { Translation } from './types';

export const es: Translation = {
  nav: {
    home: 'Inicio',
    about: 'Acerca de',
    courses: 'Cursos',
    universities: 'Universidades',
    companies: 'Empresas',
    medical: 'Turismo Médico',
    login: 'Iniciar sesión',
    signup: 'Registrarse',
    dashboard: 'Panel',
    logout: 'Cerrar sesión'
  },
  home: {
    hero: {
      title: 'Domina el coreano con TOPIK Pro',
      subtitle: 'Plataforma multilingüe gratuita para la preparación de TOPIK y oportunidades profesionales en Corea',
      cta: 'Empezar a aprender ahora'
    },
    features: {
      title: '¿Por qué elegir TOPIK Pro?',
      feature1: {
        title: 'Aprendizaje con IA',
        desc: 'Planes de estudio personalizados según tu nivel y objetivos'
      },
      feature2: {
        title: 'Conexión Universidad-Empleo',
        desc: 'Conéctate con universidades y empresas en el área de Gyeongsan'
      },
      feature3: {
        title: 'Gratis para siempre',
        desc: 'Preparación completa de TOPIK sin costo'
      }
    }
  },
  medical: {
    hero: {
      title: 'Tour de Salud K-Medical',
      subtitle: 'Experimenta atención médica de clase mundial en Gyeongsan con medicina tradicional coreana',
      cta: 'Reservar Chequeo de Salud'
    },
    packages: {
      title: 'Paquetes de Chequeo de Salud',
      basic: {
        title: 'Chequeo Básico de Salud',
        desc: 'Análisis de sangre, orina, radiografía de tórax, ECG - aprox. 2 horas'
      },
      comprehensive: {
        title: 'Chequeo Integral',
        desc: 'Escaneo completo + CT/MRI + Endoscopia - aprox. 4 horas'
      },
      cancer: {
        title: 'Paquete de Detección de 5 Cánceres',
        desc: 'Detección especializada de cáncer de estómago, colon, hígado, pulmón, mama - aprox. 5 horas'
      },
      vip: {
        title: 'Chequeo Premium VIP',
        desc: 'Chequeo premium + coordinador dedicado + servicio de limusina - aprox. 6 horas'
      }
    },
    hanyang: {
      title: 'Programa de Curación con Medicina Coreana',
      subtitle: 'Restaura tu cuerpo y mente con medicina tradicional coreana personalizada después del chequeo',
      digestive: {
        title: 'Acupuntura y Moxibustión Digestiva',
        desc: 'Tratamiento para problemas digestivos y trastornos estomacales - aprox. 60 min'
      },
      musculoskeletal: {
        title: 'Terapia Chuna Musculoesquelética',
        desc: 'Alivio para el dolor de cuello, hombros y espalda - aprox. 45 min'
      },
      stress: {
        title: 'Acupuntura Herbal para el Estrés',
        desc: 'Alivio del estrés y estabilidad mental - aprox. 50 min'
      },
      constitutional: {
        title: 'Medicina Herbal Constitucional',
        desc: 'Prescripción herbal personalizada según tu constitución - aprox. 30 min'
      }
    },
    benefits: {
      title: '¿Por qué Turismo Médico en Gyeongsan?',
      benefit1: {
        title: 'Costo Asequible',
        desc: '30-50% más barato que las grandes ciudades'
      },
      benefit2: {
        title: 'Sin Tiempo de Espera',
        desc: 'Cita inmediata, resultados el mismo día'
      },
      benefit3: {
        title: 'Atención Integrada',
        desc: 'Sinergia entre medicina occidental + medicina tradicional coreana'
      },
      benefit4: {
        title: 'Interpretación Médica',
        desc: 'Soporte en 11 idiomas con servicio de acompañamiento'
      }
    },
    booking: {
      title: 'Reservar Chequeo de Salud',
      name: 'Nombre completo',
      email: 'Correo electrónico',
      phone: 'Número de teléfono',
      nationality: 'Nacionalidad',
      checkupDate: 'Fecha preferida',
      package: 'Paquete de Chequeo',
      hanyang: 'Programa de Medicina Coreana (Opcional)',
      interpreter: 'Necesita intérprete',
      submit: 'Reservar ahora'
    }
  },
  auth: {
    login: {
      title: 'Iniciar sesión en tu cuenta',
      email: 'Correo electrónico',
      password: 'Contraseña',
      submit: 'Iniciar sesión',
      noAccount: '¿No tienes una cuenta?',
      signupLink: 'Regístrate aquí'
    },
    signup: {
      title: 'Crear tu cuenta',
      name: 'Nombre completo',
      email: 'Correo electrónico',
      password: 'Contraseña',
      confirmPassword: 'Confirmar contraseña',
      nativeLanguage: 'Idioma nativo',
      targetLevel: 'Nivel TOPIK objetivo',
      purpose: 'Propósito de aprendizaje',
      submit: 'Registrarse',
      hasAccount: '¿Ya tienes una cuenta?',
      loginLink: 'Inicia sesión aquí'
    }
  },
  dashboard: {
    title: 'Mi Panel',
    currentLevel: 'Nivel actual',
    targetLevel: 'Nivel objetivo',
    progress: 'Progreso',
    todayTasks: 'Tareas de hoy',
    startLearning: 'Empezar a aprender',
    takeMockExam: 'Hacer examen de práctica',
    viewResults: 'Ver resultados'
  },
  diagnostic: {
    title: 'Prueba de Nivel',
    clickToStart: '¡Verifica tu nivel – Haz clic ahora!',
    subtitle: 'Mide tu nivel actual y recibe un plan de aprendizaje personalizado',
    testInfo: {
      title: 'Información de la prueba',
      duration: 'Duración: Aproximadamente 20 minutos',
      questions: 'Número de preguntas: 30',
      areas: 'Áreas de evaluación: Escucha, Lectura, Escritura',
      results: 'Resultados: Disponibles inmediatamente'
    },
    startButton: 'Comenzar prueba'
  },
  common: {
    save: 'Guardar',
    cancel: 'Cancelar',
    delete: 'Eliminar',
    edit: 'Editar',
    view: 'Ver',
    loading: 'Cargando...',
    error: 'Error',
    success: 'Éxito',
    bookNow: 'Reservar ahora',
    learnMore: 'Aprender más'
  }
};
