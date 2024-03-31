import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, ScrollView, KeyboardAvoidingView } from "react-native";
import Test from "./Comp/Test.jsx";
import { questions } from "./Comp/Question.js";

export default function App() {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <View className="flex-1 flex justify-center box-border h-screen px-[10px]">
        <Test questions={questions} />
        {/* <WaitingForTheFaceRecognition /> */}
        <StatusBar style="auto" />
      </View>
    </KeyboardAvoidingView>
  );
}
