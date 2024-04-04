import { View, Text, Pressable } from "react-native";
import React from "react";

export default function TabButton({ active, onPress, children }) {
  return (
    <Pressable
      style={{
        flex: 1,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: active ? "#00E5BD" : "#F2F2F2",
        borderRadius: 30,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          color: active ? "white" : "black",
          fontWeight: active ? "bold" : "400",
        }}
      >
        {children}
      </Text>
    </Pressable>
  );
}
