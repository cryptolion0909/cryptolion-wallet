const bip39 = require('bip39');
const ecc = require('tiny-secp256k1');
const { BIP32Factory } = require('bip32');
const bitcoin =require('bitcoinjs-lib');
const { ethers } =require('ethers');
const TronWeb = require('tronweb');
//const tronUtil = TronWeb.utils;



//随机生成助记词(时序算法)
const mnemonic = bip39.generateMnemonic(128);
//const mnemonic = 'club runway draft elegant cinnamon adult pupil mobile shaft walk rare orient';
//const mnemonic = 'picnic month square wagon pause measure glide panda van subway upset portion';
//const mnemonic = 'earth require across abandon fine boost water crowd supreme sunset cinnamon match';
console.log('生成助记词：'+mnemonic);
console.log(bip39.wordlists);
//助记词生成种子
const seed  = bip39.mnemonicToSeedSync(mnemonic);
//console.log('生成种子：');

//输入密码 ==> 允许调用本地存储的私钥进行签名  ==> 各种链  只对签名 做权限校验


//BTC推导开始
console.log('BTC计算开始');
const bip32 = BIP32Factory(ecc);
//正式网络
const btcNet = bitcoin.networks.bitcoin;
//计算ROOT
const root = bip32.fromSeed(seed,btcNet);
//BTC bip44路径
const btcPath = "m/44'/0'/0'/0/0";
// 获取密钥对
const keyPair = root.derivePath(btcPath);
// 私钥
const btcPrivateKey = keyPair.toWIF();
// 公钥
const btcPublicKey = keyPair.publicKey.toString('hex');
// 地址
const btcAddress = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey , network:btcNet});
const btcTestAddress = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey , network:bitcoin.networks.testnet});
console.log('BTC私钥：'+btcPrivateKey);
console.log('BTC公钥：'+btcPublicKey);
console.log('BTC地址：'+btcAddress.address);
console.log('BTC测试地址：'+btcTestAddress.address);
console.log('----------------------------------------------------------------------------------------------------------');


//ETH网络
//ETH bip44路径
console.log('ETH计算开始');
const ethPath = "m/44'/60'/0'/0/0";
const ethMnemoic = ethers.Mnemonic.fromPhrase(mnemonic)
//根据助记词和路径生成钱包
const ethHDWallet = ethers.HDNodeWallet.fromMnemonic(ethMnemoic,ethPath);
//私钥、公钥、地址
const ethPrivateKey = ethHDWallet.signingKey.privateKey;
const ethPublicKey = ethHDWallet.signingKey.publicKey;
const ethAddress = ethHDWallet.address;
console.log('ETH私钥：'+ethPrivateKey);
console.log('ETH公钥：'+ethPublicKey);
console.log('ETH地址：'+ethAddress);
console.log('----------------------------------------------------------------------------------------------------------');

//BSC网络



//TRON网络
//private key：cb37ead5-e190-45d1-952a-be6eacc0f60d  （https://www.trongrid.io/）
console.log('TRON计算开始');
const tronWallet =  TronWeb.fromMnemonic(mnemonic);
console.log('TRON私钥：'+tronWallet.privateKey);
console.log('TRON公钥：'+tronWallet.publicKey);
console.log('TRON地址：'+tronWallet.address);


