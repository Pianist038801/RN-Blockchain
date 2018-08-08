import BaseComp from './base_component.js'
import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ListView,
  RefreshControl,
  TouchableOpacity,
  Alert
} from 'react-native';
import styles from '../style.js'
import Icon from 'react-native-vector-icons/Entypo';
import moment from 'moment'
import Ecies from '../lib/Ecies.js'
import Config from '../config.js'
import Swipeout from 'react-native-swipeout'


export default class SigningView extends BaseComp {

  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: this.ds.cloneWithRows([]),
      refreshing: false
    }

    this.MOMENT_FORMAT = 'MM/YY'
  }

  componentDidMount() {
    this._isMounted = true
    this.unsubscribe = this.context.store.subscribe(() => {
      if (this._isMounted) {
        this.setState({
          dataSource: this.ds.cloneWithRows(this.context.store.getState().mobilequeue),
          refreshing: false,
          dataLen: this.context.store.getState().mobilequeue.length
        })
      }
    })
  }

  componentWillUnmount() {
    this._isMounted = false
    this.unsubscribe()
  }

  componentWillMount() {
    this.context.store.dispatch({type: "LOAD_SIGNINGQUEUE"})
  }

  _pressRow(row) {
    let payload = row.job_data.payload
    let data = ""
    if (payload) {
      for (let property in payload) {
        if (payload.hasOwnProperty(property)) {
          if (payload[property]) {
            let item = payload[property]
            if (['start_date', 'end_date'].includes(property)) {
              if (item == '0000-00-00') {
                item = 'present'
              } else {
                item = moment(payload[property]).format(this.MOMENT_FORMAT)
              }
            }

            data = data + property + ': ' + item + '\n'
          }
        }
      }
    }

    Alert.alert(
      'Do you want to sign this verification?',
      data,
      [
        {
          text: 'Cancel', onPress: () => {
        }, style: 'cancel'
        },
        {
          text: 'OK', onPress: () => {
          this.context.store.dispatch({type: 'SIGN_VERIFICATION', verification: row})
        }
        },
      ]
    )
  }

  _renderRow(row, sectionId, rowId) {
    row.icon = null
    if (row && row.type === "verification") {
      if (row.job_data.hasOwnProperty('payload_enc')) {
        let keys = this.context.store.getState().keys
        try {
          row.icon =
            <Icon name="lock" style={{...styles.settingsIcon, ...{position: 'absolute', right: 5, bottom: 5}}}/>
          row.job_data['payload'] = Ecies.decrypt(keys.privateKey, Config.webapp_pubkey, row.job_data.payload_enc)
        } catch (e) {
          return null
        }
      }
    }

    return this._renderRow2(row, sectionId, rowId)
  }

  _renderRow2(row, sectionId, rowId) {
    let req_from, req_type, req_details, line2, line3, icon, end_date
    if (row && row.type === "verification") {
      let start_date = moment(row.job_data.payload.start_date).format(this.MOMENT_FORMAT)
      if (row.job_data.payload.end_date === '0000-00-00') {
        end_date = 'Present'
      } else {
        end_date = moment(row.job_data.payload.end_date).format(this.MOMENT_FORMAT)
      }

      row.date = moment(row.data).format('D/M/YYYY')

      req_type = row.job_data.type
      switch (row.job_data.type) {
        case 'education':
          req_details = `${row.job_data.payload.institution}`
          if (row.job_data.payload.type === 'secondary') {
            try {
              const results = JSON.parse(row.job_data.payload.results)
              line2 = results[0].subject
              if (results.length > 1) {
                line2 += ` + ${results.length - 1} more`
              }
            } catch (e) {
              line2 = 'Unknown subject'
            }
          } else {
            line2 = `${row.job_data.payload.degree} in ${row.job_data.payload.studied}`
          }
          line3 = `Graduated on ${end_date}`
          break
        case 'job':
          req_details = `${row.job_data.payload.company}`
          line2 = row.job_data.payload.position
          line3 = `Employed ${start_date} to ${end_date}`
          break
        case 'award':
          req_details = row.job_data.payload.organisation
          line2 = row.job_data.payload.name
          line3 = row.job_data.payload.organisation
          break
      }


      if (row.job_data.side === "request") {
        req_from = "You"
        try {
          icon = this.context.store.getState().profile.profile_image
        } catch (e) {
          icon = null
        }
      } else if (row.job_data.side === 'validate') {
        req_from = `${row.job_data.from.first_name} ${row.job_data.from.last_name}`
        if (row.job_data.hasOwnProperty('to') && row.job_data.to.logo_image) {
          icon = row.job_data.to.logo_image
        }
      }

      if (icon) {
        icon = {uri: icon}
      } else {
        icon = require('../assets/img/appii_icon.png')
      }

      const swipeButtons = [
        {
          text: <Icon
            name="trash"
            size={20}
            color="#ffffff"
          />,
          type: 'delete',
          onPress: () => {
            this._delete(rowId)
            this.context.store.dispatch({ type: 'MOBILEQUEUE_DELETE', id: row.id })
          }
        }
      ]

      return (
        <Swipeout
          right={swipeButtons}
          backgroundColor='#ffffff'
          autoClose={true}
        >
          <TouchableOpacity onPress={this._pressRow.bind(this, row)}>
            <View style={styles.pageListItem}>
              <Image source={icon} style={styles.pliIcon}/>
              <Text style={styles.pliHead}>
                <Text style={styles.bold}>{req_from}</Text> {'\n'}
                {line2}{'\n'}
                {line3}
              </Text>
              <Text style={styles.pliDate}>{row.date}</Text>

              {row.icon}
            </View>
            <View style={styles.pageListBreak}></View>
          </TouchableOpacity>
        </Swipeout>
      )

    }
  }

  _delete = (index) => {
    console.log('deleting', index)
    let queue = this.context.store.getState().mobilequeue
    console.log('queue', queue)
    queue.splice(index, 1)
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(queue),
      dataLen: queue.length
    });
  }

  _renderHeader() {
    // return (
    //   <Text style={styles.plHeader}>SIGN REQUESTS</Text>
    // )
    if (this.state.dataLen == 0) {
      return <Text style={styles.emptyHeader}>There are no verification requests yet...</Text>
    } else {
      return null
    }

  }

  _onRefresh() {
    this.setState({refreshing: true})
    this.context.store.dispatch({type: "LOAD_SIGNINGQUEUE"})
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
          renderSectionHeader={this._renderHeader.bind(this)}
          renderRow={this._renderRow.bind(this)}
        />
      </View>
    )
  }
}