import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import { events } from '../constants/dummyData';

function EventCard({ event, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <Image source={{ uri: event.image }} style={styles.cardImage} resizeMode="cover" />
      <View style={styles.cardBadge}>
        <Text style={styles.cardBadgeText}>Exhibition</Text>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{event.title}</Text>
        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={14} color={COLORS.primary} />
          <Text style={styles.infoText}>{event.date}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={14} color={COLORS.primary} />
          <Text style={styles.infoText}>{event.location}</Text>
        </View>
        <Text style={styles.cardDesc} numberOfLines={2}>{event.desc}</Text>
        <TouchableOpacity style={styles.detailsBtn}>
          <Text style={styles.detailsBtnText}>View Details</Text>
          <Ionicons name="arrow-forward" size={14} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

export default function EventsScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Events & Exhibitions</Text>
        <Text style={styles.headerSubtitle}>Visit us at upcoming industry events</Text>
      </View>

      <View style={styles.upcomingSection}>
        <View style={styles.sectionHeaderRow}>
          <View style={styles.dot} />
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
        </View>
        {events.map(event => (
          <EventCard key={event.id} event={event} onPress={() => {}} />
        ))}
      </View>

      {/* Stats section */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Our Presence</Text>
        <View style={styles.statsRow}>
          {[['15+', 'Events Attended'], ['500+', 'Clients Met'], ['20+', 'Years Experience']].map(([val, label]) => (
            <View key={label} style={styles.statCard}>
              <Text style={styles.statValue}>{val}</Text>
              <Text style={styles.statLabel}>{label}</Text>
            </View>
          ))}
        </View>
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
  upcomingSection: { padding: 20 },
  sectionHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  dot: { width: 12, height: 12, borderRadius: 6, backgroundColor: COLORS.primary, marginRight: 10 },
  sectionTitle: { fontSize: SIZES.large, fontWeight: 'bold', color: COLORS.secondary },
  card: { backgroundColor: COLORS.white, borderRadius: 16, marginBottom: 20, overflow: 'hidden', ...SHADOWS.medium, borderWidth: 1, borderColor: COLORS.lightGray },
  cardImage: { width: '100%', height: 180 },
  cardBadge: { position: 'absolute', top: 14, left: 14, backgroundColor: COLORS.primary, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 },
  cardBadgeText: { color: COLORS.white, fontSize: SIZES.small, fontWeight: 'bold' },
  cardBody: { padding: 16 },
  cardTitle: { fontSize: SIZES.large, fontWeight: 'bold', color: COLORS.secondary, marginBottom: 10 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  infoText: { fontSize: SIZES.font, color: COLORS.darkGray },
  cardDesc: { fontSize: SIZES.font, color: COLORS.darkGray, marginTop: 8, lineHeight: 22 },
  detailsBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 14 },
  detailsBtnText: { color: COLORS.primary, fontWeight: 'bold', fontSize: SIZES.font },
  statsSection: { paddingHorizontal: 20, paddingBottom: 20 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  statCard: { flex: 1, backgroundColor: COLORS.secondary, borderRadius: 12, padding: 16, alignItems: 'center', marginHorizontal: 4 },
  statValue: { fontSize: 22, fontWeight: 'bold', color: COLORS.primary },
  statLabel: { fontSize: SIZES.small, color: 'rgba(255,255,255,0.8)', textAlign: 'center', marginTop: 4 },
});
