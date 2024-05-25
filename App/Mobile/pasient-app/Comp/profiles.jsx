import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
  RefreshControl,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { View } from "react-native-animatable";
import Axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SERVER_IP } from "@env";

const Item = ({ item, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.item, { backgroundColor: item.backgroundColor }]}
  >
    <Text style={styles.title}>{item.title}</Text>
  </TouchableOpacity>
);

const Profiles = ({ navigation }) => {
  const [fetchedData, setFetchedData] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(true);
  const [fetched, setFetsched] = React.useState(false);

  const colors = ["#58BEAC", "#43A6A3", "#388D95", "#347584"];

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  const getData = async (key) => {
    try {
      const userData = await AsyncStorage.getItem(key);
      return userData;
    } catch (e) {
      // saving error
      console.log(e);
      return "error";
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getData("cookie");
      Axios.post(`http://${process.env.SERVER_IP}/auth/profiles`, {
        accessToken: userData,
      })
        .then((res) => {
          if (res.data.status) {
            const result = [
              ...res.data.patientsCreated,
              ...res.data.secondaryPatients,
            ];
            setFetchedData(
              result.map((patient, index) => {
                return {
                  id: patient._id,
                  title: patient.name,
                  backgroundColor: colors[index % colors.length],
                };
              })
            );
          }
          setFetsched(true);
        })
        .catch((err) => {
          console.log("Profiles " + err);
        });
    };
    if (refreshing) {
      fetchData();
      setRefreshing(false);
    }
  }, [refreshing]);

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => {
          storeData("patientId", item.id).then(() => {
            navigation.navigate("mainContainer");
          });
          getData("patientId").then((patientId) => {
            console.log(patientId);
          });
        }}
      />
    );
  };

  if (!fetched) {
    return (
      <ScrollView
        contentContainerStyle={styles.scrollView}
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
    <SafeAreaView className="flex justify-center mt-0 h-full p-4">
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="justify-center items-center mb-3">
          <Text className="text-lg font-semibold">
            Choose the patient that will use this phone:
          </Text>
        </View>
        <View>
          <FlatList
            contentContainerStyle={{
              justifyContent: "center",
            }}
            data={fetchedData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    justifyContent: "center",
    flexGrow: 1, // Ensures the scroll view takes up the full height
    display: "flex",
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
