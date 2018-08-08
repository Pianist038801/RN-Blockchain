'use strict';


const ECIES = require('bitcore-ecies'),
			bitcore = require('bitcore-lib')

exports.encrypt = function(appPrivate, userPublic, payload) {
	appPrivate = bitcore.PrivateKey(appPrivate)
	userPublic = bitcore.PublicKey(userPublic)

	if (typeof payload === 'object') {
		payload = JSON.stringify(payload)
	}

	let instance = ECIES()
		.privateKey(appPrivate)
		.publicKey(userPublic)

	return instance.encrypt(payload).toString('hex')
}

exports.decrypt = function(userPrivate, appPublic, payload) {
	appPublic = bitcore.PublicKey(appPublic)
	userPrivate = bitcore.PrivateKey(userPrivate)

	let instance = ECIES()
		.privateKey(userPrivate)
		.publicKey(appPublic)

	payload = Buffer.from(payload, 'hex')
	var decrypted = instance.decrypt(payload)

	try {
		decrypted = JSON.parse(decrypted)
	} catch(e) {
		//not json
	}

	return decrypted
}