import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar ,Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import colors from "../../theme/colors";

const ViewAddressScreen = ({ navigation }) => {
  const address = {
    name: "Keerthana",
    phone: "+91 98765 43210",
    house: "Flat 203, Sai Residency",
    street: "MG Road, Ameerpet",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500016",
    type: "HOME",
    isDefault: true,
  };

  return (
  <SafeAreaView style={styles.safe} edges={["bottom"]}>
  <StatusBar barStyle="dark-content" backgroundColor="#fff" />

  

      {/* 🔝 TOOLBAR */}
   <View style={styles.toolbar}>
  <TouchableOpacity
    style={styles.iconBtn}
    onPress={() => navigation.goBack()}
  >
    <Ionicons name="arrow-back" size={24} color={colors.primary} />
  </TouchableOpacity>

  <Text style={styles.toolbarTitle}>Address Details</Text>

  <View style={styles.iconBtn} />
</View>


   <ScrollView contentContainerStyle={styles.container}>
  {/* 📦 ADDRESS CARD */}
  <View style={styles.card}>
    
    {/* HEADER ROW */}
    <View style={styles.cardHeader}>
      <View>
        <Text style={styles.name}>{address.name}</Text>
        <Text style={styles.phone}>{address.phone}</Text>
      </View>

      {/* ACTION ICONS */}
      <View style={styles.headerActions}>
        <TouchableOpacity
          style={styles.iconAction}
          onPress={() => navigation.navigate("AddAddressScreen")}
        >
          <Ionicons name="create-outline" size={20} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconAction}>
          <Ionicons name="trash-outline" size={20} color="#d32f2f" />
        </TouchableOpacity>
      </View>
    </View>

    {/* TYPE BADGE */}
    <View style={styles.typeBadge}>
      <Text style={styles.typeText}>{address.type}</Text>
    </View>

    {/* ADDRESS TEXT */}
    <Text style={styles.addressText}>
      {address.house},{"\n"}
      {address.street},{"\n"}
      {address.city}, {address.state} - {address.pincode}
    </Text>

    {/* DEFAULT */}
    {address.isDefault && (
      <View style={styles.defaultBadge}>
        <MaterialIcons name="check-circle" size={16} color="#2e7d32" />
        <Text style={styles.defaultText}>Default Address</Text>
      </View>
    )}
  </View>
</ScrollView>

    </SafeAreaView>
  );
};

export default ViewAddressScreen;
const STATUSBAR_HEIGHT =
  Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f6f6f6",
  },

  /* ✅ TOOLBAR – FIXED */
  toolbar: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  height: 56 + STATUSBAR_HEIGHT,
  paddingTop: STATUSBAR_HEIGHT,
  paddingHorizontal: 12,
  backgroundColor: "#fff",
  borderBottomWidth: 1,
  borderColor: "#eee",
},

iconBtn: {
  width: 40,
  alignItems: "center",
  justifyContent: "center",
},

toolbarTitle: {
  fontSize: 18,
  fontWeight: "600",
  color: colors.primary,
},


  container: {
    padding: 16,
  },

  /* Address Card */
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,

    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },

cardHeader: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
},

headerActions: {
  flexDirection: "row",
  alignItems: "center",
},

iconAction: {
  width: 36,
  height: 36,
  borderRadius: 18,
  alignItems: "center",
  justifyContent: "center",
  marginLeft: 8,
  backgroundColor: "#f2f2f2",
},

typeBadge: {
  alignSelf: "flex-start",
  backgroundColor: "#111",
  paddingHorizontal: 14,
  paddingVertical: 6,
  borderRadius: 20,
  marginTop: 12,
},
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },

  phone: {
    marginTop: 4,
    fontSize: 14,
    color: "#666",
  },

  addressText: {
    marginTop: 12,
    fontSize: 15,
    lineHeight: 22,
    color: "#333",
  },

  

  typeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  defaultBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },

  defaultText: {
    marginLeft: 6,
    color: "#2e7d32",
    fontSize: 13,
    fontWeight: "500",
  },

  /* Actions */
  actionCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",

    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 16,
  },

  actionText: {
    marginLeft: 12,
    fontSize: 15,
    color: "#000",
    fontWeight: "500",
  },

  deleteText: {
    color: "#d32f2f",
  },

  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginLeft: 16,
  },
});

