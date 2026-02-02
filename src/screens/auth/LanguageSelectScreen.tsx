import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../theme/colors';

const LanguageSelectScreen = ({ navigation }: any) => {
  const { t, i18n } = useTranslation();

  const selectLang = async (lang: string) => {
    await AsyncStorage.setItem('APP_LANG', lang);
    await i18n.changeLanguage(lang);
    navigation.replace('Login'); // ✅ go to Login after language selection
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Title */}
      <Text style={styles.title}>
        {t('selectLanguage')}
      </Text>

      {/* English */}
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={() => selectLang('en')}
      >
        <Text style={styles.langText}>English</Text>
        <Text style={styles.sub}>English</Text>
      </TouchableOpacity>

      {/* Tamil */}
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={() => selectLang('ta')}
      >
        <Text style={styles.langText}>தமிழ்</Text>
        <Text style={styles.sub}>Tamil</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LanguageSelectScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 30,
    color: colors.primary,
  },

  card: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 14,
  },

  langText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
  },

  sub: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
});
