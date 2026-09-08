import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';

export default function EmptyState({ title = 'No Data Found', message = 'There is nothing to show here right now.', icon = 'file-tray-outline' }) {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={64} color={COLORS.lightGray} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 40,
  },
  title: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginTop: 16,
  },
  message: {
    fontSize: SIZES.medium,
    color: COLORS.darkGray,
    textAlign: 'center',
    marginTop: 8,
  }
});
