import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import React from "react";
import { useColorScheme } from "nativewind";
import { useAuth } from "hooks/useAuth";
import GlobalProvider, {
  GlobalContextProps,
} from "@/services/providers/GlobalProvider";
import AuthProvider, {
  AuthContextProps,
} from "@/services/providers/AuthProvider";
import { i18n } from "@/services/i18n/i18n";
import { useGlobal } from "hooks/useGlobal";
import { useAsync } from "hooks/useAsync";
import "./globals.css";

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
    // SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    // RobotoBlack: require("../assets/fonts/Roboto-Black.ttf"),
    // RobotoBlackItalic: require("../assets/fonts/Roboto-BlackItalic.ttf"),
    // RobotoBoldItalic: require("../assets/fonts/Roboto-BoldItalic.ttf"),
    // RobotoItalic: require("../assets/fonts/Roboto-Italic.ttf"),
    // RobotoLight: require("../assets/fonts/Roboto-Light.ttf"),
    // RobotoLightItalic: require("../assets/fonts/Roboto-LightItalic.ttf"),
    // RobotoMediumItalic: require("../assets/fonts/Roboto-MediumItalic.ttf"),
    // RobotoThinItalic: require("../assets/fonts/Roboto-ThinItalic.ttf"),
    "QuickSand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "QuickSand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
    "QuickSand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "QuickSand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
    "QuickSand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
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
    authState: { user },
  } = useAuth() as AuthContextProps;
  const segments = useSegments();
  const router = useRouter();
  const { appSettings, setAppSettings } = useGlobal() as GlobalContextProps;
  const { loadSettings } = useAsync();
  const { setColorScheme } = useColorScheme();

  i18n.enableFallback = true;

  useEffect(() => {
    i18n.locale = appSettings.language.value;
    setColorScheme(appSettings.theme.value);
  }, [appSettings.language, appSettings.theme]);

  useEffect(() => {
    const loadAppSettings = async () => {
      const savedAppSettings = await loadSettings();
      if (savedAppSettings) {
        setAppSettings(savedAppSettings);
      }
    };

    loadAppSettings();
  }, []);

  useEffect(() => {
    const inAuthGroup = segments[0] === "(protected)";

    if (user === null && inAuthGroup) {
      router.replace("/");
    } else if (user) {
      router.replace("/(protected)/(tabs)/HomeTab");
    }
  }, [user]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='(protected)' />
      <Stack.Screen name='SignupScreen' />
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
