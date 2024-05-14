import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
} from "react-native";
import React, { useEffect } from "react";
import { View } from "react-native-animatable";
import Axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { get } from "mongoose";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Patient 1",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Patient 2",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Patient 3",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d73",
    title: "Patient 4",
  },
];

DATA[0]["backgroundColor"] = "#58BEAC";
DATA[1]["backgroundColor"] = "#43A6A3";
DATA[2]["backgroundColor"] = "#388D95";
DATA[3]["backgroundColor"] = "#347584";

const Item = ({ item, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.item, { backgroundColor: item.backgroundColor }]}
  >
    <Text style={styles.title}>{item.title}</Text>
  </TouchableOpacity>
);

const Profiles = ({ navigation }) => {
  const [tableRows, setTableRows] = React.useState([]);
  const [secondaryRows, setSecondaryRows] = React.useState([]);

  useEffect(() => {
    const getData = async (key) => {
      try {
        const userData = await AsyncStorage.getItem(key);
        console.log("userData");
        console.log(userData);
        Axios.post("http://192.168.8.100:3000/auth/profiles", {
          accessToken: userData,
        })
          .then((res) => {
            if (res.data.status) {
              setTableRows(res.data.patientsCreated);
              setSecondaryRows(res.data.secondaryPatients);
              console.log(tableRows);
              console.log(secondaryRows);
            }
          })
          .catch((err) => {
            console.log(err);
          });

      } catch (e) {
        // saving error
        console.log(e);
        return "error";
      }
    };
    getData("cookie");
  }, []);

  const renderItem = ({ item }) => {
    return (
      <Item item={item} onPress={() => navigation.replace("mainContainer")} />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View className="justify-center items-center ">
        <Text className="text-lg font-semibold">
          Choose the patient that will use this phone:
        </Text>
      </View>
      <View>
        <FlatList
          contentContainerStyle={{ justifyContent: "center" }}
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    gap: 40,
    justifyContent: "center",
    height: "100%",
    marginTop: 0,
  },
  item: {
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    marginVertical: 8,
    marginHorizontal: "10%",
  },
  title: {
    fontSize: 22,
    color: "white",
  },
});

export { Profiles };
