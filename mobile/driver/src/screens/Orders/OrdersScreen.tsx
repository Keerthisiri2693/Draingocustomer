import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Platform, StatusBar } from "react-native";

/* ================= TYPES ================= */
type OrderStatus = "ALL" | "NEW" | "ONGOING" | "COMPLETED";

type Order = {
  id: string;
  customer: string;
  work: string;
  location: string;
  amount: number;
  status: Exclude<OrderStatus, "ALL">;
};

const TOOLBAR_HEIGHT =
  Platform.OS === "android"
    ? 56 + (StatusBar.currentHeight ?? 0)
    : 56;

/* ================= DUMMY DATA ================= */
const orders: Order[] = [
  {
    id: "1",
    customer: "Ravi Kumar",
    work: "Septic Tank Cleaning",
    location: "Anna Nagar",
    amount: 700,
    status: "NEW",
  },
  {
    id: "2",
    customer: "Suresh",
    work: "Drain Blockage",
    location: "T Nagar",
    amount: 500,
    status: "ONGOING",
  },
  {
    id: "3",
    customer: "Arun",
    work: "Water Tank Cleaning",
    location: "Velachery",
    amount: 900,
    status: "COMPLETED",
  },
];

export default function OrdersScreen() {
  const navigation = useNavigation<any>();

  const [filter, setFilter] = useState<OrderStatus>("ALL");
  const [showFilter, setShowFilter] = useState(false);

  const filteredOrders =
    filter === "ALL"
      ? orders
      : orders.filter((o) => o.status === filter);

  const renderOrder = ({ item }: { item: Order }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() =>
        navigation.navigate("JobDetails", { orderId: item.id })
      }
    >
      <View style={styles.rowBetween}>
        <Text style={styles.customer}>{item.customer}</Text>

        <View
          style={[
            styles.statusBadge,
            item.status === "NEW" && styles.newBadge,
            item.status === "ONGOING" && styles.ongoingBadge,
            item.status === "COMPLETED" && styles.completedBadge,
          ]}
        >
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <Text style={styles.work}>{item.work}</Text>
      <Text style={styles.location}>📍 {item.location}</Text>

      <View style={styles.footer}>
        <Text style={styles.amount}>₹ {item.amount}</Text>
        <Ionicons name="chevron-forward" size={18} color="#999" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      {/* ===== HEADER WITH FILTER ===== */}
     <View style={styles.toolbar}>
  {/* BACK */}
  <TouchableOpacity
    style={styles.toolbarIcon}
    onPress={() => navigation.goBack()}
  >
    <Ionicons name="arrow-back" size={22} color="#fff" />
  </TouchableOpacity>

  {/* TITLE */}
  <View style={styles.toolbarCenter}>
    <Text style={styles.toolbarTitle}>Orders</Text>
    <Text style={styles.toolbarSubtitle}>
      {filteredOrders.length} orders found
    </Text>
  </View>

  {/* FILTER */}
  <TouchableOpacity
    style={styles.toolbarIcon}
    onPress={() => setShowFilter(true)}
  >
    <Ionicons name="filter" size={20} color="#fff" />
  </TouchableOpacity>
</View>

      {/* ===== LIST ===== */}
      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id}
        renderItem={renderOrder}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons
              name="file-tray-outline"
              size={42}
              color="#ccc"
            />
            <Text style={styles.emptyText}>No orders available</Text>
          </View>
        }
      />

      {/* ===== FILTER MODAL ===== */}
      <Modal
        visible={showFilter}
        transparent
        animationType="slide"
        onRequestClose={() => setShowFilter(false)}
      >
        <View style={styles.filterOverlay}>
          <View style={styles.filterCard}>
            <Text style={styles.filterTitle}>Filter Orders</Text>

            {(["ALL", "NEW", "ONGOING", "COMPLETED"] as OrderStatus[]).map(
              (s) => (
                <TouchableOpacity
                  key={s}
                  style={[
                    styles.filterItem,
                    filter === s && styles.filterItemActive,
                  ]}
                  onPress={() => {
                    setFilter(s);
                    setShowFilter(false);
                  }}
                >
                  <Text
                    style={[
                      styles.filterText,
                      filter === s && styles.filterTextActive,
                    ]}
                  >
                    {s}
                  </Text>
                </TouchableOpacity>
              )
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6F8",
  },

  headerRow: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#222",
  },

  subtitle: {
    fontSize: 13,
    color: "#777",
    marginTop: 2,
  },

  filterBtn: {
    backgroundColor: "#E8F8F1",
    padding: 10,
    borderRadius: 12,
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 14,
    marginTop:20,
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

  amount: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1DBF73",
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },

  statusText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#fff",
  },

  newBadge: { backgroundColor: "#f39c12" },
  ongoingBadge: { backgroundColor: "#1DBF73" },
  completedBadge: { backgroundColor: "#3498db" },

  empty: {
    alignItems: "center",
    marginTop: 80,
  },

  emptyText: {
    marginTop: 10,
    color: "#999",
    fontWeight: "600",
  },

  /* FILTER */
  filterOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-end",
  },

  filterCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  filterTitle: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 12,
  },

  filterItem: {
    paddingVertical: 12,
  },

  filterItemActive: {
    backgroundColor: "#E8F8F1",
    borderRadius: 8,
    paddingHorizontal: 8,
  },

  filterText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
  },

  filterTextActive: {
    color: "#1DBF73",
  },



toolbar: {
  height: TOOLBAR_HEIGHT,
  paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  backgroundColor: "#1DBF73",
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 12,
  elevation: 6,
},

toolbarIcon: {
  width: 40,
  height: 40,
  alignItems: "center",
  justifyContent: "center",
},

toolbarCenter: {
  flex: 1,
  alignItems: "center",
},

toolbarTitle: {
  color: "#fff",
  fontSize: 17,
  fontWeight: "800",
},

toolbarSubtitle: {
  color: "#E6F4EA",
  fontSize: 12,
  marginTop: 2,
},


});
