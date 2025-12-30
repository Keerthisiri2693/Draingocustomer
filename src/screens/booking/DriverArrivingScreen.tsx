import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView,StatusBar,Platform, } from 'react-native';
import colors from '../../theme/colors';
import AppIcon from '../../components/AppIcon';
import commonStyles from '../../theme/styles';

const DriverArrivingScreen = ({ navigation }: any) => {
  useEffect(() => {
    const t = setTimeout(() => {
      navigation.replace('DriverArrived');
    }, 5000);

    return () => clearTimeout(t);
  }, [navigation]);

  return (
    <SafeAreaView style={{flex: 1,backgroundColor: colors.white,paddingTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : 0,}}>
    <View style={styles.container}>
      <Text style={styles.statusText}>Driver is arriving now</Text>

      <View style={styles.mapArea}>
        <AppIcon type="fa5" name="truck-moving" size={32} color={colors.primary} />
        <Text style={styles.mapText}>Driver en route</Text>
      </View>

      <View style={commonStyles.card}>
        <View>
          <Text style={styles.driverName}>Ramesh Kumar</Text>
          <Text style={styles.vehicleInfo}>Lorry • TN 09 AB 4321</Text>
        </View>
        <Text style={styles.eta}>ETA: 5 mins</Text>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionBtn}>
          <View style={styles.actionContent}>
            <AppIcon type="material" name="call" color={colors.primary} />
            <Text style={styles.actionText}>Call</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn}>
          <View style={styles.actionContent}>
            <AppIcon type="material" name="message" color={colors.primary} />
            <Text style={styles.actionText}>Chat</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
  );
};

export default DriverArrivingScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white, padding: 16 },
  statusText: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
    color: '#3A2C1D',
  },
  mapArea: {
    flex: 1,
    backgroundColor: '#EEE',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  mapText: { marginTop: 8, color: '#555' },
  driverName: { fontSize: 15, fontWeight: '700', color: '#333' },
  vehicleInfo: { fontSize: 12, color: '#777', marginTop: 4 },
  eta: { fontSize: 13, fontWeight: '600', color: colors.primary },
  actionsRow: { flexDirection: 'row', marginTop: 12 },
  actionBtn: { flex: 1, marginHorizontal: 6 },
  actionContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  actionText: { fontSize: 13, fontWeight: '600', color: '#333' },
});
