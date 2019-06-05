var coin = require('../lib/coin');

var Web3 = require("web3");
var web3 = new Web3();
// web3.setProvider(new Web3.providers.HttpProvider("https://mainnet.infura.io/BXkl9wdNQiwWOIOKFLaC"));
web3.setProvider(new Web3.providers.HttpProvider("http://192.168.50.223:8545"));

var Wallet = require('../lib/wallet');

// 私钥
// var wallet_Private = Wallet.fromPrivateKey("");
// 助记符
// var wallet_Private = Wallet.fromMnemonic("");
//Keystore
// var wallet_Private = Wallet.fromV3(`{"address":"eb680f30715f347d4eb5cd03ac5eced297ac5046","crypto":{"cipher":"aes-128-ctr","ciphertext":"0a5993469b3546c8581abbb597ed15b2e14d14c8a55713b9f7fd276d5ef35c5b","cipherparams":{"iv":"9164453efdad36e06c2a36be5c522c24"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"7618b02cbcac1127b57b1bc9c8b468cccf105e5724bdcd7ca50ec99434f29671"},"mac":"7b3c086d138b181e1baa6aab7c4f93e1fc220862181d835e9efb1a41d57c8e08"},"id":"3a7959b8-1c2f-42fe-b375-6a0a93d1dffc","version":3}`, "123456")
var wallet_Private = Wallet.fromV3(`{"address":"ccca0382893e4f578ca680a0a9747add914529c8","crypto":{"cipher":"aes-128-ctr","ciphertext":"663d13a928e4cc62bd9a2e18bdefab0199f40a4b4bcc0936dc55d64d95e38bef","cipherparams":{"iv":"f6d77a7ec27045fd2e6c52160300c1b2"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"1f642844feafe4f7f40d91583e0497aac0a49cb88b3725b7c058575997a464a0"},"mac":"55db57771a110048a3d1e1233f7258d151f8a3e19c4be384f64a7dde693f1413"},"id":"3b727f26-37dd-4b28-bf29-72629aec75bd","version":3}`, "123456")

coin.init(web3, wallet_Private);

// 接受者地址
var to = "0xe06D4Aebba840db70FCf3e419FA5D42960e8Ca8B";

// 金额
var amount = 100; //ether
// 发送交易
coin.transfer(wallet_Private.getAddressString(), to, amount);

// 排空
// coin.drain(wallet_Private.getAddressString(), to);