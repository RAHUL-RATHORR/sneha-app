import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import { manufacturers, machines } from '../constants/dummyData';
import SearchBar from '../components/SearchBar';
import MachineCard from '../components/MachineCard';
import EmptyState from '../components/EmptyState';
import Screen from '../components/Screen';

const BRANDS = ['All', ...manufacturers];
const COLOURS = [
  { label: 'All Colours', value: 'All' },
  { label: '1 Colour', value: '1' },
  { label: '2 Colours', value: '2' },
  { label: '4 Colours', value: '4' },
  { label: '5 Colours', value: '5' },
  { label: '6 Colours', value: '6' },
  { label: '8 Colours', value: '8' },
];
const FORMATS = [
  { label: 'All Types', value: 'All' },
  { label: 'Sheetfed Offset', value: 'Sheetfed Offset' },
  { label: 'Web Offset', value: 'Web Offset' },
];
const YEARS = [
  { label: 'All Years', value: 'All' },
  { label: '2005', value: '2005' },
  { label: '2008', value: '2008' },
  { label: '2010', value: '2010' },
  { label: '2012', value: '2012' },
  { label: '2015', value: '2015' },
  { label: '2018', value: '2018' },
];

export default function MachinesScreen({ navigation, route }) {
  const initialBrand = route.params?.brand || 'All';
  const initialCategory = route.params?.categoryId || 'All';

  const [search, setSearch] = useState('');
  const [brand, setBrand] = useState(initialBrand);
  const [colour, setColour] = useState('All');
  const [format, setFormat] = useState('All');
  const [year, setYear] = useState('All');
  const [category, setCategory] = useState(initialCategory);
  const [activeTab, setActiveTab] = useState('brand');
  const [isGrid, setIsGrid] = useState(false);

  const filtered = machines.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
    const matchBrand = brand === 'All' || m.brand === brand;
    const matchColour = colour === 'All' || m.color === colour;
    const matchFormat = format === 'All' || m.specs?.format === format;
    const matchYear = year === 'All' || m.year === year;
    const matchCategory = category === 'All' || m.categoryId === category;
    return matchSearch && matchBrand && matchColour && matchFormat && matchYear && matchCategory;
  });

  const hasActiveFilters = brand !== 'All' || colour !== 'All' || format !== 'All' || year !== 'All' || category !== 'All';

  const clearAllFilters = () => {
    setBrand('All');
    setColour('All');
    setFormat('All');
    setYear('All');
    setCategory('All');
  };

  const FILTER_TABS = [
    { id: 'brand', label: 'Manufacturer', icon: 'business-outline', isFiltered: brand !== 'All' },
    { id: 'colour', label: 'Colours', icon: 'color-palette-outline', isFiltered: colour !== 'All' },
    { id: 'format', label: 'Machine Type', icon: 'print-outline', isFiltered: format !== 'All' },
    { id: 'year', label: 'Year', icon: 'calendar-outline', isFiltered: year !== 'All' },
  ];

  const getActiveOptions = () => {
    switch (activeTab) {
      case 'brand':
        return BRANDS.map(b => ({ label: b, value: b }));
      case 'colour':
        return COLOURS;
      case 'format':
        return FORMATS;
      case 'year':
        return YEARS;
      default:
        return [];
    }
  };

  const getSelectedValue = () => {
    switch (activeTab) {
      case 'brand': return brand;
      case 'colour': return colour;
      case 'format': return format;
      case 'year': return year;
      default: return 'All';
    }
  };

  const handleSelectOption = (val) => {
    switch (activeTab) {
      case 'brand': setBrand(val); break;
      case 'colour': setColour(val); break;
      case 'format': setFormat(val); break;
      case 'year': setYear(val); break;
    }
  };

  const currentOptions = getActiveOptions();
  const currentSelected = getSelectedValue();

  return (
    <Screen backgroundColor={COLORS.background}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <SearchBar value={search} onChangeText={setSearch} placeholder="Search machinery..." />
          <TouchableOpacity onPress={() => setIsGrid(!isGrid)} style={styles.toggleBtn} activeOpacity={0.7}>
            <Ionicons name={isGrid ? 'list' : 'grid'} size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* ── Filter Bar ── */}
        <View style={styles.filterSection}>
          {/* Category Tabs */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterTabsContent}
            style={styles.filterTabsScroll}
          >
            {FILTER_TABS.map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <TouchableOpacity
                  key={tab.id}
                  style={[styles.filterTab, isActive && styles.filterTabActive]}
                  onPress={() => setActiveTab(tab.id)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={tab.icon}
                    size={14}
                    color={isActive ? COLORS.primary : COLORS.textSecondary}
                  />
                  <Text style={[styles.filterTabText, isActive && styles.filterTabTextActive]}>
                    {tab.label}
                  </Text>
                  {tab.isFiltered && <View style={styles.filterDot} />}
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Options in ONE clean horizontal scroll */}
          <View style={styles.optionsWrap}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.optionsContent}
            >
              {currentOptions.map(opt => {
                const isSelected = currentSelected === opt.value;
                return (
                  <TouchableOpacity
                    key={opt.value}
                    style={[styles.optionChip, isSelected && styles.optionChipActive]}
                    onPress={() => handleSelectOption(opt.value)}
                    activeOpacity={0.7}
                  >
                    {isSelected && (
                      <Ionicons name="checkmark" size={13} color="#FFFFFF" style={{ marginRight: 4 }} />
                    )}
                    <Text style={[styles.optionChipText, isSelected && styles.optionChipTextActive]}>
                      {opt.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Active Applied Filters Strip */}
          {hasActiveFilters && (
            <View style={styles.appliedRow}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.appliedScroll}>
                <Text style={styles.appliedLabel}>Filtered:</Text>
                {brand !== 'All' && (
                  <TouchableOpacity style={styles.appliedTag} onPress={() => setBrand('All')}>
                    <Text style={styles.appliedTagText}>{brand}</Text>
                    <Ionicons name="close-circle" size={14} color={COLORS.primary} />
                  </TouchableOpacity>
                )}
                {colour !== 'All' && (
                  <TouchableOpacity style={styles.appliedTag} onPress={() => setColour('All')}>
                    <Text style={styles.appliedTagText}>{colour} Colour</Text>
                    <Ionicons name="close-circle" size={14} color={COLORS.primary} />
                  </TouchableOpacity>
                )}
                {format !== 'All' && (
                  <TouchableOpacity style={styles.appliedTag} onPress={() => setFormat('All')}>
                    <Text style={styles.appliedTagText}>{format}</Text>
                    <Ionicons name="close-circle" size={14} color={COLORS.primary} />
                  </TouchableOpacity>
                )}
                {year !== 'All' && (
                  <TouchableOpacity style={styles.appliedTag} onPress={() => setYear('All')}>
                    <Text style={styles.appliedTagText}>{year}</Text>
                    <Ionicons name="close-circle" size={14} color={COLORS.primary} />
                  </TouchableOpacity>
                )}
                {category !== 'All' && (
                  <TouchableOpacity style={styles.appliedTag} onPress={() => setCategory('All')}>
                    <Text style={styles.appliedTagText}>Category Filter</Text>
                    <Ionicons name="close-circle" size={14} color={COLORS.primary} />
                  </TouchableOpacity>
                )}
                <TouchableOpacity style={styles.clearBtn} onPress={clearAllFilters}>
                  <Ionicons name="reload" size={11} color={COLORS.error} />
                  <Text style={styles.clearBtnText}>Clear All</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          )}
        </View>

        {/* Results Bar */}
        <View style={styles.resultBar}>
          <Text style={styles.resultText}>
            {filtered.length} {filtered.length === 1 ? 'Machine' : 'Machines'} Found
          </Text>
          {hasActiveFilters && (
            <TouchableOpacity onPress={clearAllFilters}>
              <Text style={styles.resetLink}>Reset Filters</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Machine List / Grid */}
        <FlatList
          key={isGrid ? 'grid' : 'list'}
          data={filtered}
          keyExtractor={item => item.id}
          numColumns={isGrid ? 2 : 1}
          columnWrapperStyle={isGrid ? styles.row : null}
          contentContainerStyle={[styles.listContent, !isGrid && { paddingHorizontal: 16 }]}
          renderItem={({ item }) => (
            <View style={[isGrid ? styles.gridItem : styles.listItem]}>
              <MachineCard
                machine={item}
                isListView={!isGrid}
                onPress={() => navigation.navigate('MachineDetails', { id: item.id })}
              />
            </View>
          )}
          ListEmptyComponent={
            <EmptyState
              message="No machines match your filters."
              actionLabel="Clear Filters"
              onAction={clearAllFilters}
            />
          }
          ListFooterComponent={
            filtered.length > 0 ? (
              <View style={styles.pagination}>
                <TouchableOpacity style={styles.pageBtn}><Text style={styles.pageBtnText}>← Prev</Text></TouchableOpacity>
                <Text style={styles.pageInfo}>Page 1 of 1</Text>
                <TouchableOpacity style={styles.pageBtn}><Text style={styles.pageBtnText}>Next →</Text></TouchableOpacity>
              </View>
            ) : null
          }
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    gap: 10,
    backgroundColor: COLORS.surface,
  },
  toggleBtn: {
    backgroundColor: COLORS.surfaceMuted,
    padding: 10,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Filter Section
  filterSection: {
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 10,
  },
  filterTabsScroll: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F5',
  },
  filterTabsContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: COLORS.surfaceMuted,
    gap: 5,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  filterTabActive: {
    backgroundColor: '#E0F8FC',
    borderColor: COLORS.primary,
  },
  filterTabText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  filterTabTextActive: {
    color: COLORS.primary,
    fontWeight: '800',
  },
  filterDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
  },

  // Options Scroll
  optionsWrap: {
    paddingTop: 8,
  },
  optionsContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  optionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceMuted,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  optionChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  optionChipText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  optionChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  // Active Applied Strip
  appliedRow: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F5F7FA',
    marginTop: 8,
  },
  appliedScroll: {
    paddingHorizontal: 16,
    alignItems: 'center',
    gap: 8,
  },
  appliedLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textMuted,
    textTransform: 'uppercase',
  },
  appliedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0F8FC',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  appliedTagText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primary,
  },
  clearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 3,
    backgroundColor: '#FEE2E2',
  },
  clearBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.error,
  },

  // Results Bar
  resultBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: COLORS.background,
  },
  resultText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  resetLink: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '700',
  },

  listContent: { padding: 16, paddingTop: 4 },
  row: { justifyContent: 'space-between' },
  gridItem: { width: '48%', marginBottom: 16 },
  listItem: { marginBottom: 16, width: '100%' },
  pagination: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 20, gap: 20 },
  pageBtn: { backgroundColor: COLORS.surface, paddingHorizontal: 18, paddingVertical: 10, borderRadius: SIZES.radius, borderWidth: 1, borderColor: COLORS.border },
  pageBtnText: { color: COLORS.textPrimary, fontWeight: '700', fontSize: 12, textTransform: 'uppercase' },
  pageInfo: { fontSize: 12, color: COLORS.textSecondary, fontWeight: '600' },
});
