import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import ChatContainer from "./ChatContainer";

const MessageItem = ({ message, onPress }) => {
  return (
    <ChatContainer>
      <View style={styles.messageContainer}>
        <TouchableOpacity
          style={styles.messageContent}
          onPress={() => onPress(message.name, message.id)}
        >
          <Text style={styles.senderName}>{message.name}</Text>
        </TouchableOpacity>
      </View>
    </ChatContainer>
  );
};

const Assistants = ({ data, onPress }) => {
  return (
    <ScrollView style={{ flex: 1 }}>
      {data.map((item) => (
        <React.Fragment key={item.id}>
          {item.id !== 1 && (
            <View
              style={{
                borderWidth: 1,
                alignSelf: "center",
                marginHorizontal: 1,
                width: "93%",
                borderColor: "#F2F2F2",
              }}
            />
          )}
          <MessageItem message={item} onPress={onPress} />
        </React.Fragment>
      ))}
    </ScrollView>
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
  },
  senderName: {
    color: "white",
    fontWeight: "bold",
    marginBottom: 5,
  },
});
