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

const DURATION = 1000;
const DELAY = 500;
const text = ["Welcome ", "to ", "Dhakira..."];

const Key = ({ navigation }) => {
  const [inputValue, setInputValue] = useState("");
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
      <View className="flex-1 flex justify-center box-border h-screen px-[10px]">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="h-screen py-[60] gap-20">
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
              <TextInput
                placeholder="Enter the keyword"
                className="border-2 items-center border-Primary px-[20] py-[15] m-[10] rounded-[20px]"
                value={inputValue}
                onChangeText={setInputValue}
              />
              <Pressable
                onPress={() => {
                  setInputValue("");
                  navigation.navigate("WaitingPage");
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
