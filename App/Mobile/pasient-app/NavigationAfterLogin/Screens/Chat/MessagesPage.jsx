import React, { useRef, useState } from "react";
import { View, ScrollView, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

import AllChats from "./AllChats";
import Group from "./Group";
import Assistants from "./Assistants";
import TabBar from "./TabBar";

let previousOffsetX = 0;

const Home = () => {
  const scrollview = useRef();
  const [activeTab, setActiveTab] = useState("all");

  const handleScroll = (event) => {
    const tabs = ["all", "group", "assistants"];
    const { contentOffset, layoutMeasurement } = event.nativeEvent;
    const offsetX = contentOffset.x;
    const screenWidth = layoutMeasurement.width;
    const activeTabIndex = Math.floor(offsetX / screenWidth);
    const scrollFraction = (offsetX % screenWidth) / screenWidth;

    let nextTabIndex = activeTabIndex + 1;
    if (nextTabIndex >= tabs.length) nextTabIndex = activeTabIndex;

    // Determine the direction of scrolling
    const direction = offsetX > previousOffsetX ? 1 : -1;
    const isScrollingRight = direction === 1;

    // Smoothly transition between tabs
    const interpolateTab = (currentIndex, nextIndex, fraction) => {
      const currentTab = currentIndex;
      const nextTab = nextIndex;
      const interpolatedTab = currentTab + (nextTab - currentTab) * fraction;
      return interpolatedTab;
    };

    const interpolatedTab = interpolateTab(
      activeTabIndex,
      nextTabIndex,
      scrollFraction
    );
    const newActiveTabIndex = isScrollingRight
      ? Math.ceil(interpolatedTab)
      : Math.floor(interpolatedTab);

    // Update active tab directly
    setActiveTab(tabs[newActiveTabIndex]);

    // Update previousOffsetX for the next scroll event
    previousOffsetX = offsetX;
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <TabBar
        onPress1={() => {
          scrollview.current.scrollTo({ x: 0 });
        }}
        onPress2={() => {
          scrollview.current.scrollTo({ x: Dimensions.get("window").width });
        }}
        onPress3={() => {
          scrollview.current.scrollToEnd();
        }}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <ScrollView
        className
        ref={scrollview}
        style={{ flex: 1 }}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
      >
        <AllChats />
        <Group />
        <Assistants />
      </ScrollView>
    </View>
  );
};

export default Home;
