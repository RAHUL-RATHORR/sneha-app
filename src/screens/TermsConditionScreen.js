import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import Screen from '../components/Screen';
import { COLORS } from '../constants/theme';
import { getPageData } from '../api/services';

export default function TermsConditionScreen() {
  const [htmlContent, setHtmlContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const data = await getPageData('terms-conditions');
        if (data && data.page_content) {
          setHtmlContent(data.page_content);
        }
      } catch (error) {
        console.error("Error fetching terms conditions page:", error);
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

  const fallbackTerms = `
    <h2>Terms & Conditions - Sneha Graphics & Solutions</h2>
    <p>Last updated: November 2026</p>
    <p>Welcome to Sneha Graphics & Solutions. By accessing or using our mobile application, you agree to be bound by these Terms and Conditions.</p>

    <h3>1. Services Overview</h3>
    <p>Sneha Graphics & Solutions provides information, catalog browsing, and quotation inquiries for industrial printing, packaging, and graphics machinery.</p>

    <h3>2. User Accounts</h3>
    <p>You are responsible for safeguarding your login credentials. You agree to provide accurate and complete information during registration and notify us immediately of any unauthorized use of your account.</p>

    <h3>3. Quotations and Inquiries</h3>
    <p>Product listings and machine specifications are for informational and inquiry purposes. Official price quotations and delivery commitments are finalized via direct communication with our sales engineering team.</p>

    <h3>4. Intellectual Property</h3>
    <p>All brand names, trademarks, machine specifications, and multimedia content featured in the application are the property of Sneha Graphics & Solutions or their respective brand owners.</p>

    <h3>5. Governing Law</h3>
    <p>These terms are governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Jaipur, Rajasthan, India.</p>

    <h3>6. Contact Information</h3>
    <p>For any queries regarding these Terms, contact us at:<br/>
    <strong>Email:</strong> snehagraphicssolutions@gmail.com<br/>
    <strong>Phone:</strong> +91 97999 68351</p>
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
        ${htmlContent || fallbackTerms}
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
