import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Screen from '../components/Screen';
import { COLORS, SHADOWS } from '../constants/theme';

export default function PrivacyPolicyScreen() {
  return (
    <Screen backgroundColor="#F8F9FA">
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Privacy Policy</Text>
          <Text style={styles.lastUpdated}>Last Updated: September 2026</Text>
          
          <Text style={styles.sectionTitle}>1. Introduction</Text>
          <Text style={styles.paragraph}>
            Sneha Graphics & Solutions ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our mobile application.
          </Text>

          <Text style={styles.sectionTitle}>2. Information We Collect</Text>
          <Text style={styles.paragraph}>
            We may collect personal information that you voluntarily provide to us when registering at the app, expressing an interest in obtaining information about us or our products, or otherwise contacting us. This includes your name, email address, phone number, and location.
          </Text>

          <Text style={styles.sectionTitle}>3. How We Use Your Information</Text>
          <Text style={styles.paragraph}>
            We use the information we collect or receive to facilitate account creation, fulfill and manage inquiries, respond to customer service requests, and send administrative information to you.
          </Text>

          <Text style={styles.sectionTitle}>4. Contact Us</Text>
          <Text style={styles.paragraph}>
            If you have questions or comments about this Privacy Policy, please contact us through the Contact Us page in the app.
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
