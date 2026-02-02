import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';

const DriverArrivingScreen = ({ route, navigation }: any) => {
  const { t } = useTranslation(); // 🌍 i18n
  const { vehicle, address, date } = route.params;

  // ⏳ Auto navigate to DriverArrived
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('DriverArrived', { vehicle, address, date });
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  // ❌ Cancel with confirmation
  const handleCancel = () => {
    Alert.alert(
      t('cancelRide'),
      t('cancelRideConfirm'),
      [
        { text: t('no'), style: 'cancel' },
        {
          text: t('yesCancel'),
          style: 'destructive',
          onPress: () => navigation.navigate('Booking'),
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      {/* MAP PLACEHOLDER */}
      <ImageBackground
        source={require('../../assets/images/map-placeholder.png')}
        style={styles.mapBg}
      />

      {/* PIN */}
      <View style={styles.pinWrapper}>
        <Icon name="place" size={44} color="#2ecc71" />
      </View>

      {/* LOADING */}
      <View style={styles.centerOverlay}>
        <ActivityIndicator size="large" color="#1DB954" />
        <Text style={styles.searchText}>
          {t('searchingDrivers')}
        </Text>
      </View>

      {/* BOTTOM CARD */}
      <View style={styles.bottomCard}>
        <Text style={styles.label}>{t('vehicle')}:</Text>
        <Text style={styles.value}>{vehicle}</Text>

        <Text style={styles.label}>{t('pickup')}:</Text>
        <Text style={styles.value}>{address}</Text>

        <Text style={styles.label}>{t('scheduled')}:</Text>
        <Text style={styles.value}>{String(date)}</Text>

        <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
          <Text style={styles.cancelText}>
            {t('cancelRide')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DriverArrivingScreen;


const styles = StyleSheet.create({
  container: { flex: 1 },

  mapBg: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  pinWrapper: {
    position: 'absolute',
    top: '35%',
    alignSelf: 'center',
  },

  centerOverlay: {
    position: 'absolute',
    top: '45%',
    alignSelf: 'center',
    alignItems: 'center',
  },

  searchText: {
    marginTop: 8,
    fontWeight: '600',
    color: '#1DB954',
    fontSize: 15,
  },

  bottomCard: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#F7F8FA',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    elevation: 10,
  },

  label: { fontWeight: '700', marginTop: 10 },
  value: { color: '#444', marginTop: 2 },

  cancelBtn: {
    marginTop: 18,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#ff4d4d',
    alignItems: 'center',
  },

  cancelText: { color: '#fff', fontWeight: '700' },
});
