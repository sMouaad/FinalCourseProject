import React, { useState, useEffect } from "react";
import { Text, TextInput, View, Image, Pressable } from "react-native";
import Progress_Bar from "./Progres_Bar";

function Test() {
  const [width, setWidth] = useState(10);
  const step = 10;
  function increaseWidth() {
    setWidth(width + step);
  }
  return (
    <View className="box-border flex h-full">
      <Progress_Bar width={width} />
      <View className="m-5 flex h-[60%] items-center ">
        <Image
          className="h-[82.2%] w-full object-contain rounded-2xl "
          source={require("../../images/image copy.png")}
        />
      </View>
      <TextInput className="w-full h-[50px] border rounded-2xl" />
      <Pressable
        onPress={increaseWidth}
        className="bg-Primary items-center px-10 py-4 m-10 rounded-2xl"
      >
        <Text className="text-base text-white font-bold ">Click me!</Text>
      </Pressable>
    </View>
  );
}

export default Test;
