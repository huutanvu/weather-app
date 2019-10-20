import React, { Component } from "react";
import { connect } from "react-redux";
import { setUserLocation, setLocation } from "../../redux/weather/actions";
import locationService from "../../helpers/locationService";

class TripPlanning extends Component {

    render = () => {
        return (
            <div>
                <h1>Trip Planning</h1>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        weather: state.weather
    }
}

export default connect(mapStateToProps, { setUserLocation, setLocation })(TripPlanning);