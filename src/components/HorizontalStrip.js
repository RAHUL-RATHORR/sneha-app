import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';

export default function HorizontalStrip({ title, data }) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.underline} />
      </View>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} activeOpacity={0.8}>
            <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.secondary,
  },
  underline: {
    width: 60,
    height: 3,
    backgroundColor: COLORS.primary,
    marginTop: 4,
    borderRadius: 2,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#30557e', // Match screenshot dark blue
    width: 220,
    height: 100,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  image: {
    width: '100%',
    height: 50,
    marginBottom: 8,
  },
  name: {
    color: COLORS.white,
    fontSize: SIZES.small,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  }
});
