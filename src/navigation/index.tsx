import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <AppNavigator />
      ) : (
        <AuthNavigator onLoginSuccess={() => setIsLoggedIn(true)} />
      )}
    </NavigationContainer>
  );
};

export default Navigation;
