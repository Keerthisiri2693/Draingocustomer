import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DrawerNavigator from "./DrawerNavigator";   // ⬅️ ADD THIS

import SplashScreen from "../screens/Auth/SplashScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import OTPScreen from "../screens/Auth/OTPScreen";
import DriverRegistrationScreen from "../screens/Registration/DriverRegistrationScreen";
import VehicleRegistrationScreen from "../screens/Registration/VehicleRegistrationScreen";
import VerificationPendingScreen from "../screens/Registration/VerificationPendingScreen";
import TrackingScreen from "../screens/Orders/TrackingScreen";
import MembershipScreen from "../screens/Settings/MembershipScreen";
import TermsScreen from "../screens/Settings/TermsScreen";
import JobDetailsScreen from "../screens/Orders/JobDetailsScreen";
import JobReceiptScreen from "../screens/Orders/JobReceiptScreen";
import EarningsScreen from "../screens/Earnings/EarningsScreen";

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  OTP: { phone?: string } | undefined;
  DriverRegistration: undefined;
  VehicleRegistration: undefined;
  VerificationPending: undefined;
  JobDetails: undefined;
  JobReceipt: undefined;
  Earnings: undefined;
  Main: undefined;
  Tracking: undefined;
  Membership: undefined;
  Terms: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="OTP" component={OTPScreen} />
        <Stack.Screen name="DriverRegistration" component={DriverRegistrationScreen} />
        <Stack.Screen name="VehicleRegistration" component={VehicleRegistrationScreen} />
        <Stack.Screen name="VerificationPending" component={VerificationPendingScreen} />
        <Stack.Screen name="JobDetails" component={JobDetailsScreen} />
        <Stack.Screen name="JobReceipt" component={JobReceiptScreen} />
        <Stack.Screen name="Earnings" component={EarningsScreen} />


        {/* 👇 MAIN APP NOW USES DRAWER */}
        <Stack.Screen name="Main" component={DrawerNavigator} />

        <Stack.Screen name="Tracking" component={TrackingScreen} />
        <Stack.Screen name="Membership" component={MembershipScreen} />
        <Stack.Screen name="Terms" component={TermsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
