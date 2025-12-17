// Vehicle Detail Screen
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, ActivityIndicator, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import axios from 'axios';
import { API_URL } from '../config';

const VehicleDetailScreen = ({ navigation, route }) => {
  const { ownerId, vehicleId } = route.params;
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editData, setEditData] = useState({});

  const fetchVehicleDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/owners/${ownerId}/vehicles/${vehicleId}`);
      setVehicle(response.data);
      setEditData(response.data);
    } catch (error) {
      console.error('Fetch vehicle details error:', error);
      Alert.alert('Error', 'Failed to load vehicle details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicleDetails();
  }, []);

  const handleEdit = () => {
    setEditModalVisible(true);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`${API_URL}/owners/${ownerId}/vehicles/${vehicleId}`, editData);
      
      if (response.data.message === 'Vehicle updated successfully') {
        Alert.alert('Success', 'Vehicle updated successfully!');
        setEditModalVisible(false);
        fetchVehicleDetails();
      } else {
        Alert.alert('Error', response.data.message || 'Failed to update vehicle');
      }
    } catch (error) {
      console.error('Update vehicle error:', error);
      Alert.alert('Error', error.response?.data?.message || 'Failed to update vehicle');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading vehicle details...</Text>
      </View>
    );
  }

  if (!vehicle) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Vehicle Not Found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>{vehicle.model}</Text>
          <Text style={styles.vehicleNumber}>{vehicle.vehicleNumber}</Text>
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Text style={styles.editButtonText}>Edit Vehicle</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.detailCard}>
          <Text style={styles.sectionTitle}>Vehicle Information</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Type:</Text>
            <Text style={styles.detailValue}>{vehicle.type}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Tank Capacity:</Text>
            <Text style={styles.detailValue}>{vehicle.tankCapacity}L</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Rate per Trip:</Text>
            <Text style={styles.detailValue}>₹{vehicle.rate}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Operating Area:</Text>
            <Text style={styles.detailValue}>{vehicle.area}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Status:</Text>
            <Text style={[styles.detailValue, styles.statusText, 
              vehicle.status === 'available' ? styles.statusAvailable : 
              vehicle.status === 'booked' ? styles.statusBooked : 
              styles.statusMaintenance]}>
              {vehicle.status}
            </Text>
          </View>
        </View>

        <View style={styles.detailCard}>
          <Text style={styles.sectionTitle}>Rate Information</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Rate Expiration:</Text>
            <Text style={styles.detailValue}>{new Date(vehicle.rateExpiration).toLocaleDateString()}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Rate Status:</Text>
            <Text style={[styles.detailValue, vehicle.isRateValid ? styles.rateValid : styles.rateExpired]}>
              {vehicle.isRateValid ? 'Valid' : 'Expired'}
            </Text>
          </View>
          {vehicle.needsRenewal && !vehicle.isRateValid && (
            <Text style={styles.renewalWarning}>⚠ Please renew your rate soon</Text>
          )}
        </View>

        <View style={styles.detailCard}>
          <Text style={styles.sectionTitle}>Financial Information</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Total Revenue:</Text>
            <Text style={styles.detailValue}>₹{vehicle.revenue || 0}</Text>
          </View>
        </View>

        {vehicle.driverId && (
          <View style={styles.detailCard}>
            <Text style={styles.sectionTitle}>Assigned Driver</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Name:</Text>
              <Text style={styles.detailValue}>{vehicle.driverId.name}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Phone:</Text>
              <Text style={styles.detailValue}>{vehicle.driverId.phoneNumber}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>License:</Text>
              <Text style={styles.detailValue}>{vehicle.driverId.licenseNumber}</Text>
            </View>
          </View>
        )}

        <View style={styles.detailCard}>
          <Text style={styles.sectionTitle}>Timestamps</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Created:</Text>
            <Text style={styles.detailValue}>{new Date(vehicle.createdAt).toLocaleString()}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Last Updated:</Text>
            <Text style={styles.detailValue}>{new Date(vehicle.updatedAt).toLocaleString()}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back to Vehicles</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Edit Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Vehicle</Text>

            <Text style={styles.modalLabel}>Vehicle Number</Text>
            <TextInput
              style={styles.modalInput}
              value={editData.vehicleNumber}
              onChangeText={(text) => setEditData({...editData, vehicleNumber: text})}
            />

            <Text style={styles.modalLabel}>Model</Text>
            <TextInput
              style={styles.modalInput}
              value={editData.model}
              onChangeText={(text) => setEditData({...editData, model: text})}
            />

            <Text style={styles.modalLabel}>Tank Capacity (L)</Text>
            <TextInput
              style={styles.modalInput}
              value={editData.tankCapacity?.toString()}
              onChangeText={(text) => setEditData({...editData, tankCapacity: parseInt(text) || 0})}
              keyboardType="numeric"
            />

            <Text style={styles.modalLabel}>Rate per Trip (₹)</Text>
            <TextInput
              style={styles.modalInput}
              value={editData.rate?.toString()}
              onChangeText={(text) => setEditData({...editData, rate: parseFloat(text) || 0})}
              keyboardType="numeric"
            />

            <Text style={styles.modalLabel}>Operating Area</Text>
            <TextInput
              style={styles.modalInput}
              value={editData.area}
              onChangeText={(text) => setEditData({...editData, area: text})}
            />

            <Text style={styles.modalLabel}>Status</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={editData.status}
                onValueChange={(itemValue) => setEditData({...editData, status: itemValue})}
                style={styles.picker}>
                <Picker.Item label="Available" value="available" />
                <Picker.Item label="Booked" value="booked" />
                <Picker.Item label="Maintenance" value="maintenance" />
              </Picker>
            </View>

            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={() => setEditModalVisible(false)} color="#6c757d" />
              <Button title="Update" onPress={handleUpdate} color="#28a745" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  scrollContainer: {
    padding: 20
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    marginTop: 10,
    color: '#666'
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
  vehicleNumber: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10
  },
  editButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  detailCard: {
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
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: 'bold'
  },
  detailValue: {
    fontSize: 14,
    color: '#333'
  },
  statusText: {
    padding: 5,
    borderRadius: 5,
    textAlign: 'center'
  },
  statusAvailable: {
    backgroundColor: '#d4edda',
    color: '#155724'
  },
  statusBooked: {
    backgroundColor: '#fff3cd',
    color: '#856404'
  },
  statusMaintenance: {
    backgroundColor: '#f8d7da',
    color: '#721c24'
  },
  rateValid: {
    color: '#28a745',
    fontWeight: 'bold'
  },
  rateExpired: {
    color: '#dc3545',
    fontWeight: 'bold'
  },
  renewalWarning: {
    color: '#ffc107',
    fontSize: 12,
    marginTop: 5,
    fontWeight: 'bold'
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
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%'
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center'
  },
  modalLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333'
  },
  modalInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: '#f8f9fa'
  },
  pickerContainer: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#f8f9fa'
  },
  picker: {
    height: 40
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  }
});

export default VehicleDetailScreen;