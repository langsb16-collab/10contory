import { en } from './en';
import { ko } from './ko';
import { zh } from './zh';
import { es } from './es';
import { Translation } from './types';

// Hindi
const hi: Translation = {
  ...en,
  diagnostic: {
    title: 'स्तर निर्धारण परीक्षण',
    clickToStart: 'स्तर जाँचने के लिए क्लिक करें!',
    subtitle: 'अपने वर्तमान स्तर का मूल्यांकन करें और व्यक्तिगत अध्ययन योजना प्राप्त करें',
    testInfo: {
      title: 'परीक्षण जानकारी',
      duration: 'समय: लगभग 20 मिनट',
      questions: 'प्रश्नों की संख्या: 30',
      areas: 'मूल्यांकन क्षेत्र: सुनना, पढ़ना, लिखना',
      results: 'परिणाम: तुरंत उपलब्ध'
    },
    startButton: 'परीक्षण शुरू करें'
  }
};

// French
const fr: Translation = {
  ...en,
  diagnostic: {
    title: 'Test de Niveau',
    clickToStart: 'Cliquez pour évaluer votre niveau !',
    subtitle: 'Évaluez votre niveau actuel et recevez un plan d\'apprentissage personnalisé',
    testInfo: {
      title: 'Informations sur le test',
      duration: 'Durée : Environ 20 minutes',
      questions: 'Nombre de questions : 30',
      areas: 'Compétences évaluées : Écoute, Lecture, Écriture',
      results: 'Résultats : Disponibles immédiatement'
    },
    startButton: 'Commencer le test'
  }
};

// Arabic
const ar: Translation = {
  ...en,
  diagnostic: {
    title: 'اختبار تحديد المستوى',
    clickToStart: 'انقر لتحديد مستواك!',
    subtitle: 'قم بقياس مستواك الحالي واحصل على خطة تعلم مخصصة',
    testInfo: {
      title: 'معلومات الاختبار',
      duration: 'المدة: حوالي 20 دقيقة',
      questions: 'عدد الأسئلة: 30 سؤالاً',
      areas: 'مجالات التقييم: الاستماع، القراءة، الكتابة',
      results: 'النتائج: متاحة فورًا'
    },
    startButton: 'ابدأ الاختبار'
  }
};

// Bengali
const bn: Translation = {
  ...en,
  diagnostic: {
    title: 'স্তর নির্ধারণ পরীক্ষা',
    clickToStart: 'স্তর নির্ধারণ করতে ক্লিক করুন!',
    subtitle: 'আপনার বর্তমান দক্ষতা মূল্যায়ন করুন এবং ব্যক্তিগত শেখার পরিকল্পনা পান',
    testInfo: {
      title: 'পরীক্ষার তথ্য',
      duration: 'সময়: প্রায় ২০ মিনিট',
      questions: 'প্রশ্ন সংখ্যা: ৩০টি',
      areas: 'মূল্যায়নের ক্ষেত্র: শোনা, পড়া, লেখা',
      results: 'ফলাফল: সঙ্গে সঙ্গে পাওয়া যাবে'
    },
    startButton: 'পরীক্ষা শুরু করুন'
  }
};

// Portuguese
const pt: Translation = {
  ...en,
  diagnostic: {
    title: 'Teste de Nivelamento',
    clickToStart: 'Clique para verificar seu nível!',
    subtitle: 'Avalie seu nível atual e receba um plano de estudos personalizado',
    testInfo: {
      title: 'Informações do Teste',
      duration: 'Duração: Aproximadamente 20 minutos',
      questions: 'Número de questões: 30',
      areas: 'Áreas avaliadas: Compreensão oral, Leitura, Escrita',
      results: 'Resultado: Disponível imediatamente'
    },
    startButton: 'Iniciar teste'
  }
};

// Russian
const ru: Translation = {
  ...en,
  diagnostic: {
    title: 'Тест на определение уровня',
    clickToStart: 'Нажмите, чтобы определить свой уровень!',
    subtitle: 'Оцените свой текущий уровень и получите персональный план обучения',
    testInfo: {
      title: 'Информация о тесте',
      duration: 'Время прохождения: около 20 минут',
      questions: 'Количество вопросов: 30',
      areas: 'Области оценки: Аудирование, Чтение, Письмо',
      results: 'Результаты: доступны сразу'
    },
    startButton: 'Начать тест'
  }
};

// Indonesian
const id: Translation = {
  ...en,
  diagnostic: {
    title: 'Tes Penentuan Level',
    clickToStart: 'Klik untuk mengetahui level Anda!',
    subtitle: 'Ukur kemampuan Anda saat ini dan dapatkan rencana belajar yang dipersonalisasi',
    testInfo: {
      title: 'Informasi Tes',
      duration: 'Durasi: Sekitar 20 menit',
      questions: 'Jumlah soal: 30',
      areas: 'Area penilaian: Mendengarkan, Membaca, Menulis',
      results: 'Hasil: Tersedia langsung'
    },
    startButton: 'Mulai Tes'
  }
};

export const translations: Record<string, Translation> = {
  ko,
  en,
  zh,
  es,
  fr,
  ar,
  hi,
  bn,
  pt,
  ru,
  id
};

export function getTranslation(lang: string): Translation {
  return translations[lang] || translations.en;
}
