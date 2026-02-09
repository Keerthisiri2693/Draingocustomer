import React from 'react';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import './src/localization/i18n';

// 🔹 Auth / Flow Screens
import SplashScreen from './src/screens/auth/SplashScreen';
import PermissionScreen from './src/screens/auth/PermissionScreen';
import LanguageSelectScreen from './src/screens/auth/LanguageSelectScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import Terms from './src/screens/auth/Terms';
import OtpScreen from './src/screens/auth/OtpScreen';



import HomeScreen from './src/screens/home/HomeScreen';

// 🔹 Extra Screens (opened from tabs)
import LocationScreen from './src/screens/Location/LocationScreen';
import HelpSupport from './src/screens/profile/HelpSupportScreen';

// 🔹 Booking Flow
import VehicleSelect from './src/screens/booking/VehicleSelect';
import BookingHistoryScreen from './src/screens/booking/BookingHistoryScreen';
import BookingCompletedScreen from './src/screens/booking/BookingCompletedScreen';
import DriverArrivedScreen from './src/screens/booking/DriverArrivedScreen';

import RideInProgressScreen from './src/screens/booking/RideInProgressScreen';
import BookingScreen from './src/screens/booking/BookingScreen';
import ProfileScreen from './src/screens/profile/ProfileScreen';
import TrackLocation from './src/screens/booking/TrackLocation';
import BillSummary from './src/screens/booking/BillSummary';
import RatingScreen from './src/screens/booking/RatingScreen';
import BookingDetailsScreen from './src/screens/booking/BookingDetailsScreen';
import EditprofileScreen from './src/screens/profile/EditprofileScreen';
import Aboutus from './src/screens/profile/Aboutus';
import AccountDetailsScreen from './src/screens/profile/AccountDetailsScreen';
import AddAddressScreen from './src/screens/profile/AddAddressScreen';
import ViewAddressScreen from './src/screens/profile/ViewAddressScreen';
import PrivacyPolicyScreen from './src/screens/auth/PrivacyPolicyScreen';
import ContactSupport from './src/screens/auth/ContactSupport';





const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        {/* 🔹 App Start */}
        <Stack.Screen name="Splash" component={SplashScreen} />

        {/* 🔹 First Launch */}
        <Stack.Screen name="Permission" component={PermissionScreen} />
        <Stack.Screen name="Language" component={LanguageSelectScreen} />
      
         <Stack.Screen name="PrivacyPolicyScreen" component={PrivacyPolicyScreen} />
         <Stack.Screen name='ContactSupport' component={ContactSupport} />


        {/* 🔹 Auth */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Otp" component={OtpScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
         <Stack.Screen name="Terms" component={Terms} />

        {/* 🔹 MAIN APP (BOTTOM NAV LIVES HERE) */}
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
         <Stack.Screen name="BookingScreen" component={BookingScreen} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />

        {/* 🔹 Extra Screens */}
        <Stack.Screen name="Location" component={LocationScreen} />
        <Stack.Screen name="HelpSupport" component={HelpSupport} />

        {/* 🔹 Booking Flow */}
        <Stack.Screen name="VehicleSelect" component={VehicleSelect} />
        <Stack.Screen name="BookingHistoryScreen" component={BookingHistoryScreen} />
        <Stack.Screen name="BookingCompletedScreen" component={BookingCompletedScreen} />
        <Stack.Screen name="BillSummary" component={BillSummary} />
       
        <Stack.Screen name="DriverArrivedScreen" component={DriverArrivedScreen} />
        <Stack.Screen name="RideInProgressScreen" component={RideInProgressScreen} />
        <Stack.Screen name='TrackLocation' component={TrackLocation} />
        <Stack.Screen name='RatingScreen' component={RatingScreen} />
        <Stack.Screen name='BookingDetailsScreen' component={BookingDetailsScreen} />


           {/* 🔹 Profile Flow */}
        <Stack.Screen name="EditprofileScreen" component={EditprofileScreen} />
        <Stack.Screen name="Aboutus" component={Aboutus} />
        <Stack.Screen name="AccountDetailsScreen" component={AccountDetailsScreen} />
         <Stack.Screen name="AddAddressScreen" component={AddAddressScreen} />
        <Stack.Screen name="ViewAddressScreen" component={ViewAddressScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
