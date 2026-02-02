import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import colors from '../theme/colors';

interface Props extends TouchableOpacityProps {
  title: string;
  style?: StyleProp<ViewStyle>;   // <-- allow style
}

const Button: React.FC<Props> = ({ title, style, ...rest }) => {
  return (
    <TouchableOpacity
      {...rest}
      style={[styles.button, style]}
      activeOpacity={0.8}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: '700',
  },
});
