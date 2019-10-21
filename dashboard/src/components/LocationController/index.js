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

const LocationSvg = () => (
    <svg x="0px" y="0px" viewBox="0 0 128 128" >
        <path transform="matrix(0.128,0,0,0.128,14,0)" d="M 383 0 C 171 0 0 181 0 403 C 0 696 360 984 375 996 C 380 1000 386 1000 390 996 C 405 984 766 696 766 403 C 766 181 594 0 383 0 z M 383 447 C 293 447 221 374 221 285 C 221 195 293 122 383 122 C 472 122 544 195 544 285 C 544 374 472 447 383 447 z" />
    </svg>);
const LocationIcon = props => <Icon component={LocationSvg} {...props} />;

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
    }

    onChangeCountry = (val) => {
        let regions = [];
        for (let i = 0; i < CountryRegionData.length; i++) {
            if (CountryRegionData[i].countryName === val) {
                CountryRegionData[i].regions.forEach(v => regions.push(v.name))
                break;
            }
        }
        this.setState({ selectedCountry: val, regions })
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