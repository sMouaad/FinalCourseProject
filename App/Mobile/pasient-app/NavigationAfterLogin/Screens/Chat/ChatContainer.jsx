import { View, Dimensions, ScrollView } from "react-native";
import React from "react";

const ChatContainer = ({ children, ClassName, svClassName }) => {
  let styleContainer = `${ClassName}`;
  let styleSV = `${svClassName}`;
  return (
    <View
      style={{
        width: Dimensions.get("window").width,
      }}
      className={styleContainer}
    >
      <ScrollView className={styleSV} showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </View>
  );
};

export default ChatContainer;
