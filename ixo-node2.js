require('dotenv').config();
let lotion = require('lotion');

let app = lotion({
    genesis: 'genesis.json',
    createEmptyBlocks: false,
    tendermintPort: process.env.TENDERMINT_PORT_2,
    initialState: { txn_count: 0, blockCount: 0, messages: [] },
    p2pPort: process.env.P2P_PORT_2,
    logTendermint: true,
    peers: [process.env.PEER_CONNECTIONS_2],
    keys: 'privkey1.json',
    devMode: false
});

app.use((state, tx, chainInfo) => {
    if (typeof tx.sender === 'string' && typeof tx.message === 'string') {
        state.txn_count++;
        state.messages.push({ sender: tx.sender, message: tx.message });
    }
});

app.useBlock(function (state, chainInfo) {
    state.blockCount++;
});

app.listen(process.env.APP_PORT_2).then(({ GCI }) => {
    console.log(GCI)
});