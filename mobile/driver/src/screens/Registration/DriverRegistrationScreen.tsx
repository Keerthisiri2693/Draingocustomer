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
  "DriverRegistration"
>;

export default function DriverRegistrationScreen({ navigation }: Props) {
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

  const update = (k: keyof typeof form, v: string) =>
    setForm({ ...form, [k]: v });

  const isValid =
    form.name &&
    form.dob &&
    form.phone &&
    form.email &&
    form.address &&
    form.aadhar &&
    form.pan;

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
          <Text style={styles.header}>Driver Registration</Text>

          {/* Form Card */}
          <View style={styles.card}>
            {/* Name */}
            <Text style={styles.label}>Full Name *</Text>
            <TextInput
              placeholder="Enter your name"
              style={styles.input}
              value={form.name}
              onChangeText={(t) => update("name", t)}
            />

            {/* DOB */}
            <Text style={styles.label}>Date of Birth *</Text>
            <TextInput
              placeholder="DD/MM/YYYY"
              style={styles.input}
              value={form.dob}
              onChangeText={(t) => update("dob", t)}
            />

            {/* Phone */}
            <Text style={styles.label}>Phone *</Text>
            <TextInput
              placeholder="Mobile number"
              keyboardType="phone-pad"
              style={styles.input}
              value={form.phone}
              onChangeText={(t) => update("phone", t)}
            />

            {/* Email */}
            <Text style={styles.label}>Email *</Text>
            <TextInput
              placeholder="Email address"
              keyboardType="email-address"
              style={styles.input}
              value={form.email}
              onChangeText={(t) => update("email", t)}
            />

            {/* Address */}
            <Text style={styles.label}>Address *</Text>
            <TextInput
              placeholder="Complete address"
              style={[styles.input, { height: 90 }]}
              multiline
              value={form.address}
              onChangeText={(t) => update("address", t)}
            />

            {/* Aadhar */}
            <Text style={styles.label}>Aadhar Number *</Text>
            <TextInput
              placeholder="XXXX XXXX XXXX"
              keyboardType="numeric"
              style={styles.input}
              value={form.aadhar}
              onChangeText={(t) => update("aadhar", t)}
            />

            {/* PAN */}
            <Text style={styles.label}>PAN Number *</Text>
            <TextInput
              placeholder="ABCDE1234F"
              style={styles.input}
              value={form.pan}
              onChangeText={(t) => update("pan", t)}
            />

            {/* GST */}
            <Text style={styles.label}>GST (optional)</Text>
            <TextInput
              placeholder="GST number"
              style={styles.input}
              value={form.gst}
              onChangeText={(t) => update("gst", t)}
            />
          </View>

          <TouchableOpacity
            style={[styles.button, !isValid && { opacity: 0.4 }]}
            disabled={!isValid}
            onPress={() => navigation.navigate("VehicleRegistration")}
          >
            <Text style={styles.buttonText}>Next</Text>
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
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },

  label: {
    marginTop: 8,
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

  button: {
    backgroundColor: "#1DBF73",
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
  },

  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
