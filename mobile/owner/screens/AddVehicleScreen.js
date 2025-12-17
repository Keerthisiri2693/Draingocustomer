// Add Vehicle Screen
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, ActivityIndicator, Picker, ScrollView } from 'react-native';
import axios from 'axios';
import { API_URL } from '../config';

const AddVehicleScreen = ({ navigation, route }) => {
  const { ownerId } = route.params;
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [type, setType] = useState('tractor');
  const [model, setModel] = useState('');
  const [tankCapacity, setTankCapacity] = useState('');
  const [rate, setRate] = useState('');
  const [area, setArea] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddVehicle = async () => {
    if (!vehicleNumber || !model || !tankCapacity || !rate || !area) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    // Validate tank capacity based on vehicle type
    const capacity = parseInt(tankCapacity);
    if (type === 'tractor' && capacity >= 5000) {
      Alert.alert('Error', 'Tractor tank capacity must be less than 5000L');
      return;
    }
    if (type === 'truck' && capacity >= 15000) {
      Alert.alert('Error', 'Truck tank capacity must be less than 15000L');
      return;
    }

    setLoading(true);
    
    try {
      const response = await axios.post(`${API_URL}/owners/${ownerId}/vehicles`, {
        vehicleNumber,
        type,
        model,
        tankCapacity: capacity,
        rate: parseFloat(rate),
        area
      });
      
      if (response.data.message === 'Vehicle added successfully') {
        Alert.alert('Success', 'Vehicle added successfully!');
        navigation.goBack();
      } else {
        Alert.alert('Error', response.data.message || 'Failed to add vehicle');
      }
    } catch (error) {
      console.error('Add vehicle error:', error);
      Alert.alert('Error', error.response?.data?.message || 'Failed to add vehicle. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add New Vehicle</Text>
      <Text style={styles.subtitle}>Enter vehicle details</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Vehicle Number *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter vehicle registration number"
          value={vehicleNumber}
          onChangeText={setVehicleNumber}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Vehicle Type *</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={type}
            onValueChange={(itemValue) => setType(itemValue)}
            style={styles.picker}>
            <Picker.Item label="Tractor (<5000L)" value="tractor" />
            <Picker.Item label="Truck (<15000L)" value="truck" />
          </Picker>
        </View>
        {type === 'tractor' && (
          <Text style={styles.capacityInfo}>Tractor: Max capacity 4999L</Text>
        )}
        {type === 'truck' && (
          <Text style={styles.capacityInfo}>Truck: Max capacity 14999L</Text>
        )}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Vehicle Model *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter vehicle model"
          value={model}
          onChangeText={setModel}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Tank Capacity (Liters) *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter tank capacity"
          value={tankCapacity}
          onChangeText={setTankCapacity}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Rate per Trip (₹) *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter rate per trip"
          value={rate}
          onChangeText={setRate}
          keyboardType="numeric"
        />
        <Text style={styles.rateInfo}>Rate will be valid for 6 months</Text>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Operating Area *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter operating area"
          value={area}
          onChangeText={setArea}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Add Vehicle" onPress={handleAddVehicle} color="#28a745" />
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
  pickerContainer: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'white',
    marginBottom: 5
  },
  picker: {
    height: 50
  },
  capacityInfo: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 5
  },
  rateInfo: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 5
  }
});

export default AddVehicleScreen;