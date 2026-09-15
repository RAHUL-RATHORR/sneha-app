import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function Toast({
  visible,
  message,
  type = 'success', // 'success' | 'error' | 'info'
  onDismiss,
  duration = 3500,
}) {
  const translateY = useRef(new Animated.Value(100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          friction: 8,
          tension: 80,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        dismiss();
      }, duration);

      return () => clearTimeout(timer);
    } else {
      dismiss();
    }
  }, [visible]);

  const dismiss = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 100,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onDismiss) onDismiss();
    });
  };

  if (!visible && opacity._value === 0) return null;

  const isSuccess = type === 'success';
  const isError = type === 'error';

  const iconName = isSuccess
    ? 'checkmark-circle'
    : isError
    ? 'alert-circle'
    : 'information-circle';

  const bgColor = isSuccess
    ? '#0D3B2E'
    : isError
    ? '#4A121A'
    : '#122D42';

  const borderColor = isSuccess
    ? '#00E676'
    : isError
    ? '#FF5252'
    : '#00C2E0';

  const iconColor = isSuccess
    ? '#00E676'
    : isError
    ? '#FF5252'
    : '#00C2E0';

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        {
          backgroundColor: bgColor,
          borderColor: borderColor,
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      <View style={styles.contentRow}>
        <Ionicons name={iconName} size={24} color={iconColor} style={styles.icon} />
        <Text style={styles.messageText}>{message}</Text>
        <TouchableOpacity onPress={dismiss} style={styles.closeBtn} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="close" size={18} color="rgba(255,255,255,0.6)" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    borderRadius: 14,
    borderWidth: 1.5,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
    zIndex: 9999,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
  },
  messageText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  closeBtn: {
    marginLeft: 8,
    padding: 2,
  },
});
