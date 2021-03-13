import {createStore} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import reducers from './Reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['Auth'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer);

export default store;
