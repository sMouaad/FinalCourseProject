import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  GiftedChat,
  InputToolbar,
  Composer,
  Send,
} from "react-native-gifted-chat";
import { Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import io from "socket.io-client";
import avatar from "../../../assets/avatar.png";
import { getData } from "../../../localStorage";

export function Chat({ route }) {
  const { patientName, patientId } = route.params;
  const [userID, setUserID] = useState(null);
  const [messages, setMessages] = useState([
    // {
    //   _id: 1,
    //   text: "azerty",
    //   image: "default-image.png",
    //   createdAt: new Date(),
    //   user: {
    //     _id: 2,
    //     name: "React Native",
    //   },
    // },
  ]);
  const [socket, setSocket] = useState(null);
  const giftedChatRef = useRef(null);

  useEffect(() => {
    const connection = async () => {
      // Initialize Socket.IO connection
      const socket = io(`http://${process.env.SERVER_IP}:3000`);
      setSocket(socket);

      console.log("patientId " + patientId);

      socket.emit("join room", patientId);

      // Emit a test message to the server
      socket.emit("test message", "test");

      // Event listener for receiving messages from the server
      socket.on("chat message", (msg) => {
        const modifiedMessages = msg.map((message) => ({
          ...message,
          user: {
            _id: message.user._id,
            name: message.user.name,
            avatar: avatar,
          },
        }));

        // Update state with the modified message
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, modifiedMessages)
        );
      });
    };

    getData("userID").then((userID) => {
      setUserID(userID);
      console.log("user " + userID);

      // Initialize Socket.IO connection
      connection();
      // Cleanup function to disconnect socket when component unmounts
      return () => {
        if (socket) {
          socket.disconnect();
        }
      };
    });
  }, []);

  const onSend = useCallback(
    (messages) => {
      // Emit the sent message to the server

      if (socket) {
        socket.emit("chat message", messages, patientId);
      }

      // Update state with the sent message
      // setMessages((previousMessages) =>
      //   GiftedChat.append(previousMessages, messages)
      // );

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
            <Ionicons name="send" size={28} color="#654ff3" />
          </View>
        </Send>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 mt-10">
      <View style={{ flex: 1 }}>
        <Text
          className="  text-2xl text-center mx-4 font-medium rounded-[20px] text-[#654ff3]  bg-[#f2f1ff] p-2 my-[17px] "
          style={{
            shadowColor: "#654ff3",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            elevation: 15,
          }}
        >
          {patientName}
        </Text>
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{ _id: userID, avatar: avatar }}
          renderInputToolbar={renderInputToolbar}
          renderComposer={renderComposer}
          renderSend={renderSend}
          bottomOffset={10}
        />
      </View>
    </View>
  );
}
