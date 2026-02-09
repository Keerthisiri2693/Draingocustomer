import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './locales/en.json';
import ta from './locales/ta.json';
import te from './locales/te.json';
import kn from './locales/kn.json';
import ml from './locales/ml.json';
import hi from './locales/hi.json';

const resources = {
  en: { translation: en },
  ta: { translation: ta },
  te: { translation: te },
  kn: { translation: kn },
  ml: { translation: ml },
  hi: { translation: hi },
};

const initI18n = async () => {
  const savedLang = await AsyncStorage.getItem('APP_LANG');

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: savedLang || 'en',
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    });

  console.log('🌐 i18n initialized with:', i18n.language);
};

initI18n();

export default i18n;
