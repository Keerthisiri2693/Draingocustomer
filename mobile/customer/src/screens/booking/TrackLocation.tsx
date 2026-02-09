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

/* ================= SCREEN ================= */
const LocationScreen = ({ navigation }: any) => {
  const mapRef = useRef<MapView>(null);

  /* ⚡ fallback (Tiruvarur) */
  const [userLocation, setUserLocation] = useState<LatLng>({
    latitude: 10.7732,
    longitude: 79.6368,
  });

  const [driverLocation, setDriverLocation] = useState<LatLng | null>(null);
  const [driverBearing, setDriverBearing] = useState(0);
  const [eta, setEta] = useState(8); // minutes
  const [arrived, setArrived] = useState(false);

  /* ================= INIT ================= */
  useEffect(() => {
    getUserLocation();
    loadDriver();
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

  /* ================= DRIVER LOAD ================= */
  const loadDriver = async () => {
    await new Promise(res => setTimeout(res, 600));

    const start = {
      latitude: userLocation.latitude + 0.01,
      longitude: userLocation.longitude + 0.01,
    };

    setDriverLocation(start);
    simulateDriverMovement(start);
  };

  /* ================= DRIVER MOVEMENT ================= */
  const simulateDriverMovement = (start: LatLng) => {
    let lat = start.latitude;
    let lng = start.longitude;
    let remainingEta = 5;

    const interval = setInterval(() => {
      const prev = { latitude: lat, longitude: lng };

      lat -= 0.0003;
      lng -= 0.0003;

      const next = { latitude: lat, longitude: lng };

      setDriverLocation(next);
      setDriverBearing(getBearing(prev, next));

      if (remainingEta > 0) {
        remainingEta -= 1;
        setEta(remainingEta);
      }

      // 🛑 arrived
      if (
        Math.abs(lat - userLocation.latitude) < 0.0005 &&
        Math.abs(lng - userLocation.longitude) < 0.0005
      ) {
        clearInterval(interval);
        setArrived(true);
        setEta(0);
      }
    }, 2000);
  };

  /* ================= BEARING ================= */
  const getBearing = (from: LatLng, to: LatLng) => {
    const lat1 = (from.latitude * Math.PI) / 180;
    const lat2 = (to.latitude * Math.PI) / 180;
    const dLng =
      ((to.longitude - from.longitude) * Math.PI) / 180;

    const y = Math.sin(dLng) * Math.cos(lat2);
    const x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);

    const brng = (Math.atan2(y, x) * 180) / Math.PI;
    return (brng + 360) % 360;
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

        <Marker coordinate={userLocation} title="You" />

        {driverLocation && (
          <>
            <Marker
              coordinate={driverLocation}
              anchor={{ x: 0.5, y: 0.5 }}
              rotation={driverBearing}
              flat
            >
              <Ionicons
                name="car"
                size={26}
                color="#2E7D32"
              />
            </Marker>

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

      {/* ⏱ ETA */}
      {!arrived && (
        <View style={styles.etaBox}>
          <Ionicons name="time-outline" size={16} color="#2E7D32" />
          <Text style={styles.etaText}>
            Arriving in ~{eta} mins
          </Text>
        </View>
      )}

      {/* 🔔 ARRIVED */}
      {arrived && (
        <View style={styles.arrivedBox}>
          <Ionicons
            name="checkmark-circle"
            size={36}
            color="#2E7D32"
          />
          <Text style={styles.arrivedTitle}>
            Driver has arrived
          </Text>

          <TouchableOpacity
            style={styles.continueBtn}
            onPress={() => navigation.navigate("DriverArrivedScreen")}
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
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

  toolbarTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },

  etaBox: {
    position: "absolute",
    bottom: 160,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },

  etaText: {
    marginLeft: 6,
    fontWeight: "700",
    color: "#2E7D32",
  },

  arrivedBox: {
    position: "absolute",
    bottom: 120,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    padding: 22,
    borderRadius: 22,
    alignItems: "center",
    elevation: 8,
  },

  arrivedTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "800",
  },

  continueBtn: {
    marginTop: 14,
    backgroundColor: "#2E7D32",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 16,
  },

  continueText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },
});
