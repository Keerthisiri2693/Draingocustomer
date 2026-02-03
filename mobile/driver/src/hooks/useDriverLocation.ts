import { useEffect, useRef } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid, Platform } from 'react-native';

export const useDriverLocation = (
  onLocationUpdate: (lat: number, lng: number) => void,
) => {
  const watchId = useRef<number | null>(null);

  useEffect(() => {
    startTracking();

    return () => stopTracking();
  }, []);

  const startTracking = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    watchId.current = Geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;
        onLocationUpdate(latitude, longitude);
      },
      error => {
        console.log('GPS Error:', error);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 10, // meters
        interval: 5000,     // Android
        fastestInterval: 3000,
      },
    );
  };

  const stopTracking = () => {
    if (watchId.current !== null) {
      Geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
  };

  const requestPermission = async () => {
    if (Platform.OS !== 'android') return true;

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };
};
