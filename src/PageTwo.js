import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ArrowBack from "@material-ui/icons/ArrowBack";
import PhotoLibrary from "@material-ui/icons/PhotoLibrary";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import React, { Component } from "react";
import axios from "axios";
import {
  Autocomplete,
  GoogleMap,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
const API_KEY = "AIzaSyDJ72tUrPw1vtx-asnz2eFhxJlAM-TGMEo";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      predictions: [],
      location: "",
      placeId: {},
      selected: false,
    };
  }
  handleChange = (event) => {
    this.state.selected
      ? this.setState({ predictions: [] })
      : this.setState({ location: event.target.value });
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyDJ72tUrPw1vtx-asnz2eFhxJlAM-TGMEo&input=${event.target.value.trim()}`
      )
      .then((response) => {
        this.setState({ predictions: response.data.predictions });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleSelectPrediction = (loc) => {
    this.setState({
      selected: true,
      location: loc.description,
      placeId: loc.place_id,
      predictions: [],
    });
  };

  fetchPlace = () => {
    console.log("AAAAAAA", this.state);
    try {
      var request = {
        placeId: this.state.placeId,
        fields: ["name", "geometry"],
      };
      let service = new window.google.maps.places.PlacesService(this.state.map);
      console.log("BBB", service);
      service.getDetails(request, this.placeCallback);
      console.log("google", service, request);
    } catch (e) {
      console.log("No service", e);
    }
  };

  placeCallback = (place, status) => {
    console.log("CCCC Place callback", place, status);
    let center = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };
    this.setState({
      center: center,
      placeName: place.name,
    });
    this.props.addMarker(center);
  };

  render() {
    const { goBack } = this.props;
    return (
      <div
        style={{
          flexGrow: 1,
        }}
      >
        <AppBar position="static" style={{ backgroundColor: "#d50320" }}>
          <Toolbar>
            <IconButton
              edge="start"
              classes
              color="inherit"
              aria-label="menu"
              onClick={goBack}
            >
              <ArrowBack />
            </IconButton>
            <Typography
              variant="h6"
              style={{
                flexGrow: 1,
                marginRight: 4,
              }}
            >
              <strong>LOGO</strong>
            </Typography>
          </Toolbar>
        </AppBar>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div
            style={{
              // marginTop: theme.spacing(1),
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              style={{
                margin: 1,
                backgroundColor: "#ffffff",
                color: "#d50320",
              }}
            >
              <PhotoLibrary />
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              style={{ color: "#c4596e", wordSpacing: "-2px" }}
            >
              Add a Photo
            </Typography>
          </div>
          <br />
          <Grid spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="Address"
                name="Address"
                label="Property Address"
                fullWidth
                placeholder="Your property address"
                onChange={(event) => this.handleChange(event)}
                value={this.state.location}
              />
              <List
                component="nav"
                style={{
                  flexGrow: 1,
                }}
                aria-label="contacts"
              >
                {this.state.predictions.map((loc, key) => (
                  <ListItem
                    button
                    key={key}
                    className="list-group-item"
                    onClick={() => this.handleSelectPrediction(loc)}
                  >
                    <ListItemText primary={loc.description} />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <br />
            <Grid item xs={12}>
              <TextField
                id="Title"
                name="Title"
                label="Property Title"
                fullWidth
                placeholder="Your property title"
              />
            </Grid>
            <br />
            <Grid item xs={12}>
              <TextField
                id="moreDescription"
                name="moreDescription"
                label="Describe more about your property"
                fullWidth
                placeholder="Enter any notes here..."
              />
            </Grid>
            <br />
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.fetchPlace}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Container>
        <LoadScript googleMapsApiKey={API_KEY} libraries={["places"]}>
          <GoogleMap
            mapContainerStyle={{ height: "1px" }}
            zoom={10}
            center={this.state.center}
            onLoad={(map) => {
              this.setState({ map: map });
            }}
          ></GoogleMap>
        </LoadScript>
      </div>
    );
  }
}
