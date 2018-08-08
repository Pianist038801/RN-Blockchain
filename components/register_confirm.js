import React from 'react';
import {
  View,
  Text
} from 'react-native';

import styles from '../style.js'
import {Actions} from 'react-native-router-flux';


import { Button } from 'nachos-ui'


export default props => (
  <View style={styles.bgImageLogin}>
    <Text style={{...styles.stdHead, marginTop: styles.stdHead.marginTop+10}}>
      Confirm registration
    </Text>
    <Text style={styles.stdText}>
      We have sent you an email, please follow the instructions to complete registration.
    </Text>
    <Button
      kind='rounded'
      type='danger'
      style={styles.inputButton}
      onPress={() => Actions.splash({type:'reset'})}
      textStyle={styles.buttonText}
      uppercase={false}
    >
      Login
    </Button>
  </View>
);