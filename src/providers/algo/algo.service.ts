import { Logger } from '@nestjs/common';
import algosdk, { Algodv2, Indexer, Transaction } from 'algosdk';
import {
  AlgoConfig,
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
  }) {
    const { unitName, assetName, metadataUrl } = params;
    const txparams = await this.client.getTransactionParams().do();
    const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
      from: process.env.ALGO_ACCOUNT,
      total: 1,
      decimals: 0,
      assetName,
      unitName,
      assetURL: metadataUrl,
      defaultFrozen: false,
      // freeze: freezeAddr,
      // manager: managerAddr,
      // clawback: clawbackAddr,
      // reserve: reserveAddr,
      suggestedParams: txparams,
    });
    const completedTxn = await this.signAndSendTxn(txn);
    return completedTxn;
  }

  public async sendAsset(params: { to: string; assetId: number }) {
    const { to, assetId } = params;
    const suggestedParams = await this.client.getTransactionParams().do();

    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      amount: 1,
      from: process.env.ALGO_ACCOUNT,
      to,
      suggestedParams,
      assetIndex: assetId,
    });

    const completedTxn = await this.signAndSendTxn(txn);
    return completedTxn;
  }

  private async signAndSendTxn(txn: Transaction) {
    const signedTxn = txn.signTxn(
      algosdk.mnemonicToSecretKey(process.env.ALGO_SECRET).sk,
    );
    let txId = txn.txID().toString();

    await this.client.sendRawTransaction(signedTxn).do();

    const confirmedTxn = await algosdk.waitForConfirmation(
      this.client,
      txId,
      4,
    );
    Logger.log(`Transaction ${txId} confirmed`);
    Logger.debug(confirmedTxn);
    Logger.log('Transaction Fee: %d microAlgos', confirmedTxn.txn.txn.fee);
    await this.getAccountInfo(process.env.ALGO_ACCOUNT);
    return confirmedTxn;
  }

  private async getAccountInfo(addr: string) {
    const accountInfo = await this.client.accountInformation(addr).do();
    Logger.log('Account balance: %d microAlgos', accountInfo.amount);
    return accountInfo;
  }
}
