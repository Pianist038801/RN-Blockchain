
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
  Alert,
  Platform
} from 'react-native';
import Tabs from 'react-native-tabs';

import styles from '../style.js'
import {Actions} from 'react-native-router-flux';


import {
  Button,
  Input,
  Spinner
} from 'nachos-ui'




export default class RegisterNameView extends BaseComp {

  constructor(props){
    super(props);
    this.state = {
      first_name: "",
      last_name: ""
    }

    this._validate = this._validate.bind(this)
  }

  _validate() {
    var state = this.state
    if (state.first_name.length < 1) {
      Alert.alert('Please enter a first name')
      return false
    }

    if (state.last_name.length < 1) {
      Alert.alert('Please enter a last name')
      return false
    }

    return true

  }

  _registerPress() {
    if (this._validate()) {
      this.context.store.dispatch({
        type: 'REGISTER',
        data: this.state
      })
      Actions.register_dob()
    }
  }

  render() {

    return (
      <View style={styles.bgImageLogin}>
        <View style={styles.formContainer}>
            <Text style={styles.registerHeader}>What is your name?</Text>
            <Input
              autoCorrect={false}
              autoCapitalize='words'
              style={styles.input}
              inputStyle={styles.inputText}
              textAlign='center'
              placeholder='First Name'
              value={this.state.first_name}
              onChangeText={first_name => this.setState({ first_name })}
              underlineColorAndroid='transparent'
            />
            <Input
            autoCorrect={false}
              autoCapitalize='words'
              style={styles.input}
              inputStyle={styles.inputText}
              textAlign='center'
              placeholder='Last Name'
              value={this.state.last_name}
              onChangeText={last_name => this.setState({ last_name })}
              underlineColorAndroid='transparent'
            />
            <Text style={styles.registerTermsText}>
              <Text>{`By tapping “Register & Accept”, you agree to the `}</Text>
              <Text
              style={styles.hyperlink}
                onPress={() => { Actions.webview({ url: 'http://appii-dev.appb.ch/terms-of-use-2' }) }}>
                {`Terms of Service`}
              </Text>
              <Text>{` and `}</Text>
              <Text
                style={styles.hyperlink}
                onPress={() => { Actions.webview({ url: 'http://appii-dev.appb.ch/privacy-policy-2' }) }}>
                {`Privacy Policy.`}
              </Text>
            </Text>

            <Button 
              kind='rounded' 
              type='danger'
              style={styles.inputButton}
              onPress={this._registerPress.bind(this)}
              textStyle={styles.buttonText}
              uppercase={false}
            >
              Register & Accept
            </Button>
          </View>
      </View>
    );
  }
}