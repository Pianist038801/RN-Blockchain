import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  ScrollView,
  NativeModules,
  Dimensions,
  ActivityIndicator
} from 'react-native'
import {Button} from 'nachos-ui'
import {Actions} from 'react-native-router-flux'
import {biometricsVerify} from '../../lib/actions'
import style, {width, height} from '../../style'
import BaseComp from '../../components/base_component.js'
import PermissionsCheck from '../../lib/PermissionsCheck'

const au10tix = NativeModules.RNAu10tix

class RegisterVerification extends BaseComp {
  constructor(props) {
    super(props)
    this.state = {
      face: null,
      doc: null,
      cameraPermissions: false
    }
    this.permissions = {}
  }

  componentDidMount() {
    this.permissions = new PermissionsCheck({
      type: 'camera',
      context: this,
      updateState: this.permissionsStateUpdate,
      failedAlert: 'Camera permissions are required',
      requestAlertTitle: 'Can we access your camera, please?',
      requestAlertText: 'We need to access your camera to complete verification',
      requestAlertTextSettings: 'We need to access your camera to complete verification, please enable it in settings',
    })

    this.permissions.checkPermissions()
  }

  _checkPermissions = () => {
    this.permissions.checkPermissions()
  }

  permissionsStateUpdate = (state) => {
    if (state.result === true) {
      this.setState({cameraPermissions: true})
    }
  }

  takeImage() {
    const currentType = this.state.doc === null ? 'doc' : 'face'
    const error = currentType === 'face' ?
      'Face not found' : 'Document not found'

    au10tix.launchCamera(currentType, (err, data) => {
      if (err) {
        alert(error)
        return
      }

      this.setState({
        [currentType]: data,
      })

      if (currentType === 'face') {
        biometricsVerify(
          {
            doc: this.state.doc,
            face: data
          },
          (message = "Success") => {
            alert(message)
            Actions.settings()
          },
          (e) => {
            this.setState({
              face: null,
              doc: null
            })
            alert(e)
          }
        )
      }
    })
  }

  render() {
    const { loading } = this.props
    const { doc } = this.state
    const { height: heightOfDeviceScreen } = Dimensions.get('window')
    let button = null
    if (this.state.cameraPermissions) {
      button = <Button
        onPress={this.takeImage.bind(this)}
        textStyle={style.buttonText}
        kind='rounded'
        type='danger'
        style={{...style.loginPopupButton, zIndex: 1}}
        uppercase={false}
        disabled={loading}
      >
        {doc !== null ? 'Take selfie' : 'Take ID photo'}
      </Button>
    } else {
      button = <Button
        onPress={this._checkPermissions}
        textStyle={style.buttonText}
        kind='rounded'
        type='danger'
        style={{...style.loginPopupButton, zIndex: 1}}
        uppercase={false}
      >
        Enable Camera
      </Button>
    }

    return (
      <View style={style.contentContainer}>
        <ScrollView contentContainerStyle={{minHeight: heightOfDeviceScreen}}>
          <View style={style.loginPopupTitleWrapper}>
            <Text style={[style.loginPopupTitle, {color: 'black'}]}>
              Biometric Identification
            </Text>
          </View>
          <View style={style.loginPopupTextWrapper}>
            <Text style={[style.loginPopupText, {color: 'black'}]}>
              This process allows you to perform biometric identification with APPII{"\n"}{"\n"}

              Please first provide your photo ID, ensuring to fill the entire frame over the camera with the document,
              leaving just the edges visible. {"\n"}{"\n"}

              Afterwards you will be prompted to take a selfie. Please ensure that you are in a well let area and that
              you take a clear and sharp image of your face.
            </Text>
          </View>
        </ScrollView>
        <View style={{
          position: 'absolute',
          bottom: 50,
          left: width / 2 - width * 0.35,
        }}>
          <View>
            {button}
          </View>
        </View>
      </View>

    )
  }
}

RegisterVerification.propTypes = {
  loading: PropTypes.bool.isRequired
}

export default RegisterVerification
