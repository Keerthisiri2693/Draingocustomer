import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function JobDetailsScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <Text style={styles.title}>Job Details</Text>

      {/* CUSTOMER CARD */}
      <View style={styles.topCard}>
        <View style={styles.avatar}>
          <Icon name="person" size={26} color="#fff" />
        </View>

        <View>
          <Text style={styles.name}>Kumar</Text>
          <Text style={styles.sub}>1.2 km • 5 mins away</Text>
        </View>
      </View>

      {/* DETAILS CARD */}
      <View style={styles.card}>
        {/* LOCATION */}
        <View style={styles.row}>
          <Icon name="location-on" size={22} color="#1DBF73" />
          <View style={styles.textWrap}>
            <Text style={styles.label}>Service Location</Text>
            <Text style={styles.value}>Pakkam, Thiruvallur</Text>
          </View>
        </View>

        {/* WORK */}
        <View style={styles.row}>
          <Icon name="build" size={22} color="#1DBF73" />
          <View style={styles.textWrap}>
            <Text style={styles.label}>Work</Text>
            <Text style={styles.value}>Septic Tank Cleaning</Text>
          </View>
        </View>

        {/* TANK */}
        <View style={styles.row}>
          <Icon name="water-drop" size={22} color="#1DBF73" />
          <View style={styles.textWrap}>
            <Text style={styles.label}>Tank Capacity</Text>
            <Text style={styles.value}>1000 Litres</Text>
          </View>
        </View>

        {/* PAYMENT */}
        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>Service Fee</Text>
          <Text style={styles.paymentValue}>₹ 700</Text>
        </View>
      </View>

      {/* ACTION BUTTON */}
      <TouchableOpacity
        style={styles.startBtn}
        onPress={() => navigation.replace("Tracking")}
      >
        <Text style={styles.startText}>Start Service</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F8FA",
    padding: 18,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 16,
  },

  topCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAFBF2",
    padding: 16,
    borderRadius: 18,
    marginBottom: 18,
    gap: 12,
  },

  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#1DBF73",
    alignItems: "center",
    justifyContent: "center",
  },

  name: {
    fontSize: 17,
    fontWeight: "800",
  },

  sub: {
    color: "#6E7C7C",
    marginTop: 2,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    elevation: 4,
  },

  row: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 18,
    alignItems: "flex-start",
  },

  textWrap: {
    flex: 1,
  },

  label: {
    color: "#6E7C7C",
    fontSize: 12,
  },

  value: {
    fontSize: 15,
    fontWeight: "800",
    marginTop: 2,
  },

  paymentRow: {
    marginTop: 6,
    paddingTop: 14,
    borderTopWidth: 1,
    borderColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  paymentLabel: {
    color: "#6E7C7C",
    fontSize: 14,
  },

  paymentValue: {
    fontSize: 20,
    fontWeight: "900",
    color: "#1DBF73",
  },

  startBtn: {
    backgroundColor: "#1DBF73",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: "auto",
  },

  startText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 16,
  },
});
