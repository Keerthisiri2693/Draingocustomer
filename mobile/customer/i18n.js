// i18n configuration for Customer App
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation files
import enTranslations from './locales/en/translation.json';
import taTranslations from './locales/ta/translation.json';
import teTranslations from './locales/te/translation.json';
import knTranslations from './locales/kn/translation.json';
import mlTranslations from './locales/ml/translation.json';
import hiTranslations from './locales/hi/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      ta: { translation: taTranslations },
      te: { translation: teTranslations },
      kn: { translation: knTranslations },
      ml: { translation: mlTranslations },
      hi: { translation: hiTranslations }
    },
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

console.log('i18n initialized with languages:', Object.keys(i18n.options.resources));

export default i18n;