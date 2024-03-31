import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { Image } from "expo-image";
import Animated, {
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import welcomToDhakira from "../../assets/images/welcomToDhakira.png";
const DURATION = 1000;
const DELAY = 500;
let bol = false;
const text = ["Welcome ", "to ", "Dhakira..."];
const Key = () => {
  const [isShown, setShown] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const opacity1 = useSharedValue(0);
  const opacity2 = useSharedValue(0);
  const opacity3 = useSharedValue(0);

  // prettier-ignore
  const show = () => {
    if (isShown) {
    opacity3.value = withDelay(0 * DELAY, withTiming(0, { duration: DURATION }));
    opacity2.value = withDelay(1 * DELAY, withTiming(0, { duration: DURATION }));
    opacity1.value = withDelay(2 * DELAY, withTiming(0, { duration: DURATION }));

  } else {
    opacity1.value = withDelay(0 * DELAY, withTiming(1, { duration: DURATION }));
    opacity2.value = withDelay(1 * DELAY, withTiming(1, { duration: DURATION }));
    opacity3.value = withDelay(2 * DELAY, withTiming(1, { duration: DURATION }));

  }
  };

  show();

  return (
    <View className="h-screen py-[20] gap-20">
      <View className="items-center justify-start flex-col ">
        <View className="flex flex-row mb-2">
          <Animated.Text
            className="font-bold text-[30px] text-[#00A588] mb-[10px]"
            style={{ opacity: opacity1 }}
          >
            {text[0]}
          </Animated.Text>
          <Animated.Text
            className="font-bold text-[30px] text-[#00A588] mb-[10px]"
            style={{ opacity: opacity2 }}
          >
            {text[1]}
          </Animated.Text>

          <Animated.Text
            className="font-bold text-[30px] text-[#00A588] mb-[10px]"
            style={{ opacity: opacity3 }}
          >
            {text[2]}
          </Animated.Text>
        </View>
        <Image
          source={welcomToDhakira}
          className="rounded-2xl w-[171] h-[173] "
          transition={130}
        />
      </View>
      <View>
        <TextInput
          placeholder="Enter the keyword"
          className="border-2 items-center border-Primary px-[20] py-[15] m-[10] rounded-[20px]"
          value={inputValue}
          onChangeText={setInputValue}
        ></TextInput>
        <Pressable
          onPress={() => {
            setInputValue("");
          }}
          btnClassName="items-center bg-Primary p-[12] m-[10] rounded-[20px]"
          style={({ pressed }) => [
            {
              alignItems: "center",
              backgroundColor: "#00E5BD",
              padding: 12,
              margin: 10,
              borderRadius: 20,
              shadowColor: "black",
              shadowOpacity: 0.3,
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 4,
              elevation: 5,
            },
            pressed && { elevation: 1, opacity: 0.9 },
          ]}
        >
          <View
            style={[
              {
                backgroundColor: "#00A588",
                width: "100%",
                alignItems: "center",
                paddingVertical: 1,
                borderRadius: 20,
              },
            ]}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
              Start
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default Key;
