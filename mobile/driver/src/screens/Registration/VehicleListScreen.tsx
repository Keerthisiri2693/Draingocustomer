import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

/* ===== TYPES ===== */
type Vehicle = {
  id: string;
  type: string;
  model: string;
  number: string;
  tank: string;
  role: "DRIVER" | "OWNER";
};

/* ===== DUMMY DATA ===== */
const DUMMY_VEHICLES: Vehicle[] = [
  {
    id: "1",
    type: "Lorry",
    model: "Tata 1613",
    number: "TN 09 AB 1234",
    tank: "5000",
    role: "DRIVER",
  },
  {
    id: "2",
    type: "Tractor",
    model: "Mahindra 575",
    number: "TN 10 XY 5678",
    tank: "3000",
    role: "OWNER",
  },
];

export default function VehicleListScreen({ navigation }: any) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    setVehicles(DUMMY_VEHICLES);
  }, []);

  /* ===== DELETE VEHICLE ===== */
  const deleteVehicle = (id: string) => {
    Alert.alert(
      "Delete Vehicle",
      "Are you sure you want to delete this vehicle?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setVehicles((prev) =>
              prev.filter((v) => v.id !== id)
            );
          },
        },
      ]
    );
  };

  /* ===== EDIT VEHICLE ===== */
  const editVehicle = (vehicle: Vehicle) => {
    navigation.navigate("VehicleRegistrationScreen", {
      vehicle, // pass data
      isEdit: true,
    });
  };

  const renderItem = ({ item }: { item: Vehicle }) => (
    <View style={styles.card}>
      {/* HEADER */}
      <View style={styles.cardHeader}>
        <Text style={styles.vehicleType}>{item.type}</Text>

        <View
          style={[
            styles.roleBadge,
            item.role === "OWNER" && styles.ownerBadge,
          ]}
        >
          <Text
            style={[
              styles.roleText,
              item.role === "OWNER" && styles.ownerText,
            ]}
          >
            {item.role}
          </Text>
        </View>
      </View>

      {/* DETAILS */}
      <Text style={styles.detail}>Model: {item.model}</Text>
      <Text style={styles.detail}>Vehicle No: {item.number}</Text>
      <Text style={styles.detail}>Tank Capacity: {item.tank} L</Text>

      {/* ACTIONS */}
      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => editVehicle(item)}
        >
          <Ionicons name="create-outline" size={16} color="#1DBF73" />
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => deleteVehicle(item.id)}
        >
          <Ionicons name="trash-outline" size={16} color="#EA5455" />
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.root}>
      {/* STATUS BAR */}
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Vehicles</Text>

        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate("VehicleRegistrationScreen")}
        >
          <Ionicons name="add" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* LIST */}
      <SafeAreaView style={styles.container} edges={["bottom"]}>
        <FlatList
          data={vehicles}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#1DBF73",
  },

  container: {
    flex: 1,
    backgroundColor: "#F3F7F6",
  },

  header: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 44,
    height:
      (Platform.OS === "android" ? StatusBar.currentHeight : 44) + 56,
    backgroundColor: "#1DBF73",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },

  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    elevation: 2,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },

  vehicleType: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111",
  },

  roleBadge: {
    backgroundColor: "#E7F9EF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  ownerBadge: {
    backgroundColor: "#FFF3CD",
  },

  roleText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#1DBF73",
  },

  ownerText: {
    color: "#856404",
  },

  detail: {
    fontSize: 13,
    color: "#444",
    marginTop: 2,
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },

  editBtn: {
    flexDirection: "row",
    alignItems: "center",
  },

  editText: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: "600",
    color: "#1DBF73",
  },

  deleteBtn: {
    flexDirection: "row",
    alignItems: "center",
  },

  deleteText: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: "600",
    color: "#EA5455",
  },
});
