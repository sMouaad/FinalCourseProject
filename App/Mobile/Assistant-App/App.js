import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import WaitingForTheFaceRecognition from "./Comp/WaitingForTheFaceRecognition/WaitingForTheFaceRecognition";
import Test from "./Comp/WaitingForTheFaceRecognition/WaitingForTheFaceRecognition";

export default function App() {
  return (
    <View className="flex justify-center h-screen">
      <Test />
      {/* <WaitingForTheFaceRecognition /> */}

      <StatusBar style="auto" />
    </View>
  );
}
