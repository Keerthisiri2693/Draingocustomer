import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EarningsScreen() {
  const [today, setToday] = useState(0);
  const [week, setWeek] = useState(0);
  const [month, setMonth] = useState(0);
  const [jobs, setJobs] = useState(0);

  useEffect(() => {
    calculateEarnings();
  }, []);

  const calculateEarnings = async () => {
    try {
      const data = await AsyncStorage.getItem("history");
      const history = data ? JSON.parse(data) : [];

      const now = new Date();
      let todayTotal = 0;
      let weekTotal = 0;
      let monthTotal = 0;

      history.forEach((job: any) => {
        const jobDate = new Date(job.date);

        // today
        if (
          jobDate.toDateString() === now.toDateString()
        ) {
          todayTotal += job.amount;
        }

        // this week
        const diffDays =
          (now.getTime() - jobDate.getTime()) / (1000 * 60 * 60 * 24);
        if (diffDays <= 7) {
          weekTotal += job.amount;
        }

        // this month
        if (
          jobDate.getMonth() === now.getMonth() &&
          jobDate.getFullYear() === now.getFullYear()
        ) {
          monthTotal += job.amount;
        }
      });

      setToday(todayTotal);
      setWeek(weekTotal);
      setMonth(monthTotal);
      setJobs(history.length);
    } catch (e) {
      console.log("Earnings error", e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Earnings Summary</Text>

      {/* TOTAL JOBS */}
      <View style={styles.bigCard}>
        <Text style={styles.bigAmount}>₹ {month}</Text>
        <Text style={styles.bigLabel}>This Month</Text>
      </View>

      {/* CARDS */}
      <View style={styles.row}>
        <View style={styles.card}>
          <Text style={styles.amount}>₹ {today}</Text>
          <Text style={styles.label}>Today</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.amount}>₹ {week}</Text>
          <Text style={styles.label}>This Week</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.amount}>{jobs}</Text>
        <Text style={styles.label}>Completed Jobs</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 14,
  },

  bigCard: {
    backgroundColor: "#1DBF73",
    borderRadius: 18,
    padding: 24,
    alignItems: "center",
    marginBottom: 16,
  },

  bigAmount: {
    fontSize: 28,
    fontWeight: "900",
    color: "#fff",
  },

  bigLabel: {
    color: "#eafff2",
    marginTop: 6,
    fontWeight: "600",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  card: {
    backgroundColor: "#f6f7f9",
    borderRadius: 14,
    padding: 18,
    flex: 1,
    marginRight: 10,
    marginBottom: 12,
    alignItems: "center",
  },

  amount: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1DBF73",
  },

  label: {
    color: "#777",
    marginTop: 4,
  },
});
