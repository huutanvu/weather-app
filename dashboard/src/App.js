import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { store, history } from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <div><h1>Hello World!</h1></div>
    </Provider>
  );
}

export default App;
