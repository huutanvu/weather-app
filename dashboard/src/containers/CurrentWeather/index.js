import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { setLocation } from "../../redux/weather/actions";
import CardWrapper from "../../components/Card/card.style";
import { Row, Col, Card } from "antd";
import WeatherCard from "../../components/WeatherCard";

const { Meta } = Card;


class CurrentWeather extends Component {

    componentDidMount = () => {
    }

    onButtonClick = () => {
        this.props.setLocation({ lon: 8.682127, lat: 50.110924 });
    }

    render = () => {
        return (
            <Fragment>
                <h1>Current Weather</h1>
                <button onClick={this.onButtonClick}>Update Location</button>
                <Row gutter={16} style={{ marginTop: 40 }}>
                    <Col span={8}>
                        <WeatherCard />
                    </Col>
                    <Col span={16}>
                        <CardWrapper>
                            <Card
                                className="dashboardCard"
                                style={{ width: "100%" }}
                            >
                                <Meta title="Europe Street beat" description="www.instagram.com" />
                            </Card>
                        </CardWrapper>
                    </Col>
                </Row>
                <Row gutter={0} style={{ marginTop: 40 }}>
                    <Col span={4}>
                        <Card
                            className="dashboardCard"
                            style={{ width: "100%" }}
                        >
                            <Meta title="Europe Street beat" description="www.instagram.com" />
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card
                            className="dashboardCard"
                            style={{ width: "100%" }}
                        >
                            <Meta title="Europe Street beat" description="www.instagram.com" />
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card
                            className="dashboardCard"
                            style={{ width: "100%" }}
                        >
                            <Meta title="Europe Street beat" description="www.instagram.com" />
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card
                            className="dashboardCard"
                            style={{ width: "100%" }}
                        >
                            <Meta title="Europe Street beat" description="www.instagram.com" />
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card
                            className="dashboardCard"
                            style={{ width: "100%" }}
                        >
                            <Meta title="Europe Street beat" description="www.instagram.com" />
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card
                            className="dashboardCard"
                            style={{ width: "100%" }}
                        >
                            <Meta title="Europe Street beat" description="www.instagram.com" />
                        </Card>
                    </Col>
                </Row>
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