import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  GiftedChat,
  InputToolbar,
  Composer,
  Send,
} from "react-native-gifted-chat";
import { TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import io from "socket.io-client";

export function Chat() {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const giftedChatRef = useRef(null);

  useEffect(() => {
    // Initialize Socket.IO connection
    const socket = io("http://192.168.8.10:4000");
    setSocket(socket);

    // Emit a test message to the server
    socket.emit("test message", "test");

    // Event listener for receiving messages from the server
    socket.on("chat message", (msg) => {
      const modifiedMessages = msg.map((message) => ({
        ...message,
        user: {
          _id: 2,
          name: "React Native",
          avatar:
            "https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg",
        },
      }));

      // Update state with the modified message
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, modifiedMessages)
      );
    });
    // Cleanup function to disconnect socket when component unmounts
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  const onSend = useCallback(
    (messages) => {
      // Emit the sent message to the server
      if (socket) {
        socket.emit("chat message", messages);
      }

      // Update state with the sent message
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );

      if (giftedChatRef.current) {
        giftedChatRef.current.scrollToBottom();
      }
    },
    [socket]
  );

  // Render functions for input toolbar, composer, and send button
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

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        ref={giftedChatRef}
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{ _id: 1 }}
        renderInputToolbar={renderInputToolbar}
        renderComposer={renderComposer}
        renderSend={renderSend}
        bottomOffset={10}
      />
    </View>
  );
}
