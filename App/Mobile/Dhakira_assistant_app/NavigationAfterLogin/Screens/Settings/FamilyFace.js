import { useEffect, useState, useCallback } from "react";
import {
  ScrollView,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  RefreshControl,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SERVER_IP } from "@env";
import { getData } from "../../../localStorage";
import Axios from "axios";

const messages = [
  {
    id: 1,
    name: "Abderraouf",
    imageUrl:
      "https://lh3.googleusercontent.com/a/ACg8ocKyw_h4Iw-mKDE5GHA2kToPvbHRV13o15U_D8MdSkiuAA3S0ZGt=s288-c-no",
  },
  {
    id: 2,

    name: "Abderraouf",
    imageUrl:
      "https://lh3.googleusercontent.com/a/ACg8ocKyw_h4Iw-mKDE5GHA2kToPvbHRV13o15U_D8MdSkiuAA3S0ZGt=s288-c-no",
  },
  {
    id: 3,
    name: "Abderraouf",
    imageUrl:
      "https://lh3.googleusercontent.com/a/ACg8ocKyw_h4Iw-mKDE5GHA2kToPvbHRV13o15U_D8MdSkiuAA3S0ZGt=s288-c-no",
  },
  {
    id: 4,

    name: "Abderraouf",
    imageUrl:
      "https://lh3.googleusercontent.com/a/ACg8ocKyw_h4Iw-mKDE5GHA2kToPvbHRV13o15U_D8MdSkiuAA3S0ZGt=s288-c-no",
  },
];

const MessageItem = ({ message }) => {
  return (
    <View style={styles.messageContainer}>
      <Image source={{ uri: message.imageUrl }} style={styles.profileImage} />
      <View style={styles.messageContent}>
        <Text style={styles.senderName}>{message.name}</Text>
        <Text style={styles.messageContent}>{message.name}</Text>
      </View>
    </View>
  );
};

export default function FamilyFace() {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [who, setWho] = useState("");
  const [fetched, setFetsched] = useState(false);
  const [refreshing, setRefreshing] = useState(true);
  const [patientId, setPatientId] = useState(0);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.image,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
  }, []);

  const handelAddImage = async () => {
    setFetsched(false);
    const parts = image.split("/");
    const filename = parts[parts.length - 1];
    const formData = new FormData();

    const image_name = `${name}_${who}_${filename}`;

    formData.append("file", {
      uri: image,
      name: image_name,
      type: "image/jpeg" || "image/png", // Set the correct MIME type based on your image format
    });
    formData.append("Name", name);
    formData.append("Who", who);

    Axios.put(
      `http://${SERVER_IP}:8000/image_uploaded_by_caregiver/${patientId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
      .then((res) => {
        if (res.data.status === 200) {
          alert(res.data.message);
        } else if (res.data.status === 422) {
          onRefresh();
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        setFetsched(true);
        setImage(null);
        setName("");
        setWho("");
      });
  };
  useEffect(() => {
    if (refreshing) {
      setRefreshing(false);
      setFetsched(true);
    }
  }, [refreshing]);

  useEffect(() => {
    const fetchData = async (url, params) => {
      try {
        const response = await Axios.get(url, { params });
        return response.data;
      } catch (err) {
        console.error(err);
      }
    };
    async function getPatientId() {
      const sroredpatientId = await getData("patientId");
      setPatientId(sroredpatientId);
      console.log(patientId);
    }
    async function fetcImages() {
      getPatientId();
      const data = fetchData(`http://${SERVER_IP}:8000/patient_images`, {
        patient_id: patientId,
      });
      // console.log(data);
    }
    fetcImages();
  }, []);

  // if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  // if (error) return <Text style={styles.error}>Error: {error.message}</Text>;
  // console.log(data);
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
    <>
      <View style={styles.container}>
        <ScrollView
          // contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Text className="text-[20px] px-5 py-3 text-[#654ff3]  font-bold ">
            Upload a new picture{" "}
          </Text>
          {/* {image && ( */}
          <View style={styles.imageContainer}>
            <TouchableOpacity
              className="flex flex-row flex-1  w-full justify-center items-center"
              onPress={pickImage}
            >
              <Image
                onPress={pickImage}
                source={{ uri: image }}
                style={styles.image}
              />
            </TouchableOpacity>
            <View style={styles.image3}>
              <TextInput
                placeholder="Who (Name)"
                value={name}
                onChangeText={setName}
                style={styles.inputField}
              />
              <TextInput
                placeholder="Who is it? (Son,...)"
                value={who}
                onChangeText={setWho}
                style={styles.inputField}
              />

              <TouchableOpacity style={styles.Submit} onPress={handelAddImage}>
                <Text style={styles.textSubmit}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Text className="text-[20px] px-5 py-3 text-[#654ff3]  font-bold ">
              All pictures
            </Text>
            {/* )} */}
            <View
              className="mx-[10]  rounded-3xl bg-white box-border mb-[10] py-2  "
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
              {/* data={messages}
              keyExtractor={(item) => item.id.toString()}
              renderItem= */}
              {messages.map((item) => {
                return (
                  <>
                    {item.id.toString() != 1 ? (
                      <View className="border self-center mx-1 w-[93%] border-[#f2f1ff]   " />
                    ) : (
                      <></>
                    )}
                    <MessageItem key={item.id} message={item} />
                  </>
                );
              })}
            </View>
            {/* <View style={styles.scrollViewContent}>
              {patients.map((item) => (
                <Item key={item.id} patient={item} navigation={navigation} />
              ))}
            </View> */}
          </View>
        </ScrollView>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    // padding: 5,
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: "#f2f1ff",
  },
  upload: {
    display: "flex",
    borderRadius: 20,
    height: 48,
    width: 192,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5390D9",
    flexDirection: "row",
  },
  textUpload: {
    paddingLeft: 20,
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
  imageContainer: {
    marginVertical: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 25,
    paddingHorizontal: 15,
    borderRadius: 50,
    shadowColor: "#654ff3",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 15,
  },
  image: {
    // marginTop: 40,
    width: "100%",
    height: 170,
    borderRadius: 21,
    borderWidth: 3,
    borderColor: "#654ff3",
  },
  image3: {
    width: "60%",
    height: 170,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  inputField: {
    borderColor: "#654FF3",
    borderWidth: 2,
    width: "90%",
    height: 50,
    borderRadius: 21,
    padding: 10,
    fontWeight: "bold",
    fontSize: 17,
    marginBottom: 5,
  },

  textUPicWithHim: {
    paddingLeft: 10,
    fontWeight: "bold",
    fontSize: 17,
    color: "white",
  },
  Submit: {
    display: "flex",
    flexDirection: "row",
    borderRadius: 20,
    height: 40,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#654FF3",
    flexDirection: "row",
    marginBottom: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    elevation: 6,
  },
  textSubmit: {
    paddingLeft: 10,
    fontWeight: "bold",
    fontSize: 17,
    color: "white",
  },
  scrollViewActivityIndicator: {
    display: "flex",
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
  scrollView: {
    display: "flex",
    // padding: 5,
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: "#f2f1ff",
  },
  // btn: {
  // backgroundColor: "white",
  // height: 50,
  // width: 50,
  // borderRadius: 25,
  // alignItems: "center",
  // justifyContent: "center",
  // shadowColor: "#00E5BD",
  // shadowOffset: {
  //   width: 0,
  //   height: 2,
  // },
  // marginLeft: 10,
  // shadowOpacity: 0.9,
  // shadowRadius: 8,
  // elevation: 6,
  // },
  messageContainer: {
    flexDirection: "row",

    // alignItems: "center",
    padding: 20,
    paddingHorizontal: 28,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 16, // half of width and height to make it circular
    marginRight: 10,
    borderColor: "#654ff3",
    borderWidth: 2,
  },
  messageContent: {
    flex: 1,
    marginHorizontal: 8,
  },
  senderName: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 8,
    marginVertical: 5,
  },
});
