import { useEffect, useRef } from "react";
import * as Location from "expo-location";

export const useDriverLocation = (
  onLocationUpdate: (lat: number, lng: number) => void
) => {
  const subscription = useRef<Location.LocationSubscription | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    startTracking();

    return () => {
      mountedRef.current = false;
      stopTracking();
    };
  }, []);

  // =========================
  // ▶️ START TRACKING
  // =========================
  const startTracking = async () => {
    try {
      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.warn("Location permission denied");
        return;
      }

      subscription.current =
        await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            distanceInterval: 10, // meters
            timeInterval: 5000,   // ms
          },
          (position) => {
            if (!mountedRef.current) return;

            const { latitude, longitude } = position.coords;
            onLocationUpdate(latitude, longitude);
          }
        );
    } catch (error) {
      console.error("Location tracking error:", error);
    }
  };

  // =========================
  // ⏹ STOP TRACKING
  // =========================
  const stopTracking = () => {
    if (subscription.current) {
      subscription.current.remove();
      subscription.current = null;
    }
  };
};
