
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
} from 'react-native';
import DatePicker from 'react-native-datepicker'

import styles from '../style.js'
import {Actions} from 'react-native-router-flux';


import {
  Button,
  Input,
  Spinner
} from 'nachos-ui'


import moment from 'moment'


export default class RegisterDobView extends BaseComp {

  constructor(props){
    super(props);
    this.MOMENT_FORMAT = "D MMMM YYYY"
    this.today = moment().subtract(16,'years').format(this.MOMENT_FORMAT)
    this.state = {
      dob: "15 February 1988"
    };

  }

  _registerPress() {

    this.context.store.dispatch({
      type: 'REGISTER',
      data: Object.assign(this.state, {
        dob: moment(this.state.dob, this.MOMENT_FORMAT).format('YYYY-MM-DD')
      })
    })
    Actions.register_password()
  }

  onDateChange(date) {
    this.setState({dob: date});
  };

  render() {

    return (
      <View style={styles.bgImageLogin}>
        <View style={styles.formContainer}>
            <Text style={styles.registerHeader}>When is your birthday?</Text>
            <DatePicker
              mode="date"
              date={this.state.dob}
              onDateChange={this.onDateChange.bind(this)}
              format={this.MOMENT_FORMAT}
              maxDate={this.today}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              
              customStyles={{dateInput:styles.dateInput,dateText:styles.dateText}}
              style={styles.dateContainer}


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