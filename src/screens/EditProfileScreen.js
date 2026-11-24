import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Screen from '../components/Screen';
import CustomButton from '../components/CustomButton';
import Toast from '../components/Toast';
import { useAuth } from '../context/AuthContext';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const { user, updateProfileData, logout } = useAuth();

  const [fname, setFname] = useState(user?.user_fname || '');
  const [lname, setLname] = useState(user?.user_lname || '');
  const [mobile, setMobile] = useState(user?.user_mobile || '');
  const [profileImage, setProfileImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });

  const triggerToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
  };

  const handleUpdate = async () => {
    if (!fname.trim()) {
      triggerToast('First name is required.', 'error');
      return;
    }
    if (!mobile.trim()) {
      triggerToast('Mobile number is required.', 'error');
      return;
    }



    setLoading(true);
    try {
      await updateProfileData({
        fname: fname.trim(),
        lname: lname.trim(),
        mobile: mobile.trim(),
        profileImage,
      });
      triggerToast('Profile updated successfully!', 'success');
      setTimeout(() => {
        navigation.goBack();
      }, 1200);
    } catch (err) {
      if (err.isLogout) {
        triggerToast('Session expired. Logging out...', 'error');
        setTimeout(async () => {
          await logout();
          navigation.replace('Login');
        }, 1200);
      } else {
        triggerToast(err.message || 'Failed to update profile.', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen backgroundColor={COLORS.background}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {/* Top Header */}
        <View style={styles.topNav}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.topTitle}>Edit Profile</Text>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Avatar Section */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarWrap}>
              {user?.user_profile ? (
                <Image source={{ uri: user.user_profile }} style={styles.avatarImg} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Ionicons name="person" size={44} color={COLORS.secondary} />
                </View>
              )}
            </View>
            <Text style={styles.userEmailText}>{user?.user_email || 'user@example.com'}</Text>
          </View>

          {/* Form Fields */}
          <View style={styles.formCard}>
            <View style={styles.row}>
              <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.label}>First Name *</Text>
                <TextInput
                  style={styles.input}
                  value={fname}
                  onChangeText={setFname}
                  placeholder="First Name"
                  placeholderTextColor={COLORS.darkGray}
                />
              </View>

              <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.label}>Last Name</Text>
                <TextInput
                  style={styles.input}
                  value={lname}
                  onChangeText={setLname}
                  placeholder="Last Name"
                  placeholderTextColor={COLORS.darkGray}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Mobile Number *</Text>
              <TextInput
                style={styles.input}
                value={mobile}
                onChangeText={setMobile}
                placeholder="Mobile Number"
                placeholderTextColor={COLORS.darkGray}
                keyboardType="phone-pad"
              />
            </View>



            {loading ? (
              <ActivityIndicator size="large" color={COLORS.primary} style={{ marginVertical: 16 }} />
            ) : (
              <CustomButton
                title="Save Profile"
                onPress={handleUpdate}
                style={styles.saveBtn}
              />
            )}
          </View>
        </ScrollView>

        <Toast
          visible={toast.visible}
          message={toast.message}
          type={toast.type}
          onDismiss={() => setToast((prev) => ({ ...prev, visible: false }))}
        />
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: COLORS.secondary,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.white,
  },
  scrollContent: {
    padding: 20,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarWrap: {
    width: 90,
    height: 90,
    borderRadius: 45,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: COLORS.primary,
    marginBottom: 10,
    ...SHADOWS.medium,
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userEmailText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  formCard: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radiusLarge,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
  },
  row: {
    flexDirection: 'row',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: SIZES.small,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  input: {
    backgroundColor: COLORS.surfaceMuted,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: SIZES.font,
    color: COLORS.textPrimary,
  },
  saveBtn: {
    marginTop: 10,
  },
});
