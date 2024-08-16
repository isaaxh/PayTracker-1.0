import { Stack } from "expo-router";

export default function ProtectLayout() {
  return <ProtectedLayoutNav />;
}

function ProtectedLayoutNav() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(transactions)" />
      <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      <Stack.Screen name="SettingScreen" />
      <Stack.Screen name="ProfileScreen" />
    </Stack>
  );
}
