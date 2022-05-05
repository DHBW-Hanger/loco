import './App.css';
import React, {Component} from "react";
import {Map, GoogleApiWrapper} from 'google-maps-react';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      style: {
        width: '100%',
        height: '100%'
      },
      mapZoom: 12,
      locationCenter: {
        lat: 47.665693,
        lng: 9.4468206
      }
    };
  }

  componentDidMount () {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
      });
    }
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <Map google={this.props.google}
               style={this.state.style}
               zoom={this.state.mapZoom}
               initialCenter={this.state.locationCenter}
          ></Map>
          <p>
            Console zeigt längen und Breitengrad an!
          </p>
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
