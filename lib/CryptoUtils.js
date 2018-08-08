import { keccak_256 as keccak256 } from 'js-sha3'
import { ec as EC } from 'elliptic'
import bip39 from './bip39.js'
import B from 'b-privacy'

const ec = new EC('secp256k1');

const toAddress = function (kp) {
  return keccak256(kp.getPublic('buffer').slice(1)).substr(24);
}

const generateKey = function (mnemonic) {
  return generateKeyV2(mnemonic)
}

const generateKeyV0 = function (mnemonic=null) {
  if (!mnemonic) {
    mnemonic = bip39.generateMnemonic()
  }
  let bytes = bip39.mnemonicToSeed(mnemonic)
  let seed = keccak256.array(bytes);
  let kp;
  for (let i = 0; i <= 16384 || !toAddress(kp = ec.keyFromPrivate(seed)).startsWith('00'); ++i) {
    seed = keccak256.array(seed);
  }

  let keys = {
    mnemonic: mnemonic,
    privateKey: kp.getPrivate().toString('hex'),
    publicKey: kp.getPublic().encode('hex'),
    address: toAddress(kp)
  }

  return keys;

}

const generateKeyV2 = function (mnemonic=null) {
  if (!mnemonic) {
    mnemonic = B.generateMnemonicPhrase()
  }

  const kp = new B({mnemonic})

  const keys = {
    version: 2,
    mnemonic: mnemonic,
    privateKey: kp.pvtKey.toString('hex'),
    publicKey: '04' + kp.pubKey.toString('hex'),
    address: kp.address.replace(/^0x/, '') //replace 0x prefix for compatibility with old lib
  }

	return keys;

}


const sign = function (data, key) {

  const msgHash = util.sha3(data).toString('hex')
  const sig = key.sign(msgHash);
  let hex = '0x' + sig.r.toString('hex') + sig.s.toString('hex') + (sig.recoveryParam ? '1c' : '1b')
  return hex;
}


const ecVerify = function (pubkey, signature, payload) {

  try {
    let sig = convertHex.hexToBytes(signature)
    let ret = {
      r: sig.slice(0, 32),
      s: sig.slice(32, 64)
    }

    if (typeof payload == "object") {
      payload = JSON.stringify(payload)
    }

    let hash = util.sha3(payload).toString('hex')

    let key = ec.keyFromPublic(pubkey, 'hex')

    return key.verify(hash, ret)
  } catch (e) {
    return false
  }

}

module.exports = {toAddress, generateKey, sign, ecVerify}

function objectInspector(object, result) {
    if (typeof object != "object")
        return "Invalid object";
    if (typeof result == "undefined")
        result = '';

    if (result.length > 50)
        return "[RECURSION TOO DEEP. ABORTING.]";

    var rows = [];
    for (var property in object) {
        var datatype = typeof object[property];

        var tempDescription = result+'"'+property+'"';
        tempDescription += ' ('+datatype+') => ';
        if (datatype == "object")
            tempDescription += 'object: '+objectInspector(object[property],result+'  ');
        else
            tempDescription += object[property];

        rows.push(tempDescription);
    }//Close for

    return rows.join(result+"\n");
}//End objectInspector