import React, { useRef, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "OTP">;

export default function OTPScreen({ navigation, route }: Props) {
  const phone = route.params?.phone || "";
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef<TextInput[]>([]);

  const handleChange = (text: string, index: number) => {
    const formatted = text.replace(/[^0-9]/g, "");
    const updated = [...otp];
    updated[index] = formatted;
    setOtp(updated);

    if (formatted && index < 5) inputs.current[index + 1]?.focus();
    if (!formatted && index > 0) inputs.current[index - 1]?.focus();
  };

  const code = otp.join("");
  const isComplete = code.length === 6;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          {/* BIGGER IMAGE */}
          <Image
            source={require("../../assets/illustrations/otp.png")}
            style={styles.image}
          />

          <Text style={styles.title}>Verify OTP</Text>

          <Text style={styles.subtitle}>
            We sent a 6-digit code to{" "}
            <Text style={styles.phone}>{phone}</Text>
          </Text>

          {/* OTP Inputs */}
          <View style={styles.boxRow}>
            {otp.map((value, index) => (
              <TextInput
                key={index}
                ref={(el) => {
                  if (el) inputs.current[index] = el;
                }}
                style={styles.box}
                keyboardType="number-pad"
                maxLength={1}
                value={value}
                onChangeText={(text) => handleChange(text, index)}
              />
            ))}
          </View>

          <TouchableOpacity
            style={[styles.button, !isComplete && { opacity: 0.4 }]}
            disabled={!isComplete}
            onPress={() => navigation.replace("DriverRegistration")}
          >
            <Text style={styles.buttonText}>Verify</Text>
          </TouchableOpacity>

          <Text style={styles.resend}>
            Didn’t get the code?{" "}
            <Text style={styles.resendLink}>Resend</Text>
          </Text>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingBottom: 30,
  },

  image: {
    width: "90%",
    alignSelf: "center",
    height: 250,          // 👈 bigger image
    resizeMode: "contain",
    marginTop: 10,
    marginBottom: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 5,
  },

  subtitle: {
    textAlign: "center",
    color: "#6E7C7C",
    marginTop: 6,
    marginBottom: 18,
  },

  phone: { color: "#1DBF73", fontWeight: "700" },

  boxRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  box: {
    width: 52,
    height: 52,
    borderWidth: 1.5,
    borderColor: "#d1d5db",
    borderRadius: 12,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
  },

  button: {
    backgroundColor: "#1DBF73",
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },

  resend: {
    textAlign: "center",
    marginTop: 14,
    color: "#6B7280",
  },

  resendLink: {
    color: "#1DBF73",
    fontWeight: "700",
  },
});
