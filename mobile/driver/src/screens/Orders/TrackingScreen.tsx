import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  StatusBar,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker, UrlTile, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";

type JobStatus = "onway" | "arrived" | "cleaning" | "done";

/* 🔑 MAPTILER */
const MAPTILER_KEY = "4vd8iPyyOjITbJlpu980";

const TOOLBAR_HEIGHT =
  Platform.OS === "android"
    ? 56 + (StatusBar.currentHeight ?? 0)
    : 56;

/* 📍 CUSTOMER LOCATION */
const CUSTOMER_LOCATION = {
  latitude: 10.7867,
  longitude: 79.1378,
};


/* 🧮 DISTANCE */
const getDistanceKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

export default function TrackingScreen({ navigation }: { navigation: any }) {
  const mapRef = useRef<MapView>(null);

  const [status, setStatus] = useState<JobStatus>("onway");
  const [driverLocation, setDriverLocation] =
    useState<Location.LocationObjectCoords | null>(null);

  const [travelledPath, setTravelledPath] = useState<any[]>([]);
  const [instruction, setInstruction] = useState("Start driving");

  const subscription = useRef<Location.LocationSubscription | null>(null);

  /* =====================
     START TRACKING
  ===================== */
  const startTracking = async () => {
    const { status } =
      await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permission required");
      return;
    }

    const current =
      await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

    setDriverLocation(current.coords);
    setTravelledPath([
      {
        latitude: current.coords.latitude,
        longitude: current.coords.longitude,
      },
    ]);

    subscription.current =
      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced,
          distanceInterval: 5,
          timeInterval: 3000,
        },
        (pos) => {
          setDriverLocation(pos.coords);

          setTravelledPath((prev) => [
            ...prev,
            {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            },
          ]);

          mapRef.current?.animateCamera(
            {
              center: {
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
              },
              zoom: 17,
            },
            { duration: 700 }
          );
        }
      );
  };

  useEffect(() => {
    startTracking();
    return () => subscription.current?.remove();
  }, []);

  /* =====================
     ETA + DISTANCE
  ===================== */
  const distanceKm = useMemo(() => {
    if (!driverLocation) return 0;
    return getDistanceKm(
      driverLocation.latitude,
      driverLocation.longitude,
      CUSTOMER_LOCATION.latitude,
      CUSTOMER_LOCATION.longitude
    );
  }, [driverLocation]);

  const etaMinutes = Math.max(
    1,
    Math.round((distanceKm / 30) * 60)
  );

  /* =====================
     CUSTOMER ROUTE (FIX)
  ===================== */
  const customerRoute = useMemo(() => {
    if (!driverLocation) return [];
    return [
      {
        latitude: driverLocation.latitude,
        longitude: driverLocation.longitude,
      },
      CUSTOMER_LOCATION,
    ];
  }, [driverLocation]);

  /* =====================
     TURN INSTRUCTIONS
  ===================== */
  useEffect(() => {
    if (distanceKm < 0.05) {
      setInstruction("You have arrived");
      setStatus("arrived");
    } else if (distanceKm < 0.3) {
      setInstruction("Approaching destination");
    } else {
      setInstruction("Continue");
    }
  }, [distanceKm]);

  /* =====================
     STATUS FLOW
  ===================== */
  const nextStatus = () => {
    if (status === "arrived") setStatus("cleaning");
    else if (status === "cleaning") setStatus("done");
    else navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      {/* ===== TOOLBAR ===== */}
      <View style={styles.toolbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.toolbarTitle}>
          {etaMinutes} min • {distanceKm.toFixed(1)} km
        </Text>

        <View style={{ width: 22 }} />
      </View>

      {/* ===== MAP ===== */}
      <View style={styles.mapWrap}>
        {driverLocation && (
          <MapView
            ref={mapRef}
            style={StyleSheet.absoluteFill}
            initialRegion={{
              latitude: driverLocation.latitude,
              longitude: driverLocation.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <UrlTile
              urlTemplate={`https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${MAPTILER_KEY}`}
              maximumZ={19}
            />

            {/* 🟢 TRAVELLED PATH */}
            <Polyline
              coordinates={travelledPath}
              strokeColor="#1DBF73"
              strokeWidth={4}
            />

            {/* 🔵 DRIVER → CUSTOMER ROUTE */}
            <Polyline
              coordinates={customerRoute}
              strokeColor="#db3434"
              strokeWidth={6}
              lineDashPattern={[10, 6]}
            />

            {/* DRIVER */}
            <Marker
              coordinate={{
                latitude: driverLocation.latitude,
                longitude: driverLocation.longitude,
              }}
              title="You"
              pinColor="green"
            />

            {/* CUSTOMER */}
            <Marker
              coordinate={CUSTOMER_LOCATION}
              title="Customer"
              pinColor="red"
            />
          </MapView>
        )}

        {/* 🔄 RECENTER */}
        <TouchableOpacity
          style={styles.recenterBtn}
          onPress={() =>
            mapRef.current?.fitToCoordinates(
              [...travelledPath, CUSTOMER_LOCATION],
              {
                edgePadding: {
                  top: 120,
                  bottom: 260,
                  left: 60,
                  right: 60,
                },
                animated: true,
              }
            )
          }
        >
          <Ionicons name="locate" size={22} color="#1DBF73" />
        </TouchableOpacity>
      </View>

      {/* ===== NAV CARD ===== */}
      <View style={styles.card}>
        <Text style={styles.instruction}>{instruction}</Text>

        {status !== "onway" && (
          <TouchableOpacity style={styles.btn} onPress={nextStatus}>
            <Text style={styles.btnText}>
              {status === "arrived"
                ? "Start Cleaning"
                : status === "cleaning"
                ? "Finish Job"
                : "Close"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

/* =====================
   STYLES
===================== */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F6F8" },

  toolbar: {
    height: TOOLBAR_HEIGHT,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#1DBF73",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  toolbarTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "800",
  },

  mapWrap: { flex: 1 },

  recenterBtn: {
    position: "absolute",
    right: 16,
    bottom: 140,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 30,
    elevation: 6,
  },

  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 12,
    marginBottom:10
  },

  instruction: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 12,
    color: "#222",
  },

  btn: {
    backgroundColor: "#1DBF73",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 15,
  },
});
