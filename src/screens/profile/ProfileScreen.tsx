import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import colors from '../../theme/colors';
import styles from '../../theme/styles';
import AppIcon from '../../components/AppIcon';

const ProfileScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={{flex: 1,backgroundColor: colors.white,paddingTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : 0,}}>
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* PROFILE HEADER */}
        <View style={[styles.card, local.profileCard]}>
          <View style={local.avatar}>
            <AppIcon
              type="ion"
              name="person-outline"
              size={36}
              color={colors.primary}
            />
          </View>

          <Text style={local.name}>Praveen Kumar</Text>
          <Text style={local.phone}>+91 70929 35675</Text>

          <TouchableOpacity style={local.editBtn}>
            <Text style={local.editText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* SETTINGS */}
        <Text style={local.sectionTitle}>Settings</Text>

        <View style={styles.card}>
          <ProfileItem
            icon="person-outline"
            label="Account Details"
          />
          <Divider />
          <ProfileItem
            icon="location-outline"
            label="Saved Addresses"
          />
          <Divider />
          <ProfileItem
            icon="help-circle-outline"
            label="Help & Support"
          />
          <Divider />
          <ProfileItem
            icon="information-circle-outline"
            label="About Drain Go"
          />
        </View>

        {/* LOGOUT */}
        <TouchableOpacity
          style={[styles.card, local.logoutCard]}
          onPress={() => navigation.replace('Auth')}
        >
          <View style={local.logoutRow}>
            <AppIcon
              type="ion"
              name="log-out-outline"
              color={colors.danger}
            />
            <Text style={local.logoutText}>Logout</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

/* ---------- SMALL COMPONENTS ---------- */

const ProfileItem = ({ icon, label }: any) => (
  <TouchableOpacity style={local.itemRow}>
    <View style={local.itemLeft}>
      <AppIcon type="ion" name={icon} size={22} />
      <Text style={local.itemText}>{label}</Text>
    </View>
    <AppIcon type="ion" name="chevron-forward" color="#999" />
  </TouchableOpacity>
);

const Divider = () => <View style={local.divider} />;

/* ---------- STYLES ---------- */

const local = StyleSheet.create({
  profileCard: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F1F5F4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  phone: {
    fontSize: 13,
    color: '#777',
    marginTop: 2,
  },
  editBtn: {
    marginTop: 12,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  editText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 13,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
    color: '#3A2C1D',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  itemText: {
    fontSize: 14,
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEE',
  },
  logoutCard: {
    marginTop: 20,
  },
  logoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.danger,
  },
});
