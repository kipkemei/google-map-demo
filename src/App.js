import React, {Component} from "react";
import PageOne from "./PageOne";
import PageTwo from "./PageTwo";


export default class extends Component{
    constructor(props) {
        super(props);
        this.state = {
            placeId: null,
            markers: [],
            mapPage: false
        }
    }

    goBack = (placeId) => {
        this.setState({mapPage: !this.state.mapPage})
    }

    addMarker = (marker) => {
        var {markers} = this.state;
        markers.push(marker)
        this.setState({markers: markers})
        console.log('Added')
    }

    render() {
        return (
            <div>
                {
                    !this.state.mapPage ?
                        <PageTwo
                            addMarker={this.addMarker}
                            goBack={this.goBack}/>
                        : <PageOne goBack/>
                }
            </div>
        )
    }

}