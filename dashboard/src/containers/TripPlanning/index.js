import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getCapitalsData } from "../../redux/weather/actions";
import locationService from "../../helpers/locationService";
import CapitalsTable from "../../components/CapitalsTable";

const CONTINENTS = ['Africa', 'Antarctica', 'Asia', 'Europe', 'Australia', 'North America', 'South America', 'Central America']
class TripPlanning extends Component {
    state = {
        loading: true
    }
    componentDidMount = () => {
        this.props.getCapitalsData("South America").then(() => this.setState({ loading: false }))
    }

    render = () => {
        return (
            this.state.loading ? null :

                <Fragment>
                    <h1>Temperature in different Capitals at South America</h1>
                    <CapitalsTable />
                </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        weather: state.weather
    }
}

export default connect(mapStateToProps, { getCapitalsData })(TripPlanning);