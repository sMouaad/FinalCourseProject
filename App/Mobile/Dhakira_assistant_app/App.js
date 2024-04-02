import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { First_Page } from "./ScreensBeforeLogIn/FirstPage";
import { SignUpPageInter } from "./ScreensBeforeLogIn/SignUpPage";
import { LoginPageInterface } from "./ScreensBeforeLogIn/LoginPage";
import MainContainer from  "./NavigationAfterLogin/mainContainer.js";


Stack = createNativeStackNavigator();

export default function App() { 
  return(
    <NavigationContainer>
        <Stack.Navigator initialRouteName="FirstPage">
        <Stack.Screen name="FirstPage" component={First_Page} options={{ headerShown: false }} />
        <Stack.Screen name="SignUpPage" component={SignUpPageInter} options={{ headerShown: false }} />
        <Stack.Screen name="LoginPage" component={LoginPageInterface} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainContainer} options={{ headerShown: false }} />
        </Stack.Navigator>
    </NavigationContainer>
  );
};