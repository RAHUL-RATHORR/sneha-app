import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Platform,
  BackHandler,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import appConfig from '../../app.json';

// ============================================================================
// 🔗 YAHAN APNA ONLINE JSON LINK DAALEIN (GitHub Gist Raw link)
// ============================================================================
export const UPDATE_CONFIG_URL = 'https://raw.githubusercontent.com/snehagraphics/app-config/main/version.json';

const PLAY_STORE_URL = 'market://details?id=com.snehagraphics.app';
const PLAY_STORE_WEB_URL = 'https://play.google.com/store/apps/details?id=com.snehagraphics.app';
const CURRENT_APP_VERSION = appConfig?.expo?.version || '1.0.0';

// Version comparison helper: returns true if current < min
const isVersionOlder = (current, min) => {
  if (!min || !current) return false;
  const cParts = String(current).split('.').map((n) => parseInt(n, 10) || 0);
  const mParts = String(min).split('.').map((n) => parseInt(n, 10) || 0);
  const len = Math.max(cParts.length, mParts.length);
  for (let i = 0; i < len; i++) {
    const c = cParts[i] || 0;
    const m = mParts[i] || 0;
    if (c < m) return true;
    if (c > m) return false;
  }
  return false;
};

export default function ForceUpdate({ children }) {
  const [updateRequired, setUpdateRequired] = useState(false);
  const [updateData, setUpdateData] = useState({
    min_version: '',
    message: 'Naya version available hai. Kripya app ko update karein taaki aap aage use kar sakein.',
    store_url: null,
  });

  const checkVersion = async () => {
    try {
      if (!UPDATE_CONFIG_URL || UPDATE_CONFIG_URL.includes('your-link-here')) {
        return;
      }

      // Cache buster ?t= taaki CDN purana response na de, hamesha fresh data mile
      const url = `${UPDATE_CONFIG_URL}${UPDATE_CONFIG_URL.includes('?') ? '&' : '?'}t=${Date.now()}`;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const res = await fetch(url, {
        headers: { 'Cache-Control': 'no-cache' },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!res.ok) return;

      const data = await res.json();
      const minVersion = data.min_version || data.minVersion;

      if (minVersion && isVersionOlder(CURRENT_APP_VERSION, minVersion)) {
        setUpdateData({
          min_version: minVersion,
          message: data.message || 'Naya update aa gaya hai! Kripya aage chalane ke liye update karein.',
          store_url: data.store_url || null,
        });
        setUpdateRequired(true);
      }
    } catch (err) {
      // Internet ya fetch fail hone par app bina kisi issue ke chalta rahega
      console.log('[ForceUpdate info]:', err?.message || err);
    }
  };

  useEffect(() => {
    checkVersion();

    // Android back button disable karein jab update compulsory ho
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (updateRequired) {
        return true; // back press ko block karega
      }
      return false;
    });

    return () => backHandler.remove();
  }, [updateRequired]);

  const handleUpdatePress = async () => {
    const targetUrl = updateData.store_url || (Platform.OS === 'android' ? PLAY_STORE_URL : PLAY_STORE_WEB_URL);
    try {
      const supported = await Linking.canOpenURL(targetUrl);
      if (supported) {
        await Linking.openURL(targetUrl);
      } else {
        await Linking.openURL(PLAY_STORE_WEB_URL);
      }
    } catch {
      Linking.openURL(PLAY_STORE_WEB_URL).catch(() => {});
    }
  };

  return (
    <>
      {children}

      <Modal
        visible={updateRequired}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => {
          // Modal ko dismiss nahi hone dega
        }}
      >
        <View style={styles.overlay}>
          <View style={styles.card}>
            {/* Top Icon Badge */}
            <View style={styles.iconCircle}>
              <Ionicons name="cloud-download" size={40} color="#FFFFFF" />
            </View>

            <Text style={styles.title}>Update Required</Text>
            
            <View style={styles.badgeRow}>
              <Text style={styles.badgeText}>
                Your App: <Text style={styles.bold}>{CURRENT_APP_VERSION}</Text>
              </Text>
              {updateData.min_version ? (
                <Text style={styles.badgeText}>
                  {'  •  '}Latest: <Text style={styles.bold}>{updateData.min_version}</Text>
                </Text>
              ) : null}
            </View>

            <Text style={styles.message}>
              {updateData.message}
            </Text>

            {/* Update Button */}
            <TouchableOpacity
              style={styles.btnPrimary}
              activeOpacity={0.85}
              onPress={handleUpdatePress}
            >
              <Ionicons name="logo-google-playstore" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={styles.btnPrimaryText}>Update Now</Text>
            </TouchableOpacity>

            {/* Exit App button */}
            {Platform.OS === 'android' && (
              <TouchableOpacity
                style={styles.btnExit}
                onPress={() => BackHandler.exitApp()}
              >
                <Text style={styles.btnExitText}>Exit App</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(10, 25, 47, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 10,
  },
  iconCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: COLORS?.primary || '#142B48',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: COLORS?.primary || '#142B48',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
    textAlign: 'center',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 14,
  },
  badgeText: {
    fontSize: 12,
    color: '#64748B',
  },
  bold: {
    fontWeight: '700',
    color: COLORS?.primary || '#142B48',
  },
  message: {
    fontSize: 14,
    color: '#334155',
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 24,
    paddingHorizontal: 6,
  },
  btnPrimary: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: COLORS?.primary || '#142B48',
    paddingVertical: 14,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS?.primary || '#142B48',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  btnPrimaryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  btnExit: {
    marginTop: 14,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  btnExitText: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '600',
  },
});
