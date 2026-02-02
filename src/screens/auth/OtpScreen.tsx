import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Button from '../../components/Button';
import colors from '../../theme/colors';

const OtpScreen = ({ navigation, route }: any) => {
  const { t } = useTranslation(); // 🌐 i18n
  const fade = useRef(new Animated.Value(0)).current;
  const shake = useRef(new Animated.Value(0)).current;

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [resendDisabled, setResendDisabled] = useState(true);

  const inputs = useRef<Array<TextInput | null>>([]);
  const phone = route?.params?.phone;

  // Fade in
  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 450,
      useNativeDriver: true,
    }).start();
  }, []);

  // Resend timer
  useEffect(() => {
    if (!resendDisabled) return;

    const interval = setInterval(() => {
      setTimer((t) => {
        if (t === 1) {
          setResendDisabled(false);
          clearInterval(interval);
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [resendDisabled]);

  const handleChange = (text: string, index: number) => {
    const updated = [...otp];
    updated[index] = text;
    setOtp(updated);

    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const shakeAnimation = () => {
    Animated.sequence([
      Animated.timing(shake, { toValue: 10, duration: 80, useNativeDriver: true }),
      Animated.timing(shake, { toValue: -10, duration: 80, useNativeDriver: true }),
      Animated.timing(shake, { toValue: 0, duration: 60, useNativeDriver: true }),
    ]).start();
  };

  const handleVerify = () => {
    if (otp.join('').length < 6) {
      shakeAnimation();
      return;
    }
    navigation.replace('TermsConditions');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'android' ? 40 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scroll}
        >
          <Animated.View style={[styles.container, { opacity: fade }]}>

            <View style={styles.spacer} />

            {/* CONTENT */}
            <Text style={styles.heading}>
              {t('verifyOtp')} 🔐
            </Text>

            <Text style={styles.text}>
              {t('enterOtpSent')}
            </Text>

            <Text style={styles.phone}>
              +91 {phone}
            </Text>

            {/* OTP INPUTS */}
            <Animated.View
              style={[styles.row, { transform: [{ translateX: shake }] }]}
            >
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    inputs.current[index] = ref;
                  }}
                  value={digit}
                  onChangeText={(t) => handleChange(t, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  style={styles.box}
                />
              ))}
            </Animated.View>

            {/* VERIFY */}
            <View style={{ marginTop: 24 }}>
              <Button
                title={`${t('verify')} →`}
                onPress={handleVerify}
              />
            </View>

            {/* RESEND */}
            <TouchableOpacity
              style={{ marginTop: 18 }}
              disabled={resendDisabled}
            >
              <Text style={{ color: colors.primary }}>
                {resendDisabled
                  ? `${t('resendAvailableIn')} ${timer}s`
                  : t('resendOtp')}
              </Text>
            </TouchableOpacity>

            <View style={styles.spacer} />

          </Animated.View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
  },
  spacer: {
    flex: 1,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 6,
  },
  text: {
    color: '#777',
  },
  phone: {
    fontWeight: '700',
    marginBottom: 22,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    width: 46,
    height: 50,
    borderWidth: 1.3,
    borderColor: '#CFCFCF',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 18,
  },
});
