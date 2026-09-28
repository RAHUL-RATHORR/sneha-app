import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';

export default function BrandCard({ brandName, onPress }) {
  // Mapping brand names to machine images
  const getBrandImage = (name) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('komori')) return 'https://images.unsplash.com/photo-1599839575945-9a143baf2bd1?auto=format&fit=crop&w=200&q=80';
    if (lowerName.includes('polar')) return 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=200&q=80';
    if (lowerName.includes('heidelberg')) return 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&w=200&q=80';
    if (lowerName.includes('mitsubishi')) return 'https://images.unsplash.com/photo-1533227268428-f9ed0900f953?auto=format&fit=crop&w=200&q=80';
    if (lowerName.includes('ryobi')) return 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=200&q=80';
    
    // Generic machine fallback
    return 'https://images.unsplash.com/photo-1565439390111-979a4da90013?auto=format&fit=crop&w=200&q=80';
  };

  const imageUrl = getBrandImage(brandName);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
      <Text style={styles.title} numberOfLines={1}>{brandName}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    marginRight: 12,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35, // Circular image
    marginBottom: 8,
    backgroundColor: COLORS.surfaceMuted,
  },
  title: {
    fontSize: 12,
    color: COLORS.textPrimary,
    fontWeight: '700',
    textAlign: 'center',
  },
});
