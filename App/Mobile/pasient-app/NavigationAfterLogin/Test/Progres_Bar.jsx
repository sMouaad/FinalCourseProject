import { View, StyleSheet, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import Animated from "react-native-reanimated";
import { useSharedValue, withTiming } from "react-native-reanimated";
// to use this progres bar you should use this code in the parent component

// const [width, setWidth] = useState(10); *you can change it as you want but at least must be equal 10*
// const step = 10; *you can change it as you want*
// function increaseWidth() {
//   setWidth(width + step);}

// see the Test.js file
function Progress_Bar({ width, color, deepColor }) {
  const animeWidth = useSharedValue(width + "%");
  animeWidth.value = withTiming(width + "%");

  return (
    <>
      <Animated.View className=" mt-[60] mb-4  bg-Secondry relative rounded-[22px] flex-row">
        <Animated.View
          style={{
            width: animeWidth,
            backgroundColor: color,
          }}
          className="duration-500  min-w-[23%] max-w-[100%]  bg-Primary relative rounded-[22px] flex flex-row items-center justify-center"
        >
          <Animated.View
            style={{ backgroundColor: deepColor }}
            className="mx-[10px] max-w-[80%] flex-1  mt-[5] mb-[11] py-[3px] bg-DeepthProgresBar relative rounded-[22px]"
          />
        </Animated.View>
      </Animated.View>
    </>
  );
}
export default Progress_Bar;
