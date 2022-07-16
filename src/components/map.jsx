import React ,{useEffect, useState} from "react";
import Map, {
  Source,
  GeolocateControl,
  Marker,
  NavigationControl,
  Layer,
} from "react-map-gl";
import {render} from 'react-dom';
// makes clean rendering of the map possible without lagging
import "mapbox-gl/dist/mapbox-gl.css";
import "../css/map.css";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1Ijoic2FpY29kZSIsImEiOiJjbDN2bGZvdWEwMHlrM2ptbWkxZ3NzNzR3In0.KfvayvxbFTIVWeR6yH0rxA";

const INITIAL_VIEW_STATE = {
  longitude: 9.49,
  latitude: 47.66,
  zoom: 13,
  pitch: 0,
  bearing: 0,
  projection: "globe",
};
/* eslint-disable-next-line */
let map;

var navigationRoute = {
  type: 'FeatureCollection',
  features: [
    {type: 'Route', geometry: {type: 'LineString', coordinates: []}}
  ]
};



/**
 *
 * @return {JSX.Element} - Map Component
 * @param {object} props - props of the component
 * @constructor
 */
export default function MyMap(props) {
  const [navJson, setNavJson] = useState(null);

  useEffect(() => {
    const animation = window.requestAnimationFrame(() => {
      setNavJson(navigationRoute);
    }
    );
    return () => {
      window.cancelAnimationFrame(animation);
    }
  }
  );
  

  

  let gps = false;
/*
  var navJson = {
    type: 'FeatureCollection',
    features: [
      {type: 'Route', geometry: {type: 'LineString', coordinates: [[9.49, 47.66], [9.50, 47.66], [9.50, 47.67]]}}
    ]
  };*/

  const layerStyle = {
    id: "point",
    type: "line",
    paint: {
      "line-color": "#ff2d55",
      "line-width": 5,
    },
    
  };

  /**
   *
   * @param {string} str
   * @param {number} precision
   * @return {array} Arrray of lat/lon coordinates
   */
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
        byte = str.charCodeAt(index++) - 63;
        1;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);

      latitudeChange = result & 1 ? ~(result >> 1) : result >> 1;

      shift = result = 0;

      do {
        byte = str.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);

      longitudeChange = result & 1 ? ~(result >> 1) : result >> 1;

      lat += latitudeChange;
      lng += longitudeChange;

      coordinates.push([lat / factor, lng / factor]);
    }

    return coordinates;
  }

  /**
   *
   * @param {num} startLat
   * @param {num} startLon
   * @param {num} endLat
   * @param {num} endLon
   */
  function drawRoute(startLat, startLon, endLat, endLon) {
    // call the rounting api
    const url = `https://router.project-osrm.org/route/v1/driving/${startLat},${startLon};${endLat},${endLon}?overview=false&alternatives=true&steps=true&hints=%3B`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // and draw a spline of the route on the map
        const steps = data.routes[0].legs[0].steps;
        for (let i = 0; i < steps.length; i++) {
          const coords = steps[i].intersections.map(
            (intersection) => intersection.location
          );
          const line = {
            sourcePosition: coords[0],
            targetPosition: coords[1],
            polyline: decodePolyline(steps[i].geometry, 5),
          };
          steps[i] = line;
          for (let j = 0; j < line.polyline.length; j++) {
            navigationRoute.features[0].geometry.coordinates.push(line.polyline[j]);
          }
        }
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
      >
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          showUserHeading={true}
          showAccuracyCircle={false}
          position="bottom-right"
          onGeolocate={(position) => {
            console.log(position);
            if (!gps) {
              drawRoute(
                position.coords.latitude,
                position.coords.longitude,
                47.67,
                9.5
              );
            }
            gps = true;
          }}
        />
        <NavigationControl visualizePitch={true} />
        {
        navJson && (
        <Source id="navigation" type="geojson" data={navJson}>
          <Layer {...layerStyle} sourceId="navigation" />
        </Source>
        )}
        <Marker latitude={47.66} longitude={9.49} anchor="bottom">
          <img src="/icons/marker_darkm.svg" />
        </Marker>
      </Map>
    </div>
  );
}


export function renderToDom(container) {
  render(<MyMap />, container);
}