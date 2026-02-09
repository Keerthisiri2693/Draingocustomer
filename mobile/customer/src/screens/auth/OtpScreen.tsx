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
  const { t } = useTranslation();
  const fade = useRef(new Animated.Value(0)).current;
  const shake = useRef(new Animated.Value(0)).current;

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [resendDisabled, setResendDisabled] = useState(true);

  const inputs = useRef<Array<TextInput | null>>([]);
  const phone = route?.params?.phone ?? '';

  // Fade in + focus first input
  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 450,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      inputs.current[0]?.focus();
    }, 300);
  }, []);

  // Resend timer
  useEffect(() => {
    if (!resendDisabled) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [resendDisabled]);

  const handleChange = (text: string, index: number) => {
    if (!/^\d?$/.test(text)) return; // digits only

    const updated = [...otp];
    updated[index] = text;
    setOtp(updated);

    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const shakeAnimation = () => {
    Animated.sequence([
      Animated.timing(shake, { toValue: 8, duration: 80, useNativeDriver: true }),
      Animated.timing(shake, { toValue: -8, duration: 80, useNativeDriver: true }),
      Animated.timing(shake, { toValue: 0, duration: 60, useNativeDriver: true }),
    ]).start();
  };

  const handleVerify = () => {
    const code = otp.join('');
    if (code.length !== 6) {
      shakeAnimation();
      return;
    }


    navigation.replace('Terms');
  };

  const handleResend = () => {
    setOtp(['', '', '', '', '', '']);
    setTimer(30);
    setResendDisabled(true);
    inputs.current[0]?.focus();
    // TODO: call resend OTP API
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'android' ? 40 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scroll}>
          <Animated.View style={[styles.container, { opacity: fade }]}>

            <View style={styles.spacer} />

            <Text style={styles.heading}>
              {t('VerifyOtp')} 🔐
            </Text>

            <Text style={styles.text}>{t('enterOtpSent')}</Text>

            <Text style={styles.phone}>+91 {phone}</Text>

            {/* OTP INPUTS */}
            <Animated.View style={[styles.row, { transform: [{ translateX: shake }] }]}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputs.current[index] = ref)}
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
              <Button title={`${t('Verifyotp')} →`} onPress={handleVerify} />
            </View>

            {/* RESEND */}
           <TouchableOpacity
  style={styles.resendContainer}
  onPress={handleResend}
  disabled={resendDisabled}
>
  <Text
    style={[
      styles.resendText,
      resendDisabled && styles.resendDisabledText,
    ]}
  >
    {resendDisabled
      ? `${t('resendAvailableIn')} ${timer}s`
      : t('Resendotp')}
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
    textAlign: 'center',
  },

  text: {
    color: '#777',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 6,
  },

  phone: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 22,
    textAlign: 'center',
    color: '#222',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },

  box: {
    width: 46,
    height: 52,
    borderWidth: 1.5,
    borderColor: '#CFCFCF',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 18,
    color: '#222',
    backgroundColor: '#FFF',
  },
  resendContainer: {
  marginTop: 18,
  alignItems: 'center',
},

resendText: {
  fontSize: 14,
  fontWeight: '600',
  color: colors.primary,
},

resendDisabledText: {
  color: '#999',
},

});
