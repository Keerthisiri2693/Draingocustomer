import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import colors from '../../theme/colors';

const BookingScreen = ({ navigation }: any) => {
  const [seconds, setSeconds] = useState<number>(0);

  // ⏳ Auto move to Driver Arriving screen (mock backend)
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace('DriverArriving');
    }, 5000);

    return () => clearTimeout(timeout);
  }, [navigation]);

  // ⏱ Timer counter
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <SafeAreaView style={{flex: 1,backgroundColor: colors.white,paddingTop:
          Platform.OS === 'android' ? StatusBar.currentHeight : 0,}}>
    <View style={styles.container}>
      {/* Loader */}
      <ActivityIndicator size="large" color={colors.primary} />

      {/* Status */}
      <Text style={styles.title}>Searching for nearby driver...</Text>

      <Text style={styles.subText}>
        This may take a few seconds. Please wait.
      </Text>

      {/* Timer */}
      <Text style={styles.timerText}>Time elapsed: {seconds}s</Text>

      {/* Cancel */}
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '600',
    color: '#3A2C1D',
    textAlign: 'center',
  },
  subText: {
    marginTop: 8,
    fontSize: 13,
    color: '#777',
    textAlign: 'center',
  },
  timerText: {
    marginTop: 12,
    fontSize: 12,
    color: '#999',
  },
  cancelButton: {
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  cancelText: {
    color: colors.danger,
    fontSize: 14,
    fontWeight: '600',
  },
});
