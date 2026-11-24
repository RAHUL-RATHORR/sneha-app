import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { AppProvider } from './src/context/AppContext';
import { AuthProvider } from './src/context/AuthContext';
import ForceUpdate from './src/components/ForceUpdate';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <SafeAreaProvider>
          <StatusBar style="light" backgroundColor="#111827" />
          <ForceUpdate>
            <AppNavigator />
          </ForceUpdate>
        </SafeAreaProvider>
      </AppProvider>
    </AuthProvider>
  );
}
