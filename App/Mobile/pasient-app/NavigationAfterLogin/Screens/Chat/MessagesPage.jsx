import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import AllChats from "./AllChats";
import Group from "./Group";
import Assistants from "./Assistants";
import TabBar from "./TabBar";
import NewChatButton from "./NewChatButton";

const Home = () => {
  // const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("all");

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <ScrollView
        style={{ flex: 1 }}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => {
          const offsetX = event.nativeEvent.contentOffset.x;
          const screenWidth = event.nativeEvent.layoutMeasurement.width;
          const activeTabIndex = Math.floor(offsetX / screenWidth);
          const tabs = ["all", "group", "assistants"];
          setActiveTab(tabs[activeTabIndex]);
        }}
      >
        <AllChats />
        <Group />
        <Assistants />
      </ScrollView>
      <NewChatButton />
    </View>
  );
};

export default Home;
