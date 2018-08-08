import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

const style = {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1
  },
  bg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height
  }
}

export default style
