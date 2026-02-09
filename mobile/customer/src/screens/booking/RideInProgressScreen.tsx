import React, { useEffect } from 'react';
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

const RideInProgressScreen = ({ navigation, route }: any) => {
  const { t } = useTranslation(); // 🌍 i18n (TOP LEVEL)
  const { vehicle, address, date } = route.params || {};

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('BookingCompletedScreen', {
        vehicle,
        address,
        date,
      });
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <Text style={styles.title}>
          {t('cleaningInProgress')} 🧹
        </Text>

        <Text style={styles.subtitle}>
          {t('cleaningStarted')}
        </Text>

        {/* MAP */}
        <Image
          source={require('../../assets/images/map.png')}
          style={styles.map}
          resizeMode="cover"
        />

        {/* STATUS CARD */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            {t('jobStatus')}
          </Text>

          <View style={styles.timeline}>
            <View style={styles.dotActive} />
            <Text style={styles.timelineText}>
              {t('driverArrived')}
            </Text>
          </View>

          <View style={styles.timeline}>
            <View style={styles.dotActive} />
            <Text style={styles.timelineText}>
              {t('equipmentSetup')}
            </Text>
          </View>

          <View style={styles.timeline}>
            <View style={styles.dotPending} />
            <Text style={styles.timelinePending}>
              {t('cleaningInProgressStatus')}
            </Text>
          </View>
        </View>

        {/* ACTIONS */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionText}>
              {t('callDriver')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionText}>
              {t('support')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* CANCEL */}
        <TouchableOpacity style={styles.cancelBtn}>
          <Text style={styles.cancelText}>
            {t('cancelBooking')}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RideInProgressScreen;


const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },

  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 8,
  },

  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 10,
  },

  map: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    alignSelf: 'center',
  },

  card: {
    margin: 16,
    padding: 16,
    borderRadius: 14,
    backgroundColor: '#F6F9FC',
  },

  sectionTitle: { fontWeight: '700', marginBottom: 10 },

  timeline: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },

  dotActive: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
    marginRight: 10,
  },

  dotPending: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ccc',
    marginRight: 10,
  },

  timelineText: { color: '#333', fontWeight: '600' },

  timelinePending: { color: '#777' },

  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 4,
  },

  actionBtn: {
    backgroundColor: '#EAF7EF',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },

  actionText: {
    color: colors.primary,
    fontWeight: '700',
  },

  cancelBtn: {
    marginTop: 16,
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#FFE8E6',
  },

  cancelText: {
    textAlign: 'center',
    color: '#D34B4B',
    fontWeight: '700',
  },
});
