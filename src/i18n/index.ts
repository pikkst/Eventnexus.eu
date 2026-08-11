import {
  translations,
  type Language,
  type TranslationKeys,
  defaultLanguage,
  languages,
} from './translations.ts';

export type { Language, TranslationKeys };

export function getLanguageFromPath(pathname: string): Language {
  const segments = pathname.split('/').filter(Boolean);
  const first = segments[0]?.toLowerCase();
  if (first && first in translations) {
    return first as Language;
  }
  return defaultLanguage;
}

function deepMerge(target: any, source: any): any {
  const result = { ...target };
  for (const key in source) {
    if (
      source[key] &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key])
    ) {
      result[key] = deepMerge(target[key] || {}, source[key]);
    } else if (Array.isArray(source[key])) {
      result[key] =
        Array.isArray(target[key]) && target[key].length > 0
          ? target[key]
          : source[key];
    } else {
      result[key] = target[key] !== undefined ? target[key] : source[key];
    }
  }
  return result;
}

export function getTranslations(language: Language): TranslationKeys {
  const source = translations[language] || translations[defaultLanguage];
  const defaults = translations[defaultLanguage];
  return deepMerge(source, defaults);
}

export function getAvailableLanguages() {
  return Object.keys(translations) as Language[];
}

export { defaultLanguage, languages };
