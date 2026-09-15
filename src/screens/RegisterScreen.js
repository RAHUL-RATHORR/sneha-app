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
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Screen from '../components/Screen';
import CustomButton from '../components/CustomButton';
import { sendOtpApi, verifyOtpApi } from '../api/authService';
import { useAuth } from '../context/AuthContext';
import { parseAndValidateDob } from '../utils/dateUtils';
import { COLORS, SIZES } from '../constants/theme';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const { register } = useAuth();

  // Multi-step state: 1 = Email & Send OTP, 2 = Verify OTP, 3 = Profile Form
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState(''); // DD-MM-YYYY

  const [loading, setLoading] = useState(false);

  // Step 1: Send OTP
  const handleSendOtp = async () => {
    if (!email || !email.includes('@')) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }
    setLoading(true);
    try {
      const res = await sendOtpApi(email);
      Alert.alert('Success', res.message || 'OTP sent to your email.');
      setStep(2);
    } catch (err) {
      Alert.alert('Error', err.message || 'Failed to send OTP.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 4) {
      Alert.alert('Validation Error', 'Please enter the 4-digit OTP sent to your email.');
      return;
    }
    setLoading(true);
    try {
      const res = await verifyOtpApi(email, otp);
      Alert.alert('Success', res.message || 'Email verified successfully!');
      setStep(3);
    } catch (err) {
      Alert.alert('Verification Failed', err.message || 'Invalid OTP.');
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Complete Profile & Register
  const handleRegister = async () => {
    if (!fname.trim()) {
      Alert.alert('Validation Error', 'First name is required.');
      return;
    }
    if (!mobile.trim()) {
      Alert.alert('Validation Error', 'Mobile number is required.');
      return;
    }
    if (!password || password.length < 6) {
      Alert.alert('Validation Error', 'Password must be at least 6 characters long.');
      return;
    }

    const dobValidation = parseAndValidateDob(dob);
    if (!dobValidation.isValid) {
      Alert.alert('Validation Error', dobValidation.error);
      return;
    }

    setLoading(true);
    try {
      await register({
        fname: fname.trim(),
        lname: lname.trim(),
        mobile: mobile.trim(),
        email: email.trim(),
        password,
        dob: dobValidation.displayDob,
      });
      Alert.alert('Success', 'Registration successful! Welcome to Sneha Graphics.');
      navigation.replace('MainTabs');
    } catch (err) {
      Alert.alert('Registration Error', err.message || 'Registration failed.');
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
          {/* Header Back Button */}
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>
              {step === 1 && 'Step 1: Enter your email to receive a verification OTP'}
              {step === 2 && `Step 2: Enter 4-digit OTP sent to ${email}`}
              {step === 3 && 'Step 3: Complete your profile information'}
            </Text>
          </View>

          {/* STEP 1: Email Input & Send OTP */}
          {step === 1 && (
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email Address</Text>
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
                <CustomButton title="Send Verification OTP" onPress={handleSendOtp} style={styles.btn} />
              )}
            </View>
          )}

          {/* STEP 2: Verify OTP */}
          {step === 2 && (
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Enter 4-Digit OTP</Text>
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
                <Text style={styles.resendText}>Didn't get OTP? Resend OTP</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* STEP 3: Full Profile Form */}
          {step === 3 && (
            <View style={styles.form}>
              <View style={styles.row}>
                <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.label}>First Name *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Rahul"
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    value={fname}
                    onChangeText={setFname}
                  />
                </View>

                <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
                  <Text style={styles.label}>Last Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Sharma"
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    value={lname}
                    onChangeText={setLname}
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Mobile Number *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="9999999999"
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  keyboardType="phone-pad"
                  value={mobile}
                  onChangeText={setMobile}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Password (min 6 chars) *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Date of Birth (DD-MM-YYYY) *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="15-08-1995"
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  value={dob}
                  onChangeText={setDob}
                  keyboardType="numbers-and-punctuation"
                />
              </View>

              {loading ? (
                <ActivityIndicator size="large" color="#00C2E0" style={{ marginVertical: 16 }} />
              ) : (
                <CustomButton title="Complete Registration" onPress={handleRegister} style={styles.btn} />
              )}
            </View>
          )}

          {/* Footer Link to Login */}
          <View style={styles.loginFooter}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  form: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
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
  loginFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: SIZES.font,
  },
  loginLink: {
    color: '#00C2E0',
    fontSize: SIZES.font,
    fontWeight: 'bold',
  },
});
