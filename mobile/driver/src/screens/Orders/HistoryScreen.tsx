import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function HistoryScreen() {
  const [history, setHistory] = useState<any[]>([]);
  const navigation = useNavigation<any>();

  const loadHistory = async () => {
    try {
      const data = await AsyncStorage.getItem("history");
      setHistory(data ? JSON.parse(data) : []);
    } catch (e) {
      console.log("Failed to load history", e);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => navigation.navigate("JobReceipt", { job: item })}
    >
      <View style={styles.row}>
        {/* STATUS ICON */}
        <Icon
          name={
            item.status === "completed"
              ? "check-circle"
              : item.status === "cleaning"
              ? "build"
              : item.status === "arrived"
              ? "place"
              : "directions-car"
          }
          size={28}
          color={
            item.status === "completed"
              ? "#1DBF73"
              : item.status === "cleaning"
              ? "#ffb703"
              : "#4a90e2"
          }
          style={{ marginRight: 12 }}
        />

        {/* DETAILS */}
        <View style={{ flex: 1 }}>
          <Text style={styles.work}>{item.work}</Text>
          <Text style={styles.location}>{item.location}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>

        {/* AMOUNT */}
        <Text style={styles.amount}>₹ {item.amount}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Completed Jobs</Text>

      {history.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>No completed jobs yet</Text>
        </View>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}
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
    marginBottom: 12,
  },

  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    elevation: 3,
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  work: {
    fontWeight: "800",
    fontSize: 15,
  },

  location: {
    color: "#777",
    marginTop: 2,
  },

  date: {
    fontSize: 11,
    color: "#999",
    marginTop: 4,
  },

  amount: {
    fontWeight: "800",
    color: "#1DBF73",
    marginLeft: 10,
  },

  emptyBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyText: {
    color: "#888",
    fontSize: 14,
  },
});
