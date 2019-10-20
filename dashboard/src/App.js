import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { store, history } from './redux/store';
import Dashboard from "./containers/Dashboard";

import "antd/dist/antd.css";

class App extends React.Component {
  render = () => {
    return (

      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
  }
}

export default App;
