import { Translation } from './types';

export const en: Translation = {
  nav: {
    home: 'Home',
    about: 'About',
    courses: 'Courses',
    universities: 'Universities',
    companies: 'Companies',
    medical: 'Health Checkup',
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
  diagnostic: {
    title: 'Placement Test',
    clickToStart: 'Check Your Level – Click Now!',
    subtitle: 'Measure your current level and receive a personalized learning plan',
    testInfo: {
      title: 'Test Information',
      duration: 'Duration: About 20 minutes',
      questions: 'Number of Questions: 30',
      areas: 'Assessment Areas: Listening, Reading, Writing',
      results: 'Results: Available immediately'
    },
    startButton: 'Start Test'
  },
  medical: {
    hero: {
      title: 'K-Medical Health Tour',
      subtitle: 'Experience 1-3 day health checkup and traditional Korean medicine healing',
      description: 'A unique health tourism program combining cutting-edge medical facilities and traditional Korean medicine in Gyeongsan City. Affordable prices compared to major cities with top-quality medical services.'
    },
    packages: {
      basic: {
        title: 'Basic Health Checkup',
        price: '₩350,000',
        features: ['Basic physical measurements', 'Blood test', 'Urine test', 'Chest X-ray', 'ECG test']
      },
      comprehensive: {
        title: 'Comprehensive Checkup',
        price: '₩750,000',
        features: ['Basic checkup included', 'Abdominal ultrasound', 'Gastroscopy', 'CT scan', 'Tumor markers', 'Nutritional counseling']
      },
      cancer: {
        title: 'Cancer Screening',
        price: '₩1,200,000',
        features: ['Comprehensive checkup included', 'PET-CT', 'Full body MRI', 'Genetic testing', 'Oncologist consultation']
      },
      vip: {
        title: 'VIP Executive Package',
        price: '₩2,500,000',
        features: ['Cancer screening included', '1:1 dedicated coordinator', 'Premium Korean medicine treatment', 'Luxury hotel', 'Private car', 'Gourmet Korean cuisine']
      }
    },
    hanyang: {
      title: 'Korean Medicine Healing Program',
      subtitle: 'Traditional Korean medicine care to heal body and mind after checkup',
      digestive: {
        title: 'Digestive Care',
        desc: 'Improve digestive function with acupuncture and moxibustion'
      },
      musculoskeletal: {
        title: 'Musculoskeletal Care',
        desc: 'Spinal and joint correction with Chuna therapy'
      },
      stress: {
        title: 'Stress Relief',
        desc: 'Mind and body relaxation with herbal therapy'
      },
      constitutional: {
        title: 'Constitutional Analysis',
        desc: 'Sasang constitution diagnosis and personalized lifestyle guide'
      }
    },
    benefits: {
      title: 'Why Choose Gyeongsan?',
      benefit1: '30-50% cheaper than major cities',
      benefit2: 'Minimal waiting time, same-day checkup available',
      benefit3: 'Differentiated program combined with Korean medicine',
      benefit4: 'Trusted medical institutions including Yeungnam University Hospital'
    },
    booking: {
      title: 'Book Your Health Checkup',
      name: 'Name',
      email: 'Email',
      phone: 'Phone Number',
      nationality: 'Nationality',
      checkupDate: 'Preferred Checkup Date',
      package: 'Checkup Package',
      hanyang: 'Add Korean Medicine Program',
      interpreter: 'Need Medical Interpreter',
      submit: 'Submit Booking Request'
    }
  },
  common: {
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    view: 'View',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    bookNow: 'Book Now',
    learnMore: 'Learn More'
  }
};
