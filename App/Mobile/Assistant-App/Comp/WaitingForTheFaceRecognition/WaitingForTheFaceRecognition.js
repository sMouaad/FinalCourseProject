import React from "react";
import { Text, View, Image } from "react-native";
// Adjust import based on the actual library name

export default function WaitingForTheFaceRecognition() {
  return (
    <View className="justify-center flex flex-col items-center">
      <View className="font-bold border-Primary border-[4px] p-4 rounded-[21px] justify-center flex">
        <Text className="text-base font-bold">
          Waiting for the face recognition ...
        </Text>
      </View>
      <View className="flex justify-center w-[80%] h-[55%]">
        <Image
          className=" border-8 w-full h-full object-contain "
          source={require("../../images/image.png")}
        />
      </View>
    </View>
  );
}
