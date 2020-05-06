import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';

import PlaceNavigator from './navigation/AppConfigurationNavigation';
import PlaceReducer from './store/Place-reducer';
import { initializeDB } from './db';

export default function App() {
  const rootReducer = combineReducers({
    places: PlaceReducer,
  });

  initializeDB()
    .then(() => console.log('Database connected successfully'))
    .catch((error) => {
      console.log('An error occured, could not connect to db');
      console.log(error);
    });

  const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

  return (
    <Provider store={store}>
      <PlaceNavigator />
    </Provider>
  );
}
