'use strict';
import React, {PureComponent} from 'react';
import {BarCodeReadEvent, RNCamera} from 'react-native-camera';
import {connect} from 'react-redux';
import {Container} from '../components/Camera';
import {Product} from '../interfaces/Product';

interface Props {
  fullDataProducts: Product[];
}

class Camera extends PureComponent<any, Props> {
  onBarCodeRead = (e: BarCodeReadEvent) => {
    const productId = this.getProduct(Number(e.data))[0];
    this.props.navigation.navigate('ProductDetail', {productId: productId.id});
  };
  getProduct = (ean: number): Product[] => {
    const product = this.props.fullDataProducts.filter((item: Product) => {
      return item.ean === ean;
    });
    return product;
  };
  render() {
    return (
      <Container>
        <RNCamera
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
          type={RNCamera.Constants.Type.back}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onBarCodeRead={this.onBarCodeRead}
        />
      </Container>
    );
  }
}

const mapStateToProps = (store: any) => {
  return {
    fullDataProducts: store.productsReducer.fullDataProducts,
  };
};

export default connect(mapStateToProps, null)(Camera);
