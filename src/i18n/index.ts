import { Translation, Language, SUPPORTED_LANGUAGES } from './types';

// Import all language translations
import { ko } from './ko';
import { en } from './en';
import { zh } from './zh';
import { hi } from './hi';
import { es } from './es';
import { fr } from './fr';
import { ar } from './ar';
import { bn } from './bn';
import { pt } from './pt';
import { ru } from './ru';
import { id } from './id';

// Export types
export type { Translation, Language };
export { SUPPORTED_LANGUAGES };

// Translation registry with Korean as first language
export const translations: Record<Language, Translation> = {
  ko,  // Korean (first)
  en,  // English
  zh,  // Chinese
  hi,  // Hindi
  es,  // Spanish
  fr,  // French
  ar,  // Arabic
  bn,  // Bengali
  pt,  // Portuguese
  ru,  // Russian
  id   // Indonesian
};

// Helper function to get translation by language
export function getTranslation(language: Language): Translation {
  return translations[language] || translations.en;
}

// Get browser language with fallback
export function getBrowserLanguage(): Language {
  if (typeof window === 'undefined') return 'ko'; // Default to Korean on server

  const browserLang = navigator.language.toLowerCase();
  
  // Map browser language codes to our supported languages
  const langMap: Record<string, Language> = {
    'ko': 'ko', 'ko-kr': 'ko',
    'en': 'en', 'en-us': 'en', 'en-gb': 'en',
    'zh': 'zh', 'zh-cn': 'zh', 'zh-tw': 'zh',
    'hi': 'hi', 'hi-in': 'hi',
    'es': 'es', 'es-es': 'es', 'es-mx': 'es',
    'fr': 'fr', 'fr-fr': 'fr', 'fr-ca': 'fr',
    'ar': 'ar', 'ar-sa': 'ar', 'ar-ae': 'ar',
    'bn': 'bn', 'bn-bd': 'bn', 'bn-in': 'bn',
    'pt': 'pt', 'pt-br': 'pt', 'pt-pt': 'pt',
    'ru': 'ru', 'ru-ru': 'ru',
    'id': 'id', 'id-id': 'id'
  };

  return langMap[browserLang] || 'ko'; // Default to Korean
}
