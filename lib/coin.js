var Tx = require('ethereumjs-tx');

var _ = require('underscore');

var web3;
var wallet;

function init(_web3, _wallet) {
    web3 = _web3;
    wallet = _wallet;
}

function transfer(_from, _to, _amount) {

    var gasPrice = web3.eth.gasPrice;
    gasPrice = gasPrice * 1.2;

    var nonce = web3.eth.getTransactionCount(_from, 'pending');

    var amount = web3.toWei(_amount, "ether");

    var rawTx = {
        from: _from,
        to: _to,
        value: web3.toHex(amount),
        nonce: web3.toHex(nonce),
        gasPrice: web3.toHex(gasPrice)
    };

    // var estimate_gas = web3.eth.estimateGas(rawTx);

    rawTx = _.extend(rawTx, {gasLimit: web3.toHex(21000)});

    var tx = new Tx(rawTx);

    let privateKey = wallet.getPrivateKey();
    tx.sign(privateKey);

    var serializedTx = tx.serialize();

    web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
        if (!err) {
            console.log(hash);
        } else {
            console.log(err)
        }
    });
}

function drain(_from, _to) {
    // balance
    var balance = web3.eth.getBalance(_from); // wei
    balance = balance.toNumber();
    console.info(`balance ${balance}`);
    //cost
    var gasPrice = web3.eth.gasPrice;
    gasPrice = gasPrice.toNumber();

    var gas = 21000;

    var cost = gas * gasPrice;
    console.info(`cost ${cost}`);

    // balance - cost
    var leftBalance = balance - cost;
    console.info(`left ${leftBalance}`);

    //transfer ---------
    var nonce = web3.eth.getTransactionCount(_from, 'pending');

    var amount = leftBalance - 50;

    var rawTx = {
        from: _from,
        to: _to,
        value: web3.toHex(amount),
        nonce: web3.toHex(nonce),
        gas: web3.toHex(gas),
        gasPrice: web3.toHex(gasPrice)
    };

    var tx = new Tx(rawTx);

    let privateKey = wallet.getPrivateKey();
    tx.sign(privateKey);

    var serializedTx = tx.serialize();

    web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
        if (!err) {
            console.log(hash);
        } else {
            console.log(err)
        }
    });

}


exports.init = init;
exports.transfer = transfer;
exports.drain = drain;