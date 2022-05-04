import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";
import {Map, GoogleApiWrapper} from 'google-maps-react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function(position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
      });
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Map
            google={this.props.google}
            style = {{width: '100%', height: '100%'}}
            zoom = {10}
            initialCenter={{
              lat: -34.397,
              lng: 150.644,
            }
          }
            ></Map>
          <p>
            Console zeigt längen und Breitengrad an!
          </p>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Bitte alle einen eigenen Branch erstellen!
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBTGsd1PAG2l8u-tePbi_yBbOZcvClsuNY"
})(App)
