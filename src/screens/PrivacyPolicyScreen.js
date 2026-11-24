import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import Screen from '../components/Screen';
import { COLORS } from '../constants/theme';
import { getPageData } from '../api/services';

export default function PrivacyPolicyScreen() {
  const [htmlContent, setHtmlContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const data = await getPageData('privacy-policy');
        if (data && data.page_content) {
          setHtmlContent(data.page_content);
        }
      } catch (error) {
        console.error("Error fetching privacy policy page:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPage();
  }, []);

  if (loading) {
    return (
      <Screen backgroundColor="#F8F9FA">
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </Screen>
    );
  }

  const fallbackPrivacyPolicy = `
    <h2>Privacy Policy - Sneha Graphics & Solutions</h2>
    <p>Last updated: November 2026</p>
    <p>Sneha Graphics & Solutions ("we", "our", or "us") is dedicated to protecting your privacy. This Privacy Policy explains how our mobile application collects, uses, and safeguards your information.</p>

    <h3>1. Information We Collect</h3>
    <p>When you register or submit inquiries through our application, we may collect personal details such as your full name, email address, phone number, and machine inquiry details.</p>

    <h3>2. How We Use Your Information</h3>
    <p>We use your information exclusively to:</p>
    <ul>
      <li>Provide, operate, and maintain our application services.</li>
      <li>Process your machinery inquiries and customer support requests.</li>
      <li>Notify you regarding your inquiries, updates, or account security.</li>
    </ul>

    <h3>3. Data Protection and Security</h3>
    <p>We implement strict administrative, technical, and physical security measures to protect your personal data from unauthorized access or disclosure.</p>

    <h3>4. Account Deletion and Data Retention</h3>
    <p>Users may request or perform account deletion at any time directly within the Settings menu of the app. Upon deletion, your personal data and inquiry history will be permanently deleted from our servers.</p>

    <h3>5. Contact Us</h3>
    <p>If you have any questions about this Privacy Policy, please contact us at:</p>
    <p><strong>Email:</strong> snehagraphicssolutions@gmail.com<br/>
    <strong>Phone:</strong> +91 97999 68351<br/>
    <strong>Address:</strong> Plot No. 21, AD Industrial Area, Harsooliya, Rajasthan 303904, India</p>
  `;

  const customHTML = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: -apple-system, sans-serif; padding: 16px; color: #4b5563; line-height: 1.6; }
          img { max-width: 100%; height: auto; border-radius: 8px; }
          h2, h3, h4 { color: #1e293b; }
        </style>
      </head>
      <body>
        ${htmlContent || fallbackPrivacyPolicy}
      </body>
    </html>
  `;

  return (
    <Screen backgroundColor="#F8F9FA">
      <WebView 
        source={{ html: customHTML }} 
        style={styles.webview}
        originWhitelist={['*']}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent'
  }
});
