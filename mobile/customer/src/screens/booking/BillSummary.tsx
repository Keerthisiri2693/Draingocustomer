import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../theme/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

const RATE_PER_MIN = 25; // ₹ per minute
const GST_PERCENT = 18;

const BillSummaryScreen = ({ navigation, route }: any) => {
  const {
    jobId,
    vehicle,
    address,
    startedAt,
    finishedAt,
    durationInSeconds,
  } = route.params;
  const { t } = useTranslation();
  

  /* ================= CALCULATIONS ================= */

  const minutes = Math.max(1, Math.ceil(durationInSeconds / 60));

  const subtotal = minutes * RATE_PER_MIN;
  const gst = Math.round((subtotal * GST_PERCENT) / 100);
  const total = subtotal + gst;

  const formattedStart = new Date(startedAt).toLocaleTimeString();
  const formattedEnd = new Date(finishedAt).toLocaleTimeString();

  const insets = useSafeAreaInsets();



  /* ================= UI ================= */

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* ===== TOOLBAR ===== */}
      <View style={styles.toolbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.toolbarTitle}>Bill Summary</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* SUCCESS */}
        <View style={styles.successBox}>
          <Ionicons name="checkmark-circle" size={42} color="#2E7D32" />
          <Text style={styles.successTitle}>Work Completed</Text>
          <Text style={styles.successSub}>Thank you for using our service</Text>
        </View>

        {/* JOB INFO */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Job Details</Text>
          <Row label="Job ID" value={jobId} />
          <Row label="Vehicle" value={vehicle} />
          <Row label="Location" value={address} />
        </View>

        {/* TIME INFO */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Work Time</Text>
          <Row label="Started At" value={formattedStart} />
          <Row label="Finished At" value={formattedEnd} />
          <Row
            label="Duration"
            value={`${minutes} min`}
            highlight
          />
        </View>

        {/* BILL */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Charges</Text>

          <Row label={`Rate (${RATE_PER_MIN} × ${minutes} min)`} value={`₹ ${subtotal}`} />
          <Row label={`GST (${GST_PERCENT}%)`} value={`₹ ${gst}`} />

          <View style={styles.divider} />

          <Row
            label="Total Amount"
            value={`₹ ${total}`}
            big
          />
        </View>

        {/* PAYMENT STATUS */}
        <View style={styles.paymentBox}>
          <Ionicons name="wallet" size={20} color="#2E7D32" />
          <Text style={styles.paymentText}>Payment Pending</Text>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* ===== ACTION BAR ===== */}
     <View
  style={[
    styles.bottomBar,
    { paddingBottom: insets.bottom + 12 },
  ]}
>
 <TouchableOpacity
  style={styles.primaryBtn}
  onPress={() =>
    navigation.replace("RatingScreen", {
  jobId,
  driverName: "Ramesh",
})
  }
>
 <Text style={styles.primaryText}>{t("payToDriver")}</Text>

</TouchableOpacity>

</View>

    </SafeAreaView>
  );
};

export default BillSummaryScreen;

/* ================= ROW ================= */

const Row = ({
  label,
  value,
  highlight,
  big,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  big?: boolean;
}) => (
  <View style={styles.row}>
    <Text style={[styles.rowLabel, big && styles.bigLabel]}>
      {label}
    </Text>
    <Text
      style={[
        styles.rowValue,
        highlight && styles.highlightValue,
        big && styles.bigValue,
      ]}
    >
      {value}
    </Text>
  </View>
);

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },

  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === "android" ? 14 : 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  toolbarTitle: { fontSize: 16, fontWeight: "800" },

  scroll: { paddingBottom: 100 },

  successBox: {
    alignItems: "center",
    marginVertical: 16,
  },

  successTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginTop: 6,
  },

  successSub: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },

  card: {
    marginHorizontal: 16,
    marginBottom: 14,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#F6F9FC",
  },

  sectionTitle: {
    fontWeight: "800",
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  rowLabel: { color: "#444" },
  rowValue: { fontWeight: "700" },

  highlightValue: { color: "#2E7D32" },

  divider: {
    height: 1,
    backgroundColor: "#E3E6EB",
    marginVertical: 14,
  },

  bigLabel: { fontSize: 16, fontWeight: "800" },
  bigValue: { fontSize: 18, fontWeight: "900" },

  paymentBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
  },

  paymentText: {
    marginLeft: 6,
    fontWeight: "700",
    color: "#2E7D32",
  },

bottomBar: {
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  paddingHorizontal: 16,
  paddingTop: 12,
  borderTopWidth: 1,
  borderColor: "#eee",
  backgroundColor: "#fff",
},



  primaryBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  primaryText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
  },

  secondaryBtn: {
    marginTop: 10,
    backgroundColor: "#E5E7EB",
    paddingVertical: 14,
    borderRadius: 12,
  },

  secondaryText: {
    textAlign: "center",
    fontWeight: "800",
    color: "#333",
  },
});
