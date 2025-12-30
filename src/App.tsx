import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import Navigation from './navigation';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <Navigation />
    </SafeAreaView>
  );
};

export default App;
