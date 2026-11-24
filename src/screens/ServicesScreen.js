import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  ActivityIndicator, 
  RefreshControl, 
  TouchableOpacity, 
  Modal, 
  Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getServicesData } from '../api/services';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import Screen from '../components/Screen';

const { width, height } = Dimensions.get('window');

export default function ServicesScreen() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const fetchServices = async () => {
    try {
      const data = await getServicesData();
      if (data && data.services && data.services.data) {
        const basePath = data.paths?.service_image || '';
        const formattedServices = data.services.data.map(item => ({
          id: item.service_id.toString(),
          title: item.service_title,
          image: basePath + item.service_image
        }));
        setServices(formattedServices);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchServices();
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity 
      style={styles.card} 
      activeOpacity={0.9}
      onPress={() => setSelectedIndex(index)}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
        <View style={styles.zoomBadge}>
          <Ionicons name="expand-outline" size={16} color={COLORS.white} />
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={3}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading && !refreshing) {
    return (
      <Screen backgroundColor={COLORS.background}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen backgroundColor={COLORS.background}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Our Services</Text>
      </View>
      <FlatList
        data={services}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.primary]} />
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>No technical services found.</Text>
        }
      />

      {/* Fullscreen Horizontal Swipe Gallery Modal */}
      <Modal 
        visible={selectedIndex !== null} 
        transparent={true} 
        animationType="fade"
        onRequestClose={() => setSelectedIndex(null)}
      >
        <View style={styles.modalBackdrop}>
          <TouchableOpacity 
            style={styles.modalCloseBtn} 
            onPress={() => setSelectedIndex(null)}
            activeOpacity={0.8}
          >
            <Ionicons name="close" size={26} color="#FFF" />
          </TouchableOpacity>

          {selectedIndex !== null && (
            <FlatList
              data={services}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              initialScrollIndex={selectedIndex}
              getItemLayout={(_, index) => ({
                length: width,
                offset: width * index,
                index,
              })}
              keyExtractor={item => item.id}
              renderItem={({ item, index: itemIdx }) => (
                <View style={styles.modalContent}>
                  <Image 
                    source={{ uri: item.image }} 
                    style={styles.modalImage} 
                    resizeMode="contain" 
                  />
                  <View style={styles.modalTextWrap}>
                    <Text style={styles.modalCounter}>
                      {itemIdx + 1} / {services.length}
                    </Text>
                    <Text style={styles.modalTitle}>{item.title}</Text>
                  </View>
                </View>
              )}
            />
          )}
        </View>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radiusLarge,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.surfaceMuted,
  },
  zoomBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 6,
    borderRadius: 20,
  },
  textContainer: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    lineHeight: 22,
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.textSecondary,
    marginTop: 40,
    fontSize: 14,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.92)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseBtn: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 22,
    padding: 8,
  },
  modalContent: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalImage: {
    width: width * 0.95,
    height: height * 0.65,
  },
  modalTextWrap: {
    marginTop: 16,
    paddingHorizontal: 24,
  },
  modalCounter: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 6,
    letterSpacing: 1,
  },
  modalTitle: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 24,
  },
});
