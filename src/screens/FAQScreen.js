import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Screen from '../components/Screen';
import { COLORS, SHADOWS } from '../constants/theme';

const faqs = [
  {
    question: "What types of printing machines do you sell?",
    answer: "We deal in high-quality refurbished offset printing machines including brands like Komori, RMGT, and Heidelberg, along with post-press equipment like Polar paper cutters."
  },
  {
    question: "Do you provide installation services?",
    answer: "Yes, we provide end-to-end installation services across India. Our expert technical team ensures the machine is fully operational at your site."
  },
  {
    question: "Is there any warranty on refurbished machines?",
    answer: "We offer technical support and performance guarantees on our installations. Warranty terms vary by machine and contract."
  },
  {
    question: "How do I request a quote or an inquiry?",
    answer: "You can click the 'Inquiry' button on any machine detail page or reach out to us via the 'Contact Us' page in the app."
  }
];

export default function FAQScreen() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <Screen backgroundColor="#F8F9FA">
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerTitle}>Frequently Asked Questions</Text>
        <Text style={styles.headerSubtitle}>Find answers to common questions about our services.</Text>
        
        {faqs.map((faq, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.card} 
            activeOpacity={0.7}
            onPress={() => toggleExpand(index)}
          >
            <View style={styles.questionRow}>
              <Text style={styles.question}>{faq.question}</Text>
              <Ionicons 
                name={expandedIndex === index ? "chevron-up" : "chevron-down"} 
                size={20} 
                color={COLORS.darkGray} 
              />
            </View>
            
            {expandedIndex === index && (
              <View style={styles.answerContainer}>
                <Text style={styles.answer}>{faq.answer}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 15,
    color: COLORS.darkGray,
    marginBottom: 24,
  },
  card: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    ...SHADOWS.medium,
  },
  questionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.secondary,
    paddingRight: 16,
  },
  answerContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  answer: {
    fontSize: 14,
    color: COLORS.darkGray,
    lineHeight: 22,
  }
});
