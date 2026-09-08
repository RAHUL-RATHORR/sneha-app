import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function MachineSpecsCard({ specs }) {
  if (!specs) return null;
  
  const specItems = [
    { label: 'Format', value: specs.format, icon: 'document-outline' },
    { label: 'Max Sheet Size', value: specs.maxSheetSize, icon: 'resize-outline' },
    { label: 'Speed', value: specs.speed, icon: 'speedometer-outline' },
    { label: 'Power', value: specs.power, icon: 'flash-outline' },
    { label: 'Weight', value: specs.weight, icon: 'barbell-outline' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Technical Specifications</Text>
      <View style={styles.grid}>
        {specItems.map((item, index) => item.value ? (
          <View key={index} style={styles.specItem}>
            <View style={styles.iconWrap}>
              <Ionicons name={item.icon} size={18} color={COLORS.primary} />
            </View>
            <View style={styles.textWrap}>
              <Text style={styles.label}>{item.label}</Text>
              <Text style={styles.value} numberOfLines={1}>{item.value}</Text>
            </View>
          </View>
        ) : null)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    padding: 20,
    borderRadius: SIZES.radiusLarge,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  specItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textWrap: {
    flex: 1,
  },
  label: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontWeight: '500',
    marginBottom: 2,
  },
  value: {
    fontSize: 13,
    color: COLORS.textPrimary,
    fontWeight: '700',
  },
});
