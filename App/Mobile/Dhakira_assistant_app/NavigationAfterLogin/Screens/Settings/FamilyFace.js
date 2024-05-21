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
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SERVER_IP } from "@env";
import { getData } from "../../../localStorage";
import Axios from "axios";

export default function FamilyFace() {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [who, setWho] = useState("");
  const [fetched, setFetsched] = useState(false);
  const [refreshing, setRefreshing] = useState(true);

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

    const patientId = await getData("patientId");
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
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <TouchableOpacity style={styles.upload} onPress={pickImage}>
          <Text style={styles.textUpload}>Upload</Text>
          <Text style={styles.textUpload}>&gt;</Text>
        </TouchableOpacity>
        {image && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
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
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 33,
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    marginTop: 40,
    width: "40%",
    height: 170,
    borderRadius: 21,
    borderWidth: 3,
    borderColor: "black",
  },
  image3: {
    marginTop: 40,
    width: "60%",
    height: 170,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  inputField: {
    borderWidth: 2,
    width: "90%",
    height: 50,
    borderRadius: 21,
    padding: 10,
    fontWeight: "bold",
    fontSize: 17,
    marginBottom: 5,
  },
  PicWithHim: {
    display: "flex",
    borderRadius: 20,
    height: 40,
    width: "95%",
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5390D9",
    flexDirection: "row",
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
    borderRadius: 20,
    height: 40,
    width: "95%",
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0C9500",
    flexDirection: "row",
    marginBottom: 5,
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
    flexDirection: "column",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 31,
  },
});
