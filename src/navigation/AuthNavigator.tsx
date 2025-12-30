import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/auth/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import OtpScreen from '../screens/auth/OtpScreen';


const Stack = createNativeStackNavigator();

const AuthNavigator = ({ onLoginSuccess }: any) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
       <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Otp">
        {(props) => (
          <OtpScreen {...props} onLoginSuccess={onLoginSuccess} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthNavigator;
