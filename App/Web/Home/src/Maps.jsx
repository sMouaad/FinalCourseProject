import { useState, useEffect } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

import io from "socket.io-client";
import Brain from "./assets/pointer.svg";
export default function Maps() {
  // const [markerPos, setMarkerPos] = useState({});
  // const [socketIO, setSocketIO] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:3000");

    // Send Message to the Server
    socket.emit("msg", "Hello from the client!");

    // Event listener for receiving messages from the server
    socket.on("gps", (msg) => {
      console.log("message: " + msg);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  const position = { lat: 36.68351349669975, lng: 3.0717719900568627 };
  return (
    <APIProvider apiKey="AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg">
      <div className="h-screen">
        <Map defaultZoom={9} center={position}>
          <Marker position={position} icon={Brain}></Marker>
        </Map>
      </div>
    </APIProvider>
  );
}
