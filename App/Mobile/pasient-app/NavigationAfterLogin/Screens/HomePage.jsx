// HomePage.js
import React from "react";
import { View } from "react-native";
import PressableButton from "../comp/PressableButton";
import talkDhakira from "../../assets/images/1.png";
import playDhakira from "../../assets/images/2.png";
import camera from "../../assets/images/3.png";
import test from "../../assets/images/4.png";

const HomePage = ({ navigation }) => {
  return (
    <View
      className="flex flex-1 justify-center items-center bg-white"
      style={{ gap: 20 }}
    >
      <PressableButton
        onPress={() => navigation.navigate("TalkDhakira")}
        imageSource={talkDhakira}
        buttonText="Talk to Dhakira"
        backgroundColor="#00A7FF"
        textColor={"#fff"}
      />
      <PressableButton
        onPress={() => console.log("Play with Dhakira")}
        imageSource={playDhakira}
        buttonText="Play with Dhakira"
      />
      <PressableButton
        onPress={() => {
          navigation.navigate("RecongnizeCamera");
        }}
        imageSource={camera}
        buttonText="Friends & Family Camera"
        backgroundColor="#00A7FF"
        textColor={"#fff"}
      />
      <PressableButton
        onPress={() => {
          navigation.navigate("Test");
        }}
        imageSource={test}
        buttonText="Tests"
      />
    </View>
  );
};

export { HomePage };
