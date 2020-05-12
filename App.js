import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import AppNavigator from './src/navigation';
import {Provider as StoreProvider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from "redux-thunk";
import promiseMiddleware from "redux-promise";
import Reducer from './src/redux/reducer/'

const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  ReduxThunk,
)(createStore);

export default function App() {
  return (
    <StoreProvider
      store={createStoreWithMiddleware(
        Reducer
      )}>
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
    </StoreProvider>
  );
}
