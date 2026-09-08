import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet, Easing } from "react-native";

/**
 * PrinterLogo – Sneha Graphics website theme: Navy #142B48 + Cyan #00C2E0
 * Printer head sweeps top-to-bottom, printing each row of tiles (SNEHA G logo)
 */

const COLS = 4;
const ROWS = 3;
const TILE = 44;
const GAP = 3;

// Logo mosaic — brand colors from snehagraphicssolutions.com
const TILES = [
  { letter: "S", bg: "#142B48", fg: "#00C2E0" },
  { letter: "N", bg: "#00C2E0", fg: "#FFFFFF" },
  { letter: "E", bg: "#142B48", fg: "#00C2E0" },
  { letter: "H", bg: "#00C2E0", fg: "#FFFFFF" },

  { letter: "A", bg: "#2D4B75", fg: "#00C2E0" },
  { letter: "",  bg: "#142B48", fg: "#00C2E0" },
  { letter: "G", bg: "#00C2E0", fg: "#142B48" },
  { letter: "",  bg: "#2D4B75", fg: "#00C2E0" },

  { letter: "",  bg: "#142B48", fg: "#00C2E0" },
  { letter: "S", bg: "#00C2E0", fg: "#FFFFFF" },
  { letter: "",  bg: "#2D4B75", fg: "#00C2E0" },
  { letter: "",  bg: "#142B48", fg: "#00C2E0" },
];

const DECORATIONS = ["\u25C9", "\u2726", "\u2022", "\u2219"];

export default function PrinterLogo({ style }) {
  const TOTAL = COLS * ROWS;

  const tiles = useRef(
    Array.from({ length: TOTAL }, () => ({
      opacity: new Animated.Value(0),
      scaleY: new Animated.Value(0.1),
      inkScale: new Animated.Value(1.4),
    }))
  ).current;

  const headY = useRef(new Animated.Value(-8)).current;
  const headOpacity = useRef(new Animated.Value(1)).current;

  const TOTAL_H = ROWS * (TILE + GAP) - GAP;

  useEffect(() => {
    const headAnim = Animated.timing(headY, {
      toValue: TOTAL_H + 8,
      duration: ROWS * 220 + 100,
      easing: Easing.linear,
      useNativeDriver: true,
    });

    const tileAnims = tiles.map((t, i) => {
      const row = Math.floor(i / COLS);
      const col = i % COLS;
      const rowDelay = row * 220;
      const colDelay = col * 40;

      return Animated.sequence([
        Animated.delay(rowDelay + colDelay),
        Animated.parallel([
          Animated.timing(t.opacity, {
            toValue: 1,
            duration: 80,
            useNativeDriver: true,
          }),
          Animated.spring(t.scaleY, {
            toValue: 1,
            friction: 5,
            tension: 80,
            useNativeDriver: true,
          }),
          Animated.timing(t.inkScale, {
            toValue: 1,
            duration: 300,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]),
      ]);
    });

    const headFade = Animated.sequence([
      Animated.delay(ROWS * 220 + 150),
      Animated.timing(headOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]);

    Animated.parallel([headAnim, ...tileAnims, headFade]).start();
  }, []);

  const TOTAL_W = COLS * (TILE + GAP) - GAP;
  let decIdx = 0;

  return (
    <View style={[styles.wrapper, { width: TOTAL_W, height: TOTAL_H }, style]}>
      {/* Printer head bar — cyan glow matching website */}
      <Animated.View
        style={[
          styles.printerHead,
          {
            width: TOTAL_W + 16,
            left: -8,
            opacity: headOpacity,
            transform: [{ translateY: headY }],
          },
        ]}
      >
        <View style={styles.headNozzleRow}>
          {Array.from({ length: 8 }).map((_, ni) => (
            <View key={ni} style={styles.nozzle} />
          ))}
        </View>
      </Animated.View>

      {/* Tiles */}
      {tiles.map((t, i) => {
        const row = Math.floor(i / COLS);
        const col = i % COLS;
        const info = TILES[i];
        const isBlank = info.letter === "";
        const dec = isBlank ? DECORATIONS[decIdx++ % DECORATIONS.length] : null;

        return (
          <Animated.View
            key={i}
            style={[
              styles.tile,
              {
                backgroundColor: info.bg,
                left: col * (TILE + GAP),
                top: row * (TILE + GAP),
                width: TILE,
                height: TILE,
                opacity: t.opacity,
                transform: [{ scaleY: t.scaleY }, { scale: t.inkScale }],
              },
            ]}
          >
            <Text style={[styles.tileText, { color: info.fg }]}>
              {isBlank ? dec : info.letter}
            </Text>
          </Animated.View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
  },
  printerHead: {
    position: "absolute",
    height: 10,
    backgroundColor: "#142B48",
    borderRadius: 5,
    zIndex: 10,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 2,
    shadowColor: "#00C2E0",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    elevation: 10,
  },
  headNozzleRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 2,
  },
  nozzle: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#00C2E0",
    opacity: 0.9,
  },
  tile: {
    position: "absolute",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#142B48",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  tileText: {
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
});
