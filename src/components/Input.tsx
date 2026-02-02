import React from 'react';
import {
  TextInput,
  StyleSheet,
  TextInputProps,
  StyleProp,
  TextStyle,
} from 'react-native';
import colors from '../theme/colors';

/**
 * Extend TextInputProps so our Input supports
 * ALL normal React Native TextInput props.
 */
interface Props extends TextInputProps {
  style?: StyleProp<TextStyle>;
}

const Input: React.FC<Props> = (props) => {
  return (
    <TextInput
      {...props}
      placeholderTextColor={colors.gray}
      style={[styles.input, props.style]}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: colors.gray,
    padding: 12,
    borderRadius: 6,
    marginVertical: 10,
  },
});
