const secp = require("ethereum-cryptography/secp256k1");
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
const PRIVATE_KEY = "7144bc77f1d932ca6465f7c0abce2ce70ef375bf0c97a1cbaa76f0ba55946fe9";
const PUBLIC_KEY = "04ed52056497770199956d3a2a1957a411ed568b486530128f56a07877a665bdaa4e729c33b481062399d88f5dcd314fe7d18478d0d200418c78c17fdf54bbae56";

// Generate signature
let sender = "04ed52056497770199956d3a2a1957a411ed568b486530128f56a07877a665bdaa4e729c33b481062399d88f5dcd314fe7d18478d0d200418c78c17fdf54bbae56";
let recipient = "041e61295a16b3a3cae3c98028363bd18816f469426b9e3eaf7262b70fff7c5e369600800405f99505db436e45a050df9af158f6a46409c25db2712f5068ab87db";
let amount = 5;
const messageHash = keccak256(utf8ToBytes(`${sender, recipient, amount}`))
let signature = secp.sign(messageHash, PRIVATE_KEY);

//signature.then((result) => { console.log(result) });


// Verify signature

signature.then((result) => {
    console.log(result)
    console.log("=================================")
    console.log(toHex(result));
    result = toHex(result);
    console.log("======================================")
    console.log(utf8ToBytes(result));
    console.log(secp.verify(result, messageHash, PUBLIC_KEY)); // Produces true
})