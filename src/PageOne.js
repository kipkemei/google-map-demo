import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Subject";
import Typography from "@material-ui/core/Typography";
import {AccountCircle} from "@material-ui/icons";
import LoadScript from "@react-google-maps/api/dist/LoadScript";
import GoogleMap from "@react-google-maps/api/dist/GoogleMap";
import Autocomplete from "@react-google-maps/api/dist/components/places/Autocomplete";
import Marker from "@react-google-maps/api/dist/components/drawing/Marker";


export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const rootStyle = {
            root: {
                flexGrow: 1,
            },
            menuButton: {
                marginRight: theme.spacing(2),
            },
            title: {
                flexGrow: 1,
            }
        }
        return (
            <div className={rootStyle} id="main">
                <div id="bottom">
                    <AppBar position="static" style={{backgroundColor: "#d50320"}}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="menu"
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                <strong>LOGO</strong>
                            </Typography>

                            <div>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    style={{
                                        backgroundColor: "#ffffff",
                                        borderRadius: "0%",
                                        color: "#d50320",
                                        height: "20px",
                                        width: "20px",
                                    }}
                                >
                                    <AccountCircle/>
                                </IconButton>
                            </div>
                        </Toolbar>
                    </AppBar>
                    <LoadScript googleMapsApiKey={API_KEY} libraries={["places"]}>
                        <GoogleMap
                            id="searchbox-example"
                            mapContainerClassName="mymap"
                            zoom={14}
                            center={center}
                            options={{disableDefaultUI: true}}
                            mapContainerStyle={{height: "100%"}}
                            onLoad={
                                (map) => {
                                    setMap({map: map})
                                }}
                        >
                            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                                <input
                                    type="text"
                                    placeholder="Search..."
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
                                        marginLeft: "-120px",
                                    }}
                                />
                            </Autocomplete>
                            {markers.map((item, key) => (
                                <div key={key}>
                                    <Marker onLoad={onLoadMarker} position={item}/>
                                </div>
                            ))}
                        </GoogleMap>
                    </LoadScript>
                    <div id="div-btn" style={{justifyContent: "center"}}>
                        <button id="btn" onClick={() => handleAdd(true)}>
                            POST YOUR AD
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}