import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MembershipScreen({ navigation }: any) {
  const subscribe = () => {
    Alert.alert("Subscription successful! 🎉");
    navigation.replace("Main");   // Go to Dashboard
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Choose Your Membership</Text>

      {/* --- BASIC PLAN --- */}
      <View style={styles.card}>
        <Text style={styles.plan}>Basic</Text>
        <Text style={styles.price}>₹199 / month</Text>

        <Text style={styles.features}>
          • Access to driver dashboard{"\n"}
          • Order notifications{"\n"}
          • Track completed trips
        </Text>

        <TouchableOpacity style={styles.button} onPress={subscribe}>
          <Text style={styles.buttonText}>Subscribe</Text>
        </TouchableOpacity>
      </View>

      {/* --- PRO PLAN --- */}
      <View style={[styles.card, styles.highlightCard]}>
        <Text style={styles.badge}>Recommended</Text>

        <Text style={styles.plan}>Pro</Text>
        <Text style={styles.price}>₹399 / month</Text>

        <Text style={styles.features}>
          • Everything in Basic{"\n"}
          • Priority job allocation{"\n"}
          • Higher earnings chances{"\n"}
          • Premium support
        </Text>

        <TouchableOpacity style={styles.buttonPrimary} onPress={subscribe}>
          <Text style={styles.buttonPrimaryText}>Subscribe Pro</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f8f6",
    padding: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 14,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    elevation: 3,
  },

  highlightCard: {
    borderWidth: 1.5,
    borderColor: "#1DBF73",
  },

  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#E7F9EF",
    color: "#1DBF73",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    fontWeight: "700",
    marginBottom: 6,
    fontSize: 12,
  },

  plan: { fontWeight: "800", fontSize: 18 },
  price: { fontSize: 18, color: "#1DBF73", marginVertical: 4 },

  features: {
    color: "#666",
    marginVertical: 8,
    lineHeight: 20,
  },

  button: {
    backgroundColor: "#e7f7ec",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: { color: "#1DBF73", fontWeight: "700" },

  buttonPrimary: {
    backgroundColor: "#1DBF73",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonPrimaryText: { color: "#fff", fontWeight: "700" },
});
