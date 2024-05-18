import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import ChatContainer from "./ChatContainer";
import { Ionicons } from "@expo/vector-icons";

const messages = [
  {
    id: 1,
    sender: {
      name: "Abderraouf",
      imageUrl:
        "https://lh3.googleusercontent.com/a/ACg8ocKyw_h4Iw-mKDE5GHA2kToPvbHRV13o15U_D8MdSkiuAA3S0ZGt=s288-c-no",
    },
  },
  {
    id: 3,
    sender: {
      name: "Younes",
      imageUrl:
        "https://scontent.falg2-2.fna.fbcdn.net/v/t1.6435-9/39453865_1935146083451500_4672188320783007744_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEtbouyonUuR_qmldciaTF6StBMzdxpKgdK0EzN3GkqB06edootKxRUZ0w7sVba6V-nvOwIMEfEoz21v8ubDr6B&_nc_ohc=iq2jhEdHZ1kAb66Sy1L&_nc_pt=1&_nc_ht=scontent.falg2-2.fna&oh=00_AfCetjPLvV4fR9AQPse0kW0BgcJ4TkvpvFYPRs-zjxOjww&oe=6635E123",
    },
  },
];

const MessageItem = ({ message }) => {
  return (
    <ChatContainer>
      <View style={styles.messageContainer}>
        <Image
          source={{ uri: message.sender.imageUrl }}
          style={styles.profileImage}
        />
        <View style={styles.messageContent}>
          <Text style={styles.senderName}>{message.sender.name}</Text>
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.btn,
            pressed && {
              opacity: 0.8,
              elevation: 2,
              backgroundColor: "#00E5BD",
            },
          ]}
          onPress={() => {}}
        >
          {({ pressed }) => {
            return (
              <>
                <Ionicons
                  name="call"
                  size={24}
                  color={pressed ? "#fff" : "#00E5BD"}
                />
              </>
            );
          }}
        </Pressable>
      </View>
    </ChatContainer>
  );
};

const Assistants = () => {
  return (
    <>
      <View className="h-full w-screen box-border">
        <FlatList
          className="mx-[10] box-border mb-[10] py-2  "
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <>
                {item.id.toString() != 1 ? (
                  <View className="border self-center mx-1 w-[93%] border-[#F2F2F2]   " />
                ) : (
                  <></>
                )}
                <MessageItem message={item} />
              </>
            );
          }}
        ></FlatList>
      </View>
    </>
  );
};

export default Assistants;

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
    marginLeft: 10,
    shadowOpacity: 0.9,
    shadowRadius: 8,
    elevation: 6,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingHorizontal: 28,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25, // half of width and height to make it circular
    marginRight: 10,
    borderColor: "#00E5BD",
    borderWidth: 2,
  },
  messageContent: {
    flex: 1,
  },
  senderName: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});
