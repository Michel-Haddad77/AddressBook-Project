import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from "leaflet";

function Map({coordinates}) {
    console.log("from map=>" , coordinates);
  return (
    <MapContainer center={coordinates} zoom={12}scrollWheelZoom={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={coordinates}/>
    </MapContainer>
  );
}

export default Map;