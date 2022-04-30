import { Logger } from '@nestjs/common';
import algosdk, { Account, Algodv2, Indexer, Transaction } from 'algosdk';
import {
  AlgoConfig,
  CreateAssetTxn,
  MAINNET_ALGO_CONF,
  Network,
  TESTNET_ALGO_CONF,
} from './algo.config';

export class AlgoService {
  private readonly config: AlgoConfig;
  private readonly client: Algodv2;
  private readonly indexer: Indexer;

  constructor(network: Network) {
    this.config =
      network === Network.TESTNET ? TESTNET_ALGO_CONF : MAINNET_ALGO_CONF;
    this.client = new Algodv2(
      this.config.apiKeyHeader,
      this.config.clientUri,
      '',
    );
    this.indexer = new Indexer(
      this.config.apiKeyHeader,
      this.config.clientUri,
      '',
    );
  }
  public generateAccount() {
    const account = algosdk.generateAccount();
    return {
      addr: account.addr,
      sk: algosdk.secretKeyToMnemonic(account.sk),
    };
  }

  public async mintNft(params: {
    unitName: string;
    assetName: string;
    metadataUrl: string;
    from: {
      addr: string;
      sk: string;
    };
  }) {
    const { unitName, assetName, metadataUrl, from } = params;
    const txparams = await this.client.getTransactionParams().do();
    const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
      from: from.addr,
      total: 1,
      decimals: 0,
      assetName,
      unitName,
      assetURL: metadataUrl,
      defaultFrozen: false,
      suggestedParams: txparams,
    });
    const completedTxn = (await this.signAndSendTxn(
      txn,
      from.sk,
    )) as CreateAssetTxn;
    return completedTxn;
  }

  // public async sendAsset(params: { to: string; assetId: number }) {
  //   const { to, assetId } = params;
  //   const suggestedParams = await this.client.getTransactionParams().do();

  //   const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
  //     amount: 1,
  //     from: this.config.addr,
  //     to,
  //     suggestedParams,
  //     assetIndex: assetId,
  //   });

  //   const completedTxn = await this.signAndSendTxn(txn, this.config.sk);
  //   return completedTxn;
  // }

  private async signAndSendTxn(txn: Transaction, sk: string) {
    const signedTxn = txn.signTxn(algosdk.mnemonicToSecretKey(sk).sk);
    let txId = txn.txID().toString();

    await this.client.sendRawTransaction(signedTxn).do();

    const confirmedTxn = await algosdk.waitForConfirmation(
      this.client,
      txId,
      4,
    );
    Logger.log(`Transaction ${txId} confirmed`);
    Logger.log(`Transaction Fee: microAlgos: ${confirmedTxn.fee}`);
    await this.getAccountInfo(this.config.addr);
    return confirmedTxn;
  }

  private async getAccountInfo(addr: string) {
    const accountInfo = await this.client.accountInformation(addr).do();
    Logger.log(`Account balance: ${accountInfo.amount} microAlgos`);
    return accountInfo;
  }

  // public async optInAsset(params: { account: Account; assetID: number }) {
  //   const { account, assetID } = params;
  //   const suggestedParams = await this.client.getTransactionParams().do();
  //   const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
  //     from: account.addr,
  //     to: account.addr,
  //     amount: 0,
  //     assetIndex: assetID,
  //     suggestedParams,
  //   });
  //   const completedTxn = await this.signAndSendTxn(
  //     txn,
  //     algosdk.secretKeyToMnemonic(account.sk),
  //   );
  //   return completedTxn;
  // }

  public async sendAlgos(params: { to: string; amount: number }) {
    const { to, amount } = params;
    const suggestedParams = await this.client.getTransactionParams().do();
    suggestedParams.fee = algosdk.ALGORAND_MIN_TX_FEE;
    suggestedParams.flatFee = true;
    const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: this.config.addr,
      to,
      amount: amount * 1000000,
      suggestedParams,
    });
    const completedTxn = await this.signAndSendTxn(txn, this.config.sk);
    return completedTxn;
  }
}
