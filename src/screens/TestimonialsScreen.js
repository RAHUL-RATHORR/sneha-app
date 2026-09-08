import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import { testimonials } from '../constants/dummyData';

const { width } = Dimensions.get('window');

function FullTestimonialCard({ item }) {
  return (
    <View style={styles.card}>
      <Ionicons name="chatbubble-ellipses" size={36} color="#FFF7ED" style={styles.quoteIcon} />
      <View style={styles.starsRow}>
        {[...Array(5)].map((_, i) => (
          <Ionicons key={i} name={i < item.rating ? "star" : "star-outline"} size={20} color="#f8b81f" />
        ))}
      </View>
      <Text style={styles.text}>"{item.text}"</Text>
      <View style={styles.user}>
        <Image source={{ uri: item.image }} style={styles.avatar} />
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.company}>{item.company}</Text>
        </View>
      </View>
    </View>
  );
}

export default function TestimonialsScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const onViewChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) setCurrentIndex(viewableItems[0].index || 0);
  }).current;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.label}>Testimonials</Text>
        <Text style={styles.headerTitle}>What Our Clients Have To Say</Text>
        <View style={styles.underline} />
        <Text style={styles.headerSubtitle}>
          Our esteemed clientele includes some of the most renowned names in the industry.
        </Text>
      </View>

      <FlatList
        data={testimonials}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        onViewableItemsChanged={onViewChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        renderItem={({ item }) => <FullTestimonialCard item={item} />}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      />

      {/* Pagination dots */}
      <View style={styles.pagination}>
        {testimonials.map((_, i) => (
          <View key={i} style={[styles.dot, i === currentIndex && styles.dotActive]} />
        ))}
      </View>

      {/* All reviews list */}
      <View style={styles.listSection}>
        <Text style={styles.listTitle}>All Reviews</Text>
        {testimonials.map(item => (
          <View key={item.id} style={styles.listCard}>
            <View style={styles.listHeader}>
              <Image source={{ uri: item.image }} style={styles.listAvatar} />
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.company}>{item.company}</Text>
              </View>
              <View style={styles.listStars}>
                {[...Array(item.rating)].map((_, i) => (
                  <Ionicons key={i} name="star" size={12} color="#f8b81f" />
                ))}
              </View>
            </View>
            <Text style={styles.listText}>{item.text}</Text>
          </View>
        ))}
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { backgroundColor: COLORS.secondary, padding: 24, paddingTop: 16, alignItems: 'center' },
  label: { fontSize: SIZES.small, color: COLORS.primary, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: COLORS.white, textAlign: 'center' },
  underline: { width: 60, height: 3, backgroundColor: COLORS.primary, borderRadius: 2, marginVertical: 12 },
  headerSubtitle: { fontSize: SIZES.font, color: 'rgba(255,255,255,0.7)', textAlign: 'center', lineHeight: 22 },
  card: {
    width: width - 48, backgroundColor: COLORS.white, borderRadius: 16,
    padding: 24, marginVertical: 24, marginHorizontal: 4,
    ...SHADOWS.medium, borderWidth: 1, borderColor: COLORS.lightGray,
  },
  quoteIcon: { position: 'absolute', top: 16, right: 16 },
  starsRow: { flexDirection: 'row', gap: 4, marginBottom: 16 },
  text: { fontSize: SIZES.font, color: COLORS.darkGray, lineHeight: 26, marginBottom: 20, fontStyle: 'italic' },
  user: { flexDirection: 'row', alignItems: 'center', gap: 12, borderTopWidth: 1, borderTopColor: COLORS.lightGray, paddingTop: 16 },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: COLORS.gray },
  name: { fontSize: SIZES.medium, fontWeight: 'bold', color: COLORS.secondary },
  company: { fontSize: SIZES.small, color: COLORS.primary, marginTop: 2 },
  pagination: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginBottom: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.lightGray },
  dotActive: { width: 20, backgroundColor: COLORS.primary },
  listSection: { padding: 20 },
  listTitle: { fontSize: SIZES.large, fontWeight: 'bold', color: COLORS.secondary, marginBottom: 16 },
  listCard: { backgroundColor: COLORS.gray, borderRadius: 12, padding: 16, marginBottom: 12 },
  listHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  listAvatar: { width: 38, height: 38, borderRadius: 19, backgroundColor: COLORS.lightGray },
  listStars: { flexDirection: 'row', marginLeft: 'auto', gap: 2 },
  listText: { fontSize: SIZES.font, color: COLORS.darkGray, lineHeight: 22 },
});
