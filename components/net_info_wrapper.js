import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  NetInfo,
  ActivityIndicator,
  Dimensions
} from 'react-native';

import { defaultFont } from '../style';


export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      request: false,
      isConnected: true,
    }
  }

  componentDidMount() {
    this.setState({
      request: true,
    }, () => {
      NetInfo.isConnected.fetch().then(
        isConnected => {
          this.setState({
            isConnected,
            request: false,
          });
          NetInfo.isConnected.addEventListener('change', this.handleNetChange);
        }
      );
    })
  }

  componentWillUnmount() {
    NetInfo.removeEventListener('change', this.handleNetChange);
  }

  handleNetChange = (isConnected) => {
    this.setState({ isConnected })
  };

  handleCheckInternetConnection = () => {
    this.setState({
      request: true
    }, () => {
      NetInfo.isConnected.fetch().then(
        isConnected => this.setState({ isConnected, request: false })
      );
    })
  };

  renderNoConnectionView = () => (
    <View style={style.overlay}>
      <Text style={style.text}>No internet connection</Text>
      <View style={style.buttonWrapper}>
        {
          this.state.request ?
            <ActivityIndicator
              size="large"
              animating={true}
              color="white"
            />
            :
            <TouchableOpacity
              onPress={this.handleCheckInternetConnection}
              style={style.checkConnectionButton}
            >
              <Text style={style.text}>Check internet connection</Text>
            </TouchableOpacity>
        }
      </View>
    </View>
  );

  render() {
    const { isConnected } = this.state;
    if (isConnected) {
      return null;
    }
    return this.renderNoConnectionView();
  }
}


const { width, height } = Dimensions.get('window');

const style = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,.9)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    width,
    height,
  },
  text: {
    fontFamily: defaultFont,
    fontSize: height*0.03,
    color: '#fff',
  },
  buttonWrapper: {
    marginTop: 20,
  },
  checkConnectionButton: {
    backgroundColor: '#3771ce',
    padding: 10,
    borderRadius: 10,
  }
};


