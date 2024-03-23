import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View, Image, ProgressBarAndroid, Pressable } from "react-native";
// Adjust import based on the actual library name

export default function Test() {
  return (
    <View className="box-border h-full text">
      <View style={styles.example}>
        <Text>Fixed Progress Value</Text>
        <ProgressBarAndroid
          styleAttr="Horizontal"
          indeterminate={false}
          progress={0.5}
        />
      </View>
      <View className=""></View>
      <Pressable>
        <Text className="text-base font-bold ">Hello World</Text>
      </Pressable>
    </View>
  );
}
