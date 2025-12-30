import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import colors from '../../theme/colors';

const LoginScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Set up your account.</Text>

      {/* Phone Input */}
      <View style={styles.phoneContainer}>
        <View style={styles.countryCode}>
          <Text style={styles.countryText}>🇮🇳 +91</Text>
        </View>

        <TextInput
          placeholder="Phone number"
          keyboardType="number-pad"
          style={styles.input}
        />
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => navigation.navigate('Otp')}
      >
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>

      {/* OR Divider */}
      <Text style={styles.orText}>or</Text>

      {/* Social Buttons */}
      <TouchableOpacity style={styles.socialButton}>
        <Text style={styles.socialText}> Continue with Apple</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
        <Text style={styles.socialText}>Continue with Facebook</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
        <Text style={styles.socialText}>Continue with Google</Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text style={styles.footerText}>
        Already had an account?{' '}
        <Text style={styles.loginText}>Log in</Text>
      </Text>
    </View>
  );
};

export default LoginScreen;

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
    marginBottom: 30,
    color: '#3A2C1D', // brownish from PDF
  },
  phoneContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  countryCode: {
    paddingHorizontal: 12,
    borderRightWidth: 1,
    borderColor: '#DDD',
  },
  countryText: {
    fontSize: 14,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 14,
  },
  continueButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  continueText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 15,
  },
  orText: {
    textAlign: 'center',
    color: '#999',
    marginBottom: 16,
  },
  socialButton: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  socialText: {
    fontSize: 14,
    color: '#444',
  },
  footerText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 13,
    color: '#666',
  },
  loginText: {
    color: colors.primary,
    fontWeight: '600',
  },
});
