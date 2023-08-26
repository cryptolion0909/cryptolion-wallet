import  {validateMnemonic,mnemonicToSeedSync }  from 'bip39';
import * as ecc from 'tiny-secp256k1';
import * as bitcoin from 'bitcoinjs-lib';
import BIP32Factory from 'bip32';
import   ECPairFactory  from 'ecpair';
import ethUtil from "ethereumjs-util"
import {getNetworkById} from './networks';
export class Wallet{
    account_id : number | string;     //账户唯一ID
    chain_id : number| string ;       //对应chain_id
    network ?:  object;               //对应不同的network(litecoin生成方式，就是在address中改变了network配置)
    address : string |undefined;      //对应链的地址
    priKey:   string ;
    pubKey:   string ;
    path :    string;
    extend_address?: string;            //同一个地址可能存在不同表现形式（例如说BTC 的测试地址），作为扩展




    


//计算不同链的私钥、公钥和地址（目前支持BTC ETH BSC 和tron）
 constructor(mnemonic:string,chain_id:string | number,account_id:string |number){
    //助记词校验
    if(!validateMnemonic(mnemonic)){
        throw new Error(`Invalid Mnemonic`)
    }
    //获取chain
    const chain = getNetworkById(chain_id);
    

    //助记词转化成种子
    const seed  = mnemonicToSeedSync(mnemonic);
    const bip32 = BIP32Factory(ecc);
    const root =bip32.fromSeed(seed);

    const extendedKey = this.calcBip32ExtendedKey(root,chain.path);
    //const hdWallet = new CasperHDWallet(masterSeed, EncryptionType.Ed25519);

    const key = extendedKey.derive(0);
    // 通过extendedKey去获取ECpair
    const ecPair = ECPairFactory(ecc);
    const pair = ecPair.fromPrivateKey(key.privateKey);
    //var hasPrivkey = !key.isNeutered();
    var pubkey = pair.publicKey.toString('hex');
    var address = pair.publicKey.toString('hex');
    //const p2kkhAddress =bitcoin.payments.p2pkh({ pubkey: pair.publicKey , network:bitcoin.networks.bitcoin})
    //var address = p2kkhAddress.address;
    var prikey= pair.toWIF();
    
    if(chain.chain_type ==='BTC'){
          
        // console.log('btc地址:'+ address);
        // console.log('btc私钥:'+ prikey);
        // console.log('btc公钥:'+ pubkey);
    }else if(chain.chain_type === 'ETH'){
        const ethPubkey = ethUtil.importPublic(pair.publicKey);
        const addressBuffer = ethUtil.publicToAddress(ethPubkey);
        const hexAddress = addressBuffer.toString('hex');
        const checksumAddress = ethUtil.toChecksumAddress('0x'+hexAddress);
        address = ethUtil.addHexPrefix(checksumAddress);
        pubkey = ethUtil.addHexPrefix('0x'+pubkey);
        // console.log(address);
        // console.log(pair.toWIF());
    }else if(chain.chain_type ==='TRON'){
        const ethPubkey = ethUtil.importPublic(pair.publicKey);
        const addressBuffer = ethUtil.publicToAddress(ethPubkey);
        address =bitcoin.address.toBase58Check(addressBuffer, 0x41);
        //prikey = pair.privateKey.toString('hex');
        // console.log('tron地址:'+address);
        // console.log('tron私钥:'+ prikey);
        // console.log('tron公钥:'+pubkey);
    }
    this.chain_id = chain_id;
    this.path = chain.path;
    this.account_id= account_id;
    this.address =address;
    this.priKey = prikey;
    this.pubKey = pubkey;
    
}



//计算extendedkey的方法
calcBip32ExtendedKey(bip32RootKey: any,path:string) {
// Check there's a root key to derive from
if (!bip32RootKey) {
    return bip32RootKey;
}
var extendedKey = bip32RootKey;
// Derive the key from the path
var pathBits = path.split("/");
for (var i=0; i<pathBits.length -1; i++) {
    var bit = pathBits[i];
    var index = parseInt(bit);
    if (isNaN(index)) {
        continue;
    }
    var hardened = bit[bit.length-1] == "'";
    var isPriv = !(extendedKey.isNeutered());
    var invalidDerivationPath = hardened && !isPriv;
    if (invalidDerivationPath) {
        extendedKey = null;
    }
    else if (hardened) {
        extendedKey = extendedKey.deriveHardened(index);
    }
    else {
        extendedKey = extendedKey.derive(index);
    }
}
return extendedKey;
} 
}
export default Wallet;