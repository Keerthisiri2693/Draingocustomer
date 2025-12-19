// Driver Login Screen with OTP Verification
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer => timer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  const handleSendOTP = async () => {
    if (!phone || phone.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    try {
      // Call backend to send OTP
      const response = await axios.post('http://localhost:3000/api/drivers/send-otp', {
        phone: phone
      });

      if (response.data.success) {
        setOtpSent(true);
        setTimer(60);
        setIsActive(true);
        Alert.alert('Success', 'OTP sent successfully!');
      } else {
        Alert.alert('Error', response.data.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('OTP send error:', error);
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      // Call backend to verify OTP
      const response = await axios.post('http://localhost:3000/api/drivers/verify-otp', {
        phone: phone,
        otp: otp
      });

      if (response.data.success) {
        // Store driver token and navigate to home
        // In a real app, you would store the token securely
        navigation.navigate('Home', { driverData: response.data.driver });
      } else {
        Alert.alert('Error', response.data.message || 'Invalid OTP');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      Alert.alert('Error', 'Failed to verify OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = () => {
    if (isActive) {
      Alert.alert('Please wait', `You can resend OTP in ${timer} seconds`);
      return;
    }
    handleSendOTP();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Driver Login</Text>

      {!otpSent ? (
        <>
          <Text style={styles.subtitle}>Enter your registered mobile number</Text>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            maxLength={10}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleSendOTP}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Send OTP</Text>
            )}
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.subtitle}>Enter the 6-digit OTP sent to {phone}</Text>
          <TextInput
            style={styles.input}
            placeholder="OTP"
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
            maxLength={6}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleVerifyOTP}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Verify OTP</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.resendButton}
            onPress={handleResendOTP}
            disabled={isActive}
          >
            <Text style={styles.resendText}>
              {isActive ? `Resend OTP in ${timer}s` : 'Resend OTP'}
            </Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.registerText}>Create New Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#2c3e50'
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#7f8c8d'
  },
  input: {
    height: 50,
    borderColor: '#bdc3c7',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  resendButton: {
    alignItems: 'center',
    marginBottom: 20
  },
  resendText: {
    color: '#3498db',
    fontSize: 14
  },
  registerButton: {
    alignItems: 'center',
    marginTop: 20
  },
  registerText: {
    color: '#2c3e50',
    fontSize: 14,
    textDecorationLine: 'underline'
  }
});

export default LoginScreen;