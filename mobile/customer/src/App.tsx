import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import BottomTabs from '../src/navigation/BottomTabs';
import { initI18n } from '../src/i18n/i18n';

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initI18n().then(() => setReady(true));
  }, []);

  if (!ready) return null; // or splash / loader

  return (
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
  );
}
