import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Image, Animated, Easing } from 'react-native';
import { COLORS } from '../constants/theme';

import { useAuth } from '../context/AuthContext';

export default function SplashScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { isLoggedIn, isLoading } = useAuth();
  const [isAnimFinished, setIsAnimFinished] = useState(false);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start(() => {
      setIsAnimFinished(true);
    });
  }, []);

  useEffect(() => {
    if (isAnimFinished && !isLoading) {
      setTimeout(() => {
        if (isLoggedIn) {
          navigation.replace('MainTabs');
        } else {
          navigation.replace('Login');
        }
      }, 500);
    }
  }, [isAnimFinished, isLoading, isLoggedIn, navigation]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
        <Image 
          source={require('../../assets/logo.png')} 
          style={styles.logo} 
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 290,
    height: 120,
  },
  logo: {
    width: '100%',
    height: '100%',
  }
});
