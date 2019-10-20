import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { store, history } from './redux/store';
import Dashboard from "./containers/Dashboard";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "antd/dist/antd.css";

class App extends React.Component {
  render = () => {
    return (
      <Provider store={store}>
        <Router>
          <Route path="/" component={Dashboard} />
        </Router>
      </Provider>
    );
  }
}

export default App;
