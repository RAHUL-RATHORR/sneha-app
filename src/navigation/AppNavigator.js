import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

// Screens
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import HomeScreen from '../screens/HomeScreen';
import MachinesScreen from '../screens/MachinesScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import ContactScreen from '../screens/ContactScreen';
import MachineDetailsScreen from '../screens/MachineDetailsScreen';
import InquiryScreen from '../screens/InquiryScreen';
import EventsScreen from '../screens/EventsScreen';
import ClientsScreen from '../screens/ClientsScreen';
import TestimonialsScreen from '../screens/TestimonialsScreen';
import LoginScreen from '../screens/LoginScreen';
import SettingsScreen from '../screens/SettingsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const icons = {
            HomeTab: focused ? 'home' : 'home-outline',
            MachinesTab: focused ? 'cube' : 'cube-outline',
            ClientsTab: focused ? 'people' : 'people-outline',
            ContactTab: focused ? 'call' : 'call-outline',
            SettingsTab: focused ? 'settings' : 'settings-outline',
          };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.darkGray,
        headerShown: false,
        tabBarStyle: {
          paddingBottom: 6,
          paddingTop: 6,
          height: 64,
          backgroundColor: COLORS.white,
          borderTopWidth: 1,
          borderTopColor: COLORS.lightGray,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.06,
          shadowRadius: 4,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ title: 'Home' }} />
      <Tab.Screen name="MachinesTab" component={MachinesScreen} options={{ title: 'Machines' }} />
      <Tab.Screen name="ClientsTab" component={ClientsScreen} options={{ title: 'Clients' }} />
      <Tab.Screen name="ContactTab" component={ContactScreen} options={{ title: 'Contact' }} />
      <Tab.Screen name="SettingsTab" component={SettingsScreen} options={{ title: 'Settings' }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.secondary },
          headerTintColor: COLORS.white,
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MainTabs" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="MachineDetails" component={MachineDetailsScreen} options={{ title: 'Machine Details' }} />
        <Stack.Screen name="Inquiry" component={InquiryScreen} options={{ title: 'Send Inquiry', headerStyle: { backgroundColor: COLORS.primary }, headerTintColor: COLORS.white }} />
        <Stack.Screen name="Events" component={EventsScreen} options={{ title: 'Events', headerStyle: { backgroundColor: COLORS.secondary }, headerTintColor: COLORS.white }} />
        <Stack.Screen name="Testimonials" component={TestimonialsScreen} options={{ title: 'Testimonials', headerStyle: { backgroundColor: COLORS.secondary }, headerTintColor: COLORS.white }} />
        <Stack.Screen name="Categories" component={CategoriesScreen} options={{ title: 'Categories', headerStyle: { backgroundColor: COLORS.secondary }, headerTintColor: COLORS.white }} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
