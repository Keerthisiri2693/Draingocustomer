import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  SafeAreaView,
  StatusBar,
  Platform,
  Image,
  Easing,
  StyleSheet,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import colors from '../../theme/colors';
import stylesGlobal from '../../theme/styles';
import AppIcon from '../../components/AppIcon';

/* -------------------------------------------------- */
/* ✅ COMPONENT                                       */
/* -------------------------------------------------- */

const HomeScreen = ({ navigation }: any) => {
  /* ---------- 🌍 i18n (MUST BE FIRST) ---------- */
  const { t } = useTranslation();

  /* ---------- 🎞️ Animations (ALL hooks together) ---------- */
  const fadeHero = useRef(new Animated.Value(0)).current;
  const slideHero = useRef(new Animated.Value(-20)).current;
  const pulseCTA = useRef(new Animated.Value(1)).current;
  const bounceLorry = useRef(new Animated.Value(0)).current;
  const bounceTractor = useRef(new Animated.Value(0)).current;
  const fadeFooter = useRef(new Animated.Value(0)).current;

  /* ---------- 🎬 Effects ---------- */
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeHero, {
        toValue: 1,
        duration: 650,
        useNativeDriver: true,
      }),
      Animated.timing(slideHero, {
        toValue: 0,
        duration: 650,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseCTA, {
          toValue: 1.03,
          duration: 900,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseCTA, {
          toValue: 1,
          duration: 900,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.spring(bounceLorry, {
      toValue: 1,
      friction: 6,
      useNativeDriver: true,
    }).start();

    Animated.spring(bounceTractor, {
      toValue: 1,
      friction: 6,
      delay: 150,
      useNativeDriver: true,
    }).start();

    Animated.timing(fadeFooter, {
      toValue: 1,
      duration: 700,
      delay: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  /* -------------------------------------------------- */
  /* 🖼️ UI                                             */
  /* -------------------------------------------------- */

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* 📍 LOCATION */}
        <View style={local.header}>
          <View>
            <Text style={local.welcome}>{t('yourLocation')}</Text>
            <Text style={local.location}>{t('defaultLocation')}</Text>
          </View>
          <AppIcon type="ion" name="location-outline" size={26} color={colors.primary} />
        </View>

        {/* 🎯 HERO */}
        <Animated.View
          style={[
            local.heroWrap,
            { opacity: fadeHero, transform: [{ translateY: slideHero }] },
          ]}
        >
          <Image source={require('../../assets/images/banner.png')} style={local.hero} />
        </Animated.View>

        {/* 🚀 CTA */}
        <Animated.View style={[local.cta, { transform: [{ scale: pulseCTA }] }]}>
          <View style={{ flex: 1 }}>
            <Text style={local.ctaTitle}>{t('needCleaning')}</Text>
            <Text style={local.ctaSub}>{t('serviceSubtitle')}</Text>

            <TouchableOpacity
              style={stylesGlobal.primaryButton}
              onPress={() => navigation.navigate('VehicleSelect')}
            >
              <Text style={stylesGlobal.primaryButtonText}>
                {t('bookService')} →
              </Text>
            </TouchableOpacity>
          </View>

          <Image
            source={require('../../assets/images/banner.png')}
            style={local.ctaImg}
          />
        </Animated.View>

        {/* 🚛 VEHICLES */}
        <Text style={local.sectionTitle}>{t('availableVehicles')}</Text>

        <View style={local.circleRow}>
          <Animated.View style={{ transform: [{ scale: bounceLorry }] }}>
            <TouchableOpacity onPress={() => navigation.navigate('VehicleSelect')}>
              <View style={local.circleWrapper}>
                <Image source={require('../../assets/images/lorry.png')} style={local.circleImg} />
              </View>
              <Text style={local.circleTitle}>{t('lorry')}</Text>
              <Text style={local.capacity}>{t('lorryCapacity')}</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={{ transform: [{ scale: bounceTractor }] }}>
            <TouchableOpacity onPress={() => navigation.navigate('VehicleSelect')}>
              <View style={local.circleWrapper}>
                <Image source={require('../../assets/images/tractor.png')} style={local.circleImg} />
              </View>
              <Text style={local.circleTitle}>{t('tractor')}</Text>
              <Text style={local.capacity}>{t('tractorCapacity')}</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* 🏁 FOOTER */}
        <Animated.Image
          source={require('../../assets/images/godringo.png')}
          style={[local.footerBanner, { opacity: fadeFooter }]}
          resizeMode="contain"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const local = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  welcome: { fontSize: 12, color: '#777' },
  location: { fontSize: 18, fontWeight: '800', color: '#222' },

  heroWrap: { paddingHorizontal: 16, marginTop: 6 },
  hero: { width: '100%', height: 190, borderRadius: 18 },

  cta: {
    margin: 16,
    backgroundColor: '#E9FAEF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },

  ctaTitle: { fontSize: 18, fontWeight: '800', color: colors.primary },
  ctaSub: { marginVertical: 6, color: '#555' },

  ctaImg: { width: 100, height: 80, marginLeft: 10 },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 12,
  },

  circleRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginTop: 6,
  },

   circleWrapper: {
     width: 120,
  height: 120,
  borderRadius: 60,
  backgroundColor: '#ECF7EE',
  alignItems: 'center',
  justifyContent: 'center',
  elevation: 5,
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowRadius: 8,
  overflow: 'hidden',
  },

  circleImg: { width: 140, height: 140,resizeMode: 'contain',},

  circleTitle: {
    textAlign: 'center',
    marginTop: 10,
    fontWeight: '800',
    fontSize: 15,
  },

  capacity: { textAlign: 'center', fontSize: 12, color: '#777' },

  footerBanner: {
    width: '100%',
    height: 220,
    marginTop: 30,
  },
});
