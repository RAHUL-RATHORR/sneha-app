import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import { clients, testimonials } from '../constants/dummyData';
import Screen from '../components/Screen';

export default function ClientsScreen({ navigation }) {
  return (
    <Screen backgroundColor="#F8F9FA">
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Our Clients</Text>
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Intro */}
        <View style={styles.introWrap}>
          <Text style={styles.introTitle}>Trusted Nationwide</Text>
          <Text style={styles.introSubtitle}>Delivering excellence and premium printing machinery across India.</Text>
        </View>

        {/* Stats Strip */}
        <View style={styles.statsContainer}>
          <View style={styles.statsInner}>
            {[['500+', 'Machines Installed'], ['200+', 'Cities Covered'], ['98%', 'Client Satisfaction']].map(([val, label], index) => (
              <View key={label} style={[styles.statItem, index !== 2 && styles.statBorder]}>
                <Text style={styles.statValue}>{val}</Text>
                <Text style={styles.statLabel}>{label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Gallery */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Installation Gallery</Text>
          <View style={styles.gallery}>
            {clients.map(c => (
              <TouchableOpacity key={c.id} style={styles.galleryItem} activeOpacity={0.9}>
                <Image source={{ uri: c.image }} style={styles.galleryImage} resizeMode="cover" />
                <View style={styles.galleryOverlay}>
                  <Text style={styles.galleryText} numberOfLines={2}>{c.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Client Testimonials preview */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Client Stories</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Testimonials')} style={styles.seeAllBtn}>
              <Text style={styles.seeAll}>Read All</Text>
              <Ionicons name="arrow-forward" size={14} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
          {testimonials.slice(0, 2).map(t => (
            <View key={t.id} style={styles.testimonialCard}>
              <View style={styles.quoteIconWrap}>
                <Ionicons name="chatbubbles" size={20} color={COLORS.primary} />
              </View>
              <Text style={styles.testimonialText} numberOfLines={4}>"{t.text}"</Text>
              
              <View style={styles.testimonialFooter}>
                <Image source={{ uri: t.image }} style={styles.avatar} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.testimonialName}>{t.name}</Text>
                  <Text style={styles.testimonialCompany}>{t.company}</Text>
                </View>
                <View style={styles.starsRow}>
                  {[...Array(5)].map((_, i) => (
                    <Ionicons key={i} name="star" size={12} color="#FBBF24" />
                  ))}
                </View>
              </View>
            </View>
          ))}
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    padding: 20,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    ...SHADOWS.light,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.secondary,
    letterSpacing: 0.5,
  },
  introWrap: { padding: 24, paddingBottom: 16 },
  introTitle: { fontSize: 28, fontWeight: '900', color: COLORS.secondary, marginBottom: 8 },
  introSubtitle: { fontSize: 14, color: COLORS.darkGray, fontWeight: '500', lineHeight: 22 },
  
  statsContainer: { paddingHorizontal: 20, marginBottom: 30 },
  statsInner: { flexDirection: 'row', backgroundColor: COLORS.secondary, borderRadius: 20, paddingVertical: 24, ...SHADOWS.medium },
  statItem: { flex: 1, alignItems: 'center', paddingHorizontal: 10 },
  statBorder: { borderRightWidth: 1, borderRightColor: 'rgba(255,255,255,0.2)' },
  statValue: { fontSize: 20, fontWeight: '900', color: COLORS.white, marginBottom: 4 },
  statLabel: { fontSize: 10, color: 'rgba(255,255,255,0.7)', fontWeight: '600', textTransform: 'uppercase', textAlign: 'center' },
  
  section: { paddingHorizontal: 20, marginBottom: 30 },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '900', color: COLORS.secondary },
  seeAllBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  seeAll: { fontSize: 14, color: COLORS.primary, fontWeight: '700' },
  
  gallery: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  galleryItem: { width: '48%', height: 160, borderRadius: 16, overflow: 'hidden', ...SHADOWS.medium, marginBottom: 14 },
  galleryImage: { width: '100%', height: '100%' },
  galleryOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(17,24,39,0.8)', padding: 12 },
  galleryText: { color: COLORS.white, fontSize: 12, fontWeight: '700' },
  
  testimonialCard: { backgroundColor: COLORS.white, borderRadius: 20, padding: 24, marginBottom: 16, ...SHADOWS.medium, elevation: 3 },
  quoteIconWrap: { backgroundColor: '#FFF7ED', alignSelf: 'flex-start', padding: 8, borderRadius: 12, marginBottom: 12 },
  testimonialText: { fontSize: 14, color: COLORS.secondary, lineHeight: 24, fontWeight: '500', fontStyle: 'italic', marginBottom: 20 },
  testimonialFooter: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#f0f0f0', marginRight: 12 },
  testimonialName: { fontSize: 15, fontWeight: '900', color: COLORS.secondary },
  testimonialCompany: { fontSize: 12, color: COLORS.primary, fontWeight: '700', marginTop: 2 },
  starsRow: { flexDirection: 'row', gap: 2, backgroundColor: '#FFFBEB', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
});
