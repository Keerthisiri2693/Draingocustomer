import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import colors from '../../theme/colors';
import globalStyles from '../../theme/styles';
import AppIcon from '../../components/AppIcon';
import { AuthContext } from '../../navigation/AuthContext';

/* ✅ ALL SUPPORTED LANGUAGES */
const AVAILABLE_LANGUAGES = [
  { code: 'en', labelKey: 'english' },
  { code: 'ta', labelKey: 'tamil' },
  { code: 'te', labelKey: 'telugu' },
  { code: 'kn', labelKey: 'kannada' },
  { code: 'ml', labelKey: 'malayalam' },
  { code: 'hi', labelKey: 'hindi' },
];

const ProfileScreen = ({ navigation }: any) => {
  const { t, i18n } = useTranslation();
  const { logout } = useContext(AuthContext);

  const [currentLang, setCurrentLang] = useState(i18n.language);

  useEffect(() => {
  setCurrentLang(i18n.language);
}, [i18n.language]);

const changeLanguage = async (lang: string) => {
  if (lang === i18n.language) return;

  await AsyncStorage.setItem('APP_LANG', lang);
  await i18n.changeLanguage(lang);
};


  const handleLogout = () => {
    Alert.alert(
      t('logout'),
      t('confirmLogout'),
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('logout'),
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.multiRemove([
              'LOGGED_IN',
              'USER_DATA',
              'TOKEN',
            ]);
            logout();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.safe,
        { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
      ]}
    >
      <ScrollView contentContainerStyle={styles.container}>

        {/* PROFILE HEADER */}
        <View style={[globalStyles.card, styles.profileCard]}>
          <View style={styles.avatar}>
            <AppIcon type="ion" name="person-outline" size={38} color={colors.primary} />
          </View>

          <Text style={styles.name}>Praveen Kumar</Text>
          <Text style={styles.phone}>+91 70929 35675</Text>

          <TouchableOpacity
            style={styles.editBtn}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('EditprofileScreen')}
          >
            <Text style={styles.editText}>{t('editProfile')}</Text>
          </TouchableOpacity>
        </View>

        {/* SETTINGS */}
        <Text style={styles.sectionTitle}>{t('settings')}</Text>

        <View style={globalStyles.card}>
          <ProfileItem
            icon="person-outline"
            label={t('accountDetails')}
            onPress={() => navigation.navigate('AccountDetailsScreen')}
          />

          <Divider />

          <ProfileItem icon="location-outline" label={t('savedAddresses')}
          onPress={() => navigation.navigate('ViewAddressScreen')}
          />

          <Divider />

          {/* 🌐 LANGUAGE SECTION */}
          <View style={styles.langSection}>
            <View style={styles.itemLeft}>
              <View style={styles.iconCircle}>
                <AppIcon type="ion" name="language-outline" size={20} />
              </View>
              <Text style={styles.itemText}>{t('language')}</Text>
            </View>

            <View style={styles.langRow}>
              {AVAILABLE_LANGUAGES.map(lang => (
                <LangButton
                  key={lang.code}
                  label={t(lang.labelKey)}
                  active={currentLang === lang.code}
                  onPress={() => changeLanguage(lang.code)}
                />
              ))}
            </View>
          </View>

          <Divider />

          <ProfileItem
            icon="help-circle-outline"
            label={t('helpSupport')}
            onPress={() => navigation.navigate('HelpSupport')}
          />

          <Divider />

          <ProfileItem
            icon="information-circle-outline"
            label={t('about')}
            onPress={() => navigation.navigate('Aboutus')}
          />
        </View>

        {/* LOGOUT */}
        <TouchableOpacity
          style={[globalStyles.card, styles.logoutCard]}
          onPress={handleLogout}
          activeOpacity={0.85}
        >
          <View style={styles.logoutRow}>
            <View style={styles.logoutIcon}>
              <AppIcon type="ion" name="log-out-outline" color="#FFF" size={18} />
            </View>
            <Text style={styles.logoutText}>{t('logout')}</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

/* ---------- COMPONENTS ---------- */

const ProfileItem = ({ icon, label, onPress }: any) => (
  <TouchableOpacity style={styles.itemRow} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.itemLeft}>
      <View style={styles.iconCircle}>
        <AppIcon type="ion" name={icon} size={20} />
      </View>
      <Text style={styles.itemText}>{label}</Text>
    </View>
    <AppIcon type="ion" name="chevron-forward" size={18} color="#AAA" />
  </TouchableOpacity>
);

const LangButton = ({ label, active, onPress }: any) => (
  <TouchableOpacity
    style={[styles.langBtn, active && styles.langActive]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Text style={[styles.langText, active && { color: colors.primary }]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const Divider = () => <View style={styles.divider} />;

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F7F9FB',
  },

  container: {
    padding: 16,
  },

  profileCard: {
    alignItems: 'center',
    paddingVertical: 24,
    borderRadius: 16,
    marginBottom: 28,
  },

  avatar: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: '#ECFDF3',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  name: {
    fontSize: 19,
    fontWeight: '700',
    color: '#222',
  },

  phone: {
    fontSize: 13,
    color: '#777',
    marginTop: 4,
  },

  editBtn: {
    marginTop: 14,
    paddingHorizontal: 26,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: colors.primary,
  },

  editText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 13,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#444',
    marginBottom: 12,
  },

  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },

  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  itemText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },

  divider: {
    height: 1,
    backgroundColor: '#EEE',
  },

  langSection: {
    paddingVertical: 14,
  },

  langRow: {
    flexDirection: 'row',
    flexWrap: 'wrap', // ✅ REQUIRED
    gap: 12,
    marginTop: 10,
  },

  langBtn: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#DDD',
    backgroundColor: '#FFF',
  },

  langActive: {
    borderColor: colors.primary,
    backgroundColor: '#ECFDF3',
  },

  langText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#555',
  },

  logoutCard: {
    marginTop: 24,
    backgroundColor: '#FFF5F5',
    borderRadius: 16,
  },

  logoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  logoutIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoutText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.danger,
  },
});
