import React from 'react';
import {Provider} from 'react-redux';
import Router from './app/config/routes';
// import store from './app/redux/store';

const App = () => {
  return (
    /*<Provider store={store}>*/
    <Router />
    // </Provider>
  );
};

export default App;
