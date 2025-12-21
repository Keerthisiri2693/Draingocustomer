import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import colors from '../../theme/colors';

const RideInProgressScreen = ({ navigation }: any) => {
  const [minutes, setMinutes] = useState<number>(0);

  // ⏱ Service timer
  useEffect(() => {
    const timer = setInterval(() => {
      setMinutes((prev) => prev + 1);
    }, 60000); // every 1 minute

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Status */}
      <Text style={styles.statusText}>Service in progress</Text>

      {/* Map placeholder */}
      <View style={styles.mapArea}>
        <Text style={styles.mapText}>🧹 Cleaning in progress</Text>
      </View>

      {/* Driver info */}
      <View style={styles.driverCard}>
        <View>
          <Text style={styles.driverName}>Ramesh Kumar</Text>
          <Text style={styles.vehicleInfo}>
            Lorry • TN 09 AB 4321
          </Text>
        </View>

        <Text style={styles.timerText}>{minutes} min</Text>
      </View>

      {/* Actions */}
      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.smallButton}>
          <Text style={styles.smallText}>📞 Call</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.smallButton}>
          <Text style={styles.smallText}>💬 Chat</Text>
        </TouchableOpacity>
      </View>

      {/* Complete Service (demo) */}
      <TouchableOpacity
        style={styles.completeButton}
        onPress={() => navigation.replace('BookingCompleted')}
      >
        <Text style={styles.completeText}>Complete Service</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RideInProgressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 16,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
    color: '#3A2C1D',
  },
  mapArea: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapText: {
    fontSize: 14,
    color: '#555',
  },
  driverCard: {
    marginTop: 12,
    padding: 14,
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  driverName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
  },
  vehicleInfo: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  timerText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  smallButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 4,
    borderRadius: 10,
    backgroundColor: '#F1F1F1',
    alignItems: 'center',
  },
  smallText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  completeButton: {
    marginTop: 16,
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  completeText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
});
