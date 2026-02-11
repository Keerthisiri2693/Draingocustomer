import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
  ActivityIndicator,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OwnerDashboardScreen({ navigation }: any) {
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<
    "home" | "vehicles" | "drivers" | "profile"
  >("home");

  /* ================= ACCESS CONTROL ================= */
  useEffect(() => {
    const init = async () => {
      const membershipDone = await AsyncStorage.getItem("MEMBERSHIP_DONE");
      const role = await AsyncStorage.getItem("USER_ROLE");
      const profile = await AsyncStorage.getItem("OWNER_PROFILE");

      if (profile) {
        const parsed = JSON.parse(profile);
        setProfileImage(parsed.profileImage || null);
      }

      if (membershipDone !== "true") {
        navigation.replace("Membership");
        return;
      }

      if (role !== "OWNER") {
        navigation.replace("LocationScreen");
        return;
      }

      setLoading(false);
    };

    init();
  }, [navigation]);

  const go = (tab: typeof activeTab, screen?: string) => {
    setActiveTab(tab);
    if (screen) navigation.navigate(screen);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loader}>
        <ActivityIndicator size="large" color="#1DBF73" />
        <Text style={styles.loaderText}>Loading dashboard…</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* ===== HEADER ===== */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Owner Dashboard</Text>

        {/* 👤 PROFILE IMAGE */}
        <TouchableOpacity
          style={styles.avatarWrap}
          onPress={() => navigation.navigate("OwnerProfileScreen")}
        >
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarFallback}>
              <Ionicons name="person" size={18} color="#fff" />
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* ===== CONTENT ===== */}
      <SafeAreaView style={styles.container} edges={["bottom"]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 140 }}
        >
          {/* STATS */}
          <View style={styles.statsRow}>
            <Stat icon="bus-outline" value="3" label="Vehicles" />
            <Stat icon="people-outline" value="5" label="Drivers" />
          </View>

          {/* TODAY */}
          <Text style={styles.sectionTitle}>Today</Text>
          <View style={styles.todayRow}>
            <TodayItem label="Active Vehicles" value="2 / 3" />
            <TodayItem label="Drivers Online" value="4 / 5" />
            <TodayItem label="Jobs Running" value="1" />
            <TodayItem label="Completed" value="6" />
          </View>

          {/* ATTENTION */}
          <Text style={styles.sectionTitle}>Needs Attention</Text>
          <View style={styles.attentionRow}>
            <AttentionCard color="#e74c3c" icon="alert-circle" text="1 Driver unassigned" />
            <AttentionCard color="#f1c40f" icon="time" text="Vehicle doc expiring" />
            <AttentionCard color="#1DBF73" icon="checkmark-circle" text="All systems OK" />
          </View>

          {/* ACTIVITY */}
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityCard}>
            <ActivityItem text="Ramesh completed job – ₹1200" />
            <ActivityItem text="Tractor KA05 assigned to Mahesh" />
            <ActivityItem text="New driver added yesterday" />
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* ===== FLOATING NAV ===== */}
      <View style={styles.floatingNav}>
        <Tab icon="home" label="Home" active={activeTab === "home"} onPress={() => go("home")} />
        <Tab icon="receipt" label="Orders" active={activeTab === "profile"} onPress={() => go("profile", "OwnerorderScreen")} />
        <Tab icon="bus" label="Vehicles" active={activeTab === "vehicles"} onPress={() => go("vehicles", "VehicleListScreen")} />
        <Tab icon="people" label="Drivers" active={activeTab === "drivers"} onPress={() => go("drivers", "DriverListScreen")} />
        <Tab icon="person" label="Profile" active={activeTab === "profile"} onPress={() => go("profile", "OwnerprofileScreen")} />
      </View>
    </View>
  );
}

/* ================= COMPONENTS ================= */

const Stat = ({ icon, value, label }: any) => (
  <View style={styles.statCard}>
    <Ionicons name={icon} size={22} color="#1DBF73" />
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const TodayItem = ({ label, value }: any) => (
  <View style={styles.todayItem}>
    <Text style={styles.todayValue}>{value}</Text>
    <Text style={styles.todayLabel}>{label}</Text>
  </View>
);

const AttentionCard = ({ icon, text, color }: any) => (
  <View style={[styles.attentionCard, { borderLeftColor: color }]}>
    <Ionicons name={icon} size={18} color={color} />
    <Text style={styles.attentionText}>{text}</Text>
  </View>
);

const ActivityItem = ({ text }: any) => (
  <View style={styles.activityItem}>
    <Ionicons name="ellipse" size={8} color="#1DBF73" />
    <Text style={styles.activityText}>{text}</Text>
  </View>
);

const Tab = ({ icon, label, active, onPress }: any) => (
  <TouchableOpacity
    style={[styles.tabItem, active && styles.tabActive]}
    onPress={onPress}
    activeOpacity={0.85}
  >
    <Ionicons
      name={active ? icon : `${icon}-outline`}
      size={20}
      color={active ? "#fff" : "#1DBF73"}
    />
    <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>
      {label}
    </Text>
  </TouchableOpacity>
);

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#1DBF73" },

  loader: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  loaderText: { marginTop: 10, color: "#777" },

  header: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 44,
    height: (Platform.OS === "android" ? StatusBar.currentHeight : 44) + 56,
    backgroundColor: "#1DBF73",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  headerTitle: { color: "#fff", fontSize: 20, fontWeight: "800" },

  avatarWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: "hidden",
  },

  avatar: {
    width: "100%",
    height: "100%",
  },

  avatarFallback: {
    flex: 1,
    backgroundColor: "#0fa968",
    alignItems: "center",
    justifyContent: "center",
  },

  container: { flex: 1, backgroundColor: "#F3F7F6", padding: 16 },

  statsRow: { flexDirection: "row", justifyContent: "space-between" },

  statCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    elevation: 2,
  },

  statValue: { fontSize: 20, fontWeight: "800", marginTop: 6 },
  statLabel: { fontSize: 12, color: "#666" },

  sectionTitle: { fontSize: 16, fontWeight: "800", marginVertical: 12 },

  todayRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  todayItem: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },

  todayValue: { fontSize: 16, fontWeight: "800" },
  todayLabel: { fontSize: 12, color: "#666" },

  attentionRow: { marginBottom: 10 },

  attentionCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    borderLeftWidth: 5,
    marginBottom: 8,
  },

  attentionText: { marginLeft: 10, fontWeight: "700" },

  activityCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
  },

  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  activityText: { marginLeft: 8, fontSize: 13 },

  floatingNav: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 30 : 50,
    left: 20,
    right: 20,
    height: 64,
    backgroundColor: "#fff",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    elevation: 12,
  },

  tabItem: {
    width: 60,
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  tabActive: { backgroundColor: "#1DBF73" },
  tabLabel: { fontSize: 10, fontWeight: "700", color: "#1DBF73" },
  tabLabelActive: { color: "#fff" },
});
