const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require("ethereum-cryptography/secp256k1");
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

app.use(cors());
app.use(express.json());

const balances = {
  "04ed52056497770199956d3a2a1957a411ed568b486530128f56a07877a665bdaa4e729c33b481062399d88f5dcd314fe7d18478d0d200418c78c17fdf54bbae56": 100,
  "041e61295a16b3a3cae3c98028363bd18816f469426b9e3eaf7262b70fff7c5e369600800405f99505db436e45a050df9af158f6a46409c25db2712f5068ab87db": 50,
  "047447c0a5ea060917c2456f3364b2cb4dfff5dbf5fc756299d420b9fcde79caf13b5390712a3544a4846c4c5522bfe43530dfa8dac7f60295136e520189e09e90": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, signature } = req.body;
  setInitialBalance(sender);
  setInitialBalance(recipient);

    const messageHash = keccak256(utf8ToBytes(`${sender, recipient, amount}`))
    console.log(signature)
    if (!secp.verify(signature, messageHash, sender)) {
        res.status(400).send({ message: "Incorrect signature!" });
    }
  
  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
