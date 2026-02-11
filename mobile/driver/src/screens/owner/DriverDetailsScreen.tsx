import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const TOOLBAR_HEIGHT =
  Platform.OS === "android"
    ? 56 + (StatusBar.currentHeight ?? 0)
    : 56;

/* ===== DUMMY VEHICLES ===== */
const VEHICLES = [
  { id: "V1", name: "Lorry – TN09 AB 1234" },
  { id: "V2", name: "Tractor – AP28 CD 5678" },
  { id: "V3", name: "Lorry – KA05 EF 9012" },
];

export default function DriverDetailsScreen({ route, navigation }: any) {
  const { driver } = route.params;

  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);

  const callDriver = () => {
    Linking.openURL(`tel:${driver.phone}`);
  };

  const messageDriver = () => {
    Linking.openURL(`sms:${driver.phone}`);
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      {/* ===== TOOLBAR ===== */}
      <View style={styles.toolbar}>
        <Ionicons
          name="arrow-back"
          size={22}
          color="#fff"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.toolbarTitle}>Driver Details</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* ===== PROFILE CARD ===== */}
      <View style={styles.profileCard}>
        <Ionicons
          name="person-circle-outline"
          size={90}
          color="#1DBF73"
        />
        <Text style={styles.name}>{driver.name}</Text>

        <View
          style={[
            styles.statusChip,
            driver.status === "Active"
              ? styles.activeChip
              : styles.inactiveChip,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              driver.status === "Active"
                ? styles.activeText
                : styles.inactiveText,
            ]}
          >
            {driver.status}
          </Text>
        </View>
      </View>

      {/* ===== INFO ===== */}
      <View style={styles.infoCard}>
        <InfoRow
          icon="call-outline"
          label="Phone"
          value={driver.phone}
        />
        <InfoRow
          icon="bus-outline"
          label="Assigned Vehicle"
          value={driver.vehicle || "Not assigned"}
        />
      </View>

      {/* ===== ACTIONS ===== */}
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.actionBtn} onPress={callDriver}>
          <Ionicons name="call" size={18} color="#fff" />
          <Text style={styles.actionText}>Call</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBtnOutline}
          onPress={messageDriver}
        >
          <Ionicons
            name="chatbubble-outline"
            size={18}
            color="#1DBF73"
          />
          <Text style={styles.actionOutlineText}>Message</Text>
        </TouchableOpacity>
      </View>

      {/* ===== ASSIGN VEHICLE ===== */}
      <TouchableOpacity
        style={styles.assignBtn}
        onPress={() => setShowAssignModal(true)}
      >
        <Ionicons
          name="swap-horizontal-outline"
          size={20}
          color="#fff"
        />
        <Text style={styles.assignText}>
          Assign / Change Vehicle
        </Text>
      </TouchableOpacity>

      {/* ===== ASSIGN VEHICLE MODAL ===== */}
      {showAssignModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Assign Vehicle</Text>

            {VEHICLES.map((v) => {
              const active = selectedVehicle === v.id;
              return (
                <TouchableOpacity
                  key={v.id}
                  style={[
                    styles.vehicleRow,
                    active && styles.vehicleRowActive,
                  ]}
                  onPress={() => setSelectedVehicle(v.id)}
                >
                  <Ionicons
                    name="bus-outline"
                    size={20}
                    color={active ? "#fff" : "#1DBF73"}
                  />
                  <Text
                    style={[
                      styles.vehicleText,
                      active && { color: "#fff" },
                    ]}
                  >
                    {v.name}
                  </Text>
                </TouchableOpacity>
              );
            })}

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => {
                  setShowAssignModal(false);
                  setSelectedVehicle(null);
                }}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.confirmBtn,
                  !selectedVehicle && { opacity: 0.4 },
                ]}
                disabled={!selectedVehicle}
                onPress={() => {
                  alert("Vehicle assigned successfully 🚛");
                  setShowAssignModal(false);
                  setSelectedVehicle(null);
                }}
              >
                <Text style={styles.confirmText}>Assign</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

/* ===== SMALL COMPONENT ===== */
const InfoRow = ({ icon, label, value }: any) => (
  <View style={styles.infoRow}>
    <Ionicons name={icon} size={18} color="#1DBF73" />
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F7F6" },

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

  profileCard: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 24,
    margin: 16,
    borderRadius: 20,
    elevation: 3,
  },

  name: { fontSize: 18, fontWeight: "800", marginTop: 8 },

  statusChip: {
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 14,
  },

  activeChip: { backgroundColor: "#E7F9EF" },
  inactiveChip: { backgroundColor: "#fdecea" },

  statusText: { fontSize: 12, fontWeight: "700" },
  activeText: { color: "#1DBF73" },
  inactiveText: { color: "#e74c3c" },

  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginHorizontal: 16,
    padding: 16,
    elevation: 2,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  infoLabel: {
    marginLeft: 10,
    fontSize: 13,
    color: "#666",
    width: 120,
  },

  infoValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111",
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 16,
  },

  actionBtn: {
    flex: 1,
    backgroundColor: "#1DBF73",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginRight: 8,
  },

  actionText: {
    color: "#fff",
    fontWeight: "800",
    marginLeft: 6,
  },

  actionBtnOutline: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: "#1DBF73",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: 8,
  },

  actionOutlineText: {
    color: "#1DBF73",
    fontWeight: "800",
    marginLeft: 6,
  },

  assignBtn: {
    backgroundColor: "#1DBF73",
    marginHorizontal: 16,
    marginTop: 8,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },

  assignText: {
    color: "#fff",
    fontWeight: "800",
    marginLeft: 8,
  },

  /* ===== MODAL ===== */

  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-end",
  },

  modalCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginBottom:50
  },

  modalTitle: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 16,
    textAlign: "center",
  },

  vehicleRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: "#F5F6F8",
    marginBottom: 10,
  },

  vehicleRowActive: { backgroundColor: "#1DBF73" },

  vehicleText: {
    marginLeft: 10,
    fontWeight: "700",
    color: "#111",
  },

  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  cancelBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: "#ddd",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    marginRight: 8,
  },

  cancelText: { fontWeight: "700", color: "#666" },

  confirmBtn: {
    flex: 1,
    backgroundColor: "#1DBF73",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    marginLeft: 8,
  },

  confirmText: { fontWeight: "800", color: "#fff" },
});
