import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const TOOLBAR_HEIGHT =
  Platform.OS === "android"
    ? 56 + (StatusBar.currentHeight ?? 0)
    : 56;

/* ================= TYPES ================= */

type OrderStatus = "COMPLETED" | "ONGOING" | "CANCELLED";

type Order = {
  id: string;
  status: OrderStatus;
  date: string;
  vehicle: string;
  driver: string;
  amount: number;

  // ✅ OPTIONAL — required only for tracking
  driverLat?: number;
  driverLng?: number;
  dropLat?: number;
  dropLng?: number;
};

/* ================= DUMMY ORDERS ================= */

const ORDERS: Order[] = [
  {
    id: "ORD-10234",
    status: "COMPLETED",
    date: "12 Feb 2026, 10:30 AM",
    vehicle: "TN 49 AB 1234",
    driver: "Ravi Kumar",
    amount: 2200,
  },
  {
    id: "ORD-10235",
    status: "ONGOING",
    date: "14 Feb 2026, 02:10 PM",
    vehicle: "TN 50 CD 5678",
    driver: "Mahesh",
    amount: 1800,

    // ✅ TRACKING DATA
    driverLat: 13.0827,
    driverLng: 80.2707,
    dropLat: 13.0418,
    dropLng: 80.2341,
  },
  {
    id: "ORD-10236",
    status: "CANCELLED",
    date: "15 Feb 2026, 09:00 AM",
    vehicle: "TN 49 AB 1234",
    driver: "Ravi Kumar",
    amount: 0,
  },
];

export default function OwnerOrderScreen() {
  const navigation = useNavigation<any>();

  const renderItem = ({ item }: { item: Order }) => {
    const statusColor =
      item.status === "COMPLETED"
        ? "#1DBF73"
        : item.status === "ONGOING"
        ? "#f39c12"
        : "#e74c3c";

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={() =>
          navigation.navigate("OwnerorderdetailsScreen", {
            order: item, // ✅ tracking fields passed safely
          })
        }
      >
        {/* HEADER */}
        <View style={styles.row}>
          <Text style={styles.orderId}>{item.id}</Text>

          <View
            style={[
              styles.statusBadge,
              { backgroundColor: statusColor + "22" },
            ]}
          >
            <Text style={[styles.statusText, { color: statusColor }]}>
              {item.status === "ONGOING" ? "IN PROGRESS" : item.status}
            </Text>
          </View>
        </View>

        {/* DATE */}
        <Text style={styles.date}>{item.date}</Text>

        {/* INFO */}
        <View style={styles.infoRow}>
          <Text style={styles.label}>Vehicle</Text>
          <Text style={styles.value}>{item.vehicle}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Driver</Text>
          <Text style={styles.value}>{item.driver}</Text>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.amount}>
            ₹{item.amount > 0 ? item.amount : "--"}
          </Text>
          <Ionicons name="chevron-forward" size={18} color="#999" />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      {/* TOOLBAR */}
      <View style={styles.toolbar}>
        <Ionicons
          name="arrow-back"
          size={22}
          color="#fff"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.toolbarTitle}>Orders</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* LIST */}
      <FlatList
        data={ORDERS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No orders found</Text>
        }
      />
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F8F6",
  },

  toolbar: {
    height: TOOLBAR_HEIGHT,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    elevation: 3,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  orderId: {
    fontSize: 15,
    fontWeight: "800",
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  statusText: {
    fontSize: 11,
    fontWeight: "800",
  },

  date: {
    marginTop: 6,
    fontSize: 12,
    color: "#777",
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  label: {
    fontSize: 13,
    color: "#666",
  },

  value: {
    fontSize: 13,
    fontWeight: "700",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },

  amount: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1DBF73",
  },

  emptyText: {
    textAlign: "center",
    color: "#777",
    marginTop: 60,
    fontSize: 14,
  },
});
