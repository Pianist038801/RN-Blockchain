
import BaseComp from './base_component.js'
import React, { Component } from 'react';
import {
  WebView
} from 'react-native';


import styles from '../style.js'
import {Actions} from 'react-native-router-flux';

import validatePassword from '../lib/password_validation.js'


import _ from 'underscore'

export default class WebpageView extends BaseComp {

  constructor(props, context){
    super(props);

  }

  
  
  render() {
    return (
      <WebView
        source={{uri: this.props.url}}
        style={{marginTop: 20}}
      />
    );
  }
}