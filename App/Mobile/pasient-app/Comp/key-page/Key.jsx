import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Image } from "expo-image";
import Animated, {
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import welcomToDhakira from "../../assets/images/welcomToDhakira.png";
import { useIsFocused } from "@react-navigation/native";
import Axios from "axios";

const DURATION = 1000;
const DELAY = 500;
const text = ["Welcome ", "to ", "Dhakira..."];
const name = "test";
const email = "test@gmail.com";
const password = "1234";
const Key = ({ navigation }) => {
  Axios.defaults.withCredentials = true;
  const [emailLogin, setEmail] = useState("");
  const [passwordLogin, setPassword] = useState("");
  const isFocused = useIsFocused();

  const opacity1 = useSharedValue(0);
  const opacity2 = useSharedValue(0);
  const opacity3 = useSharedValue(0);

  useEffect(() => {
    opacity1.value = 0;
    opacity2.value = 0;
    opacity3.value = 0;
    show();
  }, [isFocused]);

  // prettier-ignore
  const show = () => {
    opacity1.value = withDelay(0 * DELAY, withTiming(1, { duration: DURATION }));
    opacity2.value = withDelay(1 * DELAY, withTiming(1, { duration: DURATION }));
    opacity3.value = withDelay(2 * DELAY, withTiming(1, { duration: DURATION }));
    
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" $>
      <View className="flex-1 flex justify-center box-border h-screen px-[10px] pt-7">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="h-screen py-[40] gap-3 ">
            <View className="items-center justify-start flex-col ">
              <View className="flex flex-row mb-2">
                {[opacity1, opacity2, opacity3].map((opacity, index) => (
                  <Animated.Text
                    key={index}
                    className="font-bold text-[30px] text-[#00A588] mb-[10px]"
                    style={{ opacity: opacity }}
                  >
                    {text[index]}
                  </Animated.Text>
                ))}
              </View>
              <Image
                source={welcomToDhakira}
                className="rounded-2xl w-[171] h-[173] "
                transition={130}
              />
            </View>

            <View>
              <Text className="items-center mx-[20] font-bold rounded-[20px]">
                Email:
              </Text>
              <TextInput
                placeholder="Email: example@mail.com"
                className="border-2 items-center border-Primary px-[20] py-[15] m-[10] rounded-[20px]"
                value={emailLogin}
                onChangeText={setEmail}
              />
              <Text className=" items-center mx-[20] font-bold rounded-[20px]">
                Password:
              </Text>
              <TextInput
                secureTextEntry={true}
                placeholder="Password"
                className="border-2 items-center border-Primary px-[20] py-[15] m-[10] rounded-[20px]"
                value={passwordLogin}
                onChangeText={setPassword}
              />
              <Pressable
                onPress={() => {
                  // this is for creating test account
                  // Axios.post("http://192.168.8.101:3000/auth/signup", {
                  //   name,
                  //   email,
                  //   password,
                  // });

                  const trimmedEmail = emailLogin.trim();
                  Axios.post("http://192.168.8.101:3000/auth/login", {
                    emailLogin: trimmedEmail,
                    passwordLogin,
                  })
                    .then((res) => {
                      if (res.data.status) {
                        navigation.navigate("mainContainer");
                      }
                    })
                    .catch((err) => {
                      console.warn(err);
                    });
                }}
                style={({ pressed }) => [
                  styles.button,
                  pressed && { elevation: 1, opacity: 0.9 },
                ]}
              >
                <View style={styles.interPrasseable}>
                  <Text
                    style={{ color: "white", fontWeight: "bold", fontSize: 20 }}
                  >
                    Start
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Key;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#00E5BD",
    padding: 12,
    margin: 10,
    borderRadius: 20,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  interPrasseable: {
    backgroundColor: "#00A588",
    width: "100%",
    alignItems: "center",
    paddingVertical: 1,
    borderRadius: 20,
  },
});
