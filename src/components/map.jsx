import React from "react";
import { LineLayer } from "@deck.gl/layers";
import Map, { GeolocateControl, Marker, NavigationControl } from "react-map-gl";
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
  projection: 'globe'

};
const data = [
  {
    sourcePosition: [-122.41669, 37.7853],
    targetPosition: [-122.41669, 37.781],
  },
];

var map

/**
 *
 * @return {JSX.Element} - Map Component
 * @param {object} props - props of the component
 * @constructor
 */
export default function MyMap(props) {

  var gps = false;


  const layers = [new LineLayer({ id: "line-layer", data })];

  function drawRoute(start_lat, start_lon, end_lat, end_lon) {
    //call the rounting api
    var url = `https://router.project-osrm.org/route/v1/driving/${start_lat},${start_lon};${end_lat},${end_lon}?overview=false&alternatives=true&steps=true&hints=%3B`
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        //and draw a spline of the route on the map
        var steps = data.routes[0].legs[0].steps
        for (var i = 0; i < steps.length; i++) {
          var coords = steps[i].intersections.map(intersection => intersection.location)
          var line = {
            sourcePosition: coords[0],
            targetPosition: coords[1],
          }
          steps[i]=line
        }
        console.log(steps)
      })
    }


  return (
    <div className="Map">
      <Map
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        initialViewState={INITIAL_VIEW_STATE}
        mapStyle="mapbox://styles/saicode/cl5h2uo72001914payehixo71"
        onLoad={(loadedmap) => { map = loadedmap; }}
      >
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          showUserHeading={true}
          showAccuracyCircle={true}
          position='bottom-right'
          onGeolocate={(position) => {
            console.log(position);
            gps = true;
            drawRoute(position.coords.latitude, position.coords.longitude, 47.67, 9.50);
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
