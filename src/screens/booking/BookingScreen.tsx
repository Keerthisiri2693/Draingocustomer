import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTranslation } from 'react-i18next';
import colors from '../../theme/colors';

const BookingScreen = ({ route, navigation }: any) => {
  const { t } = useTranslation(); // 🌐 translation hook
  const vehicle = route?.params?.vehicle;

  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleContinue = () => {
    if (!address) return;

    navigation.navigate('DriverArriving', {
      vehicle,
      address,
      date: date.toString(),
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={
          Platform.OS === 'android'
            ? StatusBar.currentHeight ?? 0
            : 80
        }
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* TITLE */}
          <Text style={styles.heading}>
            {t('bookingDetails')}
          </Text>
          <Text style={styles.sub}>
            {t('confirmServiceDetails')}
          </Text>

          {/* VEHICLE */}
          <View style={styles.card}>
            <Text style={styles.label}>
              {t('selectedVehicle')}
            </Text>
            <Text style={styles.value}>
              {vehicle?.toUpperCase()}
            </Text>
          </View>

          {/* ADDRESS */}
          <Text style={styles.label}>
            {t('pickupAddress')}
          </Text>
          <TextInput
            placeholder={t('enterFullAddress')}
            value={address}
            onChangeText={setAddress}
            style={styles.input}
            returnKeyType="next"
          />

          {/* DATE */}
          <Text style={styles.label}>
            {t('scheduleDate')}
          </Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowPicker(true)}
          >
            <Text>{date.toDateString()}</Text>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={date}
              mode="date"
              minimumDate={new Date()}
             onChange={(_: any, selectedDate: Date | undefined) => {
                setShowPicker(false);
                if (selectedDate) setDate(selectedDate);
              }}
            />
          )}

          {/* NOTE */}
          <Text style={styles.label}>
            {t('additionalNotes')}
          </Text>
          <TextInput
            placeholder={t('addNoteOptional')}
            value={note}
            onChangeText={setNote}
            style={[styles.input, { height: 90 }]}
            multiline
          />

          {/* Spacer */}
          <View style={{ height: 100 }} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* 🔒 STICKY BUTTON */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.button,
            !address && { backgroundColor: '#ccc' },
          ]}
          disabled={!address}
          onPress={handleContinue}
        >
          <Text style={styles.buttonText}>
            {t('continue')} →
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BookingScreen;


const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },

  scrollContent: {
    padding: 18,
  },

  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },

  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primary,
  },

  sub: {
    color: '#777',
    marginBottom: 14,
  },

  card: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
    marginBottom: 12,
  },

  label: {
    marginTop: 10,
    fontWeight: '700',
    color: '#444',
  },

  value: {
    color: colors.primary,
    fontWeight: '700',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 10,
    marginTop: 6,
    marginBottom: 12,
    backgroundColor: '#fff',
  },

  button: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
});
