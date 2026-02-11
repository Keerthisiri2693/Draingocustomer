import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const TOOLBAR_HEIGHT =
  Platform.OS === "android"
    ? 56 + (StatusBar.currentHeight ?? 0)
    : 56;

type Vehicle = {
  number: string;
  type: string;
  city: string;
};

export default function MyVehicleScreen() {
  const navigation = useNavigation<any>();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);

  /* ================= LOAD VEHICLE ================= */
  useEffect(() => {
    const loadVehicle = async () => {
      const data = await AsyncStorage.getItem("MY_VEHICLE");
      if (data) setVehicle(JSON.parse(data));
    };
    loadVehicle();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      {/* ===== TOOLBAR ===== */}
      <View style={styles.toolbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.toolbarTitle}>My Vehicle</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* ===== CONTENT ===== */}
      <View style={styles.content}>
        {vehicle ? (
          <View style={styles.vehicleCard}>
            <Ionicons name="bus-outline" size={36} color="#1DBF73" />

            <View style={{ marginTop: 10 }}>
              <Text style={styles.vehicleNo}>{vehicle.number}</Text>
              <Text style={styles.vehicleInfo}>
                {vehicle.type} · {vehicle.city}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.editBtn}
              onPress={() =>
                navigation.navigate("VehicleRegistrationScreen", {
                  vehicle,
                  isEdit: true,
                })
              }
            >
              <Ionicons name="create-outline" size={18} color="#1DBF73" />
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.empty}>
            <Ionicons name="car-outline" size={48} color="#bbb" />
            <Text style={styles.emptyText}>
              No vehicle added yet
            </Text>
          </View>
        )}
      </View>

      {/* ===== ADD NEW VEHICLE ===== */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() =>
            navigation.navigate("VehicleRegistrationScreen")
          }
        >
          <Ionicons name="add-circle-outline" size={22} color="#fff" />
          <Text style={styles.addText}>Add New Vehicle</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F6F8" },

  toolbar: {
    height: TOOLBAR_HEIGHT,
    paddingTop:
      Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#1DBF73",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  toolbarTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },

  content: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },

  vehicleCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    alignItems: "center",
    elevation: 4,
  },

  vehicleNo: {
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
  },

  vehicleInfo: {
    color: "#777",
    textAlign: "center",
    marginTop: 4,
  },

  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 14,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#1DBF73",
  },

  editText: {
    color: "#1DBF73",
    fontWeight: "700",
  },

  empty: {
    alignItems: "center",
    justifyContent: "center",
  },

  emptyText: {
    marginTop: 10,
    color: "#777",
    fontWeight: "600",
  },

  footer: {
    padding: 16,
    backgroundColor: "#fff",
  },

  addBtn: {
    backgroundColor: "#1DBF73",
    height: 52,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  addText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 15,
  },
});
