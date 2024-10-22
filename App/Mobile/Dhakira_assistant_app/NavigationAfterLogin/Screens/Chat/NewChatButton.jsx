import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import React from "react";

const atButton = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Chat")}
        style={styles.chatButton}
      >
        <Entypo name="chat" size={24} color="#FAFAFA" />
      </TouchableOpacity>
    </View>
  );
};

export default NewChatButton;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 16, // Adjust the bottom value as per your requirement
    right: 16, // Adjust the right value as per your requirement
  },
  chatButton: {
    backgroundColor: "#00E5BD",
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#00E5BD",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    elevation: 6,
  },
});
