import React, { useEffect, useMemo, useRef, useState } from "react";

import {
    Alert,
    Animated,

    Dimensions,
    Image,
    StyleSheet,
    Text,

    TouchableOpacity,
    View,
} from "react-native";

import { useRouter } from "expo-router";



const { width, height } = Dimensions.get("window");



export default function Login() {

const [loading, setLoading] = useState(false);

const router = useRouter();



// Animated green dots

const dot1x = useRef(new Animated.Value(Math.random() * width)).current;
const dot1y = useRef(new Animated.Value(Math.random() * height)).current;
const dot2x = useRef(new Animated.Value(Math.random() * width)).current;
const dot2y = useRef(new Animated.Value(Math.random() * height)).current;
const dot3x = useRef(new Animated.Value(Math.random() * width)).current;
const dot3y = useRef(new Animated.Value(Math.random() * height)).current;
const dot4x = useRef(new Animated.Value(Math.random() * width)).current;
const dot4y = useRef(new Animated.Value(Math.random() * height)).current;
const dot5x = useRef(new Animated.Value(Math.random() * width)).current;
const dot5y = useRef(new Animated.Value(Math.random() * height)).current;
const dot6x = useRef(new Animated.Value(Math.random() * width)).current;
const dot6y = useRef(new Animated.Value(Math.random() * height)).current;

const dots = useMemo(() => [
  { x: dot1x, y: dot1y },
  { x: dot2x, y: dot2y },
  { x: dot3x, y: dot3y },
  { x: dot4x, y: dot4y },
  { x: dot5x, y: dot5y },
  { x: dot6x, y: dot6y },
], [dot1x, dot1y, dot2x, dot2y, dot3x, dot3y, dot4x, dot4y, dot5x, dot5y, dot6x, dot6y]);



useEffect(() => {

// Animate background dots

dots.forEach((dot) => {

const animate = () => {

Animated.parallel([

Animated.timing(dot.x, {

toValue: Math.random() * (width - 40),

duration: 3000 + Math.random() * 2000,

useNativeDriver: true,

}),

Animated.timing(dot.y, {

toValue: Math.random() * (height - 40),

duration: 3000 + Math.random() * 2000,

useNativeDriver: true,

}),

]).start(() => animate());

};

animate();

});



// Cleanup animations on unmount

return () => {

dots.forEach((dot) => {

dot.x.stopAnimation();

dot.y.stopAnimation();

});

};

}, [dots]);



const handleGoogleLogin = () => {

setLoading(true);

// Placeholder for Google login

setTimeout(() => {

Alert.alert("Success", "Google Sign-In triggered! Navigating to home.");

router.push("./home");

setLoading(false);

}, 1000); // Simulate async operation

};



const handleFacebookLogin = () => {

setLoading(true);

// Placeholder for Facebook login

setTimeout(() => {

Alert.alert("Success", "Facebook Sign-In triggered! Navigating to home.");

router.push("./home");

setLoading(false);

}, 1000); // Simulate async operation

};



return (

<View style={styles.container}>

{/* Background animated dots */}

{dots.map((dot, i) => (

<Animated.View

key={i}

style={[

styles.dot,

{

transform: [{ translateX: dot.x }, { translateY: dot.y }],

},

]}

/>

))}



<View style={styles.logoContainer}>

<Image

source={require("../assets/images/icon.png")}

style={styles.logo}

resizeMode="contain"

/>

</View>



<View style={styles.formContainer}>

<Text style={styles.title}>Welcome Back</Text>

<Text style={styles.subtitle}>Sign in to your account</Text>



<View style={styles.dividerRow}>

<View style={styles.divider} />

<Text style={styles.dividerText}>Continue with</Text>

<View style={styles.divider} />

</View>



<TouchableOpacity

style={[styles.socialButton, loading && styles.buttonDisabled]}

onPress={handleGoogleLogin}

disabled={loading}

>

<Image

source={{ uri: "https://img.icons8.com/color/48/000000/google-logo.png" }}

style={styles.icon}

/>

<Text style={styles.socialButtonText}>

{loading ? "Processing..." : "Sign in with Google"}

</Text>

</TouchableOpacity>



<TouchableOpacity

style={[styles.socialButton, { backgroundColor: "#1877F2" }]}

onPress={handleFacebookLogin}

disabled={loading}

>

<Image

source={{ uri: "https://img.icons8.com/color/48/000000/facebook-new.png" }}

style={styles.icon}

/>

<Text style={[styles.socialButtonText, { color: "#fff" }]}>

{loading ? "Processing..." : "Sign in with Facebook"}

</Text>

</TouchableOpacity>

</View>

</View>

);

}



const styles = StyleSheet.create({

container: {

flex: 1,

backgroundColor: "#F3FAF3",

alignItems: "center",

justifyContent: "flex-start",

paddingTop: 48,

},

logoContainer: {

alignItems: "center",

marginBottom: 24,

zIndex: 2,

},

logo: {

width: 200,

height: 200,

},

appName: {

fontSize: 24,

fontWeight: "600",

color: "#1A3C34",

marginTop: 20,

fontFamily: "'Inter', 'Helvetica', 'Arial', sans-serif",

lineHeight: 1.2,

letterSpacing: -0.5,

},

formContainer: {

width: "100%",

backgroundColor: "#FFFFFF",

borderTopLeftRadius: 32,

borderTopRightRadius: 32,

padding: 24,

shadowColor: "#000",

shadowOffset: { width: 0, height: -2 },

shadowOpacity: 0.1,

shadowRadius: 8,

elevation: 5,

},

title: {

fontSize: 28,

fontWeight: "700",

color: "#1A3C34",

textAlign: "center",

marginBottom: 8,

},

subtitle: {

fontSize: 16,

color: "#6B7280",

textAlign: "center",

marginBottom: 24,

},

dividerRow: {

flexDirection: "row",

alignItems: "center",

marginVertical: 20,

},

divider: {

flex: 1,

height: 1,

backgroundColor: "#D1D5DB",

},

dividerText: {

marginHorizontal: 12,

color: "#6B7280",

fontSize: 14,

},

socialButton: {

flexDirection: "row",

alignItems: "center",

justifyContent: "center",

borderWidth: 1,

borderColor: "#D1D5DB",

borderRadius: 12,

paddingVertical: 14,

marginBottom: 12,

},

socialButtonText: {

fontSize: 16,

color: "#1A3C34",

fontWeight: "500",

marginLeft: 12,

},

icon: {

width: 24,

height: 24,

},

buttonDisabled: {

opacity: 0.6,

},

dot: {

position: "absolute",

width: 24,

height: 24,

backgroundColor: "#4CAF50",

borderRadius: 12,

opacity: 0.3,

},

});