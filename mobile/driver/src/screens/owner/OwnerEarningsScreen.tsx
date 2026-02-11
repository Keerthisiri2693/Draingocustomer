import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
  ScrollView,
  Alert,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";

const TOOLBAR_HEIGHT =
  Platform.OS === "android"
    ? 56 + (StatusBar.currentHeight ?? 0)
    : 56;

/* ================= DUMMY DATA ================= */

const DATA_THIS_MONTH = [
  { label: "Week 1", amount: 8000 },
  { label: "Week 2", amount: 12000 },
  { label: "Week 3", amount: 15000 },
  { label: "Week 4", amount: 10000 },
];

const DATA_LAST_MONTH = [
  { label: "Week 1", amount: 6000 },
  { label: "Week 2", amount: 9000 },
  { label: "Week 3", amount: 11000 },
  { label: "Week 4", amount: 7000 },
];

const VEHICLE_EARNINGS = [
  { id: "1", name: "TN 49 AB 1234", amount: 42000 },
  { id: "2", name: "TN 50 CD 5678", amount: 38000 },
];

const DRIVER_EARNINGS = [
  { id: "1", name: "Ravi", amount: 29000 },
  { id: "2", name: "Mahesh", amount: 25000 },
];

export default function OwnerEarningsScreen() {
  const navigation = useNavigation<any>();

  const [filter, setFilter] = useState<
    "THIS_MONTH" | "LAST_MONTH" | "CUSTOM"
  >("THIS_MONTH");

  const [chartData, setChartData] = useState(DATA_THIS_MONTH);

  /* ===== DATE PICKER ===== */
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);

  /* ===== ANIMATED VALUES (SAFE) ===== */
  const [animatedValues, setAnimatedValues] = useState<Animated.Value[]>([]);

  /* ===== UPDATE DATA + ANIMATE ===== */
  useEffect(() => {
    let data = DATA_THIS_MONTH;

    if (filter === "LAST_MONTH") data = DATA_LAST_MONTH;

    if (filter === "CUSTOM") {
      data = [
        { label: "Range 1", amount: 18000 },
        { label: "Range 2", amount: 24000 },
      ];
    }

    setChartData(data);

    // 🔥 recreate animated values safely
    const values = data.map(() => new Animated.Value(0));
    setAnimatedValues(values);

    Animated.stagger(
      120,
      values.map((val, i) =>
        Animated.timing(val, {
          toValue: data[i].amount,
          duration: 600,
          useNativeDriver: false,
        })
      )
    ).start();
  }, [filter]);

  /* ===== DOWNLOAD ===== */
  const downloadReport = () => {
    Alert.alert(
      "Download Report",
      "PDF will be generated via backend",
      [{ text: "OK" }]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      {/* ===== TOOLBAR ===== */}
      <View style={styles.toolbar}>
        <Ionicons
          name="arrow-back"
          size={22}
          color="#fff"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.toolbarTitle}>Earnings</Text>
        <TouchableOpacity onPress={downloadReport}>
          <Ionicons name="download-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* ===== FILTER ===== */}
        <View style={styles.filterRow}>
          <FilterBtn
            text="This Month"
            active={filter === "THIS_MONTH"}
            onPress={() => setFilter("THIS_MONTH")}
          />
          <FilterBtn
            text="Last Month"
            active={filter === "LAST_MONTH"}
            onPress={() => setFilter("LAST_MONTH")}
          />
          <FilterBtn
            text="Custom"
            active={filter === "CUSTOM"}
            onPress={() => setFilter("CUSTOM")}
          />
        </View>

        {/* ===== DATE PICKER ===== */}
        {filter === "CUSTOM" && (
          <View style={styles.dateRow}>
            <TouchableOpacity
              style={styles.dateBtn}
              onPress={() => setShowFrom(true)}
            >
              <Ionicons name="calendar-outline" size={16} />
              <Text>From: {fromDate.toDateString()}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dateBtn}
              onPress={() => setShowTo(true)}
            >
              <Ionicons name="calendar-outline" size={16} />
              <Text>To: {toDate.toDateString()}</Text>
            </TouchableOpacity>
          </View>
        )}

        {showFrom && (
          <DateTimePicker
            value={fromDate}
            mode="date"
            onChange={(_, d) => {
              setShowFrom(false);
              d && setFromDate(d);
            }}
          />
        )}

        {showTo && (
          <DateTimePicker
            value={toDate}
            mode="date"
            onChange={(_, d) => {
              setShowTo(false);
              d && setToDate(d);
            }}
          />
        )}

        {/* ===== 📈 ANIMATED CHART ===== */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Earnings Overview</Text>

          <View style={styles.chartRow}>
            {chartData.map((item, i) => (
              <View key={i} style={styles.barItem}>
                {animatedValues[i] && (
                  <Animated.View
                    style={[
                      styles.bar,
                      {
                        height: animatedValues[i].interpolate({
                          inputRange: [0, 30000],
                          outputRange: [0, 120],
                          extrapolate: "clamp",
                        }),
                      },
                    ]}
                  />
                )}
                <Text style={styles.barLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ===== 🚚 VEHICLE WISE ===== */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Vehicle-wise Earnings</Text>
          {VEHICLE_EARNINGS.map((v) => (
            <Row key={v.id} left={v.name} right={`₹${v.amount}`} />
          ))}
        </View>

        {/* ===== 👨‍✈️ DRIVER WISE ===== */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Driver-wise Earnings</Text>
          {DRIVER_EARNINGS.map((d) => (
            <Row key={d.id} left={d.name} right={`₹${d.amount}`} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ================= SMALL COMPONENTS ================= */

const FilterBtn = ({ text, active, onPress }: any) => (
  <TouchableOpacity
    style={[styles.filterBtn, active && styles.filterActive]}
    onPress={onPress}
  >
    <Text style={[styles.filterText, active && { color: "#fff" }]}>
      {text}
    </Text>
  </TouchableOpacity>
);

const Row = ({ left, right }: any) => (
  <View style={styles.row}>
    <Text style={styles.rowLeft}>{left}</Text>
    <Text style={styles.rowRight}>{right}</Text>
  </View>
);

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F8F6" },

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

  filterRow: { flexDirection: "row", marginBottom: 12 },

  filterBtn: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 4,
    borderRadius: 12,
    backgroundColor: "#E7F9EF",
    alignItems: "center",
  },

  filterActive: { backgroundColor: "#1DBF73" },

  filterText: {
    fontWeight: "700",
    color: "#1DBF73",
    fontSize: 12,
  },

  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  dateBtn: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 4,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 12,
  },

  chartRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 140,
  },

  barItem: { alignItems: "center", width: "22%" },

  bar: {
    width: 26,
    backgroundColor: "#1DBF73",
    borderRadius: 6,
  },

  barLabel: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: "700",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },

  rowLeft: { fontSize: 14, fontWeight: "700" },
  rowRight: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1DBF73",
  },
});
