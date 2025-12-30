import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import colors from '../theme/colors';

interface Props {
  placeholder: string;
}

const Input: React.FC<Props> = ({ placeholder }) => {
  return (
    <TextInput
      placeholder={placeholder}
      style={styles.input}
      placeholderTextColor={colors.gray}
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
