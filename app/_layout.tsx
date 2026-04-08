import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
export default function Layout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="home" />
        <Stack.Screen name="cam" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="result" />
        <Stack.Screen name="product-detail" />
      </Stack>
    </>
  );
}
