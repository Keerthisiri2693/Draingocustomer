// i18n configuration for Driver App
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation files
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const enTranslations = require('./locales/en/translation.json');
const taTranslations = require('./locales/ta/translation.json');
const knTranslations = require('./locales/kn/translation.json');
const mlTranslations = require('./locales/ml/translation.json');
const hiTranslations = require('./locales/hi/translation.json');

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      ta: { translation: taTranslations },
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

export default i18n;