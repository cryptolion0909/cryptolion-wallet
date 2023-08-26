const bip39 = require('bip39');
const ecc = require('tiny-secp256k1');
const { BIP32Factory } = require('bip32');
const bitcoin =require('bitcoinjs-lib');
const https = require('https');
const Web3 = require('web3');
const { ethers } =require('ethers');


//生成助记词
//const mnemoinc  = bip39.generateMnemonic();
const mnemoinc  = 'picnic month square wagon pause measure glide panda van subway upset portion';
console.log('生成助记词：'+mnemoinc);
//助记词转成种子


const ethPath = "m/44'/60'/0'/0/0";
ethers.Wallet.fromMnemonic
//const ethMnemoic = ethers.Mnemonic.fromPhrase(mnemoinc);
//根据助记词和路径生成钱包
const ethHDWallet = ethers.Wallet.fromMnemonic(mnemoinc,ethPath);
//私钥、公钥、地址
const ethPrivateKey = ethHDWallet.privateKey;
const ethPublicKey = ethHDWallet.publicKey;
const ethAddress = ethHDWallet.address;
console.log('ETH私钥：'+ethPrivateKey);
console.log('ETH公钥：'+ethPublicKey);
console.log('ETH地址：'+ethAddress);
console.log('----------------------------------------------------------------------------------------------------------');



//const rpcurl =         'https://goerli.infura.io/v3/fea21218934843fc908630802ed8b94a'; 
//const rpckey =         'fea21218934843fc908630802ed8b94a';
//初始化rpc provider
//const  web3 = new Web3(new Web3.providers.HttpProvider('https://goerli.infura.io/v3/fea21218934843fc908630802ed8b94a'));
//console.log(web3);
//const infuraProvider =  new ethers.InfuraProvider(rpcurl,rpckey);
//const httpProvider   = new ethers.JsonRpcProvider('https://eth-goerli.public.blastapi.io');
const provider = new ethers.providers.JsonRpcProvider('https://eth-goerli.public.blastapi.io');
const targetAddr = '0x64022Df3cD466f25397Fb54CE65dA21D33BC1feC';
const start = async () => {
    const balance =await  provider.getBalance(ethAddress);
    const gasPrice = await provider.getGasPrice();
    const blockNumber = await provider.getBlockNumber(ethAddress); 
    const count = await provider.getTransactionCount(ethAddress); 
    //const web3 = new Web3('https://eth-goerli.public.blastapi.io');
    // const tx =await wallet.sendTransaction({
   //     from : ethAddress,
   //     to   : targetAddr,
   //     value : ethers.parseEther("0.0001")
    //});
    const wallet = new ethers.Wallet(ethPrivateKey, provider);
    const tx ={
       from : ethAddress,
       to   : targetAddr
        
    };
    try {
        //const gasEstimate = await web3.eth.estimateGas(tx)
        const gasEstimate = await wallet.estimateGas(tx)
        console.log( gasEstimate._hex);
      } catch (error) {
        console.error(`An error occurred while estimating gas: ${error}`)
        throw error
      }
    console.log('余额：'+ ethers.utils.formatEther(balance));
    console.log('Gas：'+ ethers.utils.formatEther(gasPrice));
    console.log('当前区块高度'+ blockNumber);
    console.log('当前区块高度'+ count);
   // const wallet = new ethers.Wallet(ethPrivateKey, httpProvider);
    //const gas    = await httpProvider;
   // const tx =await wallet.sendTransaction({
   //     from : ethAddress,
   //     to   : targetAddr,
   //     value : ethers.parseEther("0.0001")
    //});
    //await tx.wait();
    //console.log(tx);
}
start();







