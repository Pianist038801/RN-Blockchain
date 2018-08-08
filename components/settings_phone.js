
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

export default class SettingsPhoneView extends BaseComp {

  constructor(props, context){
    super(props);
    let profile = context.store.getState().profile

    this.state = {
      telephone: profile.telephone,
      mobile: profile.mobile
    }
   
  }

  componentDidMount() {

    
    this._isMounted = true
    this.unsubscribe = this.context.store.subscribe(() => {
      if (this._isMounted) {
        let profile = this.context.store.getState().profile
        this.setState({
          telephone: profile.telephone,
          mobile: profile.mobile
        })
      }
    });

  }

  componentWillUnmount() { 
    this._isMounted = false
    this.unsubscribe();
  }

  validatePhone(number) {
    return true
    // return number.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im); 
  }


  _buttonPress() {
    if (!this.validatePhone(this.state.number)) {
      this._fail('Please enter a valid telephone number')
      return
    }
    this.context.store.dispatch({type:"UPDATE_PROFILE", data:this.state})
  }

  _fail(msg) {
    Alert.alert(msg)
 
  }

  
  render() {
    return (
      <View style={styles.contentContainerCenter}>
        <View style={styles.formContainer}>
          <Text style={styles.settingsTermsText}>
            Telephone
          </Text>
          <Input
            autoCorrect={false}
            keyboardType="phone-pad"
            autoCapitalize='none'
            style={styles.input}
            inputStyle={styles.inputText}
            textAlign='center'
            placeholder='Telephone'
            value={this.state.telephone}
            onChangeText={telephone => this.setState({ telephone })}
            underlineColorAndroid='transparent'
          />

          <Text style={styles.settingsTermsText}>
            Mobile
          </Text>
          <Input
            autoCorrect={false}
            keyboardType="phone-pad"
            autoCapitalize='none'
            style={styles.input}
            inputStyle={styles.inputText}
            textAlign='center'
            placeholder='Mobile'
            value={this.state.mobile}
            onChangeText={mobile => this.setState({ mobile })}
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