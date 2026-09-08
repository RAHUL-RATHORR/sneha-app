import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { AppProvider } from './src/context/AppContext';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <AppProvider>
      <SafeAreaProvider>
        <StatusBar style="light" backgroundColor="#111827" />
        <AppNavigator />
      </SafeAreaProvider>
    </AppProvider>
  );
}
