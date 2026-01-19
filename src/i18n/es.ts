import { Translation } from './types';

// Spanish translation
export const es: Translation = {
  nav: {
    home: 'Inicio',
    about: 'Acerca de',
    courses: 'Cursos',
    universities: 'Universidades',
    companies: 'Empresas',
    login: 'Iniciar sesión',
    signup: 'Registrarse',
    dashboard: 'Panel',
    logout: 'Cerrar sesión'
  },
  home: {
    hero: {
      title: 'Domina el coreano con TOPIK Pro',
      subtitle: 'Plataforma multilingüe gratuita para preparación TOPIK y oportunidades profesionales en Corea',
      cta: 'Comenzar a aprender ahora'
    },
    features: {
      title: '¿Por qué elegir TOPIK Pro?',
      feature1: {
        title: 'Aprendizaje con IA',
        desc: 'Planes de estudio personalizados según tu nivel y objetivos'
      },
      feature2: {
        title: 'Conexión con universidades y empleos',
        desc: 'Conecta con universidades y empresas en el área de Gyeongsan'
      },
      feature3: {
        title: 'Gratis para siempre',
        desc: 'Preparación completa para TOPIK sin costo'
      }
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
      title: 'Crear cuenta',
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
    startLearning: 'Comenzar a aprender',
    takeMockExam: 'Hacer examen de prueba',
    viewResults: 'Ver resultados'
  },
  common: {
    save: 'Guardar',
    cancel: 'Cancelar',
    delete: 'Eliminar',
    edit: 'Editar',
    view: 'Ver',
    loading: 'Cargando...',
    error: 'Error',
    success: 'Éxito'
  }
};
