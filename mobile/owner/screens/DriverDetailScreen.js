// Driver Detail Screen
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, ActivityIndicator, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import axios from 'axios';
import { API_URL } from '../config';

const DriverDetailScreen = ({ navigation, route }) => {
  const { ownerId, driverId } = route.params;
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editData, setEditData] = useState({});

  const fetchDriverDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/owners/${ownerId}/drivers/${driverId}`);
      setDriver(response.data);
      setEditData(response.data);
    } catch (error) {
      console.error('Fetch driver details error:', error);
      Alert.alert('Error', 'Failed to load driver details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDriverDetails();
  }, []);

  const handleEdit = () => {
    setEditModalVisible(true);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`${API_URL}/owners/${ownerId}/drivers/${driverId}`, editData);
      
      if (response.data.message === 'Driver updated successfully') {
        Alert.alert('Success', 'Driver updated successfully!');
        setEditModalVisible(false);
        fetchDriverDetails();
      } else {
        Alert.alert('Error', response.data.message || 'Failed to update driver');
      }
    } catch (error) {
      console.error('Update driver error:', error);
      Alert.alert('Error', error.response?.data?.message || 'Failed to update driver');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading driver details...</Text>
      </View>
    );
  }

  if (!driver) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Driver Not Found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>{driver.name}</Text>
          <Text style={styles.driverLicense}>License: {driver.licenseNumber}</Text>
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Text style={styles.editButtonText}>Edit Driver</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.detailCard}>
          <Text style={styles.sectionTitle}>Driver Information</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Phone Number:</Text>
            <Text style={styles.detailValue}>{driver.phoneNumber}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Address:</Text>
            <Text style={styles.detailValue}>{driver.address}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Status:</Text>
            <Text style={[styles.detailValue, styles.statusText, 
              driver.status === 'active' ? styles.statusActive : 
              driver.status === 'inactive' ? styles.statusInactive : 
              styles.statusSuspended]}>
              {driver.status}
            </Text>
          </View>
        </View>

        <View style={styles.detailCard}>
          <Text style={styles.sectionTitle}>Timestamps</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Registered:</Text>
            <Text style={styles.detailValue}>{new Date(driver.createdAt).toLocaleString()}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Last Updated:</Text>
            <Text style={styles.detailValue}>{new Date(driver.updatedAt).toLocaleString()}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back to Drivers</Text>
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
            <Text style={styles.modalTitle}>Edit Driver</Text>

            <Text style={styles.modalLabel}>Name</Text>
            <TextInput
              style={styles.modalInput}
              value={editData.name}
              onChangeText={(text) => setEditData({...editData, name: text})}
            />

            <Text style={styles.modalLabel}>Phone Number</Text>
            <TextInput
              style={styles.modalInput}
              value={editData.phoneNumber}
              onChangeText={(text) => setEditData({...editData, phoneNumber: text})}
              keyboardType="phone-pad"
            />

            <Text style={styles.modalLabel}>License Number</Text>
            <TextInput
              style={styles.modalInput}
              value={editData.licenseNumber}
              onChangeText={(text) => setEditData({...editData, licenseNumber: text})}
            />

            <Text style={styles.modalLabel}>Address</Text>
            <TextInput
              style={[styles.modalInput, styles.modalTextArea]}
              value={editData.address}
              onChangeText={(text) => setEditData({...editData, address: text})}
              multiline
            />

            <Text style={styles.modalLabel}>Status</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={editData.status}
                onValueChange={(itemValue) => setEditData({...editData, status: itemValue})}
                style={styles.picker}>
                <Picker.Item label="Active" value="active" />
                <Picker.Item label="Inactive" value="inactive" />
                <Picker.Item label="Suspended" value="suspended" />
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
  driverLicense: {
    fontSize: 16,
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
  statusActive: {
    backgroundColor: '#d4edda',
    color: '#155724'
  },
  statusInactive: {
    backgroundColor: '#f8d7da',
    color: '#721c24'
  },
  statusSuspended: {
    backgroundColor: '#fff3cd',
    color: '#856404'
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
  modalTextArea: {
    height: 80,
    textAlignVertical: 'top'
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

export default DriverDetailScreen;