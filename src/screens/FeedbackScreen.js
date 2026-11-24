import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SHADOWS } from '../constants/theme';
import Toast from '../components/Toast';

export default function FeedbackScreen() {
  const navigation = useNavigation();
  const [feedback, setFeedback] = useState('');
  
  const [showToast, setShowToast] = useState(false);

  const handleSend = () => {
    if (!feedback.trim()) return;
    
    // API Call goes here
    
    setShowToast(true);
    setTimeout(() => {
      navigation.goBack();
    }, 1500);
  };

  const isSendDisabled = !feedback.trim();

  return (
    <SafeAreaView style={styles.safeArea}>
      {showToast && (
        <Toast 
          message="Feedback sent successfully!" 
          type="success" 
          onHide={() => setShowToast(false)} 
        />
      )}
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color={COLORS.white} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Send feedback</Text>
        
        <TouchableOpacity 
          style={[styles.sendBtn, isSendDisabled ? styles.sendBtnDisabled : styles.sendBtnActive]} 
          onPress={handleSend}
          disabled={isSendDisabled}
        >
          <Text style={[styles.sendBtnText, isSendDisabled ? styles.sendBtnTextDisabled : styles.sendBtnTextActive]}>Send</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        <Text style={styles.infoText}>
          For other issues like inquiries or machine requests, you can get help or contact support from the <Text style={styles.linkText} onPress={() => navigation.navigate('Contact')}>Help Centre</Text>.
        </Text>

        <TextInput
          style={styles.textInput}
          placeholder="Describe the technical issue"
          placeholderTextColor={COLORS.darkGray}
          multiline
          textAlignVertical="top"
          value={feedback}
          onChangeText={setFeedback}
        />

        <Text style={styles.sectionTitle}>Screenshots or recordings (optional)</Text>
        
        <View style={styles.mediaContainer}>
          <TouchableOpacity style={styles.addMediaBtn}>
            <Ionicons name="image-outline" size={32} color={COLORS.secondary} />
            <View style={styles.addIconBadge}>
              <Ionicons name="add" size={12} color={COLORS.white} />
            </View>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.helperText}>
          Tap screenshot to edit or remove sensitive info.
        </Text>

        <Text style={styles.footerText}>
          By sending, you allow Sneha Graphics to review related technical info to help address your feedback. <Text style={styles.linkText}>Learn more</Text>
        </Text>

      </ScrollView>
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
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  sendBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  sendBtnDisabled: {
    backgroundColor: '#E5E7EB',
  },
  sendBtnActive: {
    backgroundColor: COLORS.primary,
  },
  sendBtnText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  sendBtnTextDisabled: {
    color: '#9CA3AF',
  },
  sendBtnTextActive: {
    color: COLORS.white,
  },
  content: {
    padding: 20,
  },
  infoText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 20,
  },
  linkText: {
    color: '#059669', // WhatsApp-style green
    fontWeight: '600',
  },
  textInput: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    height: 150,
    fontSize: 16,
    color: COLORS.secondary,
    marginBottom: 24,
    ...SHADOWS.light,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: 12,
  },
  mediaContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    ...SHADOWS.light,
    flexDirection: 'row',
  },
  addMediaBtn: {
    width: 80,
    height: 80,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIconBadge: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F3F4F6',
  },
  helperText: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 40,
  },
  footerText: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 20,
  }
});
