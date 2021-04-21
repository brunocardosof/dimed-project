'use strict';
import React, {PureComponent} from 'react';
import {RNCamera} from 'react-native-camera';
import {Container} from '../components/Camera';

class Camera extends PureComponent<any, any> {
  onBarCodeRead = e => {
    this.props.navigation.navigate('ProductDetail', {
      data: e.data,
      type: e.type,
    });
  };
  render() {
    return (
      <Container>
        <RNCamera
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
export default Camera;
