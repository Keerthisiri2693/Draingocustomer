import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
  Animated,
  Easing,
  Image,
  ScrollView,
} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker, UrlTile, Polyline } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";

/* ================= CONSTANTS ================= */
const MAPTILER_KEY = "4vd8iPyyOjITbJlpu980";

const TOOLBAR_HEIGHT =
  Platform.OS === "android"
    ? 56 + (StatusBar.currentHeight || 0)
    : 56;

/* ================= TYPES ================= */
type LatLng = {
  latitude: number;
  longitude: number;
};

type DriverDetails = {
  name: string;
  phone: string;
  rating: number;
};

type VehicleDetails = {
  vehicleNumber: string;
  vehicleType: string;
  tankCapacity: number;
};

/* ================= SCREEN ================= */
const LocationScreen = ({ navigation }: any) => {
  const mapRef = useRef<MapView>(null);

  const sheetAnim = useRef(new Animated.Value(0)).current;
  const notifAnim = useRef(new Animated.Value(-120)).current;

  /* ⚡ Fast fallback (Tiruvarur) */
  const [userLocation, setUserLocation] = useState<LatLng>({
    latitude: 10.7732,
    longitude: 79.6368,
  });

  const [driverAvailable, setDriverAvailable] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const [driverLocation, setDriverLocation] = useState<LatLng | null>(null);
  const [driverDetails, setDriverDetails] = useState<DriverDetails | null>(null);
  const [vehicleDetails, setVehicleDetails] =
    useState<VehicleDetails | null>(null);

  /* ================= INIT ================= */
  useEffect(() => {
    getUserLocation();
    loadDriver(); // simulate availability (true / false)
  }, []);

  /* ================= LOCATION ================= */
  const getUserLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") return;

    const loc =
      (await Location.getLastKnownPositionAsync()) ||
      (await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      }));

    if (!loc) return;

    setUserLocation({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    });
  };

  /* ================= DRIVER AVAILABILITY ================= */
  const loadDriver = async () => {
    await new Promise(res => setTimeout(res, 600));

    const found = Math.random() > 0.5; // 🔁 simulate backend

    if (!found) {
      setDriverAvailable(false);
      return;
    }

    setDriverAvailable(true);

    setDriverLocation({
      latitude: 10.7732,
      longitude: 79.6368,
    });

    setDriverDetails({
      name: "Ramesh Kumar",
      phone: "98765 43210",
      rating: 4.6,
    });

    setVehicleDetails({
      vehicleNumber: "TN 45 AB 1234",
      vehicleType: "Water Tanker",
      tankCapacity: 5000,
    });

    Animated.timing(notifAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  /* ================= CAMERA ================= */
  useEffect(() => {
    if (userLocation && driverLocation) {
      mapRef.current?.fitToCoordinates(
        [userLocation, driverLocation],
        {
          edgePadding: {
            top: TOOLBAR_HEIGHT + 40,
            bottom: 220,
            left: 60,
            right: 60,
          },
          animated: true,
        }
      );
    }
  }, [userLocation, driverLocation]);

  /* ================= SHEET ================= */
  const openSheet = () => {
    setShowDetails(true);
    Animated.timing(sheetAnim, {
      toValue: 1,
      duration: 280,
      useNativeDriver: true,
    }).start();
  };

  const closeSheet = () => {
    Animated.timing(sheetAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setShowDetails(false));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2E7D32" />

      {/* ===== MAP ===== */}
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        liteMode={Platform.OS === "android"}
        initialRegion={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <UrlTile
          urlTemplate={`https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${MAPTILER_KEY}`}
          maximumZ={20}
        />

        <Marker coordinate={userLocation} />

        {driverAvailable && driverLocation && (
          <>
            <Marker coordinate={driverLocation} />
            <Polyline
              coordinates={[userLocation, driverLocation]}
              strokeColor="#2E7D32"
              strokeWidth={4}
            />
          </>
        )}
      </MapView>

      {/* ===== TOOLBAR ===== */}
      <View style={styles.toolbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.toolbarTitle}>Live Tracking</Text>
        <Ionicons name="locate" size={22} color="#fff" />
      </View>

      {/* ===== DRIVER AVAILABLE ===== */}
      {driverAvailable && !showDetails && (
        <Animated.View
          style={[
            styles.notificationWrap,
            { transform: [{ translateY: notifAnim }] },
          ]}
        >
          <TouchableOpacity
            style={styles.notificationCard}
            onPress={openSheet}
            activeOpacity={0.9}
          >
            <View style={styles.previewLeft}>
              <Image
                source={{ uri: "https://i.pravatar.cc/150?img=12" }}
                style={styles.previewAvatar}
              />
              <View>
                <Text style={styles.previewName}>
                  {driverDetails?.name}
                </Text>
                <Text style={styles.previewRating}>
                  ⭐ {driverDetails?.rating} • {vehicleDetails?.vehicleType}
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-down" size={18} color="#2E7D32" />
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* ===== DRIVER NOT AVAILABLE ===== */}
      {!driverAvailable && (
        <View style={styles.noDriverBox}>
          <Ionicons name="information-circle-outline" size={36} color="#999" />
          <Text style={styles.noDriverTitle}>Driver not available</Text>
          <Text style={styles.noDriverText}>
            We’ll proceed with your booking and assign a driver later.
          </Text>

          <TouchableOpacity
            style={styles.continueBtn}
            onPress={() => navigation.navigate("BookingScreen")}
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ===== DETAILS SHEET ===== */}
      {driverAvailable && showDetails && (
        <View style={styles.overlay}>
          <TouchableOpacity style={styles.overlayBg} onPress={closeSheet} />

          <Animated.View
            style={[
              styles.detailsSheet,
              {
                transform: [
                  {
                    translateY: sheetAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-460, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={styles.sheetHandle} />

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.driverName}>{driverDetails?.name}</Text>

              <TouchableOpacity
                style={styles.continueBtn}
                onPress={() => navigation.navigate("BookingScreen")}
              >
                <Text style={styles.continueText}>Continue</Text>
              </TouchableOpacity>
            </ScrollView>
          </Animated.View>
        </View>
      )}
    </View>
  );
};

export default LocationScreen;

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
    zIndex: 30,
  },

  toolbarTitle: { color: "#fff", fontSize: 16, fontWeight: "800" },

  notificationWrap: {
    position: "absolute",
    top: TOOLBAR_HEIGHT + 8,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 25,
  },

  notificationCard: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 16,
    width: "92%",
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 8,
  },

  previewLeft: { flexDirection: "row", alignItems: "center" },

  previewAvatar: { width: 44, height: 44, borderRadius: 22, marginRight: 12 },

  previewName: { fontWeight: "800" },

  previewRating: { fontSize: 12, color: "#666" },

  overlay: {
    position: "absolute",
    top: TOOLBAR_HEIGHT,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 24,
  },

  overlayBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  detailsSheet: {
    backgroundColor: "#fff",
    padding: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    maxHeight: "75%",
  },

  sheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#ccc",
    alignSelf: "center",
    borderRadius: 4,
    marginBottom: 14,
  },

  driverName: { fontSize: 16, fontWeight: "800", marginBottom: 20 },

  noDriverBox: {
    position: "absolute",
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    padding: 22,
    borderRadius: 22,
    alignItems: "center",
    elevation: 8,
  },

  noDriverTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "800",
  },

  noDriverText: {
    fontSize: 13,
    color: "#666",
    marginTop: 6,
    textAlign: "center",
  },

  continueBtn: {
    marginTop: 16,
    backgroundColor: "#2E7D32",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    width: "100%",
  },

  continueText: { color: "#fff", fontSize: 16, fontWeight: "800" },
});
