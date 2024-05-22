import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import Axios from "axios";
import { SERVER_IP } from "@env";

function SignUpPageInter() {
  Axios.defaults.withCredentials = true;
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirm] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handlesignup = () => {
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      alert("fill all the fields");
      return;
    }
    if (!validateEmail(email)) {
      alert("Invalid Email");
      return;
    }
    if (!validatePassword(password)) {
      alert(
        "Password must contain at least 8 characters, one letter and one number"
      );
      return;
    }

    if (confirmPassword === password) {
      const trimmedEmail = email.trim().toLowerCase();

      Axios.post(`http://${process.env.SERVER_IP}:3000/auth/signup`, {
        name,
        email: trimmedEmail,
        type: "assistant",
        password,
      })
        .then((res) => {
          if (res.data.status) {
            alert("Account created successfully");
            navigation.navigate("LoginPage");
          } else if (res.data.message === "user already exists") {
            alert("Email already exists");
          }
        })
        .catch((err) => {
          if (err.response.data.message === "user already exists") {
            alert("Email already exists");
          }
          console.log(err);
        });
    } else {
      alert("password not same");
    }
  };
  return (
    <View>
      <View style={styles.Firstcontainer}>
        <View style={styles.ChargingBar}>
          <View
            style={{
              width: "100%",
              height: 22,
              backgroundColor: "#6930C3",
              borderRadius: 8,
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: "100%",
                height: 12,
                backgroundColor: "#72569D",
                borderRadius: 8,
              }}
            ></View>
          </View>
        </View>

        <TextInput
          onChangeText={(text) => {
            setName(text);
          }}
          value={name}
          style={styles.FirstInputSignUp}
          placeholder="Enter your Name"
          inputMode="text"
        ></TextInput>
        <TextInput
          onChangeText={(text) => {
            setEmail(text);
          }}
          value={email}
          style={styles.InputSignUpS}
          placeholder=" Enter your E-mail"
          inputMode="email"
        ></TextInput>
        <TextInput
          onChangeText={(text) => {
            setPassword(text);
          }}
          style={styles.InputSignUpS}
          placeholder="Password"
          value={password}
          secureTextEntry={true}
        ></TextInput>
        <TextInput
          onChangeText={(text) => {
            setConfirm(text);
          }}
          value={confirmPassword}
          style={styles.LastInputSignUp}
          placeholder="Confirm your password"
          secureTextEntry={true}
        ></TextInput>

        <Text style={styles.TextLogin}>
          Already have account?,{" "}
          <Text
            style={{ color: "#42b72a", textDecorationLine: "underline" }}
            onPress={() => navigation.navigate("LoginPage")}
          >
            Login
          </Text>
        </Text>

        <TouchableOpacity
          style={styles.NextButton}
          title
          onPress={handlesignup}
        >
          <Text style={styles.TextInNButton}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  Firstcontainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: 35,
  },
  NextButton: {
    width: "90%",
    height: 60,
    backgroundColor: "#6930C3",
    borderRadius: 22,
    justifyContent: "center",
  },
  TextInNButton: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  ChargingBar: {
    width: "90%",
    height: 22,
    backgroundColor: "#D9D9D9",
    borderRadius: 8,
    marginBottom: "50%",
  },
  InputSignUpPrenom: {
    width: "90%",
    height: 60,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    fontSize: 20,
    borderColor: "#6930C3",
    textAlign: "center",
  },
  InputSignUpS: {
    width: "90%",
    height: 60,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 4,
    borderColor: "#6930C3",
    fontSize: 20,
    textAlign: "center",
  },
  FirstInputSignUp: {
    width: "90%",
    height: 60,
    borderWidth: 4,
    borderTopLeftRadius: 22,
    borderColor: "#6930C3",
    borderTopRightRadius: 22,
    fontSize: 20,
    textAlign: "center",
    marginTop: -120,
  },
  LastInputSignUp: {
    width: "90%",
    height: 60,
    borderWidth: 4,
    borderColor: "#6930C3",
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  TextLogin: {
    marginTop: 20,
    width: "90%",
    height: 60,
    color: "#6930C3",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
export { SignUpPageInter };
