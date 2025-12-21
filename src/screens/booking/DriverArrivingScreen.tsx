import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import colors from '../../theme/colors';

const DriverArrivingScreen = ({ navigation }: any) => {
    useEffect(() => {
    const t = setTimeout(() => {
      navigation.replace('DriverArrived');
    }, 5000);

    return () => clearTimeout(t);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Status */}
      <Text style={styles.statusText}>Driver is arriving now…</Text>

      {/* Fake Map Area */}
      <View style={styles.mapArea}>
        <Text style={styles.mapText}>🚛 Driver en route</Text>
      </View>

      {/* Driver Card */}
      <View style={styles.driverCard}>
        <View>
          <Text style={styles.driverName}>Ramesh Kumar</Text>
          <Text style={styles.vehicleInfo}>
            Lorry • TN 09 AB 4321
          </Text>
        </View>

        <Text style={styles.eta}>ETA: 5 mins</Text>
      </View>

      {/* Actions */}
      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>📞 Call</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>💬 Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.cancelButton]}
          onPress={() => navigation.navigate('Tabs')}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DriverArrivingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 16,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
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
  eta: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 4,
    borderRadius: 10,
    backgroundColor: '#F1F1F1',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  cancelButton: {
    backgroundColor: '#FFF0F0',
  },
  cancelText: {
    color: colors.danger,
    fontWeight: '600',
  },
});
