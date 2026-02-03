import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';

interface Props {
  title: string;
}

const Header: React.FC<Props> = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    padding: 16,
    backgroundColor: colors.primary,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
});
