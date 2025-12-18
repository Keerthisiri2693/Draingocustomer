import React from 'react';
import { View, Text } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';

const LoginScreen = ({ navigation }: any) => {
  return (
    <View style={{ padding: 20 }}>
      <Text>Enter Mobile Number</Text>
      <Input placeholder="Mobile Number" />
      <Button title="Send OTP" onPress={() => navigation.navigate('Otp')} />
    </View>
  );
};

export default LoginScreen;
