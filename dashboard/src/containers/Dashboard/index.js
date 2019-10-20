import React, { Component } from "react";
import { Layout, Menu, Card } from "antd";
import DashboardWrapper from "./dashboard.style";
import CardWrapper from "../../components/Card/card.style";
import { Row, Col } from "antd";

const { Header, Content } = Layout;
const { Meta } = Card;



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
                    </Content>
                </Layout>
            </DashboardWrapper>
        )
    }
}

export default Dashboard;