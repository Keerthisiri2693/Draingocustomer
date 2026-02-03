import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Profile</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>Kumar (Mock)</Text>

        <Text style={styles.label}>Phone</Text>
        <Text style={styles.value}>+91 9876543210</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>driver@example.com</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 18 },
  header: { fontSize: 20, fontWeight: "800", marginBottom: 14 },
  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    backgroundColor: "#fff",
  },
  label: { fontWeight: "700", marginTop: 10 },
  value: { color: "#444" },
});
