import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Screen from '../components/Screen';
import CustomButton from '../components/CustomButton';
import { COLORS, SHADOWS } from '../constants/theme';
import Toast from '../components/Toast';

export default function ChangePasswordScreen() {
  const navigation = useNavigation();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [showToast, setShowToast] = useState(false);

  const displayToast = (msg, type = 'error') => {
    setToastMessage(msg);
    setToastType(type);
    setShowToast(true);
  };

  const handleChangePassword = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      displayToast("All fields are required");
      return;
    }
    if (newPassword !== confirmPassword) {
      displayToast("New password and confirm password do not match");
      return;
    }
    if (newPassword.length < 6) {
      displayToast("New password must be at least 6 characters long");
      return;
    }
    
    // Call API here to change password
    
    displayToast("Password changed successfully", "success");
    setTimeout(() => {
      navigation.goBack();
    }, 1500);
  };

  return (
    <Screen backgroundColor="#F8F9FA">
      {showToast && (
        <Toast 
          message={toastMessage} 
          type={toastType} 
          onHide={() => setShowToast(false)} 
        />
      )}
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Update Password</Text>
          <Text style={styles.subtitle}>Please enter your old password and a new strong password.</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Old Password</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color={COLORS.darkGray} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter old password"
                placeholderTextColor={COLORS.darkGray}
                secureTextEntry={!showOldPassword}
                value={oldPassword}
                onChangeText={setOldPassword}
              />
              <TouchableOpacity onPress={() => setShowOldPassword(!showOldPassword)}>
                <Ionicons name={showOldPassword ? "eye-off-outline" : "eye-outline"} size={20} color={COLORS.darkGray} />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>New Password</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="key-outline" size={20} color={COLORS.darkGray} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter new password"
                placeholderTextColor={COLORS.darkGray}
                secureTextEntry={!showNewPassword}
                value={newPassword}
                onChangeText={setNewPassword}
              />
              <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
                <Ionicons name={showNewPassword ? "eye-off-outline" : "eye-outline"} size={20} color={COLORS.darkGray} />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm New Password</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="checkmark-circle-outline" size={20} color={COLORS.darkGray} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Confirm new password"
                placeholderTextColor={COLORS.darkGray}
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Ionicons name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} size={20} color={COLORS.darkGray} />
              </TouchableOpacity>
            </View>
          </View>
          
          <CustomButton 
            title="Change Password" 
            onPress={handleChangePassword} 
            style={styles.button}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  formContainer: {
    backgroundColor: COLORS.white,
    padding: 24,
    borderRadius: 20,
    ...SHADOWS.medium,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.darkGray,
    marginBottom: 24,
    lineHeight: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.secondary,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 54,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: COLORS.secondary,
  },
  button: {
    marginTop: 10,
  }
});
