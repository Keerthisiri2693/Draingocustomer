import { LogBox } from 'react-native';
LogBox.ignoreLogs([
  'i18next::pluralResolver',
]);

import '../src/localization/i18n';

import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../src/localization/i18n';

import Navigation from './navigation/index';

const App = () => {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const loadLang = async () => {
      try {
        const lang = await AsyncStorage.getItem('APP_LANG');
        if (lang) {
          await i18n.changeLanguage(lang);
        }
      } catch (e) {
        console.log('Language load error', e);
      } finally {
        setAppReady(true);
      }
    };

    loadLang();
  }, []);

  // ⛔ Prevent rendering until language is loaded
  if (!appReady) {
    return null; // or splash loader if you want
  }

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <Navigation />
    </SafeAreaProvider>
  );
};

export default App;
