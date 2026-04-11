import "@/global.css";
import { useAuth } from "@clerk/expo";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  // Wait for auth to load before rendering
  if (!isLoaded) {
    return null;
  }

  // If user is signed in, redirect to home
  if (isSignedIn) {
    return <Redirect href="/(tabs)" />;
  }

  // Show auth screens
  return <Stack screenOptions={{ headerShown: false }} />;
}
