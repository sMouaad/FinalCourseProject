import * as React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Animated,
  KeyboardAvoidingViewBase,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { HomePage } from "./Screens/HomePage";
import { ToDoPage } from "./Screens/ToDoPage";
import MessagesPage from "./Screens/Chat/MessagesPage";
import { FontAwesome } from "@expo/vector-icons";
const catImageUrl =
  "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d";

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
        contentStyle: { backgroundColor: "transparent" },
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
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
          headerLeft: () => (
            <FontAwesome
              name="search"
              size={24}
              color="#C5C5C7"
              style={{ marginLeft: 15 }}
              onPress={() => {
                alert("search");
              }}
            />
          ),
          headerRight: () => (
            <Image
              className="rounded-full "
              source={{ uri: catImageUrl }}
              style={{
                width: 40,
                height: 40,
                marginRight: 15,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
