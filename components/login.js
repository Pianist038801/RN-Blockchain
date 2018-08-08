import React from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Clipboard,
  Animated
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import _ from 'underscore'
import {
  Button,
  Input,
  Spinner
} from 'nachos-ui'
import BaseComp from './base_component.js'
import styles, {width, height} from '../style.js'
import AbSDK from '../lib/absdk.js'
import config from '../config'

const AB = new AbSDK({})

class LoginOverlay extends BaseComp {
  render() {
    return (
      <View
        style={styles.loginSpinner}
      >
        <Spinner />
      </View>
    )
  }
}

class loginBox extends BaseComp {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  componentDidMount() {
    this._isMounted = true
    this.unsubscribe = this.context.store.subscribe(() => {
      // this.setState({loginOverlay: this.context.store.getState().loginOverlay})
      if (this._isMounted) {
        this.forceUpdate()
      }
    })
  }

  componentWillUnmount() {
    this._isMounted = false
    this.unsubscribe()
  }

  _loginPress() {
    this.setState({
      loginOverlay: true
    })

    this.context.store.dispatch({
      type: 'LOGIN',
      data: {
        username: this.state.username,
        password: this.state.password
      }
    })
  }

  _forgotPasswordPress() {
    Actions.forgot_password()
  }

  render() {
    const inputStyle = {}
    return (
      <View style={styles.loginBoxView}>
        { this.context.store.getState().loginOverlay ? <LoginOverlay /> : null }
        <View style={styles.formContainer}>
          <Input
            autoCorrect={false}
            keyboardType="email-address"
            autoCapitalize='none'
            style={styles.input}
            textAlign='center'
            placeholder='Email address'
            value={this.state.username}
            onChangeText={username => this.setState({ username })}
            underlineColorAndroid='transparent'
          />
          <Input
            secureTextEntry={true}
            style={styles.input}
            textAlign='center'
            placeholder='Password'
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            underlineColorAndroid='transparent'
          />
          <Button
            kind='rounded'
            type='danger'
            style={styles.inputButton}
            onPress={this._loginPress.bind(this)}
          >
            Login
          </Button>
        </View>
        <View style={{marginTop: height*0.1}}>
          <TouchableOpacity onPress={this._forgotPasswordPress}>
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

class registerBox extends BaseComp {
  render() {
    return (
      <View style={{position: 'absolute', bottom: 0, height: 200, width: 500}}>
        <Text>Register</Text>
      </View>
    )
  }
}

export default class LoginView extends BaseComp {
  constructor(props){
    super(props)
    this.state = {
      tab:'login',
      presses: 0
    }

    this.logoHeight = new Animated.Value(styles.appiiTextLogo.height)
  }

  componentWillMount () {
    this.setState({ presses: 0 })

    // Android Doesn't have keyboardWillShow/Hide :(
    if (Platform.OS === 'ios') {
      this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)
      this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)
    } else {
      this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow)
      this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide)
    }
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove()
    this.keyboardWillHideSub.remove()
  }

  keyboardWillShow = (event) => {
    Animated.timing(this.logoHeight, {
      duration: (Platform.OS === 'ios') ? event.duration : 100,
      toValue: height*0.05,
    }).start()
  }

  keyboardWillHide = (event) => {
    Animated.timing(this.logoHeight, {
      duration: (Platform.OS === 'ios') ? event.duration : 100,
      toValue: styles.appiiTextLogo.height,
    }).start()
  }

  _incrementHiddenPress = () => {
    let presses = this.state.presses + 1
    this.setState({ presses })
  }

  _longHiddenPress = () => {
    const presses = this.state.presses
    if (presses >= 11) {
      this.setState({ presses: 0 })
      Alert.alert(
        'Developer Menu',
        'This menu is intended for APPII testing only, are you sure you wish to continue?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'OK', onPress: this._selectEnvironment },
        ],
        { cancelable: false }
      )
    } else if (presses === 3) {
      this.setState({ presses: 0 })
      Alert.alert(
        'Diagnostic Menu',
        'This menu is intended for helping interactions with APPII support, do you wish to continue?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'OK', onPress: this._selectDiagnostic },
        ],
        { cancelable: false }
      )
    }
  }

  _selectDiagnostic = () => {
    Alert.alert(
      'Select task',
      `Choose a task`,
      [
        {text: 'Copy keys to clipboard', onPress: async () => {
          this.context.store.dispatch({type: 'LOADING'})
          const keys = await AB.getKeys()
          this.context.store.dispatch({type: 'NOT_LOADING'})
          try {
            const json = JSON.stringify(_.omit(keys, 'privateKey', 'mnemonic'))
            Clipboard.setString(json)
            alert('Keys copied')
          } catch (e) {
            alert('Failed')
          }
        }}
      ],
      { cancelable: true }
    )
  }

  _selectEnvironment = () => {
    const envs = config.environments
    let menu = []
    for (let [key, env] of Object.entries(envs)) {
      menu.push({
        text: env.label, onPress: () => {
          this.context.store.dispatch({type: 'STORE_ENV', key, env})
        }
      })
    }

    menu.push({
      text: 'Cancel'
    })

    Alert.alert(
      'Select environment',
      `Current Env: ${this.context.store.getState().env.label}`,
      menu,
      { cancelable: true }
    )
  }

  render() {
    let Box = registerBox

    if (this.state.tab == 'login') {
      Box = loginBox
    }

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.bgImageLogin}>
            <TouchableWithoutFeedback onPress={this._incrementHiddenPress} delayLongPress={3000} onLongPress={this._longHiddenPress}>
              <Animated.Image source={require('../assets/img/appii_text_logo.png')} style={{...styles.appiiTextLogo, height: this.logoHeight, marginBottom: this.logoHeight}}  />
            </TouchableWithoutFeedback>
            <Box scrollFocus={this.props.scrollFocus} />
          </View>
      </TouchableWithoutFeedback>
    )
  }
}
