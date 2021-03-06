import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { setLocation, setUserLocation, setLocationByName } from "../../redux/weather/actions";
import { Button, Select, Icon } from "antd";
import CountryRegionData from 'country-region-data/data.json';


// console.log("Region data:", CountryRegionData)

const { Option } = Select;

// Data has the format:
// {
//     countryName: "",
//         countryShortCode: "",
//         regions: [{
//             name: "",
//             shortCode: ""
//         }]
// }


class LocationController extends Component {

    state = {
        selectedCountry: null,
        selectedRegion: null,
        regions: []
    }
    componentDidMount = () => {
    }

    onButtonClick = () => {
        this.props.setLocation({ lon: 106.660172, lat: 10.762622 });
    }

    setUserLocation = () => {
        this.props.setUserLocation().then(() => {
            this.props.setLocation(this.props.weather.userLocation);
        })
        this.setState({ selectedCountry: null, selectedRegion: null, regions: [] })
    }

    onChangeCountry = (val) => {
        let regions = [];
        for (let i = 0; i < CountryRegionData.length; i++) {
            if (CountryRegionData[i].countryName === val) {
                CountryRegionData[i].regions.forEach(v => regions.push(v.name))
                break;
            }
        }
        this.setState({ selectedCountry: val, regions, selectedRegion: null })
    }

    onSearchCountry = (val) => {
    }

    onChangeRegion = (val) => {
        this.setState({ selectedRegion: val })
        this.props.setLocationByName({
            country: this.state.selectedCountry,
            city: val
        });
    }

    onSearchRegion = (val) => {
    }

    render = () => {

        return (
            <Fragment>
                <Select
                    showSearch
                    style={{ width: 180 }}
                    placeholder="Select a country"
                    onChange={this.onChangeCountry}
                    onSearch={this.onSearchCountry}
                    value={this.state.selectedCountry || undefined}
                >
                    {CountryRegionData.map((v) => {
                        return <Option value={v.countryName} key={v.countryName}>{v.countryName}</Option>
                    })}
                </Select>
                <Select
                    disabled={this.state.regions.length === 0}
                    showSearch
                    style={{ width: 180 }}
                    placeholder="Select a region"
                    onChange={this.onChangeRegion}
                    onSearch={this.onSearchRegion}
                    value={this.state.selectedRegion || undefined}
                >
                    {this.state.regions.map((v) => {
                        return <Option value={v} key={v}>{v}</Option>
                    })}
                </Select>
                {/* <Button onClick={this.onButtonClick}>Update Location</Button> */}
                <Button onClick={this.setUserLocation}
                    disabled={this.props.weather.userLocation === null}>
                    <Icon type="compass" />
                    Use my location
                </Button>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        weather: state.weather
    }
}

export default connect(mapStateToProps, { setLocation, setUserLocation, setLocationByName })(LocationController);