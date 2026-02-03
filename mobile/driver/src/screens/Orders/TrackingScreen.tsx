import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";

export default function TrackingScreen({ navigation }: any) {
  const [status, setStatus] = useState<
    "onway" | "arrived" | "cleaning" | "done"
  >("onway");

  const [location, setLocation] = useState<any>(null);
  const watchId = useRef<number | null>(null);

  // =========================
  // 🔐 REQUEST PERMISSION
  // =========================
  const requestPermission = async () => {
    if (Platform.OS !== "android") return true;

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  // =========================
  // ▶️ START GPS
  // =========================
  const startTracking = async () => {
    const ok = await requestPermission();
    if (!ok) {
      Alert.alert("Permission required", "Location permission needed");
      return;
    }

    // Wake GPS
    Geolocation.getCurrentPosition(
      pos => {
        setLocation(pos.coords);
        console.log("📍 Initial GPS:", pos.coords);
      },
      err => console.log("❌ GPS error:", err),
      { enableHighAccuracy: true }
    );

    watchId.current = Geolocation.watchPosition(
      pos => {
        setLocation(pos.coords);
        console.log("🚚 Live GPS:", pos.coords.latitude, pos.coords.longitude);
      },
      err => console.log("❌ Watch error:", err),
      {
        enableHighAccuracy: true,
        distanceFilter: 5,
        interval: 5000,
        fastestInterval: 3000,
      }
    );
  };

  // =========================
  // ⏹ STOP GPS
  // =========================
  const stopTracking = () => {
    if (watchId.current !== null) {
      Geolocation.clearWatch(watchId.current);
      watchId.current = null;
      console.log("🛑 GPS stopped");
    }
  };

  // =========================
  // 🚀 START / STOP LIFECYCLE
  // =========================
  useEffect(() => {
    startTracking();
    return () => stopTracking();
  }, []);

  // =========================
  // 🔁 STATUS FLOW
  // =========================
  const nextStatus = () => {
    if (status === "onway") setStatus("arrived");
    else if (status === "arrived") setStatus("cleaning");
    else if (status === "cleaning") setStatus("done");
    else navigation.goBack();
  };

  const titles = {
    onway: "Driver on the way",
    arrived: "Arrived at location",
    cleaning: "Cleaning in progress",
    done: "Service completed",
  }[status];

  const buttonLabel = {
    onway: "Mark as Arrived",
    arrived: "Start Cleaning",
    cleaning: "Finish Job",
    done: "Close",
  }[status];

  return (
    <SafeAreaView style={styles.container}>
      {/* MAP */}
      <View style={styles.mapWrap}>
        {location && (
          <MapView
            style={StyleSheet.absoluteFill}
            showsUserLocation
            followsUserLocation
            region={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="Driver"
            />
          </MapView>
        )}
      </View>

      {/* BOTTOM CARD */}
      <View style={styles.card}>
        <Text style={styles.title}>{titles}</Text>

        <TouchableOpacity style={styles.btn} onPress={nextStatus}>
          <Text style={styles.btnText}>{buttonLabel}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// =========================
// 🎨 STYLES
// =========================
const styles = StyleSheet.create({
  container: { flex: 1 },

  mapWrap: {
    flex: 1,
    backgroundColor: "#eee",
  },

  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    elevation: 8,
  },

  title: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 14,
  },

  btn: {
    backgroundColor: "#1DBF73",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  btnText: { color: "#fff", fontWeight: "800" },
});
