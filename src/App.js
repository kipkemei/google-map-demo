import React from 'react';
import './App.css';
import { GoogleMap, LoadScript, Autocomplete, Marker } from '@react-google-maps/api';
const API_KEY = "AIzaSyDJ72tUrPw1vtx-asnz2eFhxJlAM-TGMEo";

const mapContainerStyle = {
    height: "500px",
    width: "1000px"
}


export default class App extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            center: {
                lat: -1,
                lng: 35.523
            },
            markers: [{lat: 3.745, lng: 36}, {lat: 4.745, lng: 32}],
            placeName: "",
            map: null
        }
        this.autocomplete = null
        this.onLoad = this.onLoad.bind(this)
        this.onPlaceChanged = this.onPlaceChanged.bind(this)
        var request = {
            placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
            fields: ['name', 'rating', 'formatted_phone_number', 'geometry']
        };
    }

    onLoad (autocomplete) {
        this.autocomplete = autocomplete
    }

    onPlaceChanged () {
        if (this.autocomplete !== null) {
            let place = this.autocomplete.getPlace()
            let center = {
                lat: parseFloat(place.geometry.location.lat()),
                lng: parseFloat(place.geometry.location.lng())
            }
            this.setState({
                center: center,
                placeName: place.name
            })
        } else {
            console.log('Autocomplete is not loaded yet!')
        }
    }
    onLoadMarker (marker) {
        console.log('marker: ', marker)
    }

    myFunction = () => {
        // Declare variables
        var input, filter, ul, li, a, i, txtValue;
        input = document.getElementById('myInput');
        filter = input.value.toUpperCase();
        ul = document.getElementById("myUL");
        li = ul.getElementsByTagName('li');

        // Loop through all list items, and hide those who don't match the search query
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    }

    render () {
        return (
            <div>
                <h1>hello world</h1>
                <LoadScript
                    googleMapsApiKey={API_KEY}
                    libraries={["places"]}
                >
                <GoogleMap
                    id="searchbox-example"
                    mapContainerStyle={mapContainerStyle}
                    zoom={10}
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
                            placeholder="Search ..."
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
                    {this.state.markers.map((item, key)=>
                        <div key={key}>
                        <Marker
                            onLoad={this.onLoadMarker}
                            position={item}
                        />
                        </div>
                    )}
                </GoogleMap>
                </LoadScript>
                <button id="btn">Hello world</button>
                <div id="search-bar">
                    <input type="text" id="myInput" onKeyUp={this.myFunction} placeholder="Search for names.." />

                    <ul id="myUL">
                        <li><a href="#">Adele</a></li>
                        <li><a href="#">Agnes</a></li>

                        <li><a href="#">Billy</a></li>
                        <li><a href="#">Bob</a></li>

                        <li><a href="#">Calvin</a></li>
                        <li><a href="#">Christina</a></li>
                        <li><a href="#">Cindy</a></li>
                    </ul>
                </div>
            </div>
        )
    }
}

