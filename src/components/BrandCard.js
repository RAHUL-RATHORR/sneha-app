import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';

export default function BrandCard({ brandName, onPress }) {
  // Generate a fallback avatar for the brand
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(brandName)}&background=0F172A&color=fff&size=120&font-size=0.25`;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: avatarUrl }} style={styles.image} />
      <Text style={styles.title} numberOfLines={1}>{brandName}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radiusLarge,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    width: 100,
    marginRight: 12,
    ...SHADOWS.light,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 12,
    color: COLORS.textPrimary,
    fontWeight: '700',
    textAlign: 'center',
  },
});
