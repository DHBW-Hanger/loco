import React, {useEffect, useState} from 'react';
import {useRef} from 'react';
import L from 'leaflet';
import Routing from 'leaflet-routing-machine'; // eslint-disable-line
// makes clean rendering of the map possible without lagging
import 'leaflet/dist/leaflet.css';
import '../css/map.css';
import 'leaflet-groupedlayercontrol/dist/leaflet.groupedlayercontrol.min.js';

// icon for current position
const icon = L.icon({
  iconUrl: '/icons/currentLocation.svg',
  iconSize: [20, 20],
});
const targetIcon = L.icon({
  iconUrl: '/icons/map-pin.svg',
  iconSize: [40, 100],
  iconAnchor: [20, 70],
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
  const apiKeyMaptiler = 'zuWv6WszYelAVMVuJZe3';
  const apiKeyMapbox = 'pk.eyJ1Ijoic2FpY29kZSIsImEiOiJjbDN2bGZvdWEwMHlrM2ptbWkxZ3NzNzR3In0.KfvayvxbFTIVWeR6yH0rxA';
  const mapRef = useRef();
  const MIN_ZOOM = 3;
  const SOUTHWEST = L.latLng(-89.98155760646617, -180);
  const NORTHEAST = L.latLng(89.99346179538875, 180);
  // will prevent the user from moving out of the map bounds
  const BOUNDS = L.latLngBounds(SOUTHWEST, NORTHEAST);

  useEffect((e) => {
    const mapStyles = {
      Streets: L.tileLayer(
          `https://api.maptiler.com/maps/streets/${tileSize}/{z}/{x}/{y}${scale}.png?key=${apiKeyMaptiler}`, {className: 'map-tiles'},
      ),
      Outdoor: L.tileLayer(
          `https://api.maptiler.com/maps/outdoor/${tileSize}/{z}/{x}/{y}${scale}.png?key=${apiKeyMaptiler}`, {className: 'map-tiles'},
      ),
      OpenStreetMap: L.tileLayer(
          `https://api.maptiler.com/maps/openstreetmap/${tileSize}/{z}/{x}/{y}${scale}.jpg?key=${apiKeyMaptiler}`, {className: 'map-tiles'},
      ),
      Satellite: L.tileLayer(
          `https://api.maptiler.com/maps/hybrid/${tileSize}/{z}/{x}/{y}${scale}.jpg?key=${apiKeyMaptiler}`,
      ),
      Satellite2: L.tileLayer(
          `https://api.mapbox.com/styles/v1/saicode/cl3vlmr9q000l15olo7qu7mh0/tiles/${tileSize}/{z}/{x}/{y}${scale}?access_token=${apiKeyMapbox}`,
      ),
      Streets2: L.tileLayer(
          `https://api.mapbox.com/styles/v1/saicode/cl3vm2qoz003114o2hcvm46nw/tiles/${tileSize}/{z}/{x}/{y}${scale}?access_token=${apiKeyMapbox}`,
      ),
    };


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
    let followLocation = false;
    const targetLocation = L.latLng(47.66, 9.49);
    let navigation = null;
    let lastPosition = null;
    L.marker(targetLocation, {icon: targetIcon}).addTo(map);

    /**
     * Add location marker to map if location found
     *
     * @param {Object} e - location Data
     */
    function onLocationFound(e) {
      if (locationMarker == null) {
        locationMarker = L.marker(e.latlng, {icon}).addTo(map);
        if (navigation == null) {
          startNavigation(e, targetLocation);
          lastPosition = e.latlng;
        }
      } else {
        locationMarker.setLatLng(e.latlng);
        // if the location has changed, update the navigation
        if (Math.abs(e.latlng.lat - lastPosition.lat) > 0.00001 || Math.abs(e.latlng.lng - lastPosition.lng) > 0.00001) {
          console.log('location changed | ' + (e.latlng.lat - lastPosition.lat) + ' ' + (e.latlng.lng - lastPosition.lng));
          lastPosition = e.latlng;
          if (navigation != null) {
            console.log('navigation changed');
            navigation;
            navigation.spliceWaypoints(0, 1, e.latlng);
          }
        }

        // center the view to the current location
        if (followLocation) {
          map.flyTo(e.latlng, 18);
        }
      }
    }

    /**
     * Start navigation
     *
     * @param {Object} e - location Data
     */
    function startNavigation(e) {
      navigation = L.Routing.control({
        waypoints: [
          e.latlng,
          targetLocation,
        ],
        routeWhileDragging: false,
        /* router: new Routing.OSRMv1({
          serviceUrl: 'https://router.project-osrm.org/route/v1',
        }),*/
        show: false,
        addWaypoints: false,
        collapsible: false,
        draggableWaypoints: false,
        lineOptions: {
          styles: [
            {color: '#fc2c54', opacity: 1, weight: 6},
          ],
        },
        createMarker: function() {
          return null;
        },
        fitSelectedRoutes: false,
      }).addTo(map);
      followLocation = true;
    }

    map.on('locationfound', onLocationFound);
    map.on('mousedown', () => {
      followLocation = false;
      console.log('climousedown');
    });

    // new L.Control.Zoom({ position: 'topleft' }).addTo(map);
    L.control.scale({imperial: false}).addTo(map);
    L.control.groupedLayers(mapStyles, {}, {position: 'bottomleft'}).addTo(map);
  }, []);

  return <div id="map" className="map"/>;
}
