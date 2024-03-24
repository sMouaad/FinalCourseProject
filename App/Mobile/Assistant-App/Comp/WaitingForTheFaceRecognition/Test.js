import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Text, View, Image, StyleSheet, Pressable } from "react-native";

// Adjust import based on the actual library name
function Test() {
  const [wi, setWi] = useState(10);
  function progres() {
    setWi(wi + 10);
    if (wi >= 100) {
      setWi(10);
    }
  }
  return (
    <View className="box-border h-full ">
      <View className=" mt-[60] mb-4  bg-Secondry relative rounded-[22px] flex-row">
        <View
          style={{ width: wi + "%" }}
          className="duration-500 min-w-[10%] max-w-[100%]  bg-Primary relative rounded-[22px] flex flex-row items-center justify-center"
        >
          {/* {progres(20)} */}
          <View className="mx-[10px] max-w-[80%] flex-1  mt-[5] mb-[11] py-[3px]  bg-DeepthProgresBar relative rounded-[22px]" />
        </View>
      </View>
      <View className=""></View>
      <Pressable
        onPress={progres}
        className="bg-Primary items-center  px-10 py-4 m-10 rounded-2xl"
      >
        <Text className="text-base text-white font-bold ">Click me!</Text>
      </Pressable>
    </View>
  );
}

export default Test;
