// Vehicles List Screen
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import axios from 'axios';
import { API_URL } from '../config';

const VehiclesListScreen = ({ navigation, route }) => {
  const { ownerId } = route.params;
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get(`${API_URL}/owners/${ownerId}/vehicles`);
      setVehicles(response.data);
    } catch (error) {
      console.error('Fetch vehicles error:', error);
      Alert.alert('Error', 'Failed to load vehicles');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchVehicles();
  };

  const renderVehicleItem = ({ item }) => (
    <TouchableOpacity
      style={styles.vehicleItem}
      onPress={() => navigation.navigate('VehicleDetail', { 
        ownerId: ownerId, 
        vehicleId: item._id 
      })}>
      <View style={styles.vehicleInfo}>
        <Text style={styles.vehicleModel}>{item.model}</Text>
        <Text style={styles.vehicleNumber}>{item.vehicleNumber}</Text>
        <Text style={styles.vehicleType}>{item.type} • {item.tankCapacity}L • ₹{item.rate}/trip</Text>
      </View>
      <View style={styles.vehicleStatus}>
        <Text style={[styles.statusText, 
          item.status === 'available' ? styles.statusAvailable : 
          item.status === 'booked' ? styles.statusBooked : 
          styles.statusMaintenance]}>
          {item.status}
        </Text>
        {!item.isRateValid && (
          <Text style={styles.rateWarning}>⚠ Rate Expired</Text>
        )}
        {item.needsRenewal && (
          <Text style={styles.renewalWarning}>⏰ Renew Soon</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading vehicles...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={vehicles}
        renderItem={renderVehicleItem}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No vehicles found</Text>
            <Text style={styles.emptySubtext}>Add your first vehicle to get started</Text>
          </View>
        }
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddVehicle', { ownerId })}>
        <Text style={styles.addButtonText}>+ Add Vehicle</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10
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
  vehicleItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  vehicleInfo: {
    flex: 1
  },
  vehicleModel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  vehicleNumber: {
    fontSize: 14,
    color: '#666',
    marginTop: 5
  },
  vehicleType: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 5
  },
  vehicleStatus: {
    alignItems: 'flex-end'
  },
  statusText: {
    fontSize: 12,
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
    fontWeight: 'bold'
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
  rateWarning: {
    fontSize: 10,
    color: '#dc3545',
    marginTop: 5,
    fontWeight: 'bold'
  },
  renewalWarning: {
    fontSize: 10,
    color: '#ffc107',
    marginTop: 5,
    fontWeight: 'bold'
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999'
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14
  }
});

export default VehiclesListScreen;