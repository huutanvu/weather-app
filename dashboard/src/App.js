import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { store, history } from './redux/store';
import WeatherService from "./helpers/weatherService";
import LocationService from "./helpers/locationService";

class App extends React.Component {
  state = {
    loading: true,
    currentLocation: null
  }

  componentDidMount = () => {
    const locationService = new LocationService();
    locationService.getCurrentPosition().then((data) => {
      this.setState({
        currentLocation: {
          lat: data.coords.latitude,
          lon: data.coords.longitude
        },
        loading: false
      })
    }).catch(err => {
      // User denied GeoLocation
      this.setState({
        loading: false
      })

    })

  }

  render = () => {

    return (
      this.state.loading ? null :
        <Provider store={store}>
          <div><h1>Hello World!</h1></div>
        </Provider>
    );
  }
}

export default App;
