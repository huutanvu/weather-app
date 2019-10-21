import React, { Component } from "react";
import { connect } from "react-redux";
import CardWrapper from "../Card/card.style";
import { Card, Row, Col, Typography } from "antd";

const { Meta } = Card;
const { Title } = Typography;

class WeatherCard extends Component {
    componentDidMount = () => {
    }

    render = () => {
        const currentWeather = this.props.weather.currentWeather;
        // Node that weather can be a list of conditions
        const { humidity, pressure, temp } = currentWeather.main;
        const weatherConditions = currentWeather.weather;
        const wind = currentWeather.wind;
        const { city, country } = this.props.weather.location;
        let description, icon, main;
        if (weatherConditions.length > 0) {
            description = weatherConditions[0].description;
            icon = weatherConditions[0].icon;
            main = weatherConditions[0].main;
        }
        const today = new Date();
        return (
            <CardWrapper>
                <Card
                    className="dashboardCard"
                    style={{ width: "100%" }}
                >
                    <Meta title={`${city}, ${country}`} description={`Today ${today.toLocaleDateString()}`} />
                    <Row gutter={12} justify="space-around" align="middle" className="weatherInfo">
                        <Col xs={12}>
                            <div className="weatherIcon">
                                <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={description} />
                            </div>
                        </Col>
                        <Col xs={12}>
                            <Row><div className="temperature">{`${Math.round(temp)}°C`}</div></Row>
                            <Row><div className="condition">{`${main}`}</div></Row>
                            <Row><div>{`Humidity: ${humidity}%`}</div></Row>
                            <Row><div>{`Wind: ${Math.round(wind.speed * 3.6)} km/h`}</div></Row>
                        </Col>
                    </Row>
                </Card>
            </CardWrapper>
        )
    }
}

const mapStateToProps = state => {
    return {
        weather: state.weather
    }
}

export default connect(mapStateToProps)(WeatherCard);