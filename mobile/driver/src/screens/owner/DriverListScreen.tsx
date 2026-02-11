import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  StatusBar,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const TOOLBAR_HEIGHT =
  Platform.OS === "android"
    ? 56 + (StatusBar.currentHeight ?? 0)
    : 56;

/* ===== DUMMY DRIVERS ===== */
const DRIVERS = [
  {
    id: "1",
    name: "Ramesh Kumar",
    phone: "9876543210",
    vehicle: "Lorry",
    status: "Active",
  },
  {
    id: "2",
    name: "Suresh Naidu",
    phone: "9123456789",
    vehicle: "Tractor",
    status: "Inactive",
  },
  {
    id: "3",
    name: "Mahesh Rao",
    phone: "9988776655",
    vehicle: "Lorry",
    status: "Active",
  },
];

export default function DriverListScreen({ navigation }: any) {
  const confirmDelete = (driver: any) => {
    Alert.alert(
      "Delete Driver",
      `Are you sure you want to delete ${driver.name}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            alert("Driver deleted (dummy)");
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      {/* TOP ROW */}
      <View style={styles.row}>
        <Ionicons
          name="person-circle-outline"
          size={40}
          color="#1DBF73"
        />

        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.sub}>
            {item.vehicle} • {item.phone}
          </Text>
        </View>

        <View
          style={[
            styles.statusChip,
            item.status === "Active"
              ? styles.activeChip
              : styles.inactiveChip,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              item.status === "Active"
                ? styles.activeText
                : styles.inactiveText,
            ]}
          >
            {item.status}
          </Text>
        </View>
      </View>

      {/* ACTIONS */}
      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() =>
            navigation.navigate("DriverRegistrationScreen", {
              driver: item,
               mode: "edit",
            })
          }
        >
          <Ionicons
            name="create-outline"
            size={16}
            color="#1DBF73"
          />
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => confirmDelete(item)}
        >
          <Ionicons
            name="trash-outline"
            size={16}
            color="#e74c3c"
          />
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.viewBtnInline}
          onPress={() =>
            navigation.navigate("DriverDetailsScreen", {
              driver: item,
            })
          }
        >
          <Text style={styles.viewText}>View</Text>
          <Ionicons
            name="chevron-forward"
            size={16}
            color="#1DBF73"
          />
        </TouchableOpacity>
      </View>
    </View>
  );

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
        <Text style={styles.toolbarTitle}>Drivers</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* ===== LIST ===== */}
      <FlatList
        data={DRIVERS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F7F6" },

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

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  name: {
    fontSize: 15,
    fontWeight: "800",
    color: "#111",
  },

  sub: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },

  statusChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  activeChip: {
    backgroundColor: "#E7F9EF",
  },

  inactiveChip: {
    backgroundColor: "#fdecea",
  },

  statusText: {
    fontSize: 11,
    fontWeight: "700",
  },

  activeText: {
    color: "#1DBF73",
  },

  inactiveText: {
    color: "#e74c3c",
  },

  /* ===== ACTIONS ===== */

  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 14,
  },

  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E7F9EF",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
  },

  editText: {
    color: "#1DBF73",
    fontWeight: "700",
    fontSize: 12,
    marginLeft: 4,
  },

  deleteBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fdecea",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
  },

  deleteText: {
    color: "#e74c3c",
    fontWeight: "700",
    fontSize: 12,
    marginLeft: 4,
  },

  viewBtnInline: {
    flexDirection: "row",
    alignItems: "center",
  },

  viewText: {
    color: "#1DBF73",
    fontWeight: "700",
    marginRight: 4,
    fontSize: 13,
  },
});
