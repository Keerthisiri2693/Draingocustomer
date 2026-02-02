import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import { AuthContext } from './AuthContext';

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const loadLogin = async () => {
      const loggedIn = await AsyncStorage.getItem('LOGGED_IN');
      setIsLoggedIn(loggedIn === 'true');
    };
    loadLogin();
  }, []);

  if (isLoggedIn === null) return null;

  return (
    <AuthContext.Provider
      value={{
        logout: async () => {
          await AsyncStorage.multiRemove([
            'LOGGED_IN',
            'TERMS_ACCEPTED',
          ]);
          setIsLoggedIn(false); // 🔥 THIS IS THE KEY
        },
      }}
    >
      <NavigationContainer>
        {isLoggedIn ? (
          <AppNavigator />
        ) : (
          <AuthNavigator
            onLoginSuccess={async () => {
              await AsyncStorage.setItem('LOGGED_IN', 'true');
              setIsLoggedIn(true);
            }}
          />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default Navigation;
