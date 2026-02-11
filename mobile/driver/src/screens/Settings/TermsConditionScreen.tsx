import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TOOLBAR_HEIGHT =
  Platform.OS === "android"
    ? 56 + (StatusBar.currentHeight ?? 0)
    : 56;

export default function TermsConditionScreen() {
  const navigation = useNavigation<any>();

  const [hasScrolledEnd, setHasScrolledEnd] = useState(false);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(true);

  /* =====================
     CHECK IF ALREADY ACCEPTED
  ===================== */
useEffect(() => {
  const checkTerms = async () => {
    try {
      const accepted = await AsyncStorage.getItem("TERMS_ACCEPTED");

      if (accepted === "true") {
        navigation.replace("DriverRegistrationScreen"); // ✅ SAME SCREEN
        return;
      }

      setLoading(false);
    } catch (e) {
      console.log("Terms check error:", e);
      setLoading(false);
    }
  };

  checkTerms();
}, []);


  /* =====================
     ACCEPT HANDLER
  ===================== */
const handleAccept = async () => {
  try {
    await AsyncStorage.setItem("TERMS_ACCEPTED", "true");

    navigation.replace("DriverRegistrationScreen");
  } catch (e) {
    console.log("Error saving terms acceptance", e);
  }
};

  /* =====================
     LOADING STATE
  ===================== */
  if (loading) {
    return (
      <SafeAreaView style={styles.loader}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <ActivityIndicator size="large" color="#1DBF73" />
        <Text style={styles.loadingText}>Loading…</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      {/* ===== TOOLBAR ===== */}
      <View style={styles.toolbar}>
        <View style={{ width: 22 }} />
        <Text style={styles.toolbarTitle}>Terms & Conditions</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* ===== CONTENT ===== */}
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        onScroll={({ nativeEvent }) => {
          const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
          if (
            layoutMeasurement.height + contentOffset.y >=
            contentSize.height - 40
          ) {
            setHasScrolledEnd(true);
          }
        }}
        scrollEventThrottle={16}
      >
        <Section
          title="1. Acceptance of Terms"
          text="By registering and using this application, you agree to comply with and be bound by these Terms & Conditions."
        />
        <Section
          title="2. Driver Responsibilities"
          text="Drivers must provide accurate personal, vehicle, and KYC details and ensure safe, lawful service."
        />
        <Section
          title="3. Job Acceptance & Cancellation"
          text="Accepted jobs must be completed professionally. Repeated cancellations may lead to suspension."
        />
        <Section
          title="4. Payments & Earnings"
          text="Earnings are subject to service fees, taxes, and deductions as applicable."
        />
        <Section
          title="5. KYC & Verification"
          text="Incomplete or invalid documents may lead to suspension or termination."
        />

        <Text style={styles.footerText}>
          Last updated: September 2024
        </Text>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* ===== BOTTOM BAR ===== */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.checkboxRow}
          disabled={!hasScrolledEnd}
          onPress={() => setChecked(!checked)}
        >
          <Ionicons
            name={checked ? "checkbox" : "square-outline"}
            size={22}
            color={hasScrolledEnd ? "#1DBF73" : "#ccc"}
          />
          <Text
            style={[
              styles.checkboxText,
              !hasScrolledEnd && { color: "#aaa" },
            ]}
          >
            I have read and agree to the Terms & Conditions
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.acceptBtn,
            !(checked && hasScrolledEnd) && styles.disabledBtn,
          ]}
          disabled={!(checked && hasScrolledEnd)}
          onPress={handleAccept}
        >
          <Ionicons name="checkmark-circle" size={20} color="#fff" />
          <Text style={styles.acceptText}>Accept & Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/* ===== SECTION ===== */
const Section = ({ title, text }: { title: string; text: string }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Text style={styles.sectionText}>{text}</Text>
  </View>
);

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F6F8" },

  loader: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: "#888",
  },

  toolbar: {
    height: TOOLBAR_HEIGHT,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#1DBF73",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  toolbarTitle: { color: "#fff", fontSize: 16, fontWeight: "800" },

  content: { padding: 16 },

  section: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    elevation: 2,
  },

  sectionTitle: { fontSize: 15, fontWeight: "800", marginBottom: 6 },
  sectionText: { fontSize: 13, color: "#555", lineHeight: 20 },

  footerText: {
    marginTop: 16,
    textAlign: "center",
    fontSize: 12,
    color: "#999",
    fontWeight: "600",
  },

  bottomBar: {
    backgroundColor: "#fff",
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#eee",
  },

  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 10,
  },

  checkboxText: { fontSize: 13, fontWeight: "600", flex: 1 },

  acceptBtn: {
    backgroundColor: "#1DBF73",
    paddingVertical: 14,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  disabledBtn: { backgroundColor: "#A5D6C3" },

  acceptText: { color: "#fff", fontWeight: "800", fontSize: 15 },
});
