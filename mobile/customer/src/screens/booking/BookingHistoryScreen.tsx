import React, { useMemo, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  StatusBar,
  Platform,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import colors from "../../theme/colors";

/* ================= TYPES ================= */

interface BookingItem {
  id: string;
  vehicle: "Lorry" | "Tractor";
  date: string; // "10 Dec 2025"
  amount: string;
  status: "Completed";
}

/* ================= MOCK DATA ================= */

const bookings: BookingItem[] = [
  { id: "1", vehicle: "Lorry", date: "10 Dec 2025", amount: "₹1200", status: "Completed" },
  { id: "2", vehicle: "Tractor", date: "05 Dec 2025", amount: "₹800", status: "Completed" },
  { id: "3", vehicle: "Lorry", date: "28 Nov 2025", amount: "₹1200", status: "Completed" },
];

/* ================= HELPERS ================= */

const groupByMonth = (data: BookingItem[]) => {
  const map: Record<string, BookingItem[]> = {};

  data.forEach(item => {
    const month = item.date.split(" ")[1]; // Dec / Nov
    if (!map[month]) map[month] = [];
    map[month].push(item);
  });

  return Object.keys(map).map(month => ({
    title: month,
    data: map[month],
  }));
};

/* ================= SCREEN ================= */

const BookingHistoryScreen = ({ navigation }: any) => {
  const { t } = useTranslation();
  const [refreshing, setRefreshing] = useState(false);

  const sections = useMemo(() => groupByMonth(bookings), []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1200);
  }, []);

  const renderItem = ({ item }: { item: BookingItem }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
     
    >
      {/* LEFT */}
      <View>
        <Text style={styles.vehicle}>
          {item.vehicle === "Lorry" ? t("lorry") : t("tractor")}
        </Text>
        <Text style={styles.date}>{item.date}</Text>

     
      </View>

      {/* RIGHT */}
      <View style={{ alignItems: "flex-end" }}>
        <Text style={styles.amount}>{item.amount}</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{t("completed")}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderSectionHeader = ({ section }: any) => (
    <Text style={styles.sectionHeader}>{section.title}</Text>
  );

  const EmptyState = () => (
    <View style={styles.emptyBox}>
      <Ionicons name="calendar-outline" size={48} color="#999" />
      <Text style={styles.emptyTitle}>{t("noBookings")}</Text>
      <Text style={styles.emptySub}>{t("noBookingsSubtitle")}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* ===== HEADER ===== */}
      <View style={styles.toolbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.toolbarTitle}>{t("myBookings")}</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* ===== LIST ===== */}
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={EmptyState}
      />
    </SafeAreaView>
  );
};

export default BookingHistoryScreen;

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

  toolbarTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.primary,
  },

  sectionHeader: {
    fontSize: 14,
    fontWeight: "800",
    color: "#555",
    marginBottom: 8,
    marginTop: 16,
  },

  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#F6F9FC",
    marginBottom: 12,
  },

  vehicle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#222",
  },

  date: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },

  amount: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.primary,
  },

  statusBadge: {
    marginTop: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: "#E7F6EC",
  },

  statusText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2E7D32",
  },

  invoiceBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  invoiceText: {
    fontSize: 12,
    marginLeft: 4,
    fontWeight: "700",
    color: colors.primary,
  },

  emptyBox: {
    alignItems: "center",
    marginTop: 80,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: "800",
    marginTop: 12,
    color: "#333",
  },

  emptySub: {
    fontSize: 13,
    color: "#777",
    marginTop: 4,
    textAlign: "center",
    paddingHorizontal: 40,
  },
});
