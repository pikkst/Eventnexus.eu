import { translations, type Language, type TranslationKeys, defaultLanguage, languages } from './translations.ts';

export type { Language, TranslationKeys };

export function getLanguageFromPath(pathname: string): Language {
  const segments = pathname.split('/').filter(Boolean);
  const first = segments[0]?.toLowerCase();
  if (first && first in translations) {
    return first as Language;
  }
  return defaultLanguage;
}

export function getTranslations(language: Language): TranslationKeys {
  return translations[language] || translations[defaultLanguage];
}

export function getAvailableLanguages() {
  return Object.keys(translations) as Language[];
}

export { defaultLanguage, languages };
