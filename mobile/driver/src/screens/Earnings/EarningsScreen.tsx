import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const TOOLBAR_HEIGHT =
  Platform.OS === "android"
    ? 56 + (StatusBar.currentHeight ?? 0)
    : 56;

const MONTHS = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec",
];

/* ===== DUMMY DATA ===== */
const generateDummyHistory = () => {
  const now = new Date();
  const data: any[] = [];

  for (let m = 0; m < 6; m++) {
    for (let d = 1; d <= 10; d++) {
      data.push({
        amount: Math.floor(Math.random() * 600) + 200,
        date: new Date(now.getFullYear(), now.getMonth() - m, d).toISOString(),
        title: "Service Job",
      });
    }
  }
  return data;
};

type FilterType = "YEAR" | "MONTH" | "WEEK" | "DATE";

export default function EarningsScreen() {
  const navigation = useNavigation<any>();

  const [history, setHistory] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);

  const [filterType, setFilterType] = useState<FilterType>("MONTH");
  const [selectedYear] = useState(new Date().getFullYear());
  const [selectedMonth] = useState(new Date().getMonth());
  const [selectedDate] = useState(new Date());

  const [today, setToday] = useState(0);
  const [week, setWeek] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [filterType, history]);

  /* ===== LOAD DATA ===== */
  const loadHistory = async () => {
    const data = await AsyncStorage.getItem("history");
    if (!data) {
      const dummy = generateDummyHistory();
      await AsyncStorage.setItem("history", JSON.stringify(dummy));
      setHistory(dummy);
    } else {
      setHistory(JSON.parse(data));
    }
  };

  /* ===== APPLY FILTER ===== */
  const applyFilter = () => {
    const now = new Date();

    const result = history.filter((job) => {
      const d = new Date(job.date);

      if (filterType === "YEAR") {
        return d.getFullYear() === selectedYear;
      }

      if (filterType === "MONTH") {
        return (
          d.getFullYear() === selectedYear &&
          d.getMonth() === selectedMonth
        );
      }

      if (filterType === "WEEK") {
        const diff =
          (now.getTime() - d.getTime()) /
          (1000 * 60 * 60 * 24);
        return diff <= 7;
      }

      if (filterType === "DATE") {
        return d.toDateString() === selectedDate.toDateString();
      }

      return true;
    });

    setFiltered(result);
    calculateSummary(result);
  };

  /* ===== SUMMARY ===== */
  const calculateSummary = (list: any[]) => {
    const now = new Date();
    let todayTotal = 0;
    let weekTotal = 0;
    let sum = 0;

    list.forEach((job) => {
      const d = new Date(job.date);
      const amt = Number(job.amount || 0);

      if (d.toDateString() === now.toDateString()) {
        todayTotal += amt;
      }

      const diff =
        (now.getTime() - d.getTime()) /
        (1000 * 60 * 60 * 24);
      if (diff <= 7) weekTotal += amt;

      sum += amt;
    });

    setToday(todayTotal);
    setWeek(weekTotal);
    setTotal(sum);
  };

  /* ===== MONTH vs VALUE CHART ===== */
  const chartData = useMemo(() => {
    const map: { [key: number]: number } = {};
    filtered.forEach((job) => {
      const m = new Date(job.date).getMonth();
      map[m] = (map[m] || 0) + job.amount;
    });

    return Object.keys(map)
      .map((m) => ({ month: Number(m), total: map[Number(m)] }))
      .sort((a, b) => a.month - b.month);
  }, [filtered]);

  const maxValue = Math.max(...chartData.map((i) => i.total), 1);

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      {/* TOOLBAR */}
      <View style={styles.toolbar}>
        <Ionicons
          name="arrow-back"
          size={22}
          color="#fff"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.toolbarTitle}>Earnings</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* FILTER TYPE */}
        <View style={styles.filterRow}>
          {["YEAR","MONTH","WEEK","DATE"].map((f) => (
            <FilterBtn
              key={f}
              label={f}
              active={filterType === f}
              onPress={() => setFilterType(f as FilterType)}
            />
          ))}
        </View>

        {/* TOTAL */}
        <View style={styles.bigCard}>
          <Text style={styles.bigAmount}>₹ {total}</Text>
          <Text style={styles.bigLabel}>Total Earnings</Text>
        </View>

        {/* TODAY / WEEK */}
        <View style={styles.row}>
          <SummaryCard label="Today" value={today} />
          <SummaryCard label="This Week" value={week} />
        </View>

        {/* CHART */}
       <Text style={styles.sectionTitle}>Monthly Earnings</Text>

<View style={styles.chart}>
  {chartData.map((item) => (
    <View key={item.month} style={styles.barWrap}>
      {/* VALUE */}
      <Text style={styles.barValue}>
        ₹ {item.total}
      </Text>

      {/* BAR */}
      <View
        style={[
          styles.bar,
          {
            height:
              (item.total / maxValue) * 120 + 12,
          },
        ]}
      />

      {/* MONTH */}
      <Text style={styles.barLabel}>
        {MONTHS[item.month]}
      </Text>
    </View>
  ))}
</View>


        {/* HISTORY */}
        <Text style={styles.sectionTitle}>Earnings History</Text>
        <FlatList
          data={filtered}
          keyExtractor={(_, i) => i.toString()}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={styles.historyItem}>
              <View>
                <Text style={styles.historyTitle}>{item.title}</Text>
                <Text style={styles.historyDate}>
                  {new Date(item.date).toDateString()}
                </Text>
              </View>
              <Text style={styles.historyAmount}>₹ {item.amount}</Text>
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

/* ===== UI COMPONENTS ===== */
const FilterBtn = ({ label, active, onPress }: any) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.filterBtn, active && styles.filterActive]}
  >
    <Text style={[styles.filterText, active && { color: "#fff" }]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const SummaryCard = ({ label, value }: any) => (
  <View style={[styles.card, { marginHorizontal: 6 }]}>
    <Text style={styles.amount}>₹ {value}</Text>
    <Text style={styles.label}>{label}</Text>
  </View>
);

/* ===== STYLES ===== */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F6F8" },

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

  toolbarTitle: { color: "#fff", fontWeight: "800", fontSize: 16 },

  content: { padding: 16, paddingBottom: 40 },

  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 14,
  },

  filterBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "#E8F6EF",
    margin: 4,
  },

  barValue: {
  fontSize: 10,
  fontWeight: "700",
  color: "#333",
  marginBottom: 4,
},


  filterActive: { backgroundColor: "#1DBF73" },

  filterText: { fontWeight: "700", color: "#1DBF73" },

  bigCard: {
    backgroundColor: "#1DBF73",
    borderRadius: 20,
    padding: 26,
    alignItems: "center",
    marginBottom: 16,
  },

  bigAmount: { fontSize: 30, fontWeight: "900", color: "#fff" },
  bigLabel: { color: "#E9FFF3", marginTop: 6, fontWeight: "700" },

  row: { flexDirection: "row", marginBottom: 16 },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    flex: 1,
    alignItems: "center",
    elevation: 3,
  },

  amount: { fontSize: 20, fontWeight: "800", color: "#1DBF73" },
  label: { color: "#777", marginTop: 6, fontWeight: "600" },

  sectionTitle: { fontSize: 14, fontWeight: "800", marginVertical: 12 },

  chart: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 200,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 20,
    elevation: 3,
  },

  barWrap: { alignItems: "center", marginHorizontal: 6 },
  bar: { width: 14, backgroundColor: "#1DBF73", borderRadius: 6 },
  barLabel: { fontSize: 10, marginTop: 6, color: "#777" },

  historyItem: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    elevation: 2,
  },

  historyTitle: { fontWeight: "700" },
  historyDate: { color: "#777", fontSize: 12, marginTop: 2 },
  historyAmount: {
    fontWeight: "800",
    color: "#1DBF73",
    fontSize: 16,
  },
});
