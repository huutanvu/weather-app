import React, { Component } from "react";
import { Table, Tabs, Card } from "antd";
import { connect } from "react-redux";
import CardWrapper from "../CardStyle/card.style";

const { TabPane } = Tabs;

const columns = [
  {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
  },
  {
    title: 'Capital',
    dataIndex: 'capital',
    key: 'capital',
  },
  // {
  //   title: 'Longitude',
  //   dataIndex: 'lon',
  //   key: 'lon',
  // },
  // {
  //   title: 'Lattitude',
  //   dataIndex: 'lat',
  //   key: 'lat',
  // },
  {
    title: 'Temperature (°C)',
    dataIndex: 'temperature',
    key: 'temperature',
  },
];

class CapitalsTable extends Component {

  onTabChange = () => {

  }

  render = () => {
    return (
      <CardWrapper>
        <Card
          className="capitalsCard"
        >
          <Tabs defaultActiveKey="0" onChange={this.onTabChange}>
            {this.props.weather.capitalsData.map((data, i) =>
              <TabPane tab={`${data["min"]}°C - ${data["max"]}°C`} key={i}>
                <Table dataSource={data["data"]} columns={columns} />
              </TabPane>
            )}
          </Tabs>
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

export default connect(mapStateToProps, {})(CapitalsTable);