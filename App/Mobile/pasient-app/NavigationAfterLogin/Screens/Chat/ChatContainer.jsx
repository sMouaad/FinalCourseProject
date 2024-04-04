import { View, Dimensions, ScrollView } from "react-native";
import React from "react";

const ChatContainer = ({ children, ClassName, svClassName }) => {
  let styleContainer = `justify-center items-center ${ClassName}`;
  return (
    <View
      style={{
        width: Dimensions.get("window").width,
      }}
      className={styleContainer}
    >
      <ScrollView className={svClassName} showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </View>
  );
};

export default ChatContainer;
