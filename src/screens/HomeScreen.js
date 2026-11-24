import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, FlatList,
  TouchableOpacity, RefreshControl, Animated, Image, Dimensions, ActivityIndicator
} from 'react-native';
import Screen from '../components/Screen';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import { getHomeData, getEventsData } from '../api/services';
import BannerCarousel from '../components/BannerCarousel';
import MachineCard from '../components/MachineCard';
import BrandCard from '../components/BrandCard';
import TestimonialCard from '../components/TestimonialCard';
import EventCard from '../components/EventCard';
import MapInstallations from '../components/MapInstallations';
import clientHomeData from '../constants/clientHomeData.json';

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
      const [data, eventsRes] = await Promise.all([
        getHomeData(),
        getEventsData().catch(() => null)
      ]);
      
      let events = [];
      if (eventsRes && eventsRes.events) {
        events = eventsRes.events.map(e => ({
          ...e,
          image: eventsRes.paths?.event_image ? eventsRes.paths.event_image + e.event_image : 'https://snehagraphicssolutions.com/public/img/uploads/events/' + e.event_image
        }));
      }

      const getFullImageUrl = (path, filename) => {
        if (!path || !filename) return '';
        let fullPath = path + filename;
        if (!fullPath.startsWith('http')) {
          fullPath = 'https://snehagraphicssolutions.com/public' + fullPath;
        }
        return fullPath;
      };

      // Parse API Data
      const sliderData = (data.home_slider && data.home_slider.length > 0) ? data.home_slider : clientHomeData.data.home_slider;
      const appearancePath = data.paths?.appearance_image || clientHomeData.data.paths.appearance_image;
      
      const parsedData = {
        banners: sliderData.map(s => ({
          id: s.slider_id.toString(),
          image: getFullImageUrl(appearancePath, s.slider_image),
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
          slug: m.manufacturer_slug,
          image: m.manufacturer_image ? getFullImageUrl(data.paths?.product_image || clientHomeData.data.paths.product_image, m.manufacturer_image) : null
        })),
        featuredMachines: (data.featuredProducts || []).map(p => {
          const mfg = (data.manufacturer || []).find(m => m.manufacturer_id === p.product_manufacturer);
          return {
            id: p.product_id.toString(),
            name: p.product_name,
            slug: p.product_slug,
            brand: mfg ? mfg.manufacturer_name : 'Unknown',
            image: getFullImageUrl(data.paths.product_image, p.product_image),
            year: p.year?.year_name || 'N/A',
            color: p.product_color || '1',
            featured: true,
            specs: { format: 'Offset', maxSheetSize: p.product_sheet_size },
            availability: 'Available'
          };
        }),
        testimonials: (data.testimonials || []).map(t => ({
          id: t.testimonial_id.toString(),
          name: t.testimonial_name,
          image: getFullImageUrl(data.paths.testimonial_image, t.testimonial_image),
          text: (t.testimonial_desc || '').replace(/<[^>]+>/g, '').trim(),
          rating: parseInt(t.testimonial_rating, 10) || 5,
          company: t.testimonial_designation
        })),
        partners: (data.partnerData || []).map(p => ({
          id: p.partner_id.toString(),
          name: p.partner_name,
          image: getFullImageUrl(data.paths?.partner_image || '/img/uploads/partner/', p.partner_image)
        })),
        events: events
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
            source={require('../../assets/sneha nav.png')} 
            style={styles.logo} 
            resizeMode="contain" 
          />
        </View>
        <View style={styles.navIcons}>
          <TouchableOpacity onPress={() => navigation.navigate('Search')} style={styles.navIconBtn}>
            <Ionicons name="search-outline" size={20} color={COLORS.white} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Favorites')} style={styles.navIconBtn}>
            <Ionicons name="bookmark-outline" size={20} color={COLORS.white} />
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




          {/* ── Search by Machine (Manufacturers) ── */}
          <View style={styles.sectionWrap}>
            <SectionHeader title="Search by Machine" subtitle="Explore A Wide Range of Machines From Our Catalog" />
            <FlatList
              data={(() => {
                let mfrs = [...(homeData?.manufacturers || [])];
                const polarIndex = mfrs.findIndex(m => m.name?.toLowerCase().includes('polar'));
                if (polarIndex > -1) {
                  const polar = mfrs.splice(polarIndex, 1)[0];
                  mfrs.splice(2, 0, polar); // Insert at 3rd position
                }
                return mfrs;
              })()}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={i => i.slug}
              contentContainerStyle={{ paddingHorizontal: 20, gap: 16 }}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.catboxCard}
                  onPress={() => navigation.navigate('MachinesTab', { type: 'machines', slug: item.slug })}
                  activeOpacity={0.8}
                >
                  <Text style={styles.catboxTitle} numberOfLines={2} ellipsizeMode="tail">{item.name}</Text>
                  <View style={styles.catboxImageContainer}>
                    {item.image ? (
                      <Image source={{ uri: item.image }} style={styles.catboxImage} />
                    ) : (
                      <Ionicons name="image-outline" size={40} color={COLORS.border} />
                    )}
                  </View>
                  <Text style={styles.catboxSubtitle}>Machines</Text>
                </TouchableOpacity>
              )}
            />
          </View>

          {/* ── Search by Colour ── */}
          <View style={styles.sectionWrap}>
            <SectionHeader title="Search by Colour" subtitle="Select Our Creations From A Exquisite Collection Of Hues" />
            <FlatList
              data={[6, 5, 4, 2, 1]}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={i => i.toString()}
              contentContainerStyle={{ paddingHorizontal: 20, gap: 16 }}
              renderItem={({ item }) => {
                // Map color numbers to exact images used on website
                const colorImages = {
                  '6': 'https://snehagraphicssolutions.com/public/img/uploads/product//1783596383.png',
                  '5': 'https://snehagraphicssolutions.com/public/img/uploads/product//1783413969.png',
                  '4': 'https://snehagraphicssolutions.com/public/img/uploads/product//1679057074.png',
                  '2': 'https://snehagraphicssolutions.com/public/img/uploads/product//1679057137.png',
                  '1': 'https://snehagraphicssolutions.com/public/img/uploads/product//1679057120.png',
                };
                const bgImage = colorImages[item.toString()];

                return (
                  <TouchableOpacity 
                    style={styles.colorBoxCard}
                    onPress={() => navigation.navigate('MachinesTab', { type: 'color', slug: `${item}-colour` })}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.colorBoxTitle} numberOfLines={2} ellipsizeMode="tail">{item} Colour</Text>
                    <View style={styles.colorBoxImageContainer}>
                      <Image source={{ uri: bgImage }} style={styles.catboxImage} />
                    </View>
                    <Text style={styles.catboxSubtitle}>Machines</Text>
                  </TouchableOpacity>
                );
              }}
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

          {/* ── Latest Events ── */}
          {homeData?.events && homeData.events.length > 0 && (
            <View style={styles.sectionWrap}>
              <SectionHeader
                title="Latest Events"
                subtitle="Join us at these industry exhibitions and fairs"
              />
              <BannerCarousel 
                data={homeData.events.map(e => ({ 
                  id: e.event_id.toString(), 
                  image: e.image, 
                  title: e.event_name,
                  subtitle: e.event_start_date ? new Date(e.event_start_date).toLocaleDateString() : 'Upcoming'
                }))} 
              />
            </View>
          )}

          {/* ── Installations in India Map ── */}
          <MapInstallations />

          {/* ── Warehouse & Inventory ── */}
          <View style={styles.sectionWrap}>
            <SectionHeader
              title="Our Warehouse & Machine Inventory"
              subtitle="Premium printing solutions ready for dispatch"
            />
            <Text style={{ paddingHorizontal: 20, fontSize: 13, color: COLORS.textSecondary, marginBottom: 15, lineHeight: 20 }}>
              Our warehouse is home to a wide range of carefully selected used offset printing machines from leading brands like Komori, Heidelberg, and Polar. Every machine is thoroughly inspected by our technical team before dispatch, ensuring quality, reliability, and readiness for installation.
            </Text>
            <FlatList
              data={[
                'https://snehagraphicssolutions.com/public/img/uploads/media/1783486945.jpeg',
                'https://snehagraphicssolutions.com/public/img/uploads/media/1783486779.jpeg',
                'https://snehagraphicssolutions.com/public/img/uploads/media/1783486802.jpeg',
                'https://snehagraphicssolutions.com/public/img/uploads/media/1783486793.jpeg',
                'https://snehagraphicssolutions.com/public/img/uploads/media/1783828917.jpeg'
              ]}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={width * 0.75 + 16}
              decelerationRate="fast"
              snapToAlignment="center"
              contentContainerStyle={{ paddingHorizontal: (width - (width * 0.75)) / 2 }}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={{ width: width * 0.75, height: 200, borderRadius: 16, overflow: 'hidden', marginHorizontal: 8, ...SHADOWS.medium, borderWidth: 1, borderColor: COLORS.lightGray }}>
                  <Image source={{ uri: item }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                </View>
              )}
            />
          </View>

          {/* ── Testimonials ── */}
          {homeData?.testimonials && homeData.testimonials.length > 0 && (
            <View style={styles.sectionWrap}>
              <SectionHeader
                title="What Our Clients Have To Say"
                subtitle="Our esteemed clientele includes some of the most renowned names in the industry. Here is what they have to say about our exceptional services:"
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

          {/* ── Our Partners ── */}
          {homeData?.partners && homeData.partners.length > 0 && (
            <View style={styles.sectionWrap}>
              <SectionHeader
                title="Our Partners"
                subtitle="Brands we trust and work with"
              />
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 16 }}>
                {homeData.partners.map(partner => (
                  <View key={partner.id} style={{ width: 100, height: 100, backgroundColor: COLORS.white, borderRadius: 12, justifyContent: 'center', alignItems: 'center', ...SHADOWS.light, padding: 10, borderWidth: 1, borderColor: COLORS.border }}>
                    <Image source={{ uri: partner.image }} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
                  </View>
                ))}
              </ScrollView>
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
  navbar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: COLORS.secondary, borderBottomWidth: 1, borderBottomColor: COLORS.border, zIndex: 10 },
  navLeft: { flexDirection: 'row', alignItems: 'center' },
  logo: { width: 140, height: 36 },
  navIcons: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  navIconBtn: { padding: 8, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 8 },
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
  imageCard: { width: 140, height: 160, borderRadius: SIZES.radiusLarge, overflow: 'hidden', ...SHADOWS.medium },
  imageCardSmall: { width: 110, height: 120, borderRadius: SIZES.radiusLarge, overflow: 'hidden', ...SHADOWS.medium },
  cardBgImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  cardOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.65)', padding: 12, justifyContent: 'flex-end' },
  cardOverlayDark: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.75)', padding: 12, justifyContent: 'center', alignItems: 'center' },
  imageCardText: { color: COLORS.surface, fontSize: 13, fontWeight: '800', lineHeight: 18 },
  colorCardTitle: { color: COLORS.primary, fontSize: 28, fontWeight: '900', textShadowColor: 'rgba(0,0,0,0.5)', textShadowOffset: {width: 0, height: 1}, textShadowRadius: 3 },
  colorCardSub: { color: COLORS.surface, fontSize: 13, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1, marginTop: 4 },
  catboxCard: { width: 150, backgroundColor: '#FFFFFF', borderRadius: SIZES.radius, paddingVertical: 12, paddingHorizontal: 12, alignItems: 'center', borderWidth: 1, borderColor: COLORS.border, ...SHADOWS.medium, marginVertical: 8 },
  catboxTitle: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary, textAlign: 'center', marginBottom: 8, height: 40 },
  catboxImageContainer: { width: '100%', height: 75, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  catboxImage: { width: '100%', height: '100%', resizeMode: 'contain' },
  catboxSubtitle: { fontSize: 12, fontWeight: '600', color: COLORS.textSecondary, textTransform: 'uppercase' },

  colorBoxCard: { width: 120, backgroundColor: '#16274F', borderRadius: SIZES.radius, paddingVertical: 10, paddingHorizontal: 8, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', ...SHADOWS.medium, marginVertical: 8 },
  colorBoxTitle: { fontSize: 14, fontWeight: '700', color: COLORS.surface, textAlign: 'center', marginBottom: 4, height: 20 },
  colorBoxImageContainer: { width: '100%', height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
});
