import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/Auth/SplashScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import OTPScreen from "../screens/Auth/OTPScreen";
import DriverRegistrationScreen from "../screens/Registration/DriverRegistrationScreen";
import VehicleRegistrationScreen from "../screens/Registration/VehicleRegistrationScreen";
import VerificationPendingScreen from "../screens/Registration/VerificationPendingScreen";
import TrackingScreen from "../screens/Orders/TrackingScreen";
import MembershipScreen from "../screens/Settings/MembershipScreen";

import JobDetailsScreen from "../screens/Orders/JobDetailsScreen";
import JobReceiptScreen from "../screens/Orders/JobReceiptScreen";
import EarningsScreen from "../screens/Earnings/EarningsScreen";
import TermsConditionScreen from "../screens/Settings/TermsConditionScreen";
import LocationScreen from "../screens/Auth/LocationScreen";
import ProfileScreen from "../screens/Settings/ProfileScreen";
import DashboardScreen from "../screens/Dashboard/DashboardScreen";
import OrdersScreen from "../screens/Orders/OrdersScreen";
import HistoryScreen from "../screens/Orders/HistoryScreen";
import EditProfileScreen from "../screens/Settings/EditProfileScreen";
import KYCScreen from "../screens/Settings/KYCScreen";
import SubscriptionHistoryScreen from "../screens/Settings/SubscriptionHistoryScreen";
import LanguageSelectScreen from "../screens/Auth/LanguageSelectScreen";
import PermissionScreen from "../screens/Auth/PermissionScreen";
import VehicleListScreen from "../../src/screens/Registration/VehicleListScreen";
import OwnerDashboardScreen from "../screens/owner/ownerdashboard" ;
import DriverListScreen from "../screens/owner/DriverListScreen" ;
import DriverDetailsScreen from "../screens/owner/DriverDetailsScreen";
import OwnerprofileScreen from "../screens/owner/OwnerprofileScreen" ;
import OwnerEditProfileScreen from "../screens/owner/OwnerEditProfileScreen";
import MyVehicleScreen from "../screens/Registration/MyVehicleScreen" ;
import OwnerEarningsScreen from "../screens/owner/OwnerEarningsScreen";
import OwnerorderdetailsScreen from "../screens/owner/OwnerorderdetailsScreen";
import OwnerorderScreen from "../screens/owner/OwnerorderScreen";
import PendingApprovalScreen from "../screens/Registration/PendingApprovalScreen" ;
/**
 * Job type (shared)
 */
export type Job = {
  id: string;
  customer: string;
  location: string;
  work: string;
  date: string;
  amount: number;
  status: "completed" | "pending";
};

/**
 * ROOT STACK PARAMS (IMPORTANT)
 */
export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  OTP: { phone?: string } | undefined;

  DriverRegistration: undefined;
  VehicleRegistration: undefined;
  VerificationPending: undefined;

  JobDetails: undefined;
  Tracking: undefined;

  // ✅ FIX: job is REQUIRED
  JobReceipt: { job: Job };

  Main: undefined;
  Earnings: undefined;
  Membership: undefined;
  Terms: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} />

      <Stack.Screen name="ProfileScreen"  component={ProfileScreen} />

      
      <Stack.Screen
        name="VehicleRegistrationScreen"
        component={VehicleRegistrationScreen}
      />
      <Stack.Screen
        name="VerificationPending"
        component={VerificationPendingScreen}
      />

      {/* Job flow */}
      <Stack.Screen name="OrdersScreen" component={OrdersScreen} />
      <Stack.Screen name="JobDetails" component={JobDetailsScreen} />
      <Stack.Screen name="Tracking" component={TrackingScreen} />
      <Stack.Screen name="JobReceipt" component={JobReceiptScreen} />

      {/* Drawer */}
      <Stack.Screen name="Main" component={DashboardScreen} />
      <Stack.Screen name="LocationScreen" component={LocationScreen} />

      {/* Settings */}
      <Stack.Screen name="Earnings" component={EarningsScreen} />
      <Stack.Screen name="MembershipScreen" component={MembershipScreen} />
      <Stack.Screen name="TermsConditionScreen"  component={TermsConditionScreen} />
       <Stack.Screen name="TrackingScreen" component={TrackingScreen} />
       <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
       <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
       <Stack.Screen name="KYCScreen" component = {KYCScreen} />
       <Stack.Screen name="SubscriptionHistoryScreen" component={SubscriptionHistoryScreen} />
       <Stack.Screen name="DriverRegistrationScreen"  component={DriverRegistrationScreen} />
      <Stack.Screen name="Permission" component={PermissionScreen} />
      <Stack.Screen name="Language" component={LanguageSelectScreen} />
      <Stack.Screen name="VehicleListScreen" component={VehicleListScreen} />
      <Stack.Screen name="DriverListScreen" component={DriverListScreen} />
      <Stack.Screen name="DriverDetailsScreen" component={DriverDetailsScreen} />

      <Stack.Screen name="OwnerDashboardScreen"  component={OwnerDashboardScreen} />
     <Stack.Screen name="OwnerprofileScreen"  component={OwnerprofileScreen} />
     <Stack.Screen name="OwnerEditProfileScreen" component={OwnerEditProfileScreen} />
     <Stack.Screen name="MyVehicleScreen" component={MyVehicleScreen} />
     <Stack.Screen name="OwnerEarningsScreen" component={OwnerEarningsScreen} />

       <Stack.Screen name="OwnerorderScreen" component={OwnerorderScreen} />
     <Stack.Screen name="OwnerorderdetailsScreen" component={OwnerorderdetailsScreen} />
     <Stack.Screen name ="PendingApprovalScreen" component={PendingApprovalScreen} />
    </Stack.Navigator>
  );
}
