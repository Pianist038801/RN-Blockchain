
import BaseComp from './base_component.js'
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ListView,
  RefreshControl,
  TouchableOpacity,
  Alert,
  Platform
} from 'react-native';
import styles from '../style.js'
import Camera from 'react-native-camera'
import RNFS from 'react-native-fs'
import {Actions} from 'react-native-router-flux'
import {Button} from 'nachos-ui'


import {
  updateProfileImage
} from '../lib/actions'

export default class ProfileImageView extends BaseComp {

  constructor(props){
    super(props);

  }

  componentDidMount() {
    this.unsubscribe = this.context.store.subscribe(() => {

    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  takePicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then((data) => {
        RNFS.readFile(data.path, 'base64')
          .then(base64 => {
            updateProfileImage(base64)
            Actions.pop()
          })
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <View style={styles2.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles2.preview}
          aspect={Camera.constants.Aspect.fill}
          captureTarget={Camera.constants.CaptureTarget.temp}
          type={Camera.constants.Type.front}
        >
          <View style={styles2.buttonContainer}>
            <Button
              style={styles2.button}
              type="danger"
              kind="rounded"
              iconName="ios-camera"
              onPress={this.takePicture.bind(this)}
            />
          </View>
        </Camera>
      </View>
    );
  }
}

const styles2 = {
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  button: {
    flex: 0,
    marginBottom: 30,
    backgroundColor: 'red'
  },
  buttonContainer: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 120,
    width: 60,
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
};
