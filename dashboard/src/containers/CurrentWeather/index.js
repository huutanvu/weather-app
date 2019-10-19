import React, { Component } from "react";
import { connect } from "react-redux";
import { setLocation } from "../../redux/weather/actions";
import LocationService from "../../helpers/locationService";

class CurrentWeather extends Component {
    state = {
        loading: true
    }

    componentDidMount = () => {
        const locationService = new LocationService();
        locationService.getCurrentPosition().then((data) => {
            this.setState({
                loading: false
            })
            this.props.setLocation(data.coords.longitude, data.coords.latitude);
            console.log(this.props.weather)
        }).catch(err => {
            // User denied GeoLocation
            this.setState({
                loading: false
            })
        })

    }

    render = () => {
        return (
            this.state.loading ? null :
                <div><h1>Hello World!</h1></div>
        )
    }
}

const mapStateToProps = state => {
    return {
        weather: state.weather
    }
}

export default connect(mapStateToProps, { setLocation })(CurrentWeather);