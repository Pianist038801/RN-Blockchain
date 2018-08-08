import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Image, View, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'
import style, { height } from '../../../../style'

const wrapper = {
  height: 54,
  width: 54,
  marginTop: -20,
  marginLeft: -15,
  paddingTop: 12,
  paddingLeft: 20
}
const badgeContainer = {
  ...style.badgeContainer,
  width: height * 0.034,
  height: height * 0.034,
  borderRadius: height * 0.017,
  left: 15,
  top: 7
}

const SettingsIcon = (props) => {
  const { profile } = props
  const renderNotification = profile && profile.first_name &&
    !['complete', 'needs_review'].includes(profile.biometrics_status)

  return (
    <TouchableOpacity
      onPress={Actions.settings}
      style={wrapper}
    >
      <Image
        source={require('../../../../assets/img/settings.png')}
        style={style.settingsBtn}
      />
      {
        renderNotification &&
        <View style={badgeContainer}>
          <Text style={style.badgeText}>!</Text>
        </View>
      }
    </TouchableOpacity>
  )
}

SettingsIcon.propTypes = {
  profile: PropTypes.shape({
    first_name: PropTypes.string,
    biometrics_status: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ])
  })
}

export default SettingsIcon
