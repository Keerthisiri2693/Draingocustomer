import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
  Linking,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import MapView, { Marker, Polyline, UrlTile } from "react-native-maps";

const TOOLBAR_HEIGHT =
  Platform.OS === "android"
    ? 56 + (StatusBar.currentHeight ?? 0)
    : 56;

const MAPTILER_KEY = "4vd8iPyyOjITbJlpu980";

export default function OwnerOrderDetailsScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const mapRef = useRef<MapView>(null);

  const order = route.params?.order;

  if (!order) return null;

  const canShowMap =
    order.status === "ONGOING" &&
    Number.isFinite(order.driverLat) &&
    Number.isFinite(order.driverLng) &&
    Number.isFinite(order.dropLat) &&
    Number.isFinite(order.dropLng);

  const callDriver = async () => {
    const url = `tel:${order.driverPhone}`;
    if (!(await Linking.canOpenURL(url))) {
      Alert.alert("Calling not supported");
      return;
    }
    Linking.openURL(url);
  };

const goToTracking = () => {
  if (!canShowMap) {
    Alert.alert("Tracking unavailable", "Location data not found");
    return;
  }

  navigation.navigate("TrackingScreen", {
    driverLat: order.driverLat,
    driverLng: order.driverLng,
    dropLat: order.dropLat,
    dropLng: order.dropLng,
    orderId: order.id,
  });
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
        <Text style={styles.toolbarTitle}>Order Details</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* ===== CONTENT ===== */}
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 120 }}>
        {/* ===== MAP ===== */}
      {canShowMap && (
  <View style={styles.mapCard}>
    <Text style={styles.sectionTitle}>Live Tracking</Text>

    <MapView
      ref={mapRef}
      style={styles.map}
      scrollEnabled={false}
      initialRegion={{
        latitude: order.driverLat,
        longitude: order.driverLng,
        latitudeDelta: 0.08,
        longitudeDelta: 0.08,
      }}
    >
      {/* 🗺️ MapTiler tiles */}
      <UrlTile
        urlTemplate={`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${MAPTILER_KEY}`}
        maximumZ={20}
        flipY={false}
      />

      {/* 🚗 Driver */}
      <Marker
        coordinate={{
          latitude: order.driverLat,
          longitude: order.driverLng,
        }}
        title="Driver"
      />

      {/* 📍 Drop */}
      <Marker
        coordinate={{
          latitude: order.dropLat,
          longitude: order.dropLng,
        }}
        title="Drop Location"
      />

      {/* 🛣️ Route */}
      <Polyline
        coordinates={[
          { latitude: order.driverLat, longitude: order.driverLng },
          { latitude: order.dropLat, longitude: order.dropLng },
        ]}
        strokeWidth={4}
        strokeColor="#1DBF73"
      />
    </MapView>
  </View>
)}


        {/* ===== ORDER INFO ===== */}
        <View style={styles.card}>
          <InfoRow label="Order ID" value={order.id} />
          <InfoRow label="Status" value={order.status} />
          <InfoRow label="Vehicle" value={order.vehicle} />
          <InfoRow label="Driver" value={order.driver} />
          <InfoRow label="Distance" value={order.distance} />
          <InfoRow label="Duration" value={order.duration} />
        </View>

        {/* ===== EARNINGS ===== */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Earnings</Text>

          <InfoRow label="Trip Amount" value={`₹${order.totalAmount}`} />
          <InfoRow label="Commission" value={`- ₹${order.commission}`} />
          <View style={styles.divider} />
          <InfoRow
            label="Owner Earnings"
            value={`₹${order.ownerEarning}`}
            highlight
          />
        </View>
      </ScrollView>

      {/* ===== BOTTOM ACTION BAR ===== */}
      <View style={styles.bottomBar}>
        <ActionBtn
          icon="call-outline"
          label="Call"
          onPress={callDriver}
        />

      <ActionBtn
  icon="navigate-outline"
  label="Track"
  onPress={goToTracking}
/>

        <ActionBtn
          icon="list-outline"
          label="Orders"
          onPress={() => navigation.goBack()}
        />
      </View>
    </SafeAreaView>
  );
}

/* ================= SMALL COMPONENTS ================= */

const InfoRow = ({ label, value, highlight }: any) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text
      style={[
        styles.infoValue,
        highlight && { color: "#1DBF73", fontSize: 16 },
      ]}
    >
      {value}
    </Text>
  </View>
);

const ActionBtn = ({ icon, label, onPress }: any) => (
  <TouchableOpacity style={styles.actionBtn} onPress={onPress}>
    <Ionicons name={icon} size={20} color="#1DBF73" />
    <Text style={styles.actionText}>{label}</Text>
  </TouchableOpacity>
);

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F8F6" },

  toolbar: {
    height: TOOLBAR_HEIGHT,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#1DBF73",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  toolbarTitle: { color: "#fff", fontSize: 16, fontWeight: "800" },

  mapCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 10,
    marginBottom: 14,
    elevation: 3,
  },

  map: { height: 220, borderRadius: 12 },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 10,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  infoLabel: { color: "#666", fontSize: 13 },
  infoValue: { fontWeight: "700", fontSize: 14 },

  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 8,
  },

  /* ===== BOTTOM BAR ===== */
  bottomBar: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: Platform.OS === "ios" ? 30 : 50,
    height: 64,
    backgroundColor: "#fff",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    elevation: 12,
  },

  actionBtn: {
    alignItems: "center",
    justifyContent: "center",
  },

  actionText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#1DBF73",
    marginTop: 2,
  },
});
