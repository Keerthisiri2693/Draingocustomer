import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

const TOOLBAR_HEIGHT =
  Platform.OS === "android"
    ? 56 + (StatusBar.currentHeight ?? 0)
    : 56;

export default function OwnerEditProfileScreen({ navigation }: any) {
  const [saving, setSaving] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
  });

  /* ================= LOAD PROFILE ================= */
  useEffect(() => {
    const loadProfile = async () => {
      const data = await AsyncStorage.getItem("OWNER_PROFILE");
      if (data) {
        const parsed = JSON.parse(data);
        setForm(parsed);
        setProfileImage(parsed.profileImage || null);
      }
    };

    loadProfile();
  }, []);

  const update = (k: keyof typeof form, v: string) =>
    setForm({ ...form, [k]: v });

  const isValid =
    form.name &&
    form.phone.length === 10 &&
    form.email.includes("@") &&
    form.city;

  /* ================= IMAGE PICKER ================= */
  const pickImage = async () => {
    const { status } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permission required", "Please allow photo access");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  /* ================= SAVE ================= */
  const saveProfile = async () => {
    if (!isValid) return;

    try {
      setSaving(true);

      const payload = {
        ...form,
        profileImage,
      };

      await AsyncStorage.setItem(
        "OWNER_PROFILE",
        JSON.stringify(payload)
      );

      Alert.alert("Profile Updated", "Changes saved successfully", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (e) {
      Alert.alert("Error", "Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <SafeAreaView style={styles.container} edges={["bottom"]}>
        {/* ===== TOOLBAR ===== */}
        <View style={styles.toolbar}>
          <Ionicons
            name="arrow-back"
            size={22}
            color="#fff"
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.toolbarTitle}>Edit Profile</Text>
          <View style={{ width: 22 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* ===== PROFILE IMAGE ===== */}
          <View style={styles.avatarWrapper}>
            <TouchableOpacity onPress={pickImage} activeOpacity={0.8}>
              <View style={styles.avatar}>
                {profileImage ? (
                  <Image
                    source={{ uri: profileImage }}
                    style={styles.avatarImage}
                  />
                ) : (
                  <Ionicons
                    name="person"
                    size={50}
                    color="#aaa"
                  />
                )}
              </View>

              <View style={styles.editBadge}>
                <Ionicons
                  name="camera"
                  size={14}
                  color="#fff"
                />
              </View>
            </TouchableOpacity>

            <Text style={styles.changeText}>
              Tap to change photo
            </Text>
          </View>

          {/* ===== FORM ===== */}
          <View style={styles.card}>
            <Input
              label="Business / Owner Name *"
              icon="person-outline"
              value={form.name}
              onChangeText={(t: string) => update("name", t)}
            />

            <Input
              label="Phone Number *"
              icon="call-outline"
              keyboardType="phone-pad"
              maxLength={10}
              value={form.phone}
              onChangeText={(t: string) => update("phone", t)}
            />

            <Input
              label="Email *"
              icon="mail-outline"
              keyboardType="email-address"
              autoCapitalize="none"
              value={form.email}
              onChangeText={(t: string) => update("email", t)}
            />

            <Input
              label="City *"
              icon="location-outline"
              value={form.city}
              onChangeText={(t: string) => update("city", t)}
            />
          </View>
        </ScrollView>

        {/* ===== SAVE BUTTON ===== */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.saveBtn,
              (!isValid || saving) && { opacity: 0.4 },
            ]}
            disabled={!isValid || saving}
            onPress={saveProfile}
          >
            <Text style={styles.saveText}>
              {saving ? "Saving..." : "Save Changes"}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

/* ================= INPUT ================= */

const Input = ({ label, icon, ...props }: any) => (
  <View style={{ marginBottom: 14 }}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputRow}>
      <Ionicons name={icon} size={18} color="#777" />
      <TextInput
        {...props}
        style={styles.input}
        placeholderTextColor="#999"
      />
    </View>
  </View>
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

  content: { padding: 16 },

  avatarWrapper: {
    alignItems: "center",
    marginBottom: 16,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 55,
  },

  editBadge: {
    position: "absolute",
    bottom: 6,
    right: 6,
    backgroundColor: "#1DBF73",
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },

  changeText: {
    marginTop: 8,
    fontSize: 12,
    color: "#666",
    fontWeight: "600",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    elevation: 3,
  },

  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#444",
    marginBottom: 6,
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: "#222",
  },

  footer: {
    padding: 16,
    backgroundColor: "#fff",
  },

  saveBtn: {
    backgroundColor: "#1DBF73",
    height: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  saveText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
  },
});
