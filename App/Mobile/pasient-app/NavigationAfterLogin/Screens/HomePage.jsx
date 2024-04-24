// HomePage.js
import React from "react";
import { View } from "react-native";
import PressableButton from "../comp/PressableButton";
import talkDhakira from "../../assets/images/1.png";
import playDhakira from "../../assets/images/2.png";
import camera from "../../assets/images/3.png";
import test from "../../assets/images/4.png";

const HomePage = () => {
  const handleClick = () => {
    console.log("Pressed!");
  };

  return (
    <View
      className="flex flex-1 justify-center items-center bg-white"
      style={{ gap: 20 }}
    >
      <PressableButton
        onPress={handleClick}
        imageSource={talkDhakira}
        buttonText="Talk to Dhakira"
        backgroundColor="#00A7FF"
        textColor={"#fff"}
      />
      <PressableButton
        onPress={handleClick}
        imageSource={playDhakira}
        buttonText="Play with Dhakira"
      />
      <PressableButton
        onPress={handleClick}
        imageSource={camera}
        buttonText="Friends & Family Camera"
        backgroundColor="#00A7FF"
        textColor={"#fff"}
      />
      <PressableButton
        onPress={handleClick}
        imageSource={test}
        buttonText="Tests"
      />
    </View>
  );
};

export { HomePage };
