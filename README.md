# ixo-tendermint

## Setup
Clone the repository and run install

```sh
git clone https://github.com/ixofoundation/ixo-tendermint.git
cd ixo-tendermint
npm i
```

### Setup the environment files

Copy the example environment file and update if necessary

```sh
cp .env-example .env
```

The `.env` contains the following config:
```sh
## IXO_NODE_1
PEER_CONNECTIONS_1 = "localhost:46661"   # The machine and port of Node 2
TENDERMINT_PORT_1 = "46657"              # The tendermint port of Node 1 See http://localhost:46657
P2P_PORT_1 = "46660"                     # The p2p port for Node 1 (should be the port configured in the PEER_CONNECTIONS of node 2)
APP_PORT_1 = "3000"                      # The Node 1 lotion app port

## IXO_NODE_2
PEER_CONNECTIONS_2 = "localhost:46660"   # The machine and port of Node 1
TENDERMINT_PORT_2 = "46658"              # The tendermint port of Node 2 See http://localhost:46658
P2P_PORT_2 = "46661"                     # The p2p port for Node 2 (should be the port configured in the PEER_CONNECTIONS of Node 1)
APP_PORT_2 = "3001"                     # The Node 2 lotion app port
```

## Running the nodes
There are two js files `ixo-node.js` and `ixo-node2.js` that will run two nodes they use the `privkey0.json` and `privkey1.json` respectively files for their keys.  The public keys for these nodes are in the `genesis.json` file in the section that configures the validators.

To create new private keys run 
```sh
./node_modules/lotion/bin/tendermint gen_validator > privkey.json
```

Before running the nodes clean out the lotion directory
```sh
rm -rf ~/.lotion
```

Then run the two nodes in two shells
```sh 
node ixo-node.js
```

and

```sh
node ixo-node2.js
```

## Sending messages to app

To send a message to Node 1

```sh
curl http://localhost:3000/txs -d '{"sender": "Nic", "message": "Hello Node 1"}'
```

and to Node 2


```sh
curl http://localhost:3001/txs -d '{"sender": "Nic", "message": "Hello Node 2"}'
```
