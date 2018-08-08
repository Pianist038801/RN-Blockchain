import BaseComp from '../../components/base_component.js'
import React from 'react'
import {
  View,
  Image
} from 'react-native'
import {Actions} from 'react-native-router-flux'
import {Button} from 'nachos-ui'
import styles from '../../style.js'

export default class SplashView extends BaseComp {
  constructor(props) {
    super(props)
    this.state = {
      showLoginPopup: false
    }
  }

  _registerButton() {
    Actions.register_name()
  }

  _loginButton() {
    Actions.login_popup()
  }

  render() {
    return (
      <View style={styles.splashView}>
        <Image source={require('../../assets/img/lonely_logo.png')} style={styles.appiiLonelyLogo} />

        <Button
          kind='rounded'
          type='danger'
          style={styles.splash_registerButton}
          onPress={this._registerButton.bind(this)}
          textStyle={styles.buttonText}
          uppercase={false}
        >
          Register
        </Button>

        <Button
          kind='rounded'
          type='danger'
          style={styles.splash_loginButton}
          onPress={this._loginButton.bind(this)}
          textStyle={styles.buttonText}
          uppercase={false}
        >
          Login
        </Button>
      </View>
    )
  }
}
