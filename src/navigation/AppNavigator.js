import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ServicesScreen from '../screens/ServicesScreen';
import SearchScreen from '../screens/SearchScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import AboutUsScreen from '../screens/AboutUsScreen';
import AchievementsScreen from '../screens/AchievementsScreen';
import FAQScreen from '../screens/FAQScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import TermsConditionScreen from '../screens/TermsConditionScreen';
import FeedbackScreen from '../screens/FeedbackScreen';
import LanguageScreen from '../screens/LanguageScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  const insets = useSafeAreaInsets();
  const bottomInset = Math.max(insets.bottom, 8);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const icons = {
            HomeTab: focused ? 'home' : 'home-outline',
            MachinesTab: focused ? 'cube' : 'cube-outline',
            ClientsTab: focused ? 'people' : 'people-outline',
            SettingsTab: focused ? 'settings' : 'settings-outline',
            ServicesTab: focused ? 'construct' : 'construct-outline',
          };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.darkGray,
        headerShown: false,
        tabBarStyle: {
          paddingBottom: bottomInset,
          paddingTop: 6,
          height: 54 + bottomInset,
          backgroundColor: COLORS.white,
          borderTopWidth: 1,
          borderTopColor: COLORS.lightGray,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.06,
          shadowRadius: 4,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600', paddingBottom: 2 },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ title: 'Home' }} />
      <Tab.Screen name="MachinesTab" component={MachinesScreen} options={{ title: 'Machines' }} />
      <Tab.Screen name="ClientsTab" component={ClientsScreen} options={{ title: 'Clients' }} />
      <Tab.Screen name="ServicesTab" component={ServicesScreen} options={{ title: 'Services' }} />
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
          headerBackTitleVisible: false,
          headerBackTitle: '',
          headerBackButtonDisplayMode: 'minimal',
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MainTabs" component={TabNavigator} options={{ headerShown: false, title: '' }} />
        <Stack.Screen name="MachineDetails" component={MachineDetailsScreen} options={{ title: 'Machine Details', headerBackTitle: '', headerBackTitleVisible: false, headerBackButtonDisplayMode: 'minimal' }} />
        <Stack.Screen name="Contact" component={ContactScreen} options={{ title: 'Contact Us', headerStyle: { backgroundColor: COLORS.secondary }, headerTintColor: COLORS.white }} />
        <Stack.Screen name="Inquiry" component={InquiryScreen} options={{ title: 'Send Inquiry', headerStyle: { backgroundColor: COLORS.primary }, headerTintColor: COLORS.white, headerBackTitle: '', headerBackTitleVisible: false, headerBackButtonDisplayMode: 'minimal' }} />
        <Stack.Screen name="Events" component={EventsScreen} options={{ title: 'Events', headerStyle: { backgroundColor: COLORS.secondary }, headerTintColor: COLORS.white }} />
        <Stack.Screen name="Testimonials" component={TestimonialsScreen} options={{ title: 'Testimonials', headerStyle: { backgroundColor: COLORS.secondary }, headerTintColor: COLORS.white }} />
        <Stack.Screen name="Categories" component={CategoriesScreen} options={{ title: 'Categories', headerStyle: { backgroundColor: COLORS.secondary }, headerTintColor: COLORS.white }} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Services" component={ServicesScreen} options={{ title: 'Technical Services', headerStyle: { backgroundColor: COLORS.secondary }, headerTintColor: COLORS.white }} />
        <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ title: 'Change Password', headerStyle: { backgroundColor: COLORS.secondary }, headerTintColor: COLORS.white }} />
        <Stack.Screen name="AboutUs" component={AboutUsScreen} options={{ title: 'About Us', headerStyle: { backgroundColor: COLORS.secondary }, headerTintColor: COLORS.white }} />
        <Stack.Screen name="Achievements" component={AchievementsScreen} options={{ title: 'Achievements', headerStyle: { backgroundColor: COLORS.secondary }, headerTintColor: COLORS.white }} />
        <Stack.Screen name="FAQ" component={FAQScreen} options={{ title: 'FAQ\'s', headerStyle: { backgroundColor: COLORS.secondary }, headerTintColor: COLORS.white }} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} options={{ title: 'Privacy Policy', headerStyle: { backgroundColor: COLORS.secondary }, headerTintColor: COLORS.white }} />
        <Stack.Screen name="TermsCondition" component={TermsConditionScreen} options={{ title: 'Terms and Conditions', headerStyle: { backgroundColor: COLORS.secondary }, headerTintColor: COLORS.white }} />
        <Stack.Screen name="Feedback" component={FeedbackScreen} options={{ headerShown: false, animation: 'slide_from_bottom' }} />
        <Stack.Screen name="Language" component={LanguageScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
