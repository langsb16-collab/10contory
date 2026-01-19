import { Translation } from './types';

export const fr: Translation = {
  nav: {
    home: 'Accueil',
    about: 'À propos',
    courses: 'Cours',
    universities: 'Universités',
    companies: 'Entreprises',
    medical: 'Tourisme Médical',
    login: 'Connexion',
    signup: "S'inscrire",
    dashboard: 'Tableau de bord',
    logout: 'Déconnexion'
  },
  home: {
    hero: {
      title: 'Maîtrisez le coréen avec TOPIK Pro',
      subtitle: 'Plateforme multilingue gratuite pour la préparation TOPIK et les opportunités de carrière en Corée',
      cta: "Commencer à apprendre maintenant"
    },
    features: {
      title: 'Pourquoi choisir TOPIK Pro ?',
      feature1: {
        title: 'Apprentissage assisté par IA',
        desc: 'Plans d\'étude personnalisés selon votre niveau et vos objectifs'
      },
      feature2: {
        title: 'Correspondance Université-Emploi',
        desc: 'Connectez-vous avec les universités et entreprises de la région de Gyeongsan'
      },
      feature3: {
        title: 'Gratuit pour toujours',
        desc: 'Préparation complète TOPIK sans frais'
      }
    }
  },
  medical: {
    hero: {
      title: 'Tour de Santé K-Medical',
      subtitle: 'Découvrez des soins de santé de classe mondiale à Gyeongsan avec la médecine traditionnelle coréenne',
      cta: 'Réserver un Bilan de Santé'
    },
    packages: {
      title: 'Forfaits de Bilan de Santé',
      basic: {
        title: 'Bilan de Santé Basique',
        desc: 'Analyses sanguines, urinaires, radiographie thoracique, ECG - environ 2 heures'
      },
      comprehensive: {
        title: 'Bilan Complet',
        desc: 'Scan complet + CT/IRM + Endoscopie - environ 4 heures'
      },
      cancer: {
        title: 'Forfait Dépistage 5 Cancers',
        desc: 'Dépistage spécialisé des cancers de l\'estomac, côlon, foie, poumon, sein - environ 5 heures'
      },
      vip: {
        title: 'Bilan Premium VIP',
        desc: 'Bilan premium + coordinateur dédié + service limousine - environ 6 heures'
      }
    },
    hanyang: {
      title: 'Programme de Guérison par Médecine Coréenne',
      subtitle: 'Restaurez votre corps et votre esprit avec la médecine traditionnelle coréenne personnalisée après le bilan',
      digestive: {
        title: 'Acupuncture et Moxibustion Digestives',
        desc: 'Traitement des problèmes digestifs et troubles gastriques - environ 60 min'
      },
      musculoskeletal: {
        title: 'Thérapie Chuna Musculosquelettique',
        desc: 'Soulagement des douleurs de cou, épaules et dos - environ 45 min'
      },
      stress: {
        title: 'Acupuncture à Base de Plantes Anti-stress',
        desc: 'Soulagement du stress et stabilité mentale - environ 50 min'
      },
      constitutional: {
        title: 'Médecine à Base de Plantes Constitutionnelle',
        desc: 'Prescription à base de plantes personnalisée selon votre constitution - environ 30 min'
      }
    },
    benefits: {
      title: 'Pourquoi le Tourisme Médical à Gyeongsan ?',
      benefit1: {
        title: 'Coût Abordable',
        desc: '30-50% moins cher que les grandes villes'
      },
      benefit2: {
        title: 'Aucun Temps d\'Attente',
        desc: 'Rendez-vous immédiat, résultats le jour même'
      },
      benefit3: {
        title: 'Soins Intégrés',
        desc: 'Synergie médecine occidentale + médecine traditionnelle coréenne'
      },
      benefit4: {
        title: 'Interprétation Médicale',
        desc: 'Support en 11 langues avec service d\'accompagnement'
      }
    },
    booking: {
      title: 'Réserver un Bilan de Santé',
      name: 'Nom complet',
      email: 'E-mail',
      phone: 'Numéro de téléphone',
      nationality: 'Nationalité',
      checkupDate: 'Date préférée',
      package: 'Forfait de Bilan',
      hanyang: 'Programme de Médecine Coréenne (Optionnel)',
      interpreter: 'Besoin d\'un interprète',
      submit: 'Réserver maintenant'
    }
  },
  auth: {
    login: {
      title: 'Se connecter à votre compte',
      email: 'E-mail',
      password: 'Mot de passe',
      submit: 'Connexion',
      noAccount: 'Vous n\'avez pas de compte ?',
      signupLink: 'Inscrivez-vous ici'
    },
    signup: {
      title: 'Créer votre compte',
      name: 'Nom complet',
      email: 'E-mail',
      password: 'Mot de passe',
      confirmPassword: 'Confirmer le mot de passe',
      nativeLanguage: 'Langue maternelle',
      targetLevel: 'Niveau TOPIK cible',
      purpose: 'Objectif d\'apprentissage',
      submit: 'S\'inscrire',
      hasAccount: 'Vous avez déjà un compte ?',
      loginLink: 'Connectez-vous ici'
    }
  },
  dashboard: {
    title: 'Mon Tableau de bord',
    currentLevel: 'Niveau actuel',
    targetLevel: 'Niveau cible',
    progress: 'Progrès',
    todayTasks: 'Tâches d\'aujourd\'hui',
    startLearning: 'Commencer à apprendre',
    takeMockExam: 'Passer un examen blanc',
    viewResults: 'Voir les résultats'
  },
  diagnostic: {
    title: 'Test de Niveau',
    clickToStart: 'Vérifiez votre niveau – Cliquez maintenant !',
    subtitle: 'Mesurez votre niveau actuel et recevez un plan d\'apprentissage personnalisé',
    testInfo: {
      title: 'Informations sur le test',
      duration: 'Durée : Environ 20 minutes',
      questions: 'Nombre de questions : 30',
      areas: 'Domaines d\'évaluation : Écoute, Lecture, Écriture',
      results: 'Résultats : Disponibles immédiatement'
    },
    startButton: 'Commencer le test'
  },
  common: {
    save: 'Sauvegarder',
    cancel: 'Annuler',
    delete: 'Supprimer',
    edit: 'Modifier',
    view: 'Voir',
    loading: 'Chargement...',
    error: 'Erreur',
    success: 'Succès',
    bookNow: 'Réserver maintenant',
    learnMore: 'En savoir plus'
  }
};
