import React from 'react';
import {View, Text} from 'react-native';
import Router from './src/Router';

//Redux
import {Provider} from 'react-redux';
import store from './src/public/redux/store';

//Redux-persist
import {PersistGate} from 'redux-persist/es/integration/react';
import {persistStore} from 'redux-persist';
const persistedStore = persistStore(store);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore} loading={null}>
        <Router />
      </PersistGate>
    </Provider>
  );
};

export default App;
