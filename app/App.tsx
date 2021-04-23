import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import Routes from './src/routes';
import {rootReducer} from './src/reducers/rootReducer';

const store = createStore(rootReducer, applyMiddleware(thunk));
class App extends React.Component {
  render() {
    return (
      <>
        <Provider store={store}>
          <StatusBar barStyle="default" />
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </Provider>
      </>
    );
  }
}
export default App;
