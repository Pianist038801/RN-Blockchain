
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


import * as Keychain from 'react-native-keychain';

import validatePassword from '../lib/password_validation.js'


import _ from 'underscore'

export default class SettingsMnemonicView extends BaseComp {

  constructor(props, context){
    super(props);

    this.state = {
      mnemonic: "",
      mnemonicSplit: [],
      slide: 0,
      buttonText: 'Next'
    }
   
  }

  componentDidMount() {

    Keychain.getGenericPassword('apk5')
    .then((credentials) => {
      var cred = JSON.parse(credentials.password)


      this.setState({
        mnemonic: cred.mnemonic,
        mnemonicSplit: cred.mnemonic.split(" ")
      })

    })
    
    this._isMounted = true
    this.unsubscribe = this.context.store.subscribe(() => {
      if (this._isMounted) {
        this.setState({

        })
      }
    });

  }

  componentWillUnmount() { 
    this._isMounted = false
    this.unsubscribe();
  }


  _buttonPress() {

   length = this.state.mnemonicSplit.length-1

    if (this.state.slide <= (length-1)) {
      this.setState({
        slide: this.state.slide + 1
      })
    } else if(this.state.slide == length) {
      this.setState({
        slide: this.state.slide + 1,
        buttonText: 'Finish'
      })
    } else {
      Actions.pop()
    }

  }


  
  render() {

    return (
      <View style={styles.contentContainerCenter}>
        <View style={styles.formContainer}>

          <View>
            <Text style={styles.settingsTermsText}>
              Here you can back up your private key. This key is important because it enables you to control your identity on the APPII platform
            </Text>
            <Text style={styles.settingsTermsText}>
              Please write each word down and keep the words safe. Press 'next' to continue
            </Text>
          </View>
        

          <View style={{alignItems: 'center'}}>
            <Text style={{...styles.settingsTermsText,...{textAlign:'center'}}}>{(this.state.slide) ? `Word ${this.state.slide}` : ''}</Text>
            <Text style={{...styles.settingsTermsText,...{fontSize:20,textAlign:'center'}}}>{(this.state.slide) ? this.state.mnemonicSplit[this.state.slide-1] : ''}</Text>
          </View>
        
        
          
  
           
          <Button 
            kind='rounded' 
            type='danger'
            style={styles.inputButton}
            inputStyle={styles.inputText}
            onPress={this._buttonPress.bind(this)}
            textStyle={styles.buttonText}
            uppercase={false}
          >
            {this.state.buttonText}
          </Button>
        </View>
        
      </View>
    );
  }
}