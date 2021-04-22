import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProductList from './screens/ProductList';
import Camera from './screens/Camera';
import ProductDetail from './screens/ProductDetail';

const RouteStack = createStackNavigator();

const Routes: React.FC = () => (
  <RouteStack.Navigator headerMode="none" initialRouteName="ProductList">
    <RouteStack.Screen name="ProductList" component={ProductList} />
    <RouteStack.Screen name="ProductDetail" component={ProductDetail} />
    <RouteStack.Screen name="Camera" component={Camera} />
  </RouteStack.Navigator>
);
export default Routes;
