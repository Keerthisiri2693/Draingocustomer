import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView,StatusBar,Platform, } from 'react-native';
import colors from '../../theme/colors';
import AppIcon from '../../components/AppIcon';
import commonStyles from '../../theme/styles';

const DriverArrivedScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={{flex: 1,backgroundColor: colors.white,paddingTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : 0,}}>
    <View style={styles.container}>
      <Text style={styles.statusText}>Driver has arrived</Text>

      <View style={styles.mapArea}>
        <AppIcon type="fa5" name="map-marker-alt" size={28} color={colors.primary} />
        <Text style={styles.mapText}>Pickup location</Text>
      </View>

      <View style={commonStyles.card}>
        <View>
          <Text style={styles.driverName}>Ramesh Kumar</Text>
          <Text style={styles.vehicleInfo}>Lorry • TN 09 AB 4321</Text>
        </View>
        <Text style={styles.arrived}>Arrived</Text>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.smallBtn}>
          <AppIcon type="material" name="call" color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.smallBtn}>
          <AppIcon type="material" name="massage" color={colors.primary} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.boardBtn}
        onPress={() => navigation.replace('RideInProgress')}
      >
        <Text style={styles.boardText}>I’m boarding</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

export default DriverArrivedScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white, padding: 16 },
  statusText: { fontSize: 16, fontWeight: '700', textAlign: 'center', marginBottom: 12 },
  mapArea: {
    flex: 1,
    backgroundColor: '#EEE',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: { marginTop: 6, color: '#555' },
  driverName: { fontSize: 15, fontWeight: '700' },
  vehicleInfo: { fontSize: 12, color: '#777', marginTop: 4 },
  arrived: { fontSize: 13, fontWeight: '600', color: colors.primary },
  actionsRow: { flexDirection: 'row', justifyContent: 'center', marginVertical: 12 },
  smallBtn: {
    marginHorizontal: 10,
    padding: 12,
    borderRadius: 50,
    backgroundColor: '#F1F1F1',
  },
  boardBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  boardText: { color: colors.white, fontWeight: '700' },
});
