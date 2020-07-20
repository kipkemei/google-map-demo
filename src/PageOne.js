import React from 'react';
import './App.css';
import { GoogleMap, LoadScript, Autocomplete, Marker } from '@react-google-maps/api';
import Page1Nav from "./Page1Nav";
const API_KEY = "AIzaSyDJ72tUrPw1vtx-asnz2eFhxJlAM-TGMEo";

export default class extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            center: {
                lat: -3.745,
                lng: -38.523
            },
            markers: [{lat: 3.745, lng: 36}, {lat: 4.745, lng: 32}],
            placeName: "",
            map: null
        }
        this.autocomplete = null
        this.onLoad = this.onLoad.bind(this)
        this.onPlaceChanged = this.onPlaceChanged.bind(this)
    }

    onLoad (autocomplete) {
        this.autocomplete = autocomplete
    }



    onPlaceChanged = () => {
        if (this.autocomplete !== null) {
            let place = this.autocomplete.getPlace();
            let center = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
            };
            this.setState({
                center,
                place: place.name,
            });
        } else {
            console.log("Autocomplete is not loaded yet!");
        }
    };

    render () {
        let {markers} = this.props
        return (
            <div id={"page1"}>
                <Page1Nav />
                <LoadScript
                    googleMapsApiKey={API_KEY}
                    libraries={["places"]}
                >
                    <GoogleMap
                        id="gmap"
                        mapContainerStyle={{height: "100%"}}
                        zoom={3}
                        center={this.state.center}
                        options={{disableDefaultUI: true}}
                        onLoad={
                            (map) => {
                                this.setState({map: map})
                            }}
                    >
                        <Autocomplete
                            onLoad={this.onLoad}
                            onPlaceChanged={this.onPlaceChanged}
                        >
                            <input
                                type="text"
                                placeholder="Customized your placeholder"
                                style={{
                                    boxSizing: `border-box`,
                                    border: `1px solid transparent`,
                                    width: `240px`,
                                    height: `32px`,
                                    padding: `0 12px`,
                                    borderRadius: `3px`,
                                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                                    fontSize: `14px`,
                                    outline: `none`,
                                    textOverflow: `ellipses`,
                                    position: "absolute",
                                    left: "50%",
                                    marginLeft: "-120px"
                                }}
                            />
                        </Autocomplete>
                        {this.props.that.state.markers.map((item, key)=>
                            <div key={key}>
                                <Marker
                                    onLoad={this.onLoadMarker}
                                    position={item}
                                />
                            </div>
                        )}
                    </GoogleMap>
                </LoadScript>
                <div id="div-btn" style={{ justifyContent: "center" }}>
                    <button id="btn" onClick={this.props.nextPage}>
                        POST YOUR AD
                    </button>
                </div>
            </div>
        )
    }
}