import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { First_Page } from "./Screens/FirstPage";
import { SignUpPageInter } from "./Screens/SignUpPage";
import { LoginPageInterface } from "./Screens/LoginPage";



Stack = createNativeStackNavigator();

export default function App() { 
  return(
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={First_Page} options={{ headerShown: false }} />
        <Stack.Screen name="SignUpPage" component={SignUpPageInter} options={{ headerShown: false }} />
        <Stack.Screen name="LoginPage" component={LoginPageInterface} options={{ headerShown: false }} />
        </Stack.Navigator>
    </NavigationContainer>
  );
};