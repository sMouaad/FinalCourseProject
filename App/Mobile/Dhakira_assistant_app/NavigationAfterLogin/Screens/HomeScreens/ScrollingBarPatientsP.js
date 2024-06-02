import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  RefreshControl,
  ActivityIndicator,
  Button,
  Pressable,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { storeData, getData, removeData } from "../../../localStorage";
import Axios from "axios";
import { SERVER_IP } from "@env";
import { Picker } from "@react-native-picker/picker";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import Icon from "../../../components/Icon";
import DateTimePicker from "@react-native-community/datetimepicker";
import IconFont from "react-native-vector-icons/Feather";

const Item = ({ navigation, patient }) => {
  return (
    <TouchableOpacity
      onPress={async () => {
        await storeData("patientName", patient.name);
        await storeData("patientId", patient.id);
        navigation.navigate("Home_RTC", { patientName: patient.name });
      }}
      style={styles.patient}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
        {patient.name}
      </Text>
    </TouchableOpacity>
  );
};

function HomePage({ navigation }) {
  const [patients, setPatients] = useState([]);
  const [patientName, setPatientName] = useState("");
  const [fetched, setFetsched] = useState(false);
  const [selectedConditon, setSelectedConditon] = useState("");
  const [refreshing, setRefreshing] = useState(true);
  const snapPoints = useMemo(() => ["85%"], []);
  const bottomSheetModalRef = useRef(null);

  const [date, setDate] = useState(new Date(1730));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleClosedModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const alertAdd = async () => {
    setFetsched(false);

    if (patientName && date && selectedConditon !== "vide") {
      user_token = await getData("cookie");
      Axios.post(`http://${SERVER_IP}:3000/auth/operation`, {
        token: user_token,
        operation: "patient",
        patientDate: date,
        patientName: patientName,
        condition: selectedConditon,
      })
        .then((res) => {
          if (res.data.status) {
            onRefresh();
          }
        })
        .catch((err) => {
          // console.log(err.response);
          console.log(err);
        })
        .then(() => {
          setFetsched(true);
          setPatientName("");
          setDate(new Date(1598051730000));
          handleClosedModalPress;
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
          console.log("ScrollingBarPatients  " + err.response);
          console.log("ScrollingBarPatients " + err);
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
    y;
  }

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <SafeAreaView style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.scrollView}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <Text
              className=" text-2xl text-center mx-4 font-medium rounded-[20px] text-[#654ff3]  bg-[#f2f1ff] p-2 my-[17px] "
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
              Home
            </Text>
            <View className=" flex-row mb-[20px] px-4 gap-2 ">
              <View
                style={{
                  shadowColor: "#654ff3",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  elevation: 15,
                }}
                className="text-xl f rounded-full py-2 px-3 justify-center bg-[#f2f1ff] flex-1 font-bold "
              >
                <Text className="text-[17px]  text-[#654ff3]  font-medium ">
                  {" "}
                  Your Patients{" "}
                </Text>
              </View>
              <View
                style={{
                  shadowColor: "#654ff3",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  elevation: 5,
                }}
                className="text-2xl rounded-full  p-1 items-center flex  bg-[#f2f1ff] flex-2 font-bold "
              >
                <Icon
                  onPress={handlePresentModalPress}
                  name={"plus-square"}
                ></Icon>
              </View>
            </View>
            <View style={styles.scrollViewContent}>
              {patients.map((item) => (
                <Item key={item.id} patient={item} navigation={navigation} />
              ))}
            </View>
          </ScrollView>

          <BottomSheetModal
            index={0}
            snapPoints={snapPoints}
            ref={bottomSheetModalRef}
            handleIndicatorStyle={{
              backgroundColor: "#fff",
            }}
            backgroundStyle={{ backgroundColor: "#654ff3" }}
          >
            {!fetched && (
              <View className="flex-1 justify-center">
                <ActivityIndicator size={"large"} />
              </View>
            )}

            {fetched && (
              <BottomSheetScrollView className="flex-1 bg-[#f2f1ff]  ">
                <View
                  style={{
                    backgroundColor: "#f2f1ff",
                    justifyContent: "center",
                    paddingHorizontal: 40,
                    borderRadius: 45,
                    marginHorizontal: 15,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      color: "#000",
                      marginVertical: 10,
                      marginTop: 40,
                    }}
                  >
                    Create new patient
                  </Text>
                  <Text className="items-center font-[450] mt-6 ">Name:</Text>
                  <TextInput
                    placeholder="Name: Ali"
                    className="border-b-2 items-center border-[#654ff3] px-[10] py-[7] mb-[20] "
                    value={patientName}
                    onChangeText={setPatientName}
                  />
                  <Text className="items-center font-[450] mt-6">
                    Patient Age:
                  </Text>

                  <SafeAreaView className="border-b-2 flex-row  justify-between items-center border-[#654ff3] px-[10] pt-[7] mb-[20]">
                    <Text className="">{date.toLocaleDateString()}</Text>
                    <Pressable
                      onPress={showDatepicker}
                      title="Show date picker!"
                      className="p-2 rounded-[20px] items-center"
                    >
                      <IconFont name="calendar" size={30} color="#654ff3" />
                    </Pressable>
                    {show && (
                      <DateTimePicker
                        style={{
                          backgroundColor: "#f2f1ff",
                          borderRadius: 20,
                        }}
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        onChange={onChange}
                      />
                    )}
                  </SafeAreaView>
                  <Text className="items-center font-[450] mt-6">
                    Doctor's Email (Optional) :
                  </Text>
                  <TextInput
                    placeholder="Email: example@mail.com"
                    className="border-b-2 items-center border-[#654ff3] px-[10] py-[7] mb-[20] "
                  />
                  <Text className="items-center font-[450] mt-6">
                    Patient Condition:
                  </Text>
                  <View className="border-b-2  border-[#654ff3] px-[20] my rounded-[20px] mb-[20]">
                    <Picker
                      style={{
                        width: "100%",
                        color: "gray",
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
                  <TouchableOpacity onPress={alertAdd} style={styles.Add}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 18,
                        color: "#f2f1ff",
                      }}
                    >
                      ADD
                    </Text>
                  </TouchableOpacity>
                </View>
              </BottomSheetScrollView>
            )}
          </BottomSheetModal>
        </SafeAreaView>
      </BottomSheetModalProvider>
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
  inputField: {
    padding: 7,
    borderWidth: 3,
    borderRadius: 30,
    borderWidth: 3,
    marginTop: 10,
    width: "80%",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    borderColor: "black",
    backgroundColor: "white",
  },
  Add: {
    marginTop: 15,
    backgroundColor: "#654ff3",
    height: 60,
    marginHorizontal: 10,
    marginVertical: 20,
    borderRadius: 31,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
  },
});

export { HomePage };
