import { Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

const style = {
  profileEntityVerification: {
    width: width * 0.1,
    height: width * 0.1,
    resizeMode: 'contain'
  }
}

export default style
