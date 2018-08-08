
import BaseComp from './base_component.js'
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import Tabs from 'react-native-tabs';

import styles from '../style.js'
import {Actions} from 'react-native-router-flux';


import {
  Button,
  Input,
  Spinner
} from 'nachos-ui'


import validatePassword from '../lib/password_validation.js'

export default class RegisterPasswordView extends BaseComp {

  constructor(props){
    super(props);
    this.state = {
      password: "",
      password_confirm: ""
    }
    this._fail = this._fail.bind(this)
  }

  _registerPress() {
    var password = this.state.password
    var confirm = this.state.password_confirm
    
    var validate = validatePassword(password, confirm)

    if (validate !== true) {
      this._fail(validate)
      return
    }

    this.context.store.dispatch({type:'REGISTER',data:this.state})
    Actions.register_email()
  }


  _fail(msg) {
    Alert.alert(msg)
    this.setState({
      password: "",
      password_confirm: ""
    })
  }

  render() {

    return (
      <View style={styles.bgImageLogin}>
        <View style={styles.formContainer}>
            <Text style={styles.registerHeader}>Set a password</Text>
            <Input
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize='none'
              style={styles.input}
              inputStyle={styles.inputText}
              textAlign='center'
              placeholder='Password'
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              underlineColorAndroid='transparent'
            />
            <Input
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize='none'
              style={styles.input}
              textAlign='center'
              placeholder='Confirm'
              value={this.state.password_confirm}
              onChangeText={password_confirm => this.setState({ password_confirm })}
              underlineColorAndroid='transparent'
            />
             <Text style={styles.registerTermsText}>
              Your password should be at least 8 characters long, and contain at least 1 capital letter, and 1 number
            </Text>
            <Button 
              kind='rounded' 
              type='danger'
              style={styles.inputButton}
              inputStyle={styles.inputText}
              onPress={this._registerPress.bind(this)}
              textStyle={styles.buttonText}
              uppercase={false}
            >
              Continue
            </Button>
          </View>
      </View>
    );
  }
}