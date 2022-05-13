import React, { useState } from "react";

import { MapContainer, TileLayer,} from "react-leaflet";
import { useRef } from "react";
import L from "leaflet"
//makes clean rendering of the map possible without lagging
import "leaflet/dist/leaflet.css";

const MyMap = () => {
    const [center, setCenter] = useState({ lat: 47.6618, lng: 9.48 });
    const ZOOM_LEVEL = 7;
    const mapRef = useRef();
    const MIN_ZOOM = 3;
    var SOUTHWEST = L.latLng(-89.98155760646617, -180);
    var NORTHEAST = L.latLng(89.99346179538875, 180);
    //will prevent the user from moving out of the map bounds
    const BOUNDS = L.latLngBounds(SOUTHWEST, NORTHEAST);

    //return the MapContainer
    return (
        <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef} minZoom = {MIN_ZOOM} maxBounds = {BOUNDS}>
            <TileLayer
                url={"https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=zuWv6WszYelAVMVuJZe3"}
                attribution={'<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'}
            />
        </MapContainer>
    );
};

export default MyMap;
