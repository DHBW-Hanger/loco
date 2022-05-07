import React, { useState } from "react";

import { MapContainer, TileLayer } from "react-leaflet";
import { useRef } from "react";
import "leaflet/dist/leaflet.css";

const MyMap = () => {
    const [center, setCenter] = useState({ lat: 47.6618, lng: 9.48 });
    const ZOOM_LEVEL = 9;
    const mapRef = useRef();

    //return the MapContainer
    return (
        <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
            <TileLayer
                url={"https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=zuWv6WszYelAVMVuJZe3"}
                attribution={'<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'}
            />
        </MapContainer>
    );
};

export default MyMap;
