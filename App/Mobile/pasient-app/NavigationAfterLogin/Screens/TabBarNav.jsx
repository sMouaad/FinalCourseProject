import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { HomePage } from "./HomePage";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ToDoPage } from "./ToDoPage";
import MessagesPage from "./Chat/MessagesPage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomePageNav } from "./HomePageNav";

const TabBarNav = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Todo") {
            iconName = focused
              ? "checkmark-circle"
              : "checkmark-circle-outline";
          } else if (route.name == "Messages") {
            iconName = focused ? "chatbubbles" : "chatbubbles-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#00E5BD",
        tabBarInactiveTintColor: "white",
        tabBarStyle: { backgroundColor: "#00A588" },
        contentStyle: { backgroundColor: "transparent" },
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomePageNav}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Todo"
        component={ToDoPage}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesPage}
        options={{
          headerStyle: {
            backgroundColor: "#00A588",
          },
          headerTitleAlign: "center",
          headerTitle: () => (
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "white",
              }}
            >
              Messages
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export { TabBarNav };

const styles = StyleSheet.create({});
