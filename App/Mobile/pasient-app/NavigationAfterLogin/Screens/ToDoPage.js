import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StatusBar,
  Image,
} from "react-native";

import Axios from "axios";
import { SERVER_IP } from "@env";
import { getData } from "../../localStorage";
import noTask from "../../assets/no-task.png";

function ToDoPage({ navigation }) {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [patientId, setPatientId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const patientId = await getData("patientId");
    setPatientId(patientId);
    Axios.get(`http://${SERVER_IP}/auth/get/${patientId}`)
      .then((res) => {
        if (res.data.status) {
          setTasks(res.data.instructions);
        }
        setLoading(false);
        setRefreshing(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleTaskCompletion = (id) => {
    console.log("");
    const newTasks = tasks.map((task) => {
      if (task._id === id) {
        Axios.post(`http://${SERVER_IP}/auth/check/`, {
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
      <Text
        className=" text-2xl text-center mx-4 font-medium rounded-[20px] text-[#4ff3af] bg-[#e1fffa] p-2 my-[17px] "
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
        Your To-do
      </Text>
      {loading ? (
        <ActivityIndicator size="large" color="#00E5BD" />
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
        <View className="flex-1 justify-center items-center">
          {/* <Text>No tasks</Text> */}
          <Image
            source={noTask}
            style={{
              marginLeft: 50,
              marginBottom: 50,
              width: 200,
              height: 200,
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    borderColor: "#00E5BD",
    borderRadius: 21,
    padding: 10,
    flex: 1,
    borderWidth: 3,
    fontSize: 15,
  },
  addButton: {
    backgroundColor: "#00E5BD",
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
    borderColor: "#00E5BD",
  },
  completed: {
    textDecorationLine: "line-through",
    color: "white",
    backgroundColor: "#00E5BD",
  },
});

export { ToDoPage };
