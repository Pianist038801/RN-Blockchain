
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




export default class RegisterEmailView extends BaseComp {

  constructor(props){
    super(props);
    this.state = {
      email: "",
    }
  }


  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  _registerPress() {

    if (!this.validateEmail(this.state.email)) {
      this._fail('Please enter a valid email')
      return
    }

    this.context.store.dispatch({
      type: 'REGISTER',
      data: this.state
    });

  }

  _fail(message) {
    Alert.alert(message)
  }

  render() {

    return (
      <View style={styles.bgImageLogin}>
        <View style={styles.formContainer}>
            <Text style={styles.registerHeader}>What is your email?</Text>
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