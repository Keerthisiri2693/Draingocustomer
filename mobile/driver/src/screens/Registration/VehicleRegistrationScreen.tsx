import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "VehicleRegistration"
>;

const VEHICLE_TYPES = ["Lorry", "Tractor",];

export default function VehicleRegistrationScreen({ navigation }: Props) {
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

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <Text style={styles.header}>Vehicle Registration</Text>

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

            {/* MODEL */}
            <Text style={styles.label}>Vehicle Model *</Text>
            <TextInput
              placeholder="Example: Tata 1613"
              style={styles.input}
              value={form.model}
              onChangeText={(t) => update("model", t)}
            />

            {/* TANK */}
            <Text style={styles.label}>Tank Capacity (Litres) *</Text>
            <TextInput
              placeholder="Example: 5000"
              keyboardType="numeric"
              style={styles.input}
              value={form.tank}
              onChangeText={(t) => update("tank", t)}
            />

            {/* VEHICLE NUMBER */}
            <Text style={styles.label}>Vehicle Number *</Text>
            <TextInput
              placeholder="TN XX AB XXXX"
              style={styles.input}
              value={form.number}
              onChangeText={(t) => update("number", t)}
            />

            {/* PRICE DETAILS */}
            <Text style={styles.section}>Price Details</Text>

            <Text style={styles.label}>Base Price (₹) *</Text>
            <TextInput
              placeholder="Example: 500"
              keyboardType="numeric"
              style={styles.input}
              value={form.basePrice}
              onChangeText={(t) => update("basePrice", t)}
            />

            <Text style={styles.label}>Price per 1000 Litres (₹) *</Text>
            <TextInput
              placeholder="Example: 700"
              keyboardType="numeric"
              style={styles.input}
              value={form.pricePer1000}
              onChangeText={(t) => update("pricePer1000", t)}
            />

            {/* DOCUMENTS */}
            <Text style={styles.section}>
              Vehicle Documents (RC, Insurance, Number Plate)
            </Text>

            <TouchableOpacity
              style={styles.uploadBtn}
              onPress={() => update("docsUploaded", true)}
            >
              <Text style={{ fontWeight: "600" }}>
                {form.docsUploaded ? "Uploaded ✓" : "Upload documents"}
              </Text>
            </TouchableOpacity>

            {/* PHOTOS */}
            <Text style={styles.section}>Vehicle Photos (4 sides)</Text>

            <TouchableOpacity
              style={styles.uploadBtn}
              onPress={() => update("photosUploaded", true)}
            >
              <Text style={{ fontWeight: "600" }}>
                {form.photosUploaded ? "Uploaded ✓" : "Upload photos"}
              </Text>
            </TouchableOpacity>

            {/* TERMS */}
            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => update("accepted", !form.accepted)}
            >
              <View
                style={[styles.checkbox, form.accepted && styles.checked]}
              />
              <Text style={styles.checkboxText}>
                I accept the Terms & Conditions
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.button, !isValid && { opacity: 0.4 }]}
            disabled={!isValid}
            onPress={() => navigation.navigate("VerificationPending")}
          >
            <Text style={styles.buttonText}>Verify</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f7f6",
    paddingHorizontal: 16,
  },

  header: {
    fontSize: 22,
    fontWeight: "800",
    marginTop: 10,
    marginBottom: 12,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    elevation: 2,
  },

  label: {
    marginTop: 10,
    marginBottom: 6,
    fontWeight: "600",
    color: "#333",
  },

  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    height: 48,
  },

  section: {
    marginTop: 14,
    marginBottom: 6,
    fontWeight: "800",
  },

  typeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  typeBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    marginRight: 8,
    backgroundColor: "#f9fafb",
  },

  typeBtnActive: {
    backgroundColor: "#1DBF73",
    borderColor: "#1DBF73",
  },

  typeText: {
    fontWeight: "600",
    color: "#333",
  },

  typeTextActive: {
    color: "#fff",
  },

  uploadBtn: {
    borderWidth: 1,
    borderColor: "#bfc5d2",
    borderRadius: 10,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    backgroundColor: "#f8f9fb",
  },

  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: "#777",
    borderRadius: 4,
    marginRight: 10,
  },

  checked: { backgroundColor: "#1DBF73" },

  checkboxText: { color: "#333" },

  button: {
    backgroundColor: "#1DBF73",
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
    marginBottom: 30,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
