import React from 'react';
import { View, Text } from 'react-native';
import Button from '../../components/Button';

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={{ padding: 20 }}>
      <Text>Select Service</Text>
      <Button
        title="Book Drain Cleaning"
        onPress={() => navigation.navigate('VehicleSelect')}
      />
    </View>
  );
};

export default HomeScreen;
