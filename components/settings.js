import React from 'react'
import {
  View,
  Alert
} from 'react-native'
import SettingsList from 'react-native-settings-list'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/Entypo'
import _ from 'underscore'
import BaseComp from './base_component.js'
import styles from '../style.js'

export default class SettingsView extends BaseComp {
  constructor(props, context) {
    super(props)
    const profile = context.store.getState().profile
    this.state = {
      switchValue: false,
      biometric_status: (profile) ? profile.biometrics_status : null
    }
  }

  componentDidMount() {
    this._isMounted = true
    this.unsubscribe = this.context.store.subscribe(() => {
      if (this._isMounted) {
        const profile = this.context.store.getState().profile
        this.setState({
          biometric_status: (profile) ? profile.biometrics_status : null
        })
      }
    })

    this.context.store.dispatch({ type: 'UPDATE_ROUTE', route: 'settings' })
  }

  componentWillUnmount() {
    this._isMounted = false
    this.unsubscribe()
  }

  onValueChange(value) {
    this.setState({ switchValue: value })
  }

  _logOut() {
    Alert.alert(
      'Log out',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', onPress: () => {} },
        { text: 'OK', onPress: () => this.context.store.dispatch({ type: 'LOGOUT' }) }
      ]
    )
  }

  _erase() {
    Alert.alert(
      'Erase all data?',
      'Are you sure you want to erase all data?',
      [
        { text: 'Cancel', onPress: () => {} },
        { text: 'OK', onPress: () => this.context.store.dispatch({ type: 'CLEAR_KEYS' }) },
      ]
    )
  }

  getBiometricsLinkCtx = () => {
    const {biometric_status} = this.state
    switch (biometric_status) {
      case 'needs_review':
        return {
          titleInfo: 'Your request is pending',
          hasNavArrow: false,
          titleInfoStyle: { color: 'orange', fontWeight: 'bold' },
          cssIcon: styles.settingsIcon
        }
      case 'complete':
        return {
          titleInfo: 'Verified',
          hasNavArrow: false,
          titleInfoStyle: { color: 'green', fontWeight: 'bold' },
          cssIcon: styles.settingsIcon
        }
      case 'failed':
      case null:
      case undefined:
        return {
          onPress: () => Actions.register_verify(),
          titleInfo: 'Verify your identity',
          titleStyle: {color: '#c00000'},
          titleInfoStyle: { color: '#ffb3b3' },
          cssIcon: {...styles.settingsIcon, ...styles.settingsIconDanger}
        }
      default:
        return null
    }
  }

  render() {
    const biometricsLinkProps = this.getBiometricsLinkCtx()
    const cssIconBiometric = biometricsLinkProps.cssIcon
    delete biometricsLinkProps.cssIcon

    return (
      <View style={styles.settingsContainer}>
        <SettingsList borderColor='#c8c7cc' defaultItemSize={50} underlayColor="#c0c0c0">
          <SettingsList.Header headerText='Account' headerStyle={{marginTop: 15}} />
          {
            biometricsLinkProps !== null &&
            <SettingsList.Item
              icon={
                <Icon name="fingerprint" style={cssIconBiometric} />
              }
              hasNavArrow={true}
              title="Biometrics"
              {...biometricsLinkProps}
            />
          }
          <SettingsList.Item
            icon={
              <Icon name="email" style={styles.settingsIcon} />
            }
            hasNavArrow={true}
            title='Email addresses'
            onPress={() => {
              Actions.settings_email()
            }}
          />
          <SettingsList.Item
            icon={
              <Icon name="phone" style={styles.settingsIcon} />
            }
            hasNavArrow={true}
            title='Phone numbers'
            onPress={() => {
              Actions.settings_phone()
            }}
          />
          <SettingsList.Item
            icon={
              <Icon name="dial-pad" style={styles.settingsIcon} />
            }
            hasNavArrow={true}
            title='Change password'
            onPress={() => {
              Actions.settings_changepassword()
            }}
          />
          <SettingsList.Item
            icon={
              <Icon name="key" style={styles.settingsIcon} />
            }
            hasNavArrow={true}
            title='Backup Private Key'
            onPress={() => {
              Actions.settings_mnemonic()
            }}
          />
          <SettingsList.Item
            icon={
              <Icon name="trash" style={styles.settingsIcon} />
            }
            hasNavArrow={true}
            title='Erase all data'
            onPress={this._erase.bind(this)}
          />
          <SettingsList.Item
            icon={
              <Icon name="log-out" style={styles.settingsIcon} />
            }
            hasNavArrow={true}
            title='Log out'
            onPress={this._logOut.bind(this)}
          />
          <SettingsList.Header headerText='Information' headerStyle={{marginTop: 15}} />
          <SettingsList.Item
            icon={
              <Icon name="mask" style={styles.settingsIcon} />
            }
            hasNavArrow={true}
            title='Privacy Policy'
            onPress={() => {
              Actions.webview({url: 'http://appii-dev.appb.ch/privacy-policy-2'})
            }}
          />
          <SettingsList.Item
            icon={
              <Icon name="text-document" style={styles.settingsIcon} />
            }
            hasNavArrow={true}
            title='Terms of Use'
            onPress={() => {
              Actions.webview({url: 'http://appii-dev.appb.ch/terms-of-use-2'})
            }}
          />
          <SettingsList.Item
            icon={
              <Icon name="info" style={styles.settingsIcon} />
            }
            hasNavArrow={true}
            title='About App'
            onPress={() => Actions.about_app()}
          />
        </SettingsList>
      </View>
    )
  }
}
