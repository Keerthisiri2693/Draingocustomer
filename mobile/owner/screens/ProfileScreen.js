// Profile Screen
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const ProfileScreen = ({ navigation, route }) => {
  const { owner } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Profile</Text>
      </View>

      <View style={styles.profileCard}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Name:</Text>
          <Text style={styles.infoValue}>{owner.name}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email:</Text>
          <Text style={styles.infoValue}>{owner.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Phone:</Text>
          <Text style={styles.infoValue}>{owner.phoneNumber}</Text>
        </View>
      </View>

      <View style={styles.profileCard}>
        <Text style={styles.sectionTitle}>Business Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Business Name:</Text>
          <Text style={styles.infoValue}>{owner.businessName}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Account Status:</Text>
          <Text style={[styles.infoValue, styles.statusText, owner.isVerified ? styles.statusVerified : styles.statusUnverified]}>
            {owner.isVerified ? 'Verified' : 'Not Verified'}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Member Since:</Text>
          <Text style={styles.infoValue}>{new Date(owner.createdAt).toLocaleDateString()}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back to Dashboard</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20
  },
  header: {
    marginBottom: 20,
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333'
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333'
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: 'bold'
  },
  infoValue: {
    fontSize: 14,
    color: '#333'
  },
  statusText: {
    padding: 5,
    borderRadius: 5,
    textAlign: 'center'
  },
  statusVerified: {
    backgroundColor: '#d4edda',
    color: '#155724'
  },
  statusUnverified: {
    backgroundColor: '#f8d7da',
    color: '#721c24'
  },
  backButton: {
    backgroundColor: '#6c757d',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center'
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});

export default ProfileScreen;