import React, { useRef, useState, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions, FlatList, Text, TouchableOpacity } from 'react-native';
import { COLORS, SHADOWS } from '../constants/theme';

const { width } = Dimensions.get('window');

export default function BannerCarousel({ data }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    const timer = setInterval(() => {
      const next = (currentIndex + 1) % data.length;
      flatListRef.current?.scrollToIndex({ index: next, animated: true });
      setCurrentIndex(next);
    }, 3500);
    return () => clearInterval(timer);
  }, [currentIndex, data.length]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        onMomentumScrollEnd={e => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <View style={styles.imageWrap}>
              <Image
                source={{ uri: item.image }}
                style={styles.image}
                resizeMode="cover"
              />
              <View style={styles.gradientOverlay} />
            </View>
            <View style={styles.overlay}>
              <View style={styles.glassBox}>
                <Text style={styles.title}>{item.title}</Text>
                {item.subtitle && (
                  <View style={styles.subtitleWrap}>
                    <Text style={styles.subtitle}>{item.subtitle}</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        )}
      />

      {/* Pagination */}
      <View style={styles.pagination}>
        {data.map((_, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => {
              flatListRef.current?.scrollToIndex({ index: i, animated: true });
              setCurrentIndex(i);
            }}
          >
            <View style={[styles.dot, currentIndex === i && styles.dotActive]} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { height: 220, width: '100%', alignItems: 'center' },
  slide: { width, height: 220, paddingHorizontal: 20 },
  imageWrap: { width: '100%', height: '100%', borderRadius: 16, overflow: 'hidden', ...SHADOWS.medium },
  image: { width: '100%', height: '100%' },
  gradientOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.2)' },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 24,
  },
  glassBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 16,
    width: '85%',
    alignItems: 'center',
    ...SHADOWS.light,
  },
  title: { color: COLORS.secondary, fontSize: 16, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 0.5, textAlign: 'center' },
  subtitleWrap: { backgroundColor: '#FFF7ED', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, marginTop: 6 },
  subtitle: { color: COLORS.primary, fontSize: 12, fontWeight: '800', textTransform: 'uppercase', textAlign: 'center' },
  pagination: { flexDirection: 'row', position: 'absolute', bottom: -15, alignSelf: 'center', gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(0,0,0,0.1)' },
  dotActive: { width: 24, backgroundColor: COLORS.primary },
});
