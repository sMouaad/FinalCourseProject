import { StyleSheet, Text, View } from "react-native";
import TabButton from "./TabButton";
import React, { useState } from "react";

const TabBar = () => {
  const [activeTab, setActiveTab] = useState("all");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <View className=" m-[20] bg-[#F2F2F2] justify-evenly content-center flex-row rounded-3xl shadow-md shadow-black">
      <TabButton
        active={activeTab === "all"}
        onPress={() => handleTabClick("all")}
      >
        All Chats
      </TabButton>
      <TabButton
        active={activeTab === "group"}
        onPress={() => handleTabClick("group")}
      >
        Group
      </TabButton>
      <TabButton
        active={activeTab === "assistants"}
        onPress={() => handleTabClick("assistants")}
      >
        Assistants
      </TabButton>
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({});
