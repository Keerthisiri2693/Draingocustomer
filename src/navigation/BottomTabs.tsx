import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/HomeScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import BookingHistoryScreen from '../screens/booking/BookingHistoryScreen';
import AppIcon from '../components/AppIcon';
import colors from '../theme/colors';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: '#9E9E9E',
        tabBarStyle: {
          height: 60,
          paddingBottom: 6,
          paddingTop: 6,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          elevation: 10,
          backgroundColor: '#FFFFFF',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') {
            return (
              <AppIcon
                type="ion"
                name="home-outline"
                color={color}
                size={size}
              />
            );
          }

          if (route.name === 'Bookings') {
            return (
              <AppIcon
                type="ion"
                name="receipt-outline"
                color={color}
                size={size}
              />
            );
          }

          if (route.name === 'Profile') {
            return (
              <AppIcon
                type="ion"
                name="person-outline"
                color={color}
                size={size}
              />
            );
          }

          return null;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Bookings" component={BookingHistoryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
