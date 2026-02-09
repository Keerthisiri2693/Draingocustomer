import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../theme/colors";

export default function RegisterScreen({ navigation }: any) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onRegister = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log(name, phone, email, password);
  };

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <LinearGradient
        colors={[colors.primaryDark, colors.primary]}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Create Account</Text>
        <Text style={styles.headerSub}>Register to continue</Text>
      </LinearGradient>

      {/* WHITE CARD */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        <View style={styles.sheet}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollContent}
          >
            <Input placeholder="Full Name" value={name} onChangeText={setName} />

            <Input
              placeholder="Phone Number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />

            <Input
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <PasswordInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
            />

            <PasswordInput
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            <TouchableOpacity
              style={styles.primaryBtn}
              activeOpacity={0.8}
              onPress={onRegister}
            >
              <Text style={styles.primaryText}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.loginRow}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.loginText}>
                Already have an account?{" "}
                <Text style={styles.loginLink}>Login</Text>
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* ---------- INPUTS ---------- */

const Input = (props: any) => (
  <View style={styles.inputBox}>
    <TextInput
      {...props}
      placeholderTextColor={colors.gray}
      style={styles.input}
    />
  </View>
);

const PasswordInput = ({ value, onChangeText, placeholder }: any) => {
  const [secure, setSecure] = useState(true);

  return (
    <View style={styles.inputBoxRow}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secure}
        placeholderTextColor={colors.gray}
        style={styles.inputFlex}
      />

      <TouchableOpacity onPress={() => setSecure(!secure)}>
        <Ionicons
          name={secure ? "eye-off-outline" : "eye-outline"}
          size={22}
          color={colors.gray}
        />
      </TouchableOpacity>
    </View>
  );
};

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.primaryDark,
  },

  header: {
    height: "35%",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.white,
  },

  headerSub: {
    fontSize: 14,
    marginTop: 6,
    color: colors.white,
    opacity: 0.9,
  },

  sheet: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    marginTop: -20,
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: 80, // 🔥 important for keyboard
  },

  inputBox: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 50,
    justifyContent: "center",
    marginBottom: 14,
  },

  inputBoxRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 50,
    marginBottom: 14,
  },

  input: {
    fontSize: 15,
    color: colors.black,
  },

  inputFlex: {
    flex: 1,
    fontSize: 15,
    color: colors.black,
  },

  primaryBtn: {
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  primaryText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },

  loginRow: {
    alignItems: "center",
    marginTop: 18,
  },

  loginText: {
    color: colors.gray,
    fontSize: 14,
  },

  loginLink: {
    color: colors.primary,
    fontWeight: "600",
  },
});
