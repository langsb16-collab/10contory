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
  chatbot: {
    title: 'Frequently Asked Questions',
    categories: {
      overview: 'Service Overview & Free Policy',
      medical: 'Health Checkup & Medical Tourism',
      hanyang: 'Traditional Korean Medicine & Wellness',
      travel: 'Travel, Convenience & Follow-up Care'
    },
    faq: [
      { q: 'What kind of platform is this?', a: 'This is a fully free integrated platform that combines Korean language learning with medical and traditional Korean medicine tourism.' },
      { q: 'Is it really free to use?', a: 'Yes. Registration, diagnostics, learning, and medical tourism information are all completely free.' },
      { q: 'Are there any hidden fees or paid upgrades?', a: 'No. All core services are provided free of charge.' },
      { q: 'Why is the service free?', a: 'It is operated for public and local government-supported purposes to help foreign residents and promote medical tourism.' },
      { q: 'Who can use this platform?', a: 'Anyone can use it regardless of nationality, age, or residency status.' },
      { q: 'Can I use it without signing up?', a: 'Some information is available, but registration is required for diagnostics and reservations.' },
      { q: 'Is there a time limit for free use?', a: 'No. There is no time limitation.' },
      { q: 'Can families or groups use it?', a: 'Yes. Family and group medical tourism is supported.' },
      { q: 'Who operates this platform?', a: 'It is operated jointly by local governments, medical institutions, and the platform operator.' },
      { q: 'Is it connected to government or public institutions?', a: 'Yes. It is linked with local government and foreign resident support programs.' },
      { q: 'What is medical tourism?', a: 'It is a form of tourism where people visit Korea for health checkups or medical treatments.' },
      { q: 'What medical services are available?', a: 'Comprehensive health checkups, cancer screenings, and detailed examinations are available.' },
      { q: 'Is the checkup cost also free?', a: 'Platform usage is free, but medical service costs follow hospital pricing.' },
      { q: 'Why are the costs relatively low?', a: 'Thanks to lower costs compared to major cities and local government cooperation structure.' },
      { q: 'Which hospitals are affiliated?', a: 'We are affiliated with general hospitals and health checkup centers in the Gyeongsan area.' },
      { q: 'Can foreigners get checkups?', a: 'Yes. We support dedicated checkup processes for foreigners.' },
      { q: 'How do I book a checkup?', a: 'Select your date and checkup items on the platform for automatic reservation.' },
      { q: 'Is the waiting time long?', a: 'We minimize waiting time through advance reservation system.' },
      { q: 'How do I receive checkup results?', a: 'Results are provided online in multilingual reports.' },
      { q: 'Is consultation available after checkup?', a: 'Yes. Online follow-up consultation is available.' },
      { q: 'Is cancer screening included?', a: 'Yes. Packages including 5 major cancer screenings are available.' },
      { q: 'Is VIP checkup available?', a: 'Yes. Executive and corporate premium checkup packages are available.' },
      { q: 'Is group checkup for companies possible?', a: 'Yes. Corporate and institutional group reservations are possible.' },
      { q: 'Is medical interpretation provided?', a: 'Yes. AI interpretation and offline interpretation when needed are provided.' },
      { q: 'Is medical personal information safe?', a: 'Yes. All medical information is encrypted and protected.' },
      { q: 'Can I receive traditional Korean medicine treatment?', a: 'Yes. Traditional Korean medicine clinic referral treatment is available after checkup.' },
      { q: 'What traditional treatments are available?', a: 'Acupuncture, moxibustion, Chuna therapy, herbal injections, and constitutional care are available.' },
      { q: 'Is it linked with checkup results?', a: 'Yes. Traditional medicine programs tailored to your health condition are recommended.' },
      { q: 'Can traditional medicine be for tourism purposes?', a: 'Yes. It is designed as K-traditional medicine experiential tourism.' },
      { q: 'How long does traditional treatment take?', a: 'Usually configured as 1-2 day experiential programs.' },
      { q: 'What is constitutional analysis?', a: 'It analyzes your constitutional type and provides customized lifestyle guidance.' },
      { q: 'How is lifestyle guidance provided?', a: 'Provided in PDF format in multiple languages.' },
      { q: 'Is there a stress management program?', a: 'Yes. Programs focusing on stress and fatigue recovery are available.' },
      { q: 'Is traditional treatment mandatory?', a: 'No. It is optional.' },
      { q: 'Can I receive both traditional and hospital treatment?', a: 'Yes. Integrated care is possible.' },
      { q: 'Is accommodation also reserved?', a: 'Yes. Hotel and lodging linked reservations are possible.' },
      { q: 'Is airport pickup supported?', a: 'Vehicle linkage is possible upon request.' },
      { q: 'How long is the medical tourism schedule?', a: '2 days 1 night or 3 days 2 nights schedules are typical.' },
      { q: 'Are tourist sites included?', a: 'Yes. Local healing tourism courses are provided.' },
      { q: 'Is family accompaniment possible?', a: 'Yes. Family unit schedules are also designed.' },
      { q: 'Do you provide care after returning home?', a: 'Yes. Online follow-up consultation and tracking alerts are provided.' },
      { q: 'Are there return visit benefits?', a: 'Yes. Priority reservation benefits are available for return visits.' },
      { q: 'How many languages are supported?', a: 'We support 10 major languages.' },
      { q: 'Are medical result explanation videos provided?', a: 'Yes. Explanation videos to aid understanding are provided.' },
      { q: 'What role does the local government play?', a: 'Policy support and foreign resident settlement programs are linked.' },
      { q: 'Are medical tourism performance managed?', a: 'Yes. Managed by country and type statistics.' },
      { q: 'Will the platform remain free?', a: 'Yes. Operated free based on public-partnership foundation.' },
      { q: 'Are there many commercial advertisements?', a: 'No. Operated with information focus.' },
      { q: 'What should I do right now?', a: 'Register and check free diagnostics and medical tourism information.' },
      { q: 'What is the core advantage of this platform?', a: 'Providing free + trusted medical + traditional medicine + tourism all in one.' }
    ]
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
