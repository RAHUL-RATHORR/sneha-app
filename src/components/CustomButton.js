import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';

export default function CustomButton({ title, onPress, type = 'primary', loading = false, style }) {
  const isPrimary = type === 'primary';
  const isOutline = type === 'outline';

  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        isPrimary && styles.primary,
        isOutline && styles.outline,
        style
      ]} 
      onPress={onPress}
      disabled={loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? COLORS.white : COLORS.primary} />
      ) : (
        <Text style={[
          styles.text, 
          isPrimary && styles.textPrimary,
          isOutline && styles.textOutline
        ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  primary: {
    backgroundColor: COLORS.primary,
    ...SHADOWS.medium,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  text: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
  },
  textPrimary: {
    color: COLORS.white,
  },
  textOutline: {
    color: COLORS.primary,
  }
});
