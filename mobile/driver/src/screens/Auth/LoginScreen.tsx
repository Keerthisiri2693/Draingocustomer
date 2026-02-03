import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

export default function LoginScreen({ navigation }: any) {
  const [phone, setPhone] = useState("");

  const handleLogin = () => {
    const finalNumber = "91" + phone;   // 👈 still sends 91
    navigation.navigate("OTP", { phone: finalNumber });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {/* Bigger Illustration */}
        <Image
          source={require("../../assets/illustrations/login.png")}
          style={styles.image}
        />

        <Text style={styles.title}>Welcome Driver 👋</Text>
        <Text style={styles.subtitle}>Enter your mobile number</Text>

        {/* Only phone — no +91 visible */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            maxLength={10}
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter mobile number"
          />
        </View>

        <TouchableOpacity
          style={[styles.button, phone.length < 10 && { opacity: 0.4 }]}
          disabled={phone.length < 10}
          onPress={handleLogin}
        >
          <Text style={styles.btnText}>Send OTP</Text>
        </TouchableOpacity>

        <Text style={styles.note}>
          You will receive a 6-digit OTP on your phone.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 22,
    backgroundColor: "#fff",
  },

  image: {
    width: "90%",
    alignSelf: "center",
    height: 220,          // 👈 bigger image
    resizeMode: "contain",
    marginBottom: 25,
  },

  title: { fontSize: 22, fontWeight: "800", textAlign: "center" },

  subtitle: {
    color: "#6E7C7C",
    textAlign: "center",
    marginBottom: 20,
  },

  inputRow: {
    backgroundColor: "#F8F9FA",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },

  input: { fontSize: 16 },

  button: {
    backgroundColor: "#1DBF73",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 16,
  },

  btnText: { color: "#fff", fontWeight: "700", fontSize: 16 },

  note: {
    textAlign: "center",
    fontSize: 12,
    color: "#6E7C7C",
    marginTop: 10,
  },
});
