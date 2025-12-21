import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Button from '../../components/Button';
import colors from '../../theme/colors';

const SplashScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Drain Go</Text>

      {/* Vehicle Image */}
      <Image
        source={require('../../assets/images/truck.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.subtitle}>Clean With Fullest</Text>

      <Button
        title="Get Started →"
        onPress={() => navigation.replace('Login')}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 20,
  },
  image: {
    width: 220,
    height: 120,
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray,
    marginBottom: 30,
  },
});
