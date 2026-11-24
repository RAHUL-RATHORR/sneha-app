import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SHADOWS } from '../constants/theme';
import Toast from '../components/Toast';

const LANGUAGES = [
  { id: 'en', native: 'English', english: 'English' },
  { id: 'hi', native: 'हिन्दी', english: 'Hindi' },
  { id: 'ta', native: 'தமிழ்', english: 'Tamil' },
  { id: 'te', native: 'తెలుగు', english: 'Telugu' },
  { id: 'kn', native: 'ಕನ್ನಡ', english: 'Kannada' },
  { id: 'bn', native: 'বাংলা', english: 'Bengali' },
  { id: 'ml', native: 'മലയാളം', english: 'Malayalam' },
  { id: 'nl', native: 'Nederlands', english: 'Dutch' },
];

export default function LanguageScreen() {
  const navigation = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [showToast, setShowToast] = useState(false);

  const handleConfirm = () => {
    // Save language preference logic here
    setShowToast(true);
    setTimeout(() => {
      navigation.goBack();
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {showToast && (
        <Toast 
          message="Language preference saved!" 
          type="success" 
          onHide={() => setShowToast(false)} 
        />
      )}

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>App Language</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>
          Choose your preferred language for all text and voice content on the app
        </Text>

        <View style={styles.listContainer}>
          {LANGUAGES.map((lang) => {
            const isSelected = selectedLanguage === lang.id;
            return (
              <TouchableOpacity
                key={lang.id}
                style={[styles.langCard, isSelected && styles.langCardSelected]}
                onPress={() => setSelectedLanguage(lang.id)}
                activeOpacity={0.7}
              >
                <Ionicons 
                  name={isSelected ? "radio-button-on" : "radio-button-off"} 
                  size={24} 
                  color={isSelected ? COLORS.secondary : COLORS.darkGray} 
                  style={styles.radioIcon}
                />
                <View>
                  <Text style={[styles.nativeText, isSelected && styles.textSelected]}>
                    {lang.native}
                  </Text>
                  <Text style={styles.englishText}>
                    {lang.english}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
          <Text style={styles.confirmBtnText}>Confirm App Language</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.secondary,
    paddingTop: Platform.OS === 'android' ? 40 : 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  content: {
    padding: 20,
    paddingBottom: 100, // Space for absolute footer
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.secondary,
    lineHeight: 24,
    marginBottom: 24,
  },
  listContainer: {
    gap: 12,
  },
  langCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  langCardSelected: {
    borderColor: '#2563EB',
    backgroundColor: '#F0F9FF',
  },
  radioIcon: {
    marginRight: 16,
  },
  nativeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginBottom: 2,
  },
  textSelected: {
    color: COLORS.secondary,
  },
  englishText: {
    fontSize: 14,
    color: COLORS.darkGray,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#F8F9FA',
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
  },
  confirmBtn: {
    backgroundColor: '#0A56D0', // Google Blue
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.medium,
  },
  confirmBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  }
});
