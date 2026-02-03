import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import colors from '../../theme/colors';

const BookingCompletedScreen = ({ navigation, route }: any) => {
  const { t } = useTranslation(); // 🌍 i18n
  const { vehicle, address, date } = route.params || {};

  const handleDone = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Tabs' }],
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Illustration */}
        <Image
          source={require('../../assets/images/success.png')}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.title}>
          {t('cleaningCompleted')} 🎉
        </Text>

        <Text style={styles.subtitle}>
          {t('thankYouMessage')}
        </Text>

        {/* Summary Card */}
        <View style={styles.card}>
          <Text style={styles.label}>{t('vehicle')}:</Text>
          <Text style={styles.value}>{vehicle?.toUpperCase()}</Text>

          <Text style={styles.label}>{t('location')}:</Text>
          <Text style={styles.value}>{address}</Text>

          <Text style={styles.label}>{t('date')}:</Text>
          <Text style={styles.value}>{date}</Text>
        </View>

        {/* Button */}
        <TouchableOpacity style={styles.btn} onPress={handleDone}>
          <Text style={styles.btnText}>
            {t('backToHome')} →
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BookingCompletedScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },

  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },

  image: {
    width: 220,
    height: 200,
    marginTop: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 10,
    color: colors.primary,
  },

  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginTop: 6,
    marginBottom: 14,
  },

  card: {
    width: '100%',
    padding: 16,
    borderRadius: 14,
    backgroundColor: '#F5F8FC',
    marginTop: 8,
  },

  label: {
    fontWeight: '700',
    marginTop: 10,
  },

  value: {
    color: '#555',
  },

  btn: {
    marginTop: 18,
    width: '100%',
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 10,
  },

  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
});
