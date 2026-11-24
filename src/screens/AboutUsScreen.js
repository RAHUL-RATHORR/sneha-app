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
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
          body { 
            font-family: 'Inter', sans-serif; 
            padding: 0; 
            margin: 0;
            color: #334155; 
            line-height: 1.7; 
            background-color: #F8F9FA;
            overflow-x: hidden;
          }
          .content { padding: 24px 24px 40px; }
          
          h2, h3, h4 { color: #0f172a; font-weight: 800; margin-top: 32px; margin-bottom: 16px; letter-spacing: -0.3px; }
          p { margin-bottom: 16px; }
          
          .pre-title { 
            color: #3b82f6; 
            font-weight: 800; 
            text-transform: uppercase; 
            font-size: 12px; 
            letter-spacing: 1.5px; 
            display: block; 
            margin-bottom: 8px; 
          }
          
          /* Hide all original duplicate images to clean up the design */
          .about-image-gallery { display: none !important; }
          img { display: none !important; }
          
          ul { padding-left: 20px; margin-bottom: 24px; }
          li { margin-bottom: 10px; position: relative; }
          li::marker { color: #3b82f6; font-weight: bold; }
          
          .nav-tabs { 
            display: flex; 
            list-style: none; 
            padding: 0; 
            margin-top: 30px; 
            margin-bottom: 20px;
            overflow-x: auto; 
            border-bottom: 2px solid #e2e8f0; 
          }
          .nav-tabs li { margin-right: 20px; white-space: nowrap; }
          .nav-tabs button { 
            background: none; 
            border: none; 
            font-size: 15px; 
            font-weight: 600; 
            padding: 12px 0; 
            color: #64748b; 
            cursor: pointer;
            font-family: 'Inter', sans-serif;
          }
          .nav-tabs button.active { 
            color: #2563eb; 
            border-bottom: 3px solid #2563eb; 
          }
          .tab-content { margin-top: 20px; }
          .tab-pane { display: none; opacity: 0; transition: opacity 0.3s ease; }
          .tab-pane.active { display: block; opacity: 1; }
          
          * { max-width: 100% !important; box-sizing: border-box; }
        </style>
      </head>
      <body>
        <div class="content">
          ${htmlContent || '<p>Content not available</p>'}
        </div>
        <script>
           document.querySelectorAll('.nav-tabs button').forEach(btn => {
             btn.addEventListener('click', (e) => {
               document.querySelectorAll('.nav-tabs button').forEach(b => b.classList.remove('active'));
               document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active', 'show'));
               e.target.classList.add('active');
               const targetId = e.target.getAttribute('data-bs-target');
               if(targetId) {
                 const targetPane = document.querySelector(targetId);
                 if(targetPane) targetPane.classList.add('active', 'show');
               }
             });
           });
           
           const firstTab = document.querySelector('.nav-tabs button');
           if(firstTab && !document.querySelector('.nav-tabs button.active')) {
             firstTab.click();
           }
        </script>
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
