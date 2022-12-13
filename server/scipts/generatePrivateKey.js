const secp = require("ethereum-cryptography/secp256k1");
const utils = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

let privateKey = secp.utils.randomPrivateKey();
console.log(`Private Key: ${utils.toHex(privateKey)}`);

let publicKey = secp.getPublicKey(privateKey)
console.log(`Public Key: ${utils.toHex(publicKey)}`);

let ethAddress = keccak256(publicKey.slice(1));
ethAddress = ethAddress.slice(-20);
console.log(`Eth Address: 0x${utils.toHex(ethAddress)}`);