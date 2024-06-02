import { StyleSheet, View } from "react-native";
import TabButton from "./TabButton";
import React from "react";

const TabBar = ({ activeTab, setActiveTab, onPress1, onPress2 }) => {
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
        Group
      </TabButton>
      <TabButton
        active={activeTab === "group"}
        onPress={() => {
          handleTabClick("group");
          onPress2();
        }}
      >
        Assistants
      </TabButton>
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({});
