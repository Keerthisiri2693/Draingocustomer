import React, { useEffect, useState } from "react";
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
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as NavigationBar from "expo-navigation-bar";

export default function LoginScreen({ navigation }: any) {
  const [phone, setPhone] = useState("");

  /* ===== FORCE ANDROID NAV BAR WHITE (SAMSUNG FIX) ===== */
  useEffect(() => {
    if (Platform.OS !== "android") return;

    const applyWhiteNavBar = async () => {
      await NavigationBar.setPositionAsync("absolute"); // 🔑 KEY FIX
      await NavigationBar.setBackgroundColorAsync("#ffffff");
      await NavigationBar.setButtonStyleAsync("dark");
    };

    applyWhiteNavBar();

    const showSub = Keyboard.addListener("keyboardDidShow", applyWhiteNavBar);
    const hideSub = Keyboard.addListener("keyboardDidHide", applyWhiteNavBar);

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleLogin = () => {
    navigation.navigate("OTP", { phone: "91" + phone });
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
        <View style={styles.safe}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* IMAGE */}
            <Image
              source={require("../../assets/illustrations/login.png")}
              style={styles.image}
            />

            <Text style={styles.title}>Welcome Driver 👋</Text>
            <Text style={styles.subtitle}>
              Enter your mobile number
            </Text>

            {/* INPUT */}
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                keyboardType="phone-pad"
                maxLength={10}
                value={phone}
                onChangeText={setPhone}
                placeholder="Enter mobile number"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            {/* BUTTON */}
            <TouchableOpacity
              style={[
                styles.button,
                phone.length < 10 && { opacity: 0.4 },
              ]}
              disabled={phone.length < 10}
              onPress={handleLogin}
            >
              <Text style={styles.btnText}>Send OTP</Text>
            </TouchableOpacity>

            <Text style={styles.note}>
              You will receive a 6-digit OTP on your phone.
            </Text>
          </ScrollView>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },

  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },

  scrollContent: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 22,
    paddingTop: 60,
    paddingBottom: 24,
  },

  image: {
    width: "90%",
    height: 220,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 25,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
  },

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

  input: {
    fontSize: 16,
    color: "#111",
  },

  button: {
    backgroundColor: "#1DBF73",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 16,
  },

  btnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  note: {
    textAlign: "center",
    fontSize: 12,
    color: "#6E7C7C",
    marginTop: 10,
  },
});
