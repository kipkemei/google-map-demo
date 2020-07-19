import React from 'react';
import logo from './logo.svg';
import './App.css';
import {GoogleApiWrapper, InfoWindow, Map, Marker} from "google-maps-react";

const API_KEY = "AIzaSyDJ72tUrPw1vtx-asnz2eFhxJlAM-TGMEo";

export class App extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            selectedPlace: {}
        }
    }
    onMapClicked = e => {
        console.log("Hey");
    };

    render() {
        return (
            <div className="App">
                <h1>Hello World {API_KEY} !!</h1>
                <Map
                    google={this.props.google}
                    // style={style}
                    initialCenter={{
                        lat: 0.854885,
                        lng: 35.081807
                    }}
                    onClick={this.onMapClicked}
                    zoom={14}>

                    <Marker onClick={this.onMarkerClick}
                            name={'Current location'}/>
                    <Marker
                        name={'Dolores park'}
                        position={{lat: 34, lng: 55}} />
                    <Marker />
                    <Marker
                        name={'Your position'}
                        position={{lat: 35, lng: 0.1}}
                        icon={{
                            url: "/path/to/custom_icon.png",
                            anchor: new this.props.google.maps.Point(32,32),
                            scaledSize: new this.props.google.maps.Size(64,64)
                        }} />

                    <InfoWindow onClose={this.onInfoWindowClose}>
                        <div>
                            <h1>{this.state.selectedPlace.name}</h1>
                        </div>
                    </InfoWindow>
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: (API_KEY)
})(App)

