
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

import styles from '../style.js'
import {Actions} from 'react-native-router-flux';


export default class PeopleView extends BaseComp {

  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    let people = [
        {name:'Game Tester',occupation: 'Nintendo'},
        {name: 'General Practitioner', occupation: 'NHS'},
        {name: 'Editor', occupation: 'The Telegraph'}
      ];

    this.state = {
      dataSource: this.ds.cloneWithRows(people),
      refreshing: false,
      people: people
    };
  }

  componentDidMount() {
    this._isMounted = true
    this.unsubscribe = this.context.store.subscribe(() => {
      if (this._isMounted) {
        this.setState({dataSource: this.ds.cloneWithRows(this.state.people), refreshing: false})
      }
    });

  }

  componentWillUnmount() { 
    this._isMounted = false
    this.unsubscribe();
  }

  componentWillMount() {

  }

  _renderRow(row) {
    return (
      <View style={styles.pageListItem}>
        <Image source={require('../assets/img/appii_icon.png')} style={styles.pliIcon} />
        <Text style={styles.pliHead}>{row.name}</Text>
        <Text style={styles.pliDate}>{row.occupation}</Text>
      </View>
    )
  }

  _renderHeader() {
    return (
      <Text style={styles.plHeader}>OPPORTUNITIES</Text>
    )
  }

  _onRefresh() {

  }

  render() {

    return (
      <View>
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
          renderSectionHeader={this._renderHeader}
          renderRow={this._renderRow}
        />

      </View>
      

    );
  }
}