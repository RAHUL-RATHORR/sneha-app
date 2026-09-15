import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, CommonActions } from '@react-navigation/native';
import Screen from '../components/Screen';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

export default function SettingsScreen() {
  const navigation = useNavigation();
  const { isDarkMode, toggleDarkMode } = useAppContext();
  const { user, isLoggedIn, logout } = useAuth();

  const [notifications, setNotifications] = useState(true);

  const toggleSwitch = () => toggleDarkMode();
  const toggleNotifications = () => setNotifications(previousState => !previousState);

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out of your account?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Log Out", 
          style: "destructive",
          onPress: async () => {
            await logout();
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              })
            );
          }
        }
      ]
    );
  };

  const fullName = user ? `${user.user_fname || ''} ${user.user_lname || ''}`.trim() : 'Guest User';
  const email = user?.user_email || 'Sign in to access your profile';
  const avatarUrl = user?.user_profile || `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName || 'User')}&background=00C2E0&color=fff&size=120`;

  return (
    <Screen backgroundColor="#F8F9FA">
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Profile Card Header */}
        <View style={styles.profileSection}>
          <Image source={{ uri: avatarUrl }} style={styles.profileImage} />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{fullName}</Text>
            <Text style={styles.profileEmail} numberOfLines={1}>{email}</Text>
          </View>

          {isLoggedIn ? (
            <TouchableOpacity style={styles.editBtn} onPress={() => navigation.navigate('EditProfile')}>
              <Ionicons name="pencil" size={16} color={COLORS.white} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.signInBtn} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.signInBtnText}>Sign In</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <View style={styles.row}>
            <View style={styles.rowIconWrap}>
              <Ionicons name="moon" size={20} color={COLORS.white} />
            </View>
            <Text style={styles.rowLabel}>Dark Mode</Text>
            <Switch
              trackColor={{ false: COLORS.lightGray, true: COLORS.primary }}
              thumbColor={COLORS.white}
              onValueChange={toggleSwitch}
              value={isDarkMode}
              style={{ marginLeft: 'auto' }}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <View style={[styles.rowIconWrap, { backgroundColor: '#3B82F6' }]}>
              <Ionicons name="notifications" size={20} color={COLORS.white} />
            </View>
            <Text style={styles.rowLabel}>Push Notifications</Text>
            <Switch
              trackColor={{ false: COLORS.lightGray, true: COLORS.primary }}
              thumbColor={COLORS.white}
              onValueChange={toggleNotifications}
              value={notifications}
              style={{ marginLeft: 'auto' }}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <TouchableOpacity
            style={styles.rowButton}
            activeOpacity={0.7}
            onPress={() => {
              if (isLoggedIn) {
                navigation.navigate('EditProfile');
              } else {
                navigation.navigate('Login');
              }
            }}
          >
            <View style={[styles.rowIconWrap, { backgroundColor: '#10B981' }]}>
              <Ionicons name="person" size={20} color={COLORS.white} />
            </View>
            <Text style={styles.rowLabel}>Personal Information</Text>
            <Ionicons name="chevron-forward" size={20} color={COLORS.darkGray} style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
        </View>

        {isLoggedIn && (
          <View style={styles.logoutContainer}>
            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.8}>
              <Ionicons name="log-out-outline" size={22} color={COLORS.error} />
              <Text style={styles.logoutBtnText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        )}

      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
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
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 20,
    marginBottom: 24,
    ...SHADOWS.medium,
    elevation: 4,
  },
  profileImage: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 2,
    borderColor: '#FFF7ED',
  },
  profileInfo: {
    marginLeft: 14,
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: 12,
    color: COLORS.darkGray,
    fontWeight: '500',
  },
  editBtn: {
    backgroundColor: COLORS.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.light,
  },
  signInBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: SIZES.radius,
  },
  signInBtnText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 12,
  },
  section: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    ...SHADOWS.medium,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.darkGray,
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  rowButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  rowIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    fontSize: 16,
    color: COLORS.secondary,
    marginLeft: 16,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 10,
    marginLeft: 56,
  },
  logoutContainer: {
    marginTop: 10,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  logoutBtnText: {
    color: COLORS.error,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
