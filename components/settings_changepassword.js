
import BaseComp from './base_component.js'
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Alert
} from 'react-native';

import {
  Button,
  Input,
  Spinner
} from 'nachos-ui'

import styles from '../style.js'
import {Actions} from 'react-native-router-flux';

import validatePassword from '../lib/password_validation.js'


import _ from 'underscore'

export default class SettingsChangePasswordView extends BaseComp {

  constructor(props, context){
    super(props);

    this.state = {
      existing_password: "",
      new_password: "",
      password_confirm: ""
    }
   
  }

  componentDidMount() {

    
    this._isMounted = true
    this.unsubscribe = this.context.store.subscribe(() => {
      if (this._isMounted) {
        this.setState({})
      }
    });

  }

  componentWillUnmount() { 
    this._isMounted = false
    this.unsubscribe();
  }


  _buttonPress() {
    var password = this.state.new_password
    var confirm = this.state.password_confirm
    
    var validate = validatePassword(password, confirm)

    if (validate !== true) {
      this._fail(validate)
      return
    }

    this.context.store.dispatch({type:"CHANGE_PASSWORD", data:this.state})
  }

  _fail(msg) {
    Alert.alert(msg)
    this.setState({
      new_password: "",
      password_confirm: ""
    })
  }

  
  render() {
    return (
      <View style={styles.contentContainerCenter}>
        <View style={styles.formContainer}>
          <Input
            secureTextEntry={true}
            autoCorrect={false}
            autoCapitalize='none'
            style={styles.input}
            inputStyle={styles.inputText}
            textAlign='center'
            placeholder='Existing Password'
            value={this.state.existing_password}
            onChangeText={existing_password => this.setState({ existing_password })}
            underlineColorAndroid='transparent'
          />
          
          <Input
            secureTextEntry={true}
            autoCorrect={false}
            autoCapitalize='none'
            style={styles.input}
            inputStyle={styles.inputText}
            textAlign='center'
            placeholder='Password'
            value={this.state.new_password}
            onChangeText={new_password => this.setState({ new_password })}
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
           <Text style={styles.settingsTermsText}>
            Your password should be at least 8 characters long, and contain at least 1 capital letter, and 1 number
          </Text>
          <Button 
            kind='rounded' 
            type='danger'
            style={styles.inputButton}
            inputStyle={styles.inputText}
            onPress={this._buttonPress.bind(this)}
            textStyle={styles.buttonText}
            uppercase={false}
          >
            Update
          </Button>
        </View>
        
      </View>
    );
  }
}