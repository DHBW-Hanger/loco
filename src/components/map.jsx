import React from "react";
import DeckGL from "@deck.gl/react";
import { LineLayer } from "@deck.gl/layers";
import {StaticMap, GeolocateControl} from 'react-map-gl';
// makes clean rendering of the map possible without lagging
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

/**
 *
 * @return {JSX.Element} - Map Component
 * @param {object} props - props of the component
 * @constructor
 */
export default function MyMap(props) {


  const layers = [new LineLayer({ id: "line-layer", data })];

  const mapOptions = {
    projection: "globe",
    };

  function onMapLoad(map) {
    map.setFog({});
  }
  
  return (
    <DeckGL initialViewState={INITIAL_VIEW_STATE}
    controller={true}
    layers={layers}>
      <StaticMap 
      mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
      mapStyle="mapbox://styles/saicode/cl5h2uo72001914payehixo71"
      mapOptions={mapOptions}
      onMapLoad={onMapLoad}
       />
    </DeckGL>
  );
}
