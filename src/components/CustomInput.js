import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';

export default function CustomInput({ label, error, ...props }) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput 
        style={[
          styles.input, 
          props.multiline && styles.multiline,
          props.inputStyle,
          props.style,
          error && styles.errorBorder
        ]}
        placeholderTextColor={props.placeholderTextColor || '#9CA3AF'}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: SIZES.font,
    color: COLORS.secondary,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    backgroundColor: COLORS.gray,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: SIZES.medium,
    color: COLORS.black,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  errorBorder: {
    borderColor: COLORS.error,
  },
  errorText: {
    color: COLORS.error,
    fontSize: SIZES.small,
    marginTop: 4,
  }
});
