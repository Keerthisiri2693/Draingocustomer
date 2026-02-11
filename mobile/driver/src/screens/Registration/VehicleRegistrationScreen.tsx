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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "VehicleRegistration"
>;

const VEHICLE_TYPES = ["Lorry", "Tractor"];

const TOOLBAR_HEIGHT =
  Platform.OS === "android"
    ? 56 + (StatusBar.currentHeight ?? 0)
    : 56;

export default function VehicleRegistrationScreen({
  navigation,
  route,
}: Props) {
  const { vehicle, isEdit } = route.params || {};

  const [vehicleCount, setVehicleCount] = useState(0);
  const [role, setRole] = useState<"DRIVER" | "OWNER">("DRIVER");

  const [form, setForm] = useState({
    type: "",
    model: "",
    tank: "",
    number: "",
    basePrice: "",
    pricePer1000: "",
    docsUploaded: false,
    photosUploaded: false,
    accepted: false,
  });

  /* ===== LOAD VEHICLE COUNT & ROLE ===== */
  useEffect(() => {
    const loadRole = async () => {
      const countStr = await AsyncStorage.getItem("VEHICLE_COUNT");
      const count = countStr ? Number(countStr) : 0;

      setVehicleCount(count);
      setRole(count === 0 ? "DRIVER" : "OWNER");
    };

    loadRole();
  }, []);

  /* ===== PREFILL FORM (EDIT MODE) ===== */
  useEffect(() => {
    if (isEdit && vehicle) {
      setForm({
        type: vehicle.type || "",
        model: vehicle.model || "",
        tank: vehicle.tank || "",
        number: vehicle.number || "",
        basePrice: vehicle.basePrice || "",
        pricePer1000: vehicle.pricePer1000 || "",
        docsUploaded: true,
        photosUploaded: true,
        accepted: true,
      });
    }
  }, [isEdit, vehicle]);

  const update = (k: keyof typeof form, v: any) =>
    setForm({ ...form, [k]: v });

  const isValid =
    form.type &&
    form.model &&
    form.tank &&
    form.number &&
    form.basePrice &&
    form.pricePer1000 &&
    form.docsUploaded &&
    form.photosUploaded &&
    form.accepted;

  /* ===== SUBMIT VEHICLE ===== */
  const submitVehicle = async () => {
    if (isEdit) {
      alert("Vehicle updated successfully 🚛");
      navigation.goBack();
      return;
    }

    const newCount = vehicleCount + 1;
    const newRole = newCount > 1 ? "OWNER" : "DRIVER";

    await AsyncStorage.setItem("VEHICLE_COUNT", String(newCount));
    await AsyncStorage.setItem("USER_ROLE", newRole);
    await AsyncStorage.setItem("VEHICLE_REGISTERED", "true");

    navigation.navigate("VerificationPending");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <SafeAreaView style={styles.container} edges={["bottom"]}>
        {/* ===== TOOLBAR ===== */}
        <View style={styles.toolbar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.toolbarTitle}>
            {isEdit ? "Edit Vehicle" : "Vehicle Registration"}
          </Text>

          {vehicleCount > 0 && !isEdit ? (
            <TouchableOpacity
              onPress={() => navigation.navigate("VehicleListScreen")}
              style={styles.viewBtn}
            >
              <Ionicons name="car-outline" size={20} color="#fff" />
            </TouchableOpacity>
          ) : (
            <View style={{ width: 22 }} />
          )}
        </View>

        {/* ===== ROLE BADGE ===== */}
        {!isEdit && (
          <View style={styles.roleWrapper}>
            <View
              style={[
                styles.roleBadge,
                role === "OWNER" && styles.ownerBadge,
              ]}
            >
              <Text
                style={[
                  styles.roleText,
                  role === "OWNER" && styles.ownerText,
                ]}
              >
                {role === "OWNER" ? "Vehicle Owner" : "Driver"}
              </Text>
            </View>
          </View>
        )}

        {/* ===== FORM ===== */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.card}>
            {/* VEHICLE TYPE */}
            <Text style={styles.label}>Vehicle Type *</Text>
            <View style={styles.typeRow}>
              {VEHICLE_TYPES.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.typeBtn,
                    form.type === item && styles.typeBtnActive,
                  ]}
                  onPress={() => update("type", item)}
                >
                  <Text
                    style={[
                      styles.typeText,
                      form.type === item && styles.typeTextActive,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Vehicle Model *</Text>
            <TextInput
              style={styles.input}
              value={form.model}
              onChangeText={(t) => update("model", t)}
            />

            <Text style={styles.label}>Tank Capacity (Litres) *</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={form.tank}
              onChangeText={(t) => update("tank", t)}
            />

            <Text style={styles.label}>Vehicle Number *</Text>
            <TextInput
              style={styles.input}
              editable={!isEdit}
              value={form.number}
              onChangeText={(t) => update("number", t)}
            />

            {/* PRICE */}
            <Text style={styles.section}>Price Details</Text>

            <Text style={styles.label}>Base Price (₹) *</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={form.basePrice}
              onChangeText={(t) => update("basePrice", t)}
            />

            <Text style={styles.label}>
              Price per 1000 Litres (₹) *
            </Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={form.pricePer1000}
              onChangeText={(t) => update("pricePer1000", t)}
            />

            {/* 📄 VEHICLE DOCUMENTS */}
            <Text style={styles.section}>Vehicle Documents</Text>
            <TouchableOpacity
              style={styles.uploadBtn}
              onPress={() => update("docsUploaded", true)}
            >
              <Ionicons
                name="document-text-outline"
                size={18}
                color="#1DBF73"
              />
              <Text style={styles.uploadText}>
                {form.docsUploaded
                  ? "Documents uploaded ✓"
                  : "Upload documents"}
              </Text>
            </TouchableOpacity>

            {/* 🖼 VEHICLE PHOTOS */}
            <Text style={styles.section}>Vehicle Photos</Text>
            <TouchableOpacity
              style={styles.uploadBtn}
              onPress={() => update("photosUploaded", true)}
            >
              <Ionicons
                name="image-outline"
                size={18}
                color="#1DBF73"
              />
              <Text style={styles.uploadText}>
                {form.photosUploaded
                  ? "Photos uploaded ✓"
                  : "Upload photos"}
              </Text>
            </TouchableOpacity>

            {/* TERMS */}
            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => update("accepted", !form.accepted)}
            >
              <View
                style={[
                  styles.checkbox,
                  form.accepted && styles.checked,
                ]}
              />
              <Text style={styles.checkboxText}>
                I accept the Terms & Conditions
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* ===== FOOTER ===== */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.button, !isValid && { opacity: 0.4 }]}
            disabled={!isValid}
            onPress={submitVehicle}
          >
            <Text style={styles.buttonText}>
              {isEdit ? "Update Vehicle" : "Verify"}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

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

  viewBtn: { padding: 6 },

  roleWrapper: { paddingHorizontal: 16, paddingTop: 12 },

  roleBadge: {
    backgroundColor: "#E7F9EF",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },

  ownerBadge: { backgroundColor: "#FFF3CD" },

  roleText: { fontSize: 12, fontWeight: "700", color: "#1DBF73" },
  ownerText: { color: "#856404" },

  scrollContent: { paddingVertical: 16 },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    elevation: 2,
  },

  label: { marginTop: 10, marginBottom: 6, fontWeight: "600" },

  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 48,
  },

  section: { marginTop: 16, marginBottom: 8, fontWeight: "800" },

  typeRow: { flexDirection: "row", marginBottom: 10 },

  typeBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
    marginRight: 8,
    backgroundColor: "#f9fafb",
  },

  typeBtnActive: { backgroundColor: "#1DBF73", borderColor: "#1DBF73" },
  typeText: { fontWeight: "700", color: "#333" },
  typeTextActive: { color: "#fff" },

  uploadBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#bfc5d2",
    borderRadius: 12,
    height: 46,
    justifyContent: "center",
    marginBottom: 12,
    backgroundColor: "#f8f9fb",
  },

  uploadText: { fontWeight: "600", color: "#333" },

  checkboxRow: { flexDirection: "row", alignItems: "center", marginTop: 10 },

  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: "#777",
    borderRadius: 4,
    marginRight: 10,
  },

  checked: { backgroundColor: "#1DBF73", borderColor: "#1DBF73" },

  footer: { padding: 16, backgroundColor: "#fff" },

  button: {
    backgroundColor: "#1DBF73",
    height: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: { color: "#fff", fontWeight: "800", fontSize: 16 },
});
