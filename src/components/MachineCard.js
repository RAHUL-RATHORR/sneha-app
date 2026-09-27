import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import { useAppContext } from '../context/AppContext';

export default function MachineCard({ machine, onPress, isListView = false }) {
  const { favorites, toggleFavorite } = useAppContext();
  
  // Dynamic API Field Fallbacks
  const id = machine.id || machine.product_id;
  const imageUri = machine.product_image 
    ? `https://snehagraphicssolutions.com/public/img/uploads/product/${machine.product_image}` 
    : machine.image;
  const name = machine.product_name || machine.name;
  const isFavorite = favorites.includes(id);
  
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 4,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  if (isListView) {
    return (
      <TouchableOpacity 
        onPress={onPress} 
        activeOpacity={0.9}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View style={[listStyles.card, { transform: [{ scale: scaleValue }] }]}>
          <Image source={{ uri: imageUri }} style={listStyles.image} resizeMode="cover" />
          <View style={listStyles.info}>
            <View style={listStyles.headerRow}>
              <Text style={listStyles.brand}>{machine.brand || 'BRAND'}</Text>
              <Text style={listStyles.availability} numberOfLines={1}>{machine.availability || 'Available'}</Text>
            </View>
            <Text style={listStyles.name} numberOfLines={2}>{name}</Text>
            
            <View style={listStyles.tags}>
              <View style={listStyles.tag}><Text style={listStyles.tagText}>{machine.year?.year_name || machine.year}</Text></View>
              <View style={listStyles.tag}><Text style={listStyles.tagText}>{machine.product_color || machine.color} Colour</Text></View>
              {machine.product_sheet_size || machine.specs?.maxSheetSize ? (
                 <View style={listStyles.tag}><Text style={listStyles.tagText}>{machine.product_sheet_size || machine.specs.maxSheetSize}</Text></View>
              ) : null}
            </View>

            <View style={listStyles.footer}>
              <TouchableOpacity style={listStyles.enquireBtn} onPress={onPress}>
                <Text style={listStyles.enquireBtnText}>Enquire Now</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => toggleFavorite(id)} style={listStyles.favBtn}>
                <Ionicons name={isFavorite ? 'bookmark' : 'bookmark-outline'} size={20} color={isFavorite ? COLORS.primary : COLORS.textMuted} />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity 
      onPress={onPress} 
      activeOpacity={0.9}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[styles.card, { transform: [{ scale: scaleValue }] }]}>
        <View style={styles.imageWrap}>
          <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
          {machine.featured || machine.product_featured === 1 ? (
            <View style={styles.featuredBadge}>
              <Text style={styles.featuredText}>FEATURED</Text>
            </View>
          ) : null}
          <TouchableOpacity style={styles.favIcon} onPress={() => toggleFavorite(id)}>
            <View style={styles.glassCircle}>
              <Ionicons name={isFavorite ? 'bookmark' : 'bookmark-outline'} size={16} color={isFavorite ? COLORS.primary : COLORS.secondary} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.info}>
          <Text style={styles.brand}>{machine.brand || 'BRAND'}</Text>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
          
          <View style={styles.metaRow}>
            <Text style={styles.metaText}>{machine.year?.year_name || machine.year} • {machine.product_color || machine.color} Col • {machine.product_sheet_size || machine.specs?.format || 'Offset'}</Text>
          </View>

          <View style={styles.divider} />
          
          <View style={styles.footerRow}>
            <Text style={styles.price}>Request Quote</Text>
            <Ionicons name="arrow-forward" size={16} color={COLORS.primary} />
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const listStyles = StyleSheet.create({
  card: { flexDirection: 'row', backgroundColor: COLORS.surface, borderRadius: SIZES.radiusLarge, borderWidth: 1, borderColor: COLORS.border, overflow: 'hidden', ...SHADOWS.light, marginBottom: 12 },
  image: { width: 140, height: '100%', backgroundColor: COLORS.surfaceMuted },
  info: { flex: 1, padding: 12, justifyContent: 'space-between' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  brand: { fontSize: 11, color: COLORS.textMuted, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  availability: { fontSize: 10, color: COLORS.success, fontWeight: '600' },
  name: { fontSize: 15, fontWeight: '800', color: COLORS.textPrimary, marginBottom: 8 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 12 },
  tag: { backgroundColor: COLORS.surfaceMuted, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, borderWidth: 1, borderColor: COLORS.border },
  tagText: { fontSize: 10, color: COLORS.textSecondary, fontWeight: '600' },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  enquireBtn: { backgroundColor: COLORS.primary, paddingHorizontal: 12, paddingVertical: 6, borderRadius: SIZES.radius },
  enquireBtnText: { color: COLORS.surface, fontSize: 12, fontWeight: '700' },
  favBtn: { padding: 4 },
});

const styles = StyleSheet.create({
  card: { backgroundColor: COLORS.surface, borderRadius: SIZES.radiusLarge, borderWidth: 1, borderColor: COLORS.border, overflow: 'hidden', ...SHADOWS.light },
  imageWrap: { width: '100%', height: 130, backgroundColor: COLORS.surfaceMuted },
  image: { width: '100%', height: '100%' },
  featuredBadge: { position: 'absolute', top: 8, left: 8, backgroundColor: COLORS.primary, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  featuredText: { fontSize: 9, color: COLORS.surface, fontWeight: '800', letterSpacing: 0.5 },
  favIcon: { position: 'absolute', top: 8, right: 8 },
  glassCircle: { backgroundColor: 'rgba(255, 255, 255, 0.9)', width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', ...SHADOWS.light },
  info: { padding: 12 },
  brand: { fontSize: 10, color: COLORS.textMuted, fontWeight: '700', textTransform: 'uppercase', marginBottom: 4, letterSpacing: 0.5 },
  name: { fontSize: 14, fontWeight: '800', color: COLORS.textPrimary, marginBottom: 6 },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  metaText: { fontSize: 11, color: COLORS.textSecondary, fontWeight: '500' },
  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 8 },
  footerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontSize: 12, color: COLORS.primary, fontWeight: '700', textTransform: 'uppercase' },
});
