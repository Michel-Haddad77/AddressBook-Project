import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import { useState, useRef, useMemo } from "react";
import { Icon } from "leaflet";

//for flying to contact location
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

  //for adding new location
  function DraggableMarker(setLoc) {
    const [position, setPosition] = useState([33.893106, 35.480221])
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
            setPosition(marker.getLatLng());
            setLoc(marker.getLatLng());
          }
        },
      }),
      [],
    )
  
    return (
      <Marker
        draggable={true}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}>
      </Marker>
    )
  } 

function Map({coordinates, forAdding, setLoc}) {
    console.log("from map=>", coordinates);
  return (
    <MapContainer center={[33.893106, 35.480221]} zoom={12} scrollWheelZoom={true}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {forAdding?
        <DraggableMarker setLoc={setLoc}/> : <LocationMarker coordinates={coordinates} />
      }
    </MapContainer>
  );
}

export default Map;