 'use strict';

import bitcore from 'bitcore-lib'
// // import Mnemonic from 'bitcore-mnemonic'
// import EthereumBIP44 from 'ethereum-bip44'

const cutil = require('./CryptoUtils.js')

// import keythereum from 'keythereum'
import eccrypto  from 'eccrypto'
import util from 'ethereumjs-util'
// const hdkey = require('ethereumjs-wallet/hdkey')
import * as Keychain from 'react-native-keychain';


class AbSDK {

	constructor(config) {
		this.config = config;
	}

	async genKeys(mnemonic) {
		// TODO: Replace with key generation before production

		
        let keys = cutil.generateKey(mnemonic)

		return keys;

	}

	async generateKeys(mnemonic=null) {

		let keys = await this.genKeys(mnemonic);

		let data = {
			version: keys.version,
			hdKey: keys.hd,
			mnemonic: keys.mnemonic,
			privateKey: keys.privateKey,
			publicKey: keys.publicKey,
			address: keys.address
		}
		
		let res = await this.storeKeys(data)


		return data

	}

	async storeKeys(keyData) {
		var r = await Keychain.setGenericPassword('username', JSON.stringify(keyData), 'apk5');
		return r
	}

	async getKeys() {
		let result;
		try {
			 result = await Keychain.getGenericPassword('apk5');
		} catch(e) {
			return null;
		}

		if (typeof result.password === "undefined" || !result.password) {
			return false;
		} else {
			result = JSON.parse(result.password);
			if (!result.hasOwnProperty('version')) {
				result.version = 0
			}
			return result
		}

	}



	async ecSign(pl, keys) {

		keys = keys || await this.getKeys();
		if (!keys) return false;

		if (typeof pl == "object") {
			pl = JSON.stringify(pl)
		}

		let hash = util.sha3(pl).toString('hex')
		// console.log('keys', keys)
		// console.log('HASH', hash)
		// console.log('PAYLOAD', pl)

		let sig = util.ecsign(util.sha3(pl), new Buffer(keys.privateKey, 'hex'));

		let hex = '0x' + sig.r.toString('hex') + sig.s.toString('hex') + sig.v.toString(16);


		return hex;

	}

	async clearKeys() {
		return await Keychain.resetGenericPassword('apk5');
	}





}

export default AbSDK;
