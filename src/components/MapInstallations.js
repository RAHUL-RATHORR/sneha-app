import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Modal,
  Dimensions,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Updated coordinates to better fit mobile aspect ratio
const PIN_DATA = [
  { id: 'jk', top: '10%', left: '30%', count: '10+', state: 'Jammu & Kashmir', desc: 'Successfully Installed Heidelberg & Polar Machines, Komori.' },
  { id: 'hp', top: '18%', left: '34%', count: '25+', state: 'Himachal Pradesh', desc: 'Komori Offset Press Installation & After-Sales Support.' },
  { id: 'uk', top: '22%', left: '41%', count: '28+', state: 'Uttarakhand', desc: 'Polar Cutting Machine Installation & Service.' },
  { id: 'pb', top: '19%', left: '26%', count: '45+', state: 'Punjab', desc: 'Komori Printing Press Installation & After-Sales Service.' },
  { id: 'hr', top: '24%', left: '30%', count: '38+', state: 'Haryana', desc: 'Heidelberg Offset Press Installation & Operator Training.' },
  { id: 'dl', top: '26%', left: '35%', count: '85+', state: 'Delhi / NCR', desc: 'Komori & Polar Machine Installation with Technical Support.' },
  { id: 'rj', top: '35%', left: '20%', count: '200+', state: 'Rajasthan', desc: 'Successfully Installed Komori & Polar Machines.' },
  { id: 'gj', top: '50%', left: '15%', count: '28+', state: 'Gujarat', desc: 'Offset Machine Installation & Technical Support Provided.' },
  { id: 'up', top: '33%', left: '46%', count: '84+', state: 'Uttar Pradesh', desc: 'Heidelberg Offset Machine Commissioning & Service.' },
  { id: 'bh', top: '37%', left: '60%', count: '26+', state: 'Bihar', desc: 'Heidelberg Printing Machine Installation & Maintenance.' },
  { id: 'mp', top: '45%', left: '38%', count: '65+', state: 'Madhya Pradesh', desc: 'Installation & Technical Support for Komori, Heidelberg & Polar Machines.' },
  { id: 'mh', top: '62%', left: '25%', count: '80+', state: 'Maharashtra', desc: 'Installed Premium Offset Printing Machines Successfully.' },
  { id: 'cg', top: '54%', left: '50%', count: '45+', state: 'Chhattisgarh', desc: 'Komori Offset Machine Installation Successfully Completed.' },
  { id: 'jh', top: '46%', left: '58%', count: '33+', state: 'Jharkhand', desc: 'Komori Press Installation & Spare Parts Support.' },
  { id: 'od', top: '56%', left: '60%', count: '32+', state: 'Odisha', desc: 'Polar Cutting Machine Installation & Service.' },
  { id: 'as', top: '32%', left: '80%', count: '18+', state: 'Assam', desc: 'Komori Offset Press Installation & After-Sales Support.' },
];

const MapPin = ({ item, onPress }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.8,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  return (
    <TouchableOpacity
      style={[styles.pinWrapper, { top: item.top, left: item.left }]}
      onPress={() => onPress(item)}
      activeOpacity={0.8}
    >
      <View style={styles.pinContent}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.count}</Text>
        </View>
        <Ionicons 
          name="location-sharp" 
          size={38} 
          color="rgb(40, 162, 183)" 
          style={[styles.iconShadow, { textShadowColor: '#ffffff', textShadowOffset: {width: 0, height: 0}, textShadowRadius: 6, textShadowOpacity: 1 }]} 
        />
        <Animated.View
          style={[
            styles.pulseMarker,
            {
              transform: [{ scale: pulseAnim }],
              opacity: pulseAnim.interpolate({
                inputRange: [1, 1.8],
                outputRange: [0.6, 0],
              }),
            },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

export default function MapInstallations() {
  const [selectedPin, setSelectedPin] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.textSection}>
        <Text style={styles.preTitle}>Trusted Nationwide</Text>
        <Text style={styles.title}>Welcome To Sneha Graphics & Solutions</Text>
        <View style={styles.shapeLine} />
        
        <Text style={styles.description}>
          SNEHA GRAPHICS AND SOLUTIONS Primarily Covers all pre-press machine, digital press, press machines
          (Printing Machine, sheet fed offset, web offset, flexo & Gravure Machine, Post press & Finishing
          equipment) import, sales & service.
        </Text>
        <Text style={styles.description}>
          SNEHA GRAPHICS AND SOLUTIONS Product Range Includes Heidelberg, Komori, Adast, Polly, KBA,
          Mitsubishi, Planta, Ryobi, Polar, Wholenburg, Snyder, Sypa, Mullarmartini, Bobset etc.
        </Text>
        
        <View style={styles.participationBox}>
          <Text style={styles.participationText}>
            We are a regular participant at major Offset Printing Exhibitions including{' '}
            <Text style={styles.boldText}>IPAMA, PAMEX, ROPA & FORTI etc.</Text>
          </Text>
        </View>

        <View style={styles.mottoBox}>
          <Text style={styles.mottoText}>
            "QUALITY BUILDS BRAND... SERVICE SHAPES THE FUTURE."
          </Text>
        </View>
      </View>

      <View style={styles.mapWrapper}>
        <ImageBackground
          source={require('../../assets/images/map.jpeg')}
          style={styles.mapImage}
          resizeMode="contain"
        >
          {PIN_DATA.map((pin) => (
            <MapPin key={pin.id} item={pin} onPress={setSelectedPin} />
          ))}
          
          <View style={styles.legend}>
             <Ionicons name="location-sharp" size={14} color="rgb(40, 162, 183)" style={{ marginRight: 4 }} />
             <Text style={styles.legendText}>815+ Machines Installed</Text>
          </View>
        </ImageBackground>
      </View>

      {/* Tooltip Modal */}
      <Modal
        visible={!!selectedPin}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSelectedPin(null)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setSelectedPin(null)}
        >
          <Pressable onPress={(e) => e.stopPropagation()}>
            <View style={styles.tooltipBox}>
              <View style={styles.tooltipHeader}>
                <Ionicons name="location" size={24} color="rgb(40, 162, 183)" />
                <Text style={styles.tooltipTitle}>{selectedPin?.state}</Text>
              </View>
              <View style={styles.divider} />
              <Text style={styles.tooltipDesc}>{selectedPin?.desc}</Text>
              <View style={styles.statsBadge}>
                <Text style={styles.tooltipCount}>Installations: {selectedPin?.count}</Text>
              </View>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  textSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  preTitle: {
    fontSize: 14,
    color: '#0056b3',
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 5,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 10,
    lineHeight: 32,
  },
  shapeLine: {
    height: 4,
    width: 60,
    backgroundColor: 'rgb(40, 162, 183)',
    marginBottom: 15,
    borderRadius: 2,
  },
  description: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
    marginBottom: 15,
  },
  participationBox: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#0056b3',
    marginBottom: 15,
  },
  participationText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  boldText: {
    fontWeight: '800',
  },
  mottoBox: {
    backgroundColor: '#e6f2ff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  mottoText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0056b3',
    fontStyle: 'italic',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  mapWrapper: {
    width: width,
    height: width * 1.2,
    position: 'relative',
    backgroundColor: '#f4faff', // Slight background tint for the map area
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  pinWrapper: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 60,
    transform: [{ translateX: -25 }, { translateY: -60 }], // Center bottom of pin to coord
    zIndex: 10,
  },
  pinContent: {
    alignItems: 'center',
    position: 'relative',
  },
  iconShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  badge: {
    backgroundColor: '#1d3557',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    position: 'absolute',
    top: -10,
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  badgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: 'bold',
  },
  pulseMarker: {
    position: 'absolute',
    top: 6,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgb(40, 162, 183)',
    zIndex: -1,
  },
  legend: {
    position: 'absolute',
    bottom: 120,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  legendText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tooltipBox: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  tooltipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tooltipTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#1d3557',
    marginLeft: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginBottom: 16,
  },
  tooltipDesc: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
    marginBottom: 20,
  },
  statsBadge: {
    backgroundColor: '#e6f2ff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  tooltipCount: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0056b3',
  },
});
