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
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "OTP">;

export default function OTPScreen({ navigation, route }: Props) {
  const phone = route.params?.phone || "";
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef<TextInput[]>([]);

  const handleChange = (text: string, index: number) => {
    const digit = text.replace(/[^0-9]/g, "");
    const updated = [...otp];
    updated[index] = digit;
    setOtp(updated);

    if (digit && index < 5) inputs.current[index + 1]?.focus();
    if (!digit && index > 0) inputs.current[index - 1]?.focus();
  };

  const code = otp.join("");
  const isComplete = code.length === 6;

  /* ================= VERIFY OTP ================= */
 const handleVerifyOtp = async () => {
  try {
    if (!isComplete) return;

    await AsyncStorage.setItem("LOGGED_IN", "true");

    const termsAccepted = await AsyncStorage.getItem("TERMS_ACCEPTED");
    const driverRegistered = await AsyncStorage.getItem("DRIVER_REGISTERED");
    const vehicleRegistered = await AsyncStorage.getItem("VEHICLE_REGISTERED");
    const membershipDone = await AsyncStorage.getItem("MEMBERSHIP_DONE");

    // 🔹 STEP 1: Terms
    if (termsAccepted !== "true") {
      navigation.replace("TermsConditionScreen");
      return;
    }

    // 🔹 STEP 2: Driver Registration
    if (driverRegistered !== "true") {
      navigation.replace("DriverRegistrationScreen");
      return;
    }

    // 🔹 STEP 3: Vehicle Registration
    if (vehicleRegistered !== "true") {
      navigation.replace("VehicleRegistrationScreen");
      return;
    }

    // 🔹 STEP 4: Membership
    if (membershipDone !== "true") {
      navigation.replace("MembershipScreen");
      return;
    }

    // ✅ ALL COMPLETED → GO TO LOCATION
    navigation.replace("LocationScreen");

  } catch (e) {
    Alert.alert("Error", "OTP verification failed");
  }
};


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
          {/* IMAGE */}
          <Image
            source={require("../../assets/illustrations/otp.png")}
            style={styles.image}
          />

          <Text style={styles.title}>Verify OTP</Text>

          <Text style={styles.subtitle}>
            We sent a 6-digit code to{" "}
            <Text style={styles.phone}>{phone}</Text>
          </Text>

          {/* OTP INPUTS */}
          <View style={styles.boxRow}>
            {otp.map((value, index) => (
              <TextInput
                key={index}
                ref={(el) => el && (inputs.current[index] = el)}
                style={styles.box}
                keyboardType="number-pad"
                maxLength={1}
                value={value}
                onChangeText={(text) => handleChange(text, index)}
              />
            ))}
          </View>

          {/* VERIFY BUTTON */}
          <TouchableOpacity
            style={[styles.button, !isComplete && { opacity: 0.4 }]}
            disabled={!isComplete}
            onPress={handleVerifyOtp}
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

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingBottom: 30,
  },

  image: {
    width: "90%",
    alignSelf: "center",
    height: 250,
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

  phone: {
    color: "#1DBF73",
    fontWeight: "700",
  },

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

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

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
