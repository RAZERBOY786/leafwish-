import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width, height } = Dimensions.get("window");

// --- Updated Theme Colors ---
const COLORS = {
  background: '#FBF8F5', // Soft, warm off-white
  primary: '#388E3C', // Main theme green
  primaryDark: '#1B5E20',
  primaryLight: '#C8E6C9',
  accent: '#66BB6A',
  white: '#FFFFFF',
};

export default function Splash() {
  const router = useRouter();

  const logoOpacity = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const isMounted = useRef(true);

  // Generate moving dots
  const [dots] = useState(
    Array.from({ length: 8 }).map(() => ({
      pos: new Animated.ValueXY({
        x: Math.random() * width,
        y: Math.random() * height,
      }),
      size: 40 + Math.random() * 80, // Made dots slightly larger
      opacity: 0.2 + Math.random() * 0.3,
      color: [COLORS.primaryLight, COLORS.accent, '#A5D6A7'][Math.floor(Math.random() * 3)],
    }))
  );

  // Animate dots randomly
  const moveRandom = useCallback((anim: Animated.ValueXY, size: number) => {
    const maxX = width - size;
    const maxY = height - size;
    Animated.timing(anim, {
      toValue: { x: Math.random() * maxX, y: Math.random() * maxY },
      duration: 4000 + Math.random() * 3000, // Slightly slower animation
      useNativeDriver: true,
    }).start(() => {
      if (isMounted.current) moveRandom(anim, size);
    });
  }, []);

  useEffect(() => {
    // Fade in logo
    Animated.timing(logoOpacity, { toValue: 1, duration: 800, useNativeDriver: true }).start();

    // Start dot animations
    dots.forEach(({ pos, size }) => moveRandom(pos, size));

    // Cleanup on unmount
    return () => {
      isMounted.current = false;
      dots.forEach(({ pos }) => pos.stopAnimation());
      logoOpacity.stopAnimation();
      buttonScale.stopAnimation();
    };
  }, [dots, logoOpacity, buttonScale, moveRandom]);

  // Button press animations
  const handlePressIn = () => Animated.spring(buttonScale, { toValue: 0.95, useNativeDriver: true }).start();
  const handlePressOut = () => Animated.spring(buttonScale, { toValue: 1, useNativeDriver: true }).start();

  // Navigate to home
  const handleLetsGo = () => router.push("./home");

  return (
    <View style={styles.container}>
      {/* Animated dots */}
      {dots.map(({ pos, size, opacity, color }, i) => (
        <Animated.View
          key={i}
          style={[
            styles.dot,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: color,
              opacity,
              transform: pos.getTranslateTransform(),
            },
          ]}
        />
      ))}

      {/* Logo */}
      <Animated.View style={[styles.logoContainer, { opacity: logoOpacity }]}>
        <Image
          source={require("../assets/images/logo1.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>LeafWish</Text>
      </Animated.View>

      {/* Button */}
      <Animated.View style={[styles.buttonContainer, { transform: [{ scale: buttonScale }] }]}>
        <TouchableOpacity
          style={styles.button}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={handleLetsGo}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Let's Go</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

// --- Updated Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    position: "absolute",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 60,
  },
  logo: {
    width: 420,
    height: 420,
  },
  appName: {
    fontSize: 42,
    fontWeight: "bold",
    color: COLORS.primaryDark,
    marginTop: 16,
    letterSpacing: 1,
  },
  buttonContainer: {
    alignItems: "center",
    position: 'absolute',
    bottom: 80,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    paddingHorizontal: 60,
    borderRadius: 30, // More rounded
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
});
