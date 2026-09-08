import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';

export default function TestimonialCard({ item }) {
  return (
    <View style={styles.card}>
      <Ionicons name="chatbubble-ellipses" size={30} color="#FFF7ED" style={styles.quoteIcon} />
      <View style={styles.avatarRow}>
        <Image source={{ uri: item.image }} style={styles.avatar} />
      </View>
      <Text style={styles.text} numberOfLines={6}>"{item.text}"</Text>
      <View style={styles.footer}>
        <View style={styles.stars}>
          {[...Array(5)].map((_, i) => (
            <Ionicons key={i} name={i < item.rating ? 'star' : 'star-outline'} size={14} color="#f8b81f" />
          ))}
        </View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.company}>{item.company}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    width: 270,
    marginRight: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    ...SHADOWS.medium,
  },
  quoteIcon: { position: 'absolute', top: 16, right: 16 },
  avatarRow: { alignItems: 'center', marginBottom: 12 },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: COLORS.gray, borderWidth: 3, borderColor: COLORS.primary },
  text: { fontSize: SIZES.small, color: COLORS.darkGray, lineHeight: 22, textAlign: 'center', marginBottom: 16, fontStyle: 'italic' },
  footer: { alignItems: 'center', borderTopWidth: 1, borderTopColor: COLORS.gray, paddingTop: 14 },
  stars: { flexDirection: 'row', gap: 2, marginBottom: 8 },
  name: { fontSize: SIZES.font, fontWeight: 'bold', color: COLORS.secondary },
  company: { fontSize: SIZES.small, color: COLORS.primary, marginTop: 3 },
});
