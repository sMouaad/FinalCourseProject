import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  Image,
  View,
  Modal,
  TextInput,
  RefreshControl,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import Axios from "axios";
import { SERVER_IP } from "@env";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Item = ({ navigation, patient }) => {
  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };
  return (
    <TouchableOpacity
      onPress={async () => {
        await storeData("patientName", patient.name);
        await storeData("patientId", patient.id);
        const name = patient.name;
        navigation.navigate("Home_RTC", { patientName: name });
      }}
      style={styles.patient}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
        {patient.name}
      </Text>
    </TouchableOpacity>
  );
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

function HomePage({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [patients, setPatients] = useState([]);
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [fetched, setFetsched] = useState(false);
  const [selectedConditon, setSelectedConditon] = useState("");
  const [refreshing, setRefreshing] = useState(true);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const alertAdd = async () => {
    setFetsched(false);

    if (patientName && patientAge && selectedConditon !== "vide") {
      user_token = await getData("cookie");
      Axios.post(`http://${SERVER_IP}/auth/operation`, {
        token: user_token,
        operation: "patient",
        patientAge: patientAge,
        patientName: patientName,
        condition: selectedConditon,
      })
        .then((res) => {
          if (res.data.status) {
            onRefresh();
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .then(() => {
          setFetsched(true);
          setPatientName("");
          setPatientAge("");
          closeModal();
        });
    } else {
      if (selectedConditon === "vide") {
        alert("Select a condition!");
      } else alert("Fill all fields!");
      setFetsched(true);
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
          console.warn(err);
        });
    };
    if (refreshing) {
      fetchData();
      setRefreshing(false);
    }
  }, [refreshing]);

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
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <GestureHandlerRootView>
          <FlatList
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
            data={patients}
            renderItem={({ item }) => (
              <Item patient={item} navigation={navigation} />
            )} // Pass navigation prop
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </GestureHandlerRootView>
        {/* <TouchableOpacity onPress={()=>navigation.navigate("Home_RTC", { patientName: "Younes BENSAFIA" })} style={styles.patient}><Text style={{fontSize:20, fontWeight:'bold', color:'#fff' }}>Younes BENSAFIA</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("Home_RTC")} style={styles.patient}><Text style={{fontSize:20, fontWeight:'bold', color:'#fff' }}>Mouaad Sadi</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("Home_RTC")} style={styles.patient}><Text style={{fontSize:20, fontWeight:'bold', color:'#fff' }}>Abderaouf MAHDJOUB</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("Home_RTC")} style={styles.patient}><Text style={{fontSize:20, fontWeight:'bold', color:'#fff' }}>Ahmed TEHAR</Text></TouchableOpacity>*/}

        <TouchableOpacity
          onPress={openModal}
          style={{
            height: 100,
            width: "100%",
            backgroundColor: "#fff",
            marginBottom: 30,
            borderRadius: 45,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 4,
            borderColor: "#76A523",
          }}
        >
          <Image
            style={{ width: 60, height: 60 }}
            source={require("../../../Images/ajouter.png")}
          />
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          {!fetched && (
            <View className="flex-1 justify-center">
              <ActivityIndicator size={"large"} />
            </View>
          )}

          {fetched && (
            <View
              style={{
                width: "100%",
                height: "80%",
                backgroundColor: "rgba(94, 94 , 206 , 0.9)",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 50,
                borderWidth: 5,
                borderColor: "#76A523",
              }}
            >
              <TextInput
                placeholder="Name"
                style={{
                  borderWidth: 3,
                  width: "80%",
                  marginBottom: 20,
                  height: 60,
                  borderRadius: 30,
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "bold",
                  borderColor: "black",
                  backgroundColor: "white",
                }}
                value={patientName}
                onChangeText={setPatientName}
              />
              <TextInput
                placeholder="Patient Age"
                style={{
                  borderWidth: 3,
                  width: "80%",
                  marginBottom: 20,
                  height: 60,
                  borderRadius: 30,
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "bold",
                  borderColor: "black",
                  backgroundColor: "white",
                }}
                value={patientAge}
                onChangeText={setPatientAge}
              ></TextInput>
              <View
                style={{
                  borderBottomColor: "black",
                  borderBottomWidth: 4,
                  width: "90%",
                  marginTop: 10,
                  borderRadius: 30,
                }}
              />

              <TextInput
                placeholder="ID Doctor"
                style={{
                  borderWidth: 3,
                  height: 60,
                  borderRadius: 30,
                  borderWidth: 3,
                  marginTop: 15,
                  width: "80%",
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "bold",
                  borderColor: "black",
                  backgroundColor: "white",
                }}
              />
              <View
                style={{
                  borderWidth: 3,
                  borderRadius: 30,
                  marginTop: 15,
                  width: "80%",
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "bold",
                  borderColor: "black",
                  backgroundColor: "white",
                  alignItems: "center",
                }}
              >
                <Picker
                  style={{
                    width: "74%",
                  }}
                  selectedValue={selectedConditon}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedConditon(itemValue)
                  }
                >
                  <Picker.Item label="Select Condition" value="vide" />
                  <Picker.Item label="Autism" value="autism" />
                  <Picker.Item label="Alzheimer" value="alzheimer" />
                </Picker>
              </View>
              <TouchableOpacity
                onPress={alertAdd}
                style={{
                  height: 50,
                  width: "80%",
                  marginTop: 10,
                  borderWidth: 3,
                  borderColor: "black",
                  borderRadius: 25,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#76A523",
                }}
              >
                <Text
                  style={{ fontWeight: "bold", fontSize: 18, color: "white" }}
                >
                  ADD
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Modal>
      </ScrollView>
    </SafeAreaView>
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
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#fff",
  },
  scrollView: {
    flexDirection: "column",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 31,
  },
  scrollViewContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  patient: {
    height: 100,
    width: 320,
    backgroundColor: "#6c5ce7",
    marginBottom: 30,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: "#2d3436",
  },
});

export { HomePage };
