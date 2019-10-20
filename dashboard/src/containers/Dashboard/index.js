import React, { Component } from "react";
import { Layout, Menu } from "antd";
import DashboardWrapper from "./dashboard.style";

const { Header, Content } = Layout;

class Dashboard extends Component {
    render = () => {
        return (
            <DashboardWrapper>
                <Layout className="mainLayout">
                    <Header className="mainHeader">
                        <div className="logo">
                            <img src={process.env.PUBLIC_URL + '/img/logo.png'} />
                        </div>
                        <Menu className="mainMenu" mode="horizontal" theme="dark">
                            <Menu.Item key="current">Current Weather</Menu.Item>
                            <Menu.Item key="trip">Trip planning</Menu.Item>
                        </Menu>
                    </Header>
                    <Content className="mainContent">
                        <div>
                            <h1>Hello World!</h1>
                        </div>
                    </Content>
                </Layout>
            </DashboardWrapper>
        )
    }
}

export default Dashboard;