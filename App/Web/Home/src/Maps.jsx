import { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
export default function Maps() {
  const position = { lat: 36.68351349669975, lng: 3.0717719900568627 };
  return (
    <APIProvider apiKey="AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg">
      <div className="h-screen">
        <Map zoom={9} center={position}></Map>
      </div>
    </APIProvider>
  );
}
