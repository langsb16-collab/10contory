// 10 languages supported
export const SUPPORTED_LANGUAGES = {
  en: 'English',
  zh: '中文',
  hi: 'हिन्दी',
  es: 'Español',
  fr: 'Français',
  ar: 'العربية',
  bn: 'বাংলা',
  pt: 'Português',
  ru: 'Русский',
  id: 'Bahasa Indonesia'
} as const;

export type Language = keyof typeof SUPPORTED_LANGUAGES;

export interface Translation {
  // Navigation
  nav: {
    home: string;
    about: string;
    courses: string;
    universities: string;
    companies: string;
    login: string;
    signup: string;
    dashboard: string;
    logout: string;
  };
  // Home page
  home: {
    hero: {
      title: string;
      subtitle: string;
      cta: string;
    };
    features: {
      title: string;
      feature1: { title: string; desc: string };
      feature2: { title: string; desc: string };
      feature3: { title: string; desc: string };
    };
  };
  // Auth
  auth: {
    login: {
      title: string;
      email: string;
      password: string;
      submit: string;
      noAccount: string;
      signupLink: string;
    };
    signup: {
      title: string;
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
      nativeLanguage: string;
      targetLevel: string;
      purpose: string;
      submit: string;
      hasAccount: string;
      loginLink: string;
    };
  };
  // Dashboard
  dashboard: {
    title: string;
    currentLevel: string;
    targetLevel: string;
    progress: string;
    todayTasks: string;
    startLearning: string;
    takeMockExam: string;
    viewResults: string;
  };
  // Common
  common: {
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    view: string;
    loading: string;
    error: string;
    success: string;
  };
}
