import React from "react";
import DeckGL from "@deck.gl/react";
import { LineLayer } from "@deck.gl/layers";
import {StaticMap} from 'react-map-gl';
// makes clean rendering of the map possible without lagging
import "../css/map.css";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1Ijoic2FpY29kZSIsImEiOiJjbDN2bGZvdWEwMHlrM2ptbWkxZ3NzNzR3In0.KfvayvxbFTIVWeR6yH0rxA";

const INITIAL_VIEW_STATE = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 13,
  pitch: 0,
  bearing: 0,
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
  /*
    const { MapboxLayer, ScatterplotLayer, ArcLayer } = deck;
  
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2FpY29kZSIsImEiOiJjbDN2bGZvdWEwMHlrM2ptbWkxZ3NzNzR3In0.KfvayvxbFTIVWeR6yH0rxA';
  
    const map = new mapboxgl.Map({
      container: document.body,
      style: 'mapbox://styles/saicode/cl5h2uo72001914payehixo71',
      center: [9.49, 47.66],
      zoom: 20,
      pitch: 60
    });
  
    map.on('load', () => {
      const firstLabelLayerId = map.getStyle().layers.find(layer => layer.type === 'symbol').id;
  
      map.addLayer({
        'id': '3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
          'fill-extrusion-color': '#000',
  
          // use an 'interpolate' expression to add a smooth transition effect to the
          // buildings as the user zooms in
          'fill-extrusion-height': [
            "interpolate", ["linear"], ["zoom"],
            15, 0,
            15.05, ["get", "height"]
          ],
          'fill-extrusion-base': [
            "interpolate", ["linear"], ["zoom"],
            15, 0,
            15.05, ["get", "min_height"]
          ],
          'fill-extrusion-opacity': .6
        }
      }, firstLabelLayerId);
  
      map.addLayer(new MapboxLayer({
        id: 'deckgl-circle',
        type: ScatterplotLayer,
        data: [
          { position: [props.targetMarkerLocation.lon, props.targetMarkerLocation.lat], color: [18, 102, 219], radius: 100 }
        ],
        getPosition: d => d.position,
        getFillColor: d => d.color,
        getRadius: d => d.radius,
        opacity: 0.3
      }), firstLabelLayerId);
    });
  
    map.on("click", (e) => {
      console.log(e.lngLat);
    });*/

  const layers = [new LineLayer({ id: "line-layer", data })];

  return (
    <DeckGL initialViewState={INITIAL_VIEW_STATE}
    controller={true}
    layers={layers}>
      <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
    </DeckGL>
  );
}
