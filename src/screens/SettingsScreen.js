import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Image, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, CommonActions } from '@react-navigation/native';
import Screen from '../components/Screen';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import { useAuth } from '../context/AuthContext';

export default function SettingsScreen() {
  const navigation = useNavigation();
  const { user, isLoggedIn, logout, deleteAccount } = useAuth();
  const [policiesExpanded, setPoliciesExpanded] = useState(false);

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

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to permanently delete your account? All your personal details, inquiries, and saved data will be removed. This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete My Account",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteAccount();
              Alert.alert(
                "Account Deleted",
                "Your account and associated data have been removed successfully."
              );
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'Login' }],
                })
              );
            } catch (err) {
              Alert.alert("Notice", err?.message || "Failed to process request. Please contact support.");
            }
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
          <Text style={styles.sectionTitle}>Support & Info</Text>
          
          <TouchableOpacity
            style={styles.rowButton}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Contact')}
          >
            <View style={[styles.rowIconWrap, { backgroundColor: '#F59E0B' }]}>
              <Ionicons name="call" size={20} color={COLORS.white} />
            </View>
            <Text style={styles.rowLabel}>Contact Us</Text>
            <Ionicons name="chevron-forward" size={20} color={COLORS.darkGray} style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.rowButton}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('AboutUs')}
          >
            <View style={[styles.rowIconWrap, { backgroundColor: '#3B82F6' }]}>
              <Ionicons name="information-circle" size={20} color={COLORS.white} />
            </View>
            <Text style={styles.rowLabel}>About Us</Text>
            <Ionicons name="chevron-forward" size={20} color={COLORS.darkGray} style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>

          <View style={styles.divider} />



          <TouchableOpacity
            style={styles.rowButton}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Achievements')}
          >
            <View style={[styles.rowIconWrap, { backgroundColor: '#EC4899' }]}>
              <Ionicons name="trophy" size={20} color={COLORS.white} />
            </View>
            <Text style={styles.rowLabel}>Achievements</Text>
            <Ionicons name="chevron-forward" size={20} color={COLORS.darkGray} style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.rowButton}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Feedback')}
          >
            <View style={[styles.rowIconWrap, { backgroundColor: '#14B8A6' }]}>
              <Ionicons name="chatbox-ellipses" size={20} color={COLORS.white} />
            </View>
            <Text style={styles.rowLabel}>Send Feedback</Text>
            <Ionicons name="chevron-forward" size={20} color={COLORS.darkGray} style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.rowButton}
            activeOpacity={0.7}
            onPress={() => setPoliciesExpanded(!policiesExpanded)}
          >
            <View style={[styles.rowIconWrap, { backgroundColor: '#6B7280' }]}>
              <Ionicons name="document-text" size={20} color={COLORS.white} />
            </View>
            <Text style={styles.rowLabel}>Our Policies</Text>
            <Ionicons name={policiesExpanded ? "chevron-up" : "chevron-down"} size={20} color={COLORS.darkGray} style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>

          {policiesExpanded && (
            <View style={styles.dropdownContainer}>
              <TouchableOpacity style={styles.dropdownItem} onPress={() => navigation.navigate('FAQ')}>
                <Text style={styles.dropdownText}>FAQ's</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem} onPress={() => navigation.navigate('PrivacyPolicy')}>
                <Text style={styles.dropdownText}>Privacy Policy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem} onPress={() => navigation.navigate('TermsCondition')}>
                <Text style={styles.dropdownText}>Terms and condition</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <TouchableOpacity
            style={styles.rowButton}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Language')}
          >
            <View style={[styles.rowIconWrap, { backgroundColor: '#3B82F6' }]}>
              <Ionicons name="language" size={20} color={COLORS.white} />
            </View>
            <Text style={styles.rowLabel}>App Language</Text>
            <Ionicons name="chevron-forward" size={20} color={COLORS.darkGray} style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
          
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

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.rowButton}
            activeOpacity={0.7}
            onPress={() => {
              if (isLoggedIn) {
                navigation.navigate('ChangePassword');
              } else {
                navigation.navigate('Login');
              }
            }}
          >
            <View style={[styles.rowIconWrap, { backgroundColor: '#8B5CF6' }]}>
              <Ionicons name="lock-closed" size={20} color={COLORS.white} />
            </View>
            <Text style={styles.rowLabel}>Change Password</Text>
            <Ionicons name="chevron-forward" size={20} color={COLORS.darkGray} style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>

          {isLoggedIn && (
            <>
              <View style={styles.divider} />
              <TouchableOpacity
                style={styles.rowButton}
                activeOpacity={0.7}
                onPress={handleDeleteAccount}
              >
                <View style={[styles.rowIconWrap, { backgroundColor: '#EF4444' }]}>
                  <Ionicons name="trash-outline" size={20} color={COLORS.white} />
                </View>
                <Text style={[styles.rowLabel, { color: '#EF4444' }]}>Delete Account</Text>
                <Ionicons name="chevron-forward" size={20} color={COLORS.darkGray} style={{ marginLeft: 'auto' }} />
              </TouchableOpacity>
            </>
          )}
        </View>


        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Follow Us</Text>
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialBtn} onPress={() => Linking.openURL('https://www.facebook.com/snehagraphicsandsolutions')}>
              <Ionicons name="logo-facebook" size={28} color="#1877F2" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn} onPress={() => Linking.openURL('https://www.instagram.com/snehagraphicsandsoultions/')}>
              <Ionicons name="logo-instagram" size={28} color="#E4405F" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn} onPress={() => Linking.openURL('https://www.youtube.com/@snehagraphicsandsolutions692')}>
              <Ionicons name="logo-youtube" size={28} color="#FF0000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn} onPress={() => Linking.openURL('https://t.me/+919214527136')}>
              <Ionicons name="paper-plane" size={28} color="#0A66C2" />
            </TouchableOpacity>
          </View>
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
  dropdownContainer: {
    marginLeft: 56,
    marginTop: 4,
    marginBottom: 8,
  },
  dropdownItem: {
    paddingVertical: 12,
  },
  dropdownText: {
    fontSize: 15,
    color: COLORS.secondary,
    fontWeight: '600',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  socialBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light,
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
