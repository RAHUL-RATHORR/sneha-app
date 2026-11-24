import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, ActivityIndicator, Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import SearchBar from '../components/SearchBar';
import MachineCard from '../components/MachineCard';
import EmptyState from '../components/EmptyState';
import Screen from '../components/Screen';
import { getProducts } from '../api/services';

export default function MachinesScreen({ navigation, route }) {
  const initialType = route.params?.type || 'category';
  const initialSlug = route.params?.slug || 'used-sheetfed-presses';

  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('types');
  const [modalVisible, setModalVisible] = useState(false);
  const [isGrid, setIsGrid] = useState(false);

  // API State
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);

  // Current selected filter criteria
  const [currentType, setCurrentType] = useState(initialType);
  const [currentSlug, setCurrentSlug] = useState(initialSlug);

  useEffect(() => {
    if (route.params?.type && route.params?.slug) {
      setCurrentType(route.params.type);
      setCurrentSlug(route.params.slug);
    }
  }, [route.params]);

  useEffect(() => {
    fetchData();
  }, [currentType, currentSlug]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getProducts(currentType, currentSlug);
      setProducts(response.products || []);
      setFilters(response.filters || {});
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const clearAllFilters = () => {
    // Resetting to default type and slug
    setCurrentType(initialType);
    setCurrentSlug(initialSlug);
    setSearch('');
  };

  const FILTER_TABS = [
    { id: 'types', label: 'Types', icon: 'list-outline' },
    { id: 'categories', label: 'Categories', icon: 'apps-outline' },
    { id: 'manufacturers', label: 'Manufacturer', icon: 'business-outline' },
    { id: 'colours', label: 'Colours', icon: 'color-palette-outline' },
    { id: 'formats', label: 'Format', icon: 'print-outline' },
  ];

  const getActiveOptions = () => {
    if (!filters[activeTab]) return [];
    return filters[activeTab].map(item => {
      let label = '';
      let value = '';
      if (activeTab === 'types') { label = item.type_name; value = item.type_slug; }
      else if (activeTab === 'categories') { label = item.category_name; value = item.category_slug; }
      else if (activeTab === 'manufacturers') { label = item.manufacturer_name; value = item.manufacturer_slug; }
      else if (activeTab === 'colours') { label = item.color_name; value = item.color_slug; }
      else if (activeTab === 'formats') { label = item.formate_name; value = item.formate_slug; }
      return { label, value };
    });
  };

  const handleSelectOption = (slug) => {
    let newType = activeTab;
    if (activeTab === 'types') newType = 'type';
    else if (activeTab === 'categories') newType = 'category';
    else if (activeTab === 'manufacturers') newType = 'machines';
    else if (activeTab === 'colours') newType = 'color';
    else if (activeTab === 'formats') newType = 'format';
    
    setCurrentType(newType);
    setCurrentSlug(slug);
  };

  // Filter products by search text
  const filteredProducts = products.filter(m => {
    const name = m.product_name || m.name || '';
    return name.toLowerCase().includes(search.toLowerCase());
  });

  const currentOptions = getActiveOptions();

  return (
    <Screen backgroundColor={COLORS.background}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={{ flex: 1 }} 
            activeOpacity={0.8} 
            onPress={() => navigation.navigate('Search')}
          >
            <View pointerEvents="none">
              <SearchBar value="" onChangeText={() => {}} placeholder="Search machinery..." />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsGrid(!isGrid)} style={styles.toggleBtn} activeOpacity={0.7}>
            <Ionicons name={isGrid ? 'list' : 'grid'} size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* ── Filter Bar ── */}
        <View style={styles.filterSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.filterTabsContent}
            style={styles.filterTabsScroll}
          >
            {FILTER_TABS.map(tab => {
              const isActive = activeTab === tab.id;
              // Just mark the tab containing currentType as filtered loosely
              const isFiltered = (
                (tab.id === 'types' && currentType === 'type') ||
                (tab.id === 'categories' && currentType === 'category') ||
                (tab.id === 'manufacturers' && currentType === 'machines') ||
                (tab.id === 'colours' && currentType === 'color') ||
                (tab.id === 'formats' && currentType === 'format')
              );
              
              return (
                <TouchableOpacity
                  key={tab.id}
                  style={[styles.filterTab, isActive && styles.filterTabActive]}
                  onPress={() => {
                    setActiveTab(tab.id);
                    setModalVisible(true);
                  }}
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
                  <Ionicons name="chevron-down" size={14} color={isActive ? COLORS.primary : COLORS.textSecondary} style={{ marginLeft: 2 }} />
                  {isFiltered && <View style={styles.filterDot} />}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Results Bar */}
        <View style={styles.resultBar}>
          <Text style={styles.resultText}>
            {loading ? 'Loading...' : `${filteredProducts.length} ${filteredProducts.length === 1 ? 'Machine' : 'Machines'} Found`}
          </Text>
          <TouchableOpacity onPress={clearAllFilters}>
            <Text style={styles.resetLink}>Reset / Clear</Text>
          </TouchableOpacity>
        </View>

        {/* Machine List / Grid */}
        {loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        ) : (
          <FlatList
            key={isGrid ? 'grid' : 'list'}
            keyboardShouldPersistTaps="handled"
            data={filteredProducts}
            keyExtractor={item => (item.id || item.product_id).toString()}
            numColumns={isGrid ? 2 : 1}
            columnWrapperStyle={isGrid ? styles.row : null}
            contentContainerStyle={[styles.listContent, !isGrid && { paddingHorizontal: 16 }]}
            renderItem={({ item }) => (
              <View style={[isGrid ? styles.gridItem : styles.listItem]}>
                <MachineCard
                  machine={item}
                  isListView={!isGrid}
                  onPress={() => navigation.navigate('MachineDetails', { id: item.product_id || item.id, slug: item.product_slug || item.slug })}
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
          />
        )}
      </View>

      {/* ── Filter Dropdown Modal ── */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setModalVisible(false)}>
          <TouchableOpacity style={styles.modalContent} activeOpacity={1}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Select {FILTER_TABS.find(t => t.id === activeTab)?.label}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalCloseBtn}>
                <Ionicons name="close" size={24} color={COLORS.textPrimary} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={currentOptions}
              keyboardShouldPersistTaps="handled"
              keyExtractor={(item) => item.value}
              contentContainerStyle={{ paddingBottom: 20 }}
              renderItem={({ item }) => {
                const isSelected = currentSlug === item.value;
                return (
                  <TouchableOpacity
                    style={[styles.modalOption, isSelected && styles.modalOptionActive]}
                    onPress={() => {
                      handleSelectOption(item.value);
                      setModalVisible(false);
                    }}
                  >
                    <Text style={[styles.modalOptionText, isSelected && styles.modalOptionTextActive]}>
                      {item.label}
                    </Text>
                    {isSelected && <Ionicons name="checkmark" size={20} color={COLORS.primary} />}
                  </TouchableOpacity>
                );
              }}
              ListEmptyComponent={
                <Text style={{ textAlign: 'center', marginTop: 20, color: COLORS.textSecondary }}>
                  No options available
                </Text>
              }
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

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
  listContent: { padding: 16, paddingTop: 4, paddingBottom: 100 },
  row: { justifyContent: 'space-between' },
  gridItem: { width: '48%', marginBottom: 16 },
  listItem: { marginBottom: 16, width: '100%' },
  
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '70%',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  modalCloseBtn: {
    padding: 4,
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F5',
  },
  modalOptionActive: {
    backgroundColor: '#F8FAFC',
  },
  modalOptionText: {
    fontSize: 15,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  modalOptionTextActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },
});
