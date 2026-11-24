import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Image, TouchableOpacity, ActivityIndicator, Modal, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import { testimonials } from '../constants/dummyData';
import { getClientsData } from '../api/services';
import Screen from '../components/Screen';

export default function ClientsScreen({ navigation }) {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);
  const { width, height } = Dimensions.get('window');

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await getClientsData();
        if (data && data.clients) {
          let basePath = data.paths?.client_image || '';
          if (basePath && !basePath.startsWith('http')) {
            basePath = 'https://snehagraphicssolutions.com/public' + basePath;
          }
          const formattedClients = data.clients.map(item => ({
            id: item.client_id.toString(),
            title: item.client_title,
            image: basePath + item.client_image
          }));
          setClients(formattedClients);
        }
      } catch (error) {
        console.error("Error fetching clients:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);
  return (
    <Screen backgroundColor="#F8F9FA">
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Our Clients</Text>
      </View>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Intro */}
        <View style={styles.introWrap}>
          <Text style={styles.introTitle}>Trusted Nationwide</Text>
          <Text style={styles.introSubtitle}>Delivering excellence and premium printing machinery across India.</Text>
        </View>

        {/* Stats Strip */}
        <View style={styles.statsContainer}>
          <View style={styles.statsInner}>
            {[['500+', 'Machines Installed'], ['200+', 'Cities Covered'], ['98%', 'Client Satisfaction']].map(([val, label], index) => (
              <View key={label} style={[styles.statItem, index !== 2 && styles.statBorder]}>
                <Text style={styles.statValue}>{val}</Text>
                <Text style={styles.statLabel}>{label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Gallery */}
        <View style={styles.section}>
          <View style={styles.gallery}>
            {clients.map((c, index) => (
              <TouchableOpacity 
                key={c.id} 
                style={styles.galleryItem} 
                activeOpacity={0.9} 
                onPress={() => {
                  setInitialIndex(index);
                  setModalVisible(true);
                }}
              >
                <Image source={{ uri: c.image }} style={styles.galleryImage} resizeMode="cover" />
                <View style={styles.galleryOverlay}>
                  <Text style={styles.galleryText} numberOfLines={2}>{c.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
      )}

      {/* Fullscreen Image Viewer Modal */}
      <Modal visible={modalVisible} transparent={true} animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.95)' }}>
          <TouchableOpacity 
            style={{ position: 'absolute', top: 50, right: 20, zIndex: 10, padding: 10, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 20 }} 
            onPress={() => setModalVisible(false)}
          >
            <Ionicons name="close" size={28} color="#FFF" />
          </TouchableOpacity>
          <FlatList
            data={clients}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            initialScrollIndex={initialIndex}
            getItemLayout={(data, index) => ({ length: width, offset: width * index, index })}
            keyExtractor={c => c.id}
            renderItem={({ item }) => (
              <View style={{ width, height, justifyContent: 'center', alignItems: 'center', paddingBottom: 50 }}>
                <Image source={{ uri: item.image }} style={{ width: '100%', height: height * 0.6 }} resizeMode="contain" />
                <Text style={{ color: '#FFF', fontSize: 18, fontWeight: '700', marginTop: 20, textAlign: 'center', paddingHorizontal: 20 }}>
                  {item.title}
                </Text>
              </View>
            )}
          />
        </View>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    padding: 20,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    ...SHADOWS.light,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.white,
    letterSpacing: 0.5,
  },
  introWrap: { padding: 24, paddingBottom: 16 },
  introTitle: { fontSize: 28, fontWeight: '900', color: COLORS.secondary, marginBottom: 8 },
  introSubtitle: { fontSize: 14, color: COLORS.darkGray, fontWeight: '500', lineHeight: 22 },
  
  statsContainer: { paddingHorizontal: 20, marginBottom: 30 },
  statsInner: { flexDirection: 'row', backgroundColor: COLORS.secondary, borderRadius: 20, paddingVertical: 24, ...SHADOWS.medium },
  statItem: { flex: 1, alignItems: 'center', paddingHorizontal: 10 },
  statBorder: { borderRightWidth: 1, borderRightColor: 'rgba(255,255,255,0.2)' },
  statValue: { fontSize: 20, fontWeight: '900', color: COLORS.white, marginBottom: 4 },
  statLabel: { fontSize: 10, color: 'rgba(255,255,255,0.7)', fontWeight: '600', textTransform: 'uppercase', textAlign: 'center' },
  
  section: { paddingHorizontal: 20, marginBottom: 30 },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '900', color: COLORS.secondary },
  seeAllBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  seeAll: { fontSize: 14, color: COLORS.primary, fontWeight: '700' },
  
  gallery: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  galleryItem: { width: '48%', height: 160, borderRadius: 16, overflow: 'hidden', ...SHADOWS.medium, marginBottom: 14 },
  galleryImage: { width: '100%', height: '100%' },
  galleryOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(17,24,39,0.8)', padding: 12 },
  galleryText: { color: COLORS.white, fontSize: 12, fontWeight: '700' },
  
  testimonialCard: { backgroundColor: COLORS.white, borderRadius: 20, padding: 24, marginBottom: 16, ...SHADOWS.medium, elevation: 3 },
  quoteIconWrap: { backgroundColor: '#FFF7ED', alignSelf: 'flex-start', padding: 8, borderRadius: 12, marginBottom: 12 },
  testimonialText: { fontSize: 14, color: COLORS.secondary, lineHeight: 24, fontWeight: '500', fontStyle: 'italic', marginBottom: 20 },
  testimonialFooter: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#f0f0f0', marginRight: 12 },
  testimonialName: { fontSize: 15, fontWeight: '900', color: COLORS.secondary },
  testimonialCompany: { fontSize: 12, color: COLORS.primary, fontWeight: '700', marginTop: 2 },
  starsRow: { flexDirection: 'row', gap: 2, backgroundColor: '#FFFBEB', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
});
