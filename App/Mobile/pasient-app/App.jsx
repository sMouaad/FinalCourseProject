import React from "react";

import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Test from "./Comp/Test/Test.jsx";
import Key from "./Comp/key-page/Key.jsx";
import WaitingForTheFaceRecognition from "./Comp/WaitingForTheFaceRecognition/WaitingForTheFaceRecognition.jsx";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "transparent" },
        }}
      >
        <Stack.Screen name="Home" component={Key} />
        <Stack.Screen name="Test" component={Test} />
        <Stack.Screen
          name="WaitingPage"
          component={WaitingForTheFaceRecognition}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>

  );
};
export default App;
2;
