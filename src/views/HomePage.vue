<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Blank</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Blank</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <strong>Ready to create an app?</strong>
        <p>Start with Ionic <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script  lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
//import { getNetworkById,getRpcUrlsById,getCoinsById } from '../utils/networks';
//import { createAccount } from '../utils/account';
//import  {Wallet}    from '../utils/Wallet'
//import { LocalWalletNotAvailableError } from 'web3';
import { KeyFactory } from '../key';
import { BIP32Factory,calcBip32ExtendedKey } from '../bips/bip32/core/bip32';
import * as ecc from 'tiny-secp256k1';
import { ECPairFactory } from '../bips/bip32/core/ecpair'
import { networks } from 'bitcoinjs-lib';
export default {
  components: {  IonContent, IonHeader, IonPage, IonTitle, IonToolbar  },
  setup() {

    //生成助记词
    const keyManager = KeyFactory.getInstance();
    
    const key=  keyManager.generate();

    const mnemonic = keyManager.toKey(key);
    const  mnemonic1 = keyManager.toKeyToString(key);
    console.log(mnemonic);
    console.log(mnemonic1);

    const isValid: boolean = keyManager.validate(mnemonic);
    console.log(isValid);


    const seed: string = keyManager.toSeed(key);
    console.log('seed1: '+seed);
    const keyWords = keyManager.generateWithWords(mnemonic1);
    const seed1: string = keyManager.toSeed(keyWords);
    console.log('seed2: '+seed1);

    //const keyword = "roof patient bounce flame stand axis place giant strong submit marble maze";
    //const keyArray:string[] = keyword.split(" ");
   // const hexkey = TypeUtils.convertArrayToHexString(keyArray);

    const bip32 = BIP32Factory(ecc);
    const bip32RootKey =bip32.fromSeed(keyManager.mnemonicToSeedSync(mnemonic1));
    const bip32extendKey = calcBip32ExtendedKey(bip32RootKey,"m/44'/0'/0'/0/0");
    const nodeWallet = bip32extendKey.derive(0);
    const ecPair = ECPairFactory(ecc);
    const pair = ecPair.fromPrivateKey(nodeWallet.privateKey);
    var pubkey = pair.publicKey.toString('hex');
    var address = pair.publicKey.toString('hex');

   //const hdNode = ethers.Wallet.fromMnemonic(mnemonic1,"m/44'/0'/0'/0/0");
   //console.log(hdNode.privateKey)

    
    




    return {
      
    };
  }
};


</script>

<style scoped>
#container {
  text-align: center;
  
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
