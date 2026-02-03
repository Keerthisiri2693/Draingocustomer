import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Vibration,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

export default function OrdersScreen() {
  const navigation = useNavigation<any>();

  const [showPopup, setShowPopup] = useState(true);

  // Vibrate when popup opens
  useEffect(() => {
    if (showPopup) Vibration.vibrate(700);
  }, [showPopup]);

  return (
    <SafeAreaView style={styles.container}>
      {/* MAP PLACEHOLDER */}
      <View style={styles.map}>
        <Text style={{ color: "#777" }}>Map will come here</Text>
      </View>

      {/* NEW JOB POPUP */}
      <Modal visible={showPopup} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.card}>
            <Text style={styles.header}>New Job Available</Text>

            <Text style={styles.name}>Kumar</Text>
            <Text style={styles.sub}>1.2 km • 5 min away</Text>

            {/* SERVICE LOCATION */}
            <View style={styles.infoBox}>
              <Text style={styles.smallLabel}>Service Location</Text>
              <Text style={styles.boldText}>Pakkam, Thiruvallur</Text>
            </View>

            {/* WORK TYPE */}
            <View style={styles.infoBox}>
              <Text style={styles.smallLabel}>Work</Text>
              <Text style={styles.boldText}>Septic Tank Cleaning</Text>
            </View>

            {/* TANK + PAYMENT */}
            <View style={styles.row}>
              <Text style={styles.label}>Tank</Text>
              <Text style={{ fontWeight: "700" }}>1000 Lts</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Payment</Text>
              <Text style={{ fontWeight: "700" }}>₹ 700</Text>
            </View>

            {/* BUTTONS */}
            <View style={styles.buttons}>
              <TouchableOpacity
                style={styles.reject}
                onPress={() => setShowPopup(false)}
              >
                <Text style={styles.rejectText}>Reject</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.accept}
                onPress={() => {
                  setShowPopup(false);
                  navigation.navigate("JobDetails");
                }}
              >
                <Text style={styles.acceptText}>Accept</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  map: {
    flex: 1,
    backgroundColor: "#e4e9ef",
    alignItems: "center",
    justifyContent: "center",
  },

  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.25)",
  },

  card: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 18,
    elevation: 10,
  },

  header: {
    textAlign: "center",
    fontWeight: "800",
    color: "#1DBF73",
    marginBottom: 10,
  },

  name: { fontWeight: "800", fontSize: 18 },
  sub: { color: "#777", marginBottom: 14 },

  infoBox: {
    backgroundColor: "#f5fbf6",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },

  smallLabel: { fontSize: 12, color: "#777" },
  boldText: { fontSize: 14, fontWeight: "700" },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },

  label: { color: "#777" },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },

  reject: {
    borderWidth: 1,
    borderColor: "#ff6b6b",
    flex: 0.48,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  rejectText: { color: "#ff6b6b", fontWeight: "700" },

  accept: {
    backgroundColor: "#1DBF73",
    flex: 0.48,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  acceptText: { color: "#fff", fontWeight: "700" },
});
