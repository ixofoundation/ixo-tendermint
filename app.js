
require('dotenv').config();
let lotion = require('lotion')

let initialState = { count: 0, blockCount: 0, foo: { bar: { beep: 'boop' } } }

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

app.use((state, tx) => {
  // validate tx, mutate state if it's valid.
  state.count++
});

app.useBlock(state => {
  state.blockCount++
});

app.listen(port).then(({ GCI }) => {
  console.log(GCI)
});

