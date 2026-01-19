import { Translation } from './types';

export const en: Translation = {
  nav: {
    home: 'Home',
    about: 'About',
    courses: 'Courses',
    universities: 'Universities',
    companies: 'Companies',
    login: 'Login',
    signup: 'Sign Up',
    dashboard: 'Dashboard',
    logout: 'Logout'
  },
  home: {
    hero: {
      title: 'Master Korean with TOPIK Pro',
      subtitle: 'Free multilingual platform for TOPIK preparation and career opportunities in Korea',
      cta: 'Start Learning Now'
    },
    features: {
      title: 'Why Choose TOPIK Pro?',
      feature1: {
        title: 'AI-Powered Learning',
        desc: 'Personalized study plans based on your level and goals'
      },
      feature2: {
        title: 'University & Job Matching',
        desc: 'Connect with universities and companies in Gyeongsan area'
      },
      feature3: {
        title: 'Free Forever',
        desc: 'Complete TOPIK preparation at no cost'
      }
    }
  },
  auth: {
    login: {
      title: 'Login to Your Account',
      email: 'Email',
      password: 'Password',
      submit: 'Login',
      noAccount: "Don't have an account?",
      signupLink: 'Sign up here'
    },
    signup: {
      title: 'Create Your Account',
      name: 'Full Name',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      nativeLanguage: 'Native Language',
      targetLevel: 'Target TOPIK Level',
      purpose: 'Learning Purpose',
      submit: 'Sign Up',
      hasAccount: 'Already have an account?',
      loginLink: 'Login here'
    }
  },
  dashboard: {
    title: 'My Dashboard',
    currentLevel: 'Current Level',
    targetLevel: 'Target Level',
    progress: 'Progress',
    todayTasks: "Today's Tasks",
    startLearning: 'Start Learning',
    takeMockExam: 'Take Mock Exam',
    viewResults: 'View Results'
  },
  common: {
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    view: 'View',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success'
  }
};
