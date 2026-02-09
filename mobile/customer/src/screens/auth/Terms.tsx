import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../theme/colors';

const TermsConditionsScreen = ({ navigation }: any) => {
  const { t } = useTranslation();

  const [accepted, setAccepted] = useState(false);
  const [scrolledToEnd, setScrolledToEnd] = useState(false);

  /* 🔁 Skip if terms already accepted */
  useEffect(() => {
    const checkTerms = async () => {
      const acceptedBefore = await AsyncStorage.getItem('TERMS_ACCEPTED');
      if (acceptedBefore === 'true') {
        navigation.replace('HomeScreen'); // ✅ go to main screen
      }
    };
    checkTerms();
  }, []);

  const handleScroll = ({ nativeEvent }: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const isBottom =
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - 20;

    if (isBottom) {
      setScrolledToEnd(true);
    }
  };

  const handleAccept = async () => {
    if (!accepted) return;

    await AsyncStorage.setItem('TERMS_ACCEPTED', 'true');
    navigation.replace('HomeScreen');
  };

  return (
    <SafeAreaView
      edges={['top', 'bottom']}   // ✅ FIX: respect bottom gesture inset
      style={styles.safeArea}
    >
      <View style={styles.container}>
        {/* TITLE */}
        <Text style={styles.title}>{t('termsTitle')}</Text>

        {/* TERMS CONTENT */}
        <ScrollView
          style={styles.box}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <Text style={styles.section}>
            {t('termsSectionTitle')}
          </Text>

          <Text style={styles.text}>
            {t('termsContent')}
          </Text>
        </ScrollView>
      </View>

      {/* STICKY ACCEPT SECTION */}
      {scrolledToEnd && (
        <View style={styles.acceptBox}>
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setAccepted(!accepted)}
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.checkbox,
                accepted && styles.checked,
              ]}
            />
            <Text style={styles.checkboxText}>
              {t('acceptTerms')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={!accepted}
            style={[
              styles.button,
              { backgroundColor: accepted ? colors.primary : '#CFCFCF' },
            ]}
            onPress={handleAccept}
          >
            <Text style={styles.buttonText}>
              {t('acceptContinue')} →
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default TermsConditionsScreen;

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },

  container: {
    flex: 1,
    paddingHorizontal: 16,   // ✅ horizontal only
  },

  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 12,
  },

  box: {
    flex: 1,
    backgroundColor: '#F7F9FB',
    borderRadius: 14,
    padding: 14,
  },

  section: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 8,
    color: '#111',
  },

  text: {
    fontSize: 13,
    lineHeight: 20,
    color: '#444',
  },

  /* Sticky bottom section */
  acceptBox: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },

  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: colors.primary,
    marginRight: 10,
  },

  checked: {
    backgroundColor: colors.primary,
  },

  checkboxText: {
    fontWeight: '600',
    flex: 1,
    color: '#333',
  },

  button: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 15,
  },
});
