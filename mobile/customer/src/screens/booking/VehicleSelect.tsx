import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
  SafeAreaView,
  StatusBar,
  Platform,
  Modal,
  ActivityIndicator,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

import AppIcon from '../../components/AppIcon';
import colors from '../../theme/colors';

const VehicleSelect = ({ navigation }: any) => {
  /* 🌍 i18n – MUST be at top */
  const { t } = useTranslation();

  const VEHICLES = {
    lorry: {
      name: t('lorry'),
      desc: t('lorryDesc'),
      price: t('lorryPrice'),
      info: t('lorryInfo'),
      image: require('../../assets/images/lorry.png'),
    },
    tractor: {
      name: t('tractor'),
      desc: t('tractorDesc'),
      price: t('tractorPrice'),
      info: t('tractorInfo'),
      image: require('../../assets/images/tractor.png'),
    },
  };

  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [infoVehicle, setInfoVehicle] = useState<any>(null);

  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 450,
      useNativeDriver: true,
    }).start();

    AsyncStorage.getItem('vehicle').then((value) => {
      if (value) setSelected(value);
    });
  }, []);

  const handleSelect = async (type: string) => {
    setSelected(type);
    await AsyncStorage.setItem('vehicle', type);
  };

  const handleContinue = () => {
    if (!selected) return;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigation.navigate('BookingScreen', { vehicle: selected });
    }, 800);
  };

  return (
    <SafeAreaView
      style={[
        styles.safe,
        { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
      ]}
    >
      <Animated.View style={[styles.container, { opacity: fade }]}>
        <Text style={styles.heading}>{t('chooseVehicle')}</Text>
        <Text style={styles.sub}>{t('chooseVehicleSub')}</Text>

        {Object.entries(VEHICLES).map(([key, item]) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.card,
              selected === key && styles.cardActive,
            ]}
            onPress={() => handleSelect(key)}
          >
            <Image source={item.image} style={styles.icon} />

            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.desc}>{item.desc}</Text>
              <Text style={styles.price}>{item.price}</Text>
            </View>

            <TouchableOpacity onPress={() => setInfoVehicle(item)}>
              <AppIcon
                type="ion"
                name="information-circle-outline"
                size={24}
                color={colors.primary}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={[styles.button, !selected && { backgroundColor: '#ccc' }]}
          disabled={!selected || loading}
          onPress={handleContinue}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              {t('continue')} →
            </Text>
          )}
        </TouchableOpacity>
      </Animated.View>

      {/* INFO POPUP */}
      <Modal transparent visible={!!infoVehicle} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.popup}>
            <Text style={styles.popupTitle}>{infoVehicle?.name}</Text>
            <Text style={styles.popupText}>{infoVehicle?.info}</Text>

            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setInfoVehicle(null)}
            >
              <Text style={{ color: '#fff' }}>
                {t('close')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default VehicleSelect;


const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, padding: 18 },
  heading: { fontSize: 22, fontWeight: '700', color: colors.primary },
  sub: { color: '#777', marginBottom: 16 },

  card: {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 14,
  borderRadius: 16,
  borderWidth: 1,
  borderColor: '#e6e6e6',
  marginBottom: 12,
  backgroundColor: '#fff',
  shadowColor: '#000',
  shadowOpacity: 0.05,
  shadowRadius: 6,
  elevation: 2,
  },
  cardActive: {
    borderColor: colors.primary,
    backgroundColor: '#EFFFF1',
  },
  icon: { width: 60, height: 60, marginRight: 12, resizeMode: 'contain' },

  title: { fontSize: 16, fontWeight: '700' },
  desc: { color: '#777', fontSize: 12 },
  price: { marginTop: 4, color: colors.primary, fontWeight: '700' },

  button: {
    marginTop: 18,
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '700' },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 14,
  },
  popupTitle: { fontSize: 18, fontWeight: '700', marginBottom: 6 },
  popupText: { color: '#555', marginBottom: 12 },
  closeBtn: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
});
