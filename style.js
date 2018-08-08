import { StyleSheet, Platform, Image, Dimensions } from 'react-native'
import { ifIphoneX } from 'react-native-iphone-x-helper'

// TODO: calculate card widths from device width

export const defaultFont = 'Ubuntu'

export const {width, height} = Dimensions.get('window');

const bgColor = '#569cee'
const buttonColor = '#569cee'

const topPageMargin = Platform.OS === 'ios' ? 60 : 50;

const stdText = {
  fontFamily: defaultFont,
  fontSize: height*0.03,
  color: '#fff',
  backgroundColor: 'transparent',
  padding: height*0.015
}

const contentContainer = {

  ...ifIphoneX({
    marginTop: topPageMargin + 15,
  }, {
    marginTop: topPageMargin,
  }),
  flex: 1,
}

const inputColor = '#7e7e7e'

const styles = {
  root: {
    flex:1,
    backgroundColor: bgColor
  },
  barButtonIconStyle: {
    tintColor: '#ffffff'
  },
  contentContainer: contentContainer,
  contentContainerCenter: {...contentContainer,...{
    alignItems: 'center'
  }},
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    marginTop: 45,
    backgroundColor:'transparent',

  },
  containerMargin: {
    flex: 1,
    marginTop: 75,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center'
  },
  settingsContainer: {
    backgroundColor: '#EFEFF4',
    flex: 1,
    ...ifIphoneX({
      marginTop: 55 + 15
    }, {
      marginTop: 55
    })

  },
  contentView: Platform.select({
    ios: {
      ...ifIphoneX({
        height: height - 50 - 15
      }, {
        height: height - 50
      })
    },
    android: {
      height: height - 50 - 25
    }
  }),
  headerBox: {
    backgroundColor: 'red'
  },
  appiiTextLogo: {
    margin: height*0.13,
    height: height*0.1,
    resizeMode: 'contain',
  },
  profileView: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: '#d9d9d9',
    width: width,
    paddingBottom: 50,
  },
  profileContent: {
    marginTop: height*0.13 + 10,
    width: width * 0.9,
    flex: 1,
    alignItems: 'center',
    paddingTop: height*0.13,
    paddingBottom: 50,
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  profileImageContainer: {
    position: 'absolute',
    top: 10,
    left: width / 2 - (height*0.13),
    width: height*0.26,
    height: height*0.26,
  },
  profileImage: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: height*0.13,
    width: height*0.26,
    height: height*0.26,
  },
  profileName: {
    fontSize: height*0.05,
    marginTop: height*0.01,
    ...Platform.select({
      ios: { zIndex: 6 },
      android: {},
    })
  },
  profileDescription: {
    textAlign: 'center',
  },
  profileIconVerified: {
    width: 38,
    height: 38,
    position: 'relative',
    top: -38,
    left: 115
  },
  profileLocation: {
    marginTop: 10,
  },
  profileHr: {
    margin: height *0.01,
    width: width*0.8,
    borderBottomColor: '#d9d9d9',
    borderBottomWidth: 1
  },
  appiiLonelyLogo: {
    width: width*0.5,
    height: height*0.5,
    resizeMode: 'contain',
    marginTop: height*0.1
  },
  bgImage: {
    width: width,
    height: 80,
    backgroundColor: bgColor,
  },
  headerBlock: {
    flexDirection: 'row',
    width: width,
    height: 70,
    backgroundColor: bgColor,
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
    alignItems: 'center'
  },
  leftIcon: {
    fontSize: 22,
    color: buttonColor,
    marginTop: height*0.018
  },
  settingsIcon: {
    fontSize: 22,
    color: buttonColor,
    marginTop: height*0.019,
    marginLeft: width*0.01
  },
  settingsIconDanger: {
    color: '#c00000'
  },
  headerTitle: {
    textAlign: 'center',
    color: '#fff',
    fontSize: height*0.04,
    marginTop: height*0.02
  },
  splashView: {
    width: width,
    height: height,
    backgroundColor: bgColor,
    alignItems: 'center'
  },
  bgImageLogin: {
    width: width,
    height: height,
    backgroundColor: bgColor,
    alignItems: 'center'
  },
  searchBar: {
    position: 'absolute',
    top: 30,
    left: 10,
    width: width*0.85,
    height: 20,
    backgroundColor: '#fff'
  },
  searchBtn: {
    flex: 1,
    borderWidth: 0,
    width: 40,
    height: 40,
    resizeMode: 'contain'
  },
  settingsBtn: {
    width: 35,
    height: 35,
    resizeMode: 'contain'
  },
  registerNow: {
    fontFamily: defaultFont,
    fontSize: height*0.06,
    color: '#fff',
    backgroundColor: 'transparent',
    marginTop: height*0.03,
    padding: height*0.015,
    fontWeight: 'bold'
  },
  orange: {
    color: '#fe5e00'
  },
  stdHead: {...stdText,...{
    fontSize: height*0.05,
    padding: 0,
    marginTop: height*0.1
  }},
  stdText: stdText,
  loginTabs: {
    backgroundColor:'#fe5e00',
    position: 'absolute',
    bottom: height*0.4,
  },
  registerTermsText: {...stdText,...{
    fontSize: height*0.02
  }},
  settingsTermsText: {...stdText,...{
    fontSize: height*0.02,
    color: '#000',
    width: width*0.9,
  }},
  tabText: {
    fontFamily: defaultFont,
    fontSize: 25,
    color: '#fff',
  },
  pageListView: {
    backgroundColor: '#fff',
    height: height - 60 - 60
  },
  pageListItem: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    paddingTop: height*0.02,
    paddingBottom: height*0.03,
  },
  pageListBreak: {
    position: 'absolute',
    bottom: 1,
    right: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#e7e7e7',
    width: width*0.825
  },
  pliIcon: {
    height: width*0.15,
    width: width*0.15,
    resizeMode: 'contain'
  },
  plHeader: {
    backgroundColor: '#396ec3',
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    height: 32,
    paddingTop: 3
  },
  pliHead: {
    flex: 5,
    marginLeft: 15,
    fontSize: width*0.038,
    lineHeight: parseInt(width*0.05)
  },
  pliDate: {
    flex: 2,
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: width*0.035,
    lineHeight: parseInt(width*0.05)
  },
  pliExtra: {
    flex: 7
  },
  footerMenu: {
    paddingLeft: 10,
    paddingRight: 10,
    ...ifIphoneX({
      height: 50 + 15
    }, {
      height: 50,
    }),
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#d9d9d9',
    ...Platform.select({
      ios: { zIndex: 2 },
      android: {},
    })
  },
  footerIcon: {
    resizeMode: 'contain',
    width: 35,
    height: 35
  },
  registerHeader: {
    marginBottom: 20,
    color: '#fff',
    fontSize: height * 0.04,
    marginTop: height * 0.15,
    fontFamily: defaultFont,
    marginBottom: height * 0.05
  },
  formContainer: {
    width: width * 0.9,
    marginTop: 10,
    alignItems: 'center',
  },
  inputContainer: {
    width: width * 0.8
  },
  input: {
    marginBottom: 5,
  },
  inputText: {
    fontFamily: defaultFont,
    color: inputColor,
  },
  inputButton: {
    marginBottom: 10,
    backgroundColor: buttonColor,
    height: height*0.06,
    marginTop: height*0.02,
    borderColor: '#ffffff',
    borderWidth: 1
  },
  dateContainer: {
    width: width*0.9,
    padding: 10
  },
  dateInput: {
    backgroundColor: '#fff',
    width: width*0.8
  },
  dateText: {
    fontSize: height*0.03,
    fontFamily: defaultFont,
    color: inputColor
  },
  buttonText: {
    ...ifIphoneX({
      fontSize: height*0.025,
    }, {
      fontSize: height*0.03,
    }),
    fontFamily: defaultFont,
  },
  splash_registerButton: {
    marginTop: height*0.14,
    marginBottom: 10,
    backgroundColor: buttonColor,
    width: width*0.6,
    height: height*0.065,
    borderColor: '#ffffff',
    borderWidth: 1,
    zIndex: 10
  },
  splash_loginButton: {
    backgroundColor: bgColor,
    marginTop: height*0.02,
    zIndex: 9
  },
  loginBoxView: {
    alignItems: 'center',
    marginTop: -30,
    width: width
  },
  forgotPasswordText: {
    color: '#fff'
  },
  forgotPasswordTitle: {
    color: '#fff',
    fontSize: 20,
    marginTop: -60,
    marginBottom: 20
  },
  registerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  loginSpinner: {
    position: 'absolute',
    bottom: 0-(height*0.4),
    left: 0,
    zIndex: 10,
    backgroundColor: '#000',
    width: width,
    height: height,
    paddingLeft: width*0.40,
    paddingTop: height*0.4,
    opacity: 0.5
  },
  loadingSpinner: {
    position: 'absolute',
    top: 0,
    left: 0,
    ...Platform.select({
      ios: { zIndex: 15 },
      android: { elevation: 100 },
    }),
    backgroundColor: '#000',
    width: width,
    height: height,
    opacity: 0.75,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingText: {
    elevation: 101,
    color: '#ffffff',
    fontSize: 26,
    padding: width*0.05,
    paddingBottom: height*0.1,
    textAlign: 'center'
  },
  loadingSpinnerNoZ: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#000',
    width: width,
    height: height,
    opacity: 0.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  footer: {
    flex:1,
    backgroundColor: bgColor
  },
  navBar: {
    backgroundColor: bgColor,
    borderBottomWidth: 0,
    ...ifIphoneX({
      paddingTop: 15,
      height: 80
    }, {
      paddingTop: 0
    }),
  },
  navBarTitleStyle: {
    color: '#fff',
    fontSize: height*0.04,
    fontFamily: defaultFont,
    marginTop: 0- (height*0.005),


  },
  profileEntitySection: {
    marginTop: 30,
    flex: 1,
    marginBottom: 20,
    alignItems: 'center',
    //backgroundColor: 'transparent',
  },
  profileEntityHeader: {
    fontSize: height*0.03,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  profileEntityContainer: {
    flex: 0.5,
    alignItems: 'center',
    flexDirection: 'row',
    width: width*0.8,
    borderWidth: 1,
    borderColor: '#fff',
    marginBottom: 5,
    padding: width*0.03
  },
  profileEntitySubSection: {
    flex: 1,
    marginBottom: 20,
    alignItems: 'center'
  },
  profileTagLineWrapper: {
    paddingHorizontal: 20,
  },
  profileEntityContent: {
    marginLeft: width*0.03,
    width: width*0.48,

  },
  profileEntityRight: {
  },
  profileEntityDate: {
    textAlign: 'right',
  },
  profilePresentText: {
    fontSize: height*0.015,
  },
  profileEntityPrimaryText: {
    color: buttonColor,
    fontWeight: 'bold'
  },
  profileEntitySecondaryText: {
    color: '#000',
    width: width,
    marginTop: 5,
    marginBottom: 5
  },
  profileEntityVerification: {
    width: width*0.1,
    height: width*0.1,
    resizeMode: 'contain'
  },
  entityEmptyText: {
    color: inputColor,
    fontSize: 10
  },
  emptyHeader: {
    // textAlign: 'center',
    margin: 20
  },
  hyperlink: {
    color: '#0000ff',
    zIndex: 6,
    fontSize: height*0.02
  },
  termsLink: {
    width: width*0.32,
    height: height*0.005,
    marginLeft: width*0.027
  },
  privLink: {
    width: width*0.36,
    height: height*0.005,
    paddingLeft: width*0.05
  },
  bold: {
    fontWeight: 'bold'
  },
  logStatusLogo: {
    position: 'absolute',
    right: width*0.025,
    bottom: height*0.035,
    width: width*0.075,
    height: width*0.075,
    resizeMode: 'contain'
  },
  logStatusText: {
    position: 'absolute',
    bottom: height*0.01,
    right: width*0.025,
    fontSize: 10,
    textAlign: 'center'
  },
  backgroundImage: {
    top: 0,
    left: 0,
    width: width,
    height: height
  },
  loginPopupContainer: {
    backgroundColor: bgColor,
    flex: 1,
    paddingTop: Platform.select({
      ios: 25,
      android: 0,
    })
  },
  registerVerifyContainer: {
    flex: 1,
    backgroundColor: bgColor,
    paddingTop: Platform.select({
      ios: 25,
      android: 0,
    }),
  },
  registerVerifyButtonsBlock: {
    flex: 1,
    alignItems: 'center',
    marginTop: 60,
  },
  registerVerifySubmitBlock: {
    marginTop: 50,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  backButtonTextStyle: {
    fontFamily: defaultFont,
    fontSize: height*0.03,
    color: buttonColor,
  },
  loginPopupTitleWrapper: {
    marginTop: height*0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginPopupTitle: {
    marginTop: 10,
    fontFamily: defaultFont,
    fontSize: height*0.04,
    color: '#fff',
  },
  loginPopupTextWrapper: {
    paddingHorizontal: 30,
    marginTop: 20
  },
  loginPopupText: {
    fontFamily: defaultFont,
    ...ifIphoneX({
      fontSize: height*0.025,
    }, {
      fontSize: height*0.03,
    }),
    color: '#fff'
  },
  loginPopupButtonText: {
    fontFamily: defaultFont,
    fontSize: height * 0.025,
    color: '#fff'
  },
  loginPopupButtonWrapper: {
    marginTop: 25,
    paddingBottom: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginPopupButton: {
    backgroundColor: buttonColor,
    width: width * 0.8,
    height: height * 0.065,
    borderColor: '#fff',
    borderWidth: 1
  },
  searchOrgContainer: {
    flex: 1,
    paddingTop: Platform.select({
      ios: 64 + 20,
      android: 64 - 25 + 20,
    }),
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  searchOrgTitleWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchOrgTitleText: {
    fontFamily: defaultFont,
    fontSize: height*0.04,
  },
  searchOrgRowContainer: {
    paddingVertical: 10,
    borderBottomColor: bgColor,
    borderBottomWidth: 0.5,
  },
  searchOrgRowText: {
    fontFamily: defaultFont,
    fontSize: height*0.03,
  },
  badgeContainer: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    ...ifIphoneX({
      width: height*0.03,
      height: height*0.03,
    }, {
      width: height*0.04,
      height: height*0.04,
    }),
    borderRadius: height*0.02,
  },
  badgeText: {
    color: '#fff',
    fontFamily: defaultFont,
    fontSize: height*0.02,
  }
  // -- tnc - tncs - tsncs end
}

export default styles
