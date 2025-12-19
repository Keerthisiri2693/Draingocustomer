// Customer Home Screen with Google Maps and all features
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Button, Alert, TouchableOpacity, ScrollView } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import RazorpayCheckout from 'react-native-razorpay';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../components/LanguageSelector';

const HomeScreen = ({ navigation }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyVehicles, setNearbyVehicles] = useState([]);
  const [bookingInProgress, setBookingInProgress] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackComment, setFeedbackComment] = useState('');
  
  const mapRef = useRef(null);

  // Get user's current location
  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        const granted = await Geolocation.requestAuthorization('whenInUse');
        if (granted) {
          Geolocation.getCurrentPosition(
            position => {
              const { latitude, longitude } = position.coords;
              setUserLocation({ latitude, longitude });
              
              // Fetch nearby vehicles
              fetchNearbyVehicles(latitude, longitude);
              
              // Fetch booking history
              fetchBookingHistory();
            },
            error => console.error('Error getting location:', error),
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          );
        }
      } catch (error) {
        console.error('Location permission error:', error);
      }
    };
    
    getCurrentLocation();
  }, []);

  // Fetch nearby vehicles from API
  const fetchNearbyVehicles = async (latitude, longitude) => {
    try {
      const response = await axios.get('http://localhost:5000/api/vehicles/nearby', {
        params: { latitude, longitude, radius: 5 }
      });
      
      if (response.data.success) {
        setNearbyVehicles(response.data.vehicles);
      }
    } catch (error) {
      console.error('Error fetching nearby vehicles:', error);
    }
  };

  // Fetch booking history
  const fetchBookingHistory = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/bookings/history');
      
      if (response.data.success) {
        setBookingHistory(response.data.bookings);
      }
    } catch (error) {
      console.error('Error fetching booking history:', error);
    }
  };

  // Handle booking
  const handleBookNow = async () => {
    if (!userLocation) {
      Alert.alert('Error', 'Unable to get your location');
      return;
    }
    
    try {
      const response = await axios.post('http://localhost:5000/api/bookings/create', {
        customerId: 'CURRENT_USER_ID', // Replace with actual user ID
        pickupLocation: userLocation,
        vehicleType: 'drainage'
      });
      
      if (response.data.success) {
        setBookingInProgress(true);
        setBookingDetails(response.data.booking);
        
        // Generate OTP for booking confirmation
        const otpResponse = await axios.post('http://localhost:5000/api/bookings/generate-otp', {
          bookingId: response.data.booking._id
        });
        
        if (otpResponse.data.success) {
          Alert.alert('Booking Confirmation', `Your booking OTP is: ${otpResponse.data.otp}`);
        }
      }
    } catch (error) {
      console.error('Booking error:', error);
      Alert.alert(t('error'), t('failedToCreateBooking'));
    }
  };

  // Handle payment
  const handlePayment = () => {
    if (!bookingDetails) return;
    
    const options = {
      description: 'Drainage Service Payment',
      currency: 'INR',
      key: 'YOUR_RAZORPAY_KEY', // Replace with actual Razorpay key
      amount: bookingDetails.amount * 100, // Convert to paise
      name: 'Drain Cleaning Service',
      prefill: {
        email: 'customer@example.com',
        contact: '9999999999',
        name: 'Customer Name'
      },
      theme: { color: '#53a20e' }
    };
    
    RazorpayCheckout.open(options)
      .then(data => {
        // Payment success
        Alert.alert('Success', 'Payment successful!');
        handlePaymentSuccess(data.razorpay_payment_id);
      })
      .catch(error => {
        // Payment failure
        Alert.alert('Error', 'Payment failed');
        console.error('Payment error:', error);
      });
  };

  // Handle payment success
  const handlePaymentSuccess = async (paymentId) => {
    try {
      const response = await axios.post('http://localhost:5000/api/bookings/payment-success', {
        bookingId: bookingDetails._id,
        paymentId,
        amount: bookingDetails.amount
      });
      
      if (response.data.success) {
        setBookingDetails(prev => ({ ...prev, paymentStatus: 'completed' }));
      }
    } catch (error) {
      console.error('Payment verification error:', error);
    }
  };

  // Handle feedback submission
  const handleFeedbackSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/feedback', {
        bookingId: bookingDetails._id,
        rating: feedbackRating,
        comment: feedbackComment
      });
      
      if (response.data.success) {
        Alert.alert('Thank You', 'Feedback submitted successfully!');
        setShowFeedback(false);
        setFeedbackRating(0);
        setFeedbackComment('');
      }
    } catch (error) {
      console.error('Feedback submission error:', error);
      Alert.alert('Error', 'Failed to submit feedback');
    }
  };

  // Simulate live vehicle tracking
  const simulateLiveTracking = () => {
    if (!bookingDetails || !userLocation) return;
    
    // This would be replaced with actual WebSocket or polling implementation
    const interval = setInterval(() => {
      // Update vehicle position (simulated)
      const newVehicles = nearbyVehicles.map(vehicle => {
        if (vehicle._id === bookingDetails.vehicleId) {
          // Move vehicle closer to user location
          const latDiff = userLocation.latitude - vehicle.latitude;
          const lngDiff = userLocation.longitude - vehicle.longitude;
          
          return {
            ...vehicle,
            latitude: vehicle.latitude + latDiff * 0.1,
            longitude: vehicle.longitude + lngDiff * 0.1
          };
        }
        return vehicle;
      });
      
      setNearbyVehicles(newVehicles);
      
      // Check if vehicle has reached destination
      const vehicle = newVehicles.find(v => v._id === bookingDetails.vehicleId);
      if (vehicle) {
        const distance = Math.sqrt(
          Math.pow(userLocation.latitude - vehicle.latitude, 2) +
          Math.pow(userLocation.longitude - vehicle.longitude, 2)
        );
        
        if (distance < 0.0001) { // Close enough
          clearInterval(interval);
          setBookingDetails(prev => ({ ...prev, status: 'completed' }));
          setShowFeedback(true);
        }
      }
    }, 3000);
    
    return () => clearInterval(interval);
  };

  // Start live tracking when booking is confirmed
  useEffect(() => {
    if (bookingInProgress && bookingDetails?.status === 'confirmed') {
      const cleanup = simulateLiveTracking();
      return cleanup;
    }
  }, [bookingInProgress, bookingDetails]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.languageButton}
        onPress={() => setShowLanguageSelector(true)}
      >
        <Text style={styles.languageButtonText}>{t('language')}</Text>
      </TouchableOpacity>
      
      {userLocation ? (
        <>
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={
              {
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }
            }
            showsUserLocation={true}
            followsUserLocation={true}
          >
            {/* User location marker */}
            <Marker
              coordinate={userLocation}
              title={t('yourLocation')}
              pinColor="blue"
            />
            
            {/* Nearby vehicles markers */}
            {nearbyVehicles.map(vehicle => (
              <Marker
                key={vehicle._id}
                coordinate={
                  {
                    latitude: vehicle.latitude,
                    longitude: vehicle.longitude
                  }
                }
                title={`${t('vehicleInfo')} ${vehicle.vehicleNumber}`}
                description={`${t('type')}: ${vehicle.type}, ${t('status')}: ${vehicle.status}`}
                pinColor={vehicle._id === bookingDetails?.vehicleId ? 'green' : 'red'}
              />
            ))}
          </MapView>
          
          <View style={styles.bottomPanel}>
            {!bookingInProgress ? (
              <>
                <Text style={styles.availableVehicles}>{t('availableVehicles')}{nearbyVehicles.length}</Text>
                <Button title={t('bookNow')} onPress={handleBookNow} color="#53a20e" />
              </>
            ) : (
              <>
                {bookingDetails?.status === 'pending' && (
                  <Text style={styles.bookingStatus}>{t('waitingForDriver')}</Text>
                )}
                
                {bookingDetails?.status === 'confirmed' && (
                  <>
                    <Text style={styles.bookingStatus}>{t('driverOnWay')}</Text>
                    <Text style={styles.vehicleInfo}>{t('vehicle')}{bookingDetails.vehicleNumber}</Text>
                    <Text style={styles.vehicleInfo}>{t('estimatedTime')}{bookingDetails.estimatedTime} {t('mins')}</Text>
                    <Text style={styles.priceInfo}>{t('price')}{bookingDetails.amount}</Text>
                    
                    {!bookingDetails.paymentStatus && (
                      <Button title={t('payNow')} onPress={handlePayment} color="#53a20e" />
                    )}
                  </>
                )}
                
                {bookingDetails?.status === 'completed' && (
                  <Text style={styles.bookingStatus}>{t('serviceCompleted')}</Text>
                )}
              </>
            )}
          </View>
          
          {/* Feedback Section */}
          {showFeedback && (
            <View style={styles.feedbackOverlay}>
              <View style={styles.feedbackContainer}>
                <Text style={styles.feedbackTitle}>Rate Your Experience</Text>
                
                <View style={styles.starRating}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <TouchableOpacity
                      key={star}
                      onPress={() => setFeedbackRating(star)}
                      style={styles.starButton}
                    >
                      <Text style={[styles.star, feedbackRating >= star && styles.starFilled]}>★</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                
                <TextInput
                  style={styles.feedbackInput}
                  placeholder="Your feedback..."
                  value={feedbackComment}
                  onChangeText={setFeedbackComment}
                  multiline
                />
                
                <Button title="Submit Feedback" onPress={handleFeedbackSubmit} color="#53a20e" />
                <Button title="Skip" onPress={() => setShowFeedback(false)} color="#ccc" />
              </View>
            </View>
          )}
        </>
      ) : (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading your location...</Text>
        </View>
      )}
      
      {/* Booking History Section */}
      <ScrollView style={styles.historyContainer} horizontal>
        <Text style={styles.historyTitle}>Booking History</Text>
        {bookingHistory.length > 0 ? (
          bookingHistory.map(booking => (
            <View key={booking._id} style={styles.historyItem}>
              <Text style={styles.historyDate}>{new Date(booking.createdAt).toLocaleDateString()}</Text>
              <Text style={styles.historyStatus}>Status: {booking.status}</Text>
              <Text style={styles.historyAmount}>Amount: ₹{booking.amount}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noHistory}>No booking history</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  bottomPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  availableVehicles: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  bookingStatus: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#53a20e',
  },
  vehicleInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
  priceInfo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#53a20e',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
  feedbackOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  feedbackContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  starRating: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  starButton: {
    padding: 5,
  },
  star: {
    fontSize: 30,
    color: '#ccc',
  },
  starFilled: {
    color: '#FFD700',
  },
  feedbackInput: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    textAlignVertical: 'top',
  },
  historyContainer: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 10,
    maxHeight: 150,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  historyItem: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  historyDate: {
    fontSize: 12,
    color: '#666',
  },
  historyStatus: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  historyAmount: {
    fontSize: 14,
    color: '#53a20e',
  },
  noHistory: {
    fontSize: 14,
    color: '#999',
  },
});

export default HomeScreen;