import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";

import DashboardScreen from "../screens/Dashboard/DashboardScreen";
import OrdersScreen from "../screens/Orders/OrdersScreen";
import HistoryScreen from "../screens/Orders/HistoryScreen";
import ProfileScreen from "../screens/Settings/ProfileScreen";
import TrackingScreen from "../screens/Orders/TrackingScreen";

export type BottomTabParamList = {
  Dashboard: undefined;
  Orders: undefined;
  Tracking: undefined;
  History: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#1DBF73",
        tabBarStyle: { height: 60, paddingBottom: 6 },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ color }) => (
            <Icon name="dashboard" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          tabBarLabel: "Orders",
          tabBarIcon: ({ color }) => (
            <Icon name="assignment" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Tracking"
        component={TrackingScreen}
        options={{
          tabBarLabel: "Tracking",
          tabBarIcon: ({ color }) => (
            <Icon name="navigation" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarLabel: "History",
          tabBarIcon: ({ color }) => (
            <Icon name="history" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <Icon name="person" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
