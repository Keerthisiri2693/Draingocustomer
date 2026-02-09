import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import colors from '../../theme/colors';
import globalStyles from '../../theme/styles';
import AppIcon from '../../components/AppIcon';

const AboutUsScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AppIcon type="ion" name="arrow-back" size={22} color={colors.primary}/>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>About Us</Text>

        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* APP INFO */}
        <View style={[globalStyles.card, styles.appCard]}>
          <View style={styles.appIcon}>
            <AppIcon
              type="ion"
              name="information-circle-outline"
              size={36}
              color={colors.primary}
            />
          </View>

          <Text style={styles.appName}>Your App Name</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>

        {/* ABOUT CONTENT */}
        <View style={globalStyles.card}>
          <Text style={styles.sectionTitle}>Who We Are</Text>
          <Text style={styles.text}>
            We are committed to providing a simple, reliable, and user-friendly
            experience. Our goal is to make everyday tasks easier by combining
            clean design with powerful technology.
          </Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>What We Do</Text>
          <Text style={styles.text}>
            Our application helps users manage their services efficiently with
            real-time updates, secure data handling, and seamless performance
            across devices.
          </Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Our Mission</Text>
          <Text style={styles.text}>
            To build trustworthy digital solutions that improve everyday life
            through simplicity, speed, and reliability.
          </Text>
        </View>

        {/* FOOTER LINKS */}
        <View style={globalStyles.card}>
          <InfoRow
            icon="shield-checkmark-outline"
            label="Privacy Policy"
            onPress={() => navigation.navigate('PrivacyPolicyScreen')}
          />

          <Divider />

         <InfoRow
            icon="mail-outline"
            label="Contact Support"
            onPress={() => navigation.navigate('ContactSupport')}
          />

          
        
        </View>

        {/* COPYRIGHT */}
        <Text style={styles.footerText}>
          © {new Date().getFullYear()} Your Company Name
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutUsScreen;

/* ---------- SMALL COMPONENTS ---------- */

const InfoRow = ({ icon, label, onPress }: any) => (
  <TouchableOpacity
    style={styles.infoRow}
    activeOpacity={0.7}
    onPress={onPress}
  >
    <View style={styles.infoLeft}>
      <View style={styles.iconCircle}>
        <AppIcon type="ion" name={icon} size={18} />
      </View>
      <Text style={styles.infoText}>{label}</Text>
    </View>

    <AppIcon type="ion" name="chevron-forward" size={18} color="#AAA" />
  </TouchableOpacity>
);

const Divider = () => <View style={styles.divider} />;

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F7F9FB',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },

  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '700',
    color: colors.primary,
  },

  container: {
    padding: 16,
  },

  appCard: {
    alignItems: 'center',
    paddingVertical: 24,
    borderRadius: 16,
    marginBottom: 20,
  },

  appIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ECFDF3',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  appName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },

  version: {
    fontSize: 13,
    color: '#777',
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
    marginBottom: 6,
  },

  text: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },

  infoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  infoText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },

  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 12,
  },

  footerText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#999',
    marginTop: 20,
    marginBottom: 10,
  },
});
