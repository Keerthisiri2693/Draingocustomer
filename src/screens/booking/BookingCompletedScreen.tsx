import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import colors from '../../theme/colors';
import AppIcon from '../../components/AppIcon';

const BookingCompletedScreen = ({ navigation }: any) => {
  const [rating, setRating] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [10, 0],
              }),
            },
          ],
        },
      ]}
    >
      <AppIcon type="ant" name="checkcircle" size={56} color={colors.primary} />
      <Text style={styles.title}>Service Completed</Text>
      <Text style={styles.subTitle}>Thank you for using Drain Go</Text>

      <View style={styles.starRow}>
        {[1, 2, 3, 4, 5].map((s) => (
          <TouchableOpacity key={s} onPress={() => setRating(s)}>
            <AppIcon
              type="ant"
              name={rating >= s ? 'star' : 'staro'}
              size={32}
              color="#FFC107"
            />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[
          styles.submitBtn,
          rating === 0 && { opacity: 0.5 },
        ]}
        disabled={rating === 0}
        onPress={() => navigation.replace('Tabs')}
      >
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default BookingCompletedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: { fontSize: 20, fontWeight: '700', marginTop: 12 },
  subTitle: { fontSize: 13, color: '#777', marginBottom: 24 },
  starRow: { flexDirection: 'row', marginBottom: 30 },
  submitBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 14,
  },
  submitText: { color: colors.white, fontWeight: '700' },
});
