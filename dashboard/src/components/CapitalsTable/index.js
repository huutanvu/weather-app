import React, { Component } from "react";
import { Table } from "antd";
import { connect } from "react-redux";
import locationService from "../../helpers/locationService";
import weatherService from "../../helpers/weatherService";

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
  {
    title: 'Longitude',
    dataIndex: 'lon',
    key: 'lon',
  },
  {
    title: 'Lattitude',
    dataIndex: 'lat',
    key: 'lat',
  },
  {
    title: 'Temperature',
    dataIndex: 'temperature',
    key: 'temperature',
  },
];

class CapitalsTable extends Component {
  render = () => {
    <Table dataSource={dataSource} columns={columns} />;
  }
}

const mapStateToProps = state => {
  return {
    weather: state.weather
  }
}

export default connect(mapStateToProps, {})(CapitalsTable);