// PressableButton.jsx
import React from "react";
import { Pressable, Text, Image, StyleSheet } from "react-native";
import { View } from "react-native-animatable";

const PressableButton = ({
  onPress,
  imageSource,
  buttonText,
  backgroundColor,
  textColor,
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.btn,
        backgroundColor && { backgroundColor },
        pressed && { opacity: 0.8, elevation: 2 },
      ]}
      onPress={onPress}
    >
      <Image style={styles.image} source={imageSource} />
      <View className="flex flex-1 items-center ">
        <Text style={[styles.text, { color: textColor }]}>{buttonText}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    width: "80%",
    height: "8.5%",
    paddingHorizontal: 20,
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#00E5BD",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 6,
  },
  image: {
    width: 50,
    height: 50,
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default PressableButton;
