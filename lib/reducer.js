import {
  Alert,
  Image,
  AsyncStorage
} from 'react-native'
import PushNotification from 'react-native-push-notification'
import _ from 'underscore'
import { Actions } from 'react-native-router-flux'
import * as Keychain from 'react-native-keychain'
import {
  storeEnv,
  loadUserAwards,
  loadSigningQueue,
  readQrCode,
  requestVerification,
  loginUser,
  loginJWT,
  keysBeforeLogin,
  signVerification,
  loggedIn,
  loadProfile,
  loadEntities,
  sendRegistration,
  changePassword,
  updateProfile,
  clearKeys,
  loadLog,
  preloadLogImages,
  deleteAccount,
  deleteAccountCancel,
  logoutUser,
  resetGenericPasswordCheck,
  startVerificationRequest,
  searchOrganization,
  verificationRequest,
  mobileQueueDelete
} from './actions'
import config from '../config'

let init = false
let initialState = {
  checkingGenericPassword: true,
  loading: false,
  loadingText: null,
  jwt: null,
  loggedIn: false,
  userAwards: [],
  awards: [],
  mobilequeue: [],
  route: 'profile',
  one_signal_id: null,
  loginOverlay: false,
  username: null,
  register: {},
  profile: null,
  log: null,
  searchOrg: [],
  profileEntities: {
    jobs: null,
    education: null,
    awards: null,
  },
  env: config.environments[config.defaultEnv]
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'STORE_ENV':
      storeEnv(action.key)
      return {
        ...state,
        env: action.env
      }

    case 'SET_ENV':
      return {
        ...state,
        env: action.env
      }

    case "APP_INIT":
      Keychain
        .getGenericPassword()
        .then(function(credentials) {
          if (credentials.username && credentials.password) {
            // @TODO - check JWT works before logging in, a good place to do any data pre-loading?
            loginJWT(credentials.username, credentials.password)
          } else {
            resetGenericPasswordCheck()
          }
        }).catch(function() {
          resetGenericPasswordCheck()
        })
      return state
    case 'RESET_GENERIC_PASSWORD_CHECK':
      return {
        ...state,
        checkingGenericPassword: false,
      };

    case "SAVE_ONESIGNAL_ID":
      return {
        ...state,
        one_signal_id: action.payload,
      };

    case "LOGOUT":
      logoutUser();
      PushNotification.setApplicationIconBadgeNumber(0);
      Keychain
        .resetGenericPassword()
        .then(function() {
        });
      return {
        ...initialState,
        checkingGenericPassword: false,
        one_signal_id: state.one_signal_id,
      };


    case "LOGIN_JWT":
      return {...state, ...{
        username: action.email,
        jwt: action.jwt,
        loggedIn: true,
        checkingGenericPassword: false,
      }};


    case "LOGIN":

      keysBeforeLogin(action.data.username, action.data.password)
      return {...state, ...{
        loading: true,
        username: action.data.username,
      }}

    case "LOGIN_FAILED":

      return {...state, ...{loading: false}}

    case "SET_KEYS":

      return {...state, ...{keys: action.keys}}

    case "SET_LOGGED_IN":

      Keychain
        .setGenericPassword(state.username, action.jwt)
        .then(() => {
        })
        .catch(e => {
        })

        loggedIn()

      return {...state, ...{
        loading: false,
        jwt: action.jwt,
        loggedIn: true
      }}

    case "UPDATE_ROUTE":
      return state

    case "UPDATE_ROUTE_NEW":
      return {...state,...{route:action.route}}

    case 'UPDATE_USER_BIOMETRICS':
      return {
        ...state,
        profile: {
          ...state.profile,
          biometrics_status: action.payload,
        }
      };
    case 'LOADING':
      return {
        ...state,
        loading: true,
        loadingText: action.text || null
      };

    case "NOT_LOADING":
      return {...state, loading: false, loadingText: null}

    case "LOAD_PROFILE":
      loadProfile();
      loadEntities();
      loadSigningQueue();
      return state;

    case "POPULATE_PROFILE":
      return {...state,...{profile:action.data}}

    case "UPDATE_PROFILE_IMAGE":
      let profileUpdate = {
        ...state.profile,
        profile_image: action.image
      }

      updateProfile(profileUpdate)

      return {
        ...state,
        profile: profileUpdate
      }

    case "LOAD_LOG":
      loadLog()
      return state

    case "POPULATE_LOG":
      return {...state,...{log:action.data}}

    case 'START_VERIFICATION_REQUEST':
      startVerificationRequest(action.payload);
      return {
        ...state,
        loading: true,
      };

    case 'EXECUTE_VERIFICATION_REQUEST':
      verificationRequest(action.payload);
      return {
        ...state,
        loading: true,
      };

    case 'SEARCH_ORGANIZATION':
      searchOrganization(action.payload);
      return state;

    case 'UPDATE_ORG_SEARCH':
      return {
        ...state,
        searchOrg: action.payload,
      };
    case "POPULATE_ENTITIES":
      var entities = {...state.profileEntities,...action.data}
      let newState = {...state, ...{profileEntities:entities}}
      return newState

    case "REGISTER":
      var data = action.data
      var register = Object.assign(state.register, action.data)
      var newState = {...state, ...{register:register}}

      if (data.hasOwnProperty('email')) {
        newState = {...newState, ...{loading:true}}
        sendRegistration(newState.register)
      }

      return newState

    case "REGISTER_SUCCESS":
      Actions.register_confirm({type:'reset'})
      return {...state, ...{loading: false}}

    case "REGISTER_FAIL":
      Alert.alert(action.message)
      if (action.hasOwnProperty('scene')) {
        Actions[action.scene]({type:'reset'})
      }

      return {...state, ...{loading: false}}

    case "CHANGE_PASSWORD":
      let data = action.data
      changePassword(data.existing_password, data.new_password)

      return {...state,...{loading:true}}

    case "UPDATE_PROFILE":
      let profileData = action.data
      updateProfile(profileData)



      return {...state,...{loading:true}}

    case "PROFILE_UPDATED":
      let profile = {...state.profile,...action.data}
      return {...state,...{profile: profile,loading:false}}


    case "LOAD_USER_AWARDS":
      loadUserAwards();
      return state;

    case "SET_USER_AWARDS":
      return {...state, ...{userAwards:action.awards}};

    case "LOAD_SIGNINGQUEUE":
      loadSigningQueue();
      return state;

    case "SET_SIGNINGQUEUE":
      return {...state, ...{mobilequeue:action.mobilequeue}};

    case "SET_MOBILE_QUEUE":
      return {...state, ...{mobilequeue:action.mobilequeue}}

    case "MOBILEQUEUE_DELETE":
      mobileQueueDelete(action.id)
      return state

    case "READ_QR_CODE":
      readQrCode(action.qrtoken, action.onError, action.onSuccess, action.position);
      return state;


    // case "REQUEST_VERIFICATION":
    //   requestVerification(action.award_id);
    //   return state;

    case "SIGN_VERIFICATION":
      signVerification(action.verification)
      return state;

    case "CLEAR_KEYS":
      Keychain
        .resetGenericPassword()
        .then(function() {
        });

      clearKeys()
      return {...state,
        ...{
            username: null,
            jwt: null,
            loggedIn: false
        }}


    case "DELETION_REQUESTED":
      Alert.alert(
        'Account deletion',
        'You have requested for your account to be deleted, are you sure you want to delete your account? This action is not reversible.',
        [
          {text: 'Cancel', onPress: () => {deleteAccountCancel()}, style: 'cancel'},
          {text: 'OK', onPress: () => {deleteAccount()}}
        ]
      )

      return state

    default:
      if (init)
      init = true
      return state
  }
}
