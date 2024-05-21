import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import { storeData, getData } from "./localStorage";
import { ActivityIndicator, View } from "react-native";
import { First_Page } from "./ScreensBeforeLogIn/FirstPage";
import { SignUpPageInter } from "./ScreensBeforeLogIn/SignUpPage";
import { LoginPageInterface } from "./ScreensBeforeLogIn/LoginPage";
import MainContainer from "./NavigationAfterLogin/mainContainer.js";

Stack = createNativeStackNavigator();

export default function App() {
  const [initialRouteName, setInitialRouteName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cookie = await getData("cookie");

        if (typeof cookie === "string" && cookie !== "") {
          setInitialRouteName("Main");
        } else {
          setInitialRouteName("FirstPage");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setInitialRouteName("FirstPage");
      }
    };
    fetchData();
  }, []);

  if (!initialRouteName) {
    return (
      <View className="flex-1 justify-center">
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName}>
        <Stack.Screen
          name="FirstPage"
          component={First_Page}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUpPage"
          component={SignUpPageInter}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginPage"
          component={LoginPageInterface}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={MainContainer}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
