import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { setLocation } from "../../redux/weather/actions";
import { Row, Col } from "antd";
import WeatherCard from "../../components/WeatherCard";
import WeatherForecastCard from "../../components/WeatherForecastCard";
import TemperatureChart from "../../components/TemperatureChart";


class CurrentWeather extends Component {

    componentDidMount = () => {
    }

    onButtonClick = () => {
        this.props.setLocation({ lon: 8.682127, lat: 50.110924 });
    }

    setUserLocation = () => {
        this.props.setLocation(this.props.weather.userLocation);
    }

    render = () => {
        return (
            <Fragment>
                <h1>Current Weather</h1>
                <button onClick={this.onButtonClick}>Update Location</button>
                <button onClick={this.setUserLocation} disabled={this.props.weather.userLocation === null}>User your current location</button>
                <Row gutter={16} style={{ marginTop: 40 }}>
                    <Col span={8}>
                        <WeatherCard />
                    </Col>
                    <Col span={16}>
                        <TemperatureChart />
                    </Col>
                </Row>
                <WeatherForecastCard />
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        weather: state.weather
    }
}

export default connect(mapStateToProps, { setLocation })(CurrentWeather);