
import BaseComp from './base_component.js'
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ListView,
  RefreshControl,
  TouchableOpacity
} from 'react-native';
import Tabs from 'react-native-tabs';


import moment from 'moment'

import styles from '../style.js'
import {Actions} from 'react-native-router-flux';

const logoGreen = require('../assets/img/logo-green.png');
const logoYellow = require('../assets/img/logo-yellow.png');
const logoGrey = require('../assets/img/logo-grey.png');
const logoRed = require('../assets/img/logo-red.png');

export default class LearningLogView extends BaseComp {

  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this.ds.cloneWithRows([]),
      refreshing: true
    };
  }

  componentDidMount() {
    this._isMounted = true
    this.unsubscribe = this.context.store.subscribe(() => {
      const log = this.context.store.getState().log
      if (this._isMounted && log !== null) {
        this.setState({
          dataSource: this.ds.cloneWithRows(log),
          dataLen: this.context.store.getState().log.length,
          refreshing: false
        })
      }
    });

  }

  componentWillUnmount() { 
    this._isMounted = false
    this.unsubscribe();
  }

  componentWillMount() {
    this.context.store.dispatch({type:"LOAD_LOG"});
  }

  _renderRow(row) {
    var date = moment(row.date).format("DD/MM/YY")
    var img_source = require('../assets/img/appii_icon.png')
    if (row.logo_image) { 
      var img_source = {uri:row.logo_image}
    }


    var status, logo, type

    switch (row.status) {
      case "verified":
        status = "Verified"
        logo = logoGreen
        break;
      case "pending_verification":
        status = "Pending"
        logo = logoYellow
        break;
      case "declined":
        status = "Declined"
        logo = logoRed
        break;
      default: 
        status = "Not Verified"
        logo = logoGrey
    }


    switch (row.type) {
      case 'education':
        type = 'Education'
        break;
      case 'job':
        type = "Employment"
        break;
      case 'award':
        type = "Award"
        break;
      default:
        type = "Unknown"
    }

    return (
      <View style={styles.pageListItem}>
        <Image source={img_source} style={styles.pliIcon} />
        <Text style={styles.pliHead}>
          <Text style={styles.bold}>{row.organisation}</Text> {"\n"}
          {row.assertion} {"\n"}
          {type}
        </Text>
        <Text style={styles.pliDate}>
          {date}
        </Text>
        <Image source={logo} style={styles.logStatusLogo} />
        <Text style={styles.logStatusText}>{status}</Text>
        <View style={styles.pageListBreak}></View>
      </View>
    )
  }

  _renderHeader() {
    if (this.state.dataLen == 0) {
      return <Text style={styles.emptyHeader}>Nothing yet...</Text>
    } else {
      return null
    }
  }

  _onRefresh() {
    this.setState({refreshing:true});
    this.context.store.dispatch({type:"LOAD_LOG"});
  }

  render() {

    return (
      <View style={styles.contentContainer}>
        <ListView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
          style={styles.pageListView}
          enableEmptySections
          dataSource={this.state.dataSource}
          // renderSectionHeader={this._renderHeader}
          renderRow={this._renderRow}
        />

      </View>
      

    );
  }
}