import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import io from "socket.io-client";
import pointer from "../../../assets/pointer.png";

const INITIANL_REGION = {
  latitude: 36.7125,
  longitude: 3.1822,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default function Track({ route }) {
  const [markerPos, setMarkerPos] = useState({
    latitude: 36.7125,
    longitude: 3.1822,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [open, setOpen] = useState(false);

  const [socketIO, setSocketIO] = useState(null);

  useEffect(() => {
    const socket = io(`http://${process.env.SERVER_IP}:3000`);

    // Event listener for receiving messages from the server

    // console.log("socket", socket);

    socket.on("patientLoc", (msg) => {
      // console.log("msg");
      // console.log(msg.lat, msg.lng);
      setMarkerPos({
        latitude: msg.lat,
        longitude: msg.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  const { patientName } = route.params;
  console.log(markerPos);
  // console.log("position", position);
  return (
    <SafeAreaView style={styles.container} className="bg-[#f2f1ff] flex-1">
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
        Track {patientName}
      </Text>
      <View className="flex-1">
        <MapView
          className=" w-full h-full"
          initialRegion={INITIANL_REGION}
          initialCamera={{
            center: {
              latitude: markerPos.latitude,
              longitude: markerPos.longitude,
            },
            pitch: 0,
            heading: 0,
            altitude: 0,
            zoom: 15,
          }}
          showsUserLocation={true}
          provider={PROVIDER_GOOGLE}
        >
          <Marker
            title="Patient Location"
            coordinate={{
              latitude: markerPos.latitude,
              longitude: markerPos.longitude,
            }}
          >
            <Image source={pointer} style={{ width: 30, height: 30 }} />
          </Marker>
        </MapView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#f2f1ff",
  },
});
