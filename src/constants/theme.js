// ═══════════════════════════════════════════════════════════════
// Sneha Graphics & Solutions — Official Color Theme
// Source: https://snehagraphicssolutions.com/
// ═══════════════════════════════════════════════════════════════

export const lightTheme = {
  // ── Brand Core ──────────────────────────────────────────────
  primary: '#00C2E0',        // Cyan — logo "SNEHA", CTA buttons, active tabs
  primaryLight: '#E0F8FC',   // Light tint of cyan for backgrounds
  primaryHover: '#00A8C6',   // Slightly deeper cyan for hover states
  secondary: '#142B48',      // Deep Navy — header, navbar, footer bg

  // ── UI Surfaces ─────────────────────────────────────────────
  background: '#FFFFFF',     // Pure white — main page background
  surface: '#FFFFFF',        // Card surface
  surfaceMuted: '#F2F4F7',   // Light grey — section backgrounds, input fills
  cardNav: '#2D4B75',        // Slate Navy — category cards, secondary cards
  border: '#D0D5DD',         // Subtle border

  // ── Text ────────────────────────────────────────────────────
  textPrimary: '#111827',    // Dark charcoal — headings
  textSecondary: '#555555',  // Muted grey — body text, descriptions
  textMuted: '#8899A6',      // Lighter muted — placeholders
  white: '#FFFFFF',
  black: '#111827',

  // ── Legacy aliases (backward compat) ────────────────────────
  gray: '#F2F4F7',
  darkGray: '#555555',
  lightGray: '#F2F4F7',

  // ── Status ──────────────────────────────────────────────────
  error: '#EF4444',
  success: '#10B981',
  warning: '#F59E0B',
};

export const darkTheme = {
  // ── Brand Core ──────────────────────────────────────────────
  primary: '#00C2E0',
  primaryLight: '#0A2A3A',
  primaryHover: '#00A8C6',
  secondary: '#E0F8FC',

  // ── UI Surfaces ─────────────────────────────────────────────
  background: '#0D1E30',     // Very dark navy — dark mode bg
  surface: '#142B48',        // Navy — cards on dark bg
  surfaceMuted: '#1A3352',   // Slightly lighter navy
  cardNav: '#2D4B75',
  border: '#2D4B75',

  // ── Text ────────────────────────────────────────────────────
  textPrimary: '#F0F9FB',
  textSecondary: '#A0B8C8',
  textMuted: '#607080',
  white: '#142B48',
  black: '#F0F9FB',

  // ── Legacy aliases ───────────────────────────────────────────
  gray: '#1A3352',
  darkGray: '#A0B8C8',
  lightGray: '#2D4B75',

  // ── Status ──────────────────────────────────────────────────
  error: '#EF4444',
  success: '#10B981',
  warning: '#F59E0B',
};

export const COLORS = lightTheme;

export const SIZES = {
  base: 8,
  small: 12,
  font: 14,
  medium: 16,
  large: 18,
  extraLarge: 24,
  radius: 6,
  radiusLarge: 12,
};

export const SHADOWS = {
  light: {
    shadowColor: '#142B48',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  medium: {
    shadowColor: '#142B48',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 5,
  },
};
