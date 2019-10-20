import React, { Component } from "react";
import { connect } from "react-redux";
import CardWrapper from "../Card/card.style";
import { Card, Row, Col } from "antd";

const { Meta } = Card;

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
        return (
            <CardWrapper>
                <Card
                    className="dashboardCard"
                    style={{ width: "100%", height: "150px" }}
                >
                    <Meta title={`${city}, ${country}`} />
                    <Row>
                        <Col xs={12}>
                            <div className="weatherIcon">
                                <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={description} />
                            </div>
                        </Col>
                        <Col xs={12}>{temp}</Col>
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