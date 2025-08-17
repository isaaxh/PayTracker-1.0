import React from "react";
import { Platform } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import TabBarIcon from "@/components/TabBarIcon";
import { useColorScheme } from "nativewind";
import Colors from "@/constants/Colors";
import LinearGradView from "@/components/LinearGradView";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor:
          colorScheme.colorScheme === "dark"
            ? Colors.dark.tabIconDefault
            : Colors.light.tabIconDefault,
        tabBarActiveTintColor:
          colorScheme.colorScheme === "dark"
            ? Colors.dark.tabIconSelected
            : Colors.light.tabIconSelected,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 85,
          paddingTop: 10,
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
        name='HomeTab'
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name='grid' color={color} />,
          headerRight: () => (
            <Link href='/modal' asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name='info-circle'
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
        name='AddTransactionModalBase'
        options={{
          title: "Add Transaction",
          tabBarIcon: () => (
            <LinearGradView
              containerStyles={
                "rounded-full w-16 h-16 absolute -bottom-4 items-center justify-center"
              }
            >
              <TabBarIcon
                name='add'
                color={Colors.dark.text}
                size={38}
                variant='Linear'
              />
            </LinearGradView>
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
        name='StatsTab'
        options={{
          title: "Stats Tab",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='status up' color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
