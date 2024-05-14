import React from "react";
import { Text, View } from "react-native";
import { Image } from "expo-image";
import waitingDhakira from "../../assets/images/image.png";
import { useNavigation } from "@react-navigation/native";

// Adjust import based on the actual library name

export default function WaitingForTheFaceRecognition({ navigation }) {
  setTimeout(() => {
    navigation.replace("Test");
  }, 2000);
  return (
    <View className="flex-1 flex justify-center box-border h-screen px-[10px]">
      <View className="justify-center flex items-center">
        <View className="font-bold border-Primary border-[4px] p-4 rounded-[21px] justify-center flex">
          <Text className="text-base font-bold">
            Waiting for the face recognition ...
          </Text>
        </View>
        <View className="flex justify-center w-[60%] h-[45%]">
          <Image
            className="mt-[40px] w-full h-full object-contain "
            source={waitingDhakira}
          />
        </View>
      </View>
    </View>
  );
}
