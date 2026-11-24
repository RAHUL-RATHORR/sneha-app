import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Modal, 
  KeyboardAvoidingView, 
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import Toast from '../components/Toast';
import { useAuth } from '../context/AuthContext';
import { submitInquiry } from '../api/services';

const CONTACT_TYPES = [
  { label: 'Printer', id: '1' },
  { label: 'Dealer', id: '2' },
  { label: 'Other', id: '3' },
];

export default function InquiryScreen({ navigation, route }) {
  const { user } = useAuth();
  const productId = route.params?.productId;

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'error' });

  const triggerToast = (message, type = 'error') => {
    setToast({ visible: true, message, type });
  };

  const [form, setForm] = useState({
    companyName: '',
    personName: user ? `${user.user_fname || ''} ${user.user_lname || ''}`.trim() : '',
    email: user?.user_email || '',
    mobile: user?.user_mobile || '',
    whatsapp: user?.user_mobile || '',
    contactType: '1',
    city: '',
    state: '',
    country: '',
    requirements: ''
  });

  const handleSubmit = async () => {
    if (!form.companyName?.trim() || !form.personName?.trim() || !form.email?.trim() || !form.mobile?.trim() || !form.whatsapp?.trim() || !form.city?.trim() || !form.state?.trim() || !form.country?.trim() || !form.requirements?.trim()) {
      triggerToast('Please fill in all required fields.', 'error');
      return;
    }

    if (form.mobile.trim().length < 9 || form.mobile.trim().length > 12) {
      triggerToast('Mobile number must be between 9 and 12 digits.', 'error');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        contact_name: form.companyName.trim(),
        contact_person: form.personName.trim(),
        contact_email: form.email.trim(),
        contact_mobile: form.mobile.trim(),
        contact_whatsapp: form.whatsapp.trim(),
        contact_type: form.contactType || '1',
        contact_city: form.city.trim(),
        contact_state: form.state.trim(),
        contact_country: form.country.trim(),
        contact_message: form.requirements.trim(),
        contact_form_type: productId ? 2 : 1,
      };
      
      if (productId) {
        payload.product_id = productId;
      }

      const response = await submitInquiry(payload);
      
      if (response && response.status === false) {
        triggerToast(response.message || 'Error sending inquiry.', 'error');
        return;
      }

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigation.goBack();
      }, 2500);
    } catch (error) {
      const serverMsg = error.response?.data?.message || error.message || 'Failed to submit inquiry.';
      triggerToast(serverMsg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.keyboardContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 80}
    >
      <Modal visible={showSuccess} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalContent}>
            <LottieView
              autoPlay
              loop={false}
              style={{ width: 150, height: 150 }}
              source={{ uri: 'https://assets9.lottiefiles.com/packages/lf20_q7uarxsb.json' }}
            />
            <Text style={styles.modalTitle}>Success!</Text>
            <Text style={styles.modalText}>Your inquiry has been sent.</Text>
          </View>
        </View>
      </Modal>

      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>Looking for a Particular Machine?</Text>
            <View style={styles.underline} />
            <Text style={styles.subtitle}>Please fill out the form below with your requirements and our team will get in touch with you shortly.</Text>
          </View>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <CustomInput label="Company Name *" value={form.companyName} onChangeText={t => setForm({...form, companyName: t})} inputStyle={styles.blackInput} />
            </View>
            <View style={styles.halfWidth}>
              <CustomInput label="Person Name *" value={form.personName} onChangeText={t => setForm({...form, personName: t})} inputStyle={styles.blackInput} />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <CustomInput label="Email Address *" keyboardType="email-address" autoCapitalize="none" value={form.email} onChangeText={t => setForm({...form, email: t})} inputStyle={styles.blackInput} />
            </View>
            <View style={styles.halfWidth}>
              <CustomInput label="Mobile Number *" keyboardType="phone-pad" value={form.mobile} onChangeText={t => setForm({...form, mobile: t})} inputStyle={styles.blackInput} />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <CustomInput label="Whatsapp Number *" keyboardType="phone-pad" value={form.whatsapp} onChangeText={t => setForm({...form, whatsapp: t})} inputStyle={styles.blackInput} />
            </View>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>Contact Type *</Text>
              <View style={styles.chipRow}>
                {CONTACT_TYPES.map(item => (
                  <TouchableOpacity 
                    key={item.id} 
                    style={[styles.typeChip, form.contactType === item.id && styles.typeChipActive]}
                    onPress={() => setForm({...form, contactType: item.id})}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.typeChipText, form.contactType === item.id && styles.typeChipTextActive]}>{item.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.row3}>
            <View style={styles.thirdWidth}>
              <CustomInput label="City *" value={form.city} onChangeText={t => setForm({...form, city: t})} inputStyle={styles.blackInput} />
            </View>
            <View style={styles.thirdWidth}>
              <CustomInput label="State *" value={form.state} onChangeText={t => setForm({...form, state: t})} inputStyle={styles.blackInput} />
            </View>
            <View style={styles.thirdWidth}>
              <CustomInput label="Country *" value={form.country} onChangeText={t => setForm({...form, country: t})} inputStyle={styles.blackInput} />
            </View>
          </View>

          <CustomInput 
            label="Requirements *" 
            multiline 
            numberOfLines={4} 
            value={form.requirements} 
            onChangeText={t => setForm({...form, requirements: t})} 
            inputStyle={styles.blackInput}
          />
          
          <View style={styles.btnContainer}>
            <CustomButton title={loading ? "Sending..." : "Submit Inquiry"} onPress={handleSubmit} disabled={loading} />
          </View>
        </View>
      </ScrollView>

      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onDismiss={() => setToast((prev) => ({ ...prev, visible: false }))}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20, paddingBottom: 60 },
  headerRow: { marginBottom: 24 },
  title: { fontSize: 22, fontWeight: 'bold', color: COLORS.secondary },
  underline: { width: 70, height: 4, backgroundColor: COLORS.primary, marginTop: 8, borderRadius: 2, marginBottom: 14 },
  subtitle: { fontSize: SIZES.font, color: COLORS.darkGray, marginBottom: 16, lineHeight: 22 },
  contactItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, padding: 8, borderWidth: 1, borderColor: COLORS.lightGray, borderRadius: 4, alignSelf: 'flex-start' },
  contactText: { marginLeft: 10, fontSize: SIZES.font, color: COLORS.darkGray },
  formContainer: { backgroundColor: COLORS.white, padding: 14, borderRadius: 12, borderWidth: 1, borderColor: '#CBD5E1', ...SHADOWS.small },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  halfWidth: { width: '48%' },
  row3: { flexDirection: 'row', justifyContent: 'space-between' },
  thirdWidth: { width: '31%' },
  blackInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#94A3B8',
    borderRadius: 8,
  },
  label: { fontSize: SIZES.font, color: COLORS.secondary, fontWeight: '700', marginBottom: 6 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 16 },
  typeChip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#94A3B8', backgroundColor: '#FFFFFF', height: 38, justifyContent: 'center' },
  typeChipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  typeChipText: { fontSize: 12, color: COLORS.textPrimary, fontWeight: '600' },
  typeChipTextActive: { color: COLORS.white, fontWeight: 'bold' },
  btnContainer: { marginTop: 14, marginBottom: 20 },
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: COLORS.white, padding: 30, borderRadius: 20, alignItems: 'center', ...SHADOWS.medium },
  modalTitle: { fontSize: 24, fontWeight: 'bold', color: COLORS.secondary, marginTop: 16 },
  modalText: { fontSize: SIZES.font, color: COLORS.darkGray, marginTop: 8 }
});
