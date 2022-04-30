import { Injectable } from '@nestjs/common';
import algosdk, { Algodv2, Indexer, Transaction } from 'algosdk';
import Status from 'algosdk/dist/types/src/client/v2/algod/status';
import { TESTNET_CONF } from './algo.config';

@Injectable()
export class AlgoService {
  private readonly client = new Algodv2(
    TESTNET_CONF.apiKeyHeader,
    TESTNET_CONF.clientUri,
    '',
  );
  private readonly indexer = new Indexer(
    TESTNET_CONF.apiKeyHeader,
    TESTNET_CONF.clientUri,
    '',
  );
  public async checkStatus() {
    return (await this.client.status().do()) as Status;
  }
}
