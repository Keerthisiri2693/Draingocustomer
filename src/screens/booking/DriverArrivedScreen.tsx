import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import colors from '../../theme/colors';

const DriverArrivedScreen = ({ navigation, route }: any) => {
  const { t } = useTranslation(); // 🌍 i18n
  const { vehicle, address, date } = route.params || {};

  const formattedDate =
    typeof date === 'string'
      ? date
      : date
      ? new Date(date).toDateString()
      : t('notScheduled');

  const handleStartRide = () => {
    navigation.replace('RideInProgress', {
      vehicle,
      address,
      date: formattedDate,
    });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* TITLE */}
        <Text style={styles.title}>
          {t('driverArrivedTitle')} 🚚
        </Text>
        <Text style={styles.subtitle}>
          {t('driverArrivedSub')}
        </Text>

        {/* MAP */}
        <Image
          source={require('../../assets/images/map.png')}
          style={styles.map}
          resizeMode="cover"
        />

        {/* CARD */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            {t('driverDetails')}
          </Text>

          <View style={styles.row}>
            <Image
              source={require('../../assets/images/driver.png')}
              style={styles.avatar}
            />

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>Ravi Kumar</Text>
              <Text style={styles.small}>
                {t('driverRole')}
              </Text>
            </View>

            <TouchableOpacity style={styles.callBtn}>
              <Text style={styles.callText}>
                {t('call')}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          <Text style={styles.label}>{t('vehicle')}:</Text>
          <Text style={styles.value}>
            {vehicle?.toUpperCase()}
          </Text>

          <Text style={styles.label}>{t('location')}:</Text>
          <Text style={styles.value}>{address}</Text>

          <Text style={styles.label}>{t('scheduled')}:</Text>
          <Text style={styles.value}>{formattedDate}</Text>
        </View>

        {/* START */}
        <TouchableOpacity style={styles.startBtn} onPress={handleStartRide}>
          <Text style={styles.startText}>
            {t('startCleaning')} →
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DriverArrivedScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 5,
    color: colors.primary,
  },

  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 8,
  },

  map: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    alignSelf: 'center',
    marginTop: 6,
  },

  card: {
    margin: 16,
    padding: 16,
    borderRadius: 14,
    backgroundColor: '#F6F9FC',
  },

  sectionTitle: {
    fontWeight: '700',
    marginBottom: 10,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginRight: 12,
  },

  name: {
    fontSize: 16,
    fontWeight: '700',
  },

  small: {
    color: '#666',
    marginTop: 2,
  },

  divider: {
    height: 1,
    backgroundColor: '#E3E6EB',
    marginVertical: 12,
  },

  label: {
    marginTop: 8,
    fontWeight: '600',
  },

  value: {
    color: '#555',
  },

  callBtn: {
    backgroundColor: '#E9F8EE',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 10,
  },

  callText: {
    color: colors.primary,
    fontWeight: '700',
  },

  startBtn: {
    marginHorizontal: 16,
    marginTop: 5,
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 10,
  },

  startText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
});
