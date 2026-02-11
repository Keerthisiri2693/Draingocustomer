import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

/* ================= TYPES ================= */
type Order = {
  id: string;
  customer: string;
  work: string;
  location: string;
  date: string;
  amount: number;
  status: "COMPLETED" | "CANCELLED";
};

/* ================= DUMMY DATA ================= */
const historyOrders: Order[] = [
  {
    id: "1",
    customer: "Ravi Kumar",
    work: "Septic Tank Cleaning",
    location: "Thanjavur",
    date: "12 Sep 2024",
    amount: 900,
    status: "COMPLETED",
  },
  {
    id: "2",
    customer: "Suresh",
    work: "Drain Blockage",
    location: "Kumbakonam",
    date: "09 Sep 2024",
    amount: 600,
    status: "COMPLETED",
  },
  {
    id: "3",
    customer: "Arun",
    work: "Water Tank Cleaning",
    location: "Trichy",
    date: "05 Sep 2024",
    amount: 750,
    status: "CANCELLED",
  },
];

const TOOLBAR_HEIGHT =
  Platform.OS === "android"
    ? 56 + (StatusBar.currentHeight ?? 0)
    : 56;

export default function OrderHistoryScreen() {
  const navigation = useNavigation<any>();

  const renderItem = ({ item }: { item: Order }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() =>
        navigation.navigate("JobReceipt", { job: item })
      }
    >
      {/* TOP ROW */}
      <View style={styles.rowBetween}>
        <Text style={styles.customer}>{item.customer}</Text>

        <View
          style={[
            styles.badge,
            item.status === "COMPLETED"
              ? styles.completedBadge
              : styles.cancelledBadge,
          ]}
        >
          <Text style={styles.badgeText}>{item.status}</Text>
        </View>
      </View>

      {/* DETAILS */}
      <Text style={styles.work}>{item.work}</Text>
      <Text style={styles.location}>📍 {item.location}</Text>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.amount}>₹ {item.amount}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      {/* ===== TOOLBAR ===== */}
      <View style={styles.toolbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.toolbarTitle}>Order History</Text>

        <View style={{ width: 22 }} />
      </View>

      {/* SUB HEADER */}
      <View style={styles.header}>
        <Text style={styles.subtitle}>
          {historyOrders.length} completed jobs
        </Text>
      </View>

      {/* LIST */}
      <FlatList
        data={historyOrders}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons
              name="file-tray-outline"
              size={48}
              color="#ccc"
            />
            <Text style={styles.emptyText}>
              No completed orders yet
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6F8",
  },

  /* TOOLBAR */
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

  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  subtitle: {
    fontSize: 13,
    color: "#777",
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 16,
    elevation: 3,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  customer: {
    fontSize: 15,
    fontWeight: "800",
    color: "#222",
  },

  work: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },

  location: {
    marginTop: 4,
    fontSize: 13,
    color: "#666",
  },

  footer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  date: {
    fontSize: 12,
    color: "#777",
  },

  amount: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1DBF73",
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },

  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#fff",
  },

  completedBadge: {
    backgroundColor: "#1DBF73",
  },

  cancelledBadge: {
    backgroundColor: "#e74c3c",
  },

  empty: {
    marginTop: 100,
    alignItems: "center",
  },

  emptyText: {
    marginTop: 10,
    fontWeight: "600",
    color: "#999",
  },
});
