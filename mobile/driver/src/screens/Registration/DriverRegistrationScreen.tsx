import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyVehicleScreen from "./MyVehicleScreen";

const TOOLBAR_HEIGHT =
  Platform.OS === "android"
    ? 56 + (StatusBar.currentHeight ?? 0)
    : 56;

export default function DriverRegistrationScreen({
  navigation,
  route,
}: any) {
  /* =====================
     EDIT MODE
  ===================== */
  const { driver, mode } = route?.params || {};
  const isEdit = mode === "edit";

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    dob: "",
    phone: "",
    email: "",
    address: "",
    aadhar: "",
    pan: "",
    gst: "",
  });

  /* =====================
     BOOTSTRAP
  ===================== */
  useEffect(() => {
    let active = true;

    const bootstrap = async () => {
      try {
        // 🔥 EDIT MODE → prefill and skip checks
        if (isEdit && driver) {
          setForm({
            name: driver.name || "",
            dob: driver.dob || "",
            phone: driver.phone || "",
            email: driver.email || "",
            address: driver.address || "",
            aadhar: driver.aadhar || "",
            pan: driver.pan || "",
            gst: driver.gst || "",
          });

          if (active) setLoading(false);
          return;
        }

        // 🔹 ADD MODE (old logic preserved)
        const termsAccepted = await AsyncStorage.getItem("TERMS_ACCEPTED");
        const driverRegistered = await AsyncStorage.getItem(
          "DRIVER_REGISTERED"
        );

        if (driverRegistered === "true") {
          navigation.replace("VehicleRegistration");
          return;
        }

        if (termsAccepted !== "true") {
          navigation.replace("TermsConditionScreen");
          return;
        }

        if (active) setLoading(false);
      } catch (e) {
        console.log("Driver bootstrap error:", e);
        if (active) setLoading(false);
      }
    };

    bootstrap();
    return () => {
      active = false;
    };
  }, [navigation, isEdit, driver]);

  const update = (k: keyof typeof form, v: string) =>
    setForm({ ...form, [k]: v });

  const isValid =
    form.name &&
    form.dob &&
    form.phone.length === 10 &&
    form.email &&
    form.address &&
    form.aadhar.length === 12 &&
    form.pan.length >= 10;

  /* =====================
     LOADER
  ===================== */
  if (loading) {
    return (
      <SafeAreaView style={styles.loader}>
        <ActivityIndicator size="large" color="#1DBF73" />
        <Text style={styles.loadingText}>Loading…</Text>
      </SafeAreaView>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <SafeAreaView style={styles.container} edges={["bottom"]}>
        {/* ===== TOOLBAR ===== */}
        <View style={styles.toolbar}>
          <Ionicons
  name="arrow-back"
  size={22}
  color="#fff"
  onPress={() => navigation.goBack()}
/>

          <Text style={styles.toolbarTitle}>
            {isEdit ? "Edit Driver" : "Driver Onboarding"}
          </Text>
          <View style={{ width: 22 }} />
        </View>

        {/* ===== FORM ===== */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.card}>
            <Input
              label="Full Name *"
              icon="person-outline"
              value={form.name}
              onChangeText={(t) => update("name", t)}
            />

            <Input
              label="Date of Birth *"
              icon="calendar-outline"
              value={form.dob}
              onChangeText={(t) => update("dob", t)}
            />

            <Input
              label="Phone *"
              icon="call-outline"
              keyboardType="phone-pad"
              maxLength={10}
              value={form.phone}
              onChangeText={(t) => update("phone", t)}
            />

            <Input
              label="Email *"
              icon="mail-outline"
              value={form.email}
              onChangeText={(t) => update("email", t)}
            />

            <Input
              label="Address *"
              icon="location-outline"
              multiline
              style={{ height: 90, textAlignVertical: "center" }}
              value={form.address}
              onChangeText={(t) => update("address", t)}
            />

            <Input
              label="Aadhar Number *"
              icon="card-outline"
              keyboardType="numeric"
              maxLength={12}
              value={form.aadhar}
              onChangeText={(t) => update("aadhar", t)}
            />

            <Input
              label="PAN Number *"
              icon="document-text-outline"
              autoCapitalize="characters"
              value={form.pan}
              onChangeText={(t) =>
                update("pan", t.toUpperCase())
              }
            />

            <Input
              label="GST (optional)"
              icon="business-outline"
              value={form.gst}
              onChangeText={(t) => update("gst", t)}
            />
          </View>
        </ScrollView>

        {/* ===== FOOTER ===== */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.button, !isValid && { opacity: 0.4 }]}
            disabled={!isValid}
            onPress={async () => {
              // 🔥 Save updated driver
              await AsyncStorage.setItem(
                "DRIVER_PROFILE",
                JSON.stringify(form)
              );

              if (!isEdit) {
                await AsyncStorage.setItem(
                  "DRIVER_REGISTERED",
                  "true"
                );
                navigation.replace("VehicleRegistrationScreen");
              } else {
                navigation.goBack(); // 🔥 edit mode
              }
            }}
          >
            <Text style={styles.buttonText}>
              {isEdit ? "Update Driver" : "Continue →"}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

/* ===== INPUT ===== */
const Input = ({ label, icon, style, ...props }: any) => (
  <View style={{ marginBottom: 14 }}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputRow}>
      <Ionicons name={icon} size={18} color="#777" />
      <TextInput
        {...props}
        style={[styles.input, style]}
        placeholderTextColor="#999"
      />
    </View>
  </View>
);

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  loadingText: {
    marginTop: 10,
    color: "#888",
  },

  toolbar: {
    height: TOOLBAR_HEIGHT,
    paddingTop:
      Platform.OS === "android"
        ? StatusBar.currentHeight
        : 0,
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

  scrollContent: { paddingBottom: 16 },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginTop: 16,
    marginHorizontal: 16,
    elevation: 3,
  },

  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#444",
    marginBottom: 6,
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: "#222",
  },

  footer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },

  button: {
    backgroundColor: "#1DBF73",
    height: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
  },
});
