import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
  Switch,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const TOOLBAR_HEIGHT =
  Platform.OS === "android"
    ? 56 + (StatusBar.currentHeight ?? 0)
    : 56;

const DashboardScreen = () => {
  const navigation = useNavigation<any>();

  /* ================= STATE ================= */
  const [isOnline, setIsOnline] = useState(false);
  const [incomingRide, setIncomingRide] = useState(false);

  const weeklyData = [120, 220, 150, 300, 180, 260, 90];

  /* ================= SIMULATE INCOMING RIDE ================= */
  useEffect(() => {
    if (isOnline) {
      const timer = setTimeout(() => {
        setIncomingRide(true);
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      setIncomingRide(false);
    }
  }, [isOnline]);

  return (
    <View style={styles.container}>
      {/* ===== TOOLBAR ===== */}
      <View style={styles.toolbar}>
        <Text style={styles.toolbarTitle}>Dashboard</Text>

        <View style={styles.toolbarRight}>
          <Text style={styles.statusText}>
            {isOnline ? "Online" : "Offline"}
          </Text>
          <Switch
            value={isOnline}
            onValueChange={setIsOnline}
            trackColor={{ false: "#ccc", true: "#8FF2A6" }}
            thumbColor={isOnline ? "#2ecc71" : "#999"}
          />
        </View>
      </View>

      {/* ===== CONTENT ===== */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: TOOLBAR_HEIGHT + 16,
          paddingBottom: 140, // space for bottom nav
        }}
      >
        <Text style={styles.welcome}>Welcome back 👋</Text>
        <Text style={styles.driverName}>Driver</Text>

        {/* STATUS CARD */}
        <View style={styles.statusCard}>
          <Ionicons
            name="radio"
            size={22}
            color={isOnline ? "#2E7D32" : "#999"}
          />
          <Text style={styles.statusCardText}>
            {isOnline
              ? "You are online and ready to receive rides"
              : "Go online to receive ride requests"}
          </Text>
        </View>

        {/* STATS */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>₹ 840</Text>
            <Text style={styles.statLabel}>Today Earnings</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>6</Text>
            <Text style={styles.statLabel}>Trips</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>4.9 ⭐</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>

        {/* WEEKLY EARNINGS */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Weekly Earnings</Text>

          <View style={styles.chartRow}>
            {weeklyData.map((v, i) => (
              <View key={i} style={styles.barWrapper}>
                <Text style={styles.barValue}>₹{v}</Text>
                <View
                  style={[
                    styles.bar,
                    { height: Math.max(v / 2, 6) },
                  ]}
                />
                <Text style={styles.dayLabel}>
                  {["M", "T", "W", "T", "F", "S", "S"][i]}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* QUICK ACTION */}
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => navigation.navigate("LocationScreen")}
        >
          <Ionicons name="map" size={18} color="#fff" />
          <Text style={styles.actionText}>Open Live Tracking</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* 🔔 INCOMING RIDE POPUP */}
      {incomingRide && isOnline && (
        <View style={styles.rideOverlay}>
          <View style={styles.rideCard}>
            <Text style={styles.rideTitle}>🚨 New Ride Request</Text>
            <Text>Pickup: Anna Nagar</Text>
            <Text>Drop: T Nagar</Text>
            <Text>Distance: 3.4 km • ETA: 12 mins</Text>

            <View style={styles.rideActions}>
              <TouchableOpacity
                style={styles.rejectBtn}
                onPress={() => setIncomingRide(false)}
              >
                <Text style={{ color: "#c0392b", fontWeight: "700" }}>
                  Reject
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.acceptBtn}
                onPress={() => {
                  setIncomingRide(false);
                  navigation.navigate("LocationScreen");
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "700" }}>
                  Accept
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* ===== DASHBOARD ONLY BOTTOM NAV ===== */}
      <View style={styles.bottomNav}>
        <BottomNavItem icon="home" label="Home" active />
        <BottomNavItem
          icon="clipboard"
          label="Orders"
          onPress={() => navigation.navigate("OrdersScreen")}
        />
        <BottomNavItem
          icon="time"
          label="History"
          onPress={() => navigation.navigate("HistoryScreen")}
        />
        <BottomNavItem
          icon="navigate"
          label="Tracking"
          onPress={() => navigation.navigate("TrackingScreen")}
        />
        <BottomNavItem
          icon="person"
          label="Profile"
          onPress={() => navigation.navigate("ProfileScreen")}
        />
      </View>
    </View>
  );
};

export default DashboardScreen;

/* ===== BOTTOM NAV ITEM ===== */
const BottomNavItem = ({
  icon,
  label,
  active,
  onPress,
}: {
  icon: any;
  label: string;
  active?: boolean;
  onPress?: () => void;
}) => (
  <TouchableOpacity style={styles.navItem} onPress={onPress}>
    <Ionicons
      name={icon}
      size={22}
      color={active ? "#2E7D32" : "#777"}
    />
    <Text
      style={[
        styles.navLabel,
        active && { color: "#2E7D32" },
      ]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F6F8" },

  /* TOOLBAR */
  toolbar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: TOOLBAR_HEIGHT,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#2E7D32",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    zIndex: 20,
  },

  toolbarTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },

  toolbarRight: {
    flexDirection: "row",
    alignItems: "center",
  },

  statusText: {
    color: "#fff",
    marginRight: 6,
  },

  welcome: {
    fontSize: 16,
    color: "#777",
    marginLeft: 16,
  },

  driverName: {
    fontSize: 24,
    fontWeight: "800",
    marginLeft: 16,
    marginBottom: 16,
    color: "#222",
  },

  statusCard: {
    marginHorizontal: 16,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
    elevation: 3,
  },

  statusCardText: {
    flex: 1,
    fontWeight: "600",
    color: "#444",
  },

  statsRow: {
    flexDirection: "row",
    marginHorizontal: 16,
    gap: 12,
    marginBottom: 24,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    elevation: 3,
  },

  statValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#2E7D32",
  },

  statLabel: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },

  chartCard: {
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    elevation: 3,
  },

  chartTitle: {
    fontWeight: "800",
    marginBottom: 12,
    color: "#2E7D32",
  },

  chartRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 160,
    paddingTop: 20,
  },

  barWrapper: {
    flex: 1,
    alignItems: "center",
  },

  barValue: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2E7D32",
    marginBottom: 6,
  },

  bar: {
    width: 14,
    backgroundColor: "#2E7D32",
    borderRadius: 6,
  },

  dayLabel: {
    marginTop: 6,
    fontSize: 11,
    color: "#777",
    fontWeight: "600",
  },

  actionBtn: {
    marginHorizontal: 16,
    backgroundColor: "#2E7D32",
    paddingVertical: 14,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    elevation: 4,
  },

  actionText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 14,
  },

  /* BOTTOM NAV */
  bottomNav: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    height: 64,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#eee",
    elevation: 10,
    borderRadius:10
  },

  navItem: {
    alignItems: "center",
    justifyContent: "center",
  },

  navLabel: {
    fontSize: 11,
    marginTop: 2,
    color: "#777",
    fontWeight: "600",
  },

  /* RIDE POPUP */
  rideOverlay: {
    position: "absolute",
    top: TOOLBAR_HEIGHT,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 50,
  },

  rideCard: {
    backgroundColor: "#fff",
    width: "90%",
    padding: 20,
    borderRadius: 20,
    elevation: 6,
  },

  rideTitle: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 10,
    color: "#222",
  },

  rideActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },

  rejectBtn: {
    flex: 1,
    padding: 12,
    borderWidth: 2,
    borderColor: "#c0392b",
    borderRadius: 10,
    alignItems: "center",
  },

  acceptBtn: {
    flex: 1,
    padding: 12,
    backgroundColor: "#2E7D32",
    borderRadius: 10,
    alignItems: "center",
  },
});
