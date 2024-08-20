import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, View } from "react-native";
import TabBarIcon from "@/components/TabBarIcon";
import { useColorScheme } from "nativewind";
import Colors from "@/constants/Colors";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor:
          colorScheme.colorScheme === "dark"
            ? Colors.dark.tint
            : Colors.light.tint,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 55,
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor:
            colorScheme.colorScheme === "dark"
              ? Colors.dark.backgroundSecondary
              : Colors.light.backgroundSecondary,
          borderTopStartRadius: 25,
          borderTopEndRadius: 25,
          borderColor:
            colorScheme.colorScheme === "dark"
              ? Colors.dark.backgroundSecondary
              : Colors.light.backgroundSecondary,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        },
      }}
    >
      <Tabs.Screen
        name="HomeTab"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="grid" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={
                      colorScheme.colorScheme === "dark"
                        ? Colors.dark.text
                        : Colors.light.text
                    }
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="AddTransactionModalBase"
        options={{
          title: "Stats Tab",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="status up" color={color} />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("AddTransactionModal");
          },
        })}
      />
      <Tabs.Screen
        name="StatsTab"
        options={{
          title: "Stats Tab",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="status up" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
