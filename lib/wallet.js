var bip39 = require("bip39");
var hdkey = require('ethereumjs-wallet/hdkey');
var Wallet = require('ethereumjs-wallet');


var wallet_hdpath = "m/44'/60'/0'/0/";

function fromMnemonic(mnemonic, passwd) {
    let hdwallet;
    if (passwd) {
        hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic, passwd));
    } else {
        hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));
    }
    let wallet = hdwallet.derivePath(wallet_hdpath + "0").getWallet();
    return wallet;

}

function fromPrivateKey(privKey) {
    var fixturekey = new Buffer(privKey, 'hex');

    var wallet = Wallet.fromPrivateKey(fixturekey);
    return wallet;
}

function fromV3(input, password) {
    return Wallet.fromV3(input, password)
}

exports.fromMnemonic = fromMnemonic;
exports.fromPrivateKey = fromPrivateKey;
exports.fromV3 = fromV3;