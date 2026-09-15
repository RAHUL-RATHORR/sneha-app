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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Screen from '../components/Screen';
import CustomButton from '../components/CustomButton';
import Toast from '../components/Toast';
import { sendOtpApi, verifyOtpApi, resetPasswordApi } from '../api/authService';
import { COLORS, SIZES } from '../constants/theme';

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();

  // Multi-step: 1 = Email, 2 = OTP, 3 = Reset Password
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Modern Toast state
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });
  const [statusMsg, setStatusMsg] = useState('');

  const triggerToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
  };

  // Step 1: Send OTP for Forgot Password
  const handleSendOtp = async () => {
    if (!email || !email.includes('@')) {
      triggerToast('Please enter your registered email address.', 'error');
      return;
    }
    setLoading(true);
    try {
      const res = await sendOtpApi(email);
      triggerToast(res.message || 'OTP sent successfully to your email!', 'success');
      setStatusMsg('OTP sent! Please check your inbox.');
      setStep(2);
    } catch (err) {
      triggerToast(err.message || 'Failed to send reset OTP.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 4) {
      triggerToast('Please enter the 4-digit OTP.', 'error');
      return;
    }
    setLoading(true);
    try {
      const res = await verifyOtpApi(email, otp);
      triggerToast(res.message || 'Email verified successfully!', 'success');
      setStatusMsg('✓ Email verified successfully! Enter new password.');
      setStep(3);
    } catch (err) {
      triggerToast(err.message || 'Invalid or expired OTP.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Set New Password
  const handleResetPassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      triggerToast('Password must be at least 6 characters long.', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      triggerToast('Passwords do not match.', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await resetPasswordApi(email, newPassword);
      triggerToast(res.message || 'Password Reset Successfully! Redirecting to login...', 'success');
      setTimeout(() => {
        navigation.replace('Login');
      }, 1500);
    } catch (err) {
      triggerToast(err.message || 'Failed to reset password.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen backgroundColor="#142B48" barStyle="light-content">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Back Button */}
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.subtitle}>
              {step === 1 && 'Enter your registered email to receive a password reset OTP.'}
              {step === 2 && `Enter the 4-digit OTP sent to ${email}`}
              {step === 3 && 'Create a new password for your account.'}
            </Text>
          </View>

          {/* Inline Status Banner */}
          {statusMsg ? (
            <View style={styles.statusBanner}>
              <Ionicons name="checkmark-circle" size={20} color="#00E676" style={{ marginRight: 8 }} />
              <Text style={styles.statusText}>{statusMsg}</Text>
            </View>
          ) : null}

          {/* STEP 1: Enter Email */}
          {step === 1 && (
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Registered Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="name@example.com"
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              {loading ? (
                <ActivityIndicator size="large" color="#00C2E0" style={{ marginVertical: 16 }} />
              ) : (
                <CustomButton title="Send Reset OTP" onPress={handleSendOtp} style={styles.btn} />
              )}
            </View>
          )}

          {/* STEP 2: Verify OTP */}
          {step === 2 && (
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>4-Digit Reset OTP</Text>
                <TextInput
                  style={[styles.input, styles.otpInput]}
                  placeholder="0000"
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  keyboardType="number-pad"
                  maxLength={4}
                  value={otp}
                  onChangeText={setOtp}
                />
              </View>

              {loading ? (
                <ActivityIndicator size="large" color="#00C2E0" style={{ marginVertical: 16 }} />
              ) : (
                <CustomButton title="Verify OTP" onPress={handleVerifyOtp} style={styles.btn} />
              )}

              <TouchableOpacity style={styles.resendBtn} onPress={handleSendOtp}>
                <Text style={styles.resendText}>Resend OTP</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* STEP 3: Reset Password */}
          {step === 3 && (
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>New Password</Text>
                <View style={styles.passwordWrapper}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Enter new password"
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    secureTextEntry={!showPassword}
                    value={newPassword}
                    onChangeText={setNewPassword}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowPassword(!showPassword)}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Ionicons
                      name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                      size={22}
                      color="rgba(255,255,255,0.7)"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirm New Password</Text>
                <View style={styles.passwordWrapper}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Confirm new password"
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    secureTextEntry={!showPassword}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowPassword(!showPassword)}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Ionicons
                      name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                      size={22}
                      color="rgba(255,255,255,0.7)"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {loading ? (
                <ActivityIndicator size="large" color="#00C2E0" style={{ marginVertical: 16 }} />
              ) : (
                <CustomButton title="Update Password" onPress={handleResetPassword} style={styles.btn} />
              )}
            </View>
          )}
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
  scrollContent: {
    paddingHorizontal: SIZES.extraLarge,
    paddingTop: 16,
    paddingBottom: 40,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  header: {
    marginBottom: 28,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: SIZES.medium,
    color: 'rgba(255,255,255,0.6)',
  },
  statusBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 230, 118, 0.12)',
    borderWidth: 1,
    borderColor: '#00E676',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 20,
  },
  statusText: {
    color: '#00E676',
    fontSize: SIZES.font,
    fontWeight: '600',
    flex: 1,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 18,
  },
  label: {
    fontSize: SIZES.font,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,194,224,0.3)',
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: SIZES.font,
    color: '#FFFFFF',
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,194,224,0.3)',
    paddingRight: 14,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: SIZES.font,
    color: '#FFFFFF',
  },
  eyeIcon: {
    padding: 4,
  },
  otpInput: {
    fontSize: 22,
    letterSpacing: 8,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  btn: {
    marginTop: 10,
    marginBottom: 16,
  },
  resendBtn: {
    alignItems: 'center',
    marginTop: 8,
  },
  resendText: {
    color: '#00C2E0',
    fontSize: SIZES.font,
  },
});
