import React, {useState} from "react";

import {MapContainer, Marker, TileLayer} from "react-leaflet";
import {useRef} from "react";
import L from "leaflet"
//makes clean rendering of the map possible without lagging
import "leaflet/dist/leaflet.css";

const MyMap = () => {
  const [center, setCenter] = useState({lat: 47.6618, lng: 9.48});
  const [currentPosition, setCurrentPosition] = useState(null);
  const ZOOM_LEVEL = 9;
  const tileSize = '256';
  const [mapStyle, setMapStyle] = useState('streets');
  const scale = '@2x';
  const apiKey = 'zuWv6WszYelAVMVuJZe3';
  const mapRef = useRef();
  const MIN_ZOOM = 3;
  const SOUTHWEST = L.latLng(-89.98155760646617, -180);
  const NORTHEAST = L.latLng(89.99346179538875, 180);
  //will prevent the user from moving out of the map bounds
  const BOUNDS = L.latLngBounds(SOUTHWEST, NORTHEAST);

  const icon = L.icon({
    iconUrl: '/icons/currentLocation.svg',
    iconSize: [20, 20]
  });

  if (navigator.geolocation) {
    navigator.geolocation.watchPosition((position) => {
      setCurrentPosition([
        position.coords.latitude,
        position.coords.longitude
      ])
    }, () => {
      console.warn('Unable to retrieve your location')
    }, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    })
  } else {
    alert('Geolocation is not supported by your browser!')
  }

  //return the MapContainer
  if (currentPosition == null) {
    return (
      <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef} minZoom={MIN_ZOOM} maxBounds={BOUNDS}>
        <TileLayer
          url={`https://api.maptiler.com/maps/${mapStyle}/${tileSize}/{z}/{x}/{y}${scale}.png?key=${apiKey}`}
          attribution={'<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a>' +
            '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'}
        />
      </MapContainer>
    );
  } else {
    return (
      <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef} minZoom={MIN_ZOOM} maxBounds={BOUNDS}>
        <TileLayer
          url={`https://api.maptiler.com/maps/${mapStyle}/${tileSize}/{z}/{x}/{y}${scale}.png?key=${apiKey}`}
          attribution={'<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a>' +
            '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'}
        />
        <Marker position={currentPosition} icon={icon}/>
      </MapContainer>
    );
  }
};

export default MyMap;
