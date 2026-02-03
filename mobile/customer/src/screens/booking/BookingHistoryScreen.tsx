import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import colors from '../../theme/colors';

interface BookingItem {
  id: string;
  vehicle: 'Lorry' | 'Tractor';
  date: string;
  amount: string;
  status: 'Completed';
}

const bookings: BookingItem[] = [
  {
    id: '1',
    vehicle: 'Lorry',
    date: '10 Dec 2025',
    amount: '₹1200',
    status: 'Completed',
  },
  {
    id: '2',
    vehicle: 'Tractor',
    date: '05 Dec 2025',
    amount: '₹800',
    status: 'Completed',
  },
  {
    id: '3',
    vehicle: 'Lorry',
    date: '28 Nov 2025',
    amount: '₹1200',
    status: 'Completed',
  },
];

const BookingHistoryScreen = () => {
  const { t } = useTranslation(); // 🌍 i18n

  const renderItem = ({ item }: { item: BookingItem }) => (
    <View style={styles.card}>
      <View>
        <Text style={styles.vehicle}>
          {item.vehicle === 'Lorry' ? t('lorry') : t('tractor')}
        </Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>

      <View style={{ alignItems: 'flex-end' }}>
        <Text style={styles.amount}>{item.amount}</Text>
        <Text style={styles.status}>{t('completed')}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.white,
        paddingTop:
          Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{t('myBookings')}</Text>

        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default BookingHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    color: '#3A2C1D',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#F9F9F9',
    marginBottom: 12,
  },
  vehicle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  date: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  amount: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primary,
  },
  status: {
    fontSize: 12,
    color: colors.primary,
    marginTop: 4,
  },
});
