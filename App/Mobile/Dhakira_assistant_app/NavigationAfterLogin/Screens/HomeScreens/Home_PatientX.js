import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

function Home_PatientX({ navigation, patientName }) {
  
  // console.log("component Home_PatientX");
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Track")}
        style={{
          width: "80%",
          height: 69,
          backgroundColor: "#D9F6FB",
          borderRadius: 21,
          marginBottom: 50,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 2,
        }}
      >
        <Image
          style={{
            width: 60,
            height: 53.82,
            position: "absolute",
            left: 10,
            top: 3,
          }}
          source={require("../../../Images/3.png")}
        />
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "black" }}>
          Track
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Settings", { patientName: patientName });
        }}
        style={{
          width: "80%",
          height: 69,
          backgroundColor: "#1D90A1",
          borderRadius: 21,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 2,
        }}
      >
        <Image
          style={{
            width: 60,
            height: 60,
            position: "absolute",
            left: 10,
            top: 3,
          }}
          source={require("../../../Images/reglage.png")}
        />
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "white" }}>
          Settings
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export { Home_PatientX };
