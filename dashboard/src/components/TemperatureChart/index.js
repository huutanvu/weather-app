import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { Card } from "antd";
import CardWrapper from "../CardStyle/card.style";

const { Meta } = Card;


const chartOptions = {
    scales: {
        xAxes: [
            {
                gridLines: {
                    drawOnChartArea: false
                },
                display: true,
                ticks: {
                    fontSize: 10
                }
            }
        ],
        yAxes: [
            {
                gridLines: {
                    drawOnChartArea: false
                },
                display: true,
                ticks: {
                    fontSize: 10,
                    beginAtZero: true,
                    stepSize: 5
                }
            },

        ]
    },
    legend: {
        display: false
    },
    layout: {
        padding: {
            left: 30,
            right: 20,
            top: 20,
            bottom: 30
        }
    },
    maintainAspectRatio: false
}

const datasetProps = {
    backgroundColor: "#141a46",
    fill: false,
    lineTension: 0,
    pointBorderColor: "#141a46",
    borderColor: "rgba(20, 26, 70, 0.65)",
    pointRadius: 3,
    borderWidth: 1.5
}
class TemperatureChart extends Component {

    render() {
        let data = this.props.weather.weatherForecast.chart_data;
        data.datasets[0] = Object.assign({}, data.datasets[0], datasetProps)
        // data.datasets[0]["backgroundColor"] = "#fd2"
        // data.datasets[0]["fill"] = false
        return (

            <CardWrapper>
                <Card
                    className="dashboardCard"
                    style={{ width: "100%" }}
                >
                    <Meta title="Temperature" description="Temperature next 24 hours" />
                    <Line
                        data={this.props.weather.weatherForecast.chart_data}
                        // width={this.state.appWindow.width}
                        height={200}
                        width={500}
                        options={chartOptions}
                    />
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

export default connect(mapStateToProps)(TemperatureChart);