const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");

const { toHex, utf8ToBytes, hexToBytes} = require("ethereum-cryptography/utils");

app.use(cors());
app.use(express.json());

const balances = {
  "0439b94c8955e619dbc8bcd8df68552ed36201f821b6ce723fdb7307d02edc071e7faba9f06b52bf264089c0796ceae1c79d7eabd384a4952d2caad4eea1ab3e9c": 100,
  "04e76782c676b280d9fc18b25d80028e6b13809df3284503ef67703d3ca406447e917e9b35882ea0c6af54f71714b25acb6566378781d2b5aa692a764031a5ab6e": 50,
  "04103a429e7571802547622ff6aeac3bd3a60ea04635552862df87aca4cedeb32fccbb0187fe579136dd1310d7912a7ae267a9ed96b58b1e59796d0fd3e0d199bf": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

function verifySignature(msg, signature, bit){
  const msgHash = keccak256(utf8ToBytes(msg));
  signature = hexToBytes(signature);

  const publicKey = secp.recoverPublicKey(msgHash, signature, bit);
  const isSigned = secp.verify(signature, msgHash, publicKey);
  return [isSigned, toHex(publicKey)];
}

app.post("/send", (req, res) => {
  const { recipient, amount, signature, bit } = req.body;

  if (bit < 0 || bit > 1){
    res.status(400).send({ message: 'invalid recovery bit'})
  }
  const msg = `Amount ${amount} to ${recipient}`;

  const [isSigned, sender] = verifySignature(msg, signature, bit);
  console.log(isSigned);

  if (Object.keys(balances).indexOf(sender) === -1){
    res.status(400).send({ message: "incorrect signature or recovery bit"})
  }

  if (!isSigned){
    res.status(400).send({ message: "invalid signature"});
    return;
  }

  console.log('sender addr:', sender);

  setInitialBalance(sender);
  setInitialBalance(recipient);

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
