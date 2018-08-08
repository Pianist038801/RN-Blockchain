
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

import {keysBeforeLogin} from '../lib/actions'
import {validateMnemonic} from '../lib/bip39'
import Mnemonic from 'bitcore-mnemonic'

const words = require('../lib/wordlists/english.json')


export default class RestoreMnemonicView extends BaseComp {

  constructor(props){
    super(props);
    this.lastWasBackspace = false
    this.state = {
      word: 0,
      mnemonic: '',
      currentText: '',
      buttonLabel: 'Next',
      editable: true,
      complete: false
    }
  }

  _searchWords(term) {
    if (term.length === 1 ) {
      return null
    }

    let results = []
    for (let word of words) {
      if (word.startsWith(term)) {
        if (results.length > 0) {
          return false
        }
        results.push(word)
      }
    }

    if (results.length === 1) {
      return results[0]
    } else {
      return false
    }
  }

  _updateText(text) {
    if (!this.state.editable) {
      return
    }
    let currentText = text
    const last = this.state.currentText.substring(0, this.state.currentText.length - 1)
    let editable = true
    let complete = false
    const search = this._searchWords(text)

    if (search && search !== text && !this.state.complete) {
      currentText = search
      editable = false
      complete = true
    } else if (this.state.complete && currentText === last) {
      currentText = ''
    }

    this.setState({currentText, editable, complete})

    if (!editable) {
      setTimeout(() => {
        this.setState({
          editable: true
        })
      },1000)
    }
  }

  _nextPress() {
    let finalMnemonic = this.state.mnemonic + this.state.currentText

    if (this.state.word < 11) {
      this.setState({
        mnemonic: finalMnemonic + ' ',
        currentText: '',
        word: this.state.word + 1,
        buttonLabel: this.state.buttonLabel
      }, () => {
      })
    } else {
      let isValid
      try {
        isValid = Mnemonic.isValid(finalMnemonic.toLowerCase().trim())
      } catch (e) {
        isValid = false
      }

      if (isValid) {
        this.context.store.dispatch({type:'LOADING'})
        alert('Key restore successful')
        keysBeforeLogin(this.props.email, this.props.password, finalMnemonic)
      } else {
        alert('Invalid mnemonic')
        this.setState({
          mnemonic: '',
          currentText: '',
          word: 0
        })
      }


    }
  }

  render() {
    return (
      <View style={styles.bgImageLogin}>
        <View style={styles.formContainer}>
            <Text style={styles.registerHeader}>Please enter word { this.state.word + 1 }</Text>
            <Input
              autoCorrect={false}
              autoCapitalize='none'
              style={styles.input}
              inputStyle={styles.inputText}
              textAlign='center'
              value={this.state.currentText}
              onChangeText={this._updateText.bind(this)}
              underlineColorAndroid='transparent'
              editable={this.state.editable}
            />
       
            <Button 
              kind='rounded' 
              type='danger'
              style={styles.inputButton}
              onPress={this._nextPress.bind(this)}
              textStyle={styles.buttonText}
              uppercase={false}
            >
              {this.state.buttonLabel}
            </Button>
          </View>
      </View>
    );
  }
}