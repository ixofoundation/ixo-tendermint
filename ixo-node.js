require('dotenv').config();
let lotion = require('lotion');

let app = lotion({
    genesis: 'genesis.json',
    createEmptyBlocks: false,
    tendermintPort: process.env.TENDERMINT_PORT,
    initialState: { txn_count: 0, blockCount: 0, messages: [] },
    p2pPort: process.env.P2P_PORT,
    logTendermint: true,
    peers: [process.env.PEER_CONNECTIONS],
    keys: process.env.PRIVKEY,
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

app.listen(process.env.APP_PORT).then(({ GCI }) => {
    console.log(GCI)
});
