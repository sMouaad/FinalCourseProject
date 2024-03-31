import React from "react";
import {
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Test from "./Comp/Test/Test.jsx";
import Key from "./Comp/key-page/Key.jsx";
import WaitingForTheFaceRecognition from "./Comp/WaitingForTheFaceRecognition/WaitingForTheFaceRecognition.jsx";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <View className="flex-1 flex justify-center box-border h-screen px-[10px]">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                options={{ unmountOnBlur: true }}
              />
            </Stack.Navigator>
          </TouchableWithoutFeedback>
        </View>
      </KeyboardAvoidingView>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
