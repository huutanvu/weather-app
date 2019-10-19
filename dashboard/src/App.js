import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { store, history } from './redux/store';
import CurrentWeather from "./containers/CurrentWeather";

class App extends React.Component {
  render = () => {
    return (

      <Provider store={store}>
        <CurrentWeather />
      </Provider>
    );
  }
}

export default App;
