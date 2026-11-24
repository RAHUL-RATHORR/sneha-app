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

        
        <FlatList
          data={achievements}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
              <View style={styles.overlay}>
                <View style={styles.textContainer}>
                  <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
                </View>
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
    paddingTop: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listContainer: {
    paddingBottom: 40,
    paddingTop: 10,
  },
  headerContainer: {
    marginBottom: 24,
    alignItems: 'center',
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.secondary,
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 15,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  card: {
    width: '100%',
    height: 220,
    backgroundColor: COLORS.white,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    ...SHADOWS.large,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark fade for text readability
  },
  textContainer: {
    padding: 20,
    paddingBottom: 24,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.white,
    letterSpacing: 0.3,
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.darkGray,
    marginTop: 40,
    fontSize: 16,
  }
});
