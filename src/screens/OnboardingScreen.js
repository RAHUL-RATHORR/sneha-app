import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, Image } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';

const { width, height } = Dimensions.get('window');

const slides = [
  { id: '1', title: 'Premium Machines', desc: 'Explore our vast catalogue of top-tier refurbished printing and cutting machines.', image: 'https://via.placeholder.com/300' },
  { id: '2', title: 'Expert Engineering', desc: 'All machines are rigorously tested and serviced by our experienced engineers.', image: 'https://via.placeholder.com/300' },
  { id: '3', title: 'Pan India Delivery', desc: 'Seamless installation and delivery services available anywhere in India.', image: 'https://via.placeholder.com/300' },
];

export default function OnboardingScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0]?.index || 0);
  }).current;

  const nextSlide = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.replace('Login');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList 
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.desc}</Text>
          </View>
        )}
      />
      <View style={styles.footer}>
        <View style={styles.indicatorContainer}>
          {slides.map((_, index) => (
            <View key={index} style={[styles.indicator, currentIndex === index && styles.activeIndicator]} />
          ))}
        </View>
        <TouchableOpacity style={styles.btn} onPress={nextSlide}>
          <Text style={styles.btnText}>{currentIndex === slides.length - 1 ? "Get Started" : "Next"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  slide: { width, alignItems: 'center', justifyContent: 'center', padding: 20 },
  image: { width: width * 0.8, height: width * 0.8, marginBottom: 40 },
  title: { fontSize: 28, fontWeight: 'bold', color: COLORS.secondary, marginBottom: 10, textAlign: 'center' },
  desc: { fontSize: SIZES.medium, color: COLORS.darkGray, textAlign: 'center', lineHeight: 24, paddingHorizontal: 20 },
  footer: { height: 120, justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 40 },
  indicatorContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20 },
  indicator: { height: 10, width: 10, backgroundColor: COLORS.lightGray, borderRadius: 5, marginHorizontal: 5 },
  activeIndicator: { backgroundColor: COLORS.primary, width: 25 },
  btn: { backgroundColor: COLORS.primary, height: 50, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  btnText: { color: COLORS.white, fontSize: SIZES.large, fontWeight: 'bold' }
});
