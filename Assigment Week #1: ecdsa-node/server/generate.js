const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");

const { toHex, utf8ToBytes, hexToBytes } = require("ethereum-cryptography/utils");


// function sign(msgHash: Uint8Array, privateKey: Uint8Array, opts?: Options): Promise<Uint8Array>;

// (async () => {
//     const privateKey = secp.utils.randomPrivateKey();
//     const publicKey = secp.getPublicKey(privateKey);
//     console.log('privateKey: ', toHex(privateKey));
//     console.log('publicKey: ', toHex(publicKey));


//     const msg = "Alice to Bobe sends 2 SHG";
//     const msgHash = keccak256(utf8ToBytes(msg));
    
//     const [signature, bit] = await secp.sign(msgHash, privateKey, {recovered: true});

//     const msg = `Amount: ${amount} to ${recipient}`;
//     // console.log(signature);
//     // console.log(bit);

//     const isSigned = secp.verify(signature, msgHash, publicKey);
//     // console.log(isSigned);
//   })();

(async () => {
    const privateKey = hexToBytes("b18cd964d038fea469fbae76cf13c6cd88df575b56691cdb40f393dbb8b9e697");
    const msg = "Amount: 13 to 04103a429e7571802547622ff6aeac3bd3a60ea04635552862df87aca4cedeb32fccbb0187fe579136dd1310d7912a7ae267a9ed96b58b1e59796d0fd3e0d199bf";
    const msgHash = keccak256(utf8ToBytes(msg));

    const [signature, bit] = await secp.sign(msgHash, privateKey, {recovered: true});
    console.log(toHex(signature));
    console.log(bit);

    // const privateKey = hexToBytes("b18cd964d038fea469fbae76cf13c6cd88df575b56691cdb40f393dbb8b9e697");
    // // const publicKey = secp.getPublicKey(privateKey);
    // const publicKey = hexToBytes("04103a429e7571802547622ff6aeac3bd3a60ea04635552862df87aca4cedeb32fccbb0187fe579136dd1310d7912a7ae267a9ed96b58b1e59796d0fd3e0d199bf");
    // const signature = hexToBytes("3045022100a9746b1efd82bdc2a248c725ff65e6f1e8198d4d022af1f9228c2e8a6ba6ff2c0220126912915533e7a202bc1d16f9399cd5ccc666b5b2b2a02193fe5ac7d1c7258d");
    // const msg = "Amount: 12 to 04103a429e7571802547622ff6aeac3bd3a60ea04635552862df87aca4cedeb32fccbb0187fe579136dd1310d7912a7ae267a9ed96b58b1e59796d0fd3e0d199bf";
    // const msgHash =  keccak256(utf8ToBytes(msg))
    // const isSigned = secp.verify(signature, msgHash, publicKey);
    // console.log(isSigned);
  })();