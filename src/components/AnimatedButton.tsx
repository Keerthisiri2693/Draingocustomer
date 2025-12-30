import React, { useRef } from 'react';
import {
  Animated,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
} from 'react-native';
import colors from '../theme/colors';

const AnimatedButton = ({ title, onPress }: any) => {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const pressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={pressIn}
      onPressOut={pressOut}
      onPress={onPress}
    >
      <Animated.View style={[styles.btn, { transform: [{ scale }] }]}>
        <Text style={styles.text}>{title}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default AnimatedButton;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  text: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 15,
  },
});
