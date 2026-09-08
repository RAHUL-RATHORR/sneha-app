import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../constants/theme';

/**
 * Screen – wraps every screen with correct safe-area padding.
 * Handles the Dynamic Island on iPhone 14 Pro and notch on older models.
 *
 * Props:
 *  - style            : extra styles for the container
 *  - noTopPadding     : set true when the screen has a custom header already
 *  - backgroundColor  : override background color (default: white)
 *  - barStyle         : 'light-content' | 'dark-content'
 */
export default function Screen({
  children,
  style,
  noTopPadding = false,
  backgroundColor = COLORS.background,
  barStyle = 'light-content',
}) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor,
          paddingTop: noTopPadding ? 0 : insets.top,
          paddingBottom: 0, // bottom is handled by the Tab bar itself
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
        style,
      ]}
    >
      <StatusBar
        barStyle={barStyle}
        backgroundColor={backgroundColor}
        translucent={false}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: { flex: 1 },
});
