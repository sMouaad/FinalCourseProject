import React, { useState, useEffect } from "react";
import { View, Text, TextInput } from "react-native";
import Button from "../Button";
import { Image } from "expo-image";
import Animated, {
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import welcomToDhakira from "../../assets/images/welcomToDhakira.png";
const DURATION = 1000;
const DELAY = 500;
const text = ["Welcome ", "to ", "Dhakira..."];
const Key = () => {
  const [isShown, setShown] = useState(false);

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
        <View className="flex flex-row">
          <Animated.Text
            className="font-bold text-[32px] text-[#00A588] mb-[10px]"
            style={{ opacity: opacity1 }}
          >
            {text[0]}
          </Animated.Text>
          <Animated.Text
            className="font-bold text-[32px] text-[#00A588] mb-[10px]"
            style={{ opacity: opacity2 }}
          >
            {text[1]}
          </Animated.Text>

          <Animated.Text
            className="font-bold text-[32px] text-[#00A588] mb-[10px]"
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
        ></TextInput>
        <Button btnClassName="items-center bg-Primary p-[12] m-[10] rounded-[20px]">
          <View className="bg-[#00A588] w-full items-center py-1 rounded-[20px]">
            <Text className="text-white font-bold text-3xl ">Start</Text>
          </View>
        </Button>
      </View>
    </View>
  );
};

export default Key;
