import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProductList from './pages/ProductList';

const RouteStack = createStackNavigator();

const Routes: React.FC = () => (
  <RouteStack.Navigator headerMode="none" initialRouteName="ProductList">
    <RouteStack.Screen name="ProductList" component={ProductList} />
  </RouteStack.Navigator>
);
export default Routes;
