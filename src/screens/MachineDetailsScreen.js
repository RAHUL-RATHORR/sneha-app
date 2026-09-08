import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList, Linking, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import { machines } from '../constants/dummyData';
import { useAppContext } from '../context/AppContext';
import MachineSpecsCard from '../components/MachineSpecsCard';
import Screen from '../components/Screen';

const { width } = Dimensions.get('window');

export default function MachineDetailsScreen({ route, navigation }) {
  const { id } = route.params;
  const machine = machines.find(m => m.id === id) || machines[0];
  const relatedMachines = machines.filter(m => m.brand === machine.brand && m.id !== machine.id).slice(0, 4);
  const { favorites, toggleFavorite } = useAppContext();
  const isFavorite = favorites.includes(machine.id);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleCall = () => Linking.openURL('tel:+919799968351');
  const handleWhatsApp = () => Linking.openURL(`https://wa.me/919799968351?text=Hello, I am interested in getting a quote for the ${machine.name}`);

  const images = machine.images && machine.images.length > 0 ? machine.images : [machine.image];

  return (
    <Screen backgroundColor={COLORS.background}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Image Gallery */}
        <View style={styles.galleryContainer}>
          <FlatList
            data={images}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(e) => {
              const slide = Math.ceil(e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width - 0.5);
              if (slide !== activeImageIndex) setActiveImageIndex(slide);
            }}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.heroImage} resizeMode="cover" />
            )}
          />
          <TouchableOpacity style={styles.heartBtn} onPress={() => toggleFavorite(machine.id)}>
            <View style={styles.glassCircle}>
              <Ionicons name={isFavorite ? 'bookmark' : 'bookmark-outline'} size={22} color={isFavorite ? COLORS.primary : COLORS.secondary} />
            </View>
          </TouchableOpacity>
          <View style={styles.paginationDots}>
            {images.map((_, i) => (
              <View key={i} style={[styles.dot, i === activeImageIndex && styles.dotActive]} />
            ))}
          </View>
        </View>
        
        {/* Title & Tags */}
        <View style={styles.headerSection}>
          <View style={styles.badgeRow}>
            <View style={styles.brandBadge}><Text style={styles.brandBadgeText}>{machine.brand}</Text></View>
            <View style={[styles.statusBadge, { backgroundColor: machine.availability.includes('Stock') ? COLORS.success : COLORS.warning }]}>
              <Text style={styles.statusBadgeText}>{machine.availability}</Text>
            </View>
          </View>
          <Text style={styles.title}>{machine.name}</Text>
          <Text style={styles.price}>{machine.price}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: COLORS.primary }]} onPress={() => navigation.navigate('Inquiry')}>
            <Ionicons name="document-text" size={18} color={COLORS.surface} />
            <Text style={styles.actionBtnText}>Request Quote</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#25D366' }]} onPress={handleWhatsApp}>
            <Ionicons name="logo-whatsapp" size={18} color={COLORS.surface} />
            <Text style={styles.actionBtnText}>WhatsApp</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.callBtn} onPress={handleCall}>
          <Ionicons name="call" size={18} color={COLORS.primary} />
          <Text style={styles.callBtnText}>Call an Expert</Text>
        </TouchableOpacity>

        <View style={styles.contentPad}>
          {/* Detailed Specifications */}
          <MachineSpecsCard specs={machine.specs} />

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <Text style={styles.description}>{machine.description}</Text>
          </View>

          {/* Features */}
          {machine.features && machine.features.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Key Features</Text>
              {machine.features.map((feature, idx) => (
                <View key={idx} style={styles.featureRow}>
                  <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Related Machines */}
        {relatedMachines.length > 0 && (
          <View style={styles.relatedSection}>
            <Text style={styles.sectionTitleRelated}>More from {machine.brand}</Text>
            <FlatList
              data={relatedMachines}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id}
              contentContainerStyle={{ paddingHorizontal: 20 }}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.relatedCard} onPress={() => navigation.push('MachineDetails', { id: item.id })}>
                  <Image source={{ uri: item.image }} style={styles.relatedImage} resizeMode="cover" />
                  <View style={styles.relatedInfo}>
                    <Text style={styles.relatedName} numberOfLines={2}>{item.name}</Text>
                    <Text style={styles.relatedMeta}>{item.year} • {item.color}C</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  galleryContainer: { position: 'relative', width: '100%', height: 320, backgroundColor: COLORS.surfaceMuted },
  heroImage: { width: width, height: 320 },
  heartBtn: { position: 'absolute', top: 16, right: 16 },
  glassCircle: { backgroundColor: 'rgba(255, 255, 255, 0.9)', width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', ...SHADOWS.medium },
  paginationDots: { position: 'absolute', bottom: 16, left: 0, right: 0, flexDirection: 'row', justifyContent: 'center', gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.4)' },
  dotActive: { backgroundColor: COLORS.surface, width: 20 },
  headerSection: { padding: 20, paddingBottom: 16, backgroundColor: COLORS.surface, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  badgeRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  brandBadge: { backgroundColor: COLORS.surfaceMuted, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4, borderWidth: 1, borderColor: COLORS.border },
  brandBadgeText: { color: COLORS.textSecondary, fontSize: 11, fontWeight: '700', textTransform: 'uppercase' },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4 },
  statusBadgeText: { color: COLORS.surface, fontSize: 11, fontWeight: '800', textTransform: 'uppercase' },
  title: { fontSize: 24, fontWeight: '900', color: COLORS.textPrimary, marginBottom: 8, letterSpacing: -0.5 },
  price: { fontSize: 16, color: COLORS.primary, fontWeight: '700', textTransform: 'uppercase' },
  
  actionRow: { flexDirection: 'row', paddingHorizontal: 20, marginTop: 20, gap: 12 },
  actionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 14, borderRadius: SIZES.radiusLarge, gap: 8, ...SHADOWS.medium },
  actionBtnText: { color: COLORS.surface, fontSize: 13, fontWeight: '800' },
  callBtn: { marginHorizontal: 20, marginTop: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 14, borderRadius: SIZES.radiusLarge, backgroundColor: COLORS.surface, borderWidth: 2, borderColor: COLORS.primary },
  callBtnText: { color: COLORS.primary, fontSize: 13, fontWeight: '800', marginLeft: 8 },

  contentPad: { padding: 20 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '900', color: COLORS.textPrimary, marginBottom: 12 },
  description: { fontSize: 14, color: COLORS.textSecondary, lineHeight: 24, fontWeight: '500' },
  
  featureRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, backgroundColor: COLORS.surface, padding: 12, borderRadius: SIZES.radius, borderWidth: 1, borderColor: COLORS.border },
  featureText: { fontSize: 13, color: COLORS.textPrimary, fontWeight: '600', marginLeft: 12 },

  relatedSection: { paddingTop: 10, paddingBottom: 24 },
  sectionTitleRelated: { fontSize: 18, fontWeight: '900', color: COLORS.textPrimary, marginBottom: 16, paddingHorizontal: 20 },
  relatedCard: { width: 160, marginRight: 16, backgroundColor: COLORS.surface, borderRadius: SIZES.radiusLarge, overflow: 'hidden', ...SHADOWS.light, borderWidth: 1, borderColor: COLORS.border },
  relatedImage: { width: '100%', height: 110, backgroundColor: COLORS.surfaceMuted },
  relatedInfo: { padding: 12 },
  relatedName: { fontSize: 12, color: COLORS.textPrimary, fontWeight: '700', marginBottom: 4 },
  relatedMeta: { fontSize: 10, color: COLORS.textSecondary, fontWeight: '600' },
});
