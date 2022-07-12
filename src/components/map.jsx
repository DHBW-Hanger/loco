import React, {useEffect} from 'react';
import {useRef} from 'react';
import L from 'leaflet';
import Routing from 'leaflet-routing-machine' // eslint-disable-line

// makes clean rendering of the map possible without lagging
import 'leaflet/dist/leaflet.css';
import '../css/map.css';
import 'leaflet-groupedlayercontrol/dist/leaflet.groupedlayercontrol.min.js';

// icon for current position
const icon = L.icon({
  iconUrl: '/icons/currentLocation.svg', iconSize: [20, 20],
});

// icon for target position
let targetIcon = L.icon({
  iconUrl: '/icons/marker_lightm.svg',
  iconSize: [32, 32],
  iconAnchor: [13, 28],
});

/**
 *
 * @return {JSX.Element} - Map Component
 * @param {object} props - props of the component
 * @constructor
 */
export default function MyMap(props) {
  // default map props
  const center = {lat: 47.67, lng: 9.46};
  const ZOOM_LEVEL = 13;
  const tileSize = '256';
  const scale = '@2x';
  const apiKeyMaptiler = 'zuWv6WszYelAVMVuJZe3';
  const apiKeyMapbox = 'pk.eyJ1Ijoic2FpY29kZSIsImEiOiJjbDN2bGZvdWEwMHlrM2ptbWkxZ3NzNzR3In0.KfvayvxbFTIVWeR6yH0rxA';
  const mapRef = useRef();
  const MIN_ZOOM = 3;

  // will prevent the user from moving out of the map bounds
  const SOUTHWEST = L.latLng(-89.98155760646617, -180);
  const NORTHEAST = L.latLng(89.99346179538875, 180);
  const BOUNDS = L.latLngBounds(SOUTHWEST, NORTHEAST);
  /*
  function isOnline(){
    var url = {
      cache: false,
      dataType: "jsonp",
      async: true,
      crossDomain:true,
      url: $("https://locomap.de/").val(),
      method: "GET",
      statusCode: {
        200: function (response) {
          console.log("online");
        },
        200: function (response) {
          console.log("offline");
        },
        0: function (response) {
          console.log("offline");
        },
      },
    };
    $.ajax(url).done(function (response) {
      console.log(response);
    });

1
  };
  isOnline();*/
  // tile layers
  useEffect(() => {
    const mapStyles = {
      // the mapbox maps
      Streets: L.tileLayer(
          `https://api.maptiler.com/maps/streets/${tileSize}/{z}/{x}/{y}${scale}.png?key=${apiKeyMaptiler}`,
          {className: 'map-tiles'},
      ),
      Satellite: L.tileLayer(
          `https://api.mapbox.com/styles/v1/saicode/cl3vlmr9q000l15olo7qu7mh0/tiles/${tileSize}/{z}/{x}/{y}${scale}?access_token=${apiKeyMapbox}`),
      Outdoor: L.tileLayer(
          `https://api.maptiler.com/maps/outdoor/${tileSize}/{z}/{x}/{y}${scale}.png?key=${apiKeyMaptiler}`,
          {className: 'map-tiles'},
      ),
      OpenStreetMap: L.tileLayer(
          `https://api.maptiler.com/maps/openstreetmap/${tileSize}/{z}/{x}/{y}${scale}.jpg?key=${apiKeyMaptiler}`,
          {className: 'map-tiles'},
      ),
      Streets2: L.tileLayer(
          `https://api.mapbox.com/styles/v1/saicode/cl3vm2qoz003114o2hcvm46nw/tiles/${tileSize}/{z}/{x}/{y}${scale}?access_token=${apiKeyMapbox}`,
      ), /*
      TODO Unused map layers, replaced with mapbox

      Satellite2: L.tileLayer(
        `https://api.maptiler.com/maps/hybrid/${tileSize}/{z}/{x}/{y}${scale}.jpg?key=${apiKeyMaptiler}`,
      ),
      */
    };

    // if dark mode is enabled replace the map tiles with the dark mode tiles
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      mapStyles.Streets = L.tileLayer(
          `https://api.mapbox.com/styles/v1/saicode/cl3vmc8mn000n15tjzpdykchq/tiles/256/{z}/{x}/{y}@2x?access_token=${apiKeyMapbox}`,
      );
      targetIcon = L.icon({
        iconUrl: '/icons/marker_darkm.svg', iconSize: [32, 32], iconAnchor: [13, 28],
      });
    }

    if (window.navigator.onLine == false) {
      mapStyles.Streets = L.tileLayer(
          '/img/Offline-tile.png',
      );
    }

    // TODO add comment
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      console.log('Darkmode changed to ' + e.matches);
      if (e.matches) {
        mapStyles.Streets = L.tileLayer(
            `https://api.mapbox.com/styles/v1/saicode/cl3vmc8mn000n15tjzpdykchq/tiles/256/{z}/{x}/{y}@2x?access_token=${apiKeyMapbox}`,
        );
        targetIcon = L.icon({
          iconUrl: '/icons/marker_darkm.svg', iconSize: [32, 32], iconAnchor: [13, 28],
        });
      } else {
        mapStyles.Streets = L.tileLayer(
            `https://api.maptiler.com/maps/streets/${tileSize}/{z}/{x}/{y}${scale}.png?key=${apiKeyMaptiler}`,
        );
        targetIcon = L.icon({
          iconUrl: '/icons/marker_lightm.svg', iconSize: [32, 32], iconAnchor: [13, 28],
        });
      }
      map.removeLayer(mapStyles.Streets);
      map.addLayer(mapStyles.Streets);
    });
    window.addEventListener('offline', () => mapStyles.Streets = L.tileLayer(
        '/img/Offline-tile.png',
    ));


    // create map with given props
    const map = L.map('map', {
      center: center, zoom: ZOOM_LEVEL, ref: mapRef, minZoom: MIN_ZOOM, maxBounds: BOUNDS, zoomControl: false, layers: [mapStyles.Streets],
    });

    // initialize marker props
    let locationMarker = null;
    let lastPosition = null;

    let navigation = null;
    let followLocation = false;

    let currentCoords = null;
    map.locate({watch: true});

    /**
     * Add location marker to map if location found
     *
     * @param {object} e - location Data
     */
    map.on('locationfound', (e) => {
      currentCoords = e.latlng;

      // if no marker exists yet, create one
      if (locationMarker == null) {
        locationMarker = L.marker(currentCoords, {icon}).addTo(map);

        if (navigation == null) {
          startNavigation(currentCoords, targetLocation);
          lastPosition = currentCoords;
        }
        // if marker exists, update its position
      } else {
        locationMarker.setLatLng(currentCoords);

        // if the location has changed, update the navigation or add a new one
        if (Math.abs(currentCoords.lat - lastPosition.lat) > 0.00001 || Math.abs(currentCoords.lng - lastPosition.lng) > 0.00001) {
          console.log('location changed | ' + (currentCoords.lat - lastPosition.lat) + ' ' + (currentCoords.lng - lastPosition.lng));
          lastPosition = currentCoords;

          if (navigation != null) {
            console.log('navigation changed');
            navigation.spliceWaypoints(0, 1, currentCoords);
          }
        }

        // TODO discuss if this is needed
        // center the view to the current location
        if (followLocation) {
          map.flyTo(currentCoords, 18);
        }
      }
    });

    let targetLocation = L.latLng(props.targetMarkerLocation.lat, props.targetMarkerLocation.lon);
    const targetMarker = L.marker(targetLocation, {icon: targetIcon, draggable: true, autoPan: true}).addTo(map);

    // update route when target marker is moved
    targetMarker.on('dragend', (e) => {
      targetLocation = e.target.getLatLng();
      navigation.remove();
      startNavigation(currentCoords, targetLocation);
      console.log('target marker moved');
    });

    targetMarker.on('click', (e) => {
      props.markerClickHandler(e.target.getLatLng());
    });

    /**
     * Start navigation
     *
     * @param {number[]} startLocation - start location
     * @param {number[]} targetLocation - target location
     */
    function startNavigation(startLocation, targetLocation) {
      navigation = L.Routing.control({
        waypoints: [startLocation, targetLocation],
        routeWhileDragging: false,
        draggable: false,
        show: false,
        addWaypoints: false,
        collapsible: false,
        draggableWaypoints: false,
        lineOptions: {
          styles: [
            {color: 'black', opacity: 0.2, weight: 9},
            {color: '#fc2c54', opacity: 1, weight: 6},
          ],
        }, createMarker: () => {
          // display wikipedia api info
          return null;
        },
        fitSelectedRoutes: true,
      });

      navigation.addTo(map);
      followLocation = true;
    }

    /**
     * Show the reset button if the user moved the map
     *
     */
    function showResetButton() {
      const slideContainer = document.getElementsByClassName('reset-button-field')[0];

      // TODO add comment
      slideContainer.classList.add('slide-in');
      slideContainer.classList.remove('slide-out');

      // get reset button from dom
      const resetButton = document.querySelector('input.recenter-button');

      // listen for input changes
      resetButton.addEventListener('change', () => {
        console.log('reset button changed');
        if (resetButton.checked) {
          followLocation = true;
          map.flyTo(lastPosition, 18);

          setTimeout(() => {
            hideResetButton();
          }, 500);

          setTimeout(() => {
            resetButton.checked = false;
          }, 1000);
        }
      });
    }

    /**
     * Hide the reset button after resetting the view
     *
     */
    function hideResetButton() {
      const slideContainer = document.getElementsByClassName('reset-button-field')[0];
      slideContainer.classList.add('slide-out');
      slideContainer.classList.remove('slide-in');
    }

    map.on('mousedown', () => {
      if (lastPosition != null) {
        followLocation = false;
        showResetButton();
      }
    });

    // add map controls
    new L.Control.Zoom({position: 'bottomright'}).addTo(map);
    L.control.scale({imperial: false}).addTo(map);
    L.control.groupedLayers(mapStyles, {}, {position: 'bottomleft'}).addTo(map);

    const routingInfo = L.control({position: 'bottomright'});
    routingInfo.onAdd = function() {
      this._div = L.DomUtil.create('div', 'routing-info');
      this.update();
      return this._div;
    };

    // method that we will use to update the control based on feature properties passed
    routingInfo.update = function() {
      this._div.innerHTML = '<div class="routing-info-button-field">' +
        '<input type="radio" id="routing-info-button" class="routing-info-button" name="switch-one" value="no" />' +
        '<label for="routing-info-button"><img src="/icons/help.svg" height="30" width="30" alt="routing-info"/></label>' + '</div>';
    };

    routingInfo.addTo(map);

    const info = L.control({position: 'bottomright'});
    info.onAdd = function() {
      this._div = L.DomUtil.create('div', 'slider');
      this.update();
      return this._div;
    };
    // method that we will use to update the control based on feature properties passed
    info.update = function() {
      this._div.innerHTML = '<div class="reset-button-field slide-out">' +
        '<input type="radio" id="recenter-button" class="recenter-button" name="switch-one" value="no" />' +
        '<label for="recenter-button"><img src="/icons/recenter.svg" height="30" width="30" alt="update"/></label>' + '</div>';
    };

    info.addTo(map);

    const help = L.control({position: 'bottomleft'});
    help.onAdd = function() {
      this._div = L.DomUtil.create('div', 'help');
      this.update();
      return this._div;
    };
    // method that we will use to update the control based on feature properties passed
    help.update = function() {
      this._div.innerHTML = '<div class="help-button-field">' +
          '<input type="radio" id="help-button" class="help-button" name="switch-one" value="no" />' +
          '<label for="help-button"><img src="/icons/help.svg" height="30" width="30" alt="help"/></label>' + '</div>';
    };
    help.addTo(map);

    const helpButton = document.querySelector('input.help-button');

    helpButton.addEventListener('click', () => {
      props.helpHandler();
    });
  }, []);

  return <div id="map" className="map"/>;
}
