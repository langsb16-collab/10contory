import { en } from './en';
import { zh } from './zh';
import { es } from './es';
import { Translation, Language, SUPPORTED_LANGUAGES } from './types';

// Re-export types
export { Translation, Language, SUPPORTED_LANGUAGES } from './types';

// Simplified translations for remaining languages (fr, ar, hi, bn, pt, ru, id)
// In production, these should be professionally translated

const fr: Translation = { ...en }; // French - to be translated
const ar: Translation = { ...en }; // Arabic - to be translated
const hi: Translation = { ...en }; // Hindi - to be translated
const bn: Translation = { ...en }; // Bengali - to be translated
const pt: Translation = { ...en }; // Portuguese - to be translated
const ru: Translation = { ...en }; // Russian - to be translated
const id: Translation = { ...en }; // Indonesian - to be translated

export const translations: Record<Language, Translation> = {
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

export function getTranslation(lang: Language): Translation {
  return translations[lang] || translations.en;
}
