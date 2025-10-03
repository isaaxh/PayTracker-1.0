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
import { i18n } from "@/services/i18n/i18n";
import { Provider, useDispatch } from "react-redux";
import "./globals.css";
import { AppDispatch, persistor, store } from "@/services/state/store";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "firebaseConfig";
import {
  clearAuthUser,
  createSerializableUser,
  setAuthUser,
} from "@/services/state/auth/authSlice";
import { PersistGate } from "redux-persist/integration/react";
import { useAppSettings } from "@/hooks/useAppSettings";
import { useAuth } from "@/hooks/useAuth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

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
  const { user } = useAuth();
  const { appSettings } = useAppSettings();
  const { setColorScheme } = useColorScheme();

  // useDirection(appSettings.language);

  // app settings
  i18n.enableFallback = true;
  useEffect(() => {
    i18n.locale = appSettings.language.value;
    setColorScheme(appSettings.theme.value);
  }, [appSettings.language, appSettings.theme]);

  // auth re-routing
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        dispatch(setAuthUser(createSerializableUser(user)));
      } else {
        dispatch(clearAuthUser());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  const segments = useSegments();
  const router = useRouter();

  // handle navigation changes based on auth state
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
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <StackLayout />
          </ThemeProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
