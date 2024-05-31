// import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";

function Home_PatientX({ navigation, patientName }) {
  // console.log("component Home_PatientX");
  return (
    <>
      <View
        style={{
          ...styles.container,
        }}
      >
        <View className="w-full self-start">
          <Text
            className="text-2xl text-center mx-4 font-medium rounded-[20px] text-[#654ff3]  bg-[#f2f1ff] p-2 my-[17px] "
            style={{
              shadowColor: "#654ff3",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              elevation: 15,
            }}
          >
            {patientName}
          </Text>
        </View>
        <View className="flex-1 items-center justify-center ">
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Track", { patientName: patientName })
            }
            className=" bg-[#00a4bd] "
            style={{
              width: "80%",
              height: 69,
              backgroundColor: "#654ff3",
              borderRadius: 21,
              marginBottom: 50,
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#2200ff",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              elevation: 7,
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
            <Text style={{ fontSize: 24, fontWeight: "bold", color: "white" }}>
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
              shadowColor: "#00a4bd",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              elevation: 7,
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
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#f2f1ff",
  },
});

export { Home_PatientX };
