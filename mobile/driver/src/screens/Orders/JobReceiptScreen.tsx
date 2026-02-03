import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function JobReceiptScreen({ route, navigation }: any) {
  const job = route.params?.job;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Job Receipt</Text>

      <View style={styles.card}>
        <Text style={styles.jobId}>Job ID: #{job.id}</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Customer</Text>
          <Text style={styles.value}>{job.customer}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Location</Text>
          <Text style={styles.value}>{job.location}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Work</Text>
          <Text style={styles.value}>{job.work}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.value}>{job.date}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Amount</Text>
          <Text style={styles.amount}>₹ {job.amount}</Text>
        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {job.status === "completed" ? "Completed" : "Pending"}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.btnText}>Close</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },

  title: { fontSize: 22, fontWeight: "800", marginBottom: 14 },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    elevation: 4,
  },

  jobId: {
    fontWeight: "800",
    marginBottom: 10,
    color: "#555",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  label: { color: "#777" },
  value: { fontWeight: "700" },

  amount: { color: "#1DBF73", fontWeight: "800" },

  badge: {
    marginTop: 14,
    backgroundColor: "#E9F9EF",
    paddingVertical: 6,
    borderRadius: 10,
    alignItems: "center",
  },

  badgeText: { color: "#1DBF73", fontWeight: "700" },

  btn: {
    marginTop: 20,
    backgroundColor: "#1DBF73",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  btnText: { color: "#fff", fontWeight: "700" },
});
