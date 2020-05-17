import React, {useEffect} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import TabNavigator from './src/navigation';
import {Provider as StoreProvider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga'
import ReduxThunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import Reducer from './src/redux/reducer/';
import SplashScreen from 'react-native-splash-screen';

const saga = createSagaMiddleware()

const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  ReduxThunk,
  saga
)(createStore);

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <StoreProvider store={createStoreWithMiddleware(Reducer)}>
      <PaperProvider>
        <TabNavigator />
      </PaperProvider>
    </StoreProvider>
  );
}
