import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from "../../navigation/AppNavigator";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Membership"
>;

export default function SettingsScreen() {
  const navigation = useNavigation<NavigationProp>();

  /* ===== LOGOUT ===== */
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.multiRemove([
            "LOGGED_IN",
            "USER_ROLE",
          ]);

          navigation.replace("LoginScreen");
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      {/* ➕ ADD NEW VEHICLE */}
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          navigation.navigate("VehicleRegistrationScreen")
        }
      >
        <Ionicons name="car-outline" size={20} color="#1DBF73" />
        <Text style={styles.itemText}>Add New Vehicle</Text>
      </TouchableOpacity>

      {/* 💳 MEMBERSHIP */}
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("MembershipScreen")}
      >
        <Ionicons name="card-outline" size={20} color="#1DBF73" />
        <Text style={styles.itemText}>Membership Plans</Text>
      </TouchableOpacity>

      {/* 📜 TERMS */}
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("TermsConditionScreen")}
      >
        <Ionicons
          name="document-text-outline"
          size={20}
          color="#1DBF73"
        />
        <Text style={styles.itemText}>Terms & Conditions</Text>
      </TouchableOpacity>

      {/* 🚪 LOGOUT */}
      <TouchableOpacity style={styles.item} onPress={handleLogout}>
        <Ionicons
          name="log-out-outline"
          size={20}
          color="#e74c3c"
        />
        <Text style={[styles.itemText, { color: "#e74c3c" }]}>
          Logout
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: "#F3F7F6",
  },

  header: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 14,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    backgroundColor: "#fff",
  },

  itemText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111",
  },
});
