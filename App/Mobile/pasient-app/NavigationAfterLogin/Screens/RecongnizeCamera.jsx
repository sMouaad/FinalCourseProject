import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import Constants from "expo-constants";
import { CameraView, Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import Axios from "axios";
import Button from "./ButtonCamera";
import { getData } from "../../localStorage";

// import useFetch from "../../MyHooks/useFetch";

export function RecongnizeCamera() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [flashMode, setFlashMode] = useState(Camera.Constants?.FlashMode?.on);
  const cameraRef = useRef(null);
  const [fetched, setFetsched] = useState(false);
  const [fetchedData, setFetschedData] = useState({});
  // const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();

      const cameraStatus = await Camera.requestCameraPermissionsAsync();

      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        setFetsched(false);
        setModalVisible(true);

        console.log(data);
        setImage(data.uri);

        const id = await getData("patientId");

        const parts = data.uri.split("/");
        const image_name = parts[parts.length - 1];

        const formData = new FormData();
        formData.append("file", {
          uri: data.uri,
          name: image_name,
          type: "image/jpeg" || "image/png",
        });

        Axios.post(
          `http://${process.env.FastAPI}/image_uploaded_by_patient/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
          .then((response) => {
            // console.log(response.data);
            setFetschedData(response.data);
            setFetsched(true);
          })
          .catch((error) => {
            console.log(error + "you");
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const savePicture = async () => {
    if (image) {
      try {
        const asset = await MediaLibrary.createAssetAsync(image);
        setImage(null);
        console.log("saved successfully");
      } catch (error) {
        console.log(error);
      }
    }
  };

  function toggleFlashMode() {
    setFlashMode((current) =>
      current === Camera.Constants?.FlashMode?.off
        ? Camera.Constants?.FlashMode?.torch
        : Camera.Constants?.FlashMode?.off
    );
  }

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!image ? (
        <CameraView
          style={styles.camera}
          type={Camera.Constants?.Type?.face}
          ref={cameraRef}
          facing={"back"}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              paddingHorizontal: 30,
            }}
          >
            <Button
              onPress={toggleFlashMode}
              icon="flash"
              // color={
              //   flash === Camera.Constants?.FlashMode?.off ? "gray" : "#fff"
              // }
            />
          </View>
        </CameraView>
      ) : (
        <Image source={{ uri: image }} style={styles.camera}></Image>
      )}

      <View style={styles.controls}>
        {image ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 50,
            }}
          >
            <Button
              title="Re-take"
              onPress={() => setImage(null)}
              icon="retweet"
            />
            <Button title="Save" onPress={savePicture} icon="check" />
          </View>
        ) : (
          <Button title="Take a picture" onPress={takePicture} icon="camera" />
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        // style={styles.centeredView}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        {!fetched && (
          // <ScrollView
          //   contentContainerStyle={styles.scrollViewActivityIndicator}
          //   refreshControl={
          //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          //   }
          // >
          <View className="flex-1 justify-center">
            <ActivityIndicator size={"large"} />
          </View>
          // </ScrollView>
        )}

        {fetched && (
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modale</Text>
              </Pressable>
              <View style={styles.messageContainer}>
                <Image
                  source={{ uri: fetchedData.url }}
                  style={styles.profileImage}
                />
                <View style={styles.messageContent}>
                  <Text style={styles.senderName}>{fetchedData.name}</Text>
                  <Text style={styles.messageContent}>{fetchedData.who}</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#000",
    padding: 8,
  },
  controls: {
    flex: 0.5,
  },
  button: {
    height: 40,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#E9730F",
    marginLeft: 10,
  },
  camera: {
    flex: 5,
    borderRadius: 20,
  },
  topControls: {
    flex: 1,
  },
  centeredView: {
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
  },
  modalView: {
    backgroundColor: "white",
    margin: 20,
    marginBottom: 65,
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  messageContainer: {
    flexDirection: "row",
    padding: 20,
    paddingHorizontal: 28,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 16,
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
