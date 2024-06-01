import { useState, useEffect } from "react";
import {
  APIProvider,
  InfoWindow,
  Map,
  Marker,
} from "@vis.gl/react-google-maps";

import io from "socket.io-client";
import Brain from "./assets/pointer.svg";

export default function Maps() {
  const [markerPos, setMarkerPos] = useState({
    lat: 36.7313881,
    lng: 3.1832396,
  });
  const [open, setOpen] = useState(false);

  // const [socketIO, setSocketIO] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:3000");

    // Event listener for receiving messages from the server
    socket.on("patientLoc", (msg) => {
      setMarkerPos(msg);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  console.log(markerPos);
  const position = { lat: markerPos.lat, lng: markerPos.lng };
  return (
    <APIProvider apiKey={"AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg"}>
      <div className="h-screen">
        <Map defaultZoom={20} defaultCenter={position} center={position}>
          <Marker
            position={position}
            icon={Brain}
            onClick={() => setOpen(true)}
          />
          {open && (
            <InfoWindow
              position={{ lat: markerPos.lat, lng: markerPos.lng }}
              onCloseClick={() => setOpen(false)}
            >
              <div></div>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
}
