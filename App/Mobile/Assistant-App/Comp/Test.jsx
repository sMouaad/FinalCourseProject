import React, { useState } from "react";
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Progress_Bar from "./Progres_Bar.jsx";
import QuestionComponent from "./QuestionComponent.jsx";
import { Image } from "expo-image";
import dhakira from "../assets/images/happyDahkira.png";
import App from "../App.jsx";

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
        // setQuestionIndex(0);
        // setWidth(step);
        setCompleted(true);
      }
      setcolorIndex((colorIndex + 2) % colors.length);
    }
    // Clear input value when the "Submit" button is clicked
    setInputValue("");
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="bg box-border flex h-screen justify-between ">
        <Progress_Bar
          width={width}
          color={colors[colorIndex]}
          deepColor={colors[colorIndex + 1]}
        />
        {!completed && (
          <QuestionComponent
            question={questions[questionIndex].question}
            imageUri={questions[questionIndex].image}
            inputValue={inputValue}
            setInputValue={setInputValue}
            color={colors[colorIndex]}
          />
        )}
        {completed && (
          <>
            <View className="m-5 flex items-center shadow-md shadow-black">
              <Image
                contentFit="contain"
                className="rounded-2xl w-[240] h-[230]"
                source={dhakira}
                transition={130}
              ></Image>
              <Text className="text-xl text-black font-bold mt-7 mb-5">
                Thank You,{"\n"} Very Good!
              </Text>
            </View>
          </>
        )}
        <Pressable
          onPress={goToNextQst}
          style={({ pressed }) => ({
            backgroundColor: pressed
              ? colors[colorIndex + 1]
              : colors[colorIndex],
            alignItems: "center",
            paddingVertical: 15,
            paddingHorizontal: 20,
            margin: 10,
            shadowColor: "black",
            shadowOpacity: 0.3,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
            borderRadius: 10,
            elevation: pressed ? 2 : 4,
          })}
        >
          <Text className="text-base text-white font-bold">
            {completed ? "Finish" : "Submit"}
          </Text>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default Test;
