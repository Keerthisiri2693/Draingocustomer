import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTabs from "./BottomTabs";
import CustomDrawer from "./CustomDrawer";
import SettingsScreen from "../screens/Settings/SettingsScreen";
import MembershipScreen from "../screens/Settings/MembershipScreen";
import EarningsScreen from "../screens/Earnings/EarningsScreen";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
   <Drawer.Navigator
  drawerContent={(props) => <CustomDrawer {...props} />}
  screenOptions={{
    headerShown: false,
    drawerActiveTintColor: "#1DBF73",
    swipeEnabled: true,
  }}
>

      <Drawer.Screen
        name="Home"
        component={BottomTabs}
        options={{ drawerLabel: "Dashboard" }}
      />

      <Drawer.Screen
         name="Earnings"
        component={EarningsScreen}
        options={{ drawerLabel: "Earnings" }}
      />  
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Membership" component={MembershipScreen} />
    </Drawer.Navigator>
  );
}
