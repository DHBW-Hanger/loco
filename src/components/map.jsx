import React from 'react';
import {GeoJsonLayer} from '@deck.gl/layers';
import Map, {GeolocateControl, Marker, NavigationControl} from 'react-map-gl';
// makes clean rendering of the map possible without lagging
import 'mapbox-gl/dist/mapbox-gl.css';
import '../css/map.css';

const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1Ijoic2FpY29kZSIsImEiOiJjbDN2bGZvdWEwMHlrM2ptbWkxZ3NzNzR3In0.KfvayvxbFTIVWeR6yH0rxA';

const INITIAL_VIEW_STATE = {
  longitude: 9.49,
  latitude: 47.66,
  zoom: 13,
  pitch: 0,
  bearing: 0,
  projection: 'globe',

};

let map;

/**
 *
 * @return {JSX.Element} - Map Component
 * @param {object} props - props of the component
 * @constructor
 */
export default function MyMap(props) {
  let gps = false;


  const layers = [new GeoJsonLayer({
    id: 'GeoJsonLayer',
    data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart.geo.json',

    /* props from GeoJsonLayer class */

    // elevationScale: 1,
    extruded: true,
    filled: true,
    getElevation: 30,
    getFillColor: [160, 160, 180, 200],
    // getIconAngle: 0,
    // getIconColor: [0, 0, 0, 255],
    // getIconPixelOffset: [0, 0],
    // getIconSize: 1,
    getLineColor: (f) => {
      const hex = f.properties.color;
      // convert to RGB
      return hex ? hex.match(/[0-9a-f]{2}/g).map((x) => parseInt(x, 16)) : [0, 0, 0];
    },
    getLineWidth: 20,
    getPointRadius: 4,
    getText: (f) => f.properties.name,
    getTextSize: 12,
    lineWidthMinPixels: 2,
    pointRadiusUnits: 'pixels',
    pointType: 'circle+text',
    stroked: false,
    pickable: true,
    // visible: true,
    // wrapLongitude: false,
  }),
  ];

  function decodePolyline(str, precision) {
    let index = 0;
    let lat = 0;
    let lng = 0;
    const coordinates = [];
    let shift = 0;
    let result = 0;
    let byte = null;
    let latitudeChange;
    let longitudeChange;
    const factor = Math.pow(10, Number.isInteger(precision) ? precision : 5);

    // Coordinates have variable length when encoded, so just keep
    // track of whether we've hit the end of the string. In each
    // loop iteration, a single coordinate is decoded.
    while (index < str.length) {
      // Reset shift, result, and byte
      byte = null;
      shift = 0;
      result = 0;

      do {
        byte = str.charCodeAt(index++) - 63; 1;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);

      latitudeChange = ((result & 1) ? ~(result >> 1) : (result >> 1));

      shift = result = 0;

      do {
        byte = str.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);

      longitudeChange = ((result & 1) ? ~(result >> 1) : (result >> 1));

      lat += latitudeChange;
      lng += longitudeChange;

      coordinates.push([lat / factor, lng / factor]);
    }

    return coordinates;
  };


  function drawRoute(startLat, startLon, endLat, endLon) {
    // call the rounting api
    const url = `https://router.project-osrm.org/route/v1/driving/${startLat},${startLon};${endLat},${endLon}?overview=false&alternatives=true&steps=true&hints=%3B`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
        // and draw a spline of the route on the map
          const steps = data.routes[0].legs[0].steps;
          for (let i = 0; i < steps.length; i++) {
            const coords = steps[i].intersections.map((intersection) => intersection.location);
            const line = {
              sourcePosition: coords[0],
              targetPosition: coords[1],
              polyline: decodePolyline(steps[i].geometry, 5),
            };
            steps[i] = line;
          }
          // turn the stepts into a geojson object
          const geojson = {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: {
                  color: '#fc2c54',
                },
                geometry: {
                  type: 'LineString',
                  coordinates: steps.map((step) => step.polyline),
                },
              },
            ],
          };


          layers[0] = new GeoJsonLayer({
            id: 'route',
            data: geojson,
            getLineColor: [255, 0, 0],
            getLineWidth: 5,
          });
        });
  }


  return (
    <div className="Map">
      <Map
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        initialViewState={INITIAL_VIEW_STATE}
        mapStyle="mapbox://styles/saicode/cl5h2uo72001914payehixo71"
        onLoad={(loadedmap) => {
          map = loadedmap;
        }}
        layers={layers}
      >
        <GeolocateControl
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
          showUserHeading={true}
          showAccuracyCircle={true}
          position='bottom-right'
          onGeolocate={(position) => {
            console.log(position);
            if (!gps) {
              drawRoute(position.coords.latitude, position.coords.longitude, 47.67, 9.50);
            }
            gps = true;
          }
          }
        />
        <NavigationControl
          visualizePitch={true}
        />
        <Marker
          latitude={47.66}
          longitude={9.49}
          anchor="bottom">
          <img src="/icons/marker_darkm.svg" />
        </Marker>

      </Map>
    </div>
  );
}
