import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";

export default function App({ navigation, route }) {
  const { patientName } = route.params;
  navigation.setOptions({ title: patientName });
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Wake up and get out of bed",
      completed: false,
    },
    {
      id: 2,
      title: "Brush teeth",
      completed: false,
    },
    {
      id: 3,
      title: "Take morning medication",
      completed: false,
    },
    {
      id: 4,
      title: "Eat breakfast",
      completed: false,
    },
    {
      id: 5,
      title: "Drink water",
      completed: false,
    },
    {
      id: 6,
      title: "Go for a short walk",
      completed: false,
    },
    {
      id: 7,
      title: "Engage in a cognitive activity",
      completed: false,
    },
    {
      id: 8,
      title: "Take a break",
      completed: false,
    },
    {
      id: 9,
      title: "Eat lunch",
      completed: false,
    },
    {
      id: 10,
      title: "Take afternoon medication",
      completed: false,
    },
    {
      id: 11,
      title: "Do a physical activity",
      completed: false,
    },
    {
      id: 12,
      title: "Engage in a hobby",
      completed: false,
    },
    {
      id: 13,
      title: "Take a short nap",
      completed: false,
    },
    {
      id: 14,
      title: "Snack time",
      completed: false,
    },
    {
      id: 15,
      title: "Social interaction",
      completed: false,
    },
    {
      id: 16,
      title: "Eat dinner",
      completed: false,
    },
  ]);

  useEffect(() => {
    

  }, []);
  const toggleTaskCompletion = (id) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(newTasks);
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <TouchableOpacity onPress={() => toggleTaskCompletion(item.id)}>
        <Text style={[styles.task, item.completed && styles.completed]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}></View>
      <FlatList
        style={styles.list}
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    borderColor: "#5E60CE",
    borderRadius: 21,
    padding: 10,
    flex: 1,
    borderWidth: 3,
    fontSize: 15,
  },
  addButton: {
    backgroundColor: "#5E60CE",
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "black",
  },
  deleteButton: {
    color: "red",
    marginLeft: 10,
    fontSize: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  list: {
    width: "100%",
  },
  taskContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    // alignItems: "center",
    marginBottom: 10,
  },
  task: {
    // flex: 1,
    padding: 10,
    fontSize: 15,
    borderRadius: 21,
    borderWidth: 3,
    borderColor: "#5E60CE",
  },
  completed: {
    textDecorationLine: "line-through",
    color: "white",
    backgroundColor: "#5E60CE",
  },
});
