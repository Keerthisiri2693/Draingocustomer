import React from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TermsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Terms & Conditions</Text>

        <Text style={styles.text}>
          This is a sample terms and conditions page. 
          In real project we will load content from backend or file.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 18 },
  header: { fontSize: 20, fontWeight: "800", marginBottom: 10 },
  text: { color: "#555", lineHeight: 20 },
});
