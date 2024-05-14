import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
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
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import Axios from "axios";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DURATION = 1000;
const DELAY = 500;
const text = ["Welcome ", "to ", "Dhakira..."];
const name = "test";

const Login = ({ navigation }) => {
  Axios.defaults.withCredentials = true;
  const [emailLogin, setEmail] = useState("");
  const [emailReset, setEmailReset] = useState("");
  const [passwordLogin, setPassword] = useState("");
  const [cookie, setCookie] = useState("");
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

  const snapPoints = useMemo(() => ["10%", "95%"], []);

  const bottomSheetModalRef = useRef(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  const getData = async (key) => {
    try {
      await AsyncStorage.getItem(key);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  useEffect(() => {
    Axios.get("http://localhost:3000/auth/userdata/", {
      accessToken: getData("cookie"),
    }).then((res) => {
      if (res.data.status) {
        setTableRows(res.data.patientsCreated);
        setSecondaryRows(res.data.secondaryPatients);
        setUserData(res.data.userData);
        setCookie(res.data.cookie);
      }
    });
  }, []);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" $>
      <View className="flex-1 flex justify-center box-border h-screen px-[10px] pt-7">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <GestureHandlerRootView>
            <BottomSheetModalProvider>
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
                    className="items-center p-5"
                    onPress={handlePresentModalPress}
                  >
                    <Text>Did you forgot your password?</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      const trimmedEmail = emailLogin.trim().toLowerCase();
                      console.log(typeof emailLogin);
                      // navigation.navigate("Profiles");
                      // this is for creating test account
                      // Axios.post("http://192.168.8.101:3000/auth/signup", {
                      //   name,
                      //   email: trimmedEmail,
                      //   password: passwordLogin,
                      // });
                      Axios.post("http://192.168.8.100:3000/auth/login", {
                        emailLogin: trimmedEmail,
                        passwordLogin,
                      })
                        .then((res) => {
                          if (res.data.status) {
                            navigation.navigate("Profiles");
                            storeData("cookie", res.data.accessToken);
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
                        style={{
                          color: "white",
                          fontWeight: "bold",
                          fontSize: 20,
                        }}
                      >
                        Start
                      </Text>
                    </View>
                  </Pressable>
                </View>
                <View style={styles.container}>
                  <BottomSheetModal
                    index={1}
                    snapPoints={snapPoints}
                    ref={bottomSheetModalRef}
                    onChange={handleSheetChanges}
                    backgroundStyle={{ backgroundColor: "#eefffd" }}
                  >
                    <View
                      className="bg-[#eefffd]"
                      style={styles.contentContainer}
                    >
                      <View>
                        <Text style={styles.containerHeadline}>
                          Do You Want Reset Your Password?
                        </Text>
                        <View className="mt-8">
                          <Text className="items-center mx-[20] font-bold rounded-[20px]">
                            Please Enter Your Email:
                          </Text>
                          <TextInput
                            placeholder="Email: example@mail.com"
                            className="border-2 items-center border-Primary px-[20] py-[15] m-[10] rounded-[20px]"
                            value={emailReset}
                            onChangeText={setEmailReset}
                          />
                          <View className=" items-center">
                            <Pressable
                              onPress={() => {
                                const trimmedEmail = emailReset
                                  .trim()
                                  .toLowerCase();

                                Axios.post(
                                  "http://192.168.8.100:3000/auth/forgot-password",
                                  { email: trimmedEmail }
                                )
                                  .then((res) => {
                                    if (res.data.status) {
                                      alert(
                                        "We sent you a mail, check your inbox."
                                      );
                                    } else {
                                      alert("This email does not exist");
                                    }
                                  })
                                  .catch((err) => {
                                    console.log(err);
                                  });
                              }}
                              className=" bg-[#00e5bd] text-[12px] py-[10px] px-[45px] border-[1px] border-transparent rounded-[8px] font-[600] tracking-[0.5px] uppercase mt-[10px] cursor-pointer"
                            >
                              <Text className="text-white font-bold">Send</Text>
                            </Pressable>
                          </View>
                        </View>
                      </View>
                    </View>
                  </BottomSheetModal>
                </View>
              </View>
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </TouchableWithoutFeedback>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  containerHeadline: {
    fontSize: 16,
    fontWeight: "600",
    padding: 10,
  },
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
