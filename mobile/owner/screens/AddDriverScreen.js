// Add Driver Screen
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';
import { API_URL } from '../config';

const AddDriverScreen = ({ navigation, route }) => {
  const { ownerId } = route.params;
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddDriver = async () => {
    if (!name || !phoneNumber || !licenseNumber || !address) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    setLoading(true);
    
    try {
      const response = await axios.post(`${API_URL}/owners/${ownerId}/drivers`, {
        name,
        phoneNumber,
        licenseNumber,
        address
      });
      
      if (response.data.message === 'Driver added successfully') {
        Alert.alert('Success', 'Driver added successfully!');
        navigation.goBack();
      } else {
        Alert.alert('Error', response.data.message || 'Failed to add driver');
      }
    } catch (error) {
      console.error('Add driver error:', error);
      Alert.alert('Error', error.response?.data?.message || 'Failed to add driver. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add New Driver</Text>
      <Text style={styles.subtitle}>Enter driver details</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Driver Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter driver full name"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Phone Number *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter phone number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>License Number *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter driving license number"
          value={licenseNumber}
          onChangeText={setLicenseNumber}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Address *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter full address"
          value={address}
          onChangeText={setAddress}
          multiline
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Add Driver" onPress={handleAddDriver} color="#28a745" />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333'
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20
  },
  formGroup: {
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333'
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: 'white'
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top'
  }
});

export default AddDriverScreen;