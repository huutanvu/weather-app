import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import DashboardWrapper from "./dashboard.style";
import { Route, Link } from "react-router-dom";
import CurrentWeather from "../CurrentWeather";
import TripPlanning from "../TripPlanning";

const { Header, Content } = Layout;


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

    onSelectItem = (e) => {
        this.setState({ currentPath: e.key });
    }

    render = () => {
        const currentPath = this.state.currentPath;
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
                            onSelect={this.onSelectItem}
                            defaultSelectedKeys={['current']}
                            selectedKeys={currentPath}>
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
                        <div className="contentWrapper">
                            <div className="content">
                                <Route exact path="/" component={CurrentWeather} />
                                <Route path="/trip" component={TripPlanning} />
                            </div>
                        </div>
                    </Content>
                </Layout>
            </DashboardWrapper>
        )
    }
}

export default Dashboard;