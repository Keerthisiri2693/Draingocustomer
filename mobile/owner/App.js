// Owner App Entry Point
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import AddVehicleScreen from './screens/AddVehicleScreen';
import AddDriverScreen from './screens/AddDriverScreen';
import VehiclesListScreen from './screens/VehiclesListScreen';
import DriversListScreen from './screens/DriversListScreen';
import VehicleDetailScreen from './screens/VehicleDetailScreen';
import DriverDetailScreen from './screens/DriverDetailScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Owner Dashboard' }} />
        <Stack.Screen name="AddVehicle" component={AddVehicleScreen} options={{ title: 'Add New Vehicle' }} />
        <Stack.Screen name="AddDriver" component={AddDriverScreen} options={{ title: 'Add New Driver' }} />
        <Stack.Screen name="VehiclesList" component={VehiclesListScreen} options={{ title: 'My Vehicles' }} />
        <Stack.Screen name="DriversList" component={DriversListScreen} options={{ title: 'My Drivers' }} />
        <Stack.Screen name="VehicleDetail" component={VehicleDetailScreen} options={{ title: 'Vehicle Details' }} />
        <Stack.Screen name="DriverDetail" component={DriverDetailScreen} options={{ title: 'Driver Details' }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'My Profile' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;