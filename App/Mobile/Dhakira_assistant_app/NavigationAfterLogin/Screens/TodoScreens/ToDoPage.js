import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
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
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const patientId = await getData("patientId");
    setPatientId(patientId);
    Axios.get(`http://${SERVER_IP}:3000/auth/get/${patientId}`)
      .then((res) => {
        if (res.data.status) {
          setTasks(res.data.instructions);
        }
        setLoading(false);
        setRefreshing(false);
      })
      .catch((err) => {
        console.log(err + "test");
        setLoading(false);
        setRefreshing(false);
      });
  };

  useEffect(() => {
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

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
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
      {loading ? (
        <ActivityIndicator size="large" color="#5E60CE" />
      ) : tasks.length ? (
        <FlatList
          style={styles.list}
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item) => item._id.toString()}
          onRefresh={onRefresh}
          refreshing={refreshing}
        />
      ) : (
        <Text>No tasks</Text>
      )}
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
    marginBottom: 10,
  },
  task: {
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
