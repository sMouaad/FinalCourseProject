import { StyleSheet, Text, View } from "react-native";
import TabButton from "./TabButton";
import React, { useState } from "react";

const TabBar = ({ activeTab, setActiveTab, onPress1, onPress2, onPress3 }) => {
  // const [activeTab, setActiveTab] = useState("all");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <View className=" m-[20] bg-[#F2F2F2] justify-evenly content-center flex-row rounded-3xl shadow-md shadow-black">
      <TabButton
        active={activeTab === "all"}
        onPress={() => {
          handleTabClick("all");
          onPress1();
        }}
      >
        All Chats
      </TabButton>
      <TabButton
        active={activeTab === "group"}
        onPress={() => {
          handleTabClick("group");
          onPress2();
        }}
      >
        Group
      </TabButton>
      <TabButton
        active={activeTab === "assistants"}
        onPress={() => {
          handleTabClick("assistants");
          onPress3();
        }}
      >
        Assistants
      </TabButton>
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({});
