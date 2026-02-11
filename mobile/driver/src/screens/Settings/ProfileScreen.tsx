import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
  Alert,
  Image, Modal,  
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TOOLBAR_HEIGHT =
  Platform.OS === "android"
    ? 56 + (StatusBar.currentHeight ?? 0)
    : 56;

export default function ProfileScreen() {
  const navigation = useNavigation<any>();

  const [photo, setPhoto] = useState<string | null>(null);
  const [kycStatus] = useState<"PENDING" | "VERIFIED">("PENDING");
  const [darkMode, setDarkMode] = useState(false);

  const [languageModalVisible, setLanguageModalVisible] = useState(false);
const [language, setLanguage] = useState("English");


  /* ================= LOAD SETTINGS ================= */
  useEffect(() => {
    const load = async () => {
      const savedPhoto = await AsyncStorage.getItem("PROFILE_PHOTO");
      const theme = await AsyncStorage.getItem("DARK_MODE");

      if (savedPhoto) setPhoto(savedPhoto);
      if (theme === "true") setDarkMode(true);
    };
    load();
  }, []);

  /* ================= PICK IMAGE ================= */
  const pickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.6,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!res.canceled) {
      const uri = res.assets[0].uri;
      setPhoto(uri);
      await AsyncStorage.setItem("PROFILE_PHOTO", uri);
    }
  };

 const openLanguageScreen = () => {
  setLanguageModalVisible(true);
};

const changeLanguage = async (lang: string) => {
  setLanguage(lang);
  await AsyncStorage.setItem("APP_LANGUAGE", lang);
  setLanguageModalVisible(false);
};


  /* ================= DARK MODE ================= */
  const toggleTheme = async () => {
    const next = !darkMode;
    setDarkMode(next);
    await AsyncStorage.setItem("DARK_MODE", next ? "true" : "false");
  };

  /* ================= LOGOUT ================= */
  const confirmLogout = () => {
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

  const bg = darkMode ? "#121212" : "#F5F6F8";
  const cardBg = darkMode ? "#1E1E1E" : "#fff";
  const text = darkMode ? "#fff" : "#222";

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bg }]} edges={["bottom"]}>
      {/* ===== TOOLBAR ===== */}
      <View style={styles.toolbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.toolbarTitle}>Profile</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* ===== CONTENT ===== */}
      <View style={styles.content}>
        {/* PROFILE CARD */}
        <View style={[styles.profileCard, { backgroundColor: cardBg }]}>
          <TouchableOpacity style={styles.avatarWrap} onPress={pickImage}>
            {photo ? (
              <Image source={{ uri: photo }} style={styles.avatarImg} />
            ) : (
              <View style={styles.avatar}>
                <Ionicons name="person" size={32} color="#fff" />
              </View>
            )}
            <View style={styles.cameraBadge}>
              <Ionicons name="camera" size={14} color="#fff" />
            </View>
          </TouchableOpacity>

          <Text style={[styles.name, { color: text }]}>Ravi Kumar</Text>
          <Text style={{ color: "#777" }}>📞 98765 12345</Text>
        </View>

        {/* INFO */}
        <View style={[styles.infoCard, { backgroundColor: cardBg }]}>
          <InfoRow label="Vehicle" value="Tanker · TN 49 AB 1234" text={text} />
          <InfoRow label="City" value="Thanjavur" text={text} />
          <InfoRow label="Rating" value="4.8 ⭐" text={text} />
        </View>

        {/* ACTIONS */}
        <View style={[styles.actionCard, { backgroundColor: cardBg }]}>

           <ActionItem
    icon="create-outline"
    label="Edit Profile"
    onPress={() => navigation.navigate("EditProfileScreen")}
  />
           <ActionItem
            icon="car-outline"
            label="My Vehicle"
            onPress={() => navigation.navigate("MyVehicleScreen")}
          />

      

       <ActionItem
  icon="language-outline"
  label="Change Language"
  onPress={openLanguageScreen}
/>


          <View style={styles.actionItem}>
            <Ionicons name="moon-outline" size={20} color="#1DBF73" />
            <Text style={[styles.actionText, { color: text }]}>
              Dark Mode
            </Text>
            <Switch value={darkMode} onValueChange={toggleTheme} />
          </View>

          <ActionItem
            icon="document-attach-outline"
            label="KYC & Documents"
            badge={kycStatus}
            onPress={() => navigation.navigate("KYCScreen")}
          />

          <ActionItem
            icon="card-outline"
            label="Membership"
            onPress={() => navigation.navigate("MembershipScreen")}
          />

          <ActionItem
            icon="log-out-outline"
            label="Logout"
            danger
            onPress={confirmLogout}
          />
        </View>
      </View>

      <Modal
  transparent
  animationType="slide"
  visible={languageModalVisible}
  onRequestClose={() => setLanguageModalVisible(false)}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>Select Language</Text>

      {["English", "Hindi", "Tamil", "Telugu"].map((lang) => (
        <TouchableOpacity
          key={lang}
          style={styles.languageItem}
          onPress={() => changeLanguage(lang)}
        >
          <Text style={styles.languageText}>{lang}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        onPress={() => setLanguageModalVisible(false)}
        style={styles.cancelBtn}
      >
        <Text style={{ color: "#e74c3c", fontWeight: "700" }}>Cancel</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

    </SafeAreaView>
  );
}

/* ================= SMALL COMPONENTS ================= */

const InfoRow = ({
  label,
  value,
  text,
}: {
  label: string;
  value: string;
  text: string;
}) => (
  <View style={styles.infoRow}>
    <Text style={{ color: "#777" }}>{label}</Text>
    <Text style={{ fontWeight: "700", color: text }}>{value}</Text>
  </View>
);

const ActionItem = ({
  icon,
  label,
  onPress,
  danger,
  badge,
}: any) => (
  <TouchableOpacity style={styles.actionItem} onPress={onPress}>
    <Ionicons
      name={icon}
      size={20}
      color={danger ? "#e74c3c" : "#1DBF73"}
    />
    <Text
      style={[
        styles.actionText,
        danger && { color: "#e74c3c" },
      ]}
    >
      {label}
    </Text>

    {badge && (
      <View
        style={[
          styles.badge,
          badge === "VERIFIED"
            ? styles.verified
            : styles.pending,
        ]}
      >
        <Text style={styles.badgeText}>{badge}</Text>
      </View>
    )}

    <Ionicons name="chevron-forward" size={18} color="#999" />
  </TouchableOpacity>
);

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1 },

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
  content: { padding: 16 },

  profileCard: {
    borderRadius: 18,
    alignItems: "center",
    padding: 20,
    elevation: 4,
  },

  avatarWrap: { marginBottom: 10 },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#1DBF73",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarImg: { width: 72, height: 72, borderRadius: 36 },

  cameraBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#1DBF73",
    padding: 6,
    borderRadius: 20,
  },

  name: { fontSize: 18, fontWeight: "800" },

  infoCard: {
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  actionCard: {
    marginTop: 16,
    borderRadius: 16,
    paddingVertical: 6,
  },

  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },

  actionText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
  },

  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginRight: 6,
  },

  badgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#fff",
  },

  verified: { backgroundColor: "#1DBF73" },
  pending: { backgroundColor: "#f39c12" },


  modalOverlay: {
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.4)",
  justifyContent: "flex-end",
},

modalContainer: {
  backgroundColor: "#fff",
  padding: 20,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
},

modalTitle: {
  fontSize: 16,
  fontWeight: "800",
  marginBottom: 12,
},

languageItem: {
  paddingVertical: 12,
},

languageText: {
  fontSize: 14,
  fontWeight: "600",
},

cancelBtn: {
  marginTop: 10,
  alignItems: "center",
  paddingVertical: 12,
},

});
