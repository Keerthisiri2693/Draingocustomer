import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "JobDetails"
>;

const TOOLBAR_HEIGHT =
  Platform.OS === "android"
    ? 56 + (StatusBar.currentHeight ?? 0)
    : 56;

export default function JobDetailsScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safe} edges={["bottom"]}>
      {/* ===== TOOLBAR ===== */}
      <View style={styles.toolbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.toolbarTitle}>Job Details</Text>

        <View style={{ width: 22 }} />
      </View>

      {/* ===== CONTENT ===== */}
      <View style={styles.container}>
        {/* CUSTOMER CARD */}
        <View style={styles.topCard}>
          <View style={styles.avatar}>
            <Icon name="person" size={26} color="#fff" />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.name}>Kumar</Text>
            <Text style={styles.sub}>1.2 km • 5 mins away</Text>
          </View>

          <TouchableOpacity style={styles.callBtn}>
            <Icon name="call" size={18} color="#1DBF73" />
          </TouchableOpacity>
        </View>

        {/* DETAILS CARD */}
        <View style={styles.card}>
          {/* LOCATION */}
          <View style={styles.row}>
            <Icon name="location-on" size={22} color="#1DBF73" />
            <View style={styles.textWrap}>
              <Text style={styles.label}>Service Location</Text>
              <Text style={styles.value}>
                Pakkam, Thiruvallur
              </Text>
            </View>
          </View>

          {/* WORK */}
          <View style={styles.row}>
            <Icon name="build" size={22} color="#1DBF73" />
            <View style={styles.textWrap}>
              <Text style={styles.label}>Work</Text>
              <Text style={styles.value}>
                Septic Tank Cleaning
              </Text>
            </View>
          </View>

          {/* TANK */}
          <View style={styles.row}>
            <Icon name="water-drop" size={22} color="#1DBF73" />
            <View style={styles.textWrap}>
              <Text style={styles.label}>Tank Capacity</Text>
              <Text style={styles.value}>1000 Litres</Text>
            </View>
          </View>

          {/* PAYMENT */}
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>
              Service Fee
            </Text>
            <Text style={styles.paymentValue}>
              ₹ 700
            </Text>
          </View>
        </View>
      </View>

      {/* ===== BOTTOM ACTION ===== */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.startBtn}
          onPress={() => navigation.replace("Tracking")}
        >
          <Text style={styles.startText}>
            Start Service
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F6F8FA",
  },

  /* ===== TOOLBAR ===== */
  toolbar: {
    height: TOOLBAR_HEIGHT,
    paddingTop:
      Platform.OS === "android"
        ? StatusBar.currentHeight
        : 0,
    backgroundColor: "#1DBF73",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },

  toolbarTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "800",
  },

  /* ===== CONTENT ===== */
  container: {
    flex: 1,
    padding: 16,
  },

  topCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAFBF2",
    padding: 16,
    borderRadius: 18,
    marginBottom: 18,
  },

  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#1DBF73",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  name: {
    fontSize: 17,
    fontWeight: "800",
    color: "#222",
  },

  sub: {
    color: "#6E7C7C",
    marginTop: 2,
    fontSize: 13,
  },

  callBtn: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 22,
    elevation: 3,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    elevation: 4,
  },

  row: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 18,
    alignItems: "flex-start",
  },

  textWrap: {
    flex: 1,
  },

  label: {
    color: "#6E7C7C",
    fontSize: 12,
  },

  value: {
    fontSize: 15,
    fontWeight: "800",
    marginTop: 2,
    color: "#222",
  },

  paymentRow: {
    marginTop: 6,
    paddingTop: 14,
    borderTopWidth: 1,
    borderColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  paymentLabel: {
    color: "#6E7C7C",
    fontSize: 14,
  },

  paymentValue: {
    fontSize: 22,
    fontWeight: "900",
    color: "#1DBF73",
  },

  /* ===== BOTTOM BAR ===== */
  bottomBar: {
    padding: 16,
    backgroundColor: "#F6F8FA",
  },

  startBtn: {
    backgroundColor: "#1DBF73",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    elevation: 6,
  },

  startText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 16,
  },
});
