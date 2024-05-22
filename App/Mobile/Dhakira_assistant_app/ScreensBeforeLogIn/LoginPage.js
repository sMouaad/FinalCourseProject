import React, { useCallback, useEffect, useMemo, useRef } from "react";
import {
  Text,
  StyleSheet,
  Pressable,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { removeData, storeData } from "../localStorage";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Axios from "axios";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { SERVER_IP } from "@env";

function LoginPageInterface() {
  const snapPoints = useMemo(() => ["10%", "95%"], []);
  const [sendbtn, setSendbtn] = useState(false);

  const bottomSheetModalRef = useRef(null);

  const navigation = useNavigation();
  Axios.defaults.withCredentials = true;
  const [emailLogin, setEmail] = useState("");
  const [passwordLogin, setPassword] = useState("");
  const [emailReset, setEmailReset] = useState("");

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handelRestPassword = () => {
    setSendbtn(true);
  };

  useEffect(() => {
    if (sendbtn) {
      const trimmedEmail = emailReset.trim().toLowerCase();

      Axios.post(`http://${process.env.SERVER_IP}:3000/auth/forgot-password`, {
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
          if (err.response.status === 404) {
            alert("This email does not exist");
          }
          setSendbtn(false);
        })
        .then(() => {
          bottomSheetModalRef.current?.close();
        });
    }
  }, [sendbtn]);
  removeData("cookie");

  return (
    <>
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <View style={styles.container}>
            <View style={styles.Firstcontainer}>
              <View style={styles.Secondcontainer} />
            </View>
            <TextInput
              placeholder="Enter your email"
              style={styles.username}
              inputMode="email"
              onChangeText={(text) => {
                setEmail(text);
              }}
            />
            <TextInput
              placeholder="Enter your Paswword"
              style={styles.inputPassword}
              secureTextEntry={true}
              onChangeText={(text) => {
                setPassword(text);
              }}
            />
            <Pressable
              style={{
                alignItems: "center",
                paddingBottom: 30,
                paddingTop: 10,
              }}
              className="items-center p-5 "
              onPress={handlePresentModalPress}
            >
              <Text>Did you forgot your password?</Text>
            </Pressable>
            <BottomSheetModal
              index={1}
              snapPoints={snapPoints}
              ref={bottomSheetModalRef}
              backgroundStyle={{ backgroundColor: "#f4eeff" }}
            >
              {sendbtn && (
                <View className="flex-1 justify-center">
                  <ActivityIndicator size={"large"} />
                </View>
              )}
              {!sendbtn && (
                <View className="bg-[#f4eeff]" style={styles.contentContainer}>
                  <View>
                    <Text className="text-[16px] font-semibold p-[10px]">
                      Do You Want Reset Your Password?
                    </Text>
                    <View className="mt-8">
                      <Text className="items-center mx-[20] font-bold rounded-[20px]">
                        Please Enter Your Email:
                      </Text>
                      <TextInput
                        placeholder="Email: example@mail.com"
                        className="border-2 items-center border-[#6930C3] px-[20] py-[15] m-[10] rounded-[20px]"
                        value={emailReset}
                        onChangeText={setEmailReset}
                      />
                      <View className=" items-center">
                        <Pressable
                          onPress={handelRestPassword}
                          className=" bg-[#6930C3] text-[12px] py-[10px] px-[45px] border-[1px] border-transparent rounded-[8px] font-[600] tracking-[0.5px] uppercase mt-[10px] cursor-pointer"
                        >
                          <Text className="text-white font-bold">Send</Text>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            </BottomSheetModal>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => {
                const trimmedEmail = emailLogin.trim().toLowerCase();
                Axios.post(`http://${SERVER_IP}:3000/auth/login`, {
                  emailLogin: trimmedEmail,
                  passwordLogin,
                })
                  .then((res) => {
                    if (res.data.status) {
                      storeData("cookie", res.data.accessToken).then(() => {
                        navigation.navigate("Main");
                      });
                    }
                  })
                  .catch((err) => {
                    if (err.response.status === 401) {
                      alert("Email or password is incorrect");
                    }
                    console.log("loginPage", err);
                  });
              }}
            >
              <Text style={styles.TextLoginButton}>Log in</Text>
            </TouchableOpacity>
            <Text
              style={{
                color: "#6930C3",
                fontWeight: "bold",
                marginTop: 10,
                fontSize: 20,
              }}
            >
              You don't have account?,{" "}
              <Text
                style={{ color: "#42b72a", textDecorationLine: "underline" }}
                onPress={() => navigation.navigate("SignUpPage")}
              >
                Sign Up.
              </Text>
            </Text>
          </View>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </>
  );
}
const styles = StyleSheet.create({
  Firstcontainer: {
    marginTop: -200,
    marginBottom: 200,
    width: "90%",
    height: 20,
    backgroundColor: "#6930C3",
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  Secondcontainer: {
    width: "90%",
    height: 8,
    backgroundColor: "#72569D",
    borderRadius: 22,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    
  },
  inputPassword: {
    borderColor: "#6930C3",
    width: "90%",
    height: 60,
    borderWidth: 4,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    textAlign: "center",
    marginBottom: 20,
    fontSize: 20,
  },
  username: {
    borderColor: "#6930C3",
    width: "90%",
    height: 60,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 4,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    textAlign: "center",
    fontSize: 20,
  },
  loginButton: {
    width: "90%",
    height: 60,
    borderRadius: 22,
    backgroundColor: "#6930C3",
    justifyContent: "center",
  },
  TextLoginButton: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  FirstText: {
    marginTop: -10,
    marginBottom: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "#4F278D",
  },
});

export { LoginPageInterface };
