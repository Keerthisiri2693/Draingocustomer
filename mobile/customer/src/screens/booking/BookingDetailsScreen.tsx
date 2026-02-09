import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../theme/colors";

const BookingDetailsScreen = ({ navigation, route }: any) => {
  const { booking } = route.params;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* HEADER */}
      <View style={styles.toolbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.toolbarTitle}>Booking Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* SUMMARY */}
        <View style={styles.summaryCard}>
          <Text style={styles.amount}>{booking.amount}</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{booking.status}</Text>
          </View>
        </View>

        {/* DETAILS */}
        <View style={styles.card}>
          <DetailRow label="Booking ID" value={booking.id} />
          <DetailRow label="Vehicle" value={booking.vehicle} />
          <DetailRow label="Date" value={booking.date} />
          <DetailRow label="Payment" value="Cash / Online" />
        </View>

        {/* ACTIONS */}
        <TouchableOpacity style={styles.invoiceBtn}>
          <Ionicons name="download-outline" size={18} color="#fff" />
          <Text style={styles.invoiceText}>Download Invoice</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const DetailRow = ({ label, value }: any) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

export default BookingDetailsScreen;

/* ===== STYLES ===== */

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

  toolbarTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.primary,
  },

  summaryCard: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#F6F9FC",
    alignItems: "center",
    marginBottom: 16,
  },

  amount: {
    fontSize: 26,
    fontWeight: "900",
    color: colors.primary,
  },

  statusBadge: {
    marginTop: 8,
    backgroundColor: "#E7F6EC",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },

  statusText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#2E7D32",
  },

  card: {
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#F6F9FC",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  label: { color: "#555", fontWeight: "600" },
  value: { fontWeight: "700", color: "#222" },

  invoiceBtn: {
    marginTop: 24,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  invoiceText: {
    color: "#fff",
    fontWeight: "800",
    marginLeft: 8,
  },
});
