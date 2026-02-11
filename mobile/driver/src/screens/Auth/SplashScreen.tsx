import React, { useEffect } from "react";
import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";

const sewageTruck = require("../../assets/Tanker Truck.json");

type Props = NativeStackScreenProps<RootStackParamList, "Splash">;

const isTrue = (v: string | null) => v === "true";

export default function SplashScreen({ navigation }: Props) {
  useEffect(() => {
    const bootstrap = async () => {
      try {
        const [
          permissionDone,
          languageSelected,
          loggedIn,
          termsAccepted,
          driverRegistered,
          vehicleRegistered,
          membershipDone,
          membershipStatus,
        ] = await Promise.all([
          AsyncStorage.getItem("PERMISSION_DONE"),
          AsyncStorage.getItem("LANGUAGE_SELECTED"),
          AsyncStorage.getItem("LOGGED_IN"),
          AsyncStorage.getItem("TERMS_ACCEPTED"),
          AsyncStorage.getItem("DRIVER_REGISTERED"),
          AsyncStorage.getItem("VEHICLE_REGISTERED"),
          AsyncStorage.getItem("MEMBERSHIP_DONE"),
          AsyncStorage.getItem("MEMBERSHIP_STATUS"), // 🔥 NEW
        ]);

        // Small splash delay
        await new Promise(resolve => setTimeout(resolve, 2200));

        /* ================= ONBOARDING FLOW ================= */

        if (!isTrue(permissionDone)) {
          navigation.replace("Permission");
          return;
        }

        if (!isTrue(languageSelected)) {
          navigation.replace("Language");
          return;
        }

        if (!isTrue(loggedIn)) {
          navigation.replace("LoginScreen");
          return;
        }

        if (!isTrue(termsAccepted)) {
          navigation.replace("TermsConditionScreen");
          return;
        }

        if (!isTrue(driverRegistered)) {
          navigation.replace("DriverRegistrationScreen");
          return;
        }

        if (!isTrue(vehicleRegistered)) {
          navigation.replace("VehicleRegistrationScreen");
          return;
        }

        /* ================= MEMBERSHIP LOGIC ================= */

        // If membership not selected
        if (!isTrue(membershipDone)) {
          navigation.replace("MembershipScreen");
          return;
        }

        // If membership selected but pending approval
        if (membershipStatus === "PENDING") {
          navigation.replace("PendingApprovalScreen");
          return;
        }

        // If approved
        if (membershipStatus === "APPROVED") {
          navigation.replace("LocationScreen");
          return;
        }

        // Safety fallback
        navigation.replace("MembershipScreen");

      } catch (e) {
        console.log("Splash error:", e);
        navigation.replace("LoginScreen");
      }
    };

    bootstrap();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>Drain Go</Text>

      <LottieView
        source={sewageTruck}
        autoPlay
        loop
        style={styles.truck}
      />

      <Text style={styles.sub}>Clean With Fullest</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  logo: {
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 10,
    color: "#2d7f2e",
  },
  truck: {
    width: 260,
    height: 180,
    marginBottom: 20,
  },
  sub: {
    fontSize: 14,
    marginBottom: 40,
    color: "#555",
  },
});
