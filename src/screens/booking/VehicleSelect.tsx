import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import colors from '../../theme/colors';

type VehicleType = 'tractor' | 'lorry';

const VehicleSelect = ({ navigation }: any) => {
  const [selected, setSelected] = useState<VehicleType | null>(null);

  return (
    <SafeAreaView style={{flex: 1,backgroundColor: colors.white,paddingTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : 0,}}>
    <View style={styles.container}>
      <Text style={styles.title}>Select Vehicle</Text>

      {/* Tractor Card */}
      <TouchableOpacity
        style={[
          styles.card,
          selected === 'tractor' && styles.selectedCard,
        ]}
        onPress={() => setSelected('tractor')}
      >
        <View>
          <Text style={styles.vehicleTitle}>Tractor</Text>
          <Text style={styles.vehicleSub}>Up to 5000 Litres</Text>
        </View>
        <Text style={styles.price}>₹800</Text>
      </TouchableOpacity>

      {/* Lorry Card */}
      <TouchableOpacity
        style={[
          styles.card,
          selected === 'lorry' && styles.selectedCard,
        ]}
        onPress={() => setSelected('lorry')}
      >
        <View>
          <Text style={styles.vehicleTitle}>Lorry</Text>
          <Text style={styles.vehicleSub}>Up to 10000 Litres</Text>
        </View>
        <Text style={styles.price}>₹1200</Text>
      </TouchableOpacity>

      {/* Book Button */}
      <TouchableOpacity
        style={[
          styles.bookButton,
          !selected && styles.disabledButton,
        ]}
        disabled={!selected}
        onPress={() => navigation.navigate('Booking')}
      >
        <Text style={styles.bookText}>Continue</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

export default VehicleSelect;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
    color: '#3A2C1D',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#F8F8F8',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  selectedCard: {
    borderColor: colors.primary,
    backgroundColor: '#F1FFF7',
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
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  bookButton: {
    marginTop: 'auto',
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#BDBDBD',
  },
  bookText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '600',
  },
});
