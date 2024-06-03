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
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import Animated, {
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import welcomToDhakira from "../../assets/images/welcomToDhakira.png";
import { useIsFocused } from "@react-navigation/native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import Axios from "axios";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-get-random-values";
import { SERVER_IP } from "@env";
import { storeData, getData, removeData } from "../../localStorage";

const DURATION = 1000;
const DELAY = 500;
const text = ["Welcome ", "to ", "Dhakira..."];

const Login = ({ navigation }) => {
  Axios.defaults.withCredentials = true;

  const [emailLogin, setEmail] = useState("");

  const [emailReset, setEmailReset] = useState("");

  const [passwordLogin, setPassword] = useState("");

  const [iscorrect, setIscorrect] = useState(false);

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

  const snapPoints = useMemo(() => ["10%", "82%"], []);
  const [sendbtn, setSendbtn] = useState(false);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handelRestPassword = () => {
    setSendbtn(true);
  };

  useEffect(() => {
    if (sendbtn) {
      const trimmedEmail = emailReset.trim().toLowerCase();
      const url = `http://${process.env.SERVER_IP}/auth/forgot-password`;
      Axios.post(url, {
        email: trimmedEmail,
      })
        .then((res) => {
          if (res.data.status) {
            alert("We sent you a mail, check your inbox.");
          } else {
            alert("This email does not exist");
          }
          setSendbtn(false);
        })
        .catch((err) => {
          console.log(err);
          setSendbtn(false);
        })
        .then(() => {
          bottomSheetModalRef.current?.close();
        });
    }
  }, [sendbtn]);

  const bottomSheetModalRef = useRef(null);

  // useEffect(() => {
  //   getData("patientId").then((patientId) => {
  //     if (typeof patientId === "string" && patientId !== "") {
  //       console.log("patientId");
  //       navigation.navigate("Profiles");
  //     } else {
  //       setInitialRouteName("Login");
  //     }
  //   });
  // }, []);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
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
                    onChangeText={(input) => {
                      setEmail(input);
                      setIscorrect(false);
                    }}
                  />
                  <Text className=" items-center mx-[20] font-bold rounded-[20px]">
                    Password:
                  </Text>
                  <TextInput
                    secureTextEntry={true}
                    placeholder="Password"
                    className="border-2 items-center border-Primary px-[20] py-[15] m-[10] rounded-[20px]"
                    value={passwordLogin}
                    onChangeText={(input) => {
                      setPassword(input);
                      setIscorrect(false);
                    }}
                  />
                  {iscorrect && (
                    <Text className="text-red-500 items-center mx-[20] font-semibold rounded-[20px]">
                      Username or password does not correct
                    </Text>
                  )}

                  <Pressable
                    className="items-center p-5"
                    onPress={handlePresentModalPress}
                  >
                    <Text>Did you forgot your password?</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      // console.log("login");
                      const trimmedEmail = emailLogin.trim().toLowerCase();
                      // navigation.navigate("Profiles");
                      // this is for creating test account
                      // Axios.post("http://192.168.8.101:3000/auth/signup", {
                      //   name,
                      //   email: trimmedEmail,
                      //   password: passwordLogin,
                      // });
                      const url = `http://${process.env.SERVER_IP}/auth/login`;

                      Axios.post(url, {
                        emailLogin: trimmedEmail,
                        passwordLogin,
                      })
                        .then((res) => {
                          if (res.data.status) {
                            storeData("cookie", res.data.accessToken).then(
                              navigation.navigate("Profiles")
                            );
                          }
                        })
                        .catch((err) => {
                          console.log("login wow" + err);
                          if (err.response.status === 401) {
                            setIscorrect(true);
                          }
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
                    backgroundStyle={{ backgroundColor: "#eefffd" }}
                  >
                    {sendbtn && (
                      <View className="flex-1 justify-center">
                        <ActivityIndicator size={"large"} />
                      </View>
                    )}
                    {!sendbtn && (
                      <View
                        className="bg-[#eefffd]"
                        style={styles.contentContainer}
                      >
                        <View>
                          <Text
                            className="text-[16px] font-semibold p-[10px]"
                            style={styles.containerHeadline}
                          >
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
                                onPress={handelRestPassword}
                                className=" bg-[#00e5bd] text-[12px] py-[10px] px-[45px] border-[1px] border-transparent rounded-[8px] font-[600] tracking-[0.5px] uppercase mt-[10px] cursor-pointer"
                              >
                                <Text className="text-white font-bold">
                                  Send
                                </Text>
                              </Pressable>
                            </View>
                          </View>
                        </View>
                      </View>
                    )}
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
