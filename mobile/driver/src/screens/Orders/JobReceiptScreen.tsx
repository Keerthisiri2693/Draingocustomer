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
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { Ionicons } from "@expo/vector-icons";

/**
 * Job type
 */
export type Job = {
  id: string;
  customer: string;
  location: string;
  work: string;
  date: string;
  amount: number;
  status: "completed" | "pending";
};

type Props = NativeStackScreenProps<
  RootStackParamList,
  "JobReceipt"
>;

const TOOLBAR_HEIGHT =
  Platform.OS === "android"
    ? 56 + (StatusBar.currentHeight ?? 0)
    : 56;

export default function JobReceiptScreen({ route, navigation }: Props) {
  const { job } = route.params;

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      {/* ===== TOOLBAR ===== */}
      <View style={styles.toolbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.toolbarTitle}>Job Receipt</Text>

        <View style={{ width: 22 }} />
      </View>

      {/* ===== CONTENT ===== */}
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.jobId}>Job ID: #{job.id}</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Customer</Text>
            <Text style={styles.value}>{job.customer}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Location</Text>
            <Text style={styles.value}>{job.location}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Work</Text>
            <Text style={styles.value}>{job.work}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.value}>{job.date}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Amount</Text>
            <Text style={styles.amount}>₹ {job.amount}</Text>
          </View>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {job.status === "completed"
                ? "Completed"
                : "Pending"}
            </Text>
          </View>
        </View>

       
      </View>
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6F8",
  },

  /* TOOLBAR */
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
    flex: 1,
    padding: 16,
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    elevation: 4,
  },

  jobId: {
    fontWeight: "800",
    marginBottom: 12,
    color: "#555",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  label: {
    color: "#777",
  },

  value: {
    fontWeight: "700",
    color: "#222",
  },

  amount: {
    color: "#1DBF73",
    fontWeight: "800",
  },

  badge: {
    marginTop: 14,
    backgroundColor: "#E9F9EF",
    paddingVertical: 6,
    borderRadius: 10,
    alignItems: "center",
  },

  badgeText: {
    color: "#1DBF73",
    fontWeight: "700",
  },

  btn: {
    marginTop: 20,
    backgroundColor: "#1DBF73",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 15,
  },
});
