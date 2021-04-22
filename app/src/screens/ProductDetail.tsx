import React from 'react';
import {Text} from 'react-native';

class ProductDetail extends React.Component<any, any> {
  state = {
    product: '',
  };

  async componentDidMount() {
    console.log(this.props.route.params);
  }
  render() {
    return <Text>Oi</Text>;
  }
}

export default ProductDetail;
