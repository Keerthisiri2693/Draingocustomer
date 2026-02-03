import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Switch,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function DashboardScreen() {
  const navigation: any = useNavigation();

  // ✅ Dashboard-only state
  const [active, setActive] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Icon name="menu" size={26} color="#333" />
        </TouchableOpacity>

        <View style={styles.headerRight}>
          <Text style={styles.onlineText}>
            {active ? "Online" : "Offline"}
          </Text>

          <Switch
            value={active}
            onValueChange={setActive}
            trackColor={{ false: "#ccc", true: "#8ff2a6" }}
            thumbColor={active ? "#2ecc71" : "#999"}
          />
        </View>
      </View>

      {/* OFFLINE BANNER */}
      {!active && (
        <View style={styles.offlineBanner}>
          <Text style={{ color: "#fff" }}>
            You are offline — turn Online to receive jobs
          </Text>
        </View>
      )}
  
      {/* CONTENT */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.greet}>Welcome back 👋</Text>
        <Text style={styles.name}>Driver</Text>
        <Image
          source={require("../../assets/banners/driver-banner.png")}
          style={styles.banner}
        />

        {/* ACTIVE JOBS */}
        <View style={styles.jobCard}>
          <Text style={styles.sectionTitle}>Active Jobs</Text>

          <View style={styles.jobItem}>
            <View>
              <Text style={styles.jobTitle}>Septic Tank Cleaning</Text>
              <Text style={styles.jobText}>
                Pickup: Pakkam → Drop: Thiruvallur
              </Text>
            </View>

            <TouchableOpacity
              style={styles.viewBtn}
              onPress={() => navigation.navigate("JobDetails")}
            >
              <Text style={styles.viewText}>View</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.jobItem}>
            <View>
              <Text style={styles.jobTitle}>Waste Tank Service</Text>
              <Text style={styles.jobText}>
                Pickup: Avadi → Drop: Redhills
              </Text>
            </View>

            <TouchableOpacity
              style={styles.viewBtn}
              onPress={() => navigation.navigate("JobDetails")}
            >
              <Text style={styles.viewText}>View</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* STATS */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>₹ 0</Text>
            <Text style={styles.statLabel}>Today Earnings</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Trips</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>4.9⭐</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>

        {/* GRAPH */}
        <View style={styles.graphCard}>
          <Text style={styles.sectionTitle}>Weekly Earnings</Text>

          <View style={styles.graphRow}>
            {[50, 80, 30, 70, 65, 90, 20].map((h, i) => (
              <View key={i} style={[styles.bar, { height: h }]} />
            ))}
          </View>

          <Text style={styles.graphNote}>Graph updates daily</Text>
        </View>

        {/* SIMULATE JOB */}
        <TouchableOpacity
          style={styles.simBtn}
          onPress={() => setShowPopup(true)}
        >
          <Text style={{ color: "#1DBF73" }}>
            Simulate New Job
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* POPUP */}
      <Modal transparent visible={showPopup} animationType="fade">
        <View style={styles.popupOverlay}>
          <View style={styles.popupBox}>
            <Text style={styles.popupTitle}>
              New Job Incoming 🚨
            </Text>

            <Text style={styles.popupText}>
              Septic Tank Cleaning — Pickup: Poonamalle
            </Text>

            <View style={styles.popupRow}>
              <TouchableOpacity
                style={styles.rejectBtn}
                onPress={() => setShowPopup(false)}
              >
                <Text style={{ color: "#c0392b", fontWeight: "700" }}>
                  Reject
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.acceptBtn}
                onPress={() => setShowPopup(false)}
              >
                <Text style={{ color: "#fff", fontWeight: "700" }}>
                  View
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerRight: { flexDirection: "row", alignItems: "center", gap: 10 },
  onlineText: { fontWeight: "600", color: "#333" },
  offlineBanner: {
    backgroundColor: "#e74c3c",
    paddingVertical: 12,
    alignItems: "center",
  },
  banner: { width: "100%", height: 180, marginTop: 10 },
  greet: { fontSize: 16, color: "#888", marginLeft: 16, marginTop: 10},
  name: {
    fontSize: 25,
    fontWeight: "700",
    color: "#333",
    marginLeft: 16,
  },
  jobCard: {
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  sectionTitle: { fontWeight: "700", marginBottom: 12 },
  jobItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  jobTitle: { fontWeight: "600" },
  jobText: { fontSize: 12, color: "#888", marginTop: 4 },
  viewBtn: {
    backgroundColor: "#1DBF73",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  viewText: { color: "#fff", fontWeight: "600", fontSize: 12 },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginBottom: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  statValue: { fontSize: 18, fontWeight: "700", color: "#1DBF73" },
  statLabel: { fontSize: 12, color: "#888", marginTop: 8 },
  graphCard: {
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  graphRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    height: 150,
    marginVertical: 16,
  },
  bar: { width: 30, backgroundColor: "#1DBF73", borderRadius: 4 },
  graphNote: { fontSize: 12, color: "#888", textAlign: "center" },
  simBtn: {
    marginHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: "#1DBF73",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  popupOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  popupBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "80%",
  },
  popupTitle: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  popupText: { fontSize: 14, color: "#666", marginBottom: 20 },
  popupRow: { flexDirection: "row", gap: 12 },
  rejectBtn: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: "#c0392b",
    borderRadius: 8,
    alignItems: "center",
  },
  acceptBtn: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: "#1DBF73",
    borderRadius: 8,
    alignItems: "center",
  },
});
