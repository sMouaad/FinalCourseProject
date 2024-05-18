import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  View,
  Platform,
  Keyboard,
} from "react-native";
import Task from "../../../components/Task";

export default function TodoAssistant() {
    const [task, setTask] = useState("");
    const [taskItems, setTaskItems] = useState([]);
    const handleAddTask = () => {
      if (task.trim() === "") return;
      Keyboard.dismiss();
      setTaskItems([...taskItems, task]);
      setTask("");
    };
  
    const completeTask = (index) => {
      let itemCopy = [...taskItems];
      itemCopy.splice(index, 1);
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Today's tasks</Text>
  
          <View style={styles.items}>
            {taskItems.map((item, index) => {
              return (
                <Pressable
                  key={index}
                  onPress={() => {
                    completeTask(index);
                  }}
                >
                  <Task text={item} />
                </Pressable>
              );
            })}
          </View>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "android" ? "padding" : "height"}
          style={styles.writeTaskWrapper}
        >
          <TextInput
            style={styles.input}
            placeholder={"Write a task"}
            value={task}
            onChangeText={(text) => setTask(text)}
          />
          <Pressable onPress={() => handleAddTask()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </Pressable>
        </KeyboardAvoidingView>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#E8EAED",
    },
    tasksWrapper: { paddingTop: 80, paddingHorizontal: 20 },
    sectionTitle: {
      fontSize: 24,
      fontWeight: "bold",
    },
    items: { marginTop: 30 },
  
    writeTaskWrapper: {
      position: "absolute",
      bottom: 40,
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
    },
    input: {
      paddingVertical: 15,
      paddingHorizontal: 15,
      backgroundColor: "#fff",
      borderRadius: 60,
      borderColor: "#C0C0C0",
      borderWidth: 1,
      width: 250,
    },
    addWrapper: {
      width: 60,
      height: 60,
      backgroundColor: "#fff",
      borderRadius: 60,
      justifyContent: "center",
      alignItems: "center",
      borderColor: "#C0C0C0",
      borderWidth: 1,
    },
  });