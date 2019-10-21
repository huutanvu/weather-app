import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { setLocation } from "../../redux/weather/actions";
import { Row, Col } from "antd";
import WeatherCard from "../../components/WeatherCard";
import WeatherForecastCard from "../../components/WeatherForecastCard";
import TemperatureChart from "../../components/TemperatureChart";
import LocationController from "../../components/LocationController";


class CurrentWeather extends Component {

    componentDidMount = () => {
    }

    render = () => {
        return (
            <Fragment>
                <h1>Current Weather</h1>
                <LocationController />
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