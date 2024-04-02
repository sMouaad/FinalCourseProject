import * as React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { HomePage } from "./Screens/HomePage";
import { ToDoPage } from "./Screens/ToDoPage";
import { MessagesPage } from "./Screens/MessagesPage";

const Tab = createBottomTabNavigator();

export default function MainContainer() {
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
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomePage}
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
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
