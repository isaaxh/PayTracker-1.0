import { Stack } from "expo-router";

export default function TransactionsLayout() {
  return <TransactionsLayoutNav />;
}

function TransactionsLayoutNav() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="AllTransactionsScreen"
        options={{ headerTitle: "All Transactions" }}
      />
      <Stack.Screen name="[transaction]" />
      <Stack.Screen name="LoginScreen" />
    </Stack>
  );
}
