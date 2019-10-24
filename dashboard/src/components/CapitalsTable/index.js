import React, { Component } from "react";
import { Table, Tabs, Card, Row, Col } from "antd";
import { connect } from "react-redux";
import CardWrapper from "../CardStyle/card.style";
import { Map, Marker, Popup, TileLayer, ZoomControl, ScaleControl } from 'react-leaflet';

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
                <Row gutter={16}>
                  <Col xs={10}>
                    <Table dataSource={data["data"]} columns={columns} />
                  </Col>
                  <Col xs={14}>
                    <Map
                      center={[data["data"][0].lat, data["data"][0].lon]}
                      zoom={1}
                      style={{ "height": "200px", "width": "100%" }}
                    >
                      <TileLayer
                        attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                      />
                      {data["data"].map((d, idx) =>
                        <Marker key={`marker-${idx}`} position={[d.lat, d.lon]}>
                          <Popup>
                            <span>Country: {d.country} - Capital: {d.capital}</span>
                          </Popup>
                        </Marker>
                      )}
                    </Map>
                  </Col>

                </Row>
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