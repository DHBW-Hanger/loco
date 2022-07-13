import React from "react";
import { LineLayer } from "@deck.gl/layers";
import Map, { GeolocateControl , Marker , NavigationControl} from "react-map-gl";
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

/**
 *
 * @return {JSX.Element} - Map Component
 * @param {object} props - props of the component
 * @constructor
 */
export default function MyMap(props) {


  const layers = [new LineLayer({ id: "line-layer", data })];
  
  return (
    <div className="Map">
      <Map
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        initialViewState={INITIAL_VIEW_STATE}
        mapStyle="mapbox://styles/saicode/cl5h2uo72001914payehixo71"
        onLoad={() => {console.log("Map Loaded");}}
      >
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          showUserHeading={true}
          showAccuracyCircle={true}
          position='bottom-right'
          onGeolocate={(position) => {
            console.log(position);
          }
          }
        />
        <NavigationControl 
        visualizePitch={true}
        />
      </Map>
    </div>
  );
}
