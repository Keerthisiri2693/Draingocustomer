import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../theme/colors';

const SplashScreen = ({ navigation }: any) => {
  const fade = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(60)).current;
  const scale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    // 🎬 VERY CLEAR SEQUENTIAL ANIMATION
    Animated.sequence([
      Animated.timing(fade, {
        toValue: 1,
        duration: 900,      // 👈 slow fade
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 900,    // 👈 slow float up
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          friction: 8,      // 👈 smooth settle
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      // 🌬 subtle breathing pulse
      Animated.loop(
        Animated.sequence([
          Animated.timing(scale, {
            toValue: 1.03,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });

    decideNext();
  }, []);

  const decideNext = async () => {
    try {
      const firstLaunch = await AsyncStorage.getItem('FIRST_LAUNCH');
      const permissionDone = await AsyncStorage.getItem('PERMISSION_DONE');
      const languageSelected = await AsyncStorage.getItem('LANGUAGE_SELECTED');
      const loggedIn = await AsyncStorage.getItem('LOGGED_IN');

      setTimeout(async () => {
        if (!firstLaunch) {
          await AsyncStorage.setItem('FIRST_LAUNCH', 'true');
          navigation.replace('Permission');
          return;
        }

        if (!permissionDone) {
          navigation.replace('Permission');
          return;
        }

        if (!languageSelected) {
          navigation.replace('Language');
          return;
        }

        if (loggedIn === 'true') {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Map' }],
          });
          return;
        }

        navigation.replace('Login');
      }, 2400); // 👈 longer splash time
    } catch {
      navigation.replace('Login');
    }
  };

  return (
    <LinearGradient
      colors={['#F5FFF9', '#E6F6ED']}
      style={styles.container}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fade,
            transform: [
              { translateY },
              { scale },
            ],
          },
        ]}
      >
        <Animated.Image
          source={require('../../assets/images/logo.png')}
          resizeMode="contain"
          style={styles.logo}
        />

        <Text style={styles.title}>Drain Go</Text>

        <Text style={styles.subtitle}>
          Professional septic & drainage services
        </Text>
      </Animated.View>
    </LinearGradient>
  );
};

export default SplashScreen;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    alignItems: 'center',
  },

  logo: {
    width: 300,
    height: 220,
    marginBottom: 32,
  },

  title: {
    fontSize: 30,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 8,
    letterSpacing: 0.4,
  },

  subtitle: {
    fontSize: 14,
    color: '#6B6B6B',
    textAlign: 'center',
    paddingHorizontal: 36,
    lineHeight: 20,
  },
});
