import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import React from "react";
import {
  GiftedChat,
  InputToolbar,
  Composer,
  Send,
} from "react-native-gifted-chat";
import AvaterTalkDhakira from "../../assets/images/talkDhakira.png";
import Ionicons from "react-native-vector-icons/Ionicons";

const TalkDhakira = ({ navigation }) => {
  const [messages, setMessages] = React.useState([
    {
      _id: 1,
      text: "azerty",
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "React Native",
        avatar: AvaterTalkDhakira,
      },
    },
    {
      _id: 2,
      text: "hello",
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "React Native",
        avatar: AvaterTalkDhakira,
      },
    },
  ]);

  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E5E5E5",
        }}
      />
    );
  };

  const renderComposer = (props) => {
    return (
      <Composer
        {...props}
        textInputStyle={{
          margin: 10,
          backgroundColor: "#F2F2F2",
          borderWidth: 1,
          borderColor: "#E5E5E5",
          borderRadius: 25,
          paddingHorizontal: 20,
          paddingTop: 10,
          paddingBottom: 10,
        }}
      />
    );
  };

  const renderSend = (props) => {
    return (
      <TouchableOpacity>
        <Send {...props}>
          <View style={{ marginRight: 10, marginBottom: 7 }}>
            <Ionicons name="send" size={28} color="#00A588" />
          </View>
        </Send>
      </TouchableOpacity>
    );
  };

  const renderBubble = (props) => {
    return (
      <View
        style={[
          styles.container,
          props.position === "left" ? styles.leftBubble : styles.rightBubble,
        ]}
      >
        <Text style={styles.text}>{props.currentMessage.text}</Text>
      </View>
    );
  };

  const onSend = (messages) => {
    // Update state with the sent message
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  };

  return (
    <View className="flex-1">
      <GiftedChat
        messages={messages}
        onSend={onSend}
        renderInputToolbar={renderInputToolbar}
        renderComposer={renderComposer}
        renderSend={renderSend}
        renderBubble={renderBubble}
        user={{ _id: 1 }}
        bottomOffset={10}
      />
    </View>
  );
};

export default TalkDhakira;

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    marginVertical: 2,
    paddingHorizontal: 10,
    paddingVertical: 5,
    maxWidth: "80%",
  },
  leftBubble: {
    backgroundColor: "#c5c5c5",
    alignSelf: "flex-start",
  },
  rightBubble: {
    backgroundColor: "#00E5BD",
    alignSelf: "flex-end",
  },
  text: {
    padding: 2,
    color: "white", // text color
  },
});
