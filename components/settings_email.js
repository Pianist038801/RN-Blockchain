
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

export default class SettingsEmailView extends BaseComp {

  constructor(props, context){
    super(props);

    this.state = {
      email: context.store.getState().profile.email
    }
   
  }

  componentDidMount() {

    
    this._isMounted = true
    this.unsubscribe = this.context.store.subscribe(() => {
      if (this._isMounted) {
        this.setState({
          email: this.context.store.getState().profile.email
        })
      }
    });

  }

  componentWillUnmount() { 
    this._isMounted = false
    this.unsubscribe();
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }


  _buttonPress() {

    if (!this.validateEmail(this.state.email)) {
      this._fail('Please enter a valid email')
      return
    }

    this.context.store.dispatch({type:"UPDATE_PROFILE", data:this.state})
  }

  _fail(msg) {
    Alert.alert(msg)
    this.setState({
      email: "",
    })
  }

  
  render() {
    return (
      <View style={styles.contentContainerCenter}>
        <View style={styles.formContainer}>
          <Text style={styles.settingsTermsText}>
            Primary Email
          </Text>
          <Input
            autoCorrect={false}
            keyboardType="email-address"
            autoCapitalize='none'
            style={styles.input}
            inputStyle={styles.inputText}
            textAlign='center'
            placeholder='E-Mail'
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            underlineColorAndroid='transparent'
          />
         
           
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