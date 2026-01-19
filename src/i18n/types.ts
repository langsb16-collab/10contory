// 10 languages supported
export const SUPPORTED_LANGUAGES = {
  ko: '한국어',
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
    medical: string;
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
  // Diagnostic Test
  diagnostic: {
    title: string;
    clickToStart: string;
    subtitle: string;
    testInfo: {
      title: string;
      duration: string;
      questions: string;
      areas: string;
      results: string;
    };
    startButton: string;
  };
  // Medical Tourism
  medical: {
    hero: {
      title: string;
      subtitle: string;
      description: string;
    };
    packages: {
      basic: { title: string; price: string; features: string[] };
      comprehensive: { title: string; price: string; features: string[] };
      cancer: { title: string; price: string; features: string[] };
      vip: { title: string; price: string; features: string[] };
    };
    hanyang: {
      title: string;
      subtitle: string;
      digestive: { title: string; desc: string };
      musculoskeletal: { title: string; desc: string };
      stress: { title: string; desc: string };
      constitutional: { title: string; desc: string };
    };
    benefits: {
      title: string;
      benefit1: string;
      benefit2: string;
      benefit3: string;
      benefit4: string;
    };
    booking: {
      title: string;
      name: string;
      email: string;
      phone: string;
      nationality: string;
      checkupDate: string;
      package: string;
      hanyang: string;
      interpreter: string;
      submit: string;
    };
  };
  // Chatbot FAQ
  chatbot: {
    title: string;
    categories: {
      overview: string;
      medical: string;
      hanyang: string;
      travel: string;
    };
    faq: Array<{ q: string; a: string }>;
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
    bookNow: string;
    learnMore: string;
  };
}
