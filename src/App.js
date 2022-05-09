import React from "react";
import MyMap from "./components/map";
import "./index.css";

export default class App extends React.Component {
  //statemanagment
  state = {
    markers: []
  };

  render() {
    //later add markers to the map
    const { markers } = this.state;
    return (
      <div>
        <MyMap/>
      </div>
    );
  }
}