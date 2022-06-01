import React, {useEffect, useState} from 'react';
import {useRef} from 'react';
import L from 'leaflet';
import Routing from 'leaflet-routing-machine';
// makes clean rendering of the map possible without lagging
import 'leaflet/dist/leaflet.css';
import '../css/map.css';
import 'leaflet-groupedlayercontrol/dist/leaflet.groupedlayercontrol.min.js';

// icon for current position
const icon = L.icon({
  iconUrl: '/icons/currentLocation.svg',
  iconSize: [20, 20],
});

/**
 *
 * @return {JSX.Element} - Map Component
 * @constructor
 */
export default function MyMap() {
  const [center] = useState({lat: 47.67, lng: 9.46}); // add setCenter when used
  const ZOOM_LEVEL = 13;
  const tileSize = '256';
  const scale = '@2x';
  const apiKey = 'zuWv6WszYelAVMVuJZe3';
  const mapRef = useRef();
  const MIN_ZOOM = 3;
  const SOUTHWEST = L.latLng(-89.98155760646617, -180);
  const NORTHEAST = L.latLng(89.99346179538875, 180);
  // will prevent the user from moving out of the map bounds
  const BOUNDS = L.latLngBounds(SOUTHWEST, NORTHEAST);

  useEffect(() => {
    const mapStyles = {
      Streets: L.tileLayer(
          `https://api.maptiler.com/maps/streets/${tileSize}/{z}/{x}/{y}${scale}.png?key=${apiKey}`, {className: 'map-tiles'},
      ),
      Outdoor: L.tileLayer(
          `https://api.maptiler.com/maps/outdoor/${tileSize}/{z}/{x}/{y}${scale}.png?key=${apiKey}`, {className: 'map-tiles'},
      ),
      OpenStreetMap: L.tileLayer(
          `https://api.maptiler.com/maps/openstreetmap/${tileSize}/{z}/{x}/{y}${scale}.jpg?key=${apiKey}`, {className: 'map-tiles'},
      ),
      Satellite: L.tileLayer(
          `https://api.maptiler.com/maps/hybrid/${tileSize}/{z}/{x}/{y}${scale}.jpg?key=${apiKey}`,
      ),
    };

    // document.getElementsByClassName( 'leaflet-control-attribution' )[0].style.display = 'none';

    const map = L.map('map', {
      center: center,
      zoom: ZOOM_LEVEL,
      ref: mapRef,
      minZoom: MIN_ZOOM,
      maxBounds: BOUNDS,
      zoomControl: false,
      layers: [mapStyles.Streets],
    });

    map.locate({watch: true});

    let locationMarker = null;

    /**
     * Add location marker to map if location found
     *
     * @param {Object} e - location Data
     */
    function onLocationFound(e) {
      if (locationMarker == null) {
        locationMarker = L.marker(e.latlng, {icon});
        locationMarker.addTo(map);
        //map.flyTo(e.latlng, 15);

        L.Routing.control({
          waypoints: [
            e.latlng,
            L.latLng(47.66, 9.49)
          ],
          lineOptions: {
            styles: [
              {color: 'black', opacity: 0.15, weight: 9},
              {color: "#ff2d55", opacity: 1, weight: 6}
            ]
          },
          addWaypoints: false
          
        }).addTo(map);
        
      } else {
        locationMarker.setLatLng(e.latlng);
      }
    }
    map.on('locationfound', onLocationFound);
    L.control.groupedLayers(mapStyles, {}, {position: 'bottomleft'}).addTo(map);
  }, []);
  
  return <div id="map" className="map"/>;
}
