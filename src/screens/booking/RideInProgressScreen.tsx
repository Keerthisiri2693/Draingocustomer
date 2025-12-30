import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView,StatusBar,Platform,  } from 'react-native';
import colors from '../../theme/colors';
import AppIcon from '../../components/AppIcon';
import commonStyles from '../../theme/styles';

const RideInProgressScreen = ({ navigation }: any) => {
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setMinutes((m) => m + 1), 60000);
    return () => clearInterval(t);
  }, []);

  return (
    <SafeAreaView style={{flex: 1,backgroundColor: colors.white,paddingTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : 0,}}>
    <View style={styles.container}>
      <Text style={styles.statusText}>Service in progress</Text>

      <View style={styles.mapArea}>
        <AppIcon type="ant" name="sync" size={28} color={colors.primary} />
        <Text style={styles.mapText}>Cleaning in progress</Text>
      </View>

      <View style={commonStyles.card}>
        <View>
          <Text style={styles.driverName}>Ramesh Kumar</Text>
          <Text style={styles.vehicleInfo}>Lorry • TN 09 AB 4321</Text>
        </View>
        <Text style={styles.timer}>{minutes} min</Text>
      </View>

      <TouchableOpacity
        style={styles.completeBtn}
        onPress={() => navigation.replace('BookingCompleted')}
      >
        <Text style={styles.completeText}>Complete Service</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

export default RideInProgressScreen;

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
  timer: { fontWeight: '700', color: colors.primary },
  completeBtn: {
    marginTop: 16,
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  completeText: { color: colors.white, fontWeight: '700' },
});
