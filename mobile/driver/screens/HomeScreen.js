// Driver Home Screen with Maps, Orders, and Vehicle Management
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Modal, ScrollView, Switch, ActivityIndicator, PermissionsAndroid } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';
import { CheckBox } from '@react-native-community/checkbox';

const HomeScreen = ({ route }) => {
  const { driverData } = route.params || {};
  const mapRef = useRef(null);

  // Driver state
  const [driver, setDriver] = useState(driverData || {
    name: 'Driver',
    phone: '',
    vehicleType: 'Tractor',
    vehicleModel: '',
    tankCapacity: '',
    vehicleNumber: '',
    rate: '',
    area: '',
    isActive: true,
    membershipPlan: 'basic',
    rateExpiry: new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000) // 6 months from now
  });

  // Location state
  const [currentLocation, setCurrentLocation] = useState(null);
  const [customerLocation, setCustomerLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(true);

  // Order state
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedback, setFeedback] = useState([]);

  // Rate validation
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [showRenewalAlert, setShowRenewalAlert] = useState(false);

  // Get current location
  useEffect(() => {
    const getLocation = async () => {
      try {
        const granted = await requestLocationPermission();
        if (granted) {
          Geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setCurrentLocation({ latitude, longitude });
              setLoadingLocation(false);

              // Center map on current location
              if (mapRef.current) {
                mapRef.current.animateToRegion({
                  latitude,
                  longitude,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121,
                }, 1000);
              }
            },
            (error) => {
              console.error('Geolocation error:', error);
              Alert.alert('Error', 'Failed to get your location');
              setLoadingLocation(false);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          );
        }
      } catch (error) {
        console.error('Location permission error:', error);
        setLoadingLocation(false);
      }
    };

    getLocation();

    // Set up location watcher
    const watchId = Geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
      },
      (error) => console.error('Location watch error:', error),
      { enableHighAccuracy: true, distanceFilter: 10 }
    );

    return () => Geolocation.clearWatch(watchId);
  }, []);

  // Request location permission
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location to show your position on the map.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.error('Permission request error:', err);
      return false;
    }
  };

  // Calculate days remaining for rate validation
  useEffect(() => {
    if (driver.rateExpiry) {
      const expiryDate = new Date(driver.rateExpiry);
      const today = new Date();
      const diffTime = expiryDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysRemaining(diffDays);

      if (diffDays <= 7) {
        setShowRenewalAlert(true);
      }
    }
  }, [driver.rateExpiry]);

  // Fetch orders (mock data for now)
  useEffect(() => {
    // In a real app, this would be an API call
    const mockOrders = [
      {
        id: '1',
        customerName: 'John Doe',
        customerPhone: '9876543210',
        customerAddress: '123 Main St, Bangalore',
        customerLocation: { latitude: 12.9716, longitude: 77.5946 },
        serviceType: 'Drainage Cleaning',
        status: 'pending',
        date: '2023-12-15',
        time: '10:00 AM',
        price: '₹1500'
      },
      {
        id: '2',
        customerName: 'Jane Smith',
        customerPhone: '9876543211',
        customerAddress: '456 Oak Ave, Bangalore',
        customerLocation: { latitude: 12.9726, longitude: 77.5956 },
        serviceType: 'Sewer Cleaning',
        status: 'pending',
        date: '2023-12-16',
        time: '2:00 PM',
        price: '₹2000'
      }
    ];
    setOrders(mockOrders);

    // Fetch feedback (mock data)
    const mockFeedback = [
      { id: '1', customer: 'John D.', rating: 5, comment: 'Excellent service!', date: '2023-12-10' },
      { id: '2', customer: 'Sarah K.', rating: 4, comment: 'Good work, on time.', date: '2023-12-05' },
      { id: '3', customer: 'Mike T.', rating: 5, comment: 'Very professional.', date: '2023-11-28' }
    ];
    setFeedback(mockFeedback);
  }, []);

  // Handle order actions
  const handleAcceptOrder = (order) => {
    Alert.alert(
      'Accept Order',
      `Are you sure you want to accept this order from ${order.customerName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Accept', 
          onPress: () => {
            // Update order status
            const updatedOrders = orders.map(o => 
              o.id === order.id ? { ...o, status: 'accepted' } : o
            );
            setOrders(updatedOrders);
            setCustomerLocation(order.customerLocation);

            // Center map on customer location
            if (mapRef.current && order.customerLocation) {
              mapRef.current.animateToRegion({
                ...order.customerLocation,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }, 1000);
            }

            Alert.alert('Success', 'Order accepted! Customer location pinned on map.');
          }
        }
      ]
    );
  };

  const handleRejectOrder = (order) => {
    Alert.alert(
      'Reject Order',
      `Are you sure you want to reject this order from ${order.customerName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reject', 
          style: 'destructive',
          onPress: () => {
            const updatedOrders = orders.map(o => 
              o.id === order.id ? { ...o, status: 'rejected' } : o
            );
            setOrders(updatedOrders);
            Alert.alert('Info', 'Order rejected.');
          }
        }
      ]
    );
  };

  const handleCompleteOrder = (order) => {
    Alert.alert(
      'Complete Order',
      `Mark this order as completed for ${order.customerName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Complete', 
          onPress: () => {
            const updatedOrders = orders.map(o => 
              o.id === order.id ? { ...o, status: 'completed' } : o
            );
            setOrders(updatedOrders);
            setCustomerLocation(null);
            Alert.alert('Success', 'Order completed successfully!');
          }
        }
      ]
    );
  };

  const handleRenewRate = () => {
    // Set new expiry date 6 months from now
    const newExpiry = new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000);
    setDriver({ ...driver, rateExpiry: newExpiry });
    setShowRenewalAlert(false);
    Alert.alert('Success', 'Rate validation renewed for 6 months!');
  };

  const toggleActiveStatus = () => {
    const newStatus = !driver.isActive;
    setDriver({ ...driver, isActive: newStatus });
    Alert.alert('Info', `You are now ${newStatus ? 'ACTIVE' : 'INACTIVE'} for receiving orders.`);
  };

  const openOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const closeOrderModal = () => {
    setShowOrderModal(false);
    setSelectedOrder(null);
  };

  const openVehicleDetails = () => {
    setShowVehicleModal(true);
  };

  const closeVehicleModal = () => {
    setShowVehicleModal(false);
  };

  const openFeedback = () => {
    setShowFeedbackModal(true);
  };

  const closeFeedbackModal = () => {
    setShowFeedbackModal(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Driver Dashboard</Text>
        <View style={styles.headerInfo}>
          <Text style={styles.driverName}>{driver.name}</Text>
          <Text style={styles.driverStatus}>{driver.isActive ? 'ACTIVE' : 'INACTIVE'}</Text>
        </View>
      </View>

      {/* Active Status Toggle */}
      <View style={styles.toggleContainer}>
        <Text style={styles.toggleLabel}>Available for orders:</Text>
        <Switch
          value={driver.isActive}
          onValueChange={toggleActiveStatus}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={driver.isActive ? '#f5dd4b' : '#f4f3f4'}
        />
      </View>

      {/* Rate Validation Alert */}
      {showRenewalAlert && (
        <View style={styles.alertContainer}>
          <Text style={styles.alertText}>⚠️ Your rate validation expires in {daysRemaining} days!</Text>
          <TouchableOpacity style={styles.renewButton} onPress={handleRenewRate}>
            <Text style={styles.renewButtonText}>Renew Now</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Map View */}
      <View style={styles.mapContainer}>
        {loadingLocation ? (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#3498db" />
            <Text style={styles.loadingText}>Getting your location...</Text>
          </View>
        ) : currentLocation ? (
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
            showsUserLocation={true}
            followsUserLocation={true}
          >
            {/* Driver's current location */}
            <Marker
              coordinate={currentLocation}
              title="Your Location"
              pinColor="blue"
            />

            {/* Customer location if order is accepted */}
            {customerLocation && (
              <Marker
                coordinate={customerLocation}
                title="Customer Location"
                pinColor="red"
                description={selectedOrder ? `${selectedOrder.customerName} - ${selectedOrder.serviceType}` : 'Customer'}
              />
            )}
          </MapView>
        ) : (
          <Text style={styles.errorText}>Unable to get your location. Please enable location services.</Text>
        )}
      </View>

      {/* Orders Section */}
      <View style={styles.ordersSection}>
        <Text style={styles.sectionTitle}>Pending Orders</Text>

        {orders.filter(order => order.status === 'pending').length > 0 ? (
          <ScrollView horizontal style={styles.ordersScroll}>
            {orders.filter(order => order.status === 'pending').map((order) => (
              <View key={order.id} style={styles.orderCard}>
                <Text style={styles.orderCustomer}>{order.customerName}</Text>
                <Text style={styles.orderService}>{order.serviceType}</Text>
                <Text style={styles.orderDetails}>{order.date} • {order.time}</Text>
                <Text style={styles.orderPrice}>{order.price}</Text>
                <View style={styles.orderButtons}>
                  <TouchableOpacity 
                    style={[styles.orderButton, styles.acceptButton]}
                    onPress={() => handleAcceptOrder(order)}
                  >
                    <Text style={styles.orderButtonText}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.orderButton, styles.rejectButton]}
                    onPress={() => handleRejectOrder(order)}
                  >
                    <Text style={styles.orderButtonText}>Reject</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.noOrders}>No pending orders</Text>
        )}

        {/* Active Orders */}
        <Text style={styles.sectionTitle}>Active Orders</Text>

        {orders.filter(order => order.status === 'accepted').length > 0 ? (
          <ScrollView horizontal style={styles.ordersScroll}>
            {orders.filter(order => order.status === 'accepted').map((order) => (
              <View key={order.id} style={[styles.orderCard, styles.activeOrderCard]}>
                <Text style={styles.orderCustomer}>{order.customerName}</Text>
                <Text style={styles.orderService}>{order.serviceType}</Text>
                <Text style={styles.orderDetails}>{order.date} • {order.time}</Text>
                <Text style={styles.orderPrice}>{order.price}</Text>
                <View style={styles.orderButtons}>
                  <TouchableOpacity 
                    style={[styles.orderButton, styles.completeButton]}
                    onPress={() => handleCompleteOrder(order)}
                  >
                    <Text style={styles.orderButtonText}>Complete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.orderButton, styles.detailsButton]}
                    onPress={() => openOrderDetails(order)}
                  >
                    <Text style={styles.orderButtonText}>Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.noOrders}>No active orders</Text>
        )}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton} onPress={openVehicleDetails}>
          <Text style={styles.actionButtonText}>🚛 Vehicle</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={openFeedback}>
          <Text style={styles.actionButtonText}>⭐ Feedback</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>📊 Stats</Text>
        </TouchableOpacity>
      </View>

      {/* Order Details Modal */}
      <Modal
        visible={showOrderModal}
        animationType="slide"
        transparent={true}
        onRequestClose={closeOrderModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedOrder && (
              <>
                <Text style={styles.modalTitle}>Order Details</Text>
                <View style={styles.modalInfo}>
                  <Text style={styles.modalLabel}>Customer:</Text>
                  <Text style={styles.modalValue}>{selectedOrder.customerName}</Text>
                </View>
                <View style={styles.modalInfo}>
                  <Text style={styles.modalLabel}>Phone:</Text>
                  <Text style={styles.modalValue}>{selectedOrder.customerPhone}</Text>
                </View>
                <View style={styles.modalInfo}>
                  <Text style={styles.modalLabel}>Address:</Text>
                  <Text style={styles.modalValue}>{selectedOrder.customerAddress}</Text>
                </View>
                <View style={styles.modalInfo}>
                  <Text style={styles.modalLabel}>Service:</Text>
                  <Text style={styles.modalValue}>{selectedOrder.serviceType}</Text>
                </View>
                <View style={styles.modalInfo}>
                  <Text style={styles.modalLabel}>Date/Time:</Text>
                  <Text style={styles.modalValue}>{selectedOrder.date} • {selectedOrder.time}</Text>
                </View>
                <View style={styles.modalInfo}>
                  <Text style={styles.modalLabel}>Price:</Text>
                  <Text style={styles.modalValue}>{selectedOrder.price}</Text>
                </View>

                <TouchableOpacity style={styles.closeButton} onPress={closeOrderModal}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Vehicle Details Modal */}
      <Modal
        visible={showVehicleModal}
        animationType="slide"
        transparent={true}
        onRequestClose={closeVehicleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Vehicle Details</Text>

            <View style={styles.modalInfo}>
              <Text style={styles.modalLabel}>Type:</Text>
              <Text style={styles.modalValue}>{driver.vehicleType}</Text>
            </View>

            <View style={styles.modalInfo}>
              <Text style={styles.modalLabel}>Model:</Text>
              <Text style={styles.modalValue}>{driver.vehicleModel}</Text>
            </View>

            <View style={styles.modalInfo}>
              <Text style={styles.modalLabel}>Tank Capacity:</Text>
              <Text style={styles.modalValue}>{driver.tankCapacity}L</Text>
            </View>

            <View style={styles.modalInfo}>
              <Text style={styles.modalLabel}>Vehicle Number:</Text>
              <Text style={styles.modalValue}>{driver.vehicleNumber}</Text>
            </View>

            <View style={styles.modalInfo}>
              <Text style={styles.modalLabel}>Rate:</Text>
              <Text style={styles.modalValue}>₹{driver.rate} per trip</Text>
            </View>

            <View style={styles.modalInfo}>
              <Text style={styles.modalLabel}>Service Area:</Text>
              <Text style={styles.modalValue}>{driver.area}</Text>
            </View>

            <View style={styles.modalInfo}>
              <Text style={styles.modalLabel}>Membership:</Text>
              <Text style={styles.modalValue}>{driver.membershipPlan}</Text>
            </View>

            <View style={styles.modalInfo}>
              <Text style={styles.modalLabel}>Rate Expiry:</Text>
              <Text style={styles.modalValue}>{new Date(driver.rateExpiry).toLocaleDateString()}</Text>
            </View>

            <View style={styles.modalInfo}>
              <Text style={styles.modalLabel}>Estimated Revenue:</Text>
              <Text style={styles.modalValue}>₹{Math.floor(Math.random() * 50000) + 10000}/month</Text>
            </View>

            <TouchableOpacity style={styles.closeButton} onPress={closeVehicleModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Feedback Modal */}
      <Modal
        visible={showFeedbackModal}
        animationType="slide"
        transparent={true}
        onRequestClose={closeFeedbackModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Customer Feedback</Text>

            {feedback.length > 0 ? (
              <ScrollView style={styles.feedbackScroll}>
                {feedback.map((item) => (
                  <View key={item.id} style={styles.feedbackItem}>
                    <View style={styles.feedbackHeader}>
                      <Text style={styles.feedbackCustomer}>{item.customer}</Text>
                      <Text style={styles.feedbackDate}>{item.date}</Text>
                    </View>
                    <View style={styles.feedbackRating}>
                      {'★'.repeat(item.rating).split('').map((star, i) => (
                        <Text key={i} style={styles.star}>{star}</Text>
                      ))}
                    </View>
                    <Text style={styles.feedbackComment}>{item.comment}</Text>
                  </View>
                ))}
              </ScrollView>
            ) : (
              <Text style={styles.noFeedback}>No feedback yet</Text>
            )}

            <TouchableOpacity style={styles.closeButton} onPress={closeFeedbackModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
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
  header: {
    backgroundColor: '#3498db',
    padding: 15,
    paddingTop: 40
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  headerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10
  },
  driverName: {
    color: '#fff',
    fontSize: 16
  },
  driverStatus: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold'
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1'
  },
  toggleLabel: {
    fontSize: 16,
    color: '#2c3e50'
  },
  alertContainer: {
    backgroundColor: '#f8d7da',
    padding: 12,
    margin: 10,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  alertText: {
    color: '#721c24',
    fontSize: 14,
    flex: 1
  },
  renewButton: {
    backgroundColor: '#28a745',
    padding: 8,
    borderRadius: 4,
    marginLeft: 10
  },
  renewButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold'
  },
  mapContainer: {
    height: 250,
    margin: 10,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative'
  },
  map: {
    flex: 1
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)'
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: '#3498db'
  },
  errorText: {
    textAlign: 'center',
    padding: 20,
    color: '#e74c3c',
    fontSize: 16
  },
  ordersSection: {
    flex: 1,
    padding: 10
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50'
  },
  ordersScroll: {
    marginBottom: 15
  },
  orderCard: {
    width: 250,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  activeOrderCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#2ecc71'
  },
  orderCustomer: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2c3e50'
  },
  orderService: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8
  },
  orderDetails: {
    fontSize: 12,
    color: '#95a5a6',
    marginBottom: 8
  },
  orderPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#27ae60',
    marginBottom: 10
  },
  orderButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  orderButton: {
    padding: 8,
    borderRadius: 4,
    flex: 1,
    marginHorizontal: 2
  },
  acceptButton: {
    backgroundColor: '#2ecc71'
  },
  rejectButton: {
    backgroundColor: '#e74c3c'
  },
  completeButton: {
    backgroundColor: '#3498db'
  },
  detailsButton: {
    backgroundColor: '#f39c12'
  },
  orderButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold'
  },
  noOrders: {
    textAlign: 'center',
    padding: 15,
    color: '#7f8c8d',
    fontSize: 14
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1'
  },
  actionButton: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 20,
    width: 80,
    alignItems: 'center'
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxHeight: '80%'
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#2c3e50'
  },
  modalInfo: {
    flexDirection: 'row',
    marginBottom: 10
  },
  modalLabel: {
    fontWeight: 'bold',
    color: '#7f8c8d',
    width: 120
  },
  modalValue: {
    flex: 1,
    color: '#2c3e50'
  },
  closeButton: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 20
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  feedbackScroll: {
    maxHeight: 300
  },
  feedbackItem: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 6,
    marginBottom: 10
  },
  feedbackHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  feedbackCustomer: {
    fontWeight: 'bold',
    color: '#2c3e50'
  },
  feedbackDate: {
    color: '#7f8c8d',
    fontSize: 12
  },
  feedbackRating: {
    flexDirection: 'row',
    marginBottom: 5
  },
  star: {
    color: '#f1c40f',
    fontSize: 16
  },
  feedbackComment: {
    color: '#2c3e50',
    fontSize: 14
  },
  noFeedback: {
    textAlign: 'center',
    padding: 20,
    color: '#7f8c8d',
    fontSize: 14
  }
});

export default HomeScreen;