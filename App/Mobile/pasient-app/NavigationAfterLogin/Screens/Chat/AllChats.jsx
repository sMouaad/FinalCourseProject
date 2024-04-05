import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
  ImageBackground,
} from "react-native";
import ChatContainer from "./ChatContainer";
import NewChatButton from "./NewChatButton";
import { Entypo } from "@expo/vector-icons";
import { setStatusBarBackgroundColor } from "expo-status-bar";

const messages = [
  {
    id: 1,
    text: "Hello!",
    sender: {
      name: "Mouaad",
      imageUrl:
        "https://scontent.falg2-2.fna.fbcdn.net/v/t39.30808-1/348300667_640497520826755_1443922682255819799_n.jpg?stp=c0.7.200.200a_dst-jpg_p200x200&_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEvuA9B5jCtiDulwX9keJL3AnCIyZyMwMsCcIjJnIzAyy_A__S8Ed3qG0jOERz_jyN-5Rh8fbZfQJvEY6aFSMUU&_nc_ohc=wKbdUZKCR6gAb7e6KXS&_nc_pt=1&_nc_ht=scontent.falg2-2.fna&oh=00_AfDtCXqqzBotFiclXUwPmCQ11NIG998FwBbfC_-xlFgZgA&oe=661426CE",
    },
    messageCount: 1,
    time: "10:00 AM", // Replace with actual time
  },
  {
    id: 2,
    text: "Hi there!",
    sender: {
      name: "Abderraouf",
      imageUrl:
        "https://lh3.googleusercontent.com/a/ACg8ocKyw_h4Iw-mKDE5GHA2kToPvbHRV13o15U_D8MdSkiuAA3S0ZGt=s288-c-no",
    },
    messageCount: 1,
    time: "11:00 AM", // Replace with actual time
  },
  {
    id: 3,
    text: "Rbahtkoum fe bomobsquad",
    sender: {
      name: "Younes",
      imageUrl:
        "https://scontent.falg2-2.fna.fbcdn.net/v/t1.6435-9/39453865_1935146083451500_4672188320783007744_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEtbouyonUuR_qmldciaTF6StBMzdxpKgdK0EzN3GkqB06edootKxRUZ0w7sVba6V-nvOwIMEfEoz21v8ubDr6B&_nc_ohc=iq2jhEdHZ1kAb66Sy1L&_nc_pt=1&_nc_ht=scontent.falg2-2.fna&oh=00_AfCetjPLvV4fR9AQPse0kW0BgcJ4TkvpvFYPRs-zjxOjww&oe=6635E123",
    },
    messageCount: 1,
    time: "12:00 PM", // Replace with actual time
  },
  {
    id: 4,
    text: "ma9dertch nhaz photo de profile dyalek",
    sender: {
      name: "Aissam",
      imageUrl: `https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg`,
    },
    messageCount: 1,
    time: "1:00 PM", // Replace with actual time
  },
  {
    id: 5,
    text: "Free Palastine",
    sender: {
      name: "Free Palastine",
      imageUrl: `https://png.pngtree.com/png-clipart/20231103/ourmid/pngtree-palestine-flag-sphere-circle-vector-transparent-png-image_10437277.png`,
    },
    messageCount: 1,
    time: "2:00 PM", // Replace with actual time
  },
];

const MessageItem = ({ message }) => {
  return (
    <ChatContainer>
      <View style={styles.messageContainer}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: message.sender.imageUrl }}
            style={styles.profileImage}
          />
          <View style={styles.badgeContainer}>
            <Text style={[styles.badge, styles.redIndicator]}>
              {message.messageCount}
            </Text>
          </View>
        </View>

        <View style={styles.messageContent}>
          <View style={styles.messageHeader}>
            <Text style={styles.senderName}>{message.sender.name}</Text>
            <Text style={styles.time}>{message.time}</Text>
          </View>
          <Text>{message.text}</Text>
        </View>
      </View>
    </ChatContainer>
  );
};

const AllChats = () => {
  return (
    <View className="h-full w-screen box-border">
      <FlatList
        className="mx-[10] box-border mb-[10] py-2  "
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <>
              {item.id.toString() != 1 ? (
                <View className="border mx-1 border-[#F2F2F2]   " />
              ) : (
                <></>
              )}

              <MessageItem message={item} />
            </>
          );
        }}
      ></FlatList>
      <NewChatButton />
    </View>
  );
};
const styles = StyleSheet.create({
  btn: {
    backgroundColor: "white",
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#00E5BD",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    elevation: 6,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    marginHorizontal: 10,
    paddingVertical: 10,
  },
  profileImageContainer: {
    position: "relative",
    marginRight: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: "#00E5BD",
    borderWidth: 2,
  },
  badgeContainer: {
    position: "absolute",
    top: -8, // Adjust this value as needed to properly position the badge
    right: -10, // Adjust this value as needed to properly position the badge
  },
  badge: {
    backgroundColor: "red",
    color: "#fff",
    fontSize: 12,
    paddingHorizontal: 6,
    borderRadius: 10,
  },
  messageContent: {
    flex: 1,
  },
  senderName: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  messageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  messageCount: {
    marginRight: 10,
    color: "#555",
  },
  time: {
    color: "#555",
  },
  redIndicator: {
    backgroundColor: "red",
    color: "white",
    paddingHorizontal: 6,
    borderRadius: 10,
    marginRight: 10,
  },
});

export default AllChats;
