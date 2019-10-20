import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { setUserLocation, setLocation } from "../../redux/weather/actions";
import locationService from "../../helpers/locationService";
import CardWrapper from "../../components/Card/card.style";
import { Row, Col, Card } from "antd";

const { Meta } = Card;


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
                <Fragment>
                    <h1>Current Weather</h1>
                    <button onClick={this.onButtonClick}>Update Location</button>
                    <Row gutter={16} style={{ marginTop: 40 }}>
                        <Col span={8}>
                            <CardWrapper>
                                <Card
                                    className="dashboardCard"
                                    style={{ width: "100%" }}
                                >
                                    <Meta title="Europe Street beat" description="www.instagram.com" />
                                </Card>
                            </CardWrapper>
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

export default connect(mapStateToProps, { setUserLocation, setLocation })(CurrentWeather);