import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator, Dimensions } from 'react-native';
import Screen from '../components/Screen';
import { COLORS, SHADOWS, SIZES } from '../constants/theme';
import { getAchievementsData } from '../api/services';

const { width } = Dimensions.get('window');

export default function AchievementsScreen() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const data = await getAchievementsData();
        if (data && data.achievement) {
          const basePath = data.paths?.achievement_image 
            ? `https://snehagraphicssolutions.com/public${data.paths.achievement_image}` 
            : 'https://snehagraphicssolutions.com/public/img/uploads/achievements/';
            
          const formatted = data.achievement.map(item => ({
            id: item.achievements_id.toString(),
            name: item.achievements_name,
            image: basePath + item.achievements_image
          }));
          setAchievements(formatted);
        }
      } catch (error) {
        console.error("Error fetching achievements:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  if (loading) {
    return (
      <Screen backgroundColor="#F8F9FA">
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen backgroundColor="#F8F9FA">
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Our Achievements</Text>
        <Text style={styles.headerSubtitle}>Milestones we are proud of</Text>
        
        <FlatList
          data={achievements}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
              <View style={styles.textContainer}>
                <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No achievements found.</Text>
          }
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listContainer: {
    paddingBottom: 40,
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
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    width: (width - 56) / 2, // 20 padding each side + 16 gap = 56
    backgroundColor: COLORS.white,
    borderRadius: 16,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  image: {
    width: '100%',
    height: 160,
    backgroundColor: COLORS.surfaceMuted,
  },
  textContainer: {
    padding: 12,
    alignItems: 'center',
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.secondary,
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.darkGray,
    marginTop: 40,
  }
});
