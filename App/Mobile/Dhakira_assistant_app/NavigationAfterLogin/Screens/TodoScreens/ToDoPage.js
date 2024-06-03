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

import Axios from "axios";
import { SERVER_IP } from "@env";
import { getData } from "../../../localStorage";
export default function App({ navigation, route }) {
  const { patientName } = route.params;
  navigation.setOptions({ title: patientName });
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [patientId, setPatientId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const patientId = await getData("patientId");
      setPatientId(patientId);
      Axios.get(`http://${SERVER_IP}:3000/auth/get/${patientId}`)
        .then((res) => {
          if (res.data.status) {
            setTasks(res.data.instructions);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);

  const toggleTaskCompletion = (id) => {
    const newTasks = tasks.map((task) => {
      if (task._id === id) {
        Axios.post(`http://${SERVER_IP}:3000/auth/check/`, {
          taskId: task._id,
          patientId: patientId,
        })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
        return { ...task, done: !task.done };
      }
      return task;
    });
    setTasks(newTasks);
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <TouchableOpacity onPress={() => toggleTaskCompletion(item._id)}>
        <Text style={[styles.task, item.done && styles.completed]}>
          {item.task}
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
        keyExtractor={(item) => item._id.toString()}
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
