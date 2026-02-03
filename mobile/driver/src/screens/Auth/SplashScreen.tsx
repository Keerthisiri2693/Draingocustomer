import React, { useEffect } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import LottieView from "lottie-react-native";
import { RootStackParamList } from "../../navigation/AppNavigator";

const sewageTruck = require("../../assets/Tanker Truck.json");

type Props = NativeStackScreenProps<RootStackParamList, "Splash">;

export default function SplashScreen({ navigation }: Props) {
  useEffect(() => {
    const t = setTimeout(() => navigation.replace("Login"), 2500);
    return () => clearTimeout(t);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>Drain Go</Text>

      {/* 🚛 Sewage Truck Animation */}
      <LottieView
        source={sewageTruck}
        autoPlay
        loop
        style={styles.truck}
      />

      <Text style={styles.sub}>Clean With Fullest</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace("Login")}
      >
        <Text style={styles.buttonText}>Get Started →</Text>
      </TouchableOpacity>
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
  button: {
    backgroundColor: "#2ecc71",
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
