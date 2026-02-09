import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  StatusBar,
  ActivityIndicator,
  Linking,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { Camera } from 'expo-camera';

import * as MediaLibrary from 'expo-media-library';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../theme/colors';

const PermissionScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkAllPermissions();
  }, []);

  // ✅ CHECK permissions safely
  const checkAllPermissions = async () => {
    try {
      const location = await Location.getForegroundPermissionsAsync();
      const camera = await Camera.requestCameraPermissionsAsync();
      const media = await MediaLibrary.getPermissionsAsync();

      if (
        location.status === 'granted' &&
        camera.status === 'granted' &&
        media.status === 'granted'
      ) {
        await AsyncStorage.setItem('PERMISSION_DONE', 'true');
        navigation.replace('Language');
      }
    } catch (error) {
      console.log('Permission check error:', error);
    }
  };

  // ✅ REQUEST permissions (correct APIs)
  const requestPermissions = async () => {
    try {
      setLoading(true);

      const location = await Location.requestForegroundPermissionsAsync();
      const camera = await Camera.requestCameraPermissionsAsync();
      const media = await MediaLibrary.requestPermissionsAsync(true); // Android 13+

      setLoading(false);

      if (
        location.status === 'granted' &&
        camera.status === 'granted' &&
        media.status === 'granted'
      ) {
        await AsyncStorage.setItem('PERMISSION_DONE', 'true');
        navigation.replace('Language');
      } else {
        Alert.alert(
          'Permissions Required',
          'Please allow all permissions to continue.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Linking.openSettings() },
          ]
        );
      }
    } catch (error) {
      setLoading(false);
      console.log('Permission error:', error);
      Alert.alert(
        'Permission Error',
        'Please enable permissions from Settings.'
      );
    }
  };

  return (
    <LinearGradient colors={['#F5FFF9', '#E6F6ED']} style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <View style={styles.content}>
        <Text style={styles.title}>App Permissions</Text>
        <Text style={styles.subtitle}>
          We need a few permissions to provide seamless service.
        </Text>

        <View style={styles.card}>
          <Ionicons name="location-outline" size={22} color={colors.primary} />
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>Location</Text>
            <Text style={styles.cardSub}>Find nearby services</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Ionicons name="camera-outline" size={22} color={colors.primary} />
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>Camera</Text>
            <Text style={styles.cardSub}>Upload photos</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Ionicons name="images-outline" size={22} color={colors.primary} />
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>Gallery</Text>
            <Text style={styles.cardSub}>Select images</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={requestPermissions}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Allow Permissions</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Linking.openSettings()}>
          <Text style={styles.secondaryText}>
            Manage permissions in Settings
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default PermissionScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    width: '100%',
    paddingHorizontal: 28,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    color: '#6B6B6B',
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 20,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
    elevation: 2,
  },

  cardText: {
    marginLeft: 14,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },

  cardSub: {
    fontSize: 13,
    color: '#777',
    marginTop: 2,
  },

  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 24,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  secondaryText: {
    textAlign: 'center',
    marginTop: 14,
    fontSize: 13,
    color: '#777',
  },
});
