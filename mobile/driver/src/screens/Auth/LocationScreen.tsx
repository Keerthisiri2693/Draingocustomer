import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  StatusBar,
  Platform,
  Switch,
} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker, UrlTile, Polyline } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

/* ================= TYPES ================= */
type LatLng = {
  latitude: number;
  longitude: number;
};

/* ================= CONSTANTS ================= */
const MAPTILER_KEY = "4vd8iPyyOjITbJlpu980";

const TOOLBAR_HEIGHT =
  Platform.OS === "android"
    ? 56 + (StatusBar.currentHeight ?? 0)
    : 56;

/* ================= SCREEN ================= */
export default function LocationScreen() {
  const navigation = useNavigation<any>();
  const mapRef = useRef<MapView>(null);

  const [role, setRole] = useState<"OWNER" | "DRIVER" | null>(null);

  const [driverLocation, setDriverLocation] = useState<LatLng>({
    latitude: 10.790483,
    longitude: 78.704673,
  });

  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [newRide, setNewRide] = useState(false);
  const [rideAccepted, setRideAccepted] = useState(false);

  /* ================= LOAD ROLE ================= */
  useEffect(() => {
    const loadRole = async () => {
      const savedRole = await AsyncStorage.getItem("USER_ROLE");

      if (savedRole === "OWNER" || savedRole === "DRIVER") {
        setRole(savedRole);
      } else {
        // fallback safety
        setRole("DRIVER");
      }
    };

    loadRole();
  }, []);

  /* ================= GET CUSTOMER LOCATION ================= */
  const getUserLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "Location required");
      return;
    }

    const loc = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    setUserLocation({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    });
  };

  /* ================= ACCEPT RIDE ================= */
  const acceptRide = async () => {
    setNewRide(false);
    setRideAccepted(true);
    await getUserLocation();
  };

  /* ================= SIMULATE RIDE ================= */
  useEffect(() => {
    if (isOnline) {
      const timer = setTimeout(() => {
        setNewRide(true);
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      setNewRide(false);
      setRideAccepted(false);
      setUserLocation(null);
    }
  }, [isOnline]);

  /* ================= FIT MAP ================= */
  useEffect(() => {
    if (rideAccepted && userLocation) {
      mapRef.current?.fitToCoordinates(
        [driverLocation, userLocation],
        {
          edgePadding: { top: 160, right: 60, bottom: 200, left: 60 },
          animated: true,
        }
      );
    }
  }, [rideAccepted, userLocation]);

  /* ================= START RIDE ================= */
  const handleStartRide = () => {
    if (role === "OWNER") {
      navigation.replace("OwnerDashboardScreen");
    } else {
      navigation.replace("Main"); // Driver main screen
    }
  };

  /* ================= UI ================= */
  return (
    <View style={styles.container}>
      {/* ===== TOOLBAR ===== */}
      <View style={styles.toolbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.toolbarTitle}>Live Tracking</Text>

        <View style={styles.toolbarRight}>
          <Text style={{ color: "#fff", marginRight: 6 }}>
            {isOnline ? "Online" : "Offline"}
          </Text>
          <Switch
            value={isOnline}
            onValueChange={setIsOnline}
            trackColor={{ false: "#ccc", true: "#8FF2A6" }}
            thumbColor={isOnline ? "#2ecc71" : "#999"}
          />
        </View>
      </View>



      {/* ===== CUSTOMER CARD ===== */}
      {rideAccepted && (
        <View style={styles.customerTopCard}>
          <Text style={styles.customerTitle}>Customer Details</Text>
          <Text style={styles.customerText}>Ravi Kumar</Text>
          <Text style={styles.customerText}>📍 Anna Nagar → T Nagar</Text>
          <Text style={styles.customerText}>📞 98765 12345</Text>

          <TouchableOpacity
            style={styles.startRideBtn}
            onPress={handleStartRide}
          >
            <Text style={styles.startRideText}>Start Ride</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ===== MAP ===== */}
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        onMapReady={() => setMapReady(true)}
        initialRegion={{
          latitude: driverLocation.latitude,
          longitude: driverLocation.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <UrlTile
          urlTemplate={`https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=${MAPTILER_KEY}`}
          maximumZ={18}
        />

        <Marker coordinate={driverLocation} title="You" pinColor="green" />

        {rideAccepted && userLocation && (
          <>
            <Marker coordinate={userLocation} title="Customer" pinColor="red" />
            <Polyline
              coordinates={[driverLocation, userLocation]}
              strokeColor="#2E7D32"
              strokeWidth={4}
            />
          </>
        )}
      </MapView>

      {!mapReady && (
        <View style={styles.mapLoader}>
          <ActivityIndicator size="large" color="#2E7D32" />
          <Text>Loading map…</Text>
        </View>
      )}

      {/* ===== NEW RIDE ===== */}
      {newRide && !rideAccepted && (
        <View style={styles.overlay}>
          <View style={styles.rideCard}>
            <Text style={styles.rideTitle}>🚨 New Ride Request</Text>

            <Text style={styles.rideText}>Pickup: Anna Nagar</Text>
            <Text style={styles.rideText}>Drop: T Nagar</Text>

            <View style={styles.rideActions}>
              <TouchableOpacity
                style={styles.rejectBtn}
                onPress={() => setNewRide(false)}
              >
                <Text style={{ color: "#c0392b", fontWeight: "700" }}>
                  Reject
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.acceptBtn}
                onPress={acceptRide}
              >
                <Text style={{ color: "#fff", fontWeight: "700" }}>
                  Accept
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: { flex: 1 },
  toolbar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: TOOLBAR_HEIGHT,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#2E7D32",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    zIndex: 50,
  },
  toolbarTitle: { color: "#fff", fontSize: 16, fontWeight: "800" },
  toolbarRight: { flexDirection: "row", alignItems: "center" },

  customerTopCard: {
    position: "absolute",
    top: TOOLBAR_HEIGHT + 10,
    left: 16,
    right: 16,
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 16,
    elevation: 6,
    zIndex: 40,
  },

  customerTitle: { fontWeight: "800", color: "#2E7D32" },
  customerText: { fontSize: 13 },

  startRideBtn: {
    marginTop: 10,
    backgroundColor: "#2E7D32",
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
  },

  startRideText: { color: "#fff", fontWeight: "800" },

  mapLoader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.9)",
    zIndex: 100,
  },

  overlay: {
    position: "absolute",
    top: TOOLBAR_HEIGHT,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    paddingTop: 16,
    zIndex: 60,
  },

  rideCard: {
    backgroundColor: "#fff",
    width: "90%",
    padding: 20,
    borderRadius: 20,
  },

  rideTitle: { fontWeight: "800", marginBottom: 10 },
  rideText: { marginBottom: 4 },

  rideActions: { flexDirection: "row", gap: 12, marginTop: 16 },

  rejectBtn: {
    flex: 1,
    padding: 12,
    borderWidth: 2,
    borderColor: "#c0392b",
    borderRadius: 10,
    alignItems: "center",
  },

  acceptBtn: {
    flex: 1,
    padding: 12,
    backgroundColor: "#2E7D32",
    borderRadius: 10,
    alignItems: "center",
  },

  roleContainer: {
  position: "absolute",
  top: TOOLBAR_HEIGHT + 10,
  left: 16,
  right: 16,
  flexDirection: "row",
  backgroundColor: "#fff",
  borderRadius: 14,
  padding: 6,
  zIndex: 45,
},

roleBtn: {
  flex: 1,
  paddingVertical: 10,
  alignItems: "center",
  borderRadius: 10,
},

activeRole: {
  backgroundColor: "#2E7D32",
},

roleText: {
  fontWeight: "700",
  color: "#2E7D32",
},

activeRoleText: {
  color: "#fff",
},

});
