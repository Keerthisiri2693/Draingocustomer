import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  StatusBar,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

const TOOLBAR_HEIGHT =
  Platform.OS === "android"
    ? 56 + (StatusBar.currentHeight ?? 0)
    : 56;

export default function EditProfileScreen() {
  const navigation = useNavigation<any>();

  const [photo, setPhoto] = useState<string | null>(null);
  const [name, setName] = useState("Ravi Kumar");
  const [phone, setPhone] = useState("9876512345");
  const [city, setCity] = useState("Thanjavur");
  const [vehicle, setVehicle] = useState("TN 49 AB 1234");

  /* 📸 PICK PROFILE PHOTO */
  const pickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.6,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!res.canceled) {
      setPhoto(res.assets[0].uri);
    }
  };

  const handleSave = () => {
    // 🔗 TODO: upload photo + profile data to API
    Alert.alert("Success", "Profile updated successfully", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      {/* ===== TOOLBAR ===== */}
      <View style={styles.toolbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.toolbarTitle}>Edit Profile</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* ===== PROFILE PHOTO ===== */}
        <View style={styles.photoWrap}>
          <TouchableOpacity onPress={pickImage} activeOpacity={0.8}>
            {photo ? (
              <Image source={{ uri: photo }} style={styles.avatarImg} />
            ) : (
              <View style={styles.avatar}>
                <Ionicons name="person" size={36} color="#fff" />
              </View>
            )}

            <View style={styles.cameraBadge}>
              <Ionicons name="camera" size={14} color="#fff" />
            </View>
          </TouchableOpacity>

          <Text style={styles.changePhotoText}>Change Profile Photo</Text>
        </View>

        {/* FORM CARD */}
        <View style={styles.card}>
          <Input
            label="Full Name"
            value={name}
            onChangeText={setName}
            icon="person-outline"
          />

          <Input
            label="Phone Number"
            value={phone}
            onChangeText={setPhone}
            icon="call-outline"
            keyboardType="phone-pad"
          />

          <Input
            label="City"
            value={city}
            onChangeText={setCity}
            icon="location-outline"
          />

          <Input
            label="Vehicle Number"
            value={vehicle}
            onChangeText={setVehicle}
            icon="car-outline"
          />
        </View>

        {/* SAVE BUTTON */}
        <TouchableOpacity
          style={styles.saveBtn}
          activeOpacity={0.85}
          onPress={handleSave}
        >
          <Text style={styles.saveText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ===== INPUT COMPONENT ===== */
const Input = ({
  label,
  icon,
  ...props
}: {
  label: string;
  icon: any;
  value: string;
  onChangeText: (t: string) => void;
  keyboardType?: any;
}) => (
  <View style={styles.inputWrap}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputRow}>
      <Ionicons name={icon} size={18} color="#777" />
      <TextInput
        {...props}
        style={styles.input}
        placeholder={label}
        placeholderTextColor="#aaa"
      />
    </View>
  </View>
);

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F6F8" },

  toolbar: {
    height: TOOLBAR_HEIGHT,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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

  content: {
    padding: 16,
    paddingBottom: 30,
  },

  /* PHOTO */
  photoWrap: {
    alignItems: "center",
    marginBottom: 16,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#1DBF73",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarImg: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },

  cameraBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#1DBF73",
    padding: 6,
    borderRadius: 20,
  },

  changePhotoText: {
    marginTop: 8,
    color: "#1DBF73",
    fontWeight: "700",
    fontSize: 13,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    elevation: 3,
  },

  inputWrap: {
    marginBottom: 14,
  },

  label: {
    fontSize: 12,
    color: "#777",
    marginBottom: 6,
    fontWeight: "600",
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    backgroundColor: "#FAFAFA",
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: "#222",
  },

  saveBtn: {
    marginTop: 20,
    backgroundColor: "#1DBF73",
    borderRadius: 14,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },

  saveText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "800",
  },
});
