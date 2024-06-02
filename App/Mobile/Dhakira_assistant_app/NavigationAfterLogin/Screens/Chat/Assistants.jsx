import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import ChatContainer from "./ChatContainer";
import { Ionicons } from "@expo/vector-icons";

const MessageItem = ({ message }) => {
  return (
    <ChatContainer>
      <View style={styles.messageContainer}>
        <TouchableOpacity style={styles.messageContent} onPress={{}}>
          <Text style={styles.senderName}>{message.name}</Text>
        </TouchableOpacity>
      </View>
    </ChatContainer>
  );
};

const Assistants = ({ data }) => {
  return (
    <>
      <View className="h-full w-screen box-border">
        <FlatList
          className="box-border mb-[10] py-2  "
          data={data}
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
    backgroundColor: "#6c5ce7",
    alignItems: "center",
    flex: 1,
    padding: 10,
    borderRadius: 20,
    // marginRight: 20,
  },
  senderName: {
    color: "white",
    fontWeight: "bold",
    marginBottom: 5,
  },
});
