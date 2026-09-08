import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

export default function InquiryScreen({ navigation }) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [form, setForm] = useState({
    companyName: '',
    personName: '',
    email: '',
    mobile: '',
    whatsapp: '',
    contactType: '',
    city: '',
    state: '',
    country: '',
    requirements: ''
  });

  const handleSubmit = () => {
    if (!form.companyName || !form.personName || !form.email || !form.mobile || !form.whatsapp || !form.city || !form.state || !form.country || !form.requirements) {
      Alert.alert('Validation Error', 'Please fill in all required fields.');
      return;
    }
    // Show success modal
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigation.goBack();
    }, 2500);
  };

  return (
    <>
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

      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      
      <View style={styles.headerRow}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.title}>Looking for a Particular Machine?</Text>
          <View style={styles.underline} />
          <Text style={styles.subtitle}>Contact a member of our team today using the below details or complete our enquiry form</Text>
          
          <View style={styles.contactItem}>
            <Ionicons name="mail-outline" size={20} color={COLORS.secondary} />
            <Text style={styles.contactText}>snehagraphicssolutions@gmail.com</Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons name="call-outline" size={20} color={COLORS.secondary} />
            <Text style={styles.contactText}>+91-9799968351</Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons name="call-outline" size={20} color={COLORS.secondary} />
            <Text style={styles.contactText}>+91-9214527136</Text>
          </View>
        </View>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <CustomInput label="Company Name *" placeholder="" value={form.companyName} onChangeText={t => setForm({...form, companyName: t})} />
          </View>
          <View style={styles.halfWidth}>
            <CustomInput label="Person Name *" placeholder="" value={form.personName} onChangeText={t => setForm({...form, personName: t})} />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <CustomInput label="Email Address *" placeholder="" keyboardType="email-address" value={form.email} onChangeText={t => setForm({...form, email: t})} />
          </View>
          <View style={styles.halfWidth}>
            <CustomInput label="Mobile Number *" placeholder="" keyboardType="phone-pad" value={form.mobile} onChangeText={t => setForm({...form, mobile: t})} />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <CustomInput label="Whatsapp Number *" placeholder="" keyboardType="phone-pad" value={form.whatsapp} onChangeText={t => setForm({...form, whatsapp: t})} />
          </View>
          <View style={styles.halfWidth}>
            <Text style={styles.label}>Contact Type *</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={form.contactType}
                onValueChange={(val) => setForm({...form, contactType: val})}
                style={styles.picker}
              >
                <Picker.Item label="Select Type" value="" />
                <Picker.Item label="Buyer" value="Buyer" />
                <Picker.Item label="Seller" value="Seller" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
            </View>
          </View>
        </View>

        <View style={styles.row3}>
          <View style={styles.thirdWidth}>
            <CustomInput label="City *" placeholder="" value={form.city} onChangeText={t => setForm({...form, city: t})} />
          </View>
          <View style={styles.thirdWidth}>
            <CustomInput label="State *" placeholder="" value={form.state} onChangeText={t => setForm({...form, state: t})} />
          </View>
          <View style={styles.thirdWidth}>
            <CustomInput label="Country *" placeholder="" value={form.country} onChangeText={t => setForm({...form, country: t})} />
          </View>
        </View>

        <CustomInput label="Requirements *" placeholder="" multiline numberOfLines={4} value={form.requirements} onChangeText={t => setForm({...form, requirements: t})} />
        
        <View style={styles.btnContainer}>
          <CustomButton title="Submit" onPress={handleSubmit} style={{ width: 120 }} />
        </View>
      </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20 },
  headerRow: { marginBottom: 30 },
  title: { fontSize: 24, fontWeight: 'bold', color: COLORS.secondary },
  underline: { width: 80, height: 4, backgroundColor: COLORS.primary, marginTop: 8, borderRadius: 2, marginBottom: 16 },
  subtitle: { fontSize: SIZES.font, color: COLORS.darkGray, marginBottom: 20, lineHeight: 22 },
  contactItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, padding: 8, borderWidth: 1, borderColor: COLORS.lightGray, borderRadius: 4, alignSelf: 'flex-start' },
  contactText: { marginLeft: 10, fontSize: SIZES.font, color: COLORS.darkGray },
  formContainer: { backgroundColor: COLORS.white, padding: 5 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  halfWidth: { width: '48%' },
  row3: { flexDirection: 'row', justifyContent: 'space-between' },
  thirdWidth: { width: '31%' },
  label: { fontSize: SIZES.font, color: COLORS.secondary, fontWeight: '600', marginBottom: 6 },
  pickerContainer: { borderWidth: 1, borderColor: COLORS.lightGray, borderRadius: 8, backgroundColor: COLORS.gray, height: 48, justifyContent: 'center', marginBottom: 16 },
  picker: { width: '100%' },
  btnContainer: { marginTop: 10, marginBottom: 40 },
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: COLORS.white, padding: 30, borderRadius: 20, alignItems: 'center', ...SHADOWS.medium },
  modalTitle: { fontSize: 24, fontWeight: 'bold', color: COLORS.secondary, marginTop: 16 },
  modalText: { fontSize: SIZES.font, color: COLORS.darkGray, marginTop: 8 }
});
