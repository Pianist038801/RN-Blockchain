import React, { Component } from 'react'
import { View, Image, Text, Alert, Platform,
  KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback
} from 'react-native'
import { Button, Input } from 'nachos-ui'
import { getUrl } from '../../lib/actions'
import styles from '../../style'

class ForgotPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      sending: false
    }
    this.genericError = 'An error occured. Please try again.'
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(event) {
    event.preventDefault()
    const { email } = this.state
    if (email !== '' && email.indexOf('@') !== -1 && email.indexOf('.') !== -1) {
      this.setState({ sending: true })
      fetch(`${getUrl()}/apis/userapi/v0.1/user/recoverPassword?email=${email}`, {
        method: 'GET'
      })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        if (data.status === 'success') {
          Alert.alert('Success', data.message)
        } else {
          const msg = data.message || this.genericError
          Alert.alert('Sorry', data.message)
        }
        this.setState({ sending: false })
      })
      .catch(() => {
        Alert.alert('Sorry', this.genericError)
        this.setState({ sending: false })
      })
    } else {
      Alert.alert('Error', 'Please enter an email')
    }
  }

  render() {
    const { email, sending } = this.state
    const buttonLabel = !sending ? 'Send' : 'Please wait'

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : "position"}>
          <View style={styles.bgImageLogin}>
            <Image source={require('../../assets/img/appii_text_logo.png')} style={styles.appiiTextLogo} />
            <Text style={styles.forgotPasswordTitle}>Recover your password</Text>
            <View style={styles.inputContainer}>
              <Input
                autoCorrect={false}
                keyboardType="email-address"
                autoCapitalize='none'
                style={styles.input}
                textAlign='center'
                placeholder='Email address'
                value={this.state.email}
                onChangeText={(email) => this.setState({ email })}
                underlineColorAndroid='transparent'
              />
            </View>
            <Button
              kind="rounded"
              type="danger"
              style={styles.inputButton}
              disabled={sending}
              onPress={this.onSubmit}
            >
              {buttonLabel}
            </Button>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    )
  }
}

export default ForgotPassword
