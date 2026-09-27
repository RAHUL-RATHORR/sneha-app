import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Screen from '../components/Screen';
import { COLORS, SHADOWS } from '../constants/theme';

export default function TermsConditionScreen() {
  return (
    <Screen backgroundColor="#F8F9FA">
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Terms and Conditions</Text>
          <Text style={styles.lastUpdated}>Last Updated: September 2026</Text>
          
          <Text style={styles.sectionTitle}>1. Agreement to Terms</Text>
          <Text style={styles.paragraph}>
            These Terms and Conditions constitute a legally binding agreement made between you and Sneha Graphics & Solutions concerning your access to and use of our mobile application.
          </Text>

          <Text style={styles.sectionTitle}>2. Use of the App</Text>
          <Text style={styles.paragraph}>
            The information provided on the app is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation.
          </Text>

          <Text style={styles.sectionTitle}>3. Machine Listings & Inquiries</Text>
          <Text style={styles.paragraph}>
            All machine specifications, prices, and availability are subject to change without notice. An inquiry made through the app does not constitute a confirmed order or contract until formally accepted by us.
          </Text>

          <Text style={styles.sectionTitle}>4. Limitation of Liability</Text>
          <Text style={styles.paragraph}>
            In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages arising from your use of the app.
          </Text>
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
    padding: 20,
    borderRadius: 16,
    ...SHADOWS.medium,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginBottom: 4,
  },
  lastUpdated: {
    fontSize: 12,
    color: COLORS.darkGray,
    marginBottom: 20,
    fontStyle: 'italic',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginTop: 16,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 14,
    color: COLORS.darkGray,
    lineHeight: 22,
    marginBottom: 8,
  }
});
