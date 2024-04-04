import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Entypo } from "@expo/vector-icons";
import AllChats from "./AllChats";
import Group from "./Group";
import Assistants from "./Assistants";
import TabBar from "./TabBar";
import NewChatButton from "./NewChatButton";

const Home = () => {
  const navigation = useNavigation();

  return (
    <View className="flex flex-1 bg-white">
      <TabBar />
      <ScrollView
        className="h-full"
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
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

const styles = StyleSheet.create({});
