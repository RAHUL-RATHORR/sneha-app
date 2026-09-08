import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import { categories } from '../constants/dummyData';

export default function CategoriesScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Browse by Brand</Text>
        <Text style={styles.headerSubtitle}>Explore machines from world-class manufacturers</Text>
      </View>

      <View style={styles.grid}>
        {categories.map(cat => (
          <TouchableOpacity
            key={cat.id}
            style={styles.card}
            onPress={() => navigation.navigate('MachinesTab', { categoryId: cat.id })}
            activeOpacity={0.8}
          >
            <View style={styles.iconContainer}>
              <Ionicons name={cat.icon} size={36} color={COLORS.primary} />
            </View>
            <Text style={styles.catName}>{cat.name}</Text>
            <Text style={styles.catSub}>View Machines</Text>
            <Ionicons name="arrow-forward" size={14} color={COLORS.primary} style={{ marginTop: 4 }} />
          </TouchableOpacity>
        ))}
      </View>

      {/* All Brands Section */}
      <View style={styles.allBrandsSection}>
        <Text style={styles.sectionTitle}>More Brands</Text>
        {['Shinohara', 'Sakurai', 'Akiyama', 'Ryobi', 'Bestech', 'Planeta', 'Polar Paper Cutting', 'MULLER MARTINI', 'MAN Roland'].map(brand => (
          <TouchableOpacity key={brand} style={styles.listItem} onPress={() => navigation.navigate('MachinesTab')}>
            <Ionicons name="print-outline" size={20} color={COLORS.primary} />
            <Text style={styles.listItemText}>{brand}</Text>
            <Ionicons name="chevron-forward" size={16} color={COLORS.darkGray} />
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { backgroundColor: COLORS.secondary, padding: 24, paddingTop: 16 },
  headerTitle: { fontSize: 26, fontWeight: 'bold', color: COLORS.white },
  headerSubtitle: { fontSize: SIZES.font, color: 'rgba(255,255,255,0.7)', marginTop: 6 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', padding: 12, justifyContent: 'space-between' },
  card: {
    width: '47%', backgroundColor: COLORS.white, borderRadius: 14,
    padding: 20, margin: 4, alignItems: 'center',
    borderWidth: 1, borderColor: COLORS.lightGray, ...SHADOWS.medium
  },
  iconContainer: { backgroundColor: '#FFF7ED', borderRadius: 50, padding: 14, marginBottom: 12 },
  catName: { fontSize: SIZES.medium, fontWeight: 'bold', color: COLORS.secondary, textAlign: 'center' },
  catSub: { fontSize: SIZES.small, color: COLORS.primary, marginTop: 4 },
  allBrandsSection: { paddingHorizontal: 20, paddingTop: 10 },
  sectionTitle: { fontSize: SIZES.large, fontWeight: 'bold', color: COLORS.secondary, marginBottom: 12 },
  listItem: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: COLORS.lightGray, gap: 12
  },
  listItemText: { flex: 1, fontSize: SIZES.medium, color: COLORS.secondary }
});
