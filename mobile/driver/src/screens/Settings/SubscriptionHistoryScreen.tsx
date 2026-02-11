import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const TOOLBAR_HEIGHT =
  Platform.OS === "android"
    ? 56 + (StatusBar.currentHeight ?? 0)
    : 56;

/* ===== DUMMY SUBSCRIPTIONS ===== */
const generateDummySubscriptions = () => {
  const now = new Date();

  return [
    {
      plan: "Pro",
      billing: "Monthly",
      amount: 399,
      startDate: new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        1
      ).toISOString(),
      endDate: new Date(
        now.getFullYear(),
        now.getMonth(),
        1
      ).toISOString(),
      status: "EXPIRED",
    },
    {
      plan: "Basic",
      billing: "Monthly",
      amount: 199,
      startDate: new Date(
        now.getFullYear(),
        now.getMonth(),
        1
      ).toISOString(),
      endDate: new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        1
      ).toISOString(),
      status: "ACTIVE",
    },
  ];
};

export default function SubscriptionHistoryScreen() {
  const navigation = useNavigation<any>();
  const [subscriptions, setSubscriptions] = useState<any[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const data = await AsyncStorage.getItem("subscription_history");

    if (!data) {
      const dummy = generateDummySubscriptions();
      await AsyncStorage.setItem(
        "subscription_history",
        JSON.stringify(dummy)
      );
      setSubscriptions(dummy);
    } else {
      setSubscriptions(JSON.parse(data));
    }
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.plan}>{item.plan}</Text>
        <StatusBadge status={item.status} />
      </View>

      <Text style={styles.billing}>
        {item.billing} • ₹{item.amount}
      </Text>

      <View style={styles.dateRow}>
        <Text style={styles.date}>
          Start: {new Date(item.startDate).toDateString()}
        </Text>
        <Text style={styles.date}>
          End: {new Date(item.endDate).toDateString()}
        </Text>
      </View>
    </View>
  );

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
        <Text style={styles.toolbarTitle}>
          Subscription History
        </Text>
        <View style={{ width: 22 }} />
      </View>

      {/* LIST */}
      <FlatList
        data={subscriptions}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={styles.list}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />

      {/* ===== BOTTOM CTA ===== */}
     <View style={styles.bottomBar}>
  <TouchableOpacity
    style={styles.membershipBtn}
    onPress={() =>
      navigation.navigate("MembershipScreen", {
        from: "subscriptionHistory", // 🔑 IMPORTANT
      })
    }
  >
    <Ionicons name="card-outline" size={20} color="#fff" />
    <Text style={styles.membershipText}>
      View Membership Plans
    </Text>
  </TouchableOpacity>
</View>

    </SafeAreaView>
  );
}

/* ===== SMALL COMPONENTS ===== */
const StatusBadge = ({ status }: { status: string }) => {
  const color =
    status === "ACTIVE"
      ? "#1DBF73"
      : status === "EXPIRED"
      ? "#999"
      : "#e74c3c";

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: color + "22" },
      ]}
    >
      <Text style={[styles.badgeText, { color }]}>
        {status}
      </Text>
    </View>
  );
};

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F8F6" },

  toolbar: {
    height: TOOLBAR_HEIGHT,
    paddingTop:
      Platform.OS === "android"
        ? StatusBar.currentHeight
        : 0,
    backgroundColor: "#1DBF73",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  toolbarTitle: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
  },

  list: {
    padding: 16,
    paddingBottom: 90, // space for button
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

  plan: {
    fontSize: 16,
    fontWeight: "800",
  },

  billing: {
    color: "#1DBF73",
    fontWeight: "700",
    marginVertical: 6,
  },

  dateRow: {
    marginTop: 6,
  },

  date: {
    color: "#666",
    fontSize: 12,
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  badgeText: {
    fontWeight: "800",
    fontSize: 11,
  },

  /* ===== BOTTOM BAR ===== */
  bottomBar: {
    backgroundColor: "#fff",
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#eee",
  },

  membershipBtn: {
    height: 52,
    backgroundColor: "#1DBF73",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  membershipText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "800",
  },
});
