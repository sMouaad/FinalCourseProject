import { useState, useEffect } from "react";
import {
  APIProvider,
  Map,
  Marker,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import io from "socket.io-client";
import socketIOClient from "socket.io-client";
import Brain from "./assets/pointer.svg";
export default function Maps() {
  const [markerPos, setMarkerPos] = useState({});
  useEffect(() => {
    const socket = socketIOClient("http://localhost:4000");

    socket.on("gps", (data) => {
      setMarkerPos({
        longitude: data[0],
        latitude: data[1],
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  const position = { lat: 36.68351349669975, lng: 3.0717719900568627 };
  return (
    <APIProvider apiKey="AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg">
      <div className="h-screen">
        <Map zoom={9} center={position}>
          <Marker position={position} icon={Brain}></Marker>
        </Map>
      </div>
    </APIProvider>
  );
}
