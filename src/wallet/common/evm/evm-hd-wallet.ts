import { EncryptionType } from "../../../cryptography";
import { CoinPath, CoinType, Purpose } from "../../../wallet/core";
import { Wallet, HDWallet } from "../../../wallet";
import { Hex } from "../../../utils";
import { EvmWalletUtils } from "./evm-wallet-utils";

/**
 * Casper wallet implementation
 */
export class EvmWallet extends Wallet {

  /**
   * Get the public address of current wallet
   */
  public async getPublicKey(): Promise<string> {
    let pubKey = await this.getRawPublicKey();
    if (this.getEncryptionType() === EncryptionType.Ed25519) {
      // ! Casper doesn't use 00 prefix as standard SLIP-0010
      pubKey = pubKey.slice(2);
    }
    return EvmWalletUtils.getPublicAddress(this.getEncryptionType(), pubKey);
  }

}

/**
 * Casper HD wallet implementation, purpose 44 and using coin-type Casper (506)
 */
export class EvmHDWallet extends HDWallet<EvmWallet> {

  constructor(masterSeed: Hex, walletPathTemplate: string, encryptionType: EncryptionType) {
    super(EvmWallet, new CoinPath(walletPathTemplate, Purpose.BIP44, CoinType.Ethereum), encryptionType, masterSeed);
  }

}