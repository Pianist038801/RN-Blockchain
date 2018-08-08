import React from 'react'
import {
  Text,
  View,
  ScrollView,
  Image,
  RefreshControl,
  TouchableOpacity
} from 'react-native'
import ActionSheet from 'react-native-actionsheet-native'
import { Actions } from 'react-native-router-flux'
import BaseComp from '../../components/base_component.js'
import styles from '../../style.js'
import ProfileBackground from './components/ProfileBackground'
import Awards from './components/Awards'
import Jobs from './components/Jobs'
import Educations from './components/Educations'
import VerifiedIcon from './components/VerifiedIcon'
const iconDanger = require('../../assets/img/icon-danger.png')
const iconDone = require('../../assets/img/done_ico.png')

export default class ProfileView extends BaseComp {
  constructor(props, context) {
    super(props)
    this.state = {
      refreshing: false,
      profile: context.store.getState().profile,
      profileEntities: context.store.getState().profileEntities
    }
  }

  componentDidMount() {
    this.context.store.dispatch({type: 'UPDATE_ROUTE', route: 'profile'});
    var delay = 1
    if (this.state.profile) {
      delay = 500
    }

    setTimeout(function(){
      this.context.store.dispatch({type:'LOAD_PROFILE'})
    }.bind(this), delay)

    this._isMounted = true
    this.unsubscribe = this.context.store.subscribe(() => {
      if (this._isMounted) {
        this.setState({
          profile: this.context.store.getState().profile,
          profileEntities: this.context.store.getState().profileEntities
        })
      }
    })
  }

  componentWillUnmount() {
    this._isMounted = false
    this.unsubscribe()
  }

  _onRefresh() {
    this.context.store.dispatch({ type:'LOAD_PROFILE' })
  }

  _profileImageMenu() {
    const BUTTONS = [
      'Take Profile Image',
      'Cancel'
    ]

    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: BUTTONS.length - 1,
    }, (idx) => {
      if (idx === 0) {
        Actions.profile_image()
      }
    })
  }

  render() {
    if (!this.state.profile) {
      return null
    }

    var profile = this.state.profile

    var bgColors = {
      'standard': '#8971d5',
      'new-age': '#bbbbbb',
      'classic': '#e76582',
      'none': '#d9d9d9'
    }

    var theme = profile.background_theme

    var profileStyle = styles.profileView

    if (bgColors.hasOwnProperty(theme)) {
      profileStyle = {...styles.profileView, ...{backgroundColor: bgColors[theme]}}
    }

    var location
    if (profile.town && profile.country) {
      location = <Text style={styles.profileLocation}>{profile.town}, {profile.country}</Text>
    } else {
      location = null
    }
    const iconVerified = (profile.biometrics_status !== 'complete') ? iconDanger : iconDone

    return (
      <View style={{ flex: 1 }}>
        <ProfileBackground
          bgColor={profile.background_color || 'FFFFFF'}
          bgImage={profile.background_image}
        />
        <ScrollView
          style={styles.contentContainer}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
        >
          <View style={styles.profileView}>
            <View style={styles.profileContent}>
              <Text style={styles.profileName}>{profile.first_name} {profile.last_name}</Text>
              <View style={styles.profileHr} />
              <View style={styles.profileTagLineWrapper}>
                <Text style={styles.profileDescription}>{profile.tagline}</Text>
              </View>
              { location }
              <View style={styles.profileEntitySection}>
                <Text style={styles.profileEntityHeader}>Work Experience</Text>
                <Jobs jobs={this.state.profileEntities.jobs} />
              </View>

              {this.state.profileEntities.educations &&
              this.state.profileEntities.educations.length > 0 &&
              <View style={styles.profileEntitySection}>
                <Text style={styles.profileEntityHeader}>Education</Text>
                <Educations educations={this.state.profileEntities.educations}/>
              </View>
              }
              <Awards awards={this.state.profileEntities.awards} />
            </View>
          </View>
          <TouchableOpacity
            onPress={this._profileImageMenu.bind(this)}
            style={styles.profileImageContainer}
          >
            <Image
              source={{uri: profile.profile_image}}
              style={styles.profileImage}
            />
            <Image
              source={iconVerified}
              style={styles.profileIconVerified}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}
