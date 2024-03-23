import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import WaitingForTheFaceRecognition from "./Comp/WaitingForTheFaceRecognition/WaitingForTheFaceRecognition";
import Test from "./Comp/WaitingForTheFaceRecognition/Test.js";

export default function App() {
  return (
    <View className="flex justify-center box-border h-screen px-[20px]">
      {/* <Test /> */}
      <WaitingForTheFaceRecognition />
      <StatusBar style="auto" />
    </View>
  );
}
