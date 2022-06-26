import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useState } from "react";
import { Icon } from "leaflet";

function LocationMarker({coordinates}) {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
        resize() {
        setPosition(coordinates)
        map.flyTo(coordinates, map.getZoom())
      },
    })
    
    return position === null ? null : (
      <Marker position={position}>
      </Marker>
    )
  }

function Map({coordinates}) {
    console.log("from map=>", coordinates);
  return (
    <MapContainer center={[33.893106, 35.480221]} zoom={12} scrollWheelZoom={true}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker coordinates={coordinates} />
    </MapContainer>
  );
}

export default Map;