import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import Screen from '../components/Screen';
import { COLORS, SHADOWS } from '../constants/theme';

export default function AboutUsScreen() {
  return (
    <Screen backgroundColor="#F8F9FA">
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Image 
            source={require('../../assets/icon.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Sneha Graphics & Solutions</Text>
          <Text style={styles.subtitle}>Premium Printing Machinery</Text>
          
          <Text style={styles.paragraph}>
            Sneha Graphics & Solutions is one of the leading suppliers of refurbished Offset Printing Machines and Post-Press equipment in India. With years of expertise in the printing industry, we provide top-tier imported presses.
          </Text>
          
          <Text style={styles.paragraph}>
            We specialize in brands like Komori, Heidelberg, RMGT, and Polar. Our mission is to empower printers with reliable machinery backed by expert technical support and end-to-end installation services.
          </Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>15+</Text>
              <Text style={styles.statLabel}>Years Exp.</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>500+</Text>
              <Text style={styles.statLabel}>Installations</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>100%</Text>
              <Text style={styles.statLabel}>Support</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  card: {
    backgroundColor: COLORS.white,
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 16,
    borderRadius: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
    marginBottom: 24,
  },
  paragraph: {
    fontSize: 15,
    color: COLORS.darkGray,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.darkGray,
    fontWeight: '500',
  }
});
