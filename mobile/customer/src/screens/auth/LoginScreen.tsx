import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import Button from '../../components/Button';
import Input from '../../components/Input';
import colors from '../../theme/colors';

const LoginScreen = ({ navigation }: any) => {
  const { t } = useTranslation();
  const fade = useRef(new Animated.Value(0)).current;

  const [phone, setPhone] = useState('');

  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 450,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleContinue = () => {
    const cleanedPhone = phone.replace(/\D/g, '');
    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(cleanedPhone)) {
      Alert.alert(t('invalidNumber'), t('enterValidPhone'));
      return;
    }

    navigation.navigate('Otp', { phone: cleanedPhone });
  };

  const handleCreateAccount = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.root}>
      {/* iOS only keyboard handling */}
     <KeyboardAvoidingView
  style={{ flex: 1 }}
  behavior={Platform.OS === 'ios' ? 'padding' : undefined}
  keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
>

        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Animated.View style={[styles.container, { opacity: fade }]}>

            {/* Illustration */}
            <Image
              source={require('../../assets/images/login.png')}
              style={styles.illustration}
              resizeMode="contain"
            />

            {/* Title */}
            <Text style={styles.title}>{t('welcomeBack')}</Text>
            <Text style={styles.subtitle}>{t('signInToContinue')}</Text>

            {/* Phone Input */}
            <Input
              placeholder={t('enterPhoneNumber')}
              keyboardType="phone-pad"
              maxLength={10}
              value={phone}
              onChangeText={setPhone}
            />

            {/* Continue Button */}
            <View style={{ marginTop: 24 }}>
              <Button
                title={`${t('continue')} →`}
                onPress={handleContinue}
              />
            </View>

            {/* Create Account */}
            <View style={styles.createAccountContainer}>
              <Text style={styles.createText}>
                {t('dontHaveAccount')}{' '}
              </Text>
              <TouchableOpacity onPress={handleCreateAccount}>
                <Text style={styles.createLink}>
                  {t('createAccount')}
                </Text>
              </TouchableOpacity>
            </View>

          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white, // ✅ no grey gap
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom:40,
  },

  container: {
    flex: 1,
  
    padding: 20,
  },

  illustration: {
    width: '100%',
    height: 240,
    marginBottom: 12,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primary,
  },

  subtitle: {
    color: '#777',
    marginBottom: 20,
  },

  createAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },

  createText: {
    fontSize: 14,
    color: '#666',
  },

  createLink: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
});
