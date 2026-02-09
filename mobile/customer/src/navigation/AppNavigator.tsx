import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';
import HomeScreen from '../screens/home/HomeScreen';
import VehicleSelect from '../screens/booking/VehicleSelect';
import BookingScreen from '../screens/booking/BookingScreen';

import DriverArrivedScreen from '../screens/booking/DriverArrivedScreen';
import RideInProgressScreen from '../screens/booking/RideInProgressScreen';
import BookingCompletedScreen from '../screens/booking/BookingCompletedScreen';
import Terms from '../screens/auth/Terms';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={BottomTabs} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="VehicleSelect" component={VehicleSelect} />
      <Stack.Screen name="Booking" component={BookingScreen} />
      <Stack.Screen name="Terms" component={Terms}/>
      <Stack.Screen name="DriverArrived" component={DriverArrivedScreen}/>
      <Stack.Screen name="RideInProgress" component={RideInProgressScreen}/>
      <Stack.Screen name="BookingCompleted" component={BookingCompletedScreen}/>


    </Stack.Navigator>
  );
};

export default AppNavigator;
