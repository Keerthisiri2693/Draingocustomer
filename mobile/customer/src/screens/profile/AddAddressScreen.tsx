import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../theme/colors"; // adjust path if needed

const AddAddressScreen = ({ navigation }) => {
  const [type, setType] = useState("HOME");

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* 🔝 TOOLBAR */}
      <View style={styles.toolbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>

        <Text style={styles.toolbarTitle}>Add Address</Text>

        <View style={{ width: 24 }} />
      </View>

      {/* 📜 CONTENT */}
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Contact Details</Text>

        <TextInput
          placeholder="Full Name"
          placeholderTextColor={colors.gray}
          style={styles.input}
        />

        <TextInput
          placeholder="Mobile Number"
          placeholderTextColor={colors.gray}
          keyboardType="phone-pad"
          style={styles.input}
        />

        <Text style={styles.sectionTitle}>Address Details</Text>

        <TextInput
          placeholder="House / Flat / Building"
          placeholderTextColor={colors.gray}
          style={styles.input}
        />

        <TextInput
          placeholder="Street / Area"
          placeholderTextColor={colors.gray}
          style={styles.input}
        />

        <View style={styles.row}>
          <TextInput
            placeholder="City"
            placeholderTextColor={colors.gray}
            style={[styles.input, styles.half]}
          />
          <TextInput
            placeholder="State"
            placeholderTextColor={colors.gray}
            style={[styles.input, styles.half]}
          />
        </View>

        <TextInput
          placeholder="Pincode"
          placeholderTextColor={colors.gray}
          keyboardType="number-pad"
          style={styles.input}
        />

        {/* 🏷 ADDRESS TYPE */}
        <Text style={styles.sectionTitle}>Save As</Text>

        <View style={styles.typeRow}>
          {["HOME", "WORK", "OTHER"].map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.typeChip,
                type === item && styles.typeChipActive,
              ]}
              onPress={() => setType(item)}
            >
              <Text
                style={[
                  styles.typeText,
                  type === item && styles.typeTextActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* ✅ SAVE BUTTON */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.saveBtn} activeOpacity={0.9}>
          <Text style={styles.saveText}>Save Address</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.white,
  },

  /* Toolbar */
  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 56,
    borderBottomWidth: 1,
    borderColor: colors.lightGray,
    backgroundColor: colors.white,
  },
  toolbarTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: colors.primary,
  },

  /* Content */
  container: {
    padding: 16,
    paddingBottom: 120,
    backgroundColor: colors.white,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 20,
    color: colors.black,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 10,
    paddingHorizontal: 14,
    marginBottom: 14,
    fontSize: 15,
    backgroundColor: colors.white,
    color: colors.black,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  half: {
    width: "48%",
  },

  /* Address Type */
  typeRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  typeChip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.gray,
    backgroundColor: colors.white,
  },
  typeChipActive: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary,
  },
  typeText: {
    fontSize: 14,
    color: colors.gray,
  },
  typeTextActive: {
    color: colors.primaryDark,
    fontWeight: "600",
  },

  /* Bottom Bar */
  bottomBar: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderColor: colors.lightGray,
  },
  saveBtn: {
    height: 52,
    backgroundColor: colors.primary,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  saveText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
