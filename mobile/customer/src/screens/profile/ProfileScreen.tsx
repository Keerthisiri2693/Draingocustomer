import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

import colors from '../../theme/colors';
import styles from '../../theme/styles';
import AppIcon from '../../components/AppIcon';
import { AuthContext } from '../../navigation/AuthContext';

const ProfileScreen = () => {
  const { t, i18n } = useTranslation();
  const { logout } = useContext(AuthContext);

  const [currentLang, setCurrentLang] = useState(i18n.language);

  /* 🔁 Sync language */
  useEffect(() => {
    setCurrentLang(i18n.language);
  }, [i18n.language]);

  /* 🌐 CHANGE LANGUAGE */
  const changeLanguage = async (lang: string) => {
    if (lang === currentLang) return;
    await AsyncStorage.setItem('APP_LANG', lang);
    await i18n.changeLanguage(lang);
    setCurrentLang(lang);
  };

  /* 🚪 LOGOUT */
  const handleLogout = () => {
    Alert.alert(
      t('logout'),
      t('logoutConfirm'),
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('logout'),
          style: 'destructive',
          onPress: logout, // ✅ ONLY CONTEXT CONTROLS NAVIGATION
        },
      ],
    );
  };

  /* 🧪 DEV RESET APP */
  const resetApp = async () => {
    await AsyncStorage.multiRemove([
      'FIRST_LAUNCH',
      'APP_LANG',
      'LOGGED_IN',
      'TERMS_ACCEPTED',
    ]);
    logout();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ padding: 16 }}>

          {/* PROFILE HEADER */}
          <View style={[styles.card, local.profileCard]}>
            <View style={local.avatar}>
              <AppIcon
                type="ion"
                name="person-outline"
                size={36}
                color={colors.primary}
              />
            </View>

            <Text style={local.name}>Praveen Kumar</Text>
            <Text style={local.phone}>+91 70929 35675</Text>

            <TouchableOpacity style={local.editBtn}>
              <Text style={local.editText}>{t('editProfile')}</Text>
            </TouchableOpacity>
          </View>

          {/* SETTINGS */}
          <Text style={local.sectionTitle}>{t('settings')}</Text>

          <View style={styles.card}>
            <ProfileItem icon="person-outline" label={t('accountDetails')} />
            <Divider />

            <ProfileItem icon="location-outline" label={t('savedAddresses')} />
            <Divider />

            {/* 🌐 LANGUAGE */}
            <View style={{ paddingVertical: 14 }}>
              <View style={local.itemLeft}>
                <AppIcon type="ion" name="language-outline" size={22} />
                <Text style={local.itemText}>{t('language')}</Text>
              </View>

              <View style={local.langRow}>
                <TouchableOpacity
                  style={[
                    local.langBtn,
                    currentLang === 'en' && local.langActive,
                  ]}
                  onPress={() => changeLanguage('en')}
                >
                  <Text style={local.langText}>{t('english')}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    local.langBtn,
                    currentLang === 'ta' && local.langActive,
                  ]}
                  onPress={() => changeLanguage('ta')}
                >
                  <Text style={local.langText}>{t('tamil')}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Divider />

            <ProfileItem icon="help-circle-outline" label={t('helpSupport')} />
            <Divider />

            <ProfileItem icon="information-circle-outline" label={t('about')} />
          </View>

          {/* LOGOUT */}
          <TouchableOpacity
            style={[styles.card, local.logoutCard]}
            onPress={handleLogout}
          >
            <View style={local.logoutRow}>
              <AppIcon
                type="ion"
                name="log-out-outline"
                color={colors.danger}
              />
              <Text style={local.logoutText}>{t('logout')}</Text>
            </View>
          </TouchableOpacity>

          {/* DEV RESET (ONLY IN DEV MODE) */}
          {__DEV__ && (
            <TouchableOpacity
              style={[styles.card, local.devResetCard]}
              onPress={resetApp}
            >
              <View style={local.logoutRow}>
                <AppIcon
                  type="ion"
                  name="refresh-outline"
                  color="#FF9800"
                />
                <Text style={local.devResetText}>
                  Reset App (DEV)
                </Text>
              </View>
            </TouchableOpacity>
          )}

        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

/* ---------- SMALL COMPONENTS ---------- */

const ProfileItem = ({ icon, label }: any) => (
  <TouchableOpacity style={local.itemRow}>
    <View style={local.itemLeft}>
      <AppIcon type="ion" name={icon} size={22} />
      <Text style={local.itemText}>{label}</Text>
    </View>
    <AppIcon type="ion" name="chevron-forward" color="#999" />
  </TouchableOpacity>
);

const Divider = () => <View style={local.divider} />;

/* ---------- STYLES ---------- */

const local = StyleSheet.create({
  profileCard: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F1F5F4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  phone: {
    fontSize: 13,
    color: '#777',
    marginTop: 2,
  },
  editBtn: {
    marginTop: 12,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  editText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 13,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
    color: '#3A2C1D',
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
    gap: 10,
  },
  itemText: {
    fontSize: 14,
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEE',
  },

  /* 🌐 LANGUAGE */
  langRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
  },
  langBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  langActive: {
    borderColor: colors.primary,
    backgroundColor: '#F0FFF6',
  },
  langText: {
    fontSize: 13,
    fontWeight: '600',
  },

  /* 🚪 LOGOUT */
  logoutCard: {
    marginTop: 20,
  },
  logoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.danger,
  },

  /* 🧪 DEV RESET */
  devResetCard: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#FFD699',
    backgroundColor: '#FFF7E6',
  },
  devResetText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF9800',
  },
});
