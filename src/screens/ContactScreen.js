import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import Screen from '../components/Screen';

const contactInfo = [
  { icon: 'business', label: 'Company', value: 'Sneha Graphics & Solutions' },
  { icon: 'location', label: 'Address', value: 'Jaipur, Rajasthan, India' },
  { icon: 'mail', label: 'Email', value: 'snehagraphicssolutions@gmail.com' },
  { icon: 'call', label: 'Phone 1', value: '+91-9799968351' },
  { icon: 'call', label: 'Phone 2', value: '+91-9214527136' },
];

export default function ContactScreen({ navigation }) {
  const handleCall = (num) => Linking.openURL(`tel:${num}`);
  const handleEmail = () => Linking.openURL('mailto:snehagraphicssolutions@gmail.com');
  const handleWhatsApp = () => Linking.openURL('https://wa.me/919799968351?text=Hello, I need help with a machine');

  return (
    <Screen backgroundColor="#F8F9FA">
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Contact Us</Text>
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Intro text */}
        <View style={styles.introWrap}>
          <Text style={styles.introTitle}>Get in Touch</Text>
          <Text style={styles.introSubtitle}>Our friendly team is always here to chat.</Text>
        </View>

        {/* Quick Action Buttons */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickBtn} onPress={handleWhatsApp} activeOpacity={0.8}>
            <View style={[styles.iconCircle, { backgroundColor: '#E8F9F0' }]}>
              <Ionicons name="logo-whatsapp" size={28} color="#25D366" />
            </View>
            <Text style={styles.quickBtnText}>WhatsApp</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickBtn} onPress={() => handleCall('+919799968351')} activeOpacity={0.8}>
            <View style={[styles.iconCircle, { backgroundColor: '#FFF7ED' }]}>
              <Ionicons name="call" size={28} color={COLORS.primary} />
            </View>
            <Text style={styles.quickBtnText}>Call Now</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickBtn} onPress={handleEmail} activeOpacity={0.8}>
            <View style={[styles.iconCircle, { backgroundColor: '#F0F4FF' }]}>
              <Ionicons name="mail" size={28} color="#3B82F6" />
            </View>
            <Text style={styles.quickBtnText}>Email Us</Text>
          </TouchableOpacity>
        </View>

        {/* Contact Info Cards */}
        <View style={styles.section}>
          <View style={styles.infoContainer}>
            {contactInfo.map((info, index) => (
              <View key={info.label}>
                <View style={styles.infoRow}>
                  <View style={styles.infoIconWrap}>
                    <Ionicons name={info.icon} size={20} color={COLORS.secondary} />
                  </View>
                  <View style={styles.infoTextWrap}>
                    <Text style={styles.infoLabel}>{info.label}</Text>
                    <Text style={styles.infoValue}>{info.value}</Text>
                  </View>
                </View>
                {index !== contactInfo.length - 1 && <View style={styles.divider} />}
              </View>
            ))}
          </View>
        </View>

        {/* Map Placeholder */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Warehouse Location</Text>
          <View style={styles.mapCard}>
            <View style={styles.mapIconWrap}>
              <Ionicons name="map" size={40} color={COLORS.primary} />
            </View>
            <Text style={styles.mapText}>Jaipur, Rajasthan, India</Text>
            <Text style={styles.mapSub}>Visit us for a demo of our machines</Text>
            <TouchableOpacity style={styles.mapBtn} onPress={() => Linking.openURL('https://maps.google.com/?q=Jaipur+Rajasthan+India')} activeOpacity={0.8}>
              <Ionicons name="navigate" size={16} color={COLORS.white} />
              <Text style={styles.mapBtnText}>Get Directions</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* CTA */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Need a specific machine?</Text>
          <Text style={styles.ctaSubtitle}>Drop an enquiry and let our experts find it for you.</Text>
          <TouchableOpacity style={styles.ctaBtn} onPress={() => navigation.navigate('Inquiry')} activeOpacity={0.8}>
            <Text style={styles.ctaBtnText}>Send Enquiry Now</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    padding: 20,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    ...SHADOWS.light,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.secondary,
    letterSpacing: 0.5,
  },
  introWrap: { padding: 24, paddingBottom: 10 },
  introTitle: { fontSize: 28, fontWeight: '900', color: COLORS.secondary, marginBottom: 8 },
  introSubtitle: { fontSize: 14, color: COLORS.darkGray, fontWeight: '500' },
  
  quickActions: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 20 },
  quickBtn: { flex: 1, alignItems: 'center', backgroundColor: COLORS.white, marginHorizontal: 6, paddingVertical: 20, borderRadius: 20, ...SHADOWS.medium, elevation: 4 },
  iconCircle: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  quickBtnText: { color: COLORS.secondary, fontSize: 13, fontWeight: '800' },
  
  section: { paddingHorizontal: 20, marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: '900', color: COLORS.secondary, marginBottom: 16, textTransform: 'uppercase', letterSpacing: 0.5 },
  
  infoContainer: { backgroundColor: COLORS.white, borderRadius: 20, padding: 20, ...SHADOWS.medium, elevation: 3 },
  infoRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  infoIconWrap: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#F8F9FA', alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  infoTextWrap: { flex: 1 },
  infoLabel: { fontSize: 12, color: COLORS.darkGray, fontWeight: '600', marginBottom: 4 },
  infoValue: { fontSize: 15, color: COLORS.secondary, fontWeight: '800' },
  divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 8, marginLeft: 56 },
  
  mapCard: { backgroundColor: COLORS.white, borderRadius: 24, padding: 30, alignItems: 'center', ...SHADOWS.medium, elevation: 3 },
  mapIconWrap: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#FFF7ED', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  mapText: { fontSize: 18, color: COLORS.secondary, fontWeight: '900', marginBottom: 6 },
  mapSub: { fontSize: 13, color: COLORS.darkGray, marginBottom: 20, fontWeight: '500' },
  mapBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.secondary, paddingHorizontal: 24, paddingVertical: 14, borderRadius: 16, gap: 8 },
  mapBtnText: { color: COLORS.white, fontWeight: 'bold', fontSize: 14 },
  
  ctaSection: { marginHorizontal: 20, backgroundColor: COLORS.primary, borderRadius: 24, padding: 30, alignItems: 'center', ...SHADOWS.medium },
  ctaTitle: { fontSize: 22, fontWeight: '900', color: COLORS.white, marginBottom: 10, textAlign: 'center' },
  ctaSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.9)', textAlign: 'center', marginBottom: 24, lineHeight: 20, fontWeight: '500' },
  ctaBtn: { backgroundColor: COLORS.white, paddingHorizontal: 30, paddingVertical: 16, borderRadius: 16, width: '100%', alignItems: 'center' },
  ctaBtnText: { color: COLORS.primary, fontSize: 15, fontWeight: '900', textTransform: 'uppercase' },
});
