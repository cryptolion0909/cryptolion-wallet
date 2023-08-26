import { KeyFactory,CasperHDWallet,EncryptionType,CoinPath , CoinType, DEFAULT_COINT_PATH_FULL, Purpose } from "casper-storage";



export const generate= async ()=>{
    const keyManager = KeyFactory.getInstance();
    
    const key=  keyManager.generate(12);

    const mnemonic = keyManager.toKey(key)
    console.log(mnemonic);
    const seed: string = keyManager.toSeed(key);
    console.log(seed)
    const isValid: boolean = keyManager.validate(mnemonic);
    console.log(isValid);
    const coinPathTemplate = DEFAULT_COINT_PATH_FULL;
    //let coinpath = new CoinPath(coinPathTemplate,Purpose.BIP44,CoinType.Bitcoin);
    const hdWallet = new CasperHDWallet(seed,coinPathTemplate,EncryptionType.Ed25519);
    const acc0 = await hdWallet.getAccount(0)
    console.log(await acc0.getPrivateKey())
    console.log(await acc0.getPublicKey())
    console.log(await acc0.getPublicAddress())
    return mnemonic;

}





