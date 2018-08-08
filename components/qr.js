import BaseComp from './base_component.js'
import React, {Component} from 'react'
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
import {confirmQrCode} from '../lib/actions'
import PermissionsCheck from '../lib/PermissionsCheck'

export default class QrView extends BaseComp {

  constructor(props) {
    super(props);
    this.state = {
      accepting: true,
      showCamera: false,
      boxOverlay: null,
      boxPath: null
    }
  }

  componentDidMount() {
    const type = 'camera'
    this.permissions = new PermissionsCheck({
      type,
      context: this,
      updateState: this.permissionsStateUpdate,
      failedAlert: `${ type } permissions are required`,
      requestAlertTitle: `Can we access your camera, please?`,
      requestAlertText: `We need to access your camera to read QR Codes.`,
      requestAlertTextSettings: `We need to access your camera to read QR Codes, please enable it in settings`,
    })

    this.permissions.checkPermissions()
  }

  permissionsStateUpdate = (state) => {
    let update = {}

    if (state.permission) {
      update.photoPermission = state.permission
    }

    if (state.result === true) {
      update.showCamera = true
    }

    this.setState(update)
  }

  _captureQr(code, boxPath) {
    let boxOverlay = null
    if (code.hasOwnProperty('bounds')) {
      boxOverlay = {
        left: parseInt(code.bounds.origin.x),
        top: parseInt(code.bounds.origin.y) + 10,
        width: parseInt(code.bounds.size.width) + parseInt(code.bounds.size.width * 0.1),
        height: parseInt(code.bounds.size.height) + parseInt(code.bounds.size.height * 0.1),
        borderWidth: 4,
        borderColor: '#65f442',
        position: 'absolute',
        zIndex: 10
      }
    }

    this.setState({accepting: false, boxOverlay, boxPath, showCamera: false})
    if (Platform.OS === 'android') {
      this.context.store.dispatch({ type: 'LOADING' })
    }

    try {
      let data = code.data
      let this2 = this
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this2.context.store.dispatch({
            type: "READ_QR_CODE",
            qrtoken: data,
            position: position,
            onError: this._error.bind(this2),
            onSuccess: this2._success.bind(this2)
          })
        },
        (error) => {
          Alert.alert('Error', 'Location is required to add awards via QR', [
            {
              text: 'OK',
              onPress: () => {
                this.setState({accepting: true, showCamera: true})
                if (Platform.OS === 'android') {
                  this.context.store.dispatch({ type: 'NOT_LOADING' })
                }
              }
            }
          ])
        },
        {
          enableHighAccuracy: Platform.select({
            ios: true,
            android: false,
          }),
          timeout: 5000,
          maximumAge: 10000,
        },
      )


    } catch (e) {
      this.setState({accepting: true})
      alert('Invalid QR Code..')
    }

  }

  _readQr(code) {
    if (this.state.accepting) {
      this.setState({accepting: false})


      if (Platform.OS === 'ios') {
        this.camera.capture({metadata: {}})
          .then((data) => {

            this._captureQr(code, data.path)

          })
          .catch(err => console.error(err))
      } else {
        this._captureQr(code, null)
      }


    }

  }

  _success(r, qrtoken) {
    Alert.alert(
      'Confirmation needed',
      `Do you want to add ${r.data.name} to your profile?`,
      [
        {
          text: 'Cancel', onPress: () => {
          this.setState({accepting: true, showCamera: true, boxOverlay: false})
          if (Platform.OS === 'android') {
            this.context.store.dispatch({ type: 'NOT_LOADING' })
          }
        }, style: 'cancel'
        },
        {
          text: 'OK', onPress: () => {
          confirmQrCode(qrtoken)
        }
        },
      ]
    )
  }

  _error(error) {
    Alert.alert(
      'Error',
      error,
      [
        {
          text: 'OK', onPress: () => {
          this.setState({accepting: true, showCamera: true, boxOverlay: null})
        }
        },
      ],
      {
        cancellable: false
      }
    )


  }


  render() {


    if (this.state.showCamera) {
      return (
        <View style={styles2.container}>
          <Camera
            ref={(cam) => {
              this.camera = cam;
            }}
            style={styles2.preview}
            aspect={Camera.constants.Aspect.fill}
            onBarCodeRead={this._readQr.bind(this)}
            captureTarget={Camera.constants.CaptureTarget.disk}
            orientation={Camera.constants.Orientation.portrait}
          >
          </Camera>
        </View>
      )
    } else if (this.state.boxPath) {
      return (
        <Image style={styles.backgroundImage} source={{url: this.state.boxPath}}>
          <View style={this.state.boxOverlay}>
          </View>
        </Image>
      )
    } else {
      return null
    }


  }
}

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
})
