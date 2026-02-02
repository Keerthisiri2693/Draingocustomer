import React, { useEffect, useRef } from 'react';
import {
  Text,
  StyleSheet,
  Animated,
  StatusBar,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../theme/colors';

const SplashScreen = ({ navigation }: any) => {
  const bounce = useRef(new Animated.Value(0)).current;
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 🔹 Fade in
    Animated.timing(fade, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    // 🔹 Truck bounce
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounce, {
          toValue: -6,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(bounce, {
          toValue: 0,
          duration: 900,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // 🔹 Decide navigation
    const decideNext = async () => {
      const firstLaunch = await AsyncStorage.getItem('FIRST_LAUNCH');
      const loggedIn = await AsyncStorage.getItem('LOGGED_IN');

      setTimeout(async () => {
        // 🆕 FIRST TIME EVER
        if (!firstLaunch) {
          await AsyncStorage.setItem('FIRST_LAUNCH', 'true');
          navigation.replace('LanguageSelect');
          return;
        }

        // 🟢 LOGGED IN USER
        if (loggedIn === 'true') {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Tabs' }],
          });
          return;
        }

        // 🟡 NORMAL LOGIN FLOW
        navigation.replace('Login');
      }, 1400);
    };

    decideNext();
  }, []);

  return (
    <LinearGradient
      colors={['#F4FFF8', '#E8FDEE']}
      style={styles.container}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      {/* TITLE */}
      <Animated.Text style={[styles.title, { opacity: fade }]}>
        Drain Go
      </Animated.Text>

      {/* TRUCK IMAGE */}
      <Animated.Image
        source={require('../../assets/images/sewage_truck.png')}
        resizeMode="contain"
        style={[
          styles.truckImage,
          {
            opacity: fade,
            transform: [{ translateY: bounce }],
          },
        ]}
      />

      {/* TAGLINE */}
      <Animated.Text style={[styles.sub, { opacity: fade }]}>
        On-demand septic & drainage cleaning
      </Animated.Text>
    </LinearGradient>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 16,
  },
  truckImage: {
    width: 280,
    height: 160,
    marginVertical: 20,
  },
  sub: {
    color: '#6E6E6E',
    fontSize: 14,
    marginTop: 6,
  },
});
