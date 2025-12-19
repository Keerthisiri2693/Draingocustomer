// Customer Login Screen with OTP verification
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../components/LanguageSelector';

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleSendOtp = async () => {
    try {
      console.log('Attempting to send OTP to:', phoneNumber);
      console.log('Connecting to API at: http://localhost:5000/api/customers/send-otp');
      
      const response = await axios.post('http://10.0.2.2:5000/api/customers/send-otp', {
        phoneNumber
      });
      
      console.log('OTP response:', response.data);
      if (response.data.success) {
        setIsOtpSent(true);
        Alert.alert('Success', 'OTP sent to your phone number');
      }
    } catch (error) {
      console.error('Error sending OTP:', error.message);
      console.error('Error details:', error.response?.data || error);
      Alert.alert('Error', 'Failed to send OTP');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:5000/api/customers/verify-otp', {
        phoneNumber,
        otp
      });
      
      if (response.data.success) {
        // Navigate to home screen after successful login
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      Alert.alert('Error', 'Invalid OTP');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer Login</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        autoCapitalize="none"
      />

      {isOtpSent ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
          />
          <Button title="Verify OTP" onPress={handleVerifyOtp} />
        </>
      ) : (
        <Button title="Send OTP" onPress={handleSendOtp} />
      )}
      
      <Button
        title="Create Account"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default LoginScreen;