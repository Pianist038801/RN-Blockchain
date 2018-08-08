import React from 'react';
import { View, Text } from 'react-native';
import BaseComp from './base_component.js'

import DeviceInfo from 'react-native-device-info';

import styles from '../style.js';

import AbSDK from '../lib/absdk.js'
const AB = new AbSDK({})

export default class AboutApp extends BaseComp {
  constructor (props) {
    super(props)
    this.state = {
      appVersion: DeviceInfo.getVersion(),
      keyVersion: null
    }

  }

  componentWillMount () {
    this._loadKeys()
  }

  async _loadKeys() {
    const keys = await AB.getKeys()
    this.setState({
      keyVersion: keys.version
    })
  }

  render() {
    return (
      <View style={styles.contentContainer}>
        <View style={{ marginTop: 10, padding: 10 }}>
          <Text style={[styles.loginPopupText, { color: 'black', paddingBottom: 18, fontSize: 18 }]}>
            Current app version: {this.state.appVersion}{"\n"}
            Key Version: {this.state.keyVersion}
          </Text>
        </View>
      </View>
    );
  }
}

