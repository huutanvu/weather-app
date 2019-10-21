import React, { Component } from "react";
import { connect } from "react-redux";
import CardWrapper from "../Card/card.style";
import { Card, Row, Col, Typography } from "antd";

const { Meta } = Card;
const { Title } = Typography;

class WeatherForecastCard extends Component {
    componentDidMount = () => {
    }

    render = () => {
        const weatherForecast = this.props.weather.weatherForecast.weather_forecast;
        const numberDates = weatherForecast.dates.length;
        return (
            <CardWrapper>
                <Row gutter={16} type="flex" style={{ marginTop: 40 }}
                    className="miniCardContainer">
                    {weatherForecast.dates.map((date, i) => {
                        return <Col style={{ width: `${100 / numberDates}%`, flexBasis: `${100 / numberDates}%` }} key={i} >
                            <Card
                                className="miniCard"
                                style={{ width: "100%" }}
                            >
                                <Meta title={`${date}`} />
                                <Row justify="space-around" align="middle">
                                    <div className="miniWeatherIcon">
                                        <img src={`https://openweathermap.org/img/wn/${weatherForecast.weathers[i].icon}@2x.png`} />
                                    </div>
                                </Row>
                                <Row><div className="miniTemperature">{`${weatherForecast.weathers[i].temp}°C`}</div></Row>
                                <Row><div className="miniCondition">{`${weatherForecast.weathers[i].main}`}</div></Row>
                            </Card>
                        </Col>
                    })}
                </Row>
            </CardWrapper>
        )
    }
}

const mapStateToProps = state => {
    return {
        weather: state.weather
    }
}

export default connect(mapStateToProps)(WeatherForecastCard);