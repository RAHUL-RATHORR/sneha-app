import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';

export default function CategoryCard({ category, onPress, selected }) {
  return (
    <TouchableOpacity
      style={[styles.card, selected && styles.selectedCard]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={[styles.iconWrap, selected && styles.selectedIconWrap]}>
        <Ionicons
          name={category.icon || 'cube-outline'}
          size={22}
          color={selected ? COLORS.white : COLORS.primary}
        />
      </View>
      <Text style={[styles.name, selected && styles.selectedName]} numberOfLines={1}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    marginRight: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.lightGray,
    ...SHADOWS.light,
    minWidth: 80,
  },
  selectedCard: {
    borderColor: COLORS.primary,
    backgroundColor: '#FFF7ED',
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF7ED',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  selectedIconWrap: {
    backgroundColor: COLORS.primary,
  },
  name: {
    fontSize: SIZES.small,
    color: COLORS.secondary,
    fontWeight: '600',
    textAlign: 'center',
  },
  selectedName: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});
