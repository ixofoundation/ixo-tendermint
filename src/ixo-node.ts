require('dotenv').config();
let lotion = require('lotion');

let app = lotion({
    genesis: process.env.GENESIS_BLOCK,
    createEmptyBlocks: false,
    tendermintPort: process.env.TENDERMINT_PORT,
    initialState: { txn_count: 0, blockCount: 0, data: [] },
    p2pPort: process.env.P2P_PORT,
    logTendermint: true,
    peers: [process.env.PEER_CONNECTIONS],
    keys: process.env.PRIVKEY,
    devMode: false
});

function txHandler(state: any, tx: any, chainInfo: any) {
    console.log('TXN: ' + JSON.stringify(tx));
    if (tx.jsonrpc === '2.0' && tx.method !== 'ping') {
        state.txn_count++;
        // Do stuff here 
    }
}

function blockHandler(state: any, chainInfo: any) {
    state.blockCount++;
}

app.use(txHandler);
app.useBlock(blockHandler);
app.listen(process.env.APP_PORT).then((GCI: any) => {
    console.log(GCI);
});

export { };