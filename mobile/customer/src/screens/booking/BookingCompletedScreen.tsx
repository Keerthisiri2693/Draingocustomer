import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import colors from "../../theme/colors";

const BookingCompletedScreen = ({ route, navigation }: any) => {
  const { t } = useTranslation();

  const vehicle = route?.params?.vehicle ?? "N/A";
  const address = route?.params?.address ?? "N/A";
  const date = route?.params?.date ?? new Date().toISOString();

  const formattedDate = new Date(date).toDateString();

  const [driverAccepted, setDriverAccepted] = useState(false);

  // 🔹 Mock assigned driver (replace with API data later)
  const assignedDriver = {
    name: "Ramesh Kumar",
    vehicleNo: "TN 09 AB 4321",
    phone: "+91 98765 43210",
  };

  /* 🔄 Simulate driver acceptance */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDriverAccepted(true);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  /* ❌ Cancel booking */
  const handleCancelBooking = () => {
    Alert.alert(
      "Cancel Booking",
      "Are you sure you want to cancel this booking?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes, Cancel",
          style: "destructive",
          onPress: () => {
            // Later: API call to cancel booking
            navigation.goBack();
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={["bottom"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* 🔝 TOOLBAR */}
      <View
        style={[
          styles.toolbar,
          {
            paddingTop:
              Platform.OS === "android"
                ? (StatusBar.currentHeight ?? 0) + 8
                : 8,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={22} color={colors.primary} />
        </TouchableOpacity>

        <View style={styles.toolbarTextWrap}>
          <Text style={styles.toolbarTitle}>
            {t("Booking Details")}
          </Text>
        </View>
      </View>

      {/* ✅ HEADER */}
      <View style={styles.header}>
        <Ionicons
          name="checkmark-circle"
          size={46}
          color={colors.primary}
        />
        <Text style={styles.successTitle}>
          {t("Booking Details")}
        </Text>
      </View>

      {/* 📦 BOOKING DETAILS */}
      <View style={styles.card}>
        <Text style={styles.label}>{t("vehicle")}</Text>
        <Text style={styles.value}>
          {String(vehicle).toUpperCase()}
        </Text>

        <Text style={styles.label}>{t("pickup")}</Text>
        <Text style={styles.value}>{address}</Text>

        <Text style={styles.label}>{t("scheduled")}</Text>
        <Text style={styles.value}>{formattedDate}</Text>
      </View>

      {/* 🚦 DRIVER STATUS */}
      <View style={styles.statusCard}>
        {!driverAccepted ? (
          <>
            <Ionicons name="time-outline" size={28} color="#f39c12" />
            <Text style={styles.statusTitle}>
              Driver not accepted yet
            </Text>
            <Text style={styles.statusText}>
              Please wait. We’ll notify you once a driver accepts
              your booking.
            </Text>

            {/* ❌ Cancel Button */}
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={handleCancelBooking}
            >
              <Text style={styles.cancelText}>
                Cancel Booking
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Ionicons
              name="car-outline"
              size={28}
              color={colors.primary}
            />
            <Text style={styles.statusTitle}>
              Driver accepted your booking
            </Text>

            {/* 🚗 Assigned Driver Details */}
            <View style={styles.driverCard} >
              <Text style={styles.driverLabel}>Driver Name</Text>
              <Text style={styles.driverValue}>{assignedDriver.name}</Text>

              <Text style={styles.driverLabel}>Vehicle No</Text>
              <Text style={styles.driverValue}>{assignedDriver.vehicleNo}</Text>

              <Text style={styles.driverLabel}>Phone</Text>
              <Text style={styles.driverValue}>{assignedDriver.phone}</Text>
            </View>

<View style={styles.buttonRow}>
  <TouchableOpacity
    style={[styles.trackBtn, styles.halfBtn]}
    onPress={() =>
      navigation.navigate("TrackLocation", {
        bookingId: "BK123",
      })
    }
  >
    <Text style={styles.trackText}>Track Driver</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={[styles.trackBtn, styles.halfBtnSecondary]}
    onPress={() => {
       navigation.navigate("DriverArrivedScreen", {
        bookingId: "BK123",
      })
    }}
  >
    <Text style={styles.trackText}> View Details</Text>
  </TouchableOpacity>
</View>

          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default BookingCompletedScreen;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },

  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },

  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  toolbarTextWrap: { marginLeft: 12 },

  toolbarTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.primary,
  },

  header: {
    alignItems: "center",
    marginTop: 24,
    marginBottom: 20,
  },

  successTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "800",
    color: "#333",
  },

  card: {
    marginHorizontal: 16,
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
  },

  label: {
    fontWeight: "700",
    color: "#444",
    marginTop: 10,
  },

  value: {
    marginTop: 4,
    color: "#222",
  },

  statusCard: {
    marginHorizontal: 16,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 18,
    alignItems: "center",
    elevation: 4,
  },

  statusTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "800",
  },

  statusText: {
    marginTop: 6,
    fontSize: 13,
    color: "#666",
    textAlign: "center",
  },

  driverCard: {
    width: "100%",
    backgroundColor: "#F8F9FA",
    padding: 14,
    borderRadius: 14,
    marginTop: 14,
  },

  driverLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#666",
    marginTop: 6,
  },

  driverValue: {
    fontSize: 14,
    fontWeight: "800",
    color: "#222",
  },

  trackBtn: {
    marginTop: 16,
    backgroundColor: colors.primary,
    paddingHorizontal: 26,
    paddingVertical: 12,
    borderRadius: 16,
  },

  trackText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 15,
  },

  cancelBtn: {
    marginTop: 14,
    borderWidth: 1,
    borderColor: "#E53935",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 16,
  },

  cancelText: {
    color: "#E53935",
    fontWeight: "800",
    fontSize: 14,
  },

  buttonRow: {
  flexDirection: "row",
  width: "100%",
  marginTop: 16,
  gap: 12, // works in RN 0.71+
},

halfBtn: {
  flex: 1,
},

halfBtnSecondary: {
  flex: 1,
  backgroundColor: "#2ECC71", // or outline if you want
},

});
