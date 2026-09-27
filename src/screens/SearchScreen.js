import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import Screen from '../components/Screen';
import { getHomeData } from '../api/services';

export default function SearchScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus the search input on mount
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 100);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // In a real app, you might have a global search API endpoint. 
      // For now, we'll use featured machines from home data as our searchable database.
      const data = await getHomeData();
      
      const allMachines = (data.featuredProducts || []).map(p => {
        const mfg = (data.manufacturer || []).find(m => m.manufacturer_id === p.product_manufacturer);
        return {
          id: p.product_id.toString(),
          name: p.product_name,
          slug: p.product_slug,
          brand: mfg ? mfg.manufacturer_name : 'Unknown',
          image: data.paths.product_image + p.product_image,
          year: p.year?.year_name || 'N/A',
        };
      });

      setMachines(allMachines);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMachines = machines.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) || 
    m.brand.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Screen backgroundColor={COLORS.background}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={COLORS.darkGray} style={styles.searchIcon} />
          <TextInput
            ref={inputRef}
            style={styles.searchInput}
            placeholder="Search machines, brands..."
            placeholderTextColor={COLORS.darkGray}
            value={search}
            onChangeText={setSearch}
            autoCapitalize="none"
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')} style={styles.clearBtn}>
              <Ionicons name="close-circle" size={18} color={COLORS.darkGray} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <FlatList
          data={filteredMachines}
          keyExtractor={item => item.id}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.resultItem} 
              onPress={() => navigation.navigate('MachineDetails', { id: item.id, slug: item.slug })}
            >
              <Ionicons name="search-outline" size={18} color={COLORS.darkGray} style={styles.resultIcon} />
              <View style={styles.resultTextContainer}>
                <Text style={styles.resultName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.resultBrand}>{item.brand} • {item.year}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={COLORS.lightGray} />
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            search.length > 0 ? (
              <View style={styles.emptyContainer}>
                <Ionicons name="search-outline" size={48} color={COLORS.border} />
                <Text style={styles.emptyText}>No matches found for "{search}"</Text>
              </View>
            ) : null
          }
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backBtn: {
    padding: 8,
    marginRight: 8,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceMuted,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 46,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: SIZES.medium,
    color: COLORS.textPrimary,
  },
  clearBtn: {
    padding: 4,
  },
  listContainer: {
    paddingTop: 8,
    paddingBottom: 20,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceMuted,
  },
  resultIcon: {
    marginRight: 16,
  },
  resultTextContainer: {
    flex: 1,
  },
  resultName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  resultBrand: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 40,
  },
  emptyText: {
    marginTop: 12,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});
