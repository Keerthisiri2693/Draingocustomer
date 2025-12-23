import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import colors from '../../theme/colors';
import styles from '../../theme/styles';
import AppIcon from '../../components/AppIcon';

const HomeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={{flex: 1,backgroundColor: colors.white,paddingTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : 0,}}>

      <View style={styles.container}>
        {/* HEADER */}
        <View style={local.header}>
          <View>
            <Text style={local.welcome}>Your Location</Text>
            <Text style={local.location}>Pakkam, Thiruvallur</Text>
          </View>

          <AppIcon
            type="ion"
            name="location-outline"
            size={26}
            color={colors.primary}
          />
        </View>

        <ScrollView
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
        >
          {/* MAIN CTA */}
          <View style={[styles.card, local.ctaCard]}>
            <AppIcon
              type="fa5"
              name="truck"
              size={36}
              color={colors.primary}
            />
            <Text style={local.ctaTitle}>
              Need septic tank cleaning?
            </Text>
            <Text style={local.ctaSub}>
              Book a nearby vehicle instantly
            </Text>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => navigation.navigate('VehicleSelect')}
            >
              <Text style={styles.primaryButtonText}>
                Book Service
              </Text>
            </TouchableOpacity>
          </View>

          {/* VEHICLE OPTIONS */}
          <Text style={local.sectionTitle}>Available Vehicles</Text>

          {/* LORRY CARD */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('VehicleSelect')}
          >
            <View style={local.vehicleRow}>
              <AppIcon
                type="fa5"
                name="truck-moving"
                size={28}
                color={colors.primary}
              />
              <View>
                <Text style={local.vehicleTitle}>Lorry</Text>
                <Text style={local.vehicleSub}>
                  Large capacity cleaning
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* TRACTOR CARD */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('VehicleSelect')}
          >
            <View style={local.vehicleRow}>
              <AppIcon
                type="fa5"
                name="tractor"
                size={28}
                color={colors.primary}
              />
              <View>
                <Text style={local.vehicleTitle}>Tractor</Text>
                <Text style={local.vehicleSub}>
                  Small & quick service
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const local = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 12,
    color: '#777',
  },
  location: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  ctaCard: {
    alignItems: 'center',
    marginBottom: 24,
  },
  ctaTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 12,
    color: '#333',
  },
  ctaSub: {
    fontSize: 13,
    color: '#777',
    marginVertical: 8,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
    color: '#3A2C1D',
  },
  vehicleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  vehicleTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
  },
  vehicleSub: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },
});
