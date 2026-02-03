import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VerificationPendingScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../assets/illustrations/verify.png")}
        style={styles.image}
      />

      <Text style={styles.title}>Verification in Progress</Text>

      <Text style={styles.subtitle}>
        Our team is reviewing your documents.{"\n"}
        Please select a membership plan to continue.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace("Membership")}
      >
        <Text style={styles.buttonText}>Select Membership</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },

  image: {
    width: "85%",
    height: 230,
    resizeMode: "contain",
    marginBottom: 18,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
  },

  subtitle: {
    color: "#6E7C7C",
    textAlign: "center",
    marginVertical: 10,
    lineHeight: 20,
  },

  button: {
    backgroundColor: "#1DBF73",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 14,
    marginTop: 12,
  },

  buttonText: { color: "#fff", fontWeight: "700" },
});
