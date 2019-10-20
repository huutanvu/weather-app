import React, { Component } from "react";
import { Layout, Menu, Card, Icon } from "antd";
import DashboardWrapper from "./dashboard.style";
import CardWrapper from "../../components/Card/card.style";
import { Row, Col } from "antd";
import { Route, Link } from "react-router-dom";
import CurrentWeather from "../CurrentWeather";
import TripPlanning from "../TripPlanning";

const { Header, Content } = Layout;
const { Meta } = Card;



class Dashboard extends Component {
    state = {
        currentPath: "current"
    }

    componentDidMount = () => {
        const currentPath = this.props.location.pathname.split("/")[1]
        if (currentPath === "") {
            this.setState({ currentPath: "current" })
        }
        else {
            this.setState({ currentPath: currentPath })
        }
    }

    render = () => {
        return (
            <DashboardWrapper>
                <Layout className="mainLayout">
                    <Header className="mainHeader">
                        <div className="logo">
                            <a href="/">
                                <img src={process.env.PUBLIC_URL + '/img/logo.png'} />
                            </a>
                        </div>
                        <Menu className="mainMenu" mode="horizontal" theme="dark"
                            selectedKeys={this.state.currentPath || "current"}>
                            <Menu.Item key="current">
                                <Icon type="thunderbolt" />
                                <span>Current Weather</span>
                                <Link to="/" />
                            </Menu.Item>
                            <Menu.Item key="trip">
                                <Icon type="clock-circle" />
                                <span>Trip Planning</span>
                                <Link to="/trip" />
                            </Menu.Item>
                        </Menu>
                    </Header>
                    <Content className="mainContent">
                        <Route exact path="/" component={CurrentWeather} />
                        <Route path="/trip" component={TripPlanning} />
                    </Content>
                </Layout>
            </DashboardWrapper>
        )
    }
}

export default Dashboard;