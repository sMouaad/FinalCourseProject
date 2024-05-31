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
  latitude: 36.7316582,
  longitude: 3.1833552,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default function Track({ route }) {
  const [markerPos, setMarkerPos] = useState({
    lat: 36.7313881,
    lng: 3.1832396,
  });
  const [open, setOpen] = useState(false);

  const [socketIO, setSocketIO] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:3000");

    // Event listener for receiving messages from the server
    socket.on("patientLoc", (msg) => {
      setMarkerPos({
        latitude: msg.lat,
        latitude: msg.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  const { patientName } = route.params;
  const position = { lat: markerPos.lat, lng: markerPos.lng };
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
              latitude: position.lat,
              longitude: position.lng,
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
            coordinate={{ latitude: 36.7316582, longitude: 3.1833552 }}
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
