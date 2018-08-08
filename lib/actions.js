import store from './store_instance'
import config from '../config'
import {Actions} from 'react-native-router-flux';
import {Alert, Image, AsyncStorage} from 'react-native'
import PushNotification from 'react-native-push-notification';
import DeviceInfo from 'react-native-device-info';

import AbSDK from './absdk.js'
const AB = new AbSDK({})

var headers = {
	'Accept': 'application/json',
	'Content-Type': 'application/json',
	// 'Authorization': `Bearer ${jwt}`,
}

const networkTimeout = 10000

export function getUrl() {
  let url
  try {
    url = store.getState().env.url
    if (!url) {
      throw 'no url'
    }
  } catch (e) {
    url = config.environments[config.defaultEnv].url
  }

  return url
}

export function storeEnv(key) {
	AsyncStorage.setItem('env', key)
}

export async function loggedIn() {
	let keys = await AB.getKeys()
	store.dispatch({type:"SET_KEYS", keys: keys})
}

export function setLoggedIn(jwt) {
  store.dispatch({type: "SET_LOGGED_IN", jwt:jwt});
}

export function setAppRegistered(r) {
  store.dispatch({type: "SET_APP_REGISTERED", response:r})
}

export function sendRegistration(register) {
	fetch(`${getUrl()}/apis/userapi/v0.1/user`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(register)
	})
	.then((r) => r.json())
	.then((r) => {
		if (r.status == 'success') {
			store.dispatch({type:"REGISTER_SUCCESS"})
		} else {
			var validationMap = {
				first_name: 'register_name',
				last_name: 'register_name',
				password: 'register_password',
				email: 'register_email'
			}

			if (!r.hasOwnProperty('errors')) {
				throw "Unknown response from server"
			}

			var error = r.errors[0];

			if (error.hasOwnProperty('validation') && validationMap.hasOwnProperty(error.field)) {
				store.dispatch({type:"REGISTER_FAIL",message:error.message,scene:validationMap[error.field]})
			} else {
				store.dispatch({ type: "REGISTER_FAIL", message: error.message || error.error})
			}
		}
	}).catch(e => {
		store.dispatch({type:"REGISTER_FAIL",message:'An unknown error has ocurred'})
	})
}

export function updateProfile(profile) {
	let jwt = store.getState().jwt
	fetch(`${getUrl()}/apis/userapi/v0.1/user`, {
		method: 'PUT',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${jwt}`,
		},
		body: JSON.stringify(profile)
	})
	.then((r)=>r.json())
	.then((r) => {
		if (r.status == 'success') {
			store.dispatch({type:"PROFILE_UPDATED", data:profile})
			// Alert.alert('Profile updated')
			Actions.pop()
		} else {
			store.dispatch({type:"NOT_LOADING"})
			var error = r.errors[0]
			var message
			if (error.hasOwnProperty('validation')) {
				message = error.message
			} else if (error.hasOwnProperty('error')) {
				messsage = error.error
			} else {
				message = 'Unknown error'
			}
			Alert.alert(message)
		}
	})
	.catch(e => {
		store.dispatch({type:"NOT_LOADING"})
		Alert.alert('An Unknown error has occurred')
	})
}

export function changePassword(existing_password, new_password) {
	let jwt = store.getState().jwt
	fetch(`${getUrl()}/apis/userapi/v0.1/user/changePassword`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${jwt}`,
		},
		body: JSON.stringify({
			existing_password,
			new_password
		})
	})
	.then((r) => r.json())
	.then((r) => {
		store.dispatch({type:"NOT_LOADING"})
		if (r.status == 'success') {
			Alert.alert('Password updated successfully')
			Actions.pop()
		} else {
			var error = r.errors[0]
			Alert.alert(error.error)
		}
	})
	.catch(e => {
		Alert.alert('An Unknown error has occurred')
	})
}

export function loadProfile() {
	let jwt = store.getState().jwt

	checkForKeyUpgrade()

	fetch(`${getUrl()}/apis/userapi/v0.1/user`, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${jwt}`,
		}
	})
	.then(r => r.json())
	.then(r => {
		if (r.status == 'success') {
			if (r.data.deletion_requested) {
				store.dispatch({type:"DELETION_REQUESTED"})
			}
			store.dispatch({type:"POPULATE_PROFILE",data:r.data})
		} else {
			throw 'Profile load failed'
		}
	}).catch(e => {
		if (e.message == 'Network request failed') {
			alert('No internet connection')
		}
	})
}

export async function checkForKeyUpgrade() {
	const keys = await AB.getKeys()
	if (keys.version !== config.latestKeyVersion) {
		store.dispatch({type: 'LOADING', text: 'Updating your keys...'})
		await migrateKeys(keys, keys.version, config.latestKeyVersion)
	}
}

export async function migrateKeys(oldKeys, oldVersion, newVersion) {
	const jwt = store.getState().jwt
	const newKeys = await AB.generateKeys()
	store.dispatch({type: 'SET_KEYS', keys: newKeys})

	const payload = {
		oldVersion,
		newVersion,
		publicKey: newKeys.publicKey,
		address: newKeys.address
	}

	const signature = await AB.ecSign(payload, oldKeys)

  await fetch(`${getUrl()}/apis/userapi/v0.1/user/migrateKeys`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`,
    },
    body: JSON.stringify({
      signature,
			payload
    })
  })
	.then(r => r.json())
	.then(r => {
		if (r.status === 'success') {
      store.dispatch({type: 'LOADING', text: 'Update successful.'})
			setTimeout(function() {
				store.dispatch({type: 'NOT_LOADING'})
			}, 1000)
		} else {
      throw 'Error'
		}
	})
	.catch(err => {
		store.dispatch({type: 'NOT_LOADING'})
		AB.storeKeys(oldKeys)
		alert('There was an error migrating your keys, please contact support')
	})
}

export function loadLog() {
	let jwt = store.getState().jwt
	fetch(`${getUrl()}/apis/userapi/v0.1/user/log`, {
		timeout: 3000,
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${jwt}`,
		}
	})
	.then(r => r.json())
	.then(r => {
		if (r.status == 'success') {

			let data = r.data

			//Prefetch images
			let unique = [...new Set(data.map(item => item.logo_image))];
			let images = unique.map(img => { if (img) Image.prefetch(img)})
			Promise.all(images)
		    .then(() => {
		      store.dispatch({type:"POPULATE_LOG",data:data})
		    })
		    .catch(error => {
		    	store.dispatch({type:"POPULATE_LOG",data:data}) //do it anyway

		    })

		} else {
			throw 'Log load failed'
		}
	}).catch(e => {
		if (e.message == 'Network request failed') {
			alert('No internet connection')
		}
		store.dispatch({type:"POPULATE_LOG",data: []})
	})
}

export function loadEntities() {
	loadEntity('jobs')
	loadEntity('educations')
	loadEntity('awards')
}

function loadEntity(type) {
	let jwt = store.getState().jwt
	fetch(`${getUrl()}/apis/userapi/v0.1/user/${type}`, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${jwt}`,
		}
	})
	.then(r => r.json())
	.then(r => {
		if (r.status == 'success') {
			var data = {}
			data[type] = r.data
			store.dispatch({type:"POPULATE_ENTITIES",data:data})
		} else {
			throw `Entity ${type} load failed`
		}
	})
}

export function populateUnconfirmedTxs(txs) {
	store.dispatch({type: "POPULATE_UNCONFIRMED_TRANSACTIONS", transactions: txs});
}

export function loginJWT(email, jwt) {
	store.dispatch({type: "LOGIN_JWT", email: email, jwt: jwt})
}

export async function clearKeys() {
	return await AB.clearKeys()
}

export async function keysBeforeLogin(email, password, mnemonic=null) {
	let keys = null
	if (!mnemonic) {
		keys = await AB.getKeys()
  }

	if (!keys) {
		keys = await AB.generateKeys(mnemonic)
	}

	loginUser(email, password, keys)
}

export function loginUser(email, password, keys) {
	const public_key = keys.publicKey
	const address = keys.address
	const keyVersion = keys.version || 0

	let payload = {
		email: email,
		password: password
	}

  const oneSignalId = store.getState().one_signal_id;
  if (oneSignalId) {
    payload['onesignal_id'] = oneSignalId;
  }

	if (public_key) {
		payload = {
      ...payload,
      public_key,
      address,
			keyVersion
    }
	}

  const mobileVersion = DeviceInfo.getVersion()
	if (mobileVersion) {
  	payload = {...payload, mobileVersion}
	}

	// console.log("LOGINPAYLOAD", payload)

	fetch(`${getUrl()}/api/login`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload)
	})
	.then(r => r.json())
	.then(r => {
		if (r.status == 'ok') {
			setLoggedIn(r.token)
		} else {
			if (r.status === "error" && r.error.includes('public_key')) {
        Alert.alert(
          'Login error',
          'This account is already associated with a device, would you like to restore your private key?',
          [
            {text: 'Cancel', style: 'cancel', onPress: () => {
              store.dispatch({type: 'LOGIN_FAILED'})
						}},
            {text: 'OK', onPress: () => {
            	store.dispatch({type: 'NOT_LOADING'})
            	Actions.restore_mnemonic({email, password})
						}},
          ],
          { cancelable: false }
        )
			} else {
        throw 'Login Failed'
			}
		}
	}).catch(e => {
		if (typeof e == 'string') {
			alert(e)
		} else if (e.message == 'Network request failed') {
			alert('No internet connection')
		} else {
			alert('Unknown error, login failed')
		}
		store.dispatch({type: 'LOGIN_FAILED'})
	})
}

export function loadUserAwards() {
	let jwt = store.getState().jwt
	fetch(`${getUrl()}/api/user/awards`, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${jwt}`
		}
	})
	.then((r)=>r.json())
	.then((r) => {
		store.dispatch({type: "SET_USER_AWARDS", awards: r.awards});
	})
}

export function logoutUser() {
  return new Promise(resolve => {
    const jwt = store.getState().jwt;
    fetch(`${getUrl()}/apis/userapi/v0.1/mobileLogout`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      }
    }).then(r => r.json()).then(r => {
      resolve(r);
    }).catch(e => resolve(e))
  })
}

export function loadSigningQueue() {
	let jwt = store.getState().jwt

	fetch(`${getUrl()}/apis/userapi/v0.1/user/mobileQueue`, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${jwt}`
		}
	})
	.then((r)=>r.json())
	.then((r) => {
		if (r.status !== 'success') {
			throw 'failed'
		}
		store.dispatch({type: "SET_SIGNINGQUEUE", mobilequeue: r.data});
    PushNotification.setApplicationIconBadgeNumber(r.data.length)
	})
	.catch(e => {
		if (e.message === 'Network request failed') {
			alert('No internet connection')
		}
	})
}

export function mobileQueueDelete(id) {
	const jwt = store.getState().jwt

  fetch(`${getUrl()}/apis/userapi/v0.1/user/mobileQueue/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    }
  })
    .then((r)=>r.json())
    .then((r) => {
      if (r.status !== 'success') {
        throw 'failed'
      }
      loadSigningQueue()
    })
    .catch(e => {
      if (e.message === 'Network request failed') {
        alert('No internet connection')
      }
    })
}

export function readQrCode(qrtoken, onError, onSuccess, position=null) {
	let jwt = store.getState().jwt

	fetch(`${getUrl()}/api/qrcode`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${jwt}`,

		},
		body: JSON.stringify({
			token: qrtoken,
			position: position
		})
	})
	.then((r) => r.json())
	.then((r) => {
		if (r.status == 'ok') {
			onSuccess(r, qrtoken)
		} else if (r.status == 'error') {
			onError(r.error)
		} else {
			onError('Invalid QR Code...')
		}
	})
	.catch((e) => {
		alert('Invalid QRCode')
	})
}


export function confirmQrCode(qrtoken) {
  let jwt = store.getState().jwt

  fetch(`${getUrl()}/api/qrcode`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`,
    },
    body: JSON.stringify({
      token: qrtoken,
      confirm: true
    })
  })
    .then((r) => r.json())
    .then((r) => {
      setTimeout(() => {
        store.dispatch({type: 'NOT_LOADING'})
        store.dispatch({type: 'LOAD_USER_AWARDS'})
        Actions.profile({type: 'reset'})
      }, 500)
    })
}

export async function deleteAccount() {
	let user_id = store.getState().profile.id
	let sig = await AB.ecSign({delete_account:user_id})
	let jwt = store.getState().jwt

	fetch(`${getUrl()}/apis/userapi/v0.1/user/delete`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${jwt}`,
		},
		body: JSON.stringify({
			signature: sig
		})
	})
	.then((r)=>r.json())
	.then((r) => {
		store.dispatch({type:'CLEAR_KEYS'})

	});
}

export function deleteAccountCancel() {
	Alert.alert('cancelled')
}

export async function signVerification(verification) {
	let toSign, encrypted
	if(verification.job_data.hasOwnProperty('payload_enc')) {
		toSign = verification.job_data.payload_enc
		encrypted = true
	} else {
		toSign = verification.job_data.payload
		encrypted=false
	}

	let sig = await AB.ecSign(toSign)

	let jwt = store.getState().jwt

	fetch(`${getUrl()}/api/verification/sign`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${jwt}`,
		},
		body: JSON.stringify({
			mobile_queue_id: verification.id,
			verification_id: verification.job_data.verification_id,
			side: verification.job_data.side,
			signature: sig,
			encrypted: encrypted
		})
	})
	.then((r)=>r.json())
	.then((r) => {
		if (typeof r.status !== "undefined" && r.status == "ok") {
		  const signingQueueLength = store.getState().mobilequeue.length;
		  PushNotification.setApplicationIconBadgeNumber(signingQueueLength - 1);
		} else {
			if (typeof r.status !== "undefined" && r.status == "error") {
				alert('Signing failed: ' + r.error)
			} else {
				alert('An unknown error occured')
			}
		}
		setTimeout(function() {
			store.dispatch({type:"LOAD_SIGNINGQUEUE"})
		},200)
	})
	.catch(e => {
	})
}

export function resetGenericPasswordCheck() {
  store.dispatch({ type: 'RESET_GENERIC_PASSWORD_CHECK' });
}


export async function startVerificationRequest({ searchField, type, id }) {
  const organizationsList = await searchOrganization(searchField);
  store.dispatch({ type: 'NOT_LOADING' });
  // Actions.search_organization({ signingRequest: { type, id }});
  if (organizationsList.length === 1 && organizationsList[0].name == searchField) {
    verificationRequest({
      type, id,
      organisation_id: organizationsList[0].id,
    });
    return;
  }
  Actions.search_organization({ signingRequest: { type, id }, search: searchField });
}


export async function searchOrganization(searchField) {
  const jwt = store.getState().jwt;
  return fetch(`${getUrl()}/apis/userapi/v0.1/organisations/search?q=${searchField}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`,
    }
  }).then(r => r.json()).then(
    organizations => {
      store.dispatch({ type: 'UPDATE_ORG_SEARCH', payload: organizations });
      return organizations;
    }
  );
}


export function biometricsVerify(data, onSuccess, onFail) {
  const jwt = store.getState().jwt;
  store.dispatch({ type: 'LOADING' });
  return fetch(`${getUrl()}/apis/userapi/v0.1/biometric/verify`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`,
    },
    body: JSON.stringify({
      document: data.doc,
      selfie: data.face,
    }),
  }).then(r => r.json()).then(res => {
  	if (!res.data || !res.data.status) {
  		throw 'Unknown Error'
		}
    store.dispatch({ type: 'NOT_LOADING' });
		store.dispatch({ type: 'UPDATE_USER_BIOMETRICS', payload: res.data.status });
    switch (res.data.status) {
      case 'complete':
        onSuccess('Verification Successful');
        break;
      case 'needs_review':
        onSuccess('Verification requires manual review, please check back later');
        break;
      case 'failed':
      	let message = res.errors[0].error || "Unknown error, please try again"
        onFail(message);
    }
  }).catch(e => {
    store.dispatch({ type: 'NOT_LOADING' });
    onFail('There was an error, please try again.');
  });
}


export async function verificationRequest(args) {
  const jwt = store.getState().jwt;
  fetch(`${getUrl()}/apis/userapi/v0.1/verification/request`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`,
    },
    body: JSON.stringify(args),
  }).then(r => r.json()).then(response => {
    store.dispatch({ type: 'NOT_LOADING'});
    if (response.status === 'success') {
      setTimeout(() => {
        Actions.verification({ type: 'reset' })
      }, 50);
    } else {
      alert(response.errors[0].error)
    }
  }).catch(e => {
    alert('Error occurred. Please try again');
    store.dispatch({ type: 'NOT_LOADING' });
  });
}

export function updateProfileImage(base64) {
	if (!base64) {
		return
	}

	store.dispatch({
		type: 'UPDATE_PROFILE_IMAGE',
		image: `data:image/jpeg;base64,${base64}`
	})
}
