import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Screen from '../components/Screen';
import { COLORS, SHADOWS } from '../constants/theme';

const achievements = [
  {
    id: '1',
    title: 'Best Service Provider 2023',
    description: 'Awarded for excellent after-sales technical support in the offset printing industry.',
    icon: 'trophy'
  },
  {
    id: '2',
    title: '500+ Installations',
    description: 'Successfully completed over 500 machine installations across India.',
    icon: 'checkmark-done-circle'
  },
  {
    id: '3',
    title: 'Top Komori Importer',
    description: 'Recognized as one of the leading importers of refurbished Komori presses.',
    icon: 'star'
  }
];

export default function AchievementsScreen() {
  return (
    <Screen backgroundColor="#F8F9FA">
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerTitle}>Our Achievements</Text>
        <Text style={styles.headerSubtitle}>Milestones we are proud of</Text>
        
        {achievements.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.iconContainer}>
              <Ionicons name={item.icon} size={32} color={COLORS.primary} />
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 15,
    color: COLORS.darkGray,
    marginBottom: 24,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    ...SHADOWS.medium,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: COLORS.darkGray,
    lineHeight: 20,
  }
});
