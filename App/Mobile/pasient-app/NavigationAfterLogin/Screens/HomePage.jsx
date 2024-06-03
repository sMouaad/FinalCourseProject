// HomePage.js
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import PressableButton from "../comp/PressableButton";
import talkDhakira from "../../assets/images/1.png";
import playDhakira from "../../assets/images/2.png";
import camera from "../../assets/images/3.png";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Axios from "axios";
import { SERVER_IP } from "@env";
import { removeData } from "../../localStorage";
const HomePage = ({ navigation }) => {
  return (
    <View className="flex-1">
      <View className="flex flex-1 justify-center items-center bg-white">
        <View className="self-start justify-between flex-row items-center">
          <TouchableOpacity
            className="self-start m-10 flex-row items-center"
            onPress={() => {
              console.log("logout");
              Axios.get(`http://${SERVER_IP}/auth/logout`)
                .then((res) => {
                  if (res.data.status) {
                    removeData("cookie").then(() => {
                      navigation.navigate("Login");
                    });
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            <Icon name="logout" size={30} color="red" />
            <Text className=" ml-[10] text  ">Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="self-start flex-wrap m-10 flex-row items-center"
            onPress={() => {
              removeData("patientId").then(() => {
                navigation.navigate("Profiles");
              });
            }}
          >
            <Icon name="account-switch" size={30} color="#00E5BD" />
            <Text className=" ml-[10] text   ">Switch Patient</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{ gap: 20 }}
          className="flex-1  justify-center items-center"
        >
          <PressableButton
            onPress={() => navigation.navigate("TalkDhakira")}
            imageSource={talkDhakira}
            buttonText="Talk to Dhakira"
            backgroundColor="#00A7FF"
            textColor={"#fff"}
          />
          <PressableButton
            onPress={() => navigation.navigate("Game")}
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
          {/* <PressableButton
        onPress={() => {
          navigation.navigate("Test");
        }}
        imageSource={test}
        buttonText="Tests"
      /> */}
        </View>
      </View>
    </View>
  );
};

export { HomePage };
