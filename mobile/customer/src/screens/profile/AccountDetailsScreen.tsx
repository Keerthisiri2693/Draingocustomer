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

const AccountDetailsScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView
      style={[
        styles.safe,
        { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
      ]}
    >
      {/* TOOLBAR */}
      <View style={styles.toolbar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.toolbarIcon}>
          <AppIcon type="ion" name="arrow-back" size={22} />
        </TouchableOpacity>

        <Text style={styles.toolbarTitle}>Account Details</Text>

        <View style={styles.toolbarIcon} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* PROFILE SUMMARY */}
        <View style={[globalStyles.card, styles.profileCard]}>
          <View style={styles.avatar}>
            <AppIcon type="ion" name="person-outline" size={36} color={colors.primary} />
          </View>

          <Text style={styles.name}>Praveen Kumar</Text>
          <Text style={styles.subText}>Active Account</Text>
        </View>

        {/* DETAILS */}
        <View style={globalStyles.card}>
          <DetailRow
            icon="person-outline"
            label="Full Name"
            value="Praveen Kumar"
          />

          <Divider />

          <DetailRow
            icon="call-outline"
            label="Phone Number"
            value="+91 70929 35675"
          />

          <Divider />

          <DetailRow
            icon="mail-outline"
            label="Email Address"
            value="praveen@email.com"
          />

          <Divider />

          <DetailRow
            icon="calendar-outline"
            label="Joined On"
            value="12 Jan 2025"
          />
        </View>

        {/* ACTION */}
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => navigation.navigate('EditprofileScreen')}
        >
          <Text style={styles.editText}>Edit Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountDetailsScreen;

/* ---------- SMALL COMPONENTS ---------- */

const DetailRow = ({ icon, label, value }: any) => (
  <View style={styles.row}>
    <View style={styles.left}>
      <View style={styles.iconCircle}>
        <AppIcon type="ion" name={icon} size={18} />
      </View>
      <Text style={styles.label}>{label}</Text>
    </View>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const Divider = () => <View style={styles.divider} />;

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F7F9FB',
  },

  toolbar: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    backgroundColor: '#F7F9FB',
  },

  toolbarTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '700',
    color: '#222',
  },

  toolbarIcon: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  container: {
    padding: 16,
  },

  profileCard: {
    alignItems: 'center',
    paddingVertical: 24,
    borderRadius: 16,
    marginBottom: 20,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ECFDF3',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },

  subText: {
    fontSize: 13,
    color: '#777',
    marginTop: 4,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },

  left: {
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

  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },

  value: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
  },

  divider: {
    height: 1,
    backgroundColor: '#EEE',
  },

  editBtn: {
    marginTop: 24,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },

  editText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
