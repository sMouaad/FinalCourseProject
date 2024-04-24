import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity, Image, Animated } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainContainer from "./NavigationAfterLogin/mainContainer.js";
import Login from "./Comp/login-page/Login.jsx";
import Test from "./Comp/Test/Test.jsx";
import WaitingForTheFaceRecognition from "./Comp/WaitingForTheFaceRecognition/WaitingForTheFaceRecognition";
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName="mainContainer"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "transparent" },
        }}
      >
        <Stack.Screen name="Home" component={Login} />
        <Stack.Screen name="Test" component={Test} />
        <Stack.Screen
          name="WaitingPage"
          component={WaitingForTheFaceRecognition}
        />
        <Stack.Screen name="mainContainer" component={MainContainer} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
};

export default App;
