// QuestionComponent.js

import React from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Image } from "expo-image";
const QuestionComponent = ({
  question,
  imageUri,
  inputValue,
  setInputValue,
  color,
}) => {
  return (
    <View className="m-5 flex items-center shadow-md shadow-black ">
      <Image
        contentFit="cover"
        className="rounded-2xl w-[280px] h-[280px] border-[6px]"
        style={{ borderColor: color }}
        source={{
          uri: imageUri,
        }}
        transition={130}
      />
      <Text className="text-xl text-black font-bold mt-7 mb-5">{question}</Text>

      <TextInput
        placeholder="eg: Ahmed"
        value={inputValue}
        onChangeText={setInputValue}
        style={{ borderColor: color }}
        className="w-full px-4 h-[50px] border rounded-2xl"
      />
    </View>
  );
};

export default QuestionComponent;
