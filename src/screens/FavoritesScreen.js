import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';
import { useAppContext } from '../context/AppContext';
import { machines } from '../constants/dummyData';
import MachineCard from '../components/MachineCard';
import Screen from '../components/Screen';

export default function FavoritesScreen({ navigation }) {
  const { favorites } = useAppContext();
  
  const favoriteMachines = machines.filter(m => favorites.includes(m.id));

  return (
    <Screen backgroundColor={COLORS.background}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.title}>Favorites</Text>
      </View>

      <FlatList
        data={favoriteMachines}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.itemWrapper}>
            <MachineCard
              machine={item}
              isListView={true}
              onPress={() => navigation.navigate('MachineDetails', { id: item.id, slug: item.product_slug || item.slug })}
            />
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="heart-disallow-outline" size={64} color={COLORS.lightGray} />
            <Text style={styles.emptyText}>No favorites yet</Text>
            <Text style={styles.emptySub}>Tap the heart icon on any machine to save it here.</Text>
            <TouchableOpacity style={styles.browseBtn} onPress={() => navigation.navigate('MachinesTab')}>
              <Text style={styles.browseBtnText}>Browse Machines</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: COLORS.white, borderBottomWidth: 1, borderBottomColor: COLORS.lightGray },
  backBtn: { padding: 4, marginRight: 12 },
  title: { fontSize: 20, fontWeight: 'bold', color: COLORS.secondary },
  list: { padding: 16 },
  itemWrapper: { marginBottom: 16 },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 100 },
  emptyText: { fontSize: SIZES.large, fontWeight: 'bold', color: COLORS.secondary, marginTop: 16 },
  emptySub: { fontSize: SIZES.font, color: COLORS.darkGray, textAlign: 'center', marginTop: 8, paddingHorizontal: 40 },
  browseBtn: { marginTop: 24, backgroundColor: COLORS.primary, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8 },
  browseBtnText: { color: COLORS.white, fontWeight: 'bold', fontSize: SIZES.font },
});
