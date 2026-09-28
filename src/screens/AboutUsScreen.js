import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import Screen from '../components/Screen';
import { COLORS } from '../constants/theme';
import { getPageData } from '../api/services';

export default function AboutUsScreen() {
  const [htmlContent, setHtmlContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const data = await getPageData('about-us');
        if (data && data.page_content) {
          setHtmlContent(data.page_content);
        }
      } catch (error) {
        console.error("Error fetching about us page:", error);
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
        ${htmlContent || '<p>Content not available</p>'}
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
