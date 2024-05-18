import * as React from "react";
import { Text } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useRef, useEffect } from "react";

import { RecongnizeCamera } from "./Screens/RecongnizeCamera";
import { TabBarNav } from "./Screens/TabBarNav";
import Test from "./Test/Test";

const Stack = createNativeStackNavigator();

export default function MainContainer() {
  const Home = useRef(null);
  return (
    <>
      <Stack.Navigator initialRouteName="Tab">
        <Stack.Screen
          name="RecongnizeCamera"
          component={RecongnizeCamera}
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
                Friends & Family Camera
              </Text>
            ),
          }}
        />
        <Stack.Screen
          name="Test"
          component={Test}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tab"
          component={TabBarNav}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
}
