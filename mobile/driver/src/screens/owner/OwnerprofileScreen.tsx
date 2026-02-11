import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
  Alert, ScrollView,  
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "../../../i18n";
import { useTransition } from "react";
import { useTranslation } from "react-i18next";

const TOOLBAR_HEIGHT =
  Platform.OS === "android"
    ? 56 + (StatusBar.currentHeight ?? 0)
    : 56;

/* 🌐 LANGUAGES */
const LANGUAGES = [
  { id: "en", label: "English" },
  { id: "ta", label: "தமிழ்" },
  { id: "te", label: "Telugu" },
  { id: "ml", label: "Malayalam" },
  { id: "kn", label: "Kannada" },
  { id: "hi", label: "Hindi" },
];

export default function OwnerProfileScreen({ navigation }: any) {
  const [showLanguages, setShowLanguages] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");

  const {t} =useTranslation();
  /* ===== LOAD LANGUAGE ===== */
  useEffect(() => {
    const loadLang = async () => {
      const saved = await AsyncStorage.getItem("APP_LANG");
      if (saved) setCurrentLang(saved);
    };
    loadLang();
  }, []);

  /* ===== LOGOUT ===== */
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

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      {/* ===== TOOLBAR ===== */}
      <View style={styles.toolbar}>
        <Ionicons
          name="arrow-back"
          size={22}
          color="#fff"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.toolbarTitle}>{t("ownername")}</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView
    contentContainerStyle={{ paddingBottom: 40 }}
    showsVerticalScrollIndicator={false}
  >

      {/* ===== PROFILE CARD ===== */}
      <View style={styles.profileCard}>
        <Ionicons name="person-circle-outline" size={90} color="#1DBF73" />
        <Text style={styles.name}>Ravi Transport</Text>
        <Text style={styles.subText}>{t("vehicleowner")}</Text>

        <View style={styles.badge}>
          <Ionicons name="checkmark-circle" size={14} color="#1DBF73" />
          <Text style={styles.badgeText}>Active Subscription</Text>
        </View>
      </View>

      {/* ===== INFO ===== */}
      <View style={styles.infoCard}>
        <InfoRow icon="call-outline" label="Phone" value="9876543210" />
        <InfoRow icon="mail-outline" label="Email" value="owner@email.com" />
        <InfoRow icon="location-outline" label="City" value="Hyderabad" />
      </View>

      {/* ===== ACTIONS ===== */}
      <View style={styles.actions}>
        <ActionBtn
          icon="create-outline"
          text="Edit Profile"
          onPress={() => navigation.navigate("OwnerEditProfileScreen")}
        />

        <ActionBtn
          icon="wallet-outline"
          text="Earnings"
          onPress={() => navigation.navigate("OwnerEarningsScreen")}
        />

        {/* 🌐 CHANGE LANGUAGE */}
        <ActionBtn
          icon="language-outline"
          text="Change Language"
          onPress={() => setShowLanguages(!showLanguages)}
        />

        {/* 🌐 LANGUAGE CHIPS */}
        {showLanguages && (
          <View style={styles.langWrap}>
            {LANGUAGES.map((lang) => {
              const active = currentLang === lang.id;
              return (
                <TouchableOpacity
                  key={lang.id}
                  style={[
                    styles.langChip,
                    active && styles.langChipActive,
                  ]}
                  onPress={async () => {
                    setCurrentLang(lang.id);
                    await AsyncStorage.setItem("APP_LANG", lang.id);
                    await AsyncStorage.setItem("LANGUAGE_SELECTED", "true");
                    if (i18n?.changeLanguage) {
                      await i18n.changeLanguage(lang.id);
                    }
                  }}
                >
                  <Text
                    style={[
                      styles.langText,
                      active && styles.langTextActive,
                    ]}
                  >
                    {lang.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        <ActionBtn
          icon="document-text-outline"
          text="Subscription Details"
          onPress={() =>
            navigation.navigate("SubscriptionHistoryScreen")
          }
        />

        <ActionBtn
          icon="log-out-outline"
          text="Logout"
          danger
          onPress={logout}
        />

        
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ================= COMPONENTS ================= */

const InfoRow = ({ icon, label, value }: any) => (
  <View style={styles.infoRow}>
    <Ionicons name={icon} size={18} color="#1DBF73" />
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const ActionBtn = ({ icon, text, onPress, danger }: any) => (
  <TouchableOpacity
    style={[
      styles.actionBtn,
      danger && { backgroundColor: "#fdecea" },
    ]}
    onPress={onPress}
  >
    <Ionicons
      name={icon}
      size={18}
      color={danger ? "#e74c3c" : "#1DBF73"}
    />
    <Text
      style={[
        styles.actionText,
        danger && { color: "#e74c3c" },
      ]}
    >
      {text}
    </Text>
  </TouchableOpacity>
);

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F7F6" },

  toolbar: {
    height: TOOLBAR_HEIGHT,
    paddingTop:
      Platform.OS === "android" ? StatusBar.currentHeight : 0,
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

  profileCard: {
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 20,
    alignItems: "center",
    paddingVertical: 24,
    elevation: 3,
  },

  name: { fontSize: 18, fontWeight: "800", marginTop: 8 },
  subText: { fontSize: 13, color: "#666" },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E7F9EF",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 14,
    marginTop: 8,
  },

  badgeText: {
    marginLeft: 6,
    fontSize: 12,
    fontWeight: "700",
    color: "#1DBF73",
  },

  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginHorizontal: 16,
    padding: 16,
    elevation: 2,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  infoLabel: {
    marginLeft: 10,
    fontSize: 13,
    color: "#666",
    width: 80,
  },

  infoValue: { fontSize: 13, fontWeight: "700" },

  actions: {
    marginHorizontal: 16,
    marginTop: 10,
  },

  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    marginBottom: 10,
    elevation: 2,
  },

  actionText: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "700",
    color: "#1DBF73",
  },

  /* 🌐 LANGUAGE CHIPS */
  langWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },

  langChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#E7F9EF",
  },

  langChipActive: {
    backgroundColor: "#1DBF73",
  },

  langText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1DBF73",
  },

  langTextActive: {
    color: "#fff",
  },
});
