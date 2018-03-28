# ixo-tendermint

This project is configured to run two nodes locally.  There are two sub folders for the node specific configurations for each node namely: `./node1` and `./node2`

## Setup
Clone the repository and run install

```sh
git clone https://github.com/ixofoundation/ixo-tendermint.git
cd ixo-tendermint
npm i
```

### Setup the environment files

Copy the example environment file for each node and update if necessary

```sh
cp ./node1/.env-example ./node1/.env
cp ./node2/.env-example ./node2/.env
```

The `.env` contains the following config:
```sh
## IXO_NODE
PEER_CONNECTIONS = "localhost:46661"   # The machine and port of peer nodes
TENDERMINT_PORT = "46657"              # The tendermint port of the Node
P2P_PORT = "46660"                     # The p2p port for the Node 
APP_PORT = "3000"                      # The lotion app port
```

## Running the nodes
There are two folders each containing the `.env` and the `privkey.json` files for `node1` and `node2`. The public keys for these nodes are in the `genesis.json` file in the section that configures the validators.

To create new private keys run 
```sh
./node_modules/lotion/bin/tendermint gen_validator > privkey.json
```

Before running the nodes clean out the lotion directory in each node's folders )NOTE: This wipes out the blockchain data)
```sh
rm -rf ./node1/.lotion
rm -rf ./node2/.lotion
```

Then run the two nodes in two shells
```sh 
npm run node1
```

and

```sh
npm run node2
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
