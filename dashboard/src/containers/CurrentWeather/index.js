import React, { Component } from "react";
import { connect } from "react-redux";
import { setUserLocation, setLocation } from "../../redux/weather/actions";
import locationService from "../../helpers/locationService";

class CurrentWeather extends Component {
    state = {
        loading: true
    }

    componentDidMount = () => {
        locationService.getCurrentPosition().then((data) => {
            this.setState({
                loading: false
            })
            this.props.setLocation({ lon: data.coords.longitude, lat: data.coords.latitude });
            this.props.setUserLocation({ lon: data.coords.longitude, lat: data.coords.latitude });
        }).catch(err => {
            // User denied GeoLocation
            this.setState({
                loading: false
            })
            // set Default location to Frankfurt
            this.props.setLocation({ lon: 8.682127, lat: 50.110924 });
        })

    }

    onButtonClick = () => {
        this.props.setLocation({ lon: 8.682127, lat: 50.110924 });
    }

    render = () => {
        return (
            this.state.loading ? null :
                <div>
                    <h1>Current Weather</h1>
                    <button onClick={this.onButtonClick}>Update Location</button>
                </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        weather: state.weather
    }
}

export default connect(mapStateToProps, { setUserLocation, setLocation })(CurrentWeather);