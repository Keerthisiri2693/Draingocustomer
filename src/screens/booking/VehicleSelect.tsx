import React from 'react';
import { View, Text } from 'react-native';
import Button from '../../components/Button';

const VehicleSelect = ({ navigation }: any) => {
  return (
    <View style={{ padding: 20 }}>
      <Text>Select Vehicle</Text>
      <Button
        title="Lorry"
        onPress={() => navigation.navigate('Booking')}
      />
      <Button
        title="Tractor"
        onPress={() => navigation.navigate('Booking')}
      />
    </View>
  );
};

export default VehicleSelect;
