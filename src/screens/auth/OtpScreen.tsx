import React, { useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import colors from '../../theme/colors';

const OtpScreen = ({ onLoginSuccess }: any) => {
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OTP Verification</Text>

      <View style={styles.otpContainer}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <TextInput
            key={i}
            ref={(el) => {
              inputs.current[i] = el;
            }}
            style={styles.otpBox}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(text) => handleChange(text, i)}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.verifyButton} onPress={onLoginSuccess}>
        <Text style={styles.verifyText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OtpScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 30,
    color: '#3A2C1D',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  otpBox: {
    width: 45,
    height: 50,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 18,
  },
  verifyButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  verifyText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '600',
  },
});
