import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Button,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import talkDhakira from "../../assets/images/1.png";
import playDhakira from "../../assets/images/2.png";

function HomePage() {
  const handleClick = () => {
    ("Pressed!");
  };
  return (
    <View
      style={{ gap: 25 }}
      className="flex flex-1 justify-center items-center "
    >
      <Pressable
        style={({ pressed }) => [
          styles.btn,
          { backgroundColor: "#0077B6" },
          pressed && { backgroundColor: "#00D5AD" },
        ]}
        onPress={handleClick}
        // className="bg-Primary h-[200px] w-[200px] rounded-[1500px] justify-center items-center"
      >
        <Image className="w-[50] h-[50] " source={talkDhakira}></Image>
        <Text className={textOfPresable}>Talk to Dhakira</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.btn,
          pressed && { backgroundColor: "#00D5AD" },
        ]}
        onPress={handleClick}
        // className="bg-Primary h-[200px] w-[200px] rounded-[1500px] justify-center items-center"
      >
        <Image className="w-[50] h-[50] " source={playDhakira}></Image>
        <Text className={textOfPresable + "text-black"}>Play with Dhakira</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.btn,
          { backgroundColor: "#0077B6" },
          pressed && { backgroundColor: "#00D5AD" },
        ]}
        onPress={handleClick}
        // className="bg-Primary h-[200px] w-[200px] rounded-[1500px] justify-center items-center"
      >
        <Text className={textOfPresable}>Friends & Family Camera</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.btn,
          pressed && { backgroundColor: "#00D5AD" },
        ]}
        onPress={handleClick}
        // className="bg-Primary h-[200px] w-[200px] rounded-[1500px] justify-center items-center"
      >
        <Text className={textOfPresable + "text-black"}>Tests</Text>
      </Pressable>
    </View>
  );
}

export { HomePage };

const styles = StyleSheet.create({
  btn: {
    display: "flex",
    flexDirection: "row",
    width: "80%",
    height: "8.5%",
    paddingHorizontal: 20,
    gap: 20,
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#00E5BD",
  },
});
const textOfPresable = "font-bold text-white text-[20px] ";
