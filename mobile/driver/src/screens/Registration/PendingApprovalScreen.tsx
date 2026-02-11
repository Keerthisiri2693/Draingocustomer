import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Platform,
  StatusBar,
  Animated,
  Easing,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const TOOLBAR_HEIGHT =
  Platform.OS === "android"
    ? 56 + (StatusBar.currentHeight ?? 0)
    : 56;

export default function PendingApprovalScreen({ navigation }: any) {
  const [dotText, setDotText] = useState("");

  /* ===== ANIMATIONS ===== */
  const pulse = useRef(new Animated.Value(1)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(30)).current;
  const dots = useRef(new Animated.Value(0)).current;

  /* ================= UI ANIMATIONS ================= */
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.08,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 2600,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slide, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  /* ===== DOT ANIMATION ===== */
  useEffect(() => {
    const listener = dots.addListener(({ value }) => {
      const count = Math.floor(value);
      setDotText(".".repeat(count));
    });

    Animated.loop(
      Animated.sequence([
        Animated.timing(dots, {
          toValue: 3,
          duration: 900,
          useNativeDriver: false,
        }),
        Animated.timing(dots, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false,
        }),
      ])
    ).start();

    return () => dots.removeListener(listener);
  }, []);

  /* ================= MEMBERSHIP STATUS CHECK ================= */
  useEffect(() => {
    const interval = setInterval(checkApproval, 3000);
    checkApproval();
    return () => clearInterval(interval);
  }, []);

  const checkApproval = async () => {
    try {
      const status = await AsyncStorage.getItem("MEMBERSHIP_STATUS");

      if (status === "APPROVED") {
        navigation.replace("LocationScreen");
      }
    } catch (e) {}
  };

  /* ================= LOGOUT ================= */
  const logout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.multiRemove([
            "LOGGED_IN",
          
          ]);
          navigation.replace("LoginScreen");
        },
      },
    ]);
  };

  const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <LinearGradient
        colors={["#1DBF73", "#17A965"]}
        style={styles.toolbar}
      >
        <Text style={styles.toolbarTitle}>Approval Pending</Text>
      </LinearGradient>

      <Animated.View
        style={[
          styles.content,
          { opacity: fade, transform: [{ translateY: slide }] },
        ]}
      >
        <View style={styles.card}>
          <Animated.View
            style={[
              styles.illustration,
              { transform: [{ scale: pulse }] },
            ]}
          >
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
              <Ionicons
                name="hourglass-outline"
                size={40}
                color="#1DBF73"
              />
            </Animated.View>
          </Animated.View>

          <Text style={styles.title}>
            We’re Reviewing Your Membership
          </Text>

          <Text style={styles.subtitle}>
            Our admin team is reviewing your details.
            {"\n\n"}
            Please wait for approval.
          </Text>

          <View style={styles.statusBox}>
            <ActivityIndicator size="small" color="#1DBF73" />
            <Text style={styles.statusText}>
              Checking approval status{dotText}
            </Text>
          </View>

          <Text style={styles.micro}>
            🔔 You will be redirected automatically once approved
          </Text>
        </View>
      </Animated.View>

      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Ionicons name="log-out-outline" size={18} color="#e74c3c" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7F6",
  },

  toolbar: {
    height: TOOLBAR_HEIGHT,
    paddingTop:
      Platform.OS === "android" ? StatusBar.currentHeight : 0,
    justifyContent: "center",
    alignItems: "center",
  },

  toolbarTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 28,
    alignItems: "center",
    elevation: 4,
  },

  illustration: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: "#E7F9EF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#222",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
    marginTop: 12,
    lineHeight: 20,
  },

  statusBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E7F9EF",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 22,
    marginTop: 24,
  },

  statusText: {
    marginLeft: 6,
    color: "#1DBF73",
    fontWeight: "700",
    fontSize: 12,
  },

  micro: {
    marginTop: 14,
    fontSize: 12,
    color: "#777",
    textAlign: "center",
  },

  logoutBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
    borderTopWidth: 1,
    marginHorizontal: 20,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },

  logoutText: {
    marginLeft: 6,
    color: "#e74c3c",
    fontWeight: "700",
  },
});
