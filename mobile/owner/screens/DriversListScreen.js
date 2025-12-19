// Drivers List Screen
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import axios from 'axios';
import { API_URL } from '../config';

const DriversListScreen = ({ navigation, route }) => {
  const { ownerId } = route.params;
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDrivers = async () => {
    try {
      const response = await axios.get(`${API_URL}/owners/${ownerId}/drivers`);
      setDrivers(response.data);
    } catch (error) {
      console.error('Fetch drivers error:', error);
      Alert.alert('Error', 'Failed to load drivers');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchDrivers();
  };

  const renderDriverItem = ({ item }) => (
    <TouchableOpacity
      style={styles.driverItem}
      onPress={() => navigation.navigate('DriverDetail', { 
        ownerId: ownerId, 
        driverId: item._id 
      })}>
      <View style={styles.driverInfo}>
        <Text style={styles.driverName}>{item.name}</Text>
        <Text style={styles.driverLicense}>License: {item.licenseNumber}</Text>
        <Text style={styles.driverPhone}>Phone: {item.phoneNumber}</Text>
        <Text style={styles.driverDate}>Registered: {new Date(item.createdAt).toLocaleDateString()}</Text>
      </View>
      <View style={styles.driverStatus}>
        <Text style={[styles.statusText, 
          item.status === 'active' ? styles.statusActive : 
          item.status === 'inactive' ? styles.statusInactive : 
          styles.statusSuspended]}>
          {item.status}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading drivers...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={drivers}
        renderItem={renderDriverItem}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No drivers found</Text>
            <Text style={styles.emptySubtext}>Add your first driver to get started</Text>
          </View>
        }
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddDriver', { ownerId })}>
        <Text style={styles.addButtonText}>+ Add Driver</Text>
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
  driverItem: {
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
  driverInfo: {
    flex: 1
  },
  driverName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  driverLicense: {
    fontSize: 14,
    color: '#666',
    marginTop: 5
  },
  driverPhone: {
    fontSize: 14,
    color: '#666',
    marginTop: 5
  },
  driverDate: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 5
  },
  driverStatus: {
    alignItems: 'flex-end'
  },
  statusText: {
    fontSize: 12,
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
    fontWeight: 'bold'
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

export default DriversListScreen;