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
} from 'react-native';
import { useTranslation } from 'react-i18next';

import Button from '../../components/Button';
import Input from '../../components/Input';
import colors from '../../theme/colors';

const LoginScreen = ({ navigation }: any) => {
  const { t } = useTranslation(); // 🌐 translation hook
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
    if (phone.length < 10) {
      Alert.alert(
        t('invalidNumber'),
        t('enterValidPhone')
      );
      return;
    }

    navigation.navigate('Otp', { phone });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Animated.View style={[styles.container, { opacity: fade }]}>

        {/* Illustration */}
        <Image
          source={require('../../assets/images/login.png')}
          style={styles.illustration}
          resizeMode="contain"
        />

        {/* Title */}
        <Text style={styles.title}>
          {t('welcomeBack')}
        </Text>
        <Text style={styles.subtitle}>
          {t('signInToContinue')}
        </Text>

        {/* Phone Input */}
        <Input
          placeholder={t('enterPhoneNumber')}
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        {/* Continue Button */}
        <View style={{ marginTop: 20 }}>
          <Button
            title={`${t('continue')} →`}
            onPress={handleContinue}
          />
        </View>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: colors.white,
  },
  illustration: {
    width: '100%',
    height: 240,      // bigger image
    marginBottom: 10,
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
});
