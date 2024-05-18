import { useEffect, useState } from "react";
import {
  ScrollView,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Axios } from "axios";
import { SERVER_IP } from "@env";

const pickImage2 = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.image,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  console.log(result.assets[0].uri);
};

export default function FamilyFace() {
  const [image, setImage] = useState(null);

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

    console.log(result.assets[0].uri);
  };
  useEffect(async () => {
    Axios.put(`http://${SERVER_IP}:4000/upload`, {
      
    }).then((response) => {});
  }, [image]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.upload} onPress={pickImage}>
        <Text style={styles.textUpload}>Upload</Text>
        <Text style={styles.textUpload}>&gt;</Text>
      </TouchableOpacity>
      {image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
          <View style={styles.image3}>
            <TextInput placeholder="Who (Name)" style={styles.inputField} />
            <TextInput
              placeholder="Who is it? (Son,...)"
              style={styles.inputField}
            />
            <TouchableOpacity style={styles.PicWithHim}>
              <Text style={styles.textUPicWithHim} onPress={pickImage2}>
                Picture with Him
              </Text>
              <Text style={styles.textUPicWithHim}>&gt;</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Submit}>
              <Text style={styles.textSubmit}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
    height: 40,
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
    height: 35,
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
});
