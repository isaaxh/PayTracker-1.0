import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Href, Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import React from "react";
import { useColorScheme } from "nativewind";
import { useAuth } from "@/hooks/useAuth";
import GlobalProvider from "@/services/providers/GlobalProvider";
import AuthProvider, {
  AuthContextProps,
} from "@/services/providers/AuthProvider";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

const StackLayout = () => {
  const {
    authState: { isAuthenticated, user },
  } = useAuth() as AuthContextProps;
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(protected)";

    if (user === null && inAuthGroup) {
      router.replace("/");
    } else if (user) {
      router.replace(
        "/(protected)/(tabs)/HomeTab" as Href<"/(protected)/(tabs)/HomeTab">,
      );
    }
  }, [user]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(protected)" />
      <Stack.Screen name="SignupScreen" />
    </Stack>
  );
};

function RootLayoutNav() {
  const { colorScheme } = useColorScheme();

  return (
    <GlobalProvider>
      <AuthProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <StackLayout />
        </ThemeProvider>
      </AuthProvider>
    </GlobalProvider>
  );
}
