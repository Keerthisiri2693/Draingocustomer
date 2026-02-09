import React, { useEffect, useState } from 'react';
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
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import colors from '../../theme/colors';
import AppIcon from '../../components/AppIcon';

const BookingScreen = ({ route, navigation }: any) => {
  const { t } = useTranslation();
  const vehicle = route?.params?.vehicle;

  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [previewLocation, setPreviewLocation] = useState<any>(null);
const [selectedVehicle, setSelectedVehicle] = useState<
  "lorry" | "tractor" | null
>(vehicle ?? null);

  const formattedDate = date.toDateString();

  /* 📍 Fetch location for preview map */
  useEffect(() => {
    (async () => {
      const { status } =
        await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

const loc =
  (await Location.getLastKnownPositionAsync()) ||
  (await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  }));
      setPreviewLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    })();
  }, []);

  const handleContinue = () => {
    if (!address.trim()) return;

    navigation.navigate('BookingCompletedScreen', {
      vehicle,
      address,
      note,
      date: date.toISOString(),
    });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* 🔝 TOOLBAR */}
      <View
        style={[
          styles.toolbar,
          {
            paddingTop:
              Platform.OS === 'android'
                ? (StatusBar.currentHeight ?? 0) + 8
                : 8,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.backBtn}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <AppIcon
            type="ion"
            name="chevron-back"
            size={22}
            color={colors.primary}
          />
        </TouchableOpacity>

        <View style={styles.toolbarTextWrap}>
          <Text style={styles.toolbarTitle}>
            {t('bookingDetails')}
          </Text>
          <Text style={styles.toolbarSub}>
            {t('confirmServiceDetails')}
          </Text>
        </View>
      </View>

      {/* 🗺 MAP PREVIEW */}
      {previewLocation && (
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.mapPreviewWrap}
          onPress={() => {
            // Optional: open full map later
             navigation.navigate('Location');
          }}
        >
          <MapView
            style={StyleSheet.absoluteFill}
            pointerEvents="none"
            initialRegion={{
              latitude: previewLocation.latitude,
              longitude: previewLocation.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker coordinate={previewLocation} />
          </MapView>

          <View style={styles.mapOverlay}>
            <AppIcon type="ion" name="location" size={14} color="#fff" />
            <Text style={styles.mapOverlayText}>
              {t('Service location preview')}
            </Text>
          </View>
        </TouchableOpacity>
      )}

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
          {/* VEHICLE */}
          <View style={styles.card}>
  <Text style={styles.label}>{t("selectedVehicle")}</Text>

  <View style={styles.vehicleRow}>
    <TouchableOpacity
      style={[
        styles.vehicleChip,
        selectedVehicle === "lorry" && styles.vehicleChipActive,
      ]}
      onPress={() => setSelectedVehicle("lorry")}
    >
      <Text
        style={[
          styles.vehicleText,
          selectedVehicle === "lorry" && styles.vehicleTextActive,
        ]}
      >
        LORRY
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={[
        styles.vehicleChip,
        selectedVehicle === "tractor" && styles.vehicleChipActive,
      ]}
      onPress={() => setSelectedVehicle("tractor")}
    >
      <Text
        style={[
          styles.vehicleText,
          selectedVehicle === "tractor" && styles.vehicleTextActive,
        ]}
      >
        TRACTOR
      </Text>
    </TouchableOpacity>
  </View>
</View>


          {/* ADDRESS */}
          <Text style={styles.label}>{t('pickupAddress')}</Text>
          <TextInput
            placeholder={t('enterFullAddress')}
            value={address}
            onChangeText={setAddress}
            style={styles.input}
            multiline
          />

          {/* DATE */}
          <Text style={styles.label}>{t('scheduleDate')}</Text>
          <TouchableOpacity
            style={styles.dateInput}
            activeOpacity={0.8}
            onPress={() => setShowPicker(true)}
          >
            <Text style={styles.dateText}>{formattedDate}</Text>
            <Text style={styles.dateHint}>{t('tapToChange')}</Text>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={date}
              mode="date"
              minimumDate={new Date()}
              display={Platform.OS === 'ios' ? 'inline' : 'default'}
              onChange={(_, selectedDate) => {
                if (Platform.OS === 'android') setShowPicker(false);
                if (selectedDate) setDate(selectedDate);
              }}
            />
          )}

          {/* NOTE */}
          <Text style={styles.label}>{t('additionalNotes')}</Text>
          <TextInput
            placeholder={t('addNoteOptional')}
            value={note}
            onChangeText={setNote}
            style={[styles.input, styles.noteInput]}
            multiline
          />

          <View style={{ height: 120 }} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* 🔘 STICKY BUTTON */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.button,
            !address.trim() && styles.buttonDisabled,
          ]}
          disabled={!address.trim()}
          onPress={handleContinue}
          activeOpacity={0.85}
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

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },

  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },

  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  toolbarTextWrap: { marginLeft: 12 },

  toolbarTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
  },

  toolbarSub: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },

  mapPreviewWrap: {
    height: 160,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#E5E7EB',
    elevation: 4,
  },

  mapOverlay: {
    position: 'absolute',
    left: 12,
    bottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },

  mapOverlayText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },

  scrollContent: { padding: 18 },

  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },

  card: {
    padding: 14,
    borderRadius: 14,
    backgroundColor: '#F8F9FA',
    marginBottom: 14,
  },

  label: {
    marginTop: 12,
    fontWeight: '700',
    color: '#444',
  },

  value: {
    color: colors.primary,
    fontWeight: '700',
    marginTop: 4,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 12,
    marginTop: 6,
    marginBottom: 12,
    backgroundColor: '#fff',
  },

  noteInput: {
    height: 90,
    textAlignVertical: 'top',
  },

  dateInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 14,
    borderRadius: 12,
    marginTop: 6,
    marginBottom: 12,
    backgroundColor: '#FDFDFD',
  },

  dateText: { fontWeight: '700', color: '#222' },

  dateHint: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },

  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
  },

  buttonDisabled: { backgroundColor: '#ccc' },

  buttonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
  },
  vehicleRow: {
  flexDirection: "row",
  marginTop: 10,
  gap: 10,
},

vehicleChip: {
  paddingHorizontal: 18,
  paddingVertical: 10,
  borderRadius: 20,
  backgroundColor: "#F1F5F9",
},

vehicleChipActive: {
  backgroundColor: "#2E7D32",
},

vehicleText: {
  fontWeight: "800",
  color: "#444",
},

vehicleTextActive: {
  color: "#fff",
},

});
