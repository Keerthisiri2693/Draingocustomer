import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  Platform,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../theme/colors";

const PaymentScreen = ({ navigation, route }: any) => {
  const { total, jobId } = route.params;
  const insets = useSafeAreaInsets();

  const [paymentMethod, setPaymentMethod] =
    useState<"COD" | "ONLINE">("COD");

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* ===== HEADER ===== */}
      <View style={styles.toolbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.toolbarTitle}>Payment</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* ===== CONTENT ===== */}
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* AMOUNT */}
        <View style={styles.amountCard}>
          <Text style={styles.amountLabel}>Total Amount</Text>
          <Text style={styles.amountValue}>₹ {total}</Text>
        </View>

        {/* PAYMENT METHODS */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Choose Payment Method</Text>

          {/* COD */}
          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === "COD" && styles.paymentOptionActive,
            ]}
            onPress={() => setPaymentMethod("COD")}
          >
            <Ionicons
              name="cash-outline"
              size={22}
              color={paymentMethod === "COD" ? colors.primary : "#666"}
            />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.paymentTitle}>Cash on Delivery</Text>
              <Text style={styles.paymentSub}>
                Pay after service completion
              </Text>
            </View>
            {paymentMethod === "COD" && (
              <Ionicons
                name="checkmark-circle"
                size={20}
                color={colors.primary}
              />
            )}
          </TouchableOpacity>

          {/* ONLINE */}
          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === "ONLINE" && styles.paymentOptionActive,
            ]}
            onPress={() => setPaymentMethod("ONLINE")}
          >
            <Ionicons
              name="card-outline"
              size={22}
              color={paymentMethod === "ONLINE" ? colors.primary : "#666"}
            />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.paymentTitle}>Online Payment</Text>
              <Text style={styles.paymentSub}>
                UPI, Card, Net Banking
              </Text>
            </View>
            {paymentMethod === "ONLINE" && (
              <Ionicons
                name="checkmark-circle"
                size={20}
                color={colors.primary}
              />
            )}
          </TouchableOpacity>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* ===== BOTTOM ACTION ===== */}
      <View
        style={[
          styles.bottomBar,
          { paddingBottom: insets.bottom + 12 },
        ]}
      >
        <TouchableOpacity
  style={styles.primaryBtn}
  onPress={() => {
    Alert.alert(
      paymentMethod === "COD" ? "Order Confirmed" : "Payment Successful",
      paymentMethod === "COD"
        ? "Please pay cash after service completion"
        : "Your payment was successful",
      [
        {
          text: "OK",
          onPress: () =>
            navigation.navigate("BookingHistoryScreen", {
              jobId,
              amount: total,
              paymentMethod,
            }),
        },
      ]
    );
  }}
>
  <Text style={styles.primaryText}>
    {paymentMethod === "COD"
      ? "Confirm Order"
      : `Pay ₹${total}`}
  </Text>
</TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

export default PaymentScreen;

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
  },

  scroll: {
    paddingBottom: 40,
  },

  amountCard: {
    margin: 16,
    padding: 20,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: "center",
  },

  amountLabel: {
    color: "#fff",
    opacity: 0.9,
  },

  amountValue: {
    fontSize: 28,
    fontWeight: "900",
    color: "#fff",
    marginTop: 6,
  },

  card: {
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#F6F9FC",
  },

  sectionTitle: {
    fontWeight: "800",
    marginBottom: 12,
  },

  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 12,
    backgroundColor: "#fff",
  },

  paymentOptionActive: {
    borderColor: colors.primary,
    backgroundColor: "#EEF5FF",
  },

  paymentTitle: {
    fontWeight: "800",
    color: "#222",
  },

  paymentSub: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },

  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },

  primaryBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  primaryText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
  },
});
