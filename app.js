/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import './shim'
import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActionSheetIOS,
  StatusBar,
  ActivityIndicator
} from 'react-native'
import OneSignal from 'react-native-onesignal'
import * as Keychain from 'react-native-keychain'
import { Actions, Scene, Router, NavBar } from 'react-native-router-flux'
import { Provider } from 'react-redux'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import Icon from 'react-native-vector-icons/FontAwesome'
import { themeManager } from 'nachos-ui'
import BaseComp from './components/base_component.js'
import store from './lib/store_instance'
import styles from './style.js'
import Splash from './containers/Splash'
import ForgotPassword from './containers/ForgotPassword'
import LoginView from './components/login.js'
import LoginPopUp from './containers/LoginPopUp'
import LearningLogView from './components/learninglog.js'
import SigningView from './components/signing.js'
import QrView from './components/qr.js'
import PeopleView from './components/people.js'
import OpportunitiesView from './components/opportunities.js'
import SearchOrganizationView from './components/search_organization'
import Profile from './containers/Profile'
import WebpageView from './components/webview.js'
import ProfileImageView from './components/profile_image'
import SettingsView from './components/settings.js'
import SettingsChangePasswordView from './components/settings_changepassword.js'
import SettingsEmailView from './components/settings_email.js'
import SettingsPhoneView from './components/settings_phone.js'
import SettingsMnemonicView from './components/settings_mnemonic.js'
import RegisterNameView from './components/register_name.js'
import RegisterDobView from './components/register_dob.js'
import RegisterPasswordView from './components/register_password.js'
import RegisterEmailView from './components/register_email.js'
import RegisterConfirmView from './components/register_confirm.js'
import RegisterVerification from './containers/RegisterVerification'
import RestoreMnemonicView from './components/restore_mnemonic'
import AboutAppView from './components/about_app'
import SettingsIcon from './containers/Profile/components/SettingsIcon'
import NetInfoWrapper from './components/net_info_wrapper'
import AbSDK from './lib/absdk.js'

StatusBar.setBarStyle('light-content', true)

const inputTheme = themeManager.getStyle('Input')
const newInputTheme = {
  ...inputTheme,
  INPUT_NORMAL_COLOR: styles.inputText.color
}
themeManager.setSource('Input', () => (newInputTheme))

const AB = new AbSDK({})

const withBackButton = {
  navigationBarStyle: styles.navBar,
  backTitle: "BACK",
  backButtonTextStyle: styles.backButtonTextStyle
}

const scenes = Actions.create(
  <Scene key="root" barButtonIconStyle={styles.barButtonIconStyle} titleStyle={styles.navBarTitleStyle} navigationBarStyle={styles.navBar}>
    <Scene key="profile" component={Profile} title="Profile" renderRightButton={() => <SettingsIcon />} />
    <Scene key="profile_image" component={ProfileImageView} title="Profile Image" />
    <Scene key="learninglog" component={LearningLogView} title="Log" />
    <Scene key="people" component={PeopleView} />
    <Scene key="opportunities" component={OpportunitiesView} />
    <Scene key="verification" component={SigningView} title="Verification" />
    <Scene key="qr" component={QrView}  title="QR Code" />
    <Scene key="webview" component={WebpageView} />
    <Scene key="settings" component={SettingsView} title="Settings" />
    <Scene key="settings_changepassword" component={SettingsChangePasswordView} title="Password" />
    <Scene key="settings_email" component={SettingsEmailView} title="Email" />
    <Scene key="settings_phone" component={SettingsPhoneView} title="Phone" />
    <Scene key="settings_mnemonic" component={SettingsMnemonicView} title="Backup" />
    <Scene key="search_organization" component={SearchOrganizationView} />
    <Scene key="about_app" component={AboutAppView} title="About App" />
    <Scene key="register_verify" component={RegisterVerification} navigationBarStyle={styles.navBar} />
  </Scene>
)

const loginScenes = Actions.create(
  <Scene key="root" barButtonIconStyle={styles.barButtonIconStyle}>
    <Scene key="splash" component={Splash} navigationBarStyle={styles.navBar} initial={true} />
    <Scene key="login" component={LoginView} navigationBarStyle={styles.navBar} />
    <Scene key="forgot_password" component={ForgotPassword} {...withBackButton} />
    <Scene key="register_name" component={RegisterNameView} navigationBarStyle={styles.navBar} />
    <Scene key="register_dob" component={RegisterDobView} navigationBarStyle={styles.navBar} />
    <Scene key="register_password" component={RegisterPasswordView} navigationBarStyle={styles.navBar} />
    <Scene key="register_email" component={RegisterEmailView} navigationBarStyle={styles.navBar} />
    <Scene key="register_confirm" component={RegisterConfirmView} navigationBarStyle={styles.navBar} />
    <Scene key="login_popup" component={LoginPopUp} {...withBackButton} />
    <Scene key="webview" component={WebpageView} />
    <Scene key="restore_mnemonic" component={RestoreMnemonicView} navigationBarStyle={styles.navBar} />
  </Scene>
)

class AppHeader extends BaseComp {
  _appiiPress() {
    const BUTTONS = [
      'Logout',
      'Get keys',
      'Clear keys',
      'Cancel'
    ]

    ActionSheetIOS.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: BUTTONS.length - 1,
    },
    async (buttonIndex) => {
      switch(buttonIndex) {
        case 0:
          store.dispatch({type:'LOGOUT'})
          break
        case 1:
          let keys = await AB.getKeys()
          break
        case 2:
          await AB.clearKeys()
          break
      }
    });
  }

  _settingsPress() {
    Actions.settings()
  }

  _getRoute() {
    var route = this.context.store.getState().route

    var routes = {
      qr: 'QR Code',
      verification: 'Verification',
      opportunities: 'Opportunities',
      people: 'People',
      learninglog: 'Log',
      profile: 'Profile',
      settings: 'Settings'
    }

    if (routes.hasOwnProperty(route)) {
      return routes[route];
    }

    return null
  }

  render() {
    var route = this._getRoute()

    // if (route == "Settings") {
    //   var leftButton = (
    //       <TouchableOpacity onPress={()=>{Actions.profile({type:'reset'})}}>
    //         <Icon name="chevron-left" style={styles.leftIcon} />
    //       </TouchableOpacity>
    //   )
    // } else {
      var leftButton = (
          <TouchableOpacity onPress={this._appiiPress.bind(this)}>
            <Image source={require('./assets/img/appii_icon.png')} style={styles.searchBtn} />
          </TouchableOpacity>
      )
    // }

    return (
      <View style={styles.headerBlock}>
        {leftButton}
        <Text style={styles.headerTitle}>{route}</Text>
        <TouchableOpacity onPress={this._settingsPress.bind(this)}>
          <Image source={require('./assets/img/settings.png')} style={styles.settingsBtn} />
        </TouchableOpacity>
      </View>
    )
  }
}

class AppFooter extends BaseComp {
  constructor(props) {
    super(props);
    this.state = {
      verificationQ: 0
    }
  }

  componentDidMount() {
    this._isMounted = true
    this.unsubscribe = this.context.store.subscribe(() => {
      const state = this.context.store.getState()
      this.setState({
        verificationQ: state.mobilequeue.length,
      });
    });
  }

  componentWillUnmount() {
    this._isMounted = false
    this.unsubscribe()
  }

  images() {
    let images = [
      {
        title: 'profile',
        on: require('./assets/img/nav/home_on.png'),
        off: require('./assets/img/nav/home_off.png'),
      },
      {
        title: 'verification',
        on: require('./assets/img/nav/verification_on.png'),
        off: require('./assets/img/nav/verification_off.png'),
      },
      {
        title: 'qr',
        on: require('./assets/img/nav/qr_on.png'),
        off: require('./assets/img/nav/qr_off.png'),
      },
      {
        title: 'learninglog',
        on: require('./assets/img/nav/log_on.png'),
        off: require('./assets/img/nav/log_off.png'),
      }
    ]

    icons = []

    let i = 0
    let cur = this.context.store.getState().route
    images.forEach((image) => {
      i++
      if (image.title == cur) {
        var img = image.on
      } else {
        var img = image.off
      }

      icons.push(
        <TouchableOpacity
          onPress={() => { if (Actions.hasOwnProperty(image.title)) {Actions[image.title]({type:'reset'})} }}
          key={i}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 50 }}
        >
          <View>
            <Image source={img} style={styles.footerIcon}  />
            {
              (image.title === 'verification' && this.state.verificationQ > 0) &&
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>{this.state.verificationQ}</Text>
              </View>
            }
          </View>
        </TouchableOpacity>
      )
    })

    return icons
  }

  render() {
    let img = this.images()

    return (
      <View style={styles.footerMenu}>
        {img}
      </View>
    )
  }
}

class LoadingOverlay extends BaseComp {
  render() {
    const loadingText = this.context.store.getState().loadingText
    return (
      <View
        style={styles.loadingSpinner}
      >
        {loadingText &&
          <Text style={styles.loadingText}>{loadingText}</Text>
        }
        <ActivityIndicator color={'white'} size='large'/>
      </View>
    )
  }
}

export default class appii extends BaseComp {
  constructor(props) {
    super(props)

    this.state = {
      top: 0,
      loggedIn: false,
      checkingGenericPassword: true
    }
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
        this.setState({
          loggedIn: store.getState().loggedIn,
          checkingGenericPassword: store.getState().checkingGenericPassword
        })
      const { keys, loggedIn } = store.getState()
      if (!keys && loggedIn) {
        Keychain.getGenericPassword('apk5').then(data => {
          const keys = JSON.parse(data.password)
          store.dispatch({ type: 'SET_KEYS', keys })
        })
      }
    })
    store.dispatch({type:'APP_INIT'})
    OneSignal.addEventListener('ids', this.saveOneSignalId)
    OneSignal.addEventListener('opened', this.onOpenNotification)
    OneSignal.addEventListener('received', this.onReceivedNotification)
    OneSignal.inFocusDisplaying(0)
  }

  componentWillUnmount() {
    this.unsubscribe()
    OneSignal.removeEventListener('ids', this.saveOneSignalId)
    OneSignal.removeEventListener('opened', this.onOpenNotification)
    OneSignal.removeEventListener('received', this.onReceivedNotification)
  }

  saveOneSignalId = payload => {
    store.dispatch({ type: 'SAVE_ONESIGNAL_ID', payload: payload.userId })
  }

  onOpenNotification = openResult => {
    const { notification: { payload } } = openResult;
    this.processNotification(payload, true)
  }

  onReceivedNotification = notification => {
    const { payload } = notification;
    this.processNotification(payload, false)
  }

  processNotification = (payload, opened, attempted) => {
    if (payload) {
      try {
        switch (payload.additionalData.type) {
          // Signing requests
          case 'signing_request':
            if (Platform.OS === 'android') {
              alert('New signing request')
            }
            if (opened) {
              Actions.verification({type: 'reset'})
            } else {
              store.dispatch({type: 'LOAD_SIGNINGQUEUE'})
            }
            break

          // Biometrics Result
          case 'biometrics_accepted':
          case 'biometrics_declined':
            Actions.settings()
            break
        }
      } catch (e) {
        // Failures are usually because router hasn't registered yet, they are rare but this quick hack
        // offers an opportunity to recover gracefully in most cases.
        if (!attempted) {
          setTimeout(() => {
            this.processNotification(payload, opened, true)
          }, 1000)
        }
      }
    }
  }

  updateRoute(r) {
    if (r.type == 'REACT_NATIVE_ROUTER_FLUX_FOCUS') {
      store.dispatch({type: 'UPDATE_ROUTE_NEW', route: r.scene.name})
    }
  }

  _scrollFocus(focus=true) {
    let top = 0;
    if (focus == true) {
      // top = -220
      top = 0
    }

    this.setState({
      top: top
    })
  }

  render() {
    const wrapperStyle = {
      ...ifIphoneX({
        paddingTop: 10,
        paddingBottom: 30
      }, {
        paddingTop: 0
      })
    }

    let { loggedIn, checkingGenericPassword } = this.state
    if (checkingGenericPassword) {
      return null
    }

    if (!loggedIn) {
      return (
        <Provider store={store}>
          <View style={styles.root}>
            <View style={styles.contentView}>
              <Router scenes={loginScenes}  />
            </View>
            { (store.getState().loading) ? <LoadingOverlay /> : null }
            <NetInfoWrapper/>
          </View>
        </Provider>
      )
    }

    return (
      <Provider store={store}>
        <View style={styles.footer}>
          <View style={styles.contentView}>
            { (store.getState().loading) ? <LoadingOverlay /> : null }
            <Router scenes={scenes} dispatch={this.updateRoute.bind(this)} />
          </View>
          <AppFooter />
          <NetInfoWrapper/>
        </View>
      </Provider>
    )
  }
}
