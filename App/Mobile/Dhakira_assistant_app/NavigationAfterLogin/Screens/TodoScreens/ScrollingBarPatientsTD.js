import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { storeData, getData } from "../../../localStorage";
import Axios from "axios";
import { SERVER_IP } from "@env";

const Item = ({ navigation, patient }) => {
  return (
    <TouchableOpacity
      onPress={async () => {
        await storeData("patientName", patient.name);
        await storeData("patientId", patient.id);

        navigation.navigate("ToDoA", { patientName: patient.name });
      }}
      style={styles.patient}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
        {patient.name}
      </Text>
    </TouchableOpacity>
  );
};

function Todo({ navigation }) {
  const [patients, setPatients] = useState([]);
  const [fetched, setFetsched] = useState(false);
  const [refreshing, setRefreshing] = useState(true);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getData("cookie");
      Axios.post(`http://${SERVER_IP}:3000/auth/profiles`, {
        accessToken: userData,
      })
        .then((res) => {
          if (res.data.status) {
            const result = [
              ...res.data.patientsCreated,
              ...res.data.secondaryPatients,
            ];

            setPatients(
              result.map((patient) => {
                return {
                  id: patient._id,
                  name: patient.name,
                };
              })
            );
          }
          setFetsched(true);
        })
        .catch((err) => {
          console.log("ScrollingBarPatients " + err.response);
          console.log("ScrollingBarPatients Todo" + err);
        });
    };

    if (refreshing) {
      fetchData();
      setRefreshing(false);
    }
  }, [refreshing]);
  // removeData("cookie");
  if (!fetched) {
    return (
      <ScrollView
        contentContainerStyle={styles.scrollViewActivityIndicator}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="flex-1 justify-center">
          <ActivityIndicator size={"large"} />
        </View>
      </ScrollView>
    );
  }

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Text
            className=" text-2xl text-center mx-4 font-medium rounded-[20px] text-[#654ff3] bg-[#f2f1ff] p-2 my-[17px] "
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
            To-Do Patients
          </Text>
          <View className=" flex-row mb-[20px] px-4 gap-2 "></View>
          <View style={styles.scrollViewContent}>
            {patients.map((item) => (
              <Item key={item.id} patient={item} navigation={navigation} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  scrollViewActivityIndicator: {
    display: "flex",
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
  container: {
    padding: 5,
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#f2f1ff",
  },
  scrollView: {
    flexDirection: "column",
    backgroundColor: "#fff",
    flex: 1,
    borderRadius: 31,
    backgroundColor: "#f2f1ff",
  },
  scrollViewContent: {
    backgroundColor: "#f2f1ff",
    flex: 1,
    borderRadius: 31,
    marginHorizontal: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  patient: {
    marginTop: 7,
    padding: 20,
    height: 120,
    backgroundColor: "#6c5ce7",
    flexBasis: "49%",
    maxWidth: "49%",
    flex: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export { Todo };
