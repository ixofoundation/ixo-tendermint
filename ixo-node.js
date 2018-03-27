require('dotenv').config();
let lotion = require('lotion');

let app = lotion({
    genesis: 'genesis.json',
    createEmptyBlocks: false,
    tendermintPort: process.env.TENDERMINT_PORT_1,
    initialState: { messages: [] },
    p2pPort: process.env.P2P_PORT_1,
    logTendermint: true,
    peers: [process.env.PEER_CONNECTIONS_1],
    keys: 'privkey0.json',
    devMode: false
});

app.use((state, tx, chainInfo) => {
    if (typeof tx.sender === 'string' && typeof tx.message === 'string') {
        state.messages.push({ sender: tx.sender, message: tx.message })
    }
});

app.useBlock(function (state, chainInfo) {
    // do something once per block here
});

app.listen(process.env.APP_PORT_1).then(({ GCI }) => {
    console.log(GCI)
});