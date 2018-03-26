
require('dotenv').config();
let lotion = require('lotion')

let initialState = { txn_count: 0, blockCount: 0, claim: { data: {} } }

let port = process.env.PORT
let app = lotion({
  initialState,
  genesis: 'genesis.json',
  logTendermint: true,
  createEmptyBlocks: false,
  peers: [process.env.PEER_CONECTION],
  keys: 'keys.json',
  tendermintPort: process.env.TENDERMINT_PORT,
  p2pPort: process.env.P2P_PORT,
  devMode: true
});

app.use((state, txn) => {
  // validate tx, mutate state if it's valid.
  state.claim.data = txn.data;
  state.txn_count++;
  console.log("TXN: " + JSON.stringify(txn, null, '\t'));
  console.log("State: " + JSON.stringify(state, null, '\t'));
});

app.useBlock(state => {
  state.blockCount++
});

app.listen(port).then(({ GCI }) => {
  console.log(GCI)
});

