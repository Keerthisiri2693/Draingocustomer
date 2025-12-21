import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import colors from '../../theme/colors';

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      {/* Fake Map Area */}
      <View style={styles.mapArea}>
        <Text style={styles.mapText}>📍 Your Location</Text>
      </View>

      {/* Bottom Card */}
      <View style={styles.bottomSheet}>
        <Text style={styles.heading}>Select Vehicle</Text>

        {/* Tractor */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('VehicleSelect')}
        >
          <View>
            <Text style={styles.vehicleTitle}>Tractor</Text>
            <Text style={styles.vehicleSub}>Up to 5000 Litres</Text>
          </View>
          <Text style={styles.price}>₹800</Text>
        </TouchableOpacity>

        {/* Lorry */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('VehicleSelect')}
        >
          <View>
            <Text style={styles.vehicleTitle}>Lorry</Text>
            <Text style={styles.vehicleSub}>Up to 10000 Litres</Text>
          </View>
          <Text style={styles.price}>₹1200</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  mapArea: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapText: {
    fontSize: 16,
    color: '#555',
  },
  bottomSheet: {
    backgroundColor: colors.white,
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
  },
  heading: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
    color: '#3A2C1D',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#F9F9F9',
    marginBottom: 12,
  },
  vehicleTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  vehicleSub: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primary,
  },
});
