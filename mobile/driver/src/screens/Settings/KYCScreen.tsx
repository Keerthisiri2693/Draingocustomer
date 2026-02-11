import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

const TOOLBAR_HEIGHT =
  Platform.OS === "android"
    ? 56 + (StatusBar.currentHeight ?? 0)
    : 56;

type KycStatus = "PENDING" | "VERIFIED";

export default function KYCScreen() {
  const navigation = useNavigation<any>();

  const [status] = useState<KycStatus>("PENDING");
  const [idProof, setIdProof] = useState<string | null>(null);
  const [vehicleDoc, setVehicleDoc] = useState<string | null>(null);

  const pickImage = async (setter: (uri: string) => void) => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.6,
    });

    if (!res.canceled) {
      setter(res.assets[0].uri);
    }
  };

  const submitKyc = () => {
    if (!idProof || !vehicleDoc) {
      Alert.alert("Missing Documents", "Please upload all required documents");
      return;
    }

    // 🔗 TODO: Upload documents to API
    Alert.alert("Submitted", "KYC submitted for verification");
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      {/* ===== TOOLBAR ===== */}
      <View style={styles.toolbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.toolbarTitle}>KYC & Documents</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* STATUS CARD */}
        <View
          style={[
            styles.statusCard,
            status === "VERIFIED"
              ? styles.verified
              : styles.pending,
          ]}
        >
          <Ionicons
            name={
              status === "VERIFIED"
                ? "checkmark-circle"
                : "time-outline"
            }
            size={20}
            color="#fff"
          />
          <Text style={styles.statusText}>
            {status === "VERIFIED"
              ? "KYC Verified"
              : "KYC Pending Verification"}
          </Text>
        </View>

        {/* ID PROOF */}
        <DocCard
          title="ID Proof"
          subtitle="Aadhaar / PAN / Driving License"
          uri={idProof}
          onPick={() => pickImage(setIdProof)}
        />

        {/* VEHICLE DOC */}
        <DocCard
          title="Vehicle Document"
          subtitle="RC Book / Permit"
          uri={vehicleDoc}
          onPick={() => pickImage(setVehicleDoc)}
        />

        {/* SUBMIT */}
        {status === "PENDING" && (
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={submitKyc}
            activeOpacity={0.85}
          >
            <Text style={styles.submitText}>Submit KYC</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

/* ===== DOCUMENT CARD ===== */
const DocCard = ({
  title,
  subtitle,
  uri,
  onPick,
}: {
  title: string;
  subtitle: string;
  uri: string | null;
  onPick: () => void;
}) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardSub}>{subtitle}</Text>

    <TouchableOpacity
      style={styles.uploadBox}
      onPress={onPick}
      activeOpacity={0.8}
    >
      {uri ? (
        <Image source={{ uri }} style={styles.preview} />
      ) : (
        <>
          <Ionicons name="cloud-upload-outline" size={28} color="#1DBF73" />
          <Text style={styles.uploadText}>Upload Document</Text>
        </>
      )}
    </TouchableOpacity>
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

  statusCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 14,
    borderRadius: 14,
    marginBottom: 16,
  },

  statusText: {
    color: "#fff",
    fontWeight: "800",
  },

  verified: { backgroundColor: "#1DBF73" },
  pending: { backgroundColor: "#f39c12" },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: "800",
  },

  cardSub: {
    fontSize: 12,
    color: "#777",
    marginBottom: 12,
  },

  uploadBox: {
    height: 140,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FAFAFA",
  },

  uploadText: {
    marginTop: 6,
    fontSize: 12,
    color: "#1DBF73",
    fontWeight: "700",
  },

  preview: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },

  submitBtn: {
    marginTop: 10,
    backgroundColor: "#1DBF73",
    borderRadius: 14,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },

  submitText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "800",
  },
});
