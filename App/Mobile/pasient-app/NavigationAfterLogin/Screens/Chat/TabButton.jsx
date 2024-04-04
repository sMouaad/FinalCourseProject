import { Pressable, Text } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

export default function TabButton({ active, onPress, children }) {
  // Define animated values for opacity and scale
  const opacity = useSharedValue(active ? 1 : 0.5);
  const scale = useSharedValue(active ? 1 : 0.9);

  // Define animated styles for the button
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withSpring(opacity.value),
      transform: [{ scale: withSpring(scale.value) }],
    };
  });

  // Update animated values when active state changes
  useEffect(() => {
    opacity.value = active ? 1 : 0.5;
    scale.value = active ? 1 : 0.9;
  }, [active]);

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
      <Animated.View style={animatedStyle}>
        <Text
          style={{
            color: active ? "white" : "black",
            fontWeight: active ? "bold" : "400",
          }}
        >
          {children}
        </Text>
      </Animated.View>
    </Pressable>
  );
}
