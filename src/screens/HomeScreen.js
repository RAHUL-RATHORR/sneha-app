import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, FlatList,
  TouchableOpacity, RefreshControl, Animated, Image, Dimensions, ActivityIndicator
} from 'react-native';
import Screen from '../components/Screen';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import { getHomeData } from '../api/services';
import BannerCarousel from '../components/BannerCarousel';
import MachineCard from '../components/MachineCard';
import BrandCard from '../components/BrandCard';
import TestimonialCard from '../components/TestimonialCard';

const { width } = Dimensions.get('window');

// ─── Sub-components ──────────────────────────────────────────────

function SectionHeader({ title, subtitle, onSeeAll }) {
  return (
    <View style={sh.wrap}>
      <View style={{ flex: 1 }}>
        <Text style={sh.title}>{title}</Text>
        {subtitle && <Text style={sh.sub}>{subtitle}</Text>}
      </View>
      {onSeeAll && (
        <TouchableOpacity onPress={onSeeAll} style={sh.seeAllBtn}>
          <Text style={sh.all}>View All</Text>
          <Ionicons name="chevron-forward" size={14} color={COLORS.primary} />
        </TouchableOpacity>
      )}
    </View>
  );
}
const sh = StyleSheet.create({
  wrap: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingHorizontal: 20 },
  title: { fontSize: 18, fontWeight: '800', color: COLORS.textPrimary, letterSpacing: 0.5 },
  sub: { fontSize: SIZES.small, color: COLORS.textSecondary, marginTop: 4 },
  seeAllBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surfaceMuted, paddingHorizontal: 12, paddingVertical: 6, borderRadius: SIZES.radiusLarge },
  all: { fontSize: 12, color: COLORS.primary, fontWeight: '700', marginRight: 2 },
});



// ─── Main Screen ──────────────────────────────────────────────────

export default function HomeScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [homeData, setHomeData] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fetchHomeData = async () => {
    try {
      const data = await getHomeData();
      
      // Parse API Data
      const parsedData = {
        banners: (data.home_slider || []).map(s => ({
          id: s.slider_id.toString(),
          image: data.paths.appearance_image + s.slider_image,
          title: (s.slider_name || '').replace(/<[^>]+>/g, '').trim(),
          subtitle: ""
        })),
        categories: (data.productCategories || []).map(c => ({
          id: c.category_id.toString(),
          name: c.category_name,
          slug: c.category_slug,
          icon: 'print'
        })),
        manufacturers: (data.manufacturer || []).map(m => ({
          name: m.manufacturer_name,
          slug: m.manufacturer_slug
        })),
        featuredMachines: (data.featuredProducts || []).map(p => {
          const mfg = (data.manufacturer || []).find(m => m.manufacturer_id === p.product_manufacturer);
          return {
            id: p.product_id.toString(),
            name: p.product_name,
            slug: p.product_slug,
            brand: mfg ? mfg.manufacturer_name : 'Unknown',
            image: data.paths.product_image + p.product_image,
            year: p.year?.year_name || 'N/A',
            color: p.product_color || '1',
            featured: true,
            specs: { format: 'Offset', maxSheetSize: p.product_sheet_size },
            availability: 'Available'
          };
        }),
        testimonials: (data.testimonials || []).map(t => {
          let imgPath = data.paths.testimonial_image || '';
          if (imgPath && !imgPath.startsWith('http')) {
            imgPath = 'https://snehagraphicssolutions.com/public' + imgPath;
          }
          return {
            id: t.testimonial_id.toString(),
            name: t.testimonial_name,
            image: imgPath + t.testimonial_image,
            text: (t.testimonial_desc || '').replace(/<[^>]+>/g, '').trim(),
            rating: parseInt(t.testimonial_rating, 10) || 5,
            company: t.testimonial_designation
          };
        })
      };

      setHomeData(parsedData);
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
    } catch (error) {
      console.error("Error fetching home data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchHomeData();
  };

  if (loading && !homeData) {
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
      {/* ── Custom Navbar ── */}
      <View style={styles.navbar}>
        <View style={styles.navLeft}>
          <Image 
            source={require('../../assets/logo.png')} 
            style={styles.logo} 
            resizeMode="contain" 
          />
        </View>
        <View style={styles.navIcons}>
          <TouchableOpacity onPress={() => navigation.navigate('Search')} style={styles.navIconBtn}>
            <Ionicons name="search-outline" size={20} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Favorites')} style={styles.navIconBtn}>
            <Ionicons name="bookmark-outline" size={20} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.primary]} tintColor={COLORS.primary} />}
      >
        <Animated.View style={{ opacity: fadeAnim }}>

          {/* ── Hero Banner ── */}
          <View style={styles.bannerContainer}>
            <BannerCarousel data={homeData?.banners || []} />
          </View>



          {/* ── Browse by Manufacturer ── */}
          <View style={styles.sectionWrap}>
            <SectionHeader
              title="Top Manufacturers"
              subtitle="Browse machines by leading brands"
            />
            <FlatList
              data={homeData?.manufacturers || []}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={i => i.slug}
              contentContainerStyle={{ paddingHorizontal: 20 }}
              renderItem={({ item }) => (
                <BrandCard brandName={item.name} onPress={() => navigation.navigate('MachinesTab', { type: 'machines', slug: item.slug })} />
              )}
            />
          </View>

          {/* ── Featured Inventory ── */}
          <View style={styles.sectionWrap}>
            <SectionHeader
              title="Featured Inventory"
              subtitle="Premium refurbished offset presses"
              onSeeAll={() => navigation.navigate('MachinesTab')}
            />
            <View style={styles.gridWrap}>
              {(homeData?.featuredMachines || []).slice(0, 4).map(item => (
                <View key={item.id} style={styles.gridItem}>
                  <MachineCard machine={item} onPress={() => navigation.navigate('MachineDetails', { id: item.id, slug: item.product_slug || item.slug })} />
                </View>
              ))}
            </View>
          </View>

          {/* ── Testimonials ── */}
          {homeData?.testimonials && homeData.testimonials.length > 0 && (
            <View style={styles.sectionWrap}>
              <SectionHeader
                title="What Our Clients Say"
                subtitle="Trusted by businesses across India"
              />
              <FlatList
                data={homeData.testimonials}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={i => i.id}
                contentContainerStyle={{ paddingHorizontal: 20 }}
                renderItem={({ item }) => (
                  <TestimonialCard item={item} />
                )}
              />
            </View>
          )}

          {/* ── B2B Promo ── */}
          <TouchableOpacity style={styles.promoBanner} activeOpacity={0.9} onPress={() => navigation.navigate('Inquiry')}>
            <Image source={{uri: 'https://images.unsplash.com/photo-1572989146199-5fcc02f231e3?q=80&w=800&auto=format&fit=crop'}} style={styles.promoImage} />
            <View style={styles.promoOverlay}>
              <Text style={styles.promoTitle}>Pan-India Installation</Text>
              <Text style={styles.promoSub}>Expert engineering support and reliable after-sales service.</Text>
              <View style={styles.promoBtn}><Text style={styles.promoBtnText}>Request a Quote</Text></View>
            </View>
          </TouchableOpacity>

          {/* ── Quick Services ── */}
          <View style={styles.servicesWrap}>
            <TouchableOpacity style={styles.serviceBox} onPress={() => navigation.navigate('Services')}>
              <Ionicons name="settings" size={28} color={COLORS.primary} />
              <Text style={styles.serviceTitle}>Installation</Text>
              <Text style={styles.serviceSub}>Expert Setup</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceBox} onPress={() => navigation.navigate('Services')}>
              <Ionicons name="construct" size={28} color={COLORS.primary} />
              <Text style={styles.serviceTitle}>Maintenance</Text>
              <Text style={styles.serviceSub}>24/7 Support</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceBox} onPress={() => navigation.navigate('Services')}>
              <Ionicons name="shield-checkmark" size={28} color={COLORS.primary} />
              <Text style={styles.serviceTitle}>Refurbished</Text>
              <Text style={styles.serviceSub}>100% Tested</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 40 }} />
        </Animated.View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  navbar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: COLORS.surface, borderBottomWidth: 1, borderBottomColor: COLORS.border, zIndex: 10 },
  navLeft: { flexDirection: 'row', alignItems: 'center' },
  logo: { width: 140, height: 36 },
  navIcons: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  navIconBtn: { padding: 8, backgroundColor: COLORS.surfaceMuted, borderRadius: 8 },
  bannerContainer: { paddingTop: 16, paddingBottom: 24, backgroundColor: COLORS.surface, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, ...SHADOWS.light, marginBottom: 20 },
  section: { paddingBottom: 24 },
  sectionWrap: { paddingBottom: 30 },
  gridWrap: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 20 },
  gridItem: { width: '48%', marginBottom: 16 },
  promoBanner: { marginHorizontal: 20, height: 160, borderRadius: SIZES.radiusLarge, overflow: 'hidden', marginBottom: 30, ...SHADOWS.medium },
  promoImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  promoOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.7)', padding: 24, justifyContent: 'center' },
  promoTitle: { color: COLORS.surface, fontSize: 22, fontWeight: '900', marginBottom: 6 },
  promoSub: { color: 'rgba(255,255,255,0.8)', fontSize: 13, marginBottom: 16, lineHeight: 18 },
  promoBtn: { backgroundColor: COLORS.primary, paddingHorizontal: 16, paddingVertical: 8, borderRadius: SIZES.radius, alignSelf: 'flex-start' },
  promoBtnText: { color: COLORS.surface, fontSize: 13, fontWeight: '800' },
  servicesWrap: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 20 },
  serviceBox: { flex: 1, alignItems: 'center', backgroundColor: COLORS.surface, paddingVertical: 20, paddingHorizontal: 8, borderRadius: SIZES.radiusLarge, marginHorizontal: 4, borderWidth: 1, borderColor: COLORS.border, ...SHADOWS.light },
  serviceTitle: { fontSize: 13, fontWeight: '800', color: COLORS.textPrimary, marginTop: 10, textAlign: 'center' },
  serviceSub: { fontSize: 11, color: COLORS.textSecondary, textAlign: 'center', marginTop: 4, fontWeight: '500' },
});
