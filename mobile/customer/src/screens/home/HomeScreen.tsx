import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  StatusBar,
  Image,
  Easing,
  StyleSheet,
  Platform,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import * as Location from 'expo-location';

import colors from '../../theme/colors';
import stylesGlobal from '../../theme/styles';
import AppIcon from '../../components/AppIcon';

// 🔹 Optional imports if you want tab switching
 import BookingScreen from '../booking/BookingScreen';
 import ProfileScreen from '../profile/ProfileScreen';

const HomeScreen = ({ navigation }: any) => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  /* ---------------- STATE ---------------- */
  const [currentLocation, setCurrentLocation] = useState(
    t('Fetching location...')
  );
  const [activeTab, setActiveTab] = useState<'home' | 'bookings' | 'profile'>(
    'home'
  );

  /* ---------------- LOCATION ---------------- */
  const fetchCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setCurrentLocation(t('Location permission denied'));
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const address = await Location.reverseGeocodeAsync(
        location.coords
      );

      if (address.length > 0) {
        const place = address[0];
        setCurrentLocation(
          `${place.city || place.subregion || ''}, ${place.region || ''}`
        );
      }
    } catch {
      setCurrentLocation(t('Unable to fetch location'));
    }
  };

  const tabs = [
  { key: 'home', icon: 'home', label: 'Home', route: 'HomeScreen' },
  { key: 'BookingScreen', icon: 'calendar', label: 'Bookings', route: 'BookingScreen' },
  { key: 'Booking History' ,icon: 'list', label: 'Booking History', route:'BookingHistoryScreen'},
  { key: 'profile', icon: 'person', label: 'Profile', route: 'ProfileScreen' },
];

  /* ---------------- ANIMATIONS ---------------- */
  const fadeHero = useRef(new Animated.Value(0)).current;
  const slideHero = useRef(new Animated.Value(-20)).current;
  const pulseCTA = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    fetchCurrentLocation();

    Animated.parallel([
      Animated.timing(fadeHero, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideHero, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseCTA, {
          toValue: 1.04,
          duration: 900,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseCTA, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  /* ================= UI ================= */
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      {/* 🔝 HEADER */}
      <View style={[styles.toolbar, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity style={styles.locationBlock}>
          <View style={styles.locationRow}>
            <AppIcon type="ion" name="location-outline" size={16} color={colors.primary} />
            <Text style={styles.locationTitle}>{t('Home')}</Text>
            <AppIcon type="ion" name="chevron-down" size={14} color="#555" />
          </View>
          <Text style={styles.locationSubtitle} numberOfLines={1}>
            {currentLocation}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.searchPill}
          onPress={() => navigation.navigate('SearchScreen')}
        >
          <AppIcon type="ion" name="search-outline" size={18} color="#666" />
          <Text style={styles.searchText}>{t('Search services')}</Text>
        </TouchableOpacity>
      </View>

      {/* 📜 CONTENT */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <Animated.View
          style={[
            styles.heroWrap,
            { opacity: fadeHero, transform: [{ translateY: slideHero }] },
          ]}
        >
          <Image source={require('../../assets/images/banner.png')} style={styles.hero} />
        </Animated.View>

        <Animated.View style={[styles.cta, { transform: [{ scale: pulseCTA }] }]}>
          <View style={{ flex: 1 }}>
            <Text style={styles.ctaTitle}>{t('Need Cleaning')}</Text>
            <Text style={styles.ctaSub}>{t('Fast & reliable service')}</Text>

            <TouchableOpacity
              style={stylesGlobal.primaryButton}
              onPress={() => navigation.navigate('BookingScreen')}
            >
              <Text style={stylesGlobal.primaryButtonText}>
                {t('Book Service')} →
              </Text>
            </TouchableOpacity>
          </View>

          <Image
            source={require('../../assets/images/banner.png')}
            style={styles.ctaImg}
          />
        </Animated.View>

        <Text style={styles.sectionTitle}>{t('Available Vehicles')}</Text>

        <View style={styles.circleRow}>
          {[
            { title: 'Lorry', cap: 'High capacity', img: 'lorry' },
            { title: 'Tractor', cap: 'Medium capacity', img: 'tractor' },
          ].map((v) => (
            <TouchableOpacity key={v.title} style={{ alignItems: 'center' }} onPress={() => navigation.navigate('BookingScreen')}>
              <View style={styles.circleWrapper}>
                <Image
                  source={
                    v.img === 'lorry'
                      ? require('../../assets/images/lorry.png')
                      : require('../../assets/images/tractor.png')
                  }
                  style={styles.circleImg}
                />
              </View>
              <Text style={styles.circleTitle}>{t(v.title)}</Text>
              <Text style={styles.capacity}>{t(v.cap)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* 🔽 IN-PAGE FLOATING BOTTOM NAV */}
<View style={[styles.bottomNav, { bottom: insets.bottom + 12 }]}>
  {tabs.map((tab) => {
    const active = activeTab === tab.key;

    return (
      <TouchableOpacity
        key={tab.key}                     // ✅ required
        style={styles.tabItem}
        activeOpacity={0.8}
        onPress={() => {
          setActiveTab(tab.key);
          navigation.navigate(tab.route); // ✅ correct route
        }}
      >
        <AppIcon
          type="ion"
          name={active ? tab.icon : `${tab.icon}-outline`} // ✅ FIXED
          size={22}
          color={active ? colors.primary : '#9CA3AF'}      // ✅ FIXED
        />

        <Text
          style={[
            styles.tabText,
            active && styles.tabActive,
          ]}
        >
          {tab.label}
        </Text>
      </TouchableOpacity>
    );
  })}
</View>



    </SafeAreaView>
  );
};

export default HomeScreen;

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  toolbar: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingBottom: 14,
    elevation: 6,
  },

  locationBlock: { marginBottom: 12 },
  locationRow: { flexDirection: 'row', alignItems: 'center' },
  locationTitle: { fontSize: 14, fontWeight: '800', marginHorizontal: 6 },
  locationSubtitle: { fontSize: 12, color: '#666', marginLeft: 22 },

  searchPill: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 14,
    padding: 10,
    alignItems: 'center',
  },
  searchText: { marginLeft: 8, color: '#777' },

  heroWrap: { margin: 16, borderRadius: 18, overflow: 'hidden' },
  hero: { width: '100%', height: 190 },

  cta: {
    margin: 16,
    backgroundColor: '#E9FAEF',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
  },
  ctaTitle: { fontSize: 18, fontWeight: '800', color: colors.primary },
  ctaSub: { marginVertical: 6 },
  ctaImg: { width: 100, height: 80 },

  sectionTitle: { fontSize: 16, fontWeight: '800', margin: 16 },

  circleRow: { flexDirection: 'row', justifyContent: 'space-around' },
  circleWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ECF7EE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleImg: { width: 140, height: 140 },
  circleTitle: { marginTop: 10, fontWeight: '800' },
  capacity: { fontSize: 12, color: '#777' },

bottomNav: {
  position: 'absolute',
  left: 16,
  right: 16,
  height: 72,
  backgroundColor: '#fff',
  borderRadius: 20,
  flexDirection: 'row',
  elevation: 12,
  shadowColor: '#000',
  shadowOpacity: 0.15,
  shadowRadius: 10,
},

tabItem: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
},

tabText: {
  fontSize: 11,
  color: '#9CA3AF',
  marginTop: 4,
},

tabActive: {
  color: colors.primary,
  fontWeight: '700',
},

  
});
