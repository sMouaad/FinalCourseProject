import React, { useState } from "react";
import { Text, TextInput, View, Pressable, ScrollView } from "react-native";
import Progress_Bar from "./Progres_Bar.js";
import { Image } from "expo-image";
import Animated from "react-native-reanimated";

function Test({ questions }) {
  const colors = [
    "#00E5BD",
    "#65FCE2",
    "#D292FF",
    "#EDD4FF",
    "#FFC400",
    "#FFE489",
  ];
  const step = 90 / questions.length;
  const [width, setWidth] = useState(step);
  const [colorIndex, setcolorIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [inputValue, setInputValue] = useState(""); // State to hold the input value

  function goToNextQst() {
    if (width <= 100) {
      setWidth(width + step);
      if (questionIndex < questions.length - 1) {
        setQuestionIndex(questionIndex + 1);
      } else {
        setQuestionIndex(0);
        setWidth(step);
      }
      setcolorIndex((colorIndex + 2) % colors.length);
    }
    // Clear input value when the "Submit" button is clicked
    setInputValue("");
  }

  return (
    <ScrollView>
      <View className="bg box-border flex h-full ">
        <Progress_Bar
          width={width}
          color={colors[colorIndex]}
          deepColor={colors[colorIndex + 1]}
        />
        {!completed && (
          <View className="m-5 flex items-center shadow-md shadow-black">
            <Image
              className="rounded-2xl w-[300px] h-[350px] border-[6px]"
              style={{ borderColor: colors[colorIndex] }}
              source={{
                uri: questions[questionIndex]["image"],
              }}
            />
            <Text className="text-xl text-black font-bold mt-7 mb-5">
              {questions[questionIndex].question}
            </Text>
            <TextInput
              placeholder="eg: Ahmed"
              value={inputValue}
              onChangeText={setInputValue} // Update input value based on state
              style={{ borderColor: colors[colorIndex] }}
              className="w-full px-4 h-[50px] border rounded-2xl"
            />
          </View>
        )}
        <Pressable
          onPress={goToNextQst}
          style={{ backgroundColor: colors[colorIndex] }}
          className="items-center px-10 py-4 m-14 shadow-sm shadow-black rounded-2xl"
        >
          <Text className="text-base text-white font-bold">
            {completed ? "Finish" : "Submit"}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

export default Test;
