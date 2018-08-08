import { Alert } from 'react-native'
import Permissions from 'react-native-permissions'

class PermissionsCheck {

  constructor (opts) {
    if (!opts.context || !opts.updateState || typeof opts.updateState !== 'function') {
      throw 'Incomplete options'
    }

    const type = opts.type || 'photo'

    this.opts = {
      type,
      failedAlert: `${ type } permissions are required`,
      requestAlertTitle: `Can we access ${ type }`,
      requestAlertText: `We need to access ${ type }`,
      requestAlertTextSettings: `We need to access ${ type }, please enable it in settings`,
      requestAlertNo: 'No',
      requestAlertOk: 'OK',
      requestAlertSettings: 'Open Settings',
      ...opts
    }

    this.context = this.opts.context
    this.updateState = opts.updateState
  }

  checkPermissions = () => {
    Permissions.check(this.opts.type).then(response => {
      if (response === 'authorized') {
        this.context.setState({showCamera: true, photoPermission: response})
        this.updateState({ result: true, permission: response })
      } else {
        this.updateState({ result: false, permission: response })
        this.alertForPhotosPermission(response)
      }
    })
  }

  requestPermissions = () => {
    Permissions.request(this.opts.type).then(response => {
      if (response === 'authorized') {
        this.updateState({ result: true, permission: response })
      } else {
        alert(this.opts.failedAlert)
        this.updateState({ result: true, permission: response })
      }
    })
  }

  openSettings = () => {
    Permissions.openSettings()
    this.updateState({ result: false, openSettings: true })
  }

  declined = () => {
    this.updateState({ result: false, declined: true })
  }

  alertForPhotosPermission(permission) {
    let alertText = this.opts.requestAlertText

    if (permission !== 'undetermined') {
      alertText = this.opts.requestAlertTextSettings
    }

    Alert.alert(
      this.opts.requestAlertTitle,
      alertText,
      [
        {
          text: this.opts.requestAlertNo,
          style: 'cancel',
          onPress: this.declined
        },
        permission === 'undetermined'
          ? { text: this.opts.requestAlertOk, onPress: this.requestPermissions }
          : { text: this.opts.requestAlertSettings, onPress: this.openSettings },
      ],
    )
  }

}

module.exports = PermissionsCheck
