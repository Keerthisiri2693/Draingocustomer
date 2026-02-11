import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PRIMARY = "#16A34A";

const PRICING: any = {
  Lorry: {
    Silver: { price: 400, offer: 0 },
    Gold: { price: 1200, offer: 100 },
    Platinum: { price: 2400, offer: 200 },
  },
  Tractor: {
    Silver: { price: 200, offer: 0 },
    Gold: { price: 600, offer: 50 },
    Platinum: { price: 1200, offer: 100 },
  },
};

export default function MembershipScreen({ navigation }: any) {
  const [vehicleType, setVehicleType] =
    useState<"Lorry" | "Tractor">("Lorry");

  const [currentPlan, setCurrentPlan] =
    useState<"Silver" | "Gold" | "Platinum">("Gold");

  const calculateFinal = (base: number, offer: number) => {
    const afterOffer = base - offer;
    const gst = afterOffer * 0.18;
    return (afterOffer + gst).toFixed(2);
  };

  /* ✅ PROFESSIONAL PLAN HANDLER */
  const handlePlanAction = async (
    plan: "Silver" | "Gold" | "Platinum",
    isRenew: boolean = false
  ) => {
    try {
      setCurrentPlan(plan);

      if (isRenew) {
        // Clear old membership status
        await AsyncStorage.removeItem("MEMBERSHIP_STATUS");
      }

      // Mark membership selected
      await AsyncStorage.setItem("MEMBERSHIP_DONE", "true");

      // IMPORTANT: Set status to pending
      await AsyncStorage.setItem("MEMBERSHIP_STATUS", "PENDING");

      // Navigate to Pending screen
      navigation.replace("PendingApprovalScreen");

    } catch (e) {
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Membership Plans</Text>

          <View style={{ width: 40 }} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* VEHICLE TOGGLE */}
        <View style={styles.segmentWrapper}>
          {["Lorry", "Tractor"].map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.segmentBtn,
                vehicleType === type && styles.segmentActive,
              ]}
              onPress={() => setVehicleType(type as any)}
            >
              <Text
                style={[
                  styles.segmentText,
                  vehicleType === type && styles.segmentTextActive,
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* PLAN CARDS */}
        {["Silver", "Gold", "Platinum"].map((plan) => {
          const data = PRICING[vehicleType][plan];
          const finalAmount = calculateFinal(data.price, data.offer);

          return (
            <View
              key={plan}
              style={[
                styles.card,
                plan === "Gold" && styles.recommendedCard,
              ]}
            >
              {plan === "Gold" && (
                <View style={styles.recommendedBadge}>
                  <Text style={styles.recommendedText}>
                    MOST POPULAR
                  </Text>
                </View>
              )}

              <Text style={styles.planName}>{plan}</Text>

              <View style={styles.priceRow}>
                <Text style={styles.currency}>₹</Text>
                <Text style={styles.price}>{data.price}</Text>
                <Text style={styles.per}> / month</Text>
              </View>

              <Text style={styles.tax}>+ 18% GST applicable</Text>

              {data.offer > 0 && (
                <Text style={styles.offer}>
                  🎉 Save ₹{data.offer} instantly
                </Text>
              )}

              <Text style={styles.finalAmount}>
                Total Payable: ₹{finalAmount}
              </Text>

              {currentPlan === plan ? (
                <View style={styles.actionRow}>
                  <TouchableOpacity
                    style={styles.renewBtn}
                    onPress={() => handlePlanAction(plan as any, true)}
                  >
                    <Text style={styles.renewText}>Renew</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.cancelBtn}>
                    <Text style={styles.cancelText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.chooseBtn}
                  onPress={() => handlePlanAction(plan as any, false)}
                >
                  <Text style={styles.chooseText}>Choose Plan</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  header: {
    backgroundColor: PRIMARY,
    paddingTop:
      Platform.OS === "android" ? StatusBar.currentHeight : 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 40,
  },

  segmentWrapper: {
    flexDirection: "row",
    backgroundColor: "#E2E8F0",
    borderRadius: 30,
    padding: 5,
    marginBottom: 25,
  },

  segmentBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 30,
    alignItems: "center",
  },

  segmentActive: {
    backgroundColor: PRIMARY,
  },

  segmentText: {
    fontWeight: "600",
    color: "#475569",
  },

  segmentTextActive: {
    color: "#fff",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 22,
    elevation: 3,
  },

  recommendedCard: {
    borderWidth: 1.5,
    borderColor: PRIMARY,
  },

  recommendedBadge: {
    position: "absolute",
    top: -12,
    right: 20,
    backgroundColor: PRIMARY,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },

  recommendedText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },

  planName: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "flex-end",
  },

  currency: {
    fontSize: 18,
    fontWeight: "600",
  },

  price: {
    fontSize: 32,
    fontWeight: "800",
    marginLeft: 4,
  },

  per: {
    fontSize: 13,
    color: "#64748B",
    marginLeft: 6,
    marginBottom: 4,
  },

  tax: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 4,
  },

  offer: {
    marginTop: 8,
    fontSize: 13,
    color: "#DC2626",
    fontWeight: "600",
  },

  finalAmount: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: "700",
    color: PRIMARY,
  },

  chooseBtn: {
    backgroundColor: PRIMARY,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 16,
  },

  chooseText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },

  actionRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
  },

  renewBtn: {
    flex: 1,
    backgroundColor: "#DCFCE7",
    paddingVertical: 13,
    borderRadius: 14,
    alignItems: "center",
  },

  renewText: {
    color: PRIMARY,
    fontWeight: "700",
  },

  cancelBtn: {
    flex: 1,
    backgroundColor: "#FEE2E2",
    paddingVertical: 13,
    borderRadius: 14,
    alignItems: "center",
  },

  cancelText: {
    color: "#DC2626",
    fontWeight: "700",
  },
});
