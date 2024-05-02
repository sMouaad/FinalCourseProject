import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

const PatientProfile = () => {
  const [patients, setPaients] = useState([
    { name: "Yousef" },
    { name: "Ali" },
  ]);
  return (
    <View>
      <Pressable>
        <Text></Text>
      </Pressable>
    </View>
  );
};

export default PatientProfile;

const styles = StyleSheet.create({});
