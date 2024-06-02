import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MessagesPage from "./MessagesPage";

import { Chat } from "./Chat";

const MessagesStack = createNativeStackNavigator();

const StackMsg = () => {
  return (
    <MessagesStack.Navigator>
      <MessagesStack.Screen
        name="MessagesPage"
        component={MessagesPage}
        options={{ headerShown: false }}
      />
      <MessagesStack.Screen
        style={{ flex: 1 }}
        name="Group"
        component={Chat}
        options={{ headerShown: false }}
      />
    </MessagesStack.Navigator>
  );
};

export default StackMsg;
