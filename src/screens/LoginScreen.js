import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Alert, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Screen from '../components/Screen';
import CustomButton from '../components/CustomButton';
import PrinterLogo from '../components/ShatterLogo';
import { COLORS, SIZES } from '../constants/theme';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please enter both your email and password to login.');
      return;
    }
    // API call can go here later
    navigation.replace('MainTabs');
  };

  return (
    <Screen style={styles.container} backgroundColor='#142B48' barStyle='light-content'>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.innerContainer}
        >
          {/* ── Brand Logo & Animation ── */}
          <View style={styles.logoSection}>
            <View style={styles.glowRing} />
            <PrinterLogo style={styles.logo} />
            <View style={styles.logoCard}>
              <Image 
                source={require('../../assets/logo.png')} 
                style={styles.brandLogoImage} 
                resizeMode="contain" 
              />
            </View>
          </View>

          <View style={styles.header}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor={COLORS.darkGray}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor={COLORS.darkGray}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <View style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </View>

            <CustomButton 
              title="Login" 
              onPress={handleLogin} 
              style={styles.loginButton} 
            />

            <TouchableOpacity 
              style={styles.guestButton} 
              onPress={() => navigation.replace('MainTabs')}
              activeOpacity={0.7}
            >
              <Text style={styles.guestButtonText}>Explore App as Guest →</Text>
            </TouchableOpacity>

            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't have an account? </Text>
              <Text style={styles.signupLink}>Sign Up</Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#142B48',
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: SIZES.extraLarge,
    justifyContent: 'center',
    paddingBottom: 20,
  },
  // ── Logo Section ──
  logoSection: {
    alignItems: 'center',
    marginBottom: 28,
    position: 'relative',
  },
  glowRing: {
    position: 'absolute',
    width: 210,
    height: 210,
    borderRadius: 105,
    backgroundColor: 'rgba(0, 194, 224, 0.07)',
    top: '50%',
    left: '50%',
    marginTop: -105,
    marginLeft: -105,
    borderWidth: 1,
    borderColor: 'rgba(0, 194, 224, 0.2)',
  },
  logo: {
    // ShatterLogo itself handles sizing (166x166 for 3x3 grid)
  },
  logoCard: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    marginTop: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  brandLogoImage: {
    width: 170,
    height: 44,
  },
  // ── Header ──
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
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#00C2E0',
    fontSize: SIZES.font,
    fontWeight: '600',
  },
  loginButton: {
    marginBottom: 14,
  },
  guestButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 194, 224, 0.4)',
    backgroundColor: 'rgba(0, 194, 224, 0.08)',
    marginBottom: 24,
  },
  guestButtonText: {
    color: '#00C2E0',
    fontSize: SIZES.font,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: SIZES.font,
  },
  signupLink: {
    color: '#00C2E0',
    fontSize: SIZES.font,
    fontWeight: 'bold',
  },
});


