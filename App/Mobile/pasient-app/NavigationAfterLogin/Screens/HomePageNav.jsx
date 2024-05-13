import { View, Text } from "react-native";
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomePage } from "./HomePage";
import TalkDhakira from "./TalkDhakira";

const Stack = createNativeStackNavigator();

const HomePageNav = () => {
  return (
    <Stack.Navigator initialRouteName="HomePage">
      <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TalkDhakira"
        component={TalkDhakira}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
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
              Talk To Dhakira
            </Text>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export { HomePageNav };
