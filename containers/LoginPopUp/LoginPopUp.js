import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { Button } from 'nachos-ui'
import { Actions } from 'react-native-router-flux'
import style from '../../style'

const LoginPopUp = () => (
  <ScrollView style={style.loginPopupContainer}>
    <View style={style.loginPopupTitleWrapper}>
      <Text style={style.loginPopupTitle}>
        CAUTION
      </Text>
    </View>
    <View style={style.loginPopupTextWrapper}>
      <Text style={style.loginPopupText}>
        Please ensure this is your primary mobile device for the APPII App.
      </Text>
    </View>
    <View style={style.loginPopupTextWrapper}>
      <Text style={style.loginPopupText}>
        By logging in to the App on this device you
        will be restricted from using the App on other devices.
      </Text>
    </View>
    <View style={style.loginPopupTextWrapper}>
      <Text style={style.loginPopupText}>
        These measures are to protect your personal data and privacy.
      </Text>
    </View>
    <View style={style.loginPopupTextWrapper}>
      <Text style={style.loginPopupText}>
        Further information can be found in the APPII FAQs
      </Text>
    </View>
    <View style={style.loginPopupButtonWrapper}>
      <Button
        kind='rounded'
        type='danger'
        style={style.loginPopupButton}
        onPress={Actions.login}
        textStyle={style.loginPopupButtonText}
        uppercase={false}
      >
        Continue to Log In
      </Button>
    </View>
  </ScrollView>
)

export default LoginPopUp
