import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import ChatContainer from "./ChatContainer";
import { Chat } from "./Chat";

const Group = () => {
  return (
    <View
      style={{
        width: Dimensions.get("screen").width,
        marginLeft: 0,
      }}
    >
      <Chat />
    </View>
  );
};

export default Group;

const styles = StyleSheet.create({});
