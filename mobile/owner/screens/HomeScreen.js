// Owner Home Screen - Dashboard
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { API_URL } from '../config';

const HomeScreen = ({ navigation, route }) => {
  const [owner, setOwner] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalVehicles: 0,
    activeVehicles: 0,
    totalDrivers: 0,
    activeDrivers: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    // If owner data is passed from login
    if (route.params?.owner) {
      setOwner(route.params.owner);
      fetchOwnerData(route.params.owner._id);
    }
  }, [route.params]);

  const fetchOwnerData = async (ownerId) => {
    try {
      setLoading(true);
      
      // Fetch owner details
      const ownerResponse = await axios.get(`${API_URL}/owners/${ownerId}`);
      setOwner(ownerResponse.data);
      
      // Fetch vehicles
      const vehiclesResponse = await axios.get(`${API_URL}/owners/${ownerId}/vehicles`);
      setVehicles(vehiclesResponse.data);
      
      // Fetch drivers
      const driversResponse = await axios.get(`${API_URL}/owners/${ownerId}/drivers`);
      setDrivers(driversResponse.data);
      
      // Calculate stats
      calculateStats(vehiclesResponse.data, driversResponse.data);
      
    } catch (error) {
      console.error('Error fetching owner data:', error);
      Alert.alert('Error', 'Failed to load owner data');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (vehiclesData, driversData) => {
    const totalVehicles = vehiclesData.length;
    const activeVehicles = vehiclesData.filter(v => v.status === 'available').length;
    const totalDrivers = driversData.length;
    const activeDrivers = driversData.filter(d => d.status === 'active').length;
    const totalRevenue = vehiclesData.reduce((sum, vehicle) => sum + (vehicle.revenue || 0), 0);
    
    setStats({
      totalVehicles,
      activeVehicles,
      totalDrivers,
      activeDrivers,
      totalRevenue
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading dashboard...</Text>
      </View>
    );
  }

  if (!owner) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Owner Dashboard</Text>
        <Text style={styles.subtitle}>Please login to access your dashboard</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome, {owner.name}</Text>
        <Text style={styles.businessName}>{owner.businessName}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.totalVehicles}</Text>
          <Text style={styles.statLabel}>Total Vehicles</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.activeVehicles}</Text>
          <Text style={styles.statLabel}>Active Vehicles</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.totalDrivers}</Text>
          <Text style={styles.statLabel}>Total Drivers</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.activeDrivers}</Text>
          <Text style={styles.statLabel}>Active Drivers</Text>
        </View>
      </View>

      <View style={styles.revenueCard}>
        <Text style={styles.revenueLabel}>Total Revenue</Text>
        <Text style={styles.revenueValue}>₹{stats.totalRevenue.toFixed(2)}</Text>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('AddVehicle', { ownerId: owner._id })}>
          <Text style={styles.actionButtonText}>Add New Vehicle</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('AddDriver', { ownerId: owner._id })}>
          <Text style={styles.actionButtonText}>Add New Driver</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        
        <TouchableOpacity
          style={styles.quickActionButton}
          onPress={() => navigation.navigate('VehiclesList', { ownerId: owner._id })}>
          <Text style={styles.quickActionButtonText}>Manage Vehicles ({stats.totalVehicles})</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickActionButton}
          onPress={() => navigation.navigate('DriversList', { ownerId: owner._id })}>
          <Text style={styles.quickActionButtonText}>Manage Drivers ({stats.totalDrivers})</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickActionButton}
          onPress={() => navigation.navigate('Profile', { owner })}>
          <Text style={styles.quickActionButtonText}>My Profile</Text>
        </TouchableOpacity>
      </View>

      {vehicles.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Vehicles</Text>
          {vehicles.slice(0, 3).map((vehicle) => (
            <TouchableOpacity
              key={vehicle._id}
              style={styles.vehicleItem}
              onPress={() => navigation.navigate('VehicleDetail', {
                ownerId: owner._id,
                vehicleId: vehicle._id
              })}>
              <View style={styles.vehicleInfo}>
                <Text style={styles.vehicleModel}>{vehicle.model}</Text>
                <Text style={styles.vehicleNumber}>{vehicle.vehicleNumber}</Text>
              </View>
              <View style={styles.vehicleStatus}>
                <Text style={[styles.statusText,
                  vehicle.status === 'available' ? styles.statusAvailable :
                  vehicle.status === 'booked' ? styles.statusBooked :
                  styles.statusMaintenance]}>
                  {vehicle.status}
                </Text>
                {!vehicle.isRateValid && (
                  <Text style={styles.rateWarning}>Rate Expired!</Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
    marginBottom: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333'
  },
  businessName: {
    fontSize: 16,
    color: '#666'
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    width: '23%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007bff'
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    textAlign: 'center'
  },
  revenueCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  revenueLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5
  },
  revenueValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#28a745'
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  actionButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center'
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14
  },
  section: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333'
  },
  quickActionButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  quickActionButtonText: {
    fontSize: 16,
    color: '#333'
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
  vehicleStatus: {
    alignItems: 'flex-end'
  },
  statusText: {
    fontSize: 12,
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
  rateWarning: {
    fontSize: 10,
    color: '#dc3545',
    marginTop: 5
  }
});

export default HomeScreen;